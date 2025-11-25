import { PrismaClient } from "../generated/prisma";
const prisma = new PrismaClient();

export const dentistaService = {
  async getAll() {
    return prisma.dentista.findMany({
      include: {
        consultas: {
          include: {
            paciente: true,
          },
          orderBy: { dataHora: "asc" },
        },
      },
      orderBy: { nome: "asc" },
    });
  },

  async getById(id: number) {
    const dentista = await prisma.dentista.findUnique({
      where: { id },
      include: {
        consultas: {
          include: {
            paciente: true,
          },
          orderBy: { dataHora: "asc" },
        },
      },
    });

    if (!dentista) throw new Error("Dentista não encontrado");
    return dentista;
  },

  async create(data: {
    nome: string;
    email: string;
    cro: string;
    especialidade: string;
  }) {
   
    const emailExists = await prisma.dentista.findUnique({ where: { email: data.email } });
    if (emailExists) throw new Error("Email já cadastrado");

    const croExists = await prisma.dentista.findUnique({ where: { cro: data.cro } });
    if (croExists) throw new Error("CRO já cadastrado");

    const dentista = await prisma.dentista.create({
      data,
      include: {
        consultas: true,
      },
    });

    return dentista;
  },

  async update(
    id: number,
    data: {
      nome?: string;
      email?: string;
      cro?: string;
      especialidade?: string;
    }
  ) {
    const dentista = await prisma.dentista.findUnique({ where: { id } });
    if (!dentista) throw new Error("Dentista não encontrado");
 
    if (data.email) {
      const emailExists = await prisma.dentista.findUnique({ where: { email: data.email } });
      if (emailExists && emailExists.id !== id) throw new Error("Email já cadastrado");
    }

    if (data.cro) {
      const croExists = await prisma.dentista.findUnique({ where: { cro: data.cro } });
      if (croExists && croExists.id !== id) throw new Error("CRO já cadastrado");
    }

    const updated = await prisma.dentista.update({
      where: { id },
      data: {
        ...(data.nome && { nome: data.nome }),
        ...(data.email && { email: data.email }),
        ...(data.cro && { cro: data.cro }),
        ...(data.especialidade && { especialidade: data.especialidade }),
      },
      include: {
        consultas: {
          include: {
            paciente: true,
          },
        },
      },
    });

    return updated;
  },

  async remove(id: number) {
    const dentista = await prisma.dentista.findUnique({ where: { id } });
    if (!dentista) throw new Error("Dentista não encontrado");

    await prisma.dentista.delete({ where: { id } });
    return { message: "Dentista excluído com sucesso" };
  },
};