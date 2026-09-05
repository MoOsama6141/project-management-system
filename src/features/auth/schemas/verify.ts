import z from "zod";

const verifySchema = z.object({
  email: z.string().email("Invalid email address"),
  code: z.string().min(1, "OTP is required"),
});

export default verifySchema;
