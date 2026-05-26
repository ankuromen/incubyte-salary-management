import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import type { CreateEmployeeDto } from "../employees/dto/create-employee.dto.js";
import {
  COUNTRIES,
  DEPARTMENTS,
  JOINING_DATE_START,
  JOB_TITLES,
  SALARY_MAX,
  SALARY_MIN
} from "./seed.constants.js";

export const DEFAULT_SEED_COUNT = 10_000;

const moduleDir = path.dirname(fileURLToPath(import.meta.url));
const dataDir = path.resolve(moduleDir, "../../data");

const parseNameFile = (filePath: string): string[] => {
  return readFileSync(filePath, "utf-8")
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0);
};

export const loadNameLists = () => ({
  firstNames: parseNameFile(path.join(dataDir, "first_names.txt")),
  lastNames: parseNameFile(path.join(dataDir, "last_names.txt"))
});

type RandomFn = () => number;

const createSeededRandom = (seed: number): RandomFn => {
  let state = seed;

  return () => {
    state = (state * 1_664_525 + 1_013_904_223) % 2 ** 32;
    return state / 2 ** 32;
  };
};

const pickRandom = <T>(items: readonly T[], random: RandomFn): T => {
  const index = Math.floor(random() * items.length);
  return items[index]!;
};

const randomInt = (min: number, max: number, random: RandomFn): number => {
  return Math.floor(random() * (max - min + 1)) + min;
};

const randomJoiningDate = (random: RandomFn): Date => {
  const start = JOINING_DATE_START.getTime();
  const end = Date.now();
  const timestamp = randomInt(start, end, random);

  return new Date(timestamp);
};

export const generateEmployeeRecords = (
  count: number,
  options?: { seed?: number }
): CreateEmployeeDto[] => {
  const random = options?.seed === undefined ? Math.random : createSeededRandom(options.seed);
  const { firstNames, lastNames } = loadNameLists();

  return Array.from({ length: count }, (_, index) => {
    const firstName = pickRandom(firstNames, random);
    const lastName = pickRandom(lastNames, random);

    return {
      fullName: `${firstName} ${lastName}`,
      email: `employee.${index + 1}@salarymgmt.local`,
      jobTitle: pickRandom(JOB_TITLES, random),
      country: pickRandom(COUNTRIES, random),
      department: pickRandom(DEPARTMENTS, random),
      salary: randomInt(SALARY_MIN, SALARY_MAX, random),
      dateOfJoining: randomJoiningDate(random)
    };
  });
};
