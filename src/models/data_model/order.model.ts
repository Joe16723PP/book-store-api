import { BookModel } from './book.model';
export interface OrderModel {
  _id?: any;
  books: [
    {
      book: BookModel;
      quantity: number;
    },
  ],
  user: {
    username: string;
    userId: any;
  },
}