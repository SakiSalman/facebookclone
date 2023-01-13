import { combineReducers } from "redux";
import AuthReducer from "./Auth/AuthReducer.js";
import toastReducer from "./Toast/ToastReducer.js";
import LoaderReducer from "./TopLoader/loaderReducer.js";

/**
 * create rootReducer
 *
 */

const rootReducer = combineReducers({
  auth: AuthReducer,
  toast: toastReducer,
  loader: LoaderReducer,
});

export default rootReducer;
