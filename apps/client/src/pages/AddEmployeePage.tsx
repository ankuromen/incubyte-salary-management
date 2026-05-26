import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createEmployee } from "../api/employees";
import { EmployeeForm } from "../components/forms/EmployeeForm";
import { Card } from "../components/ui/Card";
import { PageHeader } from "../components/ui/PageHeader";
import type { EmployeeFormValues } from "../validation/employee-form.schema";

export const AddEmployeePage = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (values: EmployeeFormValues) => {
    setError(null);

    try {
      await createEmployee(values);
      navigate("/employees");
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Failed to create employee");
    }
  };

  return (
    <div className="space-y-4">
      <PageHeader title="Add Employee" />
      {error ? <p className="text-sm text-red-600">{error}</p> : null}
      <Card>
        <EmployeeForm submitLabel="Save Employee" onSubmit={handleSubmit} />
      </Card>
    </div>
  );
};
