// main.jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Root from "./layout/Root.jsx";
import Home from "./components/Home/Home.jsx";
import Login from "./components/Login/Login.jsx";
import Signup from "./components/Signup/Signup.jsx";

import AuthProvider from "./Context/AuthContext/AuthProvider.jsx";
import { AuthContext } from "./Context/AuthContext/AuthContext.jsx";

import PrivetRoutes from "./Routes/PrivetRoutes.jsx";

import MyPosts from "./components/MyPosts/MyPosts.jsx";
import Profile from "./components/Profile/Profile.jsx";
import MyInterests from "./components/MyInterests/MyInterests.jsx";

import AllCrops from "./components/AllCrops/AllCrops.jsx";
import AddCrops from "./components/AddCrops/AddCrops.jsx";
import CropsDetails from "./Page/CropsDetails/CropsDetails.jsx";

import { useContext } from "react";

function MyPostsWrapper() {
  const { user } = useContext(AuthContext);
  return <MyPosts userEmail={user?.email} />;
}

const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: "login", Component: Login },
      { path: "signup", Component: Signup },
      { path: "allcrops", Component: AllCrops },

      {
        path: "myposts",
        element: (
          <PrivetRoutes>
            <MyPostsWrapper />
          </PrivetRoutes>
        ),
      },

      {
        path: "/crop/:id",
        element: (
          <PrivetRoutes>
            <CropsDetails />
          </PrivetRoutes>
        ),
      },

      {
        path: "profile",
        element: (
          <PrivetRoutes>
            <Profile />
          </PrivetRoutes>
        ),
      },

      {
        path: "myinterests",
        element: (
          <PrivetRoutes>
            <MyInterests />
          </PrivetRoutes>
        ),
      },

      {
        path: "addcrops",
        element: (
          <PrivetRoutes>
            <AddCrops />
          </PrivetRoutes>
        ),
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
