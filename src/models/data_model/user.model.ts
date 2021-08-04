export interface UserModel {
  _id: any;
  username: string;
  password: string;
  name: string;
  surname: string;
  book: [
    {
      bookId: any // type expected is objectid 
    }
  ]
}