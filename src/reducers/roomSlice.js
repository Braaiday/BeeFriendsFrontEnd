import { HubConnectionBuilder } from '@microsoft/signalr'
import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { toast } from 'react-toastify'

export const roomSlice = createSlice({
    name: 'room',
    initialState: {
        messages: [],
        users: [],
        typingUsers: [],
        connection: null,
    },
    reducers: {
        setMessages: (state, action) => {
            state.messages = action.payload
        },
        setUsers: (state, action) => {
            state.users = action.payload
        },
        setConnection: (state, action) => {
            state.connection = action.payload;
        },
        clearConnection: (state) => {
            state.connection = null;
        },
        addMessage: (state, action) => {
            const { username, message } = action.payload;
            state.messages = [...state.messages, { user: username, message }];
        },
        setTypingUsers: (state, action) => {
            const { username, message } = action.payload;
            if (message === username + " is typing") state.typingUsers = [...state.typingUsers, { user: username, message }];
            if (message === "") state.typingUsers = state.typingUsers.filter(m => m.user !== username);
        }
    },
})

// Thunk action to initialize and start the SignalR connection
export const initializeSignalRConnection = () => async (dispatch, getState) => {
    try {
        const newConnection = new HubConnectionBuilder()
            .withUrl(`${process.env.REACT_APP_API_URL}/chat`)
            .withAutomaticReconnect()
            .build();
        dispatch(setConnection(newConnection));

    } catch (error) {
        toast(error.message);
    }
};

// Thunk action to stop and clear the SignalR connection
export const stopSignalRConnection = () => async (dispatch, getState) => {
    const { connection } = getState().room;
    if (!connection) return;

    try {
        await connection.stop();
        dispatch(clearConnection());
        dispatch(setMessages([]));
        dispatch(setUsers([]));
    } catch (error) {
        toast(error.message);
    }
};

export const getChatHistory = (roomId) => async (dispatch, getState) => {
    axios.post(`${process.env.REACT_APP_API_URL}/api/GetChatHistory`, { Id: roomId })
        .then((response) => {
            let messages = response.data.map((item) => { return { message: item.userMessage, user: item.user } })
            dispatch(setMessages(messages));

        })
        .catch((error) => {
            toast(error.message);
        });
}

export const sendMessage = (message) => async (dispatch, getState) => {
    const { connection } = getState().room;
    if (!connection) return;

    try {
        await connection.invoke("SendMessage", message);
    } catch (error) {
        toast(error.message);
    }
}

export const handleReceivedMessage = (username, message) => (dispatch) => {
    dispatch(addMessage({ username, message }));
};

export const handleReceivedUserTyping = (username, message) => (dispatch) => {
    dispatch(setTypingUsers({ username, message }))
};

export const handleReceivedUserStoppedTyping = (username, message) => (dispatch) => {
    dispatch(setTypingUsers({ username, message }))
};

export const userIsTyping = () => async (dispatch, getState) => {
    const { connection } = getState().room;
    try {
        await connection.invoke("IsTypingMessage");
    } catch (error) {
        toast(error.message);
    }
}

export const userStoppedTyping = () => async (dispatch, getState) => {
    const { connection } = getState().room;
    try {
        await connection.invoke("UserStoppedTyping");
    } catch (error) {
        toast(error.message);
    }
}

// Action creators are generated for each case reducer function
export const { setRoom, setMessages, addMessage, setUsers, setConnection, clearConnection, setTypingUsers } = roomSlice.actions;

export default roomSlice.reducer