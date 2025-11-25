import { z } from "zod";

export const consultaCreateSchema = z.object({
  dataHora: z.string().datetime().transform((str) => new Date(str)),
  motivo: z.string().optional(),
  pacienteId: z.number().int().positive(),
  dentistaId: z.number().int().positive(),
});

export const consultaUpdateSchema = z.object({
  dataHora: z.string().datetime().transform((str) => new Date(str)).optional(),
  motivo: z.string().optional(),
  pacienteId: z.number().int().positive().optional(),
  dentistaId: z.number().int().positive().optional(),
});