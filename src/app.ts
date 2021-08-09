/*
  book store api developed by jirot chaitamart 
  using express with mvc programing
*/

import mongoose from "mongoose";
import express, { Application } from "express";
import bodyParser from "body-parser";
import cors from "cors";

import authRoutes from "./routes/auth";
import userRoutes from "./routes/user";
import bookRoutes from "./routes/book";
import { authMiddleware } from "./util/passport";

const app: Application = express();
const port = 3000;

// mongo atlas config
const config = {
  username: "jirot-joe-16723",
  psw: "5XwKaVTw6fGnynNt",
  database: "ScbTest",
};

// cors config for test
const corsOptions = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
};
const MONGODB_URI = `mongodb+srv://${config.username}:${config.psw}@cluster0.d05gz.mongodb.net/${config.database}`;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors(corsOptions));

app.get("/", (req, res, next) => {
  res.json({
    msg: "yoyo",
  });
});

// routes
app.use(authRoutes);
app.use("/users", authMiddleware, userRoutes);
app.use("/books", bookRoutes);

// no match route
app.use((req, res, next) => {
  res.status(404).json({
    msg: "route not found",
  });
});

//@ts-ignore
app.use((err, req, res, next) => {
  // save err log then response to client
  console.log(err);

  res.status(500).json({
    msg: "Internal server error",
  });
});

mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log(`scb test, book api server is runing on port ${port}`);
    app.listen(port);
  })
  .catch((err) => {
    console.log(err);
  });
