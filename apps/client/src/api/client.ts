import { env } from "../config/env";
import { clearStoredSession, getStoredToken } from "../lib/auth-storage";

export class ApiError extends Error {
  constructor(
    message: string,
    public readonly status: number,
    public readonly details?: unknown
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export const apiRequest = async <T>(path: string, init?: RequestInit): Promise<T> => {
  const token = getStoredToken();
  const isAuthRoute = path.startsWith("/auth/login");

  const response = await fetch(`${env.apiBaseUrl}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(token && !isAuthRoute ? { Authorization: `Bearer ${token}` } : {}),
      ...(init?.headers ?? {})
    },
    ...init
  });

  if (!response.ok) {
    if (response.status === 401 && !isAuthRoute) {
      clearStoredSession();
      window.location.assign("/login");
    }

    const body = (await response.json().catch(() => ({}))) as { error?: string; details?: unknown };
    throw new ApiError(body.error ?? "Request failed", response.status, body.details);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return (await response.json()) as T;
};
