import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";

export const AppLayout = () => (
  <div className="min-h-screen md:flex">
    <Sidebar />
    <main className="flex-1 bg-gradient-to-br from-slate-100 via-slate-50 to-indigo-50/30">
      <div className="animate-fade-in mx-auto max-w-7xl p-6 md:p-8 lg:p-10">
        <Outlet />
      </div>
    </main>
  </div>
);
