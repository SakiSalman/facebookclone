import {
  FEATURED_IMAGE_UPDATE,
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
  USER_PROFILE_COVER,
  USER_PROFILE_PHOTO,
  USER_PROFILE_UPDATE,
} from "./authType.js";
import inititalState from "./InitialState.js";

const AuthReducer = (state = inititalState, { type, payload }) => {
  switch (type) {
    case REGISTER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        user: payload.user,
        message: payload.message,
      };
    case REGISTER_FAILED:
      return {
        ...state,
        loading: false,
        message: payload,
        user: null,
      };

    case LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        user: payload.user,
        message: payload.message,
        loginState: true,
      };

    case LOGIN_FAILED:
      return {
        ...state,
        loading: false,
        message: payload,
        loginState: false,
        user: null,
      };

    case TOKEN_REQ:
      return {
        ...state,
        loading: true,
      };

    case TOKEN_SUCCESS:
      return {
        ...state,
        user: payload,
        loginState: true,
        loading: false,
      };
    case TOKEN_FAILED:
      return {
        ...state,
        user: null,
        loading: false,
        loginState: false,
        message: payload,
      };
    case LOGOUT_USER:
      return {
        ...state,
        user: null,
        loginState: false,
      };
    case USER_PROFILE_UPDATE:
      return {
        ...state,
        user: {
          ...payload,
        },
      };
    case USER_PROFILE_PHOTO:
      return {
        ...state,
        user: {
          ...payload,
        },
      };
    case USER_PROFILE_COVER:
      return {
        ...state,
        user: {
          ...payload,
        },
      };
    case FEATURED_IMAGE_UPDATE:
      return {
        ...state,
        user: {
          ...payload,
        },
      };
    default:
      return state;
  }
};

export default AuthReducer;
