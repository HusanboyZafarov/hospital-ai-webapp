export type UserRoles = "admin" | "doctor" | "nurse" | "staff";

export interface User {
  id: string;
  username: string;
  email?: string;
  name: string;
  role: UserRoles;
  avatar?: string;
  department?: string;
  permissions?: string[];
}

export interface AuthResponse {
  user: User;
  token: string;
}
