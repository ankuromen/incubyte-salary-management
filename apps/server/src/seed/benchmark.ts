export const logBenchmark = (label: string, durationMs: number, detail?: string) => {
  const detailSuffix = detail ? ` (${detail})` : "";
  console.log(`[seed] ${label}: ${durationMs.toFixed(2)}ms${detailSuffix}`);
};
