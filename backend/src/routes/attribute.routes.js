import { Router } from "express";
import { createAttribute, getAttributes, updateAttribute, deleteAttribute } from "../controllers/attribute.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = Router();

router.post("/", authMiddleware, createAttribute);
router.get('/', authMiddleware, getAttributes);
router.put('/:id', authMiddleware, updateAttribute);
router.delete('/:id', authMiddleware, deleteAttribute);

export default router;