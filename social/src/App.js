import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import "./_assets/css/style.css";
import "./_assets/css/modal.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Verify from "./pages/auth/Verify";
import Activated from "./components/Login/Activated";
import ForgotPasseord from "./pages/auth/ForgotPasseord";
import FindUser from "./pages/auth/FindUser";
import ResetPass from "./pages/auth/ResetPass";
import VerifyAccount from "./pages/auth/VerifyAccount";
import LoadingBar from "react-top-loading-bar";
import { useDispatch, useSelector } from "react-redux";
import { LOADER_END, LOADER_START } from "./redux/TopLoader/loadertypes";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { tokenUser } from "./redux/Auth/action";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegPage from "./pages/register/RegPage";
import Profile from "./pages/profile/Profile";
import Friends from "./pages/friends/Friends";
import LogedInRoutes from "./PrivetRouting/LogedInRoutes";
import LogedOutRoutes from "./PrivetRouting/LogedOutRoutes";

function App() {
  const loader = useSelector((state) => state.loader);
  const dispatch = useDispatch();
  const tokenDispatch = useDispatch();

  useEffect(() => {
    if (Cookies.get("accessToken")) {
      tokenDispatch(tokenUser());
      dispatch({
        type: LOADER_START,
      });
    }
  }, [tokenDispatch]);
  return (
    <>
      <LoadingBar
        color="#197ff4"
        progress={loader}
        onLoaderFinished={() => dispatch({ type: LOADER_END })}
      />
      <ToastContainer
        zIndex="99999"
        position="top-center"
        autoClose={3000}
        hideProgressBar={true}
        newestOnTop={true}
        theme="light"
      />
      {/* Same as */}
      <Routes>
        <Route path="/reset-acount/:token" element={<ResetPass />} />
        <Route path="/account/find-user" element={<FindUser />} />
        <Route path="/forgot-password" element={<ForgotPasseord />} />
        <Route path="/:token/activated" element={<Activated />} />
        <Route path="/account-verify" element={<VerifyAccount />} />
        <Route path="/verify/:type" element={<Verify />} />
        <Route
          path="/login"
          element={
            <LogedOutRoutes>
              <LoginPage />
            </LogedOutRoutes>
          }
        />
        <Route
          path="/register"
          element={
            <LogedOutRoutes>
              <RegPage />
            </LogedOutRoutes>
          }
        />
        <Route
          path="/profile"
          element={
            <LogedInRoutes>
              <Profile />
            </LogedInRoutes>
          }
        />
        <Route
          path="/friends"
          element={
            <LogedInRoutes>
              <Friends />
            </LogedInRoutes>
          }
        />
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
