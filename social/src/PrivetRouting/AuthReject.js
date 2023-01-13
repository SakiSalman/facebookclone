import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const AuthReject = ({ children }) => {
  const { loginState } = useSelector((state) => state.auth);

  return loginState ? <Navigate to={"/"} /> : children;
};

export default AuthReject;
