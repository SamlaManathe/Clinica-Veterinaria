import { PrismaClient } from "../generated/prisma";
const prisma = new PrismaClient();

export const consultaService = {

  async getAll() {
    return prisma.consulta.findMany({
      include: {
        paciente: true,
        dentista: true,
      },
      orderBy: { dataHora: "asc" },
    });
  },

  async getById(id: number) {
    const consulta = await prisma.consulta.findUnique({
      where: { id },
      include: {
        paciente: true,
        dentista: true,
      },
    });

    if (!consulta) throw new Error("Consulta não encontrada");
    return consulta;
  },

  async create(data: {
    dataHora: Date;
    motivo?: string;
    pacienteId: number;
    dentistaId: number;
  }) {
   
    const paciente = await prisma.paciente.findUnique({ where: { id: data.pacienteId } });
    if (!paciente) throw new Error("Paciente informado não existe");

    const dentista = await prisma.dentista.findUnique({ where: { id: data.dentistaId } });
    if (!dentista) throw new Error("Dentista informado não existe");

    const consulta = await prisma.consulta.create({
      data: {
        dataHora: data.dataHora,
        motivo: data.motivo,
        pacienteId: data.pacienteId,
        dentistaId: data.dentistaId,
      },
      include: {
        paciente: true,
        dentista: true,
      },
    });

    return consulta;
  },

  async update(
    id: number,
    data: {
      dataHora?: Date;
      motivo?: string;
      pacienteId?: number;
      dentistaId?: number;
    }
  ) {
    const consulta = await prisma.consulta.findUnique({ where: { id } });
    if (!consulta) throw new Error("Consulta não encontrada");

    if (data.pacienteId) {
      const paciente = await prisma.paciente.findUnique({ where: { id: data.pacienteId } });
      if (!paciente) throw new Error("Paciente informado não existe");
    }

    if (data.dentistaId) {
      const dentista = await prisma.dentista.findUnique({ where: { id: data.dentistaId } });
      if (!dentista) throw new Error("Dentista informado não existe");
    }

    const updated = await prisma.consulta.update({
      where: { id },
      data: {
        ...(data.dataHora && { dataHora: data.dataHora }),
        ...(data.motivo && { motivo: data.motivo }),
        ...(data.pacienteId && { pacienteId: data.pacienteId }),
        ...(data.dentistaId && { dentistaId: data.dentistaId }),
      },
      include: {
        paciente: true,
        dentista: true,
      },
    });

    return updated;
  },

  async remove(id: number) {
    const consulta = await prisma.consulta.findUnique({ where: { id } });
    if (!consulta) throw new Error("Consulta não encontrada");

    await prisma.consulta.delete({ where: { id } });
    return { message: "Consulta excluída com sucesso" };
  },
};