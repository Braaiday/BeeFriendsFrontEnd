import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Table from 'react-bootstrap/Table'; import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
;

export default function ChatRoomsTable({ joinChat }) {

    const [chatRooms, setChatRooms] = useState([]);
    const navigate = useNavigate();


    // User
    const user = useSelector(state => state.user.name)

    function joinRoom(chatroom) {
        joinChat(user.name, chatroom.name);
        navigate(`/${chatroom.id}`);
    }

    const requestAPI = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/ChatRoom`);
            setChatRooms(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        requestAPI();
    }, [])

    function mapChatRooms() {
        return chatRooms.map(chatroom =>
            <tr>
                <td>{chatroom.name}</td>
                <td><Button onClick={() => joinRoom(chatroom)}>Join Room</Button></td>
            </tr>
        )
    }
    return (
        <>
            <h1>Chat Rooms</h1>
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
