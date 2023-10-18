import { createSlice } from '@reduxjs/toolkit'

export const spinnerSlice = createSlice({
    name: 'spinner',
    initialState: {
        requestCount: 0, // Initialize the count to 0
    },
    reducers: {
        incrementRequestCount: (state) => {
            state.requestCount += 1;
        },
        decrementRequestCount: (state) => {
            state.requestCount -= 1;
        },
    },
})

// Action creators are generated for each case reducer function
export const { incrementRequestCount, decrementRequestCount } = spinnerSlice.actions

export default spinnerSlice.reducer
