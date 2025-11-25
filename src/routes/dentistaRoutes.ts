import { Router } from "express";
import { dentistaController } from "../controllers/dentistaController";

const router = Router();

router.get("/", dentistaController.getAll);
router.get("/:id", dentistaController.getById);
router.post("/", dentistaController.create);
router.put("/:id", dentistaController.update);
router.delete("/:id", dentistaController.remove);

export default router;