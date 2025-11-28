import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Root from './layout/Root.jsx';
import Home from './components/Home/Home.jsx';
import Login from './components/Login/Login.jsx';
import Signup from './components/Signup/Signup.jsx';
import AuthProvider from './Context/AuthContext/AuthProvider.jsx';
import PrivetRoutes from './Routes/PrivetRoutes.jsx';
import MyPosts from './components/MyPosts/MyPosts.jsx';
import Profile from './components/Profile/Profile.jsx';
import MyInterests from './components/MyInterests/MyInterests.jsx';

import AllCrops from './components/AllCrops/AllCrops.jsx';   // <-- ADD THIS
import AddCrops from './components/AddCrops/AddCrops.jsx';   // <-- ADD THIS
import CropsDetails from './Page/CropsDetails/CropsDetails.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      {
        index: true,
        Component: Home
      },
      {
        path: "login",
        Component: Login
      },
      {
        path: "signup",
        Component: Signup
      },
      {
        path: "allcrops",
        Component: AllCrops,   // <-- FIXED
      },
      {
        path: "myposts",
        element: (
          <PrivetRoutes>
            <MyPosts />
          </PrivetRoutes>
        )
      },
{
  path: "/crop/:id",
  element: (
    <PrivetRoutes>
      <CropsDetails />
    </PrivetRoutes>
  )
},
      {
        path: "profile",
        element: (
          <PrivetRoutes>
            <Profile />
          </PrivetRoutes>
        )
      },
      {
        path: "myinterests",
        element: (
          <PrivetRoutes>
            <MyInterests />
          </PrivetRoutes>
        )
      },
      {
        path: "addcrops",
        element: (
          <PrivetRoutes>
            <AddCrops />
          </PrivetRoutes>
        )
      }
    ]
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)
