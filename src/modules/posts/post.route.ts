import { Router } from "express";
import { Role } from "../../../generated/prisma/enums";
import { auth } from "../../middlewares/auth";
import { postController } from "./post.controller";

const router = Router();
const {
  createPost,
  updatePost,
  getAllPosts,
  getMyPosts,
  getPostById,
  getMyPostStats,
  deletePost,
} = postController;

router.get("/", getAllPosts);
router.get("/stats", auth(Role.ADMIN), getMyPostStats);
router.get("/my-posts", auth(Role.ADMIN, Role.USER, Role.AUTHOR), getMyPosts);
router.get("/:postId", getPostById);
router.post("/", auth(Role.ADMIN, Role.USER, Role.AUTHOR), createPost);
router.patch("/:postId", auth(Role.ADMIN, Role.USER, Role.AUTHOR), updatePost);
router.delete("/:postId", auth(Role.ADMIN, Role.USER, Role.AUTHOR), deletePost);

export const postRoutes = router;
