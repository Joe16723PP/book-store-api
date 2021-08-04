import { BookModel } from './../models/data_model/book.model';
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
    msg: `delete user id ${user.username}`,
  });
};

const orderBooks: RequestHandler = async (req, res, next) => {
  const orders: string[] = req.body.orders;
  const userId = req.user;
  const user = await User.findById(userId);

  const updatedUser = await user.orderBook(orders);
  updatedUser.populate("books.bookId") // populate book detail
  .execPopulate() // make population to promise function
  .then((result: {books: BookModel[]}) => {
    return result.books;
  })
  .then((data: {bookId: any}[]) => {
    // restructure result to BookModel
    return data.map(object => {
      return {
        ...object.bookId._doc
      }
    })
  })
  .then((books: BookModel[]) => {
    let totalPrice = 0;
    books.forEach(book => {
      totalPrice += book.price;
    })
    return res.json({
      totalPrice,
      numOfBook: books.length
    })
  });



};

export default {
  getUser,
  updateUser,
  changePassword,
  resetPassword,
  deleteUser,
  orderBooks
};
