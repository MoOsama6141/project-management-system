import z from "zod";

const registerSchema = z
  .object({
    userName: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    country: z.string().min(1, "Country is required"),
    phoneNumber: z.string().min(1, "Phone is required"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z
      .string()
      .min(6, "Confirm password must be at least 6 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export default registerSchema;
