import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setRoom } from '../../../reducers/roomSlice';
import { toggleSpinner } from '../../../reducers/spinnerSlice';
import { toast } from 'react-toastify';
import CreateChatRoom from '../CreateChatRoom/CreateChatRoom';
import { HubConnectionBuilder } from '@microsoft/signalr';

export default function ChatRoomsTable() {
    const [isOpen, setIsOpen] = useState(false);
    const name = useSelector(state => state.user.name)
    const [chatRooms, setChatRooms] = useState([]);
    const [connection, setConnection] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const closeConnection = async () => {
        try {
            if (connection) {
                await connection.stop();
                // Set the connection to null after stopping it
                setConnection(null);
            }
        } catch (error) {
            toast(error.message);
        }
    };

    useEffect(() => {
        try {
            const newConnection = new HubConnectionBuilder()
                .withUrl(`${process.env.REACT_APP_API_URL}/lobby`)
                .withAutomaticReconnect()
                .build();

            setConnection(newConnection);
        } catch (error) {
            toast(error.message);
        }
        return () => {
            closeConnection();
        }
    }, []);

    useEffect(() => {
        if (connection) {
            joinRoom();
        }
    }, [connection])

    const joinRoom = async () => {
        dispatch(toggleSpinner());
        connection.on("ActiveRooms", (rooms) => {
            setChatRooms(rooms);
        });

        connection.onclose(e => {
            setConnection(null);
        });

        await connection.start();
        await connection.invoke("JoinLobby", { user: name, room: "Lobby" });
        dispatch(toggleSpinner());
    }

    const joinChatRoom = (chatroom) => {
        dispatch(setRoom(chatroom.name))
        navigate(`room/${chatroom.name}/${chatroom.id}`)
    }

    function closeModal() {
        setIsOpen(false);
    }

    function mapChatRooms() {
        return chatRooms.map(chatroom =>
            <tr key={chatroom.id}>
                <td>{chatroom.name}</td>
                <td><Button onClick={() => joinChatRoom(chatroom)}>Join Room</Button></td>
            </tr>
        )
    }
    const sendNewRoom = async (roomName) => {
        try {

            await connection.invoke("NewRoomCreated")
        } catch (error) {
            toast(error.message);
            dispatch(toggleSpinner());
        }
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
            <CreateChatRoom isOpen={isOpen} closeModal={() => closeModal()} sendNewRoom={sendNewRoom} />
        </>
    )
}
