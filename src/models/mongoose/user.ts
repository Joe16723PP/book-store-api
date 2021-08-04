import mongoose from "mongoose";
import { BookModel } from "../data_model/book.model";
import {UserModel} from '../data_model/user.model';

const Schema = mongoose.Schema;

const userSchema = new Schema<UserModel>({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  surname: {
    type: String,
    required: true
  },
  date_of_birth: {
    type: String,
    required: true
  },
  // use bookid with ref for populate funciton of mongoose
  books: [
    {
      bookId: {
        type: Schema.Types.ObjectId,
        ref: "Book",
      },
    }
  ],
});

userSchema.methods.orderBook = function (orders: string[]) {
  const updatedBooks = [...this.books];
  orders.forEach(id => {
    updatedBooks.push({ bookId: id});
  })
  
  this.books = updatedBooks;
  return this.save();
};

export default mongoose.model("User", userSchema);
