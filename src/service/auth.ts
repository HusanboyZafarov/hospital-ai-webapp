import { axiosInstance } from "../jwt";
import type { ApiAuthResponse } from "../types/user";

const login = async (
  username: string,
  password: string
): Promise<ApiAuthResponse> => {
  try {
    const response = await axiosInstance.post<ApiAuthResponse>("/auth/login", {
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
