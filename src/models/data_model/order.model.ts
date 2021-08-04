import { BookModel } from "./book.model";
import { Document } from "mongoose";

export interface OrderModel extends Document {
  _id?: any;
  _doc?: any;
  books: [
    {
      book: BookModel;
      quantity: number;
    }
  ];
  user: {
    username: string;
    userId: any;
  };
}
