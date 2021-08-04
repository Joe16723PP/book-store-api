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
  orders: {
    items: [
      {
        bookId: {
          type: Schema.Types.ObjectId,
          required: true,
          ref: "Book"
        },
        quantity: {
          type: Number,
          required: true
        }
      }
    ]
  }
});

userSchema.methods.addToOrder = function (bookList) {
  bookList.forEach((book: any) => {
    const orderBookIndex = this.orders.items.findIndex((orderBook: {bookId: string, quantity: number}) => {
      return orderBook.bookId.toString() === book._id.toString();
    });
  
    let newQuantity = 1;
    const updatedOrderItems = [...this.orders.items];
    if (orderBookIndex >= 0) {
      // update quantity
      newQuantity = updatedOrderItems[orderBookIndex].quantity + 1;
      updatedOrderItems[orderBookIndex].quantity = newQuantity;
    } else {
      // add new book
      updatedOrderItems.push({
        bookId: book._id,
        quantity: newQuantity,
      });
    }
    // update old order with new order
    const updatedOrder = { items: updatedOrderItems };
    this.orders = updatedOrder;

  })
  return this.save();

};

export default mongoose.model("User", userSchema);
