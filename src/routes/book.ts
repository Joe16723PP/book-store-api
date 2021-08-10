import { Router } from "express";
import { body } from "express-validator";

import bookController from "../controllers/book";

const router = Router();

const bookValidator = [
  body("book_name").trim().isLength({ min: 6 }),
  body("author_name").trim().isLength({ min: 4 }),
  body("price").notEmpty(),
];

router.get("/", bookController.getBooks);
router.get("/ext", bookController.getExternalBooks);
router.get("/:id", bookController.getBookById);
// router.get("/", bookController.getBooksBySearch);
router.post("/", bookValidator, bookController.addBook);
router.put("/", bookValidator, bookController.updateBook);
router.delete("/:id", bookController.deleteBooksById);

export default router;
