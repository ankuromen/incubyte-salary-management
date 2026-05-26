import type { ReactNode } from "react";

export const PageHeader = ({ title, actions }: { title: string; actions?: ReactNode }) => (
  <div className="flex flex-wrap items-center justify-between gap-3">
    <h1 className="text-2xl font-bold text-slate-900">{title}</h1>
    {actions}
  </div>
);
