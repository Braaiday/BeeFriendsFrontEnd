import { createSlice } from '@reduxjs/toolkit';
import { AxiosInstance } from '../API/Api';

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

  const response = await AxiosInstance.post('/api/SaveUsername', name,
    {
      headers: { 'Content-Type': 'application/json' },
    }
  );
  localStorage.setItem('name', name);
  dispatch(setUser(name));

};

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
