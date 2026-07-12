import React, { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router";
import AuthLayout from "../layouts/AuthLayout";
import DashboardLayout from "../layouts/DashboardLayout";
import Home from "../../features/dashboard/ui/pages/Home";
import Login from "../../features/auth/ui/pages/Login";
import Ragister from "../../features/auth/ui/pages/Ragister";
import { useDispatch } from "react-redux";
import { currentLoggedEmployee } from "../../features/auth/state/auth/AuthAction";
import PublicRoute from "../protectedRoutes/PublicRoute";
import ProtectedRoute from "../protectedRoutes/ProtectedRoute";
import { commonRoutes } from "./CommonRoutes";
import RoleBaseRoute from "../protectedRoutes/RoleBaseRoute";
import { adminRoutes } from "./adminRoutes";
import { employeeRoutes } from "./employeeRoutes";

const AppRoutes = () => {
  let dispatch = useDispatch();

  useEffect(() => {
    (() => {
      dispatch(currentLoggedEmployee());
    })();
  }, []);

  let router = createBrowserRouter([
    {
      path: "/",
      element: <PublicRoute />,
      children: [
        {
          path: "",
          element: <AuthLayout />,
          children: [
            {
              path: "",
              element: <Login />,
            },
            {
              path: "register",
              element: <Ragister />,
            },
          ],
        },
      ],
    },

    {
      path: "/home",
      element: <ProtectedRoute />,
      children: [
        {
          path: "",
          element: <DashboardLayout />,
          children: [
            ...commonRoutes,
            {
              element: <RoleBaseRoute allowedRoles={["admin"]} />,
              children: adminRoutes,
            },
            {
              element: <RoleBaseRoute allowedRoles={["employee" , 'admin']} />,
              children: employeeRoutes,
            },
          ],
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
};

export default AppRoutes;
