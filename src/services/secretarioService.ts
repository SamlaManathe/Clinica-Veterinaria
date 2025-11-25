import { PrismaClient } from "../generated/prisma";
const prisma = new PrismaClient();

export const secretarioService = {
  async getAll() {
    return prisma.secretario.findMany({
      orderBy: { nome: "asc" },
    });
  },

  async getById(id: number) {
    const secretario = await prisma.secretario.findUnique({ where: { id } });
    if (!secretario) throw new Error("Secretário não encontrado");
    return secretario;
  },

  async create(data: { nome: string; email: string; senha: string; telefone?: string }) {
    const emailExists = await prisma.secretario.findUnique({ where: { email: data.email } });
    if (emailExists) throw new Error("Email já cadastrado");

    const secretario = await prisma.secretario.create({ data });
    return secretario;
  },

  async update(
    id: number,
    data: { nome?: string; email?: string; senha?: string; telefone?: string }
  ) {
    const secretario = await prisma.secretario.findUnique({ where: { id } });
    if (!secretario) throw new Error("Secretário não encontrado");

    if (data.email) {
      const emailExists = await prisma.secretario.findUnique({ where: { email: data.email } });
      if (emailExists && emailExists.id !== id) throw new Error("Email já cadastrado");
    }

    const updated = await prisma.secretario.update({ where: { id }, data });
    return updated;
  },

  async remove(id: number) {
    const secretario = await prisma.secretario.findUnique({ where: { id } });
    if (!secretario) throw new Error("Secretário não encontrado");

    await prisma.secretario.delete({ where: { id } });
    return { message: "Secretário excluído com sucesso" };
  },
};