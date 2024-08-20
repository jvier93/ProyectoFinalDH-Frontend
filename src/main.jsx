import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Layout from "@/layout/Layout";

import Home from "@/routes";

import Profile from "@/routes/profile";
import Login from "@/routes/login";
import Signup from "@/routes/signup";
import Verify from "@/routes/verify";

import Dashboard from "@/routes/dashboard";
import Users from "@/routes/dashboard/users";
import Services from "@/routes/dashboard/services";

import Detail from "@/routes/services/[id]";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home />, loader: Home.loader },
      { path: "/profile", element: <Profile /> },
      { path: "/login", element: <Login /> },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/verify",
        element: <Verify />,
      },
      { path: "/services/:id", element: <Detail />, loader: Detail.loader },
      {
        path: "/dashboard",
        children: [
          { index: true, element: <Dashboard /> },
          { path: "/dashboard/users", element: <Users /> },
          { path: "/dashboard/services", element: <Services /> },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
