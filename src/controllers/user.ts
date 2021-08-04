import { RequestHandler } from 'express';
import mongoose from 'mongoose';

import User from '../models/mongoose/user';
import Book from '../models/mongoose/book';


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

const updateUser: RequestHandler = async (req, res, next) => {
  const userId = req.user;
  const { name, surname, date_of_birth } = req.body

  const updatedUser = await User.findByIdAndUpdate(userId, {
    name,
    surname,
    date_of_birth
  });
  return res.json({
    msg: `update ${updatedUser.usernaem} success`
  })
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
    msg: `deleted user: ${user.username} success`,
  });
};

const orderBooks: RequestHandler = async (req, res, next) => {
  const bookIds: string[] = req.body.orders;
  const userId = req.user;
  const user = await User.findById(userId);
  const newBookIds = bookIds.map(id => {
    return mongoose.Types.ObjectId(id);
  });

  const bookList = await Book.find({'_id': { $in: newBookIds}});
  await user.addToOrder(bookList);
  user.populate("orders.items.bookId")
  .execPopulate()
  .then((user: any) => {
    return user.orders.items
  })
  .then((books: any) => {
    return books.map((item: any) => {
      return {
        bookName: item.bookId.book_name,
        price: item.bookId.price,
        quantity: item.quantity
      }
    })
  })
  .then((books: any) => {
    let totalPrice = 0;
    books.forEach((book: any) => {
      totalPrice += (book.price * book.quantity);
    });

    return res.json({
      orders: books,
      totalPrice
    })
  })
};

export default {
  getUser,
  updateUser,
  changePassword,
  resetPassword,
  deleteUser,
  orderBooks
};
