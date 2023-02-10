import express from "express";
import multer from "multer";
import path from "path";
import {
  activateUser,
  forgotPassword,
  activationOTP,
  loggedInUser,
  register,
  resetPassword,
  Userlogin,
  resendOtpCode,
  getUser,
  updateUsers,
  addFeaturedSlider,
} from "../controllers/userController.js";

const __dirname = path.resolve();
// init router
const router = express.Router();

// Multer For Slider
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "api/public/sliders"));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);

    cb(null, uniqueSuffix + "_" + file.originalname);
  },
});

const slider = multer({ storage }).array("slider", 10);
// User Auth Routes
router.post("/login", Userlogin);
router.post("/register", register);
router.post("/get-user", getUser);
router.post("/reset-password/:token", resetPassword);
router.post("/resend-code", resendOtpCode);
router.post("/otp-activation", activationOTP);
router.post("/activation/:token/activated", activateUser);
router.post("/forgot-password", forgotPassword);
router.put("/update-data/:id", updateUsers);
router.put("/featured-slider/:id", slider, addFeaturedSlider);
router.get("/me", loggedInUser);

// export default router
export default router;
