import axios from "axios";
import cookie from "js-cookie";
import createToast from "../../Utility/toast";
import { LOADER_START } from "../TopLoader/loadertypes";
import {
  LOGIN_FAILED,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT_USER,
  REGISTER_FAILED,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  TOKEN_FAILED,
  TOKEN_REQ,
  TOKEN_SUCCESS,
  USER_PROFILE_UPDATE,
} from "./authType";

// Register user
export const userRegister =
  (data, setInput, setModal, navigate) => async (dispatch) => {
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
          setModal(false);
          setInput({
            f_name: "",
            s_name: "",
            mobile: "",
            email: "",
            password: "",
          });
          dispatch({
            type: LOADER_START,
          });
          navigate("/verify/verify-user");
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
        dispatch({
          type: LOADER_START,
        });
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
        dispatch({
          type: LOADER_START,
        });
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
        dispatch({
          type: LOADER_START,
        });
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

// user Login
export const loginUser = (data, navigate) => async (dispatch) => {
  try {
    dispatch({
      type: LOGIN_REQUEST,
    });
    dispatch({
      type: LOADER_START,
    });
    await axios
      .post("/api/v1/user/login", {
        auth: data.auth,
        password: data.password,
      })
      .then((res) => {
        dispatch({
          type: LOGIN_SUCCESS,
          payload: {
            user: res.data.user,
            message: res.data.message,
          },
        });
        console.log(res.data);
        createToast("success", "Login Success!");
        dispatch({
          type: LOADER_START,
        });
        navigate(`/`);
      })
      .catch((err) => {
        dispatch({
          type: LOGIN_FAILED,
          payload: err.response.data.message,
        });
        createToast("warn", err.response.data.message);
      });
  } catch (error) {
    dispatch({
      type: LOGIN_FAILED,
      payload: error.response.data.message,
    });
    createToast("error", error.response.data.message);
  }
};

// Token User Check
export const tokenUser = () => async (dispatch) => {
  try {
    await axios
      .get("/api/v1/user/me", {
        headers: {
          Authorization: `Bearer ${cookie.get("accessToken")}`,
        },
      })
      .then((res) => {
        dispatch({
          type: TOKEN_SUCCESS,
          payload: res.data.user,
        });
      })
      .catch((err) => {
        dispatch({
          type: TOKEN_FAILED,
          payload: err.response.data.message,
        });
        console.log(err);
        createToast("warn", err.response.data.message);
      });
  } catch (error) {
    dispatch({
      type: TOKEN_FAILED,
      payload: error.response.data.message,
    });
    createToast("error", error.response.data.message);
  }
};

// logout User
export const userLogout = () => (dispatch) => {
  cookie.remove("accessToken");
  dispatch({
    type: LOGOUT_USER,
  });
  dispatch({
    type: LOADER_START,
  });
};

// Profile Update

export const profileDataUpdate = (data, id, setBioShow) => async (dispatch) => {
  try {
    await axios
      .put(`/api/v1/user/update-data/${id}`, data)
      .then((res) => {
        createToast("success", res.data.message);
        setBioShow(false);
        dispatch({
          type: USER_PROFILE_UPDATE,
          payload: res.data.user,
        });
      })
      .catch((err) => {
        console.log(err);
        createToast("warn", err.response.data.message);
      });
  } catch (error) {
    console.log(error);
    createToast("error", error.response.data.message);
  }
};
