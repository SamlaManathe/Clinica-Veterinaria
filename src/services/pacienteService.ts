import { PrismaClient } from "../generated/prisma";
const prisma = new PrismaClient();

export const pacienteService = {
  async getAll() {
    return prisma.paciente.findMany({
      include: {
        consultas: true,
      },
      orderBy: { nome: "asc" },
    });
  },

  async getById(id: number) {
    const paciente = await prisma.paciente.findUnique({
      where: { id },
      include: {
        consultas: true,
      },
    });
    if (!paciente) throw new Error("Paciente não encontrado");
    return paciente;
  },

  async create(data: {
    nome: string;
    email: string;
    cpf: string;
    telefone?: string;
    dataNascimento: Date;
  }) {
    const paciente = await prisma.paciente.create({
      data,
      include: {
        consultas: true,
      },
    });
    return paciente;
  },

  async update(
    id: number,
    data: {
      nome?: string;
      email?: string;
      cpf?: string;
      telefone?: string;
      dataNascimento?: Date;
    }
  ) {
    const paciente = await prisma.paciente.findUnique({ where: { id } });
    if (!paciente) throw new Error("Paciente não encontrado");

    const updated = await prisma.paciente.update({
      where: { id },
      data,
      include: {
        consultas: true,
      },
    });
    return updated;
  },

  async remove(id: number) {
    const paciente = await prisma.paciente.findUnique({ where: { id } });
    if (!paciente) throw new Error("Paciente não encontrado");

    await prisma.paciente.delete({ where: { id } });
    return { message: "Paciente excluído com sucesso" };
  },
};