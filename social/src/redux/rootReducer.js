import { combineReducers } from "redux";
import AuthReducer from "./Auth/AuthReducer.js";
import toastReducer from "./Toast/ToastReducer.js";

/**
 * create rootReducer
 *
 */

const rootReducer = combineReducers({
  auth: AuthReducer,
  toast: toastReducer,
});

export default rootReducer;
