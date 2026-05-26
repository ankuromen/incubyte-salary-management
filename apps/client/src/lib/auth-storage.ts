const TOKEN_KEY = "salary_mgmt_token";
const ADMIN_KEY = "salary_mgmt_admin";

export const getStoredToken = (): string | null => localStorage.getItem(TOKEN_KEY);

export const getStoredAdmin = (): string | null => localStorage.getItem(ADMIN_KEY);

export const setStoredSession = (token: string, admin: object) => {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(ADMIN_KEY, JSON.stringify(admin));
};

export const clearStoredSession = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(ADMIN_KEY);
};
