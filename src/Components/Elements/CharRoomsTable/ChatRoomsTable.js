import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import Table from 'react-bootstrap/Table'; 
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
;

export default function ChatRoomsTable() {

    const name = useSelector(state => state.user.name)

    const [chatRooms, setChatRooms] = useState([]);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/api/ChatRoom`).then((response) => {
            setChatRooms(response.data);
        });
    }, [])

    function mapChatRooms() {
        return chatRooms.map(chatroom =>
            <tr>
                <td>{chatroom.name}</td>
                <td><Button>Join Room</Button></td>
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
        </>
    )
}
