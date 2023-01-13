import loaderInit from "./loaderinit";
import { LOADER_END, LOADER_START } from "./loadertypes";

const LoaderReducer = (state = loaderInit, { type, payload }) => {
  switch (type) {
    case LOADER_START:
      return 100;
    case LOADER_END:
      return 0;

    default:
      return state;
  }
};

export default LoaderReducer;
