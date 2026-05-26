import type { ReactNode } from "react";

export const PageHeader = ({
  title,
  subtitle,
  actions
}: {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
}) => (
  <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-200/80 pb-6">
    <div>
      <h1 className="text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">{title}</h1>
      {subtitle ? <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-500">{subtitle}</p> : null}
    </div>
    {actions ? <div className="flex shrink-0 flex-wrap items-center gap-2">{actions}</div> : null}
  </div>
);
