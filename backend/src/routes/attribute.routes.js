import { Router } from "express";
import { createAttribute, getAttributes, updateAttribute, deleteAttribute } from "../controllers/attribute.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { checkRoles } from "../middleware/checkRoles.middleware.js";

const router = Router();

router.post("/", authMiddleware, checkRoles('ADMIN', 'RECRUITER'), createAttribute);
router.get('/', authMiddleware, getAttributes);
router.put('/:id', authMiddleware, checkRoles("ADMIN", "RECRUITER"), updateAttribute);
router.delete('/:id', authMiddleware, checkRoles("ADMIN", "RECRUITER"), deleteAttribute);

export default router;