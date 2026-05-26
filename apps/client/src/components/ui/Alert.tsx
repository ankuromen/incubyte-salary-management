import type { ReactNode } from "react";
import { cn } from "../../lib/cn";

export const Alert = ({
  children,
  variant = "error"
}: {
  children: ReactNode;
  variant?: "error" | "info";
}) => (
  <div
    className={cn(
      "rounded-xl border px-4 py-3 text-sm font-medium",
      variant === "error" && "border-red-200 bg-red-50 text-red-800",
      variant === "info" && "border-indigo-200 bg-indigo-50 text-indigo-800"
    )}
    role="alert"
  >
    {children}
  </div>
);
