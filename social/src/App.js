import { Route, Routes } from "react-router-dom";
import Auth from "./pages/auth/Auth";
import Home from "./pages/home/Home";
import "./_assets/css/style.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Verify from "./pages/auth/Verify";
import Activated from "./components/Login/Activated";
import Forgot from "./components/Forgot/Forgot";
import ForgotPasseord from "./pages/auth/ForgotPasseord";
import FindUser from "./pages/auth/FindUser";
import ResetPass from "./pages/auth/ResetPass";
import VerifyAccount from "./pages/auth/VerifyAccount";
function App() {
  return (
    <>
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
        <Route path="/login" element={<Auth />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
