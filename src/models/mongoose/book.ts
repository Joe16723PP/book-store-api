import mongoose from "mongoose";
import { BookModel } from "../data_model/book.model";

const Schema = mongoose.Schema;

const bookSchema = new Schema<BookModel>({
  name: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  is_recommended: {
    type: Boolean,
    required: true
  }
});

export default mongoose.model("Book", bookSchema);
