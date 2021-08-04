import { Router } from "express";
import userRoutes from '../controllers/user'
import { authMiddleware } from "../util/passport";
const router = Router();

router.get("/", authMiddleware, userRoutes.getUser);
router.put("/", userRoutes.updateUser);
router.patch("/change-password", userRoutes.changePassword);
router.patch("/reset-password", userRoutes.resetPassword);
router.delete("/", userRoutes.deleteUser);
router.post("/", userRoutes.orderBooks);

export default router;
