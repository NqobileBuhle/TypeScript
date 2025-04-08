// src/schema/userSchema.ts
import { z } from "zod";

export const createUserSchema = z.object({
  body: z.object({
    username: z.string({
      required_error: "Username is required",
    }),
    email: z.string().email({ message: "Invalid email" }),
    password: z.string().min(6, "Password too short - should be 6 chars minimum"),
    confirmPassword: z.string(),
  }),
}).refine((data) => data.body.password === data.body.confirmPassword, {
  message: "Passwords do not match",
  path: ["body.confirmPassword"],
});

export type CreateUserInput = z.infer<typeof createUserSchema>;
