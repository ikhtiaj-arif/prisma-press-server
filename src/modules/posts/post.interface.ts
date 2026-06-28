import { PostStatus } from "../../../generated/prisma/enums";

export interface ICreatePostPayload {
    title: string;
    content: string;
    thumbnail?: string;
    status?: PostStatus;
    isFeatured?: boolean;
    tags: string[];
}