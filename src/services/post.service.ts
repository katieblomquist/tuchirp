import { Post, PostList, Like, PostComment } from "./entities";

//This is an interface that will be implimented first in the mock services (which connect to mock data) and then to the http services (which connect
// to the API). This will allow us to start dev on front oned without the API being finished and without having to duplicate work. 

export interface PostService{

    //create bookiing call
    createPost(user_id: number, content: string): Promise<void>;

    //update post call
    updatePost(id: number, content: string): Promise<void>;

    //delete post call
    deletePost(id: number): Promise<void>;

    //favorite post call
    favoritePost(user_id: number, content_id: number): Promise<void>;

    //share post call
    sharePost(): Promise<void>;

    //get all posts call
    //should return a PostList
    getAllPosts(): Promise<PostList>;

    //get post by Id call
    //should return a post
    getPostById(id: number): Promise<Post>;

    //get posts by user call
    //should return a PostList
    getPostByUser(id: number): Promise<PostList>;

    //create comment
    createComment(parent_id: number, user_id: number, content: string): Promise<void>;



}