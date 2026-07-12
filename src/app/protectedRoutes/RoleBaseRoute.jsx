import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";

const RoleBaseRoute = ({ allowedRoles }) => {
  let { employee } = useSelector((store) => store.auth);

  // Safe checks to avoid crashes and ensure exact matches
  const isAllowed = Array.isArray(allowedRoles)
    ? allowedRoles.includes(employee?.role)
    : allowedRoles === employee?.role;

  if (!isAllowed) {
    return <Navigate to={"/unauthorized"} />;
  }

  return <Outlet />;
};

export default RoleBaseRoute;