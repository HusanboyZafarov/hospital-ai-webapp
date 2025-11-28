import { axiosInstance } from "../jwt";
import type { AuthResponse } from "../types/user";

const login = async (
  username: string,
  password: string
): Promise<AuthResponse> => {
  try {
    const response = await axiosInstance.post<AuthResponse>("/auth/login", {
      username,
      password,
    });
    return response;
  } catch (err) {
    console.error("Login error:", err);
    throw err;
  }
};

const authService = {
  login,
};

export default authService;
