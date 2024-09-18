// import { useAuth } from "@/hooks/useAuth";

// import { createBrowserRouter, RouterProvider } from "react-router-dom";

// import Layout from "@/layout/Layout";

// import Home from "@/routes";
// import { ProtectedRoute } from "@/components/ProtectedRoute";

// import Profile from "@/routes/profile";
// import Login from "@/routes/login";
// import Signup from "@/routes/signup";
// import Verify from "@/routes/verify";

// import Dashboard from "@/routes/dashboard";
// import Users from "@/routes/dashboard/users";
// import Services from "@/routes/dashboard/services";

// import Detail from "@/routes/services/[id]";
// import UserDetail from "@/routes/dashboard/users/[id]";

// const App = () => {
//   const { user } = useAuth();

//   const router = createBrowserRouter([
//     {
//       path: "/",

//       element: (
//         //We wrap <Layout /> with <AuthProvider> here to ensure that the authentication context is available
//         // to all components in nested routes.
//         // <AuthProvider>
//         <Layout />
//         // </AuthProvider>
//       ),
//       children: [
//         {
//           index: true,
//           element: <Home />,
//           loader: (args) => Home.loader({ ...args, user }),
//         },
//         {
//           path: "/profile",
//           element: (
//             <ProtectedRoute>
//               <Profile />
//             </ProtectedRoute>
//           ),
//         },
//         {
//           path: "/login",
//           element: <Login />,
//         },
//         {
//           path: "/signup",
//           element: <Signup />,
//         },
//         {
//           path: "/verify",
//           element: <Verify />,
//         },
//         { path: "/services/:id", element: <Detail />, loader: Detail.loader },
//         {
//           path: "/dashboard",
//           children: [
//             {
//               index: true,
//               element: (
//                 <ProtectedRoute requiredRole="ADMIN">
//                   <Dashboard />
//                 </ProtectedRoute>
//               ),
//             },
//             {
//               path: "/dashboard/users",
//               element: (
//                 <ProtectedRoute requiredRole="ADMIN">
//                   <Users />
//                 </ProtectedRoute>
//               ),
//               loader: (args) => Users.loader({ ...args, user }),
//             },
//             {
//               path: "/dashboard/users/:id/edit",
//               element: (
//                 <ProtectedRoute requiredRole="ADMIN">
//                   <UserDetail />
//                 </ProtectedRoute>
//               ),
//               loader: UserDetail.loader,
//             },

//             {
//               path: "/dashboard/services",
//               element: (
//                 <ProtectedRoute requiredRole="ADMIN">
//                   <Services />
//                 </ProtectedRoute>
//               ),
//             },
//           ],
//         },
//       ],
//     },
//     {
//       path: "*",
//       element: <h1>Pagina no encontrada</h1>,
//     },
//   ]);

//   return <RouterProvider router={router} />;
// };

// export default App;
