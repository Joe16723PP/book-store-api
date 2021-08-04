import { Router } from "express";
import bookController from '../controllers/book'
const router = Router();

router.get("/", bookController.getBooks);
router.get("/", bookController.getBookById);
router.get("/", bookController.getBooksBySearch);
router.get("/", bookController.addBook);
router.get("/", bookController.deleteBooksById);
router.get("/", bookController.updateBook);

export default router;
