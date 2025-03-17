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
import FoundPostUpdate from "../Post/FoundPost/FoundPostUpdate";
import LostPostUpdate from "../Post/LostPost/LostPostUpdate";
import VerifyEmail from "../Component/Pages/Registration/VerifyEmail";
import ConfirmationPage from "../Component/Pages/Registration/confirmationPage";
import Conversations from "../Component/Pages/Chatting/Conversation";
import ForgotPassword from "../Component/Pages/Login/PasswordRecovery/ForgotPassword";
import ResetPassword from "../Component/Pages/Login/PasswordRecovery/ResetPassword";

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
        path: "/lostPostUpdate/:_id",
        element: (
          <PrivateRoute>
            <LostPostUpdate></LostPostUpdate>
          </PrivateRoute>
        ),
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
        path: "/foundPostUpdate/:_id",
        element: (
          <PrivateRoute>
            <FoundPostUpdate></FoundPostUpdate>
          </PrivateRoute>
        ),
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
    path: "/login/forgotPassword",
    element: <ForgotPassword></ForgotPassword>,
  },
  {
    path: "/login/resetPassword/:token",
    element: <ResetPassword></ResetPassword>,
  },
  {
    path: "/register",
    element: <Registration></Registration>,
  },

  {
    path: "/verifyEmail/:token",
    element: <VerifyEmail></VerifyEmail>, // This is not defined in this file
  },
  {
    path: "/chat",
    element: (
      <PrivateRoute>
        <Chat></Chat>
      </PrivateRoute>
    ),
  },
  {
    path: "/conversations",
    element: (
      <PrivateRoute>
        <Conversations></Conversations>
      </PrivateRoute>
    ),
  },
  {
    path: "/confirmation",
    element: <ConfirmationPage></ConfirmationPage>,
  },
]);
