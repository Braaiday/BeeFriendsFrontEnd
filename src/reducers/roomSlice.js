import { createSlice } from '@reduxjs/toolkit'

export const roomSlice = createSlice({
    name: 'room',
    initialState: {
        name: null,
        messages: [],
        connection: null,
    },
    reducers: {
        setRoom: (state, action) => {
            state.name = action.payload
        },
        setMessages: (state, action) => {
            state.messages = action.payload
        },
        setConnection: (state, action) => {
            state.connection = action.payload
        }
    },
})

// Action creators are generated for each case reducer function
export const { setRoom, setMessages, setConnection } = roomSlice.actions

export default roomSlice.reducer