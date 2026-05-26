import type { ReactNode } from "react";
import { cn } from "../../lib/cn";

export const Card = ({
  children,
  className = "",
  padding = true
}: {
  children: ReactNode;
  className?: string;
  padding?: boolean;
}) => (
  <section
    className={cn(
      "rounded-2xl border border-slate-200/80 bg-white shadow-card",
      padding && "p-6",
      className
    )}
  >
    {children}
  </section>
);
