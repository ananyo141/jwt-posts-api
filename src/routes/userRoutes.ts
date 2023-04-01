import express from "express";

import {
  getUsers,
  getUserInfo,
  deleteUser,
  putUser,
} from "../controllers/userControllers";

const userRouter = express.Router();

userRouter.route("/").get(getUsers);
userRouter.route("/:userId").get(getUserInfo).delete(deleteUser).put(putUser);

export default userRouter;
