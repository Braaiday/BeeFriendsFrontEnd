import React, { useRef, useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function CreateChatRoom({ isOpen, closeModal, joinChat }) {

    // Hooks

    // User
    const user = useSelector(state => state.user.name);

    const name = useRef()
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleClose = (e) => {
        debugger
        e.preventdefault();
        joinChat(user, name.current.value);
        //navigate(`/${room.id}`);
        closeModal();
    }



    return (
        <Modal show={isOpen} >
            <Form onSubmit={(e) => handleClose()}>
                <Modal.Header>
                    <Modal.Title>Make a chat room</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Form.Group className="mb-3" controlId="formBasicName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control required ref={name} type="text" placeholder="Name" />
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
