import type { ReactNode } from "react";
import { cn } from "../../lib/cn";

export const Badge = ({
  children,
  variant = "default"
}: {
  children: ReactNode;
  variant?: "default" | "success" | "brand";
}) => (
  <span
    className={cn(
      "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
      variant === "default" && "bg-slate-100 text-slate-700",
      variant === "success" && "bg-emerald-50 text-emerald-700",
      variant === "brand" && "bg-indigo-50 text-indigo-700"
    )}
  >
    {children}
  </span>
);
