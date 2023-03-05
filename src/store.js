import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/userSlice';
import roomReducer from './reducers/roomSlice';

export default configureStore({
  reducer: {
    user: userReducer,
    room: roomReducer
  },
})