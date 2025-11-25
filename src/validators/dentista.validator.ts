import { z } from "zod";

export const dentistaCreateSchema = z.object({
  nome: z.string().min(1, "O nome é obrigatório"),
  email: z.string().email("Email inválido"),
  cro: z.string().min(1, "O CRO é obrigatório"),
  especialidade: z.string().min(1, "A especialidade é obrigatória"),
});

export const dentistaUpdateSchema = z.object({
  nome: z.string().min(1, "O nome é obrigatório").optional(),
  email: z.string().email("Email inválido").optional(),
  cro: z.string().min(1, "O CRO é obrigatório").optional(),
  especialidade: z.string().min(1, "A especialidade é obrigatória").optional(),
});