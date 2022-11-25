import {
  REGISTER_FAILED,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
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
        message: payload,
      };
    case REGISTER_FAILED:
      return {
        ...state,
        loading: false,
        message: payload,
      };

    default:
      return inititalState;
  }
};

export default AuthReducer;
