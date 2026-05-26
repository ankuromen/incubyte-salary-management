import { NavLink } from "react-router-dom";

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  `block rounded-lg px-3 py-2 text-sm font-medium ${
    isActive ? "bg-indigo-600 text-white" : "text-slate-600 hover:bg-slate-100"
  }`;

const links = [
  { to: "/", label: "Dashboard" },
  { to: "/employees", label: "Employees" },
  { to: "/employees/new", label: "Add Employee" },
  { to: "/analytics", label: "Analytics" }
];

export const Sidebar = () => (
  <aside className="w-full border-b border-slate-200 bg-white p-4 md:w-64 md:border-b-0 md:border-r md:min-h-screen">
    <p className="mb-6 text-lg font-bold text-slate-900">Salary Management</p>
    <nav className="space-y-1">
      {links.map((link) => (
        <NavLink key={link.to} className={navLinkClass} to={link.to}>
          {link.label}
        </NavLink>
      ))}
    </nav>
  </aside>
);
