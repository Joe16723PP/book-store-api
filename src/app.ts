import mongoose from "mongoose";
import express, { Application } from "express";
import bodyParser from "body-parser";
import cors from "cors";

import authRoutes from "./routes/auth";
import userRoutes from "./routes/user";
import bookRoutes from "./routes/book";

const app: Application = express();
const port = 3000;
const config = {
  username: "jirot-joe-16723",
  psw: "5XwKaVTw6fGnynNt",
  database: "ScbTest",
};
const MONGODB_URI = `mongodb+srv://${config.username}:${config.psw}@cluster0.d05gz.mongodb.net/${config.database}`;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res, next) => {
  res.json({
    msg: "yoyo",
  });
});

// routes
app.use(authRoutes);
app.use("/user", userRoutes);
app.use("/book", bookRoutes);


mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    console.log("runing on port 3000");
    app.listen(port);
  })
  .catch((err) => {
    console.log(err);
  });
