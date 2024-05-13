export type User = {user_id: number, handle: string};
export type UserList = User[];
export type Profile = {user_id: number, username: string, handle: string, email: string, date_created: string, bio: string, email_notifications: boolean, is_public: boolean};
export type Follow = {id: number, follower_id: number, followee_id: number};
export type FollowList = Follow[];
export type Post = {id: number, is_post: boolean, user_id: number, date_created: string, content: string, handle: string, modified_at: string, was_modified: boolean, comments: PostComment[], likes: Like[]};
export type PostList = Post[];
export type Like = {id: number, user_id: number, content_id: number};
export type PostComment = {id: number, parent_id: number, content: string};

