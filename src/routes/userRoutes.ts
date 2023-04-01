import express from "express";

import {
  getUsers,
  createUser,
  getUserInfo,
  deleteUser,
  putUser,
} from "../controllers/userControllers";

const userRouter = express.Router();

userRouter.route("/").get(getUsers).post(createUser);
userRouter.route("/:userId").get(getUserInfo).delete(deleteUser).put(putUser);

export default userRouter;
