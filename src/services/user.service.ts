import { Follow, Profile, User, UserList } from "./entities";

//This is an interface that will be implimented first in the mock services (which connect to mock data) and then to the http services (which connect
// to the API). This will allow us to start dev on front oned without the API being finished and without having to duplicate work. 

//NOTE: Login is not implemented here. I'm not sure of the best place for it to go. 

export interface UserService{

    //Delete user account call
    deleteUser(profile: Profile): Promise<void>;
    
    //Follow user call
    followUser(follow: Follow): Promise<void>;

    //unfollow user call
    unfollowUser(id: string): Promise<void>;

    //get all users call
    //should return a list of users
    getAllUsers(): Promise<UserList>;

    //get all followers call
    //should return a list of users
    getFollowees(id: string): Promise<UserList>;

    //getUserInfo call
    //returns the the info for the user that is logged in
    getUserInfo(id: String): Promise<User>;

}