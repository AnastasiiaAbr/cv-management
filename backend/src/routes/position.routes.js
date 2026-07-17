import { Router } from "express";
import { getPositions, getPositionById, createPosition, updatePosition, updatePositionAttributes, deletePosition } from "../controllers/position.controller.js";

const router = Router();

router.get("/", getPositions);
router.get("/:id", getPositionById);

router.post("/", createPosition);

router.put("/:id", updatePosition);
router.put("/:id/attributes", updatePositionAttributes);

router.delete("/:id", deletePosition);

export default router;