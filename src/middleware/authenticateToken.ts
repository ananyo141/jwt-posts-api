import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

import * as CustomError from "../errors";

export const authenticateToken = (
  _req: Request,
  _res: Response,
  _next: NextFunction
) => {
  const authHeader = _req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null)
    throw new CustomError.UnauthorizedError("No token provided");

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string, (err: any, user: any) => {
    if (err) throw new CustomError.UnauthorizedError(err.message);
    _req.user = user.userId;
    _next();
  });
};
