import { Comments } from "./Comments";
import { Post } from "./Post";

export interface PublicationType {
    comments: Comments[]
    post: Post
}