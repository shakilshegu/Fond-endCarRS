import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute(prop) {
  if (localStorage.getItem("token")) {
    return prop.children;
  } else {
    return <Navigate to="/login" />;
  }
}

function ProtectedRouteAdmin(prop) {
  if (localStorage.getItem("admintoken")) {
    return prop.children;
  } else {
    return <Navigate to="/admin/login" />;
  }
}

function ProtectedRoutepartner(prop) {
  if (localStorage.getItem("partnerToken")) {
    return prop.children;
  } else {
    return <Navigate to="/partner/login" />;
  }
}

export { ProtectedRoute, ProtectedRouteAdmin, ProtectedRoutepartner };
