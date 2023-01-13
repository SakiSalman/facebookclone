import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";
const LogedOutRoutes = ({ children }) => {
  const { loginState } = useSelector((state) => state.auth);
  const token = Cookies.get("accessToken");
  if (token && loginState) {
    return <Navigate to={"/"} />;
  } else {
    return children;
  }
};

export default LogedOutRoutes;
