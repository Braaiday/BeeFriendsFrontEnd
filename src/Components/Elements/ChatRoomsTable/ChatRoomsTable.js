import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import CreateChatRoom from '../CreateChatRoom/CreateChatRoom';
import { Button, Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toggleSpinner } from '../../../reducers/spinnerSlice';
import { initializeSignalRConnectionLobby, setChatRooms, setUsersLobby, stopSignalRConnectionLobby } from '../../../reducers/lobbySlice';
import { HubConnectionState } from '@microsoft/signalr';


export default function ChatRoomsTable() {
    // Redux
    const dispatch = useDispatch();
    const name = useSelector(state => state.user.name);
    const chatRooms = useSelector(state => state.lobby.rooms);
    const connection = useSelector(state => state?.lobby?.connection ?? null);

    // Hooks
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        dispatch(initializeSignalRConnectionLobby());
        return () => {
            dispatch(stopSignalRConnectionLobby());
        }
    }, []);

    useEffect(() => {
        if (connection) {
            joinLobby();
        }
    }, [connection])

    const joinLobby= async () => {
        if (connection.state === HubConnectionState.Disconnected) {
            connection.on("ActiveRooms", (rooms) => {
                dispatch(setChatRooms(rooms));
            });
            connection.on("UsersInRoom", (users) => {
                dispatch(setUsersLobby(users));
            });

            await connection.start();
            await connection.invoke("JoinLobby", { user: name, room: "Lobby" });
        }
    }

    const joinChatRoom = (chatroom) => {
        navigate(`room/${chatroom.name}/${chatroom.id}`)
    }

    function toggleModal() {
        setIsOpen(!isOpen);
    }

    function mapChatRooms() {
        return chatRooms.map(chatroom =>
            <tr key={chatroom.id}>
                <td>{chatroom.name}</td>
                <td><Button onClick={() => joinChatRoom(chatroom)}>Join Room</Button></td>
            </tr>
        )
    }

    return (
        <>
            <Row>
                <Col>
                    <h1>Chat Rooms</h1>
                </Col>
                <Col>
                    <p>Chatting as {name}</p>
                </Col>
                <Col>
                    <Button onClick={() => setIsOpen(true)}>Create Room</Button>
                </Col>
            </Row>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Join</th>
                    </tr>
                </thead>
                <tbody>
                    {mapChatRooms()}
                </tbody>
            </Table>
            {/* Create Chat Room Modal */}
            <CreateChatRoom isOpen={isOpen} toggleModal={() => toggleModal()} />
        </>
    )
}
