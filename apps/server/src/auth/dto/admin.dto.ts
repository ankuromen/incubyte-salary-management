export type AdminPublic = {
  id: string;
  email: string;
  fullName: string;
  createdAt: string;
};

export type AuthSession = {
  token: string;
  admin: AdminPublic;
};
