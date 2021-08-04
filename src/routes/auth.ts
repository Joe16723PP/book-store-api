import { Router } from "express";
import { body } from 'express-validator';
import authControllers from '../controllers/auth';

const router: Router = Router();

const authValidator = [
  body("username").trim().isLength({ min: 5 }),
  body("password").trim().isLength({ min: 5 }),
  body("name").trim().isEmpty(),
  body("surname").trim().isEmpty(),
  body("date_of_birth").trim().isEmpty()
];

router.post('/sign-in', authValidator, authControllers.postSignIn);
router.post('/sign-up', authControllers.postSignUp);


export default router;
