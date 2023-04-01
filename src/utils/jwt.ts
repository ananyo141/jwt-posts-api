import jwt from "jsonwebtoken";

import { UserDocument } from "../models/userModel";

export interface SerializedUser {
  userId: string;
  userEmail: string;
}

export const serializeUser = (user: UserDocument): SerializedUser => {
  return { userId: user._id, userEmail: user.email };
};

export const genAccessToken = (user: UserDocument) => {
  const userToken = serializeUser(user);
  return jwt.sign(userToken, process.env.ACCESS_TOKEN_SECRET!);
};

export const verifyAccessToken = (token: string): SerializedUser => {
  return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!) as SerializedUser;
};
