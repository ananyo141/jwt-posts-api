import { Request, Response, NextFunction } from "express";

export const getAllUsers = (
  _req: Request,
  _res: Response,
  _next: NextFunction
) => {
  _res.send("GET all users");
};

export const createUser = (
  _req: Request,
  _res: Response,
  _next: NextFunction
) => {
  _res.send("POST create user");
};

export const deleteUser = (
  _req: Request,
  _res: Response,
  _next: NextFunction
) => {
  _res.send("DELETE delete user");
};

export const putUser = (
  _req: Request,
  _res: Response,
  _next: NextFunction
) => {};
