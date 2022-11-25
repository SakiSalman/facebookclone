/**
 * Creat Toast Reducer
 */

const initToast = {
  msg: "",
  type: "error",
};
const toastReducer = (state = initToast, { type, payload }) => {
  switch (type) {
    case "":
      break;

    default:
      return state;
  }
};

export default toastReducer;
