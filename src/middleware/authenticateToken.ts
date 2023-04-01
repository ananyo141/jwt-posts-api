import { NextFunction, Request, Response } from "express";
import { jwtUtils } from "../utils";

import * as CustomError from "../errors";

export const authenticateToken = async (
  _req: Request,
  _res: Response,
  _next: NextFunction
) => {
  const authHeader = _req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) throw new CustomError.ForbiddenError("No token provided");

  try {
    const decoded = await jwtUtils.verifyAccessToken(token);
    _req.user = decoded.userId;
	_req.access_token = token;
    _next();
  } catch (err: any) {
    _next(new CustomError.UnauthorizedError(err.message));
  }
};
