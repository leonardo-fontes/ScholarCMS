import { Comments } from "./Comments";

export type Post = {
    id?: number;
    user_id?: number;
    author_name?: string;
    author_photo?: string;
    author_city?: string;
    description: string;
    photos?: [] | string[];
    created_at?: string;
    updated_at?: string;
    user_picture?: string;
    comments?: Comments[];
};

export type CreatePost = {
    description: string;
    photos: FileList;
};
