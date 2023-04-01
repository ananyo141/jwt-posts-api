import { Request, Response, NextFunction } from "express";

export const getPosts = (
  _req: Request,
  _res: Response,
  _next: NextFunction
) => {
  _res.send("GET all users");
};

export const createPost = (
  _req: Request,
  _res: Response,
  _next: NextFunction
) => {
  _res.send("POST create user");
};

export const deletePost = (
  _req: Request,
  _res: Response,
  _next: NextFunction
) => {
  _res.send("DELETE delete user");
};

export const putPost = (_req: Request, _res: Response, _next: NextFunction) => {
  _res.send("PUT update user");
};
