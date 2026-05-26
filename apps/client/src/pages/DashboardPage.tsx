import { Link } from "react-router-dom";
import { Card } from "../components/ui/Card";

export const DashboardPage = () => (
  <div className="space-y-6">
    <div>
      <h1 className="text-2xl font-bold text-slate-900">HR Dashboard</h1>
      <p className="mt-2 text-slate-600">Manage employees and review salary insights.</p>
    </div>

    <section className="grid gap-4 md:grid-cols-3">
      <Card>
        <h2 className="font-semibold text-slate-900">Employee Directory</h2>
        <p className="mt-2 text-sm text-slate-600">Search, filter, edit, and delete employee records.</p>
        <Link className="mt-4 inline-block text-sm font-medium text-indigo-600" to="/employees">
          View employees
        </Link>
      </Card>
      <Card>
        <h2 className="font-semibold text-slate-900">Add Employee</h2>
        <p className="mt-2 text-sm text-slate-600">Create a new employee with validated form inputs.</p>
        <Link className="mt-4 inline-block text-sm font-medium text-indigo-600" to="/employees/new">
          Add employee
        </Link>
      </Card>
      <Card>
        <h2 className="font-semibold text-slate-900">Salary Analytics</h2>
        <p className="mt-2 text-sm text-slate-600">Explore country, department, and salary distribution insights.</p>
        <Link className="mt-4 inline-block text-sm font-medium text-indigo-600" to="/analytics">
          Open analytics
        </Link>
      </Card>
    </section>
  </div>
);
