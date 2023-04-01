import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { genAccessToken } from "../utils/jwt";

import User from "../models/userModel";
import * as CustomErrors from "../errors";
import asyncWrapper from "../utils/asyncWrapper";

export const loginController = asyncWrapper(
  async (_req: Request, _res: Response, _next: NextFunction) => {
    const { email, password } = _req.body;
    if (!email || !password)
      return _next(
        new CustomErrors.BadRequestError("Please provide email and password")
      );

    const user = await User.findOne({ email: email });
    if (!user)
      return _next(
        new CustomErrors.NotFoundError("Invalid email or user does not exist")
      );

    // passwords match, return access token and refresh token
    if (await user.comparePassword(password, _next)) {
      const accessToken = genAccessToken(user);
      _res
        .status(StatusCodes.OK)
        .json({ accessToken: accessToken, refreshToken: accessToken });
    } else {
      // passwords do not match
      return _next(new CustomErrors.UnauthorizedError("Invalid password"));
    }
  }
);

export const registerController = asyncWrapper(
  async (_req: Request, _res: Response, _next: NextFunction) => {
    if (!_req.body.name || !_req.body.email || !_req.body.password)
      return _next(
        new CustomErrors.BadRequestError("Please provide all required fields")
      );

    let user = await User.findOne({
      email: _req.body.email,
    });
    if (user)
      return _next(new CustomErrors.BadRequestError("User already exists"));
    else {
      user = await User.create(_req.body);
      const accessToken = genAccessToken(user);
      _res
        .status(StatusCodes.CREATED)
        .json({ accessToken: accessToken, user: user });
    }
  }
);

export const logoutController = asyncWrapper(
  async (_req: Request, _res: Response) => {
    _res.status(StatusCodes.OK).json(_req.body);
  }
);
