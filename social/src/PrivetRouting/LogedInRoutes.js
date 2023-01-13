import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";
const LogedInRoutes = ({ children }) => {
  const { loginState } = useSelector((state) => state.auth);
  const token = Cookies.get("accessToken");
  if (token && loginState) {
    return children;
  } else {
    return <Navigate to={"/login"} />;
  }
};

export default LogedInRoutes;
