import React, { useRef } from 'react'
import { Button, Form, Modal } from 'react-bootstrap';

export default function CreateChatRoomModal({ isOpen, toggleModal }) {
    // Hooks
    const roomName = useRef();

    const handleClose = async (event) => {
        event.preventDefault();
        toggleModal(roomName.current.value);
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
