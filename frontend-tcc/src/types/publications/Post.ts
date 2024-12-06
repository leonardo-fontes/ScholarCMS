import { Comments } from "./Comments";

export type Post = {
  id?: number;
  user_id?: number;
  author_name?: string;
  author_photo?: string;
  description: string;
  photos?: [] | string[];
  user_city: string;
  created_at?: string;
  updated_at?: string;
  user_picture?: string;
  comments?: Comments[];
};

export type CreatePost = {
  description: string;
  photos: FileList;
};
