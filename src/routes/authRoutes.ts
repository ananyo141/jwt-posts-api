import express from "express";

import {
  loginController,
  logoutController,
  registerController,
  refreshTokensController,
} from "../controllers/authControllers";
import * as CustomError from "../errors";

const authRouter = express.Router();

authRouter.post("/login", loginController);
authRouter.post("/register", registerController);
authRouter.post("/refresh", refreshTokensController);
authRouter.post("/logout", logoutController);

// fallback route
authRouter.use((_req, _res, _next) => {
  _next(new CustomError.ForbiddenError("Only POST requests are allowed"));
});

export default authRouter;
