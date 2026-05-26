import { env } from "./config/env";

const App = () => {
  return (
    <main className="min-h-screen bg-slate-50 p-8">
      <section className="mx-auto max-w-3xl rounded-lg bg-white p-8 shadow">
        <h1 className="text-3xl font-bold text-slate-900">Salary Management Dashboard</h1>
        <p className="mt-3 text-lg text-slate-600">System initialized successfully</p>
        <p className="mt-2 text-sm text-slate-500">API: {env.apiBaseUrl}</p>
      </section>
    </main>
  );
};

export default App;
