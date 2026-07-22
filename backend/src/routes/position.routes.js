import { Router } from "express";
import { getPositions, getPositionById, createPosition, updatePosition, updatePositionAttributes, deletePosition } from "../controllers/position.controller.js";
import { authMiddleware} from "../middleware/auth.middleware.js";
import { checkRoles } from "../middleware/checkRoles.middleware.js";


const router = Router();

router.get("/", getPositions);
router.get("/:id", getPositionById);

router.post("/", authMiddleware, checkRoles("ADMIN", "RECRUITER"), createPosition);

router.put("/:id", authMiddleware, checkRoles("ADMIN", "RECRUITER"), updatePosition);
router.put("/:id/attributes", authMiddleware, checkRoles("ADMIN", "RECRUITER"), updatePositionAttributes);

router.delete("/:id", authMiddleware, checkRoles("ADMIN", "RECRUITER"),deletePosition);

export default router;