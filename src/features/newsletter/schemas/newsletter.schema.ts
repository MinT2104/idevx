import { z } from "zod";

export const subscribeNewsletterSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address")
    .max(100, "Email must be less than 100 characters")
    .toLowerCase()
    .trim(),

  source: z.string().optional().default("blog"),

  ipAddress: z.string().optional(),

  userAgent: z.string().optional(),
});

export const updateNewsletterStatusSchema = z.object({
  status: z.enum(["active", "unsubscribed", "bounced"]),
});

export type SubscribeNewsletterInput = z.infer<
  typeof subscribeNewsletterSchema
>;
export type UpdateNewsletterStatusInput = z.infer<
  typeof updateNewsletterStatusSchema
>;
