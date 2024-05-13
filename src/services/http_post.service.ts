import { PostList, Post, Like, PostComment } from "./entities";
import { PostService } from "./post.service";

export class HttpPostService implements PostService{
    async createPost(user_id: number, content: string): Promise<void> {
        const url = new URL('https://tuspring2024webdev-88cb37ed8b7d.herokuapp.com/newpost');
        url.searchParams.set('user_id', JSON.stringify(user_id));   
        url.searchParams.set('content', content); 
        const response = await fetch(url, {
            method: "POST",
            headers: {
                'Accept': 'text/plain',
                'Content-Type': 'application/json'
            }
        });
        if (response.ok) {
        } else {
            console.log("creating a new booking didn't work");
            return Promise.reject();
        }

    }
    async updatePost(id: number, content: string): Promise<void> {
        const url = new URL('https://tuspring2024webdev-88cb37ed8b7d.herokuapp.com/updatepost');
        url.searchParams.set('post_id', JSON.stringify(id));
        url.searchParams.set('content', content);
        const response = await fetch(url, {
            method: "PATCH",
            headers: {
                'Accept': 'text/plain',
                'Content-Type': 'application/json'
            }
        });
        if(response.ok) {
        } else {
            console.log("updating a post failed");
            return Promise.reject();
        }
    }
    async deletePost(id: number): Promise<void> {
        const url = new URL('https://tuspring2024webdev-88cb37ed8b7d.herokuapp.com/deletepost');
        url.searchParams.set('id', JSON.stringify(id));
        const response = await fetch(url, {
            method: "PATCH",
            headers: {
                'Accept': 'text/plain',
                'Content-Type': 'application/json'
            }
        });
        if(response.ok){
        } else {
            console.log("deleting post failed");
            return Promise.reject();
        }
    }
    async favoritePost(user_id: number, content_id: number): Promise<void> {
        const url = new URL('https://tuspring2024webdev-88cb37ed8b7d.herokuapp.com/favorite');
        url.searchParams.set('user_id', JSON.stringify(user_id));
        url.searchParams.set('content_id', JSON.stringify(content_id));
        const response = await fetch(url, {
            method: "POST",
            headers: {
                'Accept': 'text/plain', 
                'Content-Type': 'application/json'
            }
        });
        if(response.ok){
        } else {
            console.log("Creating a new post failed");
            return Promise.reject();
        }
    }
    async sharePost(): Promise<void> {
        throw new Error("Method not implemented.");
    }
    async getAllPosts(): Promise<PostList> {
        const url = new URL('https://tuspring2024webdev-88cb37ed8b7d.herokuapp.com/allposts');
        const response = await fetch(url);
        if(response.ok){
            const jsonData = await response.json();
            return jsonData;
        } else {
            console.log("error getting all posts");
            return Promise.reject();
        }
    }
    async getPostById(id: number): Promise<Post> {
        const url = new URL('https://tuspring2024webdev-88cb37ed8b7d.herokuapp.com/postbyid');
        url.searchParams.set('id', JSON.stringify(id));
        const response = await fetch(url, {
            method: "GET",
        });
        if (response.ok) {
            const jsonData = await response.json();
            return jsonData;
        } else {
            console.log("getting post by id failed");
            return Promise.reject();
        }
    }
    async getPostByUser(id: number): Promise<PostList> {
        const url = new URL('https://tuspring2024webdev-88cb37ed8b7d.herokuapp.com/postbyuser');
        url.searchParams.set('user_id', JSON.stringify(id));
        const response = await fetch(url, {
            method: "GET",
        });
        if (response.ok) {
            const jsonData = await response.json();
            return jsonData;
        } else {
            console.log("getting post by id failed");
            return Promise.reject();
        }
    }
    async createComment(parent_id: number, user_id: number, content: string): Promise<void> {
        const url = new URL('https://tuspring2024webdev-88cb37ed8b7d.herokuapp.com/newcomment');
        url.searchParams.set('user_id', JSON.stringify(user_id));
        url.searchParams.set('parent_id', JSON.stringify(parent_id));
        url.searchParams.set('content', content);
        const response = await fetch(url, {
            method: "POST",
            headers: {
                'Accept': 'text/plain', 
                'Content-Type': 'application/json'
            }
        });
        if(response.ok){
        } else {
            console.log("Creating a new comment failed");
            return Promise.reject();
        }
    }

}