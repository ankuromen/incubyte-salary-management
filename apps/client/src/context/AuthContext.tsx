import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode
} from "react";
import { login as loginRequest } from "../api/auth";
import {
  clearStoredSession,
  getStoredAdmin,
  getStoredToken,
  setStoredSession
} from "../lib/auth-storage";
import type { Admin, AuthSession } from "../types/auth";

type AuthContextValue = {
  admin: Admin | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

const parseStoredAdmin = (): Admin | null => {
  const raw = getStoredAdmin();
  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw) as Admin;
  } catch {
    return null;
  }
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedToken = getStoredToken();
    const storedAdmin = parseStoredAdmin();

    if (storedToken && storedAdmin) {
      setToken(storedToken);
      setAdmin(storedAdmin);
    }

    setIsLoading(false);
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const session: AuthSession = await loginRequest({ email, password });
    setStoredSession(session.token, session.admin);
    setToken(session.token);
    setAdmin(session.admin);
  }, []);

  const logout = useCallback(() => {
    clearStoredSession();
    setToken(null);
    setAdmin(null);
  }, []);

  const value = useMemo(
    () => ({
      admin,
      token,
      isLoading,
      isAuthenticated: Boolean(token && admin),
      login,
      logout
    }),
    [admin, token, isLoading, login, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
};
