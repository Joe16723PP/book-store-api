export interface UserModel {
  _id?: any; // objectId
  username: string;
  password: string;
  name: string;
  surname: string;
  date_of_birth: string;
  books: [
    {
      bookId: any // objectId
    }
  ]
}