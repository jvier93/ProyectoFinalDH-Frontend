import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Layout from "@/layout/Layout";
import Home from "@/routes/Home";
import Detail from "@/routes/Detail";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true,
        element: <Home />,
        loader: Home.loader,
        },
        
      {path: "/service/:id", element: <Detail />, loader: Detail.loader},
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
