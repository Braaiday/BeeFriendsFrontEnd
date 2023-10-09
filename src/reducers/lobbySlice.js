import { HubConnectionBuilder } from '@microsoft/signalr'
import { createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import { toggleSpinner } from './spinnerSlice'
import axios from 'axios'

export const roomSlice = createSlice({
    name: 'lobby',
    initialState: {
        users: [],
        rooms: [],
        connection: [],
    },
    reducers: {
        setRoomsLooby: (state, action) => {
            state.rooms = action.payload
        },
        setUsersLobby: (state, action) => {
            state.users = action.payload
        },
        setConnectionLobby: (state, action) => {
            state.connection = action.payload;
        },
        clearConnectionLobby: (state) => {
            state.connection = null;
        },
    },
})

// Action creators are generated for each case reducer function
export const { setRoomsLooby, setUsersLobby, setConnectionLobby, clearConnectionLobby } = roomSlice.actions;

// Thunk action to initialize and start the SignalR connection
export const initializeSignalRConnectionLobby = () => async (dispatch, getState) => {
    dispatch(toggleSpinner());
    try {
        const newConnection = new HubConnectionBuilder()
            .withUrl(`${process.env.REACT_APP_API_URL}/lobby`)
            .withAutomaticReconnect()
            .build();
        dispatch(setConnectionLobby(newConnection));
        dispatch(toggleSpinner());
    } catch (error) {
        dispatch(toggleSpinner());
        toast(error.message);
    }
};

// Thunk action to stop and clear the SignalR connection
export const stopSignalRConnectionLobby = () => async (dispatch, getState) => {
    const { connection } = getState().lobby;
    if (!connection) return;
    try {
        await connection.stop();
        dispatch(clearConnectionLobby());
    } catch (error) {
        toast(error.message);
    }
};

export const setChatRooms = (rooms) => async (dispatch, getState) => {
    dispatch(setRoomsLooby(rooms));
}

export const sendNewRoom = () => async (dispatch, getState) => {
    const { connection } = getState().lobby;
    dispatch(toggleSpinner());
    try {
        await connection.invoke("NewRoomCreated")
        dispatch(toggleSpinner());
    } catch (error) {
        toast(error.message);
        dispatch(toggleSpinner());
    }
}

export const createChatRoom = (request) => async (dispatch, getState) => {
    dispatch(toggleSpinner());
    try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/CreateChatRoom`, request);
        await dispatch(sendNewRoom(response.data.name));
        dispatch(toggleSpinner());
        return response;
    } catch (error) {
        toast(error.message);
    }
}

export default roomSlice.reducer