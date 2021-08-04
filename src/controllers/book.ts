import { RequestHandler } from 'express';
import fetch from 'node-fetch'
import Book from '../models/mongoose/book';

import { ExternalBookModel } from './../models/data_model/external-book.model';
import { BookModel } from './../models/data_model/book.model';


const externalUri = {
  books: "https://scb-test-book-publisher.herokuapp.com/books",
  recommendedBooks: "https://scb-test-book-publisher.herokuapp.com/books/recommendation"
}


const getExternalBooks: RequestHandler = async (req, res, next) => {
  const bookResponse = await fetch(externalUri.books);
  const recommendedResponse = await fetch(externalUri.recommendedBooks);
  const books = await bookResponse.json() as ExternalBookModel[];
  const recBooks = await recommendedResponse.json() as ExternalBookModel[];

  console.log(books, recBooks);
  

  const updatedBooks = books.map(book => {
    const patched = recBooks.find(recBook => {
      return recBook.id === book.id;
    });
    return {...book, is_recommended: !!patched};
  })

  return res.json(updatedBooks)
  
}


/* 
  this commented code is for get the list of books on my own db
  it use mongoose model to mananging data
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

  // manuel update
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
  getExternalBooks,
  getBooks,
  getBookById,
  getBooksBySearch,
  addBook,
  updateBook,
  deleteBooksById
};
