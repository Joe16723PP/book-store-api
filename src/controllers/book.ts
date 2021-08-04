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
    return res.json(book._doc);
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

const addBook: RequestHandler = async (req, res, next) => {
  const { book_name, author_name, price, is_recommended } = req.body;
  // validate field
  const newBook = new Book({
    book_name,
    author_name,
    price,
    is_recommended
  });

  await newBook.save();

  return res.status(200).json(newBook._doc);
}

const updateBook: RequestHandler = async (req, res, next) => {
  const { bookId, book_name, author_name, price, is_recommended } = req.body;
  // validate field
  const updatedBook = await Book.findById(bookId);

  updatedBook.book_name = book_name;
  updatedBook.author_name = author_name;
  updatedBook.price = price;
  updatedBook.is_recommended = is_recommended;

  await updatedBook.save();

  return res.status(200).json(updatedBook._doc);
}

const deleteBooksById: RequestHandler = async (req, res, next) => {
  const bookId = req.body.bookId;
  await Book.findByIdAndRemove(bookId);
  return res.json({
    msg: `deleted book id ${bookId}`
  })
}

export default {
  getBooks,
  getBookById,
  getBooksBySearch,
  addBook,
  updateBook,
  deleteBooksById
};
