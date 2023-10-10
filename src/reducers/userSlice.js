import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { toggleSpinner } from './spinnerSlice';
import { toast } from 'react-toastify';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    name: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.name = action.payload;
    },
  },
});

// Add a thunk action to save the username
export const saveUsername = (name) => async (dispatch) => {
  dispatch(toggleSpinner());

  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/SaveUsername`,
      name,
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );
    localStorage.setItem('name', name);
    dispatch(setUser(name));
    dispatch(toggleSpinner());
  } catch (error) {
    dispatch(toggleSpinner());
    toast(error.message);
  }
};

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
