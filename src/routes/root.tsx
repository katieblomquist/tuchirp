import { Outlet } from "react-router-dom";
import NavBar from "../components/navbar";
import { Profile } from "../services/entities";


export default function Root(props: {user: Profile, isPublic: boolean}) {
    return (
        <div style={{width:'100%'}}>
            <NavBar user={props.user} isPublic = {props.isPublic} />

            <div id="routes" style={{margin:'2em'}}>
                <Outlet />
            </div>


        </div>
    );
}