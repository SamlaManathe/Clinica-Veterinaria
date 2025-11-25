import { Router } from "express";
import { pacienteController } from "../controllers/pacienteController";

const router = Router();

router.get("/", pacienteController.getAll);
router.get("/:id", pacienteController.getById);
router.post("/", pacienteController.create);
router.put("/:id", pacienteController.update);
router.delete("/:id", pacienteController.remove);

export default router;