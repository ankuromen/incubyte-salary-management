import { useState, type ReactNode } from "react";
import { COUNTRIES, DEPARTMENTS, JOB_TITLES } from "../../constants/employee-options";
import {
  defaultEmployeeFormValues,
  employeeFormSchema,
  type EmployeeFormValues
} from "../../validation/employee-form.schema";
import { Button } from "../ui/Button";
import { inputClassName, labelClassName } from "../ui/Input";
import { SelectWithOther } from "./SelectWithOther";

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
    <form className="grid gap-5 md:grid-cols-2" onSubmit={handleSubmit}>
      <Field error={errors.fullName} label="Full name">
        <input
          aria-label="Full name"
          className={inputClassName}
          value={values.fullName}
          onChange={(event) => updateField("fullName", event.target.value)}
        />
      </Field>
      <Field error={errors.email} label="Email">
        <input
          aria-label="Email"
          className={inputClassName}
          type="email"
          value={values.email}
          onChange={(event) => updateField("email", event.target.value)}
        />
      </Field>

      <SelectWithOther
        ariaLabel="Job title"
        error={errors.jobTitle}
        label="Job title"
        options={JOB_TITLES}
        otherPlaceholder="Enter job title"
        value={values.jobTitle}
        onChange={(jobTitle) => updateField("jobTitle", jobTitle)}
      />

      <SelectWithOther
        ariaLabel="Country"
        error={errors.country}
        label="Country"
        options={COUNTRIES}
        otherPlaceholder="Enter country"
        value={values.country}
        onChange={(country) => updateField("country", country)}
      />

      <SelectWithOther
        ariaLabel="Department"
        error={errors.department}
        label="Department"
        options={DEPARTMENTS}
        otherPlaceholder="Enter department"
        value={values.department}
        onChange={(department) => updateField("department", department)}
      />

      <Field error={errors.salary} label="Salary">
        <input
          aria-label="Salary"
          className={inputClassName}
          min={0}
          type="number"
          value={values.salary || ""}
          onChange={(event) => updateField("salary", Number(event.target.value))}
        />
      </Field>
      <Field error={errors.dateOfJoining} label="Joining date">
        <input
          aria-label="Joining date"
          className={inputClassName}
          type="date"
          value={values.dateOfJoining}
          onChange={(event) => updateField("dateOfJoining", event.target.value)}
        />
      </Field>
      <div className="flex gap-3 md:col-span-2 md:justify-end">
        <Button disabled={isSubmitting} type="submit">
          {isSubmitting ? "Saving…" : submitLabel}
        </Button>
      </div>
    </form>
  );
};

const Field = ({ label, error, children }: { label: string; error?: string; children: ReactNode }) => (
  <div>
    <label className={labelClassName}>{label}</label>
    {children}
    {error ? <p className="mt-1.5 text-xs font-medium text-red-600">{error}</p> : null}
  </div>
);
