import { Router } from "express";
import { secretarioController } from "../controllers/secretarioController";

const router = Router();

router.get("/", secretarioController.getAll);
router.get("/:id", secretarioController.getById);
router.post("/", secretarioController.create);
router.put("/:id", secretarioController.update);
router.delete("/:id", secretarioController.remove);

export default router;