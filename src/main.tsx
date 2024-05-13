import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Edit from './routes/edit.tsx'
import FindUsers from './routes/find_users.tsx'
import Login from './routes/login.tsx'
import PostDetails from './routes/post_details.tsx'
import Root from './routes/root.tsx';
import Feed from './routes/feed.tsx';
import { profile } from './services/mock_data.ts';
import ProfilePage from './routes/profile.tsx';
import Account from './routes/account.tsx';

let user = profile;
let isPublic = false;

const router = createBrowserRouter([{
  path: "/",
  element: <Root user={user} isPublic = {isPublic} />,
  children: [
    {
      path:"",
      element: <Feed user={user} isPublic = {isPublic} />
    },
    {
      path: "profile",
      element: <ProfilePage user={user} />
    },
    {
      path: "details",
      element: <PostDetails />
    },
    {
      path: "edit",
      element: <Edit />
    },
    {
      path: "findusers",
      element: <FindUsers />
    },
    {
      path: "login",
      element: <Login />
    },
   {
      path: "account",
      element: <Account />
    }

  ]

}])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)


