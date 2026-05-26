import type { Employee, EmployeeListFilters, EmployeePagination } from "../../types/employee";
import { formatSalary } from "../../lib/format";
import { Avatar } from "../ui/Avatar";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";
import { Card } from "../ui/Card";
import { inputClassName, labelClassName, selectClassName } from "../ui/Input";

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
}: EmployeeTableProps) => (
  <section className="space-y-4">
    <Card className="bg-slate-50/50">
      <p className="mb-4 text-xs font-semibold uppercase tracking-wide text-slate-500">Filters</p>
      <div className="grid gap-4 md:grid-cols-3">
        <div>
          <label className={labelClassName} htmlFor="employee-search">
            Search
          </label>
          <input
            aria-label="Search employees"
            className={inputClassName}
            id="employee-search"
            placeholder="Name or email…"
            type="search"
            value={filters.search}
            onChange={(event) => onSearchChange(event.target.value)}
          />
        </div>
        <div>
          <label className={labelClassName} htmlFor="country-filter">
            Country
          </label>
          <select
            aria-label="Country filter"
            className={selectClassName}
            id="country-filter"
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
        </div>
        <div>
          <label className={labelClassName} htmlFor="department-filter">
            Department
          </label>
          <select
            aria-label="Department filter"
            className={selectClassName}
            id="department-filter"
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
      </div>
    </Card>

    <Card padding={false} className="overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50/80 text-xs font-semibold uppercase tracking-wide text-slate-500">
              <th className="px-6 py-4">Employee</th>
              <th className="px-4 py-4">Role</th>
              <th className="px-4 py-4">Location</th>
              <th className="px-4 py-4">Department</th>
              <th className="px-4 py-4">Salary</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {isLoading ? (
              <tr>
                <td className="px-6 py-12 text-center text-slate-500" colSpan={6}>
                  <div className="mx-auto mb-3 h-8 w-8 animate-spin rounded-full border-2 border-indigo-600 border-t-transparent" />
                  Loading employees…
                </td>
              </tr>
            ) : employees.length === 0 ? (
              <tr>
                <td className="px-6 py-12 text-center text-slate-500" colSpan={6}>
                  No employees match your filters.
                </td>
              </tr>
            ) : (
              employees.map((employee) => (
                <tr key={employee.id} className="transition-colors hover:bg-indigo-50/30">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <Avatar name={employee.fullName} />
                      <div>
                        <p className="font-semibold text-slate-900">{employee.fullName}</p>
                        <p className="text-xs text-slate-500">{employee.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-slate-700">{employee.jobTitle}</td>
                  <td className="px-4 py-4">
                    <Badge>{employee.country}</Badge>
                  </td>
                  <td className="px-4 py-4 text-slate-700">{employee.department}</td>
                  <td className="px-4 py-4 font-semibold text-slate-900">{formatSalary(employee.salary)}</td>
                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-2">
                      <Button
                        aria-label={`Edit ${employee.fullName}`}
                        className="!px-3 !py-1.5 text-xs"
                        variant="secondary"
                        onClick={() => onEdit(employee.id)}
                      >
                        Edit
                      </Button>
                      <Button
                        aria-label={`Delete ${employee.fullName}`}
                        className="!px-3 !py-1.5 text-xs"
                        variant="danger"
                        onClick={() => onDelete(employee.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-slate-200 bg-slate-50/50 px-6 py-4">
        <p className="text-sm text-slate-600">
          Page <span className="font-semibold text-slate-900">{pagination.page}</span> of{" "}
          <span className="font-semibold text-slate-900">{pagination.totalPages}</span>
          <span className="text-slate-400"> · </span>
          {pagination.total.toLocaleString()} total
        </p>
        <div className="flex gap-2">
          <Button
            aria-label="Previous page"
            disabled={pagination.page <= 1}
            variant="secondary"
            onClick={() => onPageChange(pagination.page - 1)}
          >
            Previous
          </Button>
          <Button
            aria-label="Next page"
            disabled={pagination.page >= pagination.totalPages}
            variant="secondary"
            onClick={() => onPageChange(pagination.page + 1)}
          >
            Next
          </Button>
        </div>
      </div>
    </Card>
  </section>
);
