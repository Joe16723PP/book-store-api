import { RequestHandler } from "express";
import { validationResult } from "express-validator";
import mongoose from "mongoose";

import User from "../models/mongoose/user";
import Book from "../models/mongoose/book";

const getUser: RequestHandler = async (req, res, next) => {
  const userId = req.user;
  const user = await User.findById(userId);

  if (user) {
    return res.json({
      name: user.name,
      surname: user.surname,
      date_of_birth: user.date_of_birth,
      orders: user.orders,
    });
  }

  return res.status(404).json({
    msg: "user not found",
  });
};

const updateUser: RequestHandler = async (req, res, next) => {
  const userId = req.user;
  const { name, surname, date_of_birth } = req.body;

  const updatedUser = await User.findByIdAndUpdate(userId, {
    name,
    surname,
    date_of_birth,
  });
  if (updatedUser) {
    return res.json({
      msg: `update ${updatedUser.username} success`,
    });
  }

  return res.status(404).json({
    msg: "cannot update this user",
  });
};

const changePassword: RequestHandler = (req, res, next) => {
  // not in used for now
  return res.json({
    msg: "change password",
  });
};

const resetPassword: RequestHandler = (req, res, next) => {
  // not in used for now
  return res.json({
    msg: "reset password",
  });
};

const deleteUser: RequestHandler = async (req, res, next) => {
  const userId = req.user;
  const user = await User.findByIdAndDelete(userId);
  if (user) {
    return res.json({
      msg: `deleted user: ${user.username} success`,
    });
  }
  return res.status(404).json({
    msg: "delete user failed",
  });
};

const orderBooks: RequestHandler = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const bookIds: string[] = req.body.orders;
  const userId = req.user;
  const user = await User.findById(userId);
  if (user) {
    const newBookIds = bookIds.map((id) => {
      return mongoose.Types.ObjectId(id);
    });

    const bookList = await Book.find({ _id: { $in: newBookIds } });
    await user.addToOrder(bookList);
    user
      .populate("orders.items.bookId")
      .execPopulate()
      .then((user) => {
        return user.orders.items;
      })
      .then((books) => {
        return books.map((item) => {
          return {
            bookName: item.bookId.book_name,
            price: item.bookId.price,
            quantity: item.quantity,
          };
        });
      })
      .then((books) => {
        let totalPrice = 0;
        books.forEach((book) => {
          totalPrice += book.price * book.quantity;
        });

        return res.json({
          orders: books,
          totalPrice,
        });
      });
  }
};

export default {
  getUser,
  updateUser,
  changePassword,
  resetPassword,
  deleteUser,
  orderBooks,
};
