import { z } from "zod";

export const registerSchema = z
  .object({
    email: z.string().email("Invalid email address"),
    name: z.string().min(1, "Name is required"),
    username: z.string().min(1, "Username is required").regex(/^\S*$/, "Username cannot contain spaces"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[a-z]/, "Must contain at least one lowercase letter")
      .regex(/[A-Z]/, "Must contain at least one uppercase letter")
      .regex(/\d/, "Must contain at least one digit")
      .regex(/[@$!%*?&]/, "Must contain a special character (@$!%*?&)"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type RegisterFormValues = z.infer<typeof registerSchema>;
