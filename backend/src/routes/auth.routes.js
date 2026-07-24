import { Router } from "express";
import { register, login, getMe, githubLogin, githubCallback } from "../controllers/auth.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = Router();

router.post('/register', register);

router.post('/login', login);

router.get("/me", authMiddleware, getMe);

router.get("/github", githubLogin);
router.get("/github/callback", githubCallback);

export default router;