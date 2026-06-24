import bcrypt from "bcryptjs";
import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Application, Request, Response } from "express";
import httpStatus from "http-status";
import config from "./config";
import { prisma } from "./lib/prisma";
import { userRouter } from "./modules/users/user.route";
import { authRoutes } from "./modules/auth/auth.router";

const app: Application = express();

app.use(
  cors({
    origin: config.app_url,
    credentials: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello world");
});

app.use("/api/users", userRouter);
app.use("/api/auth", authRoutes);

export default app;
