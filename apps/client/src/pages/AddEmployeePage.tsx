import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createEmployee } from "../api/employees";
import { EmployeeForm } from "../components/forms/EmployeeForm";
import { Alert } from "../components/ui/Alert";
import { Button } from "../components/ui/Button";
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
    <div className="space-y-6">
      <PageHeader
        subtitle="Capture employee details with validated fields before they join payroll."
        title="Add Employee"
        actions={
          <Button type="button" variant="secondary" onClick={() => navigate("/employees")}>
            Back to list
          </Button>
        }
      />
      {error ? <Alert>{error}</Alert> : null}
      <Card>
        <EmployeeForm submitLabel="Save Employee" onSubmit={handleSubmit} />
      </Card>
    </div>
  );
};
