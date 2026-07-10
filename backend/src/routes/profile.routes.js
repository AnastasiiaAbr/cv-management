import {Router} from 'express';
import { authMiddleware } from '../middleware/auth.middleware.js';
import {getProfile } from '../controllers/profile.controller.js';

const router = Router();

router.get('/', authMiddleware, getProfile);

export default router;