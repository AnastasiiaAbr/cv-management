import { Router } from "express";
import {getProfileAttributes, createProfileAttribute, updateProfileAttribute, deleteProfileAttribute} from "../controllers/profileAttr.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = Router();
router.use(authMiddleware)

router.get("/", getProfileAttributes);

router.post("/", createProfileAttribute);

router.patch("/:id", updateProfileAttribute);

router.delete("/:id", deleteProfileAttribute);

export default router;