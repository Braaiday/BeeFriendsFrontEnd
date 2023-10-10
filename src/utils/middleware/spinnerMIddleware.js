import { toggleSpinner } from "../../reducers/spinnerSlice";


const spinnerMiddleware = store => next => action => {
  if (action.type.endsWith("_REQUEST")) {
    // Dispatch the toggleSpinner action to turn on the spinner
    store.dispatch(toggleSpinner());
  }
  if (action.type.endsWith("_SUCCESS") || action.type.endsWith("_FAILURE")) {
    // Dispatch the toggleSpinner action to turn off the spinner
    store.dispatch(toggleSpinner());
  }
  return next(action);
};

export default spinnerMiddleware;
