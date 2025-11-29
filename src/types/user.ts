export type UserRoles = "admin" | "doctor" | "nurse" | "staff" | "patient";

export interface User {
  id: string | number;
  username: string;
  email?: string;
  name?: string;
  role: UserRoles;
  avatar?: string;
  department?: string;
  permissions?: string[];
}

// API Response structure
export interface ApiAuthResponse {
  access: string;
  refresh: string;
  user: {
    id: number;
    username: string;
    email: string;
    role: string;
    name?: string; // Add name field if API returns it
  };
}

// Internal AuthResponse for storage
export interface AuthResponse {
  user: User;
  token: string;
}
