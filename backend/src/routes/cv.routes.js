import { Router } from "express";
import {
  getCVs,
  getCVById,
  createCV,
  updateCV,
  deleteCV,
} from "../controllers/cv.controller.js";
import {authMiddleware} from "../middleware/auth.middleware.js";
import { checkRoles } from "../middleware/checkRoles.middleware.js";


const router = Router();


router.get("/",authMiddleware, getCVs);
router.get("/:id", authMiddleware, getCVById);
router.post("/", authMiddleware, checkRoles("CANDIDATE"), createCV);
router.put("/:id", authMiddleware, checkRoles("CANDIDATE"), updateCV);
router.delete("/:id", authMiddleware, checkRoles("CANDIDATE"), deleteCV);

export default router;