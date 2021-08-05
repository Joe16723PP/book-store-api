import { Router } from "express";
import { body } from "express-validator";

import userRoutes from "../controllers/user";

const router = Router();

const userValidator = [body("orders").isArray({ min: 1 })];

router.get("/", userRoutes.getUser);
router.put("/", userRoutes.updateUser);
router.patch("/change-password", userRoutes.changePassword);
router.patch("/reset-password", userRoutes.resetPassword);
router.delete("/", userRoutes.deleteUser);
router.post("/orders", userValidator, userRoutes.orderBooks);

export default router;
