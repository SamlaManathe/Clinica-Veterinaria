import { z } from "zod";

const dataNascimentoSchema = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, "Formato de data inválido (use YYYY-MM-DD)")
  .transform((str) => new Date(str));

export const pacienteCreateSchema = z.object({
  nome: z.string(),
  email: z.string().email(),
  cpf: z.string(),
  telefone: z.string().optional(),
  dataNascimento: dataNascimentoSchema,
});

export const pacienteUpdateSchema = z.object({
  nome: z.string().optional(),
  email: z.string().email().optional(),
  cpf: z.string().optional(),
  telefone: z.string().optional(),
  dataNascimento: dataNascimentoSchema.optional(),
});