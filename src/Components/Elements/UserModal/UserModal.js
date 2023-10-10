import React, { useRef, useState } from 'react';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useDispatch } from 'react-redux';
import { saveUsername } from '../../../reducers/userSlice';

export default function UserModal({ isOpen }) {
    const name = useRef();
    const [show, setShow] = useState(isOpen);
    const dispatch = useDispatch();

    const handleClose = async (event) => {
        event.preventDefault();
        await dispatch(saveUsername(name.current.value));
        setShow(false);
    };

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
                            <Form.Control
                                required
                                ref={name}
                                type="text"
                                placeholder="Name"
                            />
                            <Form.Text className="text-muted">This is who people will see you as</Form.Text>
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
    );
}
