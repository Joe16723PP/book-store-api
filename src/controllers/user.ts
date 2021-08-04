import { RequestHandler } from 'express';

import User from '../models/mongoose/user';


const getUser: RequestHandler = async (req, res, next) => {
  const userId = req.user;
  const user = await User.findById(userId);

  return res.json({
    name: user.name,
    surname: user.surname,
    date_of_birth: user.date_of_birth,
    books: user.books
  });
};

const updateUser: RequestHandler = (req, res, next) => {

}

const changePassword: RequestHandler = (req, res, next) => {
  return res.json({
    msg: "change password",
  });
};

const resetPassword: RequestHandler = (req, res, next) => {
  return res.json({
    msg: "reset password",
  });
};

const deleteUser: RequestHandler = async (req, res, next) => {
  const userId = req.user;
  const user = await User.findByIdAndDelete(userId);
  return res.json({
    msg: `delete user id ${userId}`,
  });
};

const orderBooks: RequestHandler = (req, res, next) => {
};

export default {
  getUser,
  updateUser,
  changePassword,
  resetPassword,
  deleteUser,
  orderBooks
};
