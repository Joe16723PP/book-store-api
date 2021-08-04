import { Router } from "express";
import userRoutes from '../controllers/user'
const router = Router();


router.get("/", userRoutes.getUser);

// router.post("/todo", userRoutes.changePassword);

router.put("/todo/:todoId", (req, res, next) => {
  // const id = req.params.todoId;
  // const todoIndex = todos.findIndex((value) => {
  //   return value.id === id;
  // });

  // if (todoIndex >= 0) {
  //   todos[todoIndex] = {
  //     id,
  //     text: req.body.text,
  //   };

  //   return res.status(200).json({
  //     message: "update todo success",
  //     todos,
  //   });
  // }

  // res.status(404).json({
  //   message: "todo not found!",
  // });
});

router.delete("/todo/:todoId", (req, res, next) => {
  // todos = todos.filter((value) => {
  //   return value.id !== req.params.todoId;
  // });
  // res.status(200).json({
  //   message: "delete todo success",
  //   todos,
  // });
});

export default router;
