import type { Employee, EmployeeListFilters, EmployeePagination } from "../../types/employee";

type EmployeeTableProps = {
  employees: Employee[];
  pagination: EmployeePagination;
  filters: EmployeeListFilters;
  countryOptions: string[];
  departmentOptions: string[];
  isLoading?: boolean;
  onSearchChange: (value: string) => void;
  onCountryChange: (value: string) => void;
  onDepartmentChange: (value: string) => void;
  onPageChange: (page: number) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
};

const formatSalary = (salary: number) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(
    salary
  );

export const EmployeeTable = ({
  employees,
  pagination,
  filters,
  countryOptions,
  departmentOptions,
  isLoading = false,
  onSearchChange,
  onCountryChange,
  onDepartmentChange,
  onPageChange,
  onEdit,
  onDelete
}: EmployeeTableProps) => {
  return (
    <section className="space-y-4">
      <div className="grid gap-3 md:grid-cols-3">
        <input
          aria-label="Search employees"
          className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
          placeholder="Search by name or email"
          type="search"
          value={filters.search}
          onChange={(event) => onSearchChange(event.target.value)}
        />
        <select
          aria-label="Country filter"
          className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
          value={filters.country}
          onChange={(event) => onCountryChange(event.target.value)}
        >
          <option value="">All countries</option>
          {countryOptions.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>
        <select
          aria-label="Department filter"
          className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
          value={filters.department}
          onChange={(event) => onDepartmentChange(event.target.value)}
        >
          <option value="">All departments</option>
          {departmentOptions.map((department) => (
            <option key={department} value={department}>
              {department}
            </option>
          ))}
        </select>
      </div>

      <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-600">
            <tr>
              <th className="px-4 py-3 font-medium">Name</th>
              <th className="px-4 py-3 font-medium">Job Title</th>
              <th className="px-4 py-3 font-medium">Country</th>
              <th className="px-4 py-3 font-medium">Department</th>
              <th className="px-4 py-3 font-medium">Salary</th>
              <th className="px-4 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td className="px-4 py-6 text-slate-500" colSpan={6}>
                  Loading employees...
                </td>
              </tr>
            ) : employees.length === 0 ? (
              <tr>
                <td className="px-4 py-6 text-slate-500" colSpan={6}>
                  No employees found.
                </td>
              </tr>
            ) : (
              employees.map((employee) => (
                <tr key={employee.id} className="border-t border-slate-100">
                  <td className="px-4 py-3">
                    <div className="font-medium text-slate-900">{employee.fullName}</div>
                    <div className="text-xs text-slate-500">{employee.email}</div>
                  </td>
                  <td className="px-4 py-3">{employee.jobTitle}</td>
                  <td className="px-4 py-3">{employee.country}</td>
                  <td className="px-4 py-3">{employee.department}</td>
                  <td className="px-4 py-3">{formatSalary(employee.salary)}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button
                        aria-label={`Edit ${employee.fullName}`}
                        className="rounded-md bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700"
                        type="button"
                        onClick={() => onEdit(employee.id)}
                      >
                        Edit
                      </button>
                      <button
                        aria-label={`Delete ${employee.fullName}`}
                        className="rounded-md bg-red-50 px-3 py-1 text-xs font-medium text-red-700"
                        type="button"
                        onClick={() => onDelete(employee.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between text-sm text-slate-600">
        <span>
          Page {pagination.page} of {pagination.totalPages} ({pagination.total} employees)
        </span>
        <div className="flex gap-2">
          <button
            aria-label="Previous page"
            className="rounded-md border border-slate-300 px-3 py-1 disabled:opacity-50"
            disabled={pagination.page <= 1}
            type="button"
            onClick={() => onPageChange(pagination.page - 1)}
          >
            Previous
          </button>
          <button
            aria-label="Next page"
            className="rounded-md border border-slate-300 px-3 py-1 disabled:opacity-50"
            disabled={pagination.page >= pagination.totalPages}
            type="button"
            onClick={() => onPageChange(pagination.page + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
};
