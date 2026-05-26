import { useState, type ReactNode } from "react";
import {
  defaultEmployeeFormValues,
  employeeFormSchema,
  type EmployeeFormValues
} from "../../validation/employee-form.schema";

type EmployeeFormProps = {
  initialValues?: EmployeeFormValues;
  submitLabel?: string;
  onSubmit: (values: EmployeeFormValues) => Promise<void> | void;
};

export const EmployeeForm = ({
  initialValues = defaultEmployeeFormValues,
  submitLabel = "Save Employee",
  onSubmit
}: EmployeeFormProps) => {
  const [values, setValues] = useState<EmployeeFormValues>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof EmployeeFormValues, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateField = <K extends keyof EmployeeFormValues>(field: K, value: EmployeeFormValues[K]) => {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validation = employeeFormSchema.safeParse(values);

    if (!validation.success) {
      const fieldErrors: Partial<Record<keyof EmployeeFormValues, string>> = {};
      for (const issue of validation.error.issues) {
        const field = issue.path[0] as keyof EmployeeFormValues;
        if (!fieldErrors[field]) {
          fieldErrors[field] = issue.message;
        }
      }
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit(validation.data);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="grid gap-4 md:grid-cols-2" onSubmit={handleSubmit}>
      <Field error={errors.fullName} label="Full name">
        <input
          aria-label="Full name"
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          value={values.fullName}
          onChange={(event) => updateField("fullName", event.target.value)}
        />
      </Field>
      <Field error={errors.email} label="Email">
        <input
          aria-label="Email"
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          type="email"
          value={values.email}
          onChange={(event) => updateField("email", event.target.value)}
        />
      </Field>
      <Field error={errors.jobTitle} label="Job title">
        <input
          aria-label="Job title"
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          value={values.jobTitle}
          onChange={(event) => updateField("jobTitle", event.target.value)}
        />
      </Field>
      <Field error={errors.country} label="Country">
        <input
          aria-label="Country"
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          value={values.country}
          onChange={(event) => updateField("country", event.target.value)}
        />
      </Field>
      <Field error={errors.department} label="Department">
        <input
          aria-label="Department"
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          value={values.department}
          onChange={(event) => updateField("department", event.target.value)}
        />
      </Field>
      <Field error={errors.salary} label="Salary">
        <input
          aria-label="Salary"
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          min={0}
          type="number"
          value={values.salary || ""}
          onChange={(event) => updateField("salary", Number(event.target.value))}
        />
      </Field>
      <Field error={errors.dateOfJoining} label="Joining date">
        <input
          aria-label="Joining date"
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          type="date"
          value={values.dateOfJoining}
          onChange={(event) => updateField("dateOfJoining", event.target.value)}
        />
      </Field>
      <div className="md:col-span-2">
        <button
          className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white disabled:opacity-60"
          disabled={isSubmitting}
          type="submit"
        >
          {submitLabel}
        </button>
      </div>
    </form>
  );
};

const Field = ({ label, error, children }: { label: string; error?: string; children: ReactNode }) => (
  <div className="space-y-1 text-sm">
    <span className="font-medium text-slate-700">{label}</span>
    {children}
    {error ? <span className="text-xs text-red-600">{error}</span> : null}
  </div>
);
