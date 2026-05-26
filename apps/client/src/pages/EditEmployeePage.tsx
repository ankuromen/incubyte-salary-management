import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchEmployee, updateEmployee } from "../api/employees";
import { EmployeeForm } from "../components/forms/EmployeeForm";
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
    return <p className="text-sm text-slate-600">Loading employee...</p>;
  }

  return (
    <div className="space-y-4">
      <PageHeader title="Edit Employee" />
      {error ? <p className="text-sm text-red-600">{error}</p> : null}
      <Card>
        <EmployeeForm initialValues={initialValues} submitLabel="Update Employee" onSubmit={handleSubmit} />
      </Card>
    </div>
  );
};
