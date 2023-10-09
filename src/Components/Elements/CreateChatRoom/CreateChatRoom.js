import React, { useRef } from 'react'
import { Button, Form, Modal } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createChatRoom, sendNewRoom } from '../../../reducers/lobbySlice';
import { toast } from 'react-toastify';

export default function CreateChatRoom({ isOpen, toggleModal }) {
    // Hooks
    const roomName = useRef();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleClose = async (event) => {
        event.preventDefault();
        let request = { name: roomName.current.value };
        try {
            let response = await dispatch(createChatRoom(request));
            navigate(`room/${response.data.name}/${response.data.id}`);
            toggleModal();
        } catch (error) {
            toast(error.message);
        }

    }

    return (
        <Modal show={isOpen} >
            <Form onSubmit={handleClose}>
                <Modal.Header>
                    <Modal.Title>Make a chat room</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Form.Group className="mb-3" controlId="formBasicName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control required ref={roomName} type="text" placeholder="Name" />
                        <Form.Text className="text-muted">
                            Room Name
                        </Form.Text>
                    </Form.Group>

                </Modal.Body>
                <Modal.Footer>
                    <Button type="submit" variant="secondary">
                        Start Chatting
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}
