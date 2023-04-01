import jwt from "jsonwebtoken";

import { UserDocument } from "../models/userModel";

export interface SerializedUser {
  userId: string;
  userEmail: string;
}

export const serializeUser = (user: UserDocument): SerializedUser => {
  return { userId: user._id, userEmail: user.email };
};

export const genAuthTokens = (user: UserDocument) => {
  const userToken = serializeUser(user);
  return [
    jwt.sign(userToken, process.env.JWT_ACCESS_SECRET!, {
      expiresIn: process.env.JWT_ACCESS_TIME ?? "15m",
    }),
    jwt.sign(userToken, process.env.JWT_REFRESH_SECRET!, {
      expiresIn: process.env.JWT_REFRESH_TIME ?? "7d",
    }),
  ];
};

export const verifyAccessToken = (token: string): SerializedUser => {
  return jwt.verify(token, process.env.JWT_ACCESS_SECRET!) as SerializedUser;
};
