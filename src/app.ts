import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Application, NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import config from "./config";
import { notFound } from "./middlewares/NotFound";
import { authRoutes } from "./modules/auth/auth.router";
import { commentRoutes } from "./modules/comments/comment.route";
import { postRoutes } from "./modules/posts/post.route";
import { userRouter } from "./modules/users/user.route";
import { globalErrorHandler } from "./middlewares/globalErrorHandler";

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
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);

app.use(notFound);

app.use(globalErrorHandler);

export default app;
