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

export default function ChatRoomsTable() {
    const [isOpen, setIsOpen] = useState(false);
    const name = useSelector(state => state.user.name)
    const [chatRooms, setChatRooms] = useState([]);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(toggleSpinner());
        axios.get(`${process.env.REACT_APP_API_URL}/api/ChatRoom`).then((response) => {
            dispatch(toggleSpinner());
            setChatRooms(response.data);
        })
            .catch((error) => {
                toast(error.message);
                dispatch(toggleSpinner())
            })
    }, [])

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
            <CreateChatRoom isOpen={isOpen} closeModal={() => closeModal()} />
        </>
    )
}
