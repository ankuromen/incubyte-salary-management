import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteEmployee, fetchEmployees } from "../api/employees";
import { EmployeeTable } from "../components/employees/EmployeeTable";
import { Alert } from "../components/ui/Alert";
import { Button } from "../components/ui/Button";
import { ConfirmDialog } from "../components/ui/ConfirmDialog";
import { PageHeader } from "../components/ui/PageHeader";
import type { Employee, EmployeeListFilters, EmployeePagination } from "../types/employee";

const defaultPagination: EmployeePagination = {
  page: 1,
  limit: 10,
  total: 0,
  totalPages: 1
};

export const EmployeeListPage = () => {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [pagination, setPagination] = useState<EmployeePagination>(defaultPagination);
  const [filters, setFilters] = useState<EmployeeListFilters>({
    search: "",
    country: "",
    department: ""
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [employeeToDelete, setEmployeeToDelete] = useState<Employee | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const loadEmployees = useCallback(async (page: number, nextFilters: EmployeeListFilters) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetchEmployees(nextFilters, page);
      setEmployees(response.data);
      setPagination(response.pagination);
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : "Failed to load employees");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadEmployees(pagination.page, filters);
  }, [filters, loadEmployees, pagination.page]);

  const countryOptions = useMemo(
    () => Array.from(new Set(employees.map((employee) => employee.country))).sort(),
    [employees]
  );

  const departmentOptions = useMemo(
    () => Array.from(new Set(employees.map((employee) => employee.department))).sort(),
    [employees]
  );

  const handleDeleteRequest = (id: string) => {
    const employee = employees.find((item) => item.id === id);
    if (employee) {
      setEmployeeToDelete(employee);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!employeeToDelete) {
      return;
    }

    setIsDeleting(true);
    setError(null);

    try {
      await deleteEmployee(employeeToDelete.id);
      setEmployeeToDelete(null);
      await loadEmployees(pagination.page, filters);
    } catch (deleteError) {
      setError(deleteError instanceof Error ? deleteError.message : "Failed to delete employee");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        subtitle="Search and filter across your workforce. Paginated for performance at scale."
        title="Employees"
        actions={
          <Button type="button" onClick={() => navigate("/employees/new")}>
            Add Employee
          </Button>
        }
      />

      {error ? <Alert>{error}</Alert> : null}

      <EmployeeTable
        countryOptions={countryOptions}
        departmentOptions={departmentOptions}
        employees={employees}
        filters={filters}
        isLoading={isLoading}
        pagination={pagination}
        onCountryChange={(country) => {
          setPagination((current) => ({ ...current, page: 1 }));
          setFilters((current) => ({ ...current, country }));
        }}
        onDelete={handleDeleteRequest}
        onDepartmentChange={(department) => {
          setPagination((current) => ({ ...current, page: 1 }));
          setFilters((current) => ({ ...current, department }));
        }}
        onEdit={(id) => navigate(`/employees/${id}/edit`)}
        onPageChange={(page) => setPagination((current) => ({ ...current, page }))}
        onSearchChange={(search) => {
          setPagination((current) => ({ ...current, page: 1 }));
          setFilters((current) => ({ ...current, search }));
        }}
      />

      <ConfirmDialog
        confirmLabel="Delete"
        isLoading={isDeleting}
        message={
          employeeToDelete
            ? `Are you sure you want to remove ${employeeToDelete.fullName}? This action cannot be undone.`
            : ""
        }
        open={employeeToDelete !== null}
        title="Delete employee?"
        onCancel={() => {
          if (!isDeleting) {
            setEmployeeToDelete(null);
          }
        }}
        onConfirm={() => {
          void handleDeleteConfirm();
        }}
      />
    </div>
  );
};
