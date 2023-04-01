import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import dotenv from "dotenv";
dotenv.config();

import userRouter from "./routes/userRoutes";
import postRouter from "./routes/postRoutes";
import authRouter from "./routes/authRoutes";

import { routeNotFound } from "./middleware/routeNotFound";
import { errorHandler } from "./middleware/errorHandler";

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/posts", postRouter);
app.use("/api/v1/auth", authRouter);

// Custom Handlers
app.use(routeNotFound);
app.use(errorHandler);

const port = process.env.PORT || 8000;
const start = async () => {
  try {
    mongoose.connect(process.env.MONGO_URI!);
    console.log("Connected to MongoDB");
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (err) {
    console.error(err);
  }
};

start();
