import { Router } from "express";
import bookController from '../controllers/book'
const router = Router();

router.get("/", bookController.getBooks);
router.get("/ext", bookController.getExternalBooks)
router.get("/:id", bookController.getBookById);
router.get("/", bookController.getBooksBySearch);
router.post("/", bookController.addBook);
router.put("/", bookController.updateBook);
router.delete("/", bookController.deleteBooksById);

export default router;
