import { Router } from "express";
import authControllers from '../controllers/auth';

const router: Router = Router();

router.post('/sign-in', authControllers.postSignIn);
router.post('/sign-up', authControllers.postSignUp);


export default router;
