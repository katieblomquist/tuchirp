import { UserList, User, Profile, Follow } from "./entities";
import { UserService } from "./user.service";

export class HttpUserService implements UserService{
    getFollowees(id: string): Promise<UserList> {
        throw new Error("Method not implemented.");
    }
    async deleteUser(profile: Profile): Promise<void> {
        throw new Error("Method not implemented.");
    }
    async followUser(follow: Follow): Promise<void> {
        throw new Error("Method not implemented.");
    }
    async unfollowUser(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
    async getAllUsers(): Promise<UserList> {
        throw new Error("Method not implemented.");
    }
    async getUserInfo(id: String): Promise<User> {
        const url = new URL('https://tuspring2024webdev-88cb37ed8b7d.herokuapp.com/userinfo');
        url.searchParams.set('id', JSON.stringify(id));
        const response = await fetch(url, {
            method: "GET",
        });
        if (response.ok) {
            const jsonData = await response.json();
            return jsonData;
        } else {
            console.log("getting user info by id failed");
            return Promise.reject();
        }
    }
    
}