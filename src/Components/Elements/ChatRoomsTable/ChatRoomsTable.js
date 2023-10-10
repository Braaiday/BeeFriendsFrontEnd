import React, { useState } from 'react';
import Table from 'react-bootstrap/Table';
import CreateChatRoom from '../CreateChatRoom/CreateChatRoom';
import { Button, Col, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function ChatRoomsTable() {
    // Redux
    const name = useSelector(state => state.user.name);
    const chatRooms = useSelector(state => state.lobby.rooms);

    // Hooks
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

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
