import { z } from "zod";

export const verifyRequestSchema = z.object({
  boletoId: z.string().min(1).max(128),
  amount: z.string().min(1).max(32),
  dueDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  beneficiaryDocument: z.string().min(1).max(32),
});

export type VerifyRequest = z.infer<typeof verifyRequestSchema>;
