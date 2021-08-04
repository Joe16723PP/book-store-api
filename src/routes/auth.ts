import { Router } from "express";
import { body } from "express-validator";
import authControllers from "../controllers/auth";

const router: Router = Router();

const signUpValidator = [
  body("username").trim().isLength({ min: 5 }),
  body("password").trim().isLength({ min: 5 }),
  body("name").trim().notEmpty(),
  body("surname").trim().notEmpty(),
  body("date_of_birth").trim().notEmpty(),
];

const signInValidator = [
  body("username").trim().notEmpty(),
  body("password").trim().notEmpty(),
];

router.post("/sign-in", signInValidator, authControllers.postSignIn);
router.post("/sign-up", signUpValidator, authControllers.postSignUp);

export default router;
