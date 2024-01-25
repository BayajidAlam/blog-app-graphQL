import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home/Home";
import Posts from "../pages/Post/Posts";
import Signin from "../pages/Signin/Signin";
import Signup from "../pages/Signup/Signup";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/register",
    element: <Signup />,
  },
  {
    path: "/login",
    element: <Signin></Signin>,
  },
  {
    path: "/posts",
    element: <Posts />,
  },
]);
