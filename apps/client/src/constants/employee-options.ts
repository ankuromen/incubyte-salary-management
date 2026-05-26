/** Aligned with apps/server/src/seed/seed.constants.ts */
export const COUNTRIES = [
  "India",
  "USA",
  "United Kingdom",
  "Canada",
  "Germany",
  "Australia",
  "Singapore",
  "Japan"
] as const;

export const DEPARTMENTS = [
  "Engineering",
  "Product",
  "Human Resources",
  "Finance",
  "Sales",
  "Marketing",
  "Operations",
  "Support"
] as const;

export const JOB_TITLES = [
  "Software Engineer",
  "Senior Software Engineer",
  "Staff Engineer",
  "Product Manager",
  "HR Specialist",
  "Financial Analyst",
  "Sales Executive",
  "Marketing Manager",
  "Operations Lead",
  "Support Engineer"
] as const;

export const isListedOption = (value: string, options: readonly string[]) =>
  options.includes(value as (typeof options)[number]);
