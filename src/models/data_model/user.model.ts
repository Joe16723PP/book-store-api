export interface UserModel {
  _id: any;
  username: string;
  password: string;
  name: string;
  surname: string;
  date_of_birth: string;
  books: [
    {
      bookId: any // type expected is objectid 
    }
  ]
}