import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createEmployee } from "../api/employees";
import { EmployeeForm } from "../components/forms/EmployeeForm";
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
      <h1 className="text-2xl font-bold text-slate-900">Add Employee</h1>
      {error ? <p className="text-sm text-red-600">{error}</p> : null}
      <div className="rounded-xl border border-slate-200 bg-white p-6">
        <EmployeeForm submitLabel="Save Employee" onSubmit={handleSubmit} />
      </div>
    </div>
  );
};
