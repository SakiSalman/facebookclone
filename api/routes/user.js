import express from "express";
import {
  activateUser,
  forgotPassword,
  activationOTP,
  loggedInUser,
  register,
  resetPassword,
  Userlogin,
  resendOtpCode,
} from "../controllers/userController.js";

// init router
const router = express.Router();

// User Auth Routes
router.post("/login", Userlogin);
router.post("/register", register);
router.post("/reset-password/:token", resetPassword);
router.post("/resend-code", resendOtpCode);
router.post("/otp-activation", activationOTP);
router.post("/activation/:token/activated", activateUser);
router.post("/forgot-password", forgotPassword);
router.get("/me", loggedInUser);

// export default router
export default router;
