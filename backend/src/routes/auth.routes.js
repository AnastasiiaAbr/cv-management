import { Router } from "express";
import { test, register, login } from "../controllers/auth.controller.js";
import { authMiddleware} from "../middleware/auth.middleware.js";

const router = Router();

router.get('/', test);

router.post('/register', register);

router.post('/login', login);

export default router;