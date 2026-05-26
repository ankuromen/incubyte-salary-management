import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchEmployee, updateEmployee } from "../api/employees";
import { EmployeeForm } from "../components/forms/EmployeeForm";
import { Alert } from "../components/ui/Alert";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { PageHeader } from "../components/ui/PageHeader";
import {
  defaultEmployeeFormValues,
  type EmployeeFormValues
} from "../validation/employee-form.schema";

export const EditEmployeePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [initialValues, setInitialValues] = useState<EmployeeFormValues>(defaultEmployeeFormValues);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      return;
    }

    const loadEmployee = async () => {
      try {
        const employee = await fetchEmployee(id);
        setInitialValues({
          fullName: employee.fullName,
          email: employee.email,
          jobTitle: employee.jobTitle,
          country: employee.country,
          department: employee.department,
          salary: employee.salary,
          dateOfJoining: employee.dateOfJoining.slice(0, 10)
        });
      } catch (loadError) {
        setError(loadError instanceof Error ? loadError.message : "Failed to load employee");
      } finally {
        setIsLoading(false);
      }
    };

    void loadEmployee();
  }, [id]);

  const handleSubmit = async (values: EmployeeFormValues) => {
    if (!id) {
      return;
    }

    setError(null);

    try {
      await updateEmployee(id, values);
      navigate("/employees");
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Failed to update employee");
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-24">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-indigo-600 border-t-transparent" />
        <p className="text-sm font-medium text-slate-500">Loading employee…</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        subtitle="Update compensation, role, or contact details for this team member."
        title="Edit Employee"
        actions={
          <Button type="button" variant="secondary" onClick={() => navigate("/employees")}>
            Back to list
          </Button>
        }
      />
      {error ? <Alert>{error}</Alert> : null}
      <Card>
        <EmployeeForm initialValues={initialValues} submitLabel="Update Employee" onSubmit={handleSubmit} />
      </Card>
    </div>
  );
};
