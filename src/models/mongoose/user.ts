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
  book: [
    {
      bookId: {
        type: Schema.Types.ObjectId,
        ref: "Book",
      },
    }
  ],
});

userSchema.methods.orderBook = function (book: BookModel) {
  const updatedBooks = [...this.book, book._id.toString()];

  this.book = updatedBooks;
  return this.save();
};

export default mongoose.model("User", userSchema);
