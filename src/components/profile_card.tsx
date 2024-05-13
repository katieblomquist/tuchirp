import { Avatar, Button } from '@mui/material';
import { Outlet, Link } from "react-router-dom";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Profile } from '../services/entities';

export default function ProfileCard(props: {location: string, user: Profile}){

    let initial = props.user.handle.charAt(0).toUpperCase();
    function buttonType(location: string, user: Profile){
        if (location === "profile"){
            return <Button 
            variant="outlined" 
            color="error"
            onClick={() => {
                //TO DO: create it so it deletes through parent
              }}>Delete Profile</Button>
        } else if( location === "main"){
            return <Button
            variant="contained"
            style={{backgroundColor:'#F5BE41'}}
            ><Link to={"/profile"} style={{color:'black'}}>Your Profile</Link></Button>
        }
    }
    

    return(

            <Card variant="outlined" style={{display:'flex', flexDirection:'column', height:'200px', justifyContent:'space-between', alignItems: 'center', padding: '20px', margin: '0 20px'}}>
                <Avatar>{initial}</Avatar>
                <p>{props.user.handle}</p>
                <p>{props.user.email}</p>
                <div>
                    {buttonType(props.location, props.user)}
                </div>
            </Card>

    );    
}