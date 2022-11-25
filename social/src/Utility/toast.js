import { toast } from "react-toastify";

/**
 * Use Toaster
 */

const createToast = (type = "error", message) => {
  switch (type) {
    case "error":
      toast.error(message);
      break;
    case "warn":
      toast.warn(message);
      break;
    case "success":
      toast.success(message);
      break;
    case "info":
      toast.success(message);
      break;
    default:
      break;
  }
};

export default createToast;
