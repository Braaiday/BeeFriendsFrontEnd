import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Card, Container, Form, InputGroup } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useSelector } from 'react-redux';

export default function ChatBox({ sendMessage, messages, userIsTyping, typingUsers, userStopedTyping }) {
    const roomName = useSelector(state => state.room.name);
    const user = useSelector(state => state.user.name);
    const message = useRef();
    const messagesEndRef = useRef()
    const regExp = /[a-zA-Z]/g;

    const send = async (event) => {
        event.preventDefault();
        sendMessage(message.current.value);
        message.current.value = '';
    }

    const localmessages = useMemo(() => {

        return messages.map((item, i) => {
            debugger
            if (item.user === "MyChat Bot") {
                return <><p key={i}>{item.message}</p></>
            } else {
                return <><p key={i}>{`${item.user}: `}{item.message}</p></>
            }
        })
    }, [messages])

    const userIsTypingSomething = () => {
        let isAlreadyTyping = typingUsers.find(m => m.message === user + " is typing")
        if (message.current.value.length === 1 && !isAlreadyTyping) userIsTyping();
        if (message.current.value.length === 0 && isAlreadyTyping) userStopedTyping();
    }

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }

    useEffect(() => {
        scrollToBottom();
    }, [localmessages])

    return (
        <Container>
            <Row>
                <Col>
                    <Card className='card-max-height'>
                        <Card.Header>
                            You are chatting in {roomName}
                        </Card.Header>
                        <Card.Body className='h-75 d-inline-block overflow-scroll pb-20'>
                            {localmessages}
                            <div ref={messagesEndRef} />
                        </Card.Body>
                        <Card.Footer>
                            <Form onSubmit={send}>
                                <InputGroup>
                                    <InputGroup.Text ><button type='submit'>Send</button></InputGroup.Text>
                                    <Form.Control as="textarea"
                                        aria-label="With textarea"
                                        required
                                        ref={message}
                                        onChange={userIsTypingSomething}
                                        onKeyDown={(e) => {

                                            if (e.code === "Enter" && regExp.test(message.current.value)) {
                                                e.preventDefault();
                                                sendMessage(message.current.value);
                                                message.current.value = "";
                                                return false;
                                            }
                                            if (e.code === "Enter" && !e.shiftKey) {
                                                e.preventDefault();
                                                return false;
                                            }
                                        }}
                                        onBlur={(e) => {
                                            e.preventDefault();
                                            userStopedTyping();
                                        }}
                                        onFocus={(e) => {
                                            e.preventDefault();
                                            if (regExp.test(message.current.value)) userIsTyping();
                                        }}
                                    />
                                </InputGroup>
                            </Form>
                        </Card.Footer>
                    </Card>
                    {typingUsers.map(user => <p className='loading mr-1'>{user.message}</p>)}
                </Col>
            </Row>
        </Container>
    )
}
