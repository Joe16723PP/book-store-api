import mongoose from "mongoose";
import { BookModel } from "../data_model/book.model";
import { UserModel } from "../data_model/user.model";

const Schema = mongoose.Schema;

interface IOrder {
  bookId: any;
  quantity: number;
}

const userSchema = new Schema<UserModel>({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },
  date_of_birth: {
    type: String,
    required: true,
  },
  // use bookid with ref for populate funciton of mongoose
  orders: {
    items: [
      {
        bookId: {
          type: Schema.Types.ObjectId,
          required: true,
          ref: "Book",
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
  },
});

userSchema.methods.addToOrder = function (bookList: BookModel[]) {
  bookList.forEach((book: BookModel) => {
    const orderBookIndex = this.orders.items.findIndex((orderBook) => {
      return orderBook.bookId.toString() === book._id.toString();
    });

    let newQuantity = 1;
    const updatedOrderItems: IOrder[] = [...this.orders.items];
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
    const updatedOrder: { items: IOrder[] } = { items: updatedOrderItems };
    //
    this.orders = updatedOrder as {
      items: [{ bookId: any; quantity: number }];
    };
  });
  return this.save();
};

export default mongoose.model<UserModel>("User", userSchema);
