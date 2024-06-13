import React from "react";

import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const PublicRoutes = () => {
  const { user } = useSelector(({ auth }) => auth);
  // TODO: Use authentication token

  return !user ? <Outlet /> : <Navigate to="/dashboard" replace />;
};

export default PublicRoutes;
