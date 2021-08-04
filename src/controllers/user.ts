import { RequestHandler } from 'express';


const signIn: RequestHandler = (req, res, next) => {
  return res.json({
    msg: "get user",
  });
}

const getUser: RequestHandler = (req, res, next) => {
  return res.json({
    msg: "get user",
  });
};

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

const enrollToCourse: RequestHandler = (req, res, next) => {
};

export default {
  getUser,
  changePassword,
  resetPassword,
  deleteUser,
  enrollToCourse,
};
