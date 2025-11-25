import { Request, Response } from "express";
import { pacienteService } from "../services/pacienteService";
import { pacienteCreateSchema, pacienteUpdateSchema } from "../validators/paciente.validator";
import { ZodError } from "zod";

export const pacienteController = {
  /**
   * @swagger
   * /pacientes:
   *   get:
   *     summary: Lista todos os pacientes
   *     tags: [Pacientes]
   *     responses:
   *       200:
   *         description: Lista de pacientes retornada com sucesso
   */
  getAll: async (req: Request, res: Response) => {
    try {
      const pacientes = await pacienteService.getAll();
      res.json(pacientes);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },

  /**
   * @swagger
   * /pacientes/{id}:
   *   get:
   *     summary: Retorna um paciente por ID
   *     tags: [Pacientes]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *     responses:
   *       200:
   *         description: Paciente encontrado
   *       404:
   *         description: Paciente não encontrado
   */
  getById: async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const paciente = await pacienteService.getById(id);
      res.json(paciente);
    } catch (error: any) {
      res.status(404).json({ error: error.message });
    }
  },

  /**
   * @swagger
   * /pacientes:
   *   post:
   *     summary: Cria um novo paciente
   *     tags: [Pacientes]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/PacienteCreate'
   *     responses:
   *       201:
   *         description: Paciente criado com sucesso
   *       400:
   *         description: Dados inválidos
   */
  create: async (req: Request, res: Response) => {
    try {
      const parsed = pacienteCreateSchema.parse(req.body);
      const paciente = await pacienteService.create({
        ...parsed,
        dataNascimento: new Date(parsed.dataNascimento),
      });
      res.status(201).json(paciente);
    } catch (error: any) {
      if (error instanceof ZodError) {
        res.status(400).json({ errors: error.flatten().fieldErrors });
      } else {
        res.status(500).json({ error: error.message });
      }
    }
  },

  /**
   * @swagger
   * /pacientes/{id}:
   *   put:
   *     summary: Atualiza um paciente
   *     tags: [Pacientes]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/PacienteUpdate'
   *     responses:
   *       200:
   *         description: Paciente atualizado com sucesso
   *       400:
   *         description: Dados inválidos
   *       404:
   *         description: Paciente não encontrado
   */
  update: async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const parsed = pacienteUpdateSchema.parse(req.body);
      const updated = await pacienteService.update(id, {
        ...parsed,
        dataNascimento: parsed.dataNascimento ? new Date(parsed.dataNascimento) : undefined,
      });
      res.json(updated);
    } catch (error: any) {
      if (error instanceof ZodError) {
        res.status(400).json({ errors: error.flatten().fieldErrors });
      } else {
        res.status(404).json({ error: error.message });
      }
    }
  },

  /**
   * @swagger
   * /pacientes/{id}:
   *   delete:
   *     summary: Remove um paciente
   *     tags: [Pacientes]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *     responses:
   *       200:
   *         description: Paciente removido com sucesso
   *       404:
   *         description: Paciente não encontrado
   */
  remove: async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const result = await pacienteService.remove(id);
      res.json(result);
    } catch (error: any) {
      res.status(404).json({ error: error.message });
    }
  },
};