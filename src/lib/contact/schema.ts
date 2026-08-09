import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Enter your name.").max(80),
  email: z.email("Enter a valid email address.").max(254),
  subject: z.string().trim().min(3, "Add a short subject.").max(120),
  message: z
    .string()
    .trim()
    .min(20, "Please add a little more detail.")
    .max(5000),
  company: z.string().max(200),
  turnstileToken: z.string().min(1, "Complete the anti-bot check."),
});

export type ContactInput = z.infer<typeof contactSchema>;
