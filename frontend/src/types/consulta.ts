import type { Animal } from "./animal";
import type { Veterinario } from "./veterinario";

export interface Consulta {
  id: number;
  dataHora: string;
  motivo?: string | null;
  status: "Agendada" | "Concluída" | "Cancelada" | "Em andamento";
  anotacoes?: string | null;
  valor?: number | null;

  AnimalId: number;
  VeterinarioId: number;

  Animal?: Animal;
  Veterinario?: Veterinario;

  createdAt?: string;
  updatedAt?: string;
}
