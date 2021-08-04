export interface ExternalBookModel {
  id: number;
  book_name: string;
  author_name: string;
  price: number;
  is_recommended?: boolean;
}