import { UserModel } from './../models/data_model/user.model';
import { RequestHandler } from "express";
import { validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/mongoose/user";

import { PRIVATE_KEY } from "../util/private-key.js";

const postSignUp: RequestHandler = async (req, res, next) => {
  // just for simple validation
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { username, password, name, surname, date_of_birth } = req.body;

  const user = await User.findOne({ username });
  if (user) {
    return res.status(401).json({
      message: "this user is already in used!",
    });
  }

  const salt = bcrypt.genSaltSync(10);
  const hashedPsw = bcrypt.hashSync(password, salt);

  const newUser = new User({
    username,
    password: hashedPsw,
    name,
    surname,
    date_of_birth,
    book: [],
  });

  try {
    await newUser.save();
  } catch (error) {
    return next(error);
  }

  const token = generateToken(newUser._id.toString(), username);
  return res.json({
    token,
    username,
  });
};

const postSignIn: RequestHandler = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { username, password } = req.body;
  let user;
  try {
    user = await User.findOne({ username });
  } catch (error) {
    return next(error);
  }
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

  const token = generateToken(user._id.toString(), user.username);
  return res.json({
    token,
    username,
  });
};

const generateToken = (uid: string, username: string) => {
  return jwt.sign(
    {
      _id: uid,
      username,
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
