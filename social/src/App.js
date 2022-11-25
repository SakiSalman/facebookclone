import { Route, Routes } from "react-router-dom";
import Auth from "./pages/auth/Auth";
import Home from "./pages/home/Home";
import "./_assets/css/style.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Verify from "./pages/auth/Verify";
import Activated from "./components/Login/Activated";
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
        <Route path="/:token/activated" element={<Activated />} />
        <Route path="/verify" element={<Verify />} />
        <Route path="/login" element={<Auth />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
