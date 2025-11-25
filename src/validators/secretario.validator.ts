import { z } from "zod";

export const secretarioCreateSchema = z.object({
  nome: z.string(),
  email: z.string().email(),
  senha: z.string().min(6),
  telefone: z.string().optional(),
});

export const secretarioUpdateSchema = z.object({
  nome: z.string().optional(),
  email: z.string().email().optional(),
  senha: z.string().min(6).optional(),
  telefone: z.string().optional(),
});