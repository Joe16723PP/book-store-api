import { Document } from "mongoose";

export interface BookModel extends Document {
  _id?: any; // objectId
  book_name: string;
  author_name: string;
  price: number;
  is_recommended: boolean;
  _doc?: any;
}
