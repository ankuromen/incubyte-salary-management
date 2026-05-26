import { useEffect, useState } from "react";
import { createAdmin, fetchAdmins } from "../api/auth";
import { ApiError } from "../api/client";
import { Alert } from "../components/ui/Alert";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { inputClassName, labelClassName } from "../components/ui/Input";
import { PageHeader } from "../components/ui/PageHeader";
import type { Admin } from "../types/auth";

export const ManageAdminsPage = () => {
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const loadAdmins = async () => {
    setIsLoading(true);
    try {
      setAdmins(await fetchAdmins());
    } catch (loadError) {
      setError(loadError instanceof ApiError ? loadError.message : "Failed to load admins");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void loadAdmins();
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setSuccess(null);
    setIsSubmitting(true);

    try {
      await createAdmin({ email, password, fullName });
      setFullName("");
      setEmail("");
      setPassword("");
      setSuccess("Admin account created successfully.");
      await loadAdmins();
    } catch (submitError) {
      setError(submitError instanceof ApiError ? submitError.message : "Failed to create admin");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        subtitle="Add additional admin accounts. Credentials are stored securely in the database."
        title="Admin Accounts"
      />

      {error ? <Alert>{error}</Alert> : null}
      {success ? <Alert variant="info">{success}</Alert> : null}

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <h2 className="text-lg font-bold text-slate-900">Add admin</h2>
          <form className="mt-5 space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className={labelClassName} htmlFor="admin-name">
                Full name
              </label>
              <input
                className={inputClassName}
                id="admin-name"
                required
                value={fullName}
                onChange={(event) => setFullName(event.target.value)}
              />
            </div>
            <div>
              <label className={labelClassName} htmlFor="admin-email">
                Email
              </label>
              <input
                className={inputClassName}
                id="admin-email"
                required
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
            <div>
              <label className={labelClassName} htmlFor="admin-password">
                Password
              </label>
              <input
                className={inputClassName}
                id="admin-password"
                minLength={8}
                required
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
              <p className="mt-1 text-xs text-slate-500">
                Min 8 chars, with uppercase, lowercase, and a number.
              </p>
            </div>
            <Button disabled={isSubmitting} type="submit">
              {isSubmitting ? "Creating…" : "Create admin"}
            </Button>
          </form>
        </Card>

        <Card padding={false} className="overflow-hidden">
          <div className="border-b border-slate-100 px-6 py-4">
            <h2 className="text-lg font-bold text-slate-900">Existing admins</h2>
          </div>
          {isLoading ? (
            <p className="px-6 py-8 text-sm text-slate-500">Loading…</p>
          ) : (
            <ul className="divide-y divide-slate-100">
              {admins.map((admin) => (
                <li key={admin.id} className="px-6 py-4">
                  <p className="font-semibold text-slate-900">{admin.fullName}</p>
                  <p className="text-sm text-slate-500">{admin.email}</p>
                </li>
              ))}
            </ul>
          )}
        </Card>
      </div>
    </div>
  );
};
