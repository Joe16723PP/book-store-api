import { Document } from "mongoose";
import { BookModel } from "./book.model";

export interface UserModel extends Document {
  _id?: any; // objectId
  _doc?: any;
  username: string;
  password: string;
  name: string;
  surname: string;
  date_of_birth: string;
  orders: {
    items: [
      {
        bookId: any;
        quantity: number;
      }
    ];
  };
  addToOrder(arg: BookModel[]): Function;
}
