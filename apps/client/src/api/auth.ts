import type { Admin, AuthSession } from "../types/auth";
import { apiRequest } from "./client";

export type LoginPayload = {
  email: string;
  password: string;
};

export type CreateAdminPayload = {
  email: string;
  password: string;
  fullName: string;
};

export const login = (payload: LoginPayload): Promise<AuthSession> => {
  return apiRequest<AuthSession>("/auth/login", {
    method: "POST",
    body: JSON.stringify(payload)
  });
};

export const fetchCurrentAdmin = (): Promise<Admin> => {
  return apiRequest<Admin>("/auth/me");
};

export const fetchAdmins = (): Promise<Admin[]> => {
  return apiRequest<Admin[]>("/auth/admins");
};

export const createAdmin = (payload: CreateAdminPayload): Promise<Admin> => {
  return apiRequest<Admin>("/auth/admins", {
    method: "POST",
    body: JSON.stringify(payload)
  });
};
