import React, { useMemo, useRef, useState } from 'react';
import { Card, Container, Form, InputGroup } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useSelector } from 'react-redux';

export default function ChatBox({ sendMessage, messages, userIsTyping, typingUsers, userStopedTyping }) {
    const roomName = useSelector(state => state.room.name);
    const user = useSelector(state => state.user.name);
    const message = useRef();

    const send = async (event) => {
        event.preventDefault();
        if (message.current.value === "") {
            window.alert("please supply a message")
        }
        sendMessage(message.current.value);
        message.current.value = '';
    }

    const localmessages = useMemo(() => {
        return messages.map((item, i) => <><p key={i}>{item.message}</p></>)
    }, [messages])

    const userIsTypingSomething = () => {
        let isAlreadyTyping = typingUsers.find(m => m.message === user + " is typing...")
        if (message.current.value.length === 1 && !isAlreadyTyping) userIsTyping();
        if (message.current.value.length === 0 && isAlreadyTyping) userStopedTyping();
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
                            {localmessages}
                        </Card.Body>
                        <Card.Footer>
                            <Form onSubmit={send}>
                                <InputGroup>
                                    <InputGroup.Text ><button type='submit'>Send</button></InputGroup.Text>
                                    <Form.Control as="textarea" aria-label="With textarea" ref={message} onChange={userIsTypingSomething} />
                                </InputGroup>
                            </Form>
                        </Card.Footer>
                        <div>{typingUsers.map(user => user.message)} </div>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}
