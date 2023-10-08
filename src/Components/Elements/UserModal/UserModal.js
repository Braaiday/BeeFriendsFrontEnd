import React, { useRef, useState } from 'react';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useDispatch } from 'react-redux';
import { setUser } from '../../../reducers/userSlice';
import axios from 'axios';
import { toast } from 'react-toastify';
import { toggleSpinner } from '../../../reducers/spinnerSlice';


export default function UserModal({ isOpen }) {
    const name = useRef()
    const [show, setShow] = useState(isOpen);
    const dispatch = useDispatch();

    const handleClose = async (event) => {
        event.preventDefault();
        dispatch(toggleSpinner());
        axios.post(`${process.env.REACT_APP_API_URL}/api/SaveUsername`, name.current.value, {
            headers: { 'Content-Type': 'application/json' }
        })
            .then(() => {
                dispatch(toggleSpinner());
                localStorage.setItem('name', name.current.value);
                dispatch(setUser(name.current.value));
                setShow(false);
            }).catch((error) => {
                dispatch(toggleSpinner());
                toast(error.message);
            })
    }

    return (
        <>
            <Modal show={show}>
                <Form onSubmit={handleClose}>
                    <Modal.Header>
                        <Modal.Title>Who do you want to be known as</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <Form.Group className="mb-3" controlId="formBasicName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control required ref={name} type="text" placeholder="Name" />
                            <Form.Text className="text-muted">
                                This is who people will see you as
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
        </>
    )
}
