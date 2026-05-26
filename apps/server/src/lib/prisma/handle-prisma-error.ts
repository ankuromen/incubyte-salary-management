import { Prisma } from "@prisma/client";
import { ValidationError } from "../../errors/http-error.js";

export const withUniqueEmailHandling = async <T>(operation: () => Promise<T>): Promise<T> => {
  try {
    return await operation();
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
      throw new ValidationError("Validation failed", [
        { path: ["email"], message: "email must be unique" }
      ]);
    }

    throw error;
  }
};
