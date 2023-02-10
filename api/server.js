import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import userRoute from "./routes/user.js";
import mongoDBConnect from "./config/db.js";
import errorHandler from "./middlewares/errorHandler.js";
import cookieParser from "cookie-parser";
import cors from "cors";

// init express
const app = express();
dotenv.config();

app.use(cors());

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static("api/public"));
// init env variabels
const PORT = process.env.PORT || 8000;

// routes
app.use("/api/v1/user", userRoute);

// express error handler
app.use(errorHandler);

// listen server
app.listen(PORT, () => {
  mongoDBConnect();
  console.log(`server running on port ${PORT}`.bgGreen.black);
});
