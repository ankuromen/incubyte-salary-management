import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { cn } from "../../lib/cn";
import { Button } from "../ui/Button";

const links = [
  { to: "/", label: "Dashboard", icon: DashboardIcon },
  { to: "/employees", label: "Employees", icon: UsersIcon },
  { to: "/analytics", label: "Analytics", icon: ChartIcon },
  { to: "/admins", label: "Admin Accounts", icon: ShieldIcon }
];

export const Sidebar = () => {
  const { admin, logout } = useAuth();

  return (
  <aside className="flex w-full flex-col border-b border-slate-800/50 bg-slate-950 md:min-h-screen md:w-72 md:border-b-0 md:border-r">
    <div className="border-b border-slate-800/80 p-6">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 shadow-lg shadow-indigo-500/30">
          <span className="text-sm font-bold text-white">SM</span>
        </div>
        <div>
          <p className="text-sm font-bold text-white">Salary Management</p>
          <p className="text-xs text-slate-400">HR & Payroll Platform</p>
        </div>
      </div>
    </div>

    <nav className="flex-1 space-y-1 p-4">
      {links.map((link) => (
        <NavLink
          key={link.to}
          className={({ isActive }) =>
            cn(
              "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
              isActive
                ? "bg-gradient-to-r from-indigo-600/90 to-violet-600/90 text-white shadow-md shadow-indigo-900/40"
                : "text-slate-400 hover:bg-slate-800/80 hover:text-white"
            )
          }
          to={link.to}
        >
          <link.icon className="h-5 w-5 shrink-0 opacity-90" />
          {link.label}
        </NavLink>
      ))}
    </nav>

    <div className="border-t border-slate-800/80 p-4">
      {admin ? (
        <div className="mb-3 rounded-xl bg-slate-900/80 p-3">
          <p className="text-xs font-semibold text-slate-300">{admin.fullName}</p>
          <p className="truncate text-xs text-slate-500">{admin.email}</p>
        </div>
      ) : null}
      <Button className="w-full" type="button" variant="secondary" onClick={logout}>
        Sign out
      </Button>
    </div>
  </aside>
  );
};

function DashboardIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24">
      <path d="M4 13h6V4H4v9zm10 7h6V11h-6v9zM4 20h6v-5H4v5zm10-12h6V4h-6v4z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function UsersIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24">
      <path
        d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zm10 10v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChartIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24">
      <path d="M3 3v18h18M7 16l4-4 4 4 5-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ShieldIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24">
      <path
        d="M12 3l8 4v5c0 5-3.5 8.5-8 9-4.5-.5-8-4-8-9V7l8-4z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
