import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/userSlice';
import roomReducer from './reducers/roomSlice';
import spinnerReducer from './reducers/spinnerSlice';
import thunk from 'redux-thunk';

export default configureStore({
  reducer: {
    user: userReducer,
    room: roomReducer,
    spinner: spinnerReducer,
  },
  middleware: [thunk],
});
