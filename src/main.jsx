import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
//import { Routes, Route } from "react-router-dom";
import "./index.css";

import { AuthProvider } from "@/context/AuthContext";
import Layout from "@/layout/Layout";
import ErrorBoundary from "@/components/ErrorBoundary ";

import Home from "@/routes";
import { ProtectedRoute } from "@/components/ProtectedRoute";

import Profile from "@/routes/profile";
import Login from "@/routes/login";
import Signup from "@/routes/signup";

import Dashboard from "@/routes/dashboard";
import Users from "@/routes/dashboard/users";
import Services from "@/routes/dashboard/services";

import Detail from "@/routes/services/[id]";
import Verify from "@/routes/verify";

const router = createBrowserRouter([
  {
    path: "/",

    element: (
      //We wrap <Layout /> with <AuthProvider> here to ensure that the authentication context is available
      // to all components in nested routes.
      <AuthProvider>
        <Layout />
      </AuthProvider>
    ),
    children: [
      { index: true, element: <Home />, loader: Home.loader },
      {
        path: "/profile",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
      {
        path: "/login",
        element: <Login />,
      },
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
          {
            index: true,
            element: (
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            ),
          },
          {
            path: "/dashboard/users",
            element: (
              <ProtectedRoute>
                <Users />
              </ProtectedRoute>
            ),
          },
          {
            path: "/dashboard/services",
            element: (
              <ProtectedRoute>
                <Services />
              </ProtectedRoute>
            ),
          },
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
