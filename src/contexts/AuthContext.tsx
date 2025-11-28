import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import type { User, AuthResponse } from "../types/user";
import { setSession, isValidToken, ACCESS_TOKEN } from "../jwt";
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

  // Load user from localStorage on mount
  useEffect(() => {
    const loadUser = () => {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          const authData: AuthResponse = JSON.parse(stored);
          const accessToken = localStorage.getItem(ACCESS_TOKEN);

          // Validate token if exists
          if (accessToken && isValidToken(accessToken)) {
            setUser(authData.user);
          } else {
            // Token invalid or expired, clear storage
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
      // Call auth service (currently mock, replace with API call)
      const response = await authService.login(username, password);

      // For now, create mock user until backend is ready
      // TODO: Replace with actual API response
      const mockUser: User = {
        id: `user_${Date.now()}`,
        username,
        email: `${username}@hospital.com`,
        name: username.charAt(0).toUpperCase() + username.slice(1),
        role: username === "admin" ? "admin" : "doctor",
        department: "General Medicine",
        permissions: username === "admin" ? ["all"] : ["read", "write"],
      };

      const mockToken = `mock_token_${Date.now()}`;

      const authData: AuthResponse = {
        user: mockUser,
        token: mockToken,
      };

      // Store tokens using jwt service
      setSession({
        accessToken: mockToken,
        refreshToken: `refresh_${Date.now()}`,
      });

      // Store auth data in localStorage
      localStorage.setItem(STORAGE_KEY, JSON.stringify(authData));
      setUser(mockUser);
    } catch (error) {
      console.error("Login error:", error);
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
