import { RequestHandler } from 'express';

import Book from '../models/mongoose/book';

const getBooks: RequestHandler = async (req, res, next) => {
  const books = await Book.find();
  if (books.length !== 0) {
    return res.json({
      books,
    });
  }

  return res.status(404).json({
    message: "no books found",
  });
};
const getBookById: RequestHandler = async (req, res, next) => {
  const bookId = req.params.id;
  const book = await Book.findById(bookId);
  if (book) {
    return res.json({
      book,
    });
  }

  return res.status(404).json({
    message: "no book found",
  });
};

const getBooksBySearch: RequestHandler = (req, res, next) => {
  return res.json({
    msg: "book list",
  });
};

export default {
  getBooks,
  getBookById,
  getBooksBySearch,
};
