import { RequestHandler } from 'express';


const getUser: RequestHandler = (req, res, next) => {
  return res.json({
    msg: "get user",
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

const deleteUser: RequestHandler = (req, res, next) => {
  return res.json({
    msg: "delete user",
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
