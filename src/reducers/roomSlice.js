import { createSlice } from '@reduxjs/toolkit'

export const roomSlice = createSlice({
    name: 'room',
    initialState: {
        name: null,
        messages: [],
        users: [],
    },
    reducers: {
        setRoom: (state, action) => {
            state.name = action.payload
        },
        setMessages: (state, action) => {
            state.messages = action.payload
        },
        setUsers: (state, action) => {
            state.users = action.payload
        }
    },
})

// Action creators are generated for each case reducer function
export const { setRoom, setMessages, setConnection, setUsers } = roomSlice.actions

export default roomSlice.reducer