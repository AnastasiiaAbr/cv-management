import express from "express";
import {
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/user.controller.js";
import {authMiddleware }from "../middleware/auth.middleware.js";
import { checkRoles } from "../middleware/checkRoles.middleware.js";

const router = express.Router();

router.use(authMiddleware);
router.use(checkRoles("ADMIN"));

router.get("/", getUsers);
router.get("/:id", getUserById);

router.put("/:id", updateUser);

router.delete("/:id", deleteUser);

export default router;