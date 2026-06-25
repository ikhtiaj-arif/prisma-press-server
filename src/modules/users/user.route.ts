import { NextFunction, Request, Response, Router } from "express";
import { JwtPayload } from "jsonwebtoken";
import { Role } from "../../../generated/prisma/enums";
import config from "../../config";
import { prisma } from "../../lib/prisma";
import { catchAsync } from "../utils/catchAsync";
import { jwtUtils } from "../utils/jwt";
import { userController } from "./user.controller";
import { auth } from "../../middlewares/auth";

const router = Router();

router.post("/register", userController.userRegister);
router.get(
  "/me",
  auth(Role.USER, Role.ADMIN, Role.AUTHOR),
  userController.getMyProfile,
);
router.put("/my-profile", auth(Role.USER, Role.ADMIN, Role.AUTHOR), userController.updateMyProfile);
export const userRouter = router;
