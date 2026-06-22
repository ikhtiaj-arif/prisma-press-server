import bcrypt from "bcryptjs";
import { Request, Response, Router } from "express";
import httpStatus from "http-status";
import config from "../../config";
import { prisma } from "../../lib/prisma";
import { userController } from "./user.controller";

const router = Router();

router.post("/register", userController.userRegister);
export const userRouter = router;
