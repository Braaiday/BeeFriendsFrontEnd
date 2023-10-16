import React, { useEffect, useMemo, useRef } from 'react';
import { Card, Col, Container, Form, InputGroup, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { sendMessage, userIsTyping, userStoppedTyping } from '../../../reducers/roomSlice';
import { useParams } from 'react-router-dom';

export const ChatBox = () => {
    // Redux
    const dispatch = useDispatch();
    const user = useSelector(state => state.user.name);
    const messages = useSelector(state => state.room.messages);
    const typingUsers = useSelector(state => state.room.typingUsers);

    // Hooks
    const { room } = useParams();
    const message = useRef();
    const messagesEndRef = useRef()

    const localmessages = useMemo(() => {
        return messages.map((item, i) => {
            const isUserMessage = item.user === user;
            const messageClass = isUserMessage ? 'text-start ml-auto' : 'text-end mr-auto';
            const isBotMessage = item.user === "MyChat Bot";

            return (
                <div key={i} className={`mb-10 ${messageClass}`}>
                    {isBotMessage ? (
                        <Card className='m-1 d-inline-block min-width-class max-width-class'>
                            <Card.Body>
                                <p>{item.message}</p>
                            </Card.Body>
                        </Card>
                    ) : (
                        <Card className='m-1 d-inline-block min-width-class max-width-class'>
                            <Card.Body>
                                <p>{isUserMessage ? '' : item.user + ': '}{item.message}</p>
                            </Card.Body>
                        </Card>
                    )}
                </div>
            );
        })
    }, [messages])


    const send = async (event) => {
        event.preventDefault();
        dispatch(userStoppedTyping());
        dispatch(sendMessage(message.current.value));
        message.current.value = '';
    }

    const userIsTypingSomething = () => {
        let isAlreadyTyping = typingUsers.find(m => m.message === user + " is typing")
        if (message.current.value.length === 1 && !isAlreadyTyping) dispatch(userIsTyping());
        if (message.current.value.length === 0 && isAlreadyTyping) dispatch(userStoppedTyping());
    }

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }

    useEffect(() => {
        scrollToBottom();
    }, [localmessages])

    return (
        <Container className='Chatbox'>
            <Row>
                <Col>
                    <Card className='card-max-height'>
                        <Card.Header>
                            <Row>
                                <Col>
                                    You are chatting in {room}
                                </Col>
                                <Col className='text-end'>
                                    Chatting as {user}
                                </Col>
                            </Row>
                        </Card.Header>
                        <Card.Body className='h-75 d-inline-block pb-20 custom-scroll-container'>
                            {localmessages}
                            <div ref={messagesEndRef} />
                        </Card.Body>
                        <Card.Footer>
                            <Form onSubmit={send}>
                                <InputGroup>
                                    <InputGroup.Text ><button type='submit'>Send</button></InputGroup.Text>
                                    <Form.Control
                                        as="textarea"
                                        aria-label="With textarea"
                                        required
                                        ref={message}
                                        onChange={userIsTypingSomething}
                                        className="custom-text-area"
                                        onKeyDown={(e) => {
                                            if (e.code === "Enter" && message.current.value.length > 0) {
                                                e.preventDefault();
                                                send(e);
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
                                            dispatch(userStoppedTyping());
                                        }}
                                        onFocus={(e) => {
                                            e.preventDefault();
                                            if (message.current.value.length > 0) {
                                                dispatch(userIsTyping());
                                            }
                                        }}
                                    />
                                </InputGroup>
                            </Form>
                        </Card.Footer>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}
