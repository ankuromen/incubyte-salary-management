import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Alert } from "../components/ui/Alert";
import { Button } from "../components/ui/Button";
import { inputClassName, labelClassName } from "../components/ui/Input";
import { useAuth } from "../context/AuthContext";
import { ApiError } from "../api/client";

export const LoginPage = () => {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (isAuthenticated) {
    return <Navigate replace to="/" />;
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      await login(email, password);
      navigate("/");
    } catch (submitError) {
      setError(submitError instanceof ApiError ? submitError.message : "Login failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 p-6">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 shadow-lg shadow-indigo-500/40">
            <span className="text-lg font-bold text-white">SM</span>
          </div>
          <h1 className="text-2xl font-bold text-white">Sign in</h1>
          <p className="mt-2 text-sm text-slate-400">Salary Management · Admin access only</p>
        </div>

        <form
          className="rounded-3xl border border-white/10 bg-white/95 p-8 shadow-elevated backdrop-blur"
          onSubmit={handleSubmit}
        >
          {error ? (
            <div className="mb-4">
              <Alert>{error}</Alert>
            </div>
          ) : null}

          <div className="space-y-4">
            <div>
              <label className={labelClassName} htmlFor="login-id">
                ID
              </label>
              <input
                autoComplete="username"
                className={inputClassName}
                id="login-id"
                placeholder="Enter your ID"
                required
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
            <div>
              <label className={labelClassName} htmlFor="login-password">
                Password
              </label>
              <input
                autoComplete="current-password"
                className={inputClassName}
                id="login-password"
                placeholder="Enter your password"
                required
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
          </div>

          <Button className="mt-6 w-full" disabled={isSubmitting} type="submit">
            {isSubmitting ? "Signing in…" : "Sign in"}
          </Button>
        </form>
      </div>
    </div>
  );
};
