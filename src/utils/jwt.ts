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

export const genAccessToken = (user: UserDocument | SerializedUser) => {
  const userToken =
    typeof user !== "object"
      ? serializeUser(user)
      : {
          userId: (user as SerializedUser).userId,
          userEmail: (user as SerializedUser).userEmail,
        };
  return jwt.sign(userToken, process.env.JWT_ACCESS_SECRET!, {
    expiresIn: process.env.JWT_ACCESS_TIME ?? "15m",
  });
};

export const genRefreshToken = async (user: UserDocument | SerializedUser) => {
  const userToken =
    typeof user !== "object"
      ? serializeUser(user)
      : {
          userId: (user as SerializedUser).userId,
          userEmail: (user as SerializedUser).userEmail,
        };
  const refreshToken = jwt.sign(userToken, process.env.JWT_REFRESH_SECRET!, {
    expiresIn: process.env.JWT_REFRESH_TIME ?? "7d",
  });

  await redis_client.set(userToken.userId.toString(), refreshToken);
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
  if (stored_token !== token) throw new Error("Token is not same as in store");
  return deserializedUser;
};

export const logoutToken = async (userId: string, prevToken: string) => {
  // remove refresh token
  await redis_client.del(userId.toString());
  // blacklist previous token
  await redis_client.set("BL_" + userId, prevToken);
};
