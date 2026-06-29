import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { postService } from "./post.service";

const createPost = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.user?.id;
    const payload = req.body;

    const result = await postService.createPostDB(payload, id as string);

    sendResponse(res, {
      success: true,
      message: "Post created successfully",
      statusCode: httpStatus.CREATED,
      data: result,
    });
  },
);
const updatePost = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const authorId = req.user?.id;
    const { postId } = req.params;

    const isAdmin = req.user?.role === "ADMIN";

    const payload = req.body;

    const result = await postService.updatePostDB(
      payload,
      authorId as string,
      postId as string,
      isAdmin,
    );
    sendResponse(res, {
      success: true,
      message: "Post updated successfully",
      statusCode: httpStatus.OK,
      data: result,
    });
  },
);
const getAllPosts = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await postService.getAllPostsDB();
    sendResponse(res, {
      success: true,
      message: "Posts retrieved successfully",
      statusCode: httpStatus.OK,
      data: result,
    });
  },
);
const getMyPosts = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const authorId = req.user?.id;
    const result = await postService.getMyPostsDB(authorId as string);
    sendResponse(res, {
      success: true,
      message: "Posts retrieved successfully",
      statusCode: httpStatus.OK,
      data: result,
    });
  },
);
const getPostById = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { postId } = req.params;
    if (!postId) {
      throw new Error("Post ID is required");
    }
    const result = await postService.getPostByIdDB(postId as string);
    sendResponse(res, {
      success: true,
      message: "Post retrieved successfully",
      statusCode: httpStatus.OK,
      data: result,
    });
  },
);
const getMyPostStats = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await postService.getPostStatsDB();
    sendResponse(res, {
      success: true,
      message: "Posts stats retrieved successfully",
      statusCode: httpStatus.OK,
      data: result,
    });
  },
);
const deletePost = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const authorId = req.user?.id;
    const { postId } = req.params;

    const isAdmin = req.user?.role === "ADMIN";

    const payload = req.body;

    await postService.deletePostDB(
      postId as string,
      authorId as string,
      isAdmin,
    );
    sendResponse(res, {
      success: true,
      message: "Post deleted successfully",
      statusCode: httpStatus.OK,
      data: null,
    });
  },
);

export const postController = {
  createPost,
  updatePost,
  getAllPosts,
  getMyPosts,
  getPostById,
  getMyPostStats,
  deletePost,
};
