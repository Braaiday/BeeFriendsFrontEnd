import React, { useEffect } from 'react'
import UserList from '../../Elements/UserList/UserList';
import { Button, Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getChatHistory, handleReceivedMessage, handleReceivedUserStoppedTyping, handleReceivedUserTyping, initializeSignalRConnection, setUsers, stopSignalRConnection } from '../../../reducers/roomSlice';
import { toggleSpinner } from '../../../reducers/spinnerSlice';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { ChatBox } from '../../Elements/ChatBox/ChatBox';
import { HubConnectionState } from '@microsoft/signalr';

export const PageChatRoom = () => {
    //Redux 
    const dispatch = useDispatch();
    const apiIsLoading = useSelector(state => state.spinner.isLoading);
    const typingUsers = useSelector(state => state.room.typingUsers);
    const user = useSelector(state => state.user.name ?? localStorage.getItem('name'));
    const connection = useSelector(state => state?.room?.connection ?? null);
    const { room, id } = useParams();

    // Hooks
    const navigate = useNavigate();

    // Initializing Signal R Connection
    useEffect(() => {
        dispatch(initializeSignalRConnection());
        return () => dispatch(stopSignalRConnection());
    }, []);

    // Getting the chat history
    useEffect(() => {
        dispatch(getChatHistory(id));
    }, []);

    // When we have a connection call the join room function
    useEffect(() => {
        if (connection) {
            joinRoom();
        }
    }, [connection]);

    const joinRoom = async () => {
        dispatch(toggleSpinner());

        // Check if the connection is in the Disconnected state before starting it.
        if (connection.state === HubConnectionState.Disconnected) {
            connection.on("ReceiveMessage", (user, message) => {
                dispatch(handleReceivedMessage(user, message));
            });

            connection.on("userIsTyping", (user, message) => {
                dispatch(handleReceivedUserTyping(user, message));
            });

            connection.on("userStoppedTyping", (user, message) => {
                dispatch(handleReceivedUserStoppedTyping(user, message));
            });

            connection.on("UsersInRoom", (users) => {
                dispatch(setUsers(users));
            });

            await connection.start();
            await connection.invoke("JoinRoom", { user, room });
            dispatch(toggleSpinner());
        }
    };


    return (
        <div className='PageChatRoom'>
            <Row>
                <Col>
                    <Button
                        onClick={() => {
                            dispatch(stopSignalRConnection());
                            navigate("/");
                        }}
                        className="justify-content-end"
                    >
                        Leave Room
                    </Button>
                </Col>
                <Col>
                    <h1>Chatting as {user}</h1>
                </Col>
            </Row>
            <br />
            <br />
            <div className='chat-container'>
                <div className='user-list-chat-item'>
                    <UserList />
                </div>
                <div className='chat-box-chat-item'>
                    <ChatBox />
                </div>
            </div>
            <div className='justify-content-center'>
                {typingUsers.map(user => <p key={user} className='loading mr-1'>{user.message}</p>)}
            </div>
        </div>
    )
}
