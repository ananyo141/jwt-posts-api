import express from "express";

import {
  getAllUsers,
  createUser,
  deleteUser,
  putUser,
} from "../controllers/userControllers";

const userRouter = express.Router();

userRouter.route("/").get(getAllUsers).post(createUser);
userRouter.route("/:id").delete(deleteUser).put(putUser);

export default userRouter;
