import { RequestHandler } from "express";
import { validationResult } from "express-validator";
import fetch from "node-fetch";
import Book from "../models/mongoose/book";

import { ExternalBookModel } from "./../models/data_model/external-book.model";

const externalUri = {
  books: "https://scb-test-book-publisher.herokuapp.com/books",
  recommendedBooks:
    "https://scb-test-book-publisher.herokuapp.com/books/recommendation",
};

const getExternalBooks: RequestHandler = async (req, res, next) => {
  const bookResponse = await fetch(externalUri.books);
  const recommendedResponse = await fetch(externalUri.recommendedBooks);
  const books = (await bookResponse.json()) as ExternalBookModel[];
  const recBooks = (await recommendedResponse.json()) as ExternalBookModel[];

  const recommendedBooks: ExternalBookModel[] = [];
  const filteredBooks: ExternalBookModel[] = [];

  books.forEach((book) => {
    const matched = recBooks.find((recBook) => {
      return recBook.id === book.id;
    });
    if (matched) {
      recommendedBooks.push({ ...book, is_recommended: !!matched });
    } else {
      filteredBooks.push({ ...book, is_recommended: !!matched });
    }
  });

  const sortedBooks = filteredBooks.sort((a, b) => {
    // locale compare for other lang
    return a.book_name.localeCompare(b.book_name);
  });

  // concat array
  const updatedBooks = [...recommendedBooks, ...sortedBooks];

  return res.json(updatedBooks);
};

/* 
  this code below is for get the list of books on my own db
  it use mongoose model to manange data
*/
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
  try {
    const book = await Book.findById(bookId);
    if (book) {
      return res.json(book._doc);
    }
  } catch (error) {
    return next(error);
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
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { book_name, author_name, price, is_recommended } = req.body;

  const newBook = new Book({
    book_name,
    author_name,
    price,
    is_recommended,
  });

  try {
    await newBook.save();
  } catch (error) {
    return next(error);
  }

  return res.status(200).json(newBook._doc);
};

const updateBook: RequestHandler = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { bookId, book_name, author_name, price, is_recommended } = req.body;
  const updatedBook = await Book.findById(bookId);
  if (updatedBook) {
    // manuel update
    updatedBook.book_name = book_name;
    updatedBook.author_name = author_name;
    updatedBook.price = price;
    updatedBook.is_recommended = is_recommended;
    await updatedBook.save();

    return res.status(200).json(updatedBook._doc);
  }

  return res.status(404).json({ msg: "book not found" });
};

const deleteBooksById: RequestHandler = async (req, res, next) => {
  const bookId = req.body.bookId;
  
  try {
    const deletedBook = await Book.findByIdAndRemove(bookId);
    if (deletedBook) {
      return res.json({
        msg: `deleted book ${deletedBook?.book_name}`,
      });
    } 
    return res.status(401).json({
      msg: "deleted fail"
    })
  } catch (error) {
    return next(error);
  }
};

export default {
  getExternalBooks,
  getBooks,
  getBookById,
  getBooksBySearch,
  addBook,
  updateBook,
  deleteBooksById,
};
