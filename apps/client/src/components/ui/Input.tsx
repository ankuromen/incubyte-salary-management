import { cn } from "../../lib/cn";

export const inputClassName = cn(
  "w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 shadow-soft",
  "placeholder:text-slate-400 transition-colors",
  "hover:border-slate-300 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/20"
);

export const selectClassName = cn(inputClassName, "cursor-pointer");

export const labelClassName = "mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500";
