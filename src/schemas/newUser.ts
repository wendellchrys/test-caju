import { z } from "zod";

import { validateCpf } from "~/utils";

export const newUserSchema = z.object({
  employeeName: z.string()
    .min(1, "Nome é obrigatório")
    .refine((val) => val.includes(" "), {
      message: "Nome deve conter pelo menos um espaço (sobrenome)",
    })
    .refine((val) => /^[^\d]/.test(val), {
      message: "Nome não pode começar com um número",
    })
    .refine((val) => /[a-zA-Z]{2}/.test(val), {
      message: "Nome deve ter pelo menos duas letras",
    }),
  email: z.string().email("Email inválido"),
  cpf: z.string()
    .min(14, "CPF deve ter 11 dígitos")
    .refine((val) => validateCpf(val), {
      message: "CPF inválido",
    }),
  admissionDate: z.string().min(1, "Data de admissão é obrigatória"),
  status: z.string()
});

export type newUser = z.infer<typeof newUserSchema>;
