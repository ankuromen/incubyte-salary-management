export type SalaryBandDefinition = {
  label: string;
  min: number;
  max: number | null;
};

export const SALARY_BANDS: SalaryBandDefinition[] = [
  { label: "0-50k", min: 0, max: 50_000 },
  { label: "50k-100k", min: 50_000, max: 100_000 },
  { label: "100k-150k", min: 100_000, max: 150_000 },
  { label: "150k+", min: 150_000, max: null }
];
