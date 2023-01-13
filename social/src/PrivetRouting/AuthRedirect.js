import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";

const AuthRedirect = ({ children }) => {
  const { loginState } = useSelector((state) => state.auth);

  if (Cookies.get("access")) {
  }
  return loginState ? children : <Navigate to={"/login"} />;
};

export default AuthRedirect;
