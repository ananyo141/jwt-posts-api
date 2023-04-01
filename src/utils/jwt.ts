import jwt from "jsonwebtoken";

import { UserDocument } from "../models/userModel";
import redis_client from "../redis_connect";

export interface SerializedUser {
  userId: string;
  userEmail: string;
}

export const serializeUser = (user: UserDocument): SerializedUser => {
  return { userId: user._id, userEmail: user.email };
};

export const genAccessToken = (user: UserDocument) => {
  const userToken = serializeUser(user);
  return jwt.sign(userToken, process.env.JWT_ACCESS_SECRET!, {
    expiresIn: process.env.JWT_ACCESS_TIME ?? "15m",
  });
};

export const genRefreshToken = async (user: UserDocument) => {
  const userToken = serializeUser(user);
  const refreshToken = jwt.sign(userToken, process.env.JWT_REFRESH_SECRET!, {
    expiresIn: process.env.JWT_REFRESH_TIME ?? "7d",
  });

  await redis_client.set(user._id.toString(), refreshToken);
  return refreshToken;
};

export const verifyAccessToken = async (
  token: string
): Promise<SerializedUser> => {
  const deserializedUser = jwt.verify(
    token,
    process.env.JWT_ACCESS_SECRET!
  ) as SerializedUser;
  // verify blacklisted token
  const blacklistedToken = await redis_client.get(
    "BL_" + deserializedUser.userId
  );
  if (blacklistedToken === token) throw new Error("Token is blacklisted");
  return deserializedUser;
};

export const verifyRefreshToken = async (
  token: string
): Promise<SerializedUser> => {
  const deserializedUser = jwt.verify(
    token,
    process.env.JWT_REFRESH_SECRET!
  ) as SerializedUser;

  // verify if in store
  const stored_token = await redis_client.get(deserializedUser.userId);
  if (stored_token === null) throw new Error("Token is not in store");
  if (JSON.parse(stored_token).token !== token)
    throw new Error("Token is not same as in store");
  return deserializedUser;
};

export const logoutToken = async (userId: string, prevToken: string) => {
  // remove refresh token
  await redis_client.del(userId);
  // blacklist previous token
  await redis_client.set("BL_" + userId, prevToken);
};
