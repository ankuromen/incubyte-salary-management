import { z } from "zod";

export const emailField = () => z.string().trim().email("email must be valid");
