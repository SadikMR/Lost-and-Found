import { createBrowserRouter } from "react-router-dom";
import Main from "../Layouts/Main";
import Home from "../Component/Pages/Home/Home";
import Registration from "../Component/Pages/Registration/Registration";
import Login from "../Component/Pages/Login/Login";
import LostPost from "../Post/LostPost/LostPost";
import FoundPost from "../Post/FoundPost/FoundPost";
import Details from "../Post/Details/Details";
import Profile from "../Component/Pages/Profile/Profile";
import EditProfile from "../Component/Pages/Profile/EditProfile/EditProfile";
import PrivateRoute from "./PrivateRoute";
import Chat from "../Component/Pages/Chatting/Chat";
const endpoints = import.meta.env.VITE_backendUrl;

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/lost",
        element: (
          <PrivateRoute>
            <LostPost></LostPost>
          </PrivateRoute>
        ),
        loader: () => fetch(`${endpoints}/posts/lost`),
      },
      {
        path: "/found",
        element: (
          <PrivateRoute>
            <FoundPost></FoundPost>
          </PrivateRoute>
        ),
        loader: () => fetch(`${endpoints}/posts/found`),
      },
      {
        path: "/details",
        element: (
          <PrivateRoute>
            <Details></Details>
          </PrivateRoute>
        ),
      },
      {
        path: "/profile",
        element: (
          <PrivateRoute>
            <Profile></Profile>
          </PrivateRoute>
        ),
      },
      {
        path: "/profile/editProfile",
        element: <EditProfile></EditProfile>,
      },
    ],
  },
  {
    path: "/login",
    element: <Login></Login>,
  },
  {
    path: "/register",
    element: <Registration></Registration>,
  },
  {
    path: "/chat",
    element: (
      <PrivateRoute>
        <Chat></Chat>
      </PrivateRoute>
    ),
    loader: () => fetch(`${endpoints}`),
  },
]);
