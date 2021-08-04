import mongoose from "mongoose";
import { OrderModel } from './../data_model/order.model';


const Schema = mongoose.Schema;

const orderSchema = new Schema<OrderModel>({
  books: [
    {
      book: { type: Object, required: true },
      quantity: { type: Number, required: true },
    },
  ],
  user: {
    username: {
      type: String,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
});

module.exports = mongoose.model("Order", orderSchema);
