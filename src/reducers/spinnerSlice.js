import { createSlice } from '@reduxjs/toolkit'

export const spinnerSlice = createSlice({
    name: 'spinner',
    initialState: {
        isLoading: false,
    },
    reducers: {
        toggleSpinner: (state, action) => {
            state.isLoading = !state.isLoading 
        },
      
    },
})

// Action creators are generated for each case reducer function
export const { toggleSpinner} = spinnerSlice.actions

export default spinnerSlice.reducer