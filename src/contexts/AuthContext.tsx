import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import type { User, AuthResponse, ApiAuthResponse } from "../types/user";
import { setSession, isValidToken, ACCESS_TOKEN, refreshTokenFn } from "../jwt";
import authService from "../service/auth";

const STORAGE_KEY = "hospital_ai_auth";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: React.PropsWithChildren) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load user from localStorage on mount and refresh token if needed
  useEffect(() => {
    const loadUser = async () => {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          const authData: AuthResponse = JSON.parse(stored);
          const accessToken = localStorage.getItem(ACCESS_TOKEN);

          // Validate token if exists
          if (accessToken && isValidToken(accessToken)) {
            setUser(authData.user);
          } else if (accessToken) {
            // Token exists but expired, try to refresh
            try {
              console.log("🔄 Token expired, refreshing...");
              const refreshResponse = await refreshTokenFn();

              // Update user if refresh response includes user data
              if (refreshResponse.user) {
                const refreshedUserData: User = {
                  id: refreshResponse.user.id?.toString() || authData.user.id,
                  username:
                    refreshResponse.user.username || authData.user.username,
                  email: refreshResponse.user.email || authData.user.email,
                  name:
                    (refreshResponse.user as any).name ||
                    authData.user.name ||
                    authData.user.username,
                  role:
                    (refreshResponse.user.role as User["role"]) ||
                    authData.user.role,
                };

                // Update localStorage with refreshed user
                const updatedAuthData: AuthResponse = {
                  user: refreshedUserData,
                  token: refreshResponse.accessToken,
                };
                localStorage.setItem(
                  STORAGE_KEY,
                  JSON.stringify(updatedAuthData)
                );
                setUser(refreshedUserData);
              } else {
                // No user in refresh response, use stored user but update token
                const updatedAuthData: AuthResponse = {
                  user: authData.user,
                  token: refreshResponse.accessToken,
                };
                localStorage.setItem(
                  STORAGE_KEY,
                  JSON.stringify(updatedAuthData)
                );
                setUser(authData.user);
              }
            } catch (refreshError: any) {
              console.error("❌ Token refresh failed:", refreshError);
              // If refresh fails, still try to use stored user (might be network issue)
              // Only clear if it's a 401/403 (unauthorized)
              if (
                refreshError?.response?.status === 401 ||
                refreshError?.response?.status === 403
              ) {
                localStorage.removeItem(STORAGE_KEY);
                setUser(null);
              } else {
                // Network error or other issue, keep user but they'll need to login again
                setUser(authData.user);
              }
            }
          } else {
            // No token at all, clear storage
            localStorage.removeItem(STORAGE_KEY);
            setUser(null);
          }
        }
      } catch (error) {
        console.error("Error loading user from storage:", error);
        localStorage.removeItem(STORAGE_KEY);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();
  }, []);

  const login = async (username: string, password: string) => {
    setIsLoading(true);
    try {
      // Call auth service to get REAL user data from API
      const response = await authService.login(username, password);

      // Log the response to debug
      console.log("🔍 Raw API response:", response);
      console.log("🔍 Response keys:", Object.keys(response || {}));

      // Handle response - axiosInstance returns the full response, extract data
      // The response might be the data directly or wrapped in response.data
      const apiResponse: ApiAuthResponse = (response as any)?.data || response;

      // Validate API response structure
      if (
        !apiResponse ||
        !apiResponse.user ||
        !apiResponse.access ||
        !apiResponse.refresh
      ) {
        console.error("❌ Invalid API response structure:", {
          hasResponse: !!apiResponse,
          hasUser: !!apiResponse?.user,
          hasAccess: !!apiResponse?.access,
          hasRefresh: !!apiResponse?.refresh,
          responseKeys: apiResponse ? Object.keys(apiResponse) : [],
        });
        throw new Error(
          "Invalid API response: missing user, access, or refresh token"
        );
      }

      // Map API response to our User type
      const userData: User = {
        id: apiResponse.user.id.toString(),
        username: apiResponse.user.username,
        email: apiResponse.user.email || undefined,
        name: (apiResponse.user as any).name || apiResponse.user.username, // Use name if available, otherwise username
        role: apiResponse.user.role as User["role"],
      };

      const accessToken = apiResponse.access;
      const refreshToken = apiResponse.refresh;

      console.log("✅ Using REAL API response:", {
        user: userData,
        hasAccessToken: !!accessToken,
        hasRefreshToken: !!refreshToken,
      });

      // Store tokens using jwt service
      setSession({
        accessToken,
        refreshToken,
      });

      // Create auth data for localStorage
      const authData: AuthResponse = {
        user: userData,
        token: accessToken, // Store access token as 'token' for compatibility
      };

      // Store auth data in localStorage
      localStorage.setItem(STORAGE_KEY, JSON.stringify(authData));
      setUser(userData);

      console.log("✅ User stored successfully:", {
        userId: userData.id,
        username: userData.username,
        name: userData.name,
        role: userData.role,
        stored: !!localStorage.getItem(STORAGE_KEY),
        tokenStored: !!localStorage.getItem(ACCESS_TOKEN),
      });
    } catch (error) {
      console.error("❌ Login error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setSession({});
    localStorage.removeItem(STORAGE_KEY);
    setUser(null);
  };

  const updateUser = (userData: Partial<User>) => {
    if (!user) return;

    const updatedUser = { ...user, ...userData };
    setUser(updatedUser);

    // Update localStorage
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const authData: AuthResponse = JSON.parse(stored);
        const updatedAuthData: AuthResponse = {
          ...authData,
          user: updatedUser,
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedAuthData));
      } catch (error) {
        console.error("Error updating user in storage:", error);
      }
    }
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
