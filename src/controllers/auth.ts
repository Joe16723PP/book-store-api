import { RequestHandler } from 'express';
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/mongoose/user";

import { PRIVATE_KEY } from "../util/private-key.js";
import { UserModel } from '../models/data_model/user.model';

const postSignUp: RequestHandler = async (req, res, next) => {
  const { username, password, name, surname } = req.body;
  if (!username || !password) {
    return res.status(401).json({
      message: "username or password is undefined!",
    });
  }
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
    book: []
  });
  await newUser.save();

  const token = generateToken(newUser._id.toString(), username);
  return res.json({
    token,
    username,
  });
};

const postSignIn: RequestHandler = async (req, res, next) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
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
