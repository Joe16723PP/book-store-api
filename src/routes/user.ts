import { Router } from "express";
import userRoutes from '../controllers/user'
import { authMiddleware } from "../util/passport";
const router = Router();

router.get("/", userRoutes.getUser);
router.put("/", userRoutes.updateUser);
router.patch("/change-password", userRoutes.changePassword);
router.patch("/reset-password", userRoutes.resetPassword);
router.delete("/", userRoutes.deleteUser);
router.post("/orders", userRoutes.orderBooks);

export default router;
