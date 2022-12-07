import axios from "axios";
import cookie from "js-cookie";
import createToast from "../../Utility/toast";
import {
  REGISTER_FAILED,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
} from "./authType";

// Register user
export const userRegister = (data, setInput, navigate) => async (dispatch) => {
  try {
    dispatch({
      type: REGISTER_REQUEST,
    });
    axios
      .post("/api/v1/user/register", data)
      .then((res) => {
        dispatch({
          type: REGISTER_SUCCESS,
          payload: res.data,
        });
        createToast("success", res.data.message);
        setInput({
          f_name: "",
          s_name: "",
          mobile: "",
          email: "",
          password: "",
        });

        navigate("/verify");
      })
      .catch((err) => {
        dispatch({
          type: REGISTER_FAILED,
          payload: err.response.data.message,
        });
        createToast("warn", err.response.data.message);
      });
  } catch (error) {
    dispatch({
      type: REGISTER_FAILED,
      payload: error.response.data.message,
    });
    createToast("error", error.response.data.message);
    console.log(error);
  }
};
// user OTP Verification
export const userVerificationByOTP = (data, navigate) => async (dispatch) => {
  try {
    const { code, auth } = data;
    dispatch({
      type: REGISTER_REQUEST,
    });
    await axios
      .post("/api/v1/user/otp-activation/", { code, auth: auth })
      .then((res) => {
        createToast("success", res.data.message);
        cookie.remove("OTP");
        navigate("/login");
      })
      .catch((err) => {
        dispatch({
          type: REGISTER_FAILED,
          payload: err.response.data.message,
        });
        createToast("warn", err.response.data.message);
      });
  } catch (error) {
    dispatch({
      type: REGISTER_FAILED,
      payload: error.message,
    });
    createToast("error", error.message);
  }
};
// Resend OTP Verification
export const resendOtp = (data) => async (dispatch) => {
  try {
    dispatch({
      type: REGISTER_REQUEST,
    });
    const { auth } = data;

    await axios
      .post("/api/v1/user/resend-code/", { auth: auth })
      .then((res) => {
        createToast("success", res.data.message);
      })
      .catch((err) => {
        dispatch({
          type: REGISTER_FAILED,
          payload: err.response.data.message,
        });
        createToast("warn", err.response.data.message);
      });
  } catch (error) {
    dispatch({
      type: REGISTER_FAILED,
      payload: error.message,
    });
    createToast("error", error.message);
  }
};

// Send Verification
export const sendVerification = (data, navigate) => async (dispatch) => {
  try {
    dispatch({
      type: REGISTER_REQUEST,
    });

    await axios
      .post("/api/v1/user/forgot-password", data)
      .then((res) => {
        dispatch({
          type: REGISTER_SUCCESS,
          payload: {
            user: res.data.user,
            message: res.data.message,
          },
        });

        createToast("success", res.data.message);
        navigate("/account-verify");
      })
      .catch((err) => {
        dispatch({
          type: REGISTER_FAILED,
          payload: err.response.data.message,
        });
        createToast("warn", err.response.data.message);
      });
  } catch (error) {
    dispatch({
      type: REGISTER_FAILED,
      payload: error.response.data.message,
    });
    createToast("error", error.response.data.message);
  }
};

// user OTP Verification
export const verifiedUser = (data, navigate) => async (dispatch) => {
  try {
    dispatch({
      type: REGISTER_REQUEST,
    });
    await axios
      .post("/api/v1/user/otp-activation/", data)
      .then((res) => {
        dispatch({
          type: REGISTER_SUCCESS,
          payload: {
            user: res.data.user,
            message: res.data.message,
          },
        });
        createToast("success", res.data.message);

        navigate(`/reset-acount/${res.data.token}`);
      })
      .catch((err) => {
        dispatch({
          type: REGISTER_FAILED,
          payload: err.response.data.message,
        });
        createToast("warn", err.response.data.message);
      });
  } catch (error) {
    dispatch({
      type: REGISTER_FAILED,
      payload: error.response.data.message,
    });
    createToast("error", error.response.data.message);
  }
};
