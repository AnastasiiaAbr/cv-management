import { Router } from "express";
import { test, register } from "../controllers/auth-controller.js";

const router = Router();

router.get('/', test);

router.post('/register', register);

export default router;