import React, { useRef, useState } from 'react';
import { Card, Container, Form, InputGroup } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useSelector } from 'react-redux';

export default function ChatBox() {
    const messages = useSelector((state) => state.room.messages);
    const roomName = useSelector(state => state.room.name);
    const connection = useSelector(state => state.room.connection);
    const name = useSelector(state => state.user.name);
    const message = useRef();

    const sendMessage = async () => {
        const chatMessage = {
            user: name,
            message: message.current.value,
            room: roomName
        };

        if (connection.connectionStarted) {
            try {
                await connection.send('SendMessage', chatMessage);
            }
            catch (e) {
                console.log(e);
            }
        }
        else {
            alert('No connection to server yet.');
        }
    }

    return (
        <Container>
            <Row>
                <Col>
                    <Card>
                        <Card.Header>
                            You are chatting in {roomName}
                        </Card.Header>
                        <Card.Body className='h-75 d-inline-block overflow-scroll'>
                            {messages.map(message => <p>{message.message}</p>)}
                        </Card.Body>
                        <Card.Footer>
                            <Form onSubmit={sendMessage}>
                                <InputGroup>
                                    <InputGroup.Text type='submit'>Send</InputGroup.Text>
                                    <Form.Control as="textarea" aria-label="With textarea" ref={message} />
                                </InputGroup>
                            </Form>
                        </Card.Footer>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}
