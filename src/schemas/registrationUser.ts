import { z } from "zod";

export const registrationUserSchema = z.object({
  id: z.string(),
  employeeName: z.string(), 
  email: z.string().email("Email inválido"), 
  cpf: z.string().length(11, "CPF deve ter 11 dígitos"),
  admissionDate: z.string(),
  status: z.enum(["REVIEW", "APPROVED", "REPROVED"]),
});

export type RegistrationUser = z.infer<typeof registrationUserSchema>;
