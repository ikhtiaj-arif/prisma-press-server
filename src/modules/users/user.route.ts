import { Router } from "express";
import { Role } from "../../../generated/prisma/enums";
import { auth } from "../../middlewares/auth";
import { userController } from "./user.controller";

const router = Router();

router.post("/register", userController.userRegister);
router.get(
  "/me",
  auth(Role.USER, Role.ADMIN, Role.AUTHOR),
  userController.getMyProfile,
);
router.put(
  "/my-profile",
  auth(Role.USER, Role.ADMIN, Role.AUTHOR),
  userController.updateMyProfile,
);
export const userRouter = router;
