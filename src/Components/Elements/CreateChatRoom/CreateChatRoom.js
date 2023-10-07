import axios from 'axios';
import React, { useRef } from 'react'
import { Button, Form, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setRoom } from '../../../reducers/roomSlice';
import { toggleSpinner } from '../../../reducers/spinnerSlice';
import { toast } from 'react-toastify';

export default function CreateChatRoom({ isOpen, toggleModal, sendNewRoom }) {
    // Hooks
    const roomName = useRef();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleClose = async (event) => {

        event.preventDefault();
        let request = { name: roomName.current.value };
        dispatch(toggleSpinner());

        let createChatRoomResponse;
        try {
            createChatRoomResponse = await createChatRoom(request);
        } catch (error) {
            toast(error.response.data);
            dispatch(toggleSpinner()); 
            return
        }

        await sendNewRoom(roomName.current.value);
        dispatch(toggleSpinner());
        dispatch(setRoom(createChatRoomResponse.data.name));
        navigate(`room/${createChatRoomResponse.data.name}/${createChatRoomResponse.data.id}`);
        toggleModal();
    }

    const createChatRoom = (request) => {
        return axios.post(`${process.env.REACT_APP_API_URL}/api/CreateChatRoom`, request);
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
