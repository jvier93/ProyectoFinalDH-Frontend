import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
//import { Routes, Route } from "react-router-dom";
import "./index.css";

import { AuthProvider } from "@/context/AuthContext";
import Layout from "@/layout/Layout";

import Home from "@/routes";
import { ProtectedRoute } from "@/components/ProtectedRoute";

import Profile from "@/routes/profile";
import Login from "@/routes/login";
import Signup from "@/routes/signup";
import Verify from "@/routes/verify";

import Dashboard from "@/routes/dashboard";
import Users from "@/routes/dashboard/users";
import Services from "@/routes/dashboard/services";

import Detail from "@/routes/services/[id]";
import UserDetail from "@/routes/dashboard/users/[id]";
import NewService from "@/routes/dashboard/services/new";
import ServiceDetail from "./components/ServiceDetail";

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
              <ProtectedRoute requiredRole="ADMIN">
                <Dashboard />
              </ProtectedRoute>
            ),
          },
          {
            path: "/dashboard/users",
            element: (
              <ProtectedRoute requiredRole="ADMIN">
                <Users />
              </ProtectedRoute>
            ),
            loader: Users.loader,
          },
          {
            path: "/dashboard/users/:id/edit",
            element: (
              <ProtectedRoute requiredRole="ADMIN">
                <UserDetail />
              </ProtectedRoute>
            ),
            loader: UserDetail.loader,
          },

          {
            path: "/dashboard/services",
            loader: Services.loader,
            element: (
              <ProtectedRoute requiredRole="ADMIN">
                <Services />
              </ProtectedRoute>
            ),
          },

          {
            path: "/dashboard/services/new",
            loader: NewService.loader,
            element: (
              <ProtectedRoute requiredRole="ADMIN">
                <NewService />
              </ProtectedRoute>
            ),
          },
          {
            path: "/dashboard/service/:id/edit",
            element: (
              <ProtectedRoute requiredRole="ADMIN">
                <ServiceDetail />
              </ProtectedRoute>
            ),
            loader: ServiceDetail.loader,
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
