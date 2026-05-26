import type { ReactNode } from "react";

export const Card = ({ children, className = "" }: { children: ReactNode; className?: string }) => (
  <section className={`rounded-xl border border-slate-200 bg-white p-6 shadow-sm ${className}`}>
    {children}
  </section>
);
