import { RequestHandler } from 'express';
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/mongoose/user";

import { PRIVATE_KEY } from "../util/private-key.js";

const postSignUp: RequestHandler = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(401).json({
      message: "email or password is undefined!",
    });
  }
  const user = await User.findOne({ email });
  if (user) {
    return res.status(401).json({
      message: "this email is already in used!",
    });
  }

  const salt = bcrypt.genSaltSync(10);
  const hashedPsw = bcrypt.hashSync(password, salt);

  const newUser = new User({
    email,
    password: hashedPsw,
  });
  await newUser.save();

  const token = generateToken(newUser._id.toString(), email);
  return res.json({
    token,
    email,
  });
};

const postSignIn: RequestHandler = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({
      message: "user not found",
    });
  }

  const isCorrect = bcrypt.compareSync(password, user.password);
  if (!isCorrect) {
    return res.status(401).json({
      message: "incorrect password",
    });
  }

  const token = generateToken(user._id.toString(), user.email);
  return res.json({
    token,
    email,
  });
};

const generateToken = (uid: string, email: string) => {
  return jwt.sign(
    {
      _id: uid,
      email: email,
    },
    PRIVATE_KEY,
    {
      expiresIn: "1d",
    }
  );
};

export default {
  postSignIn,
  postSignUp,
};
