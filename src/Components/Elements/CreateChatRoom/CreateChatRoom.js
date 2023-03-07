import axios from 'axios';
import React, { useRef } from 'react'
import { Button, Form, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setRoom } from '../../../reducers/roomSlice';
import { toggleSpinner } from '../../../reducers/spinnerSlice';

export default function CreateChatRoom({ isOpen, closeModal }) {

    // Hooks
    const roomname = useRef();
    const username = useSelector(state => state.user.name);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleClose = (event) => {
        
        event.preventDefault();
        let request = {name: roomname.current.value};
        dispatch(toggleSpinner());
        axios.post(`${process.env.REACT_APP_API_URL}/api/CreateChatRoom`, request)
        .then((response) => {
            dispatch(setRoom(response.data.name));
            navigate(`room/${response.data.id}`);
            dispatch(toggleSpinner());
        })
        .catch((response) => {
            window.alert("unable to create chat room" + {response});
            dispatch(toggleSpinner());
        });
        closeModal();
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
                        <Form.Control required ref={roomname} type="text" placeholder="Name" />
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
