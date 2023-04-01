import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import * as CustomError from "../errors";
import UserModel from "../models/userModel";
import { asyncWrapper } from "../utils";

export const getUsers = asyncWrapper(
  async (_req: Request, _res: Response, _next: NextFunction) => {
    const users = await UserModel.find();
    _res.status(StatusCodes.OK).json(users);
  }
);

export const getUserInfo = asyncWrapper(
  async (_req: Request, _res: Response, _next: NextFunction) => {
    const user = await UserModel.findById(_req.user);
    if (!user) {
      _next(new CustomError.NotFoundError("User not found"));
    } else {
      _res
        .status(StatusCodes.OK)
        .json({ name: user.name, email: user.email, id: user._id });
    }
  }
);

export const putUser = asyncWrapper(
  async (_req: Request, _res: Response, _next: NextFunction) => {
    const user = await UserModel.findById(_req.user);
    if (!user) _next(new CustomError.NotFoundError("User not found"));
    else {
      user.set(_req.body);
      await user.save();
      _res.status(StatusCodes.OK).json(user);
    }
  }
);

export const deleteUser = asyncWrapper(
  async (_req: Request, _res: Response, _next: NextFunction) => {
    const user = await UserModel.deleteOne({ _id: _req.user });
    if (!user) _next(new CustomError.NotFoundError("User not found"));
    else _res.status(StatusCodes.NO_CONTENT).json(user);
  }
);
