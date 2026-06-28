import { prisma } from "../../lib/prisma";
import { ICreatePostPayload } from "./post.interface";

const createPostDB = async (payload: ICreatePostPayload, userId: string) => {
  const result = await prisma.post.create({
    data: {
      ...payload,
      authorId: userId,
    },
  });
  return result;
};
const updatePostDB = async (payload: any) => {
  return payload;
};
const getAllPostsDB = async () => {
  const result = await prisma.post.findMany({
    include: {
      author: {
        omit: { password: true },
      },
      comments: true,
    },
  });
  return result;
};
const getMyPostsDB = async (authorId: string) => {
  const result = await prisma.post.findMany({
    where: {
        authorId: authorId,
    },
    orderBy: {
        createdAt: "desc",
    },
    include: {
        comments: true,
        author: {
            omit: {password: true},
        },
        // count the number of comments for each post
     _count: {
        select: {
            comments: true,
        }
     }
    }
  })
  return result;
};
const getPostByIdDB = async (postId: string) => {
  const post = await prisma.post.findUniqueOrThrow({
    where: {
      id: postId,
    },
  });

  //update the view count of the post
  const updatedPost = await prisma.post.update({
    where: {
        id: postId,
    },
    data: {
        viewCount: {
            increment: 1,
        }
    },
    include: {
        author: {
            omit: { password: true },
        },
        comments: true,
    }
})

  return updatedPost;
};
const getPostStatsDB = async (payload: any) => {
  return payload;
};
const deletePostDB = async (payload: any) => {
  return payload;
};

export const postService = {
  createPostDB,
  updatePostDB,
  getAllPostsDB,
  getMyPostsDB,
  getPostByIdDB,
  getPostStatsDB,
  deletePostDB,
};
