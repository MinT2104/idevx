import { z } from "zod";

export const createFeedbackSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters")
    .regex(/^[a-zA-Z\s]+$/, "Name can only contain letters and spaces"),

  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address")
    .max(100, "Email must be less than 100 characters"),

  phone: z
    .string()
    .min(1, "Phone number is required")
    .min(10, "Phone number must be at least 10 characters")
    .max(20, "Phone number must be less than 20 characters")
    .regex(
      /^[\d\s\-+()]+$/,
      "Phone number can only contain digits, spaces, dashes, plus signs, and parentheses"
    ),

  company: z
    .string()
    .min(1, "Company name is required")
    .min(2, "Company name must be at least 2 characters")
    .max(100, "Company name must be less than 100 characters"),

  skype: z
    .string()
    .min(1, "Skype detail is required")
    .min(2, "Skype detail must be at least 2 characters")
    .max(100, "Skype detail must be less than 100 characters"),

  website: z
    .string()
    .min(1, "Website is required")
    .url("Please enter a valid website URL"),

  message: z
    .string()
    .min(1, "Message is required")
    .min(10, "Message must be at least 10 characters")
    .max(2000, "Message must be less than 2000 characters"),
});

export const updateFeedbackStatusSchema = z.object({
  status: z.enum(["new", "read", "replied", "archived"]),
});

export type CreateFeedbackInput = z.infer<typeof createFeedbackSchema>;
export type UpdateFeedbackStatusInput = z.infer<
  typeof updateFeedbackStatusSchema
>;
