import { z } from "zod";

export const createUserSchema = z.object({
  body: z
    .object({
      username: z.string({ required_error: "Username is required" }),
      email: z.string().email({ message: "Invalid email address" }),
      password: z.string().min(6, "Password must be at least 6 characters"),
      confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    }),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;
