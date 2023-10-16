import React, { useEffect, useMemo, useRef } from 'react';
import { Card, Col, Container, Form, InputGroup, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { sendMessage, userIsTyping, userStoppedTyping } from '../../../reducers/roomSlice';
import { useParams } from 'react-router-dom';

export const ChatBox = () => {
    // Constants
    const regExp = /[a-zA-Z]/g;

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
            if (item.user === "MyChat Bot") {
                return <><p key={i}>{item.message}</p></>
            } else {
                return <><p key={i}>{`${item.user}: `}{item.message}</p></>
            }
        })
    }, [messages])

    const send = async (event) => {
        event.preventDefault();
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
        <Container className='chatbox'>
            <Row>
                <Col>
                    <Card className='card-max-height'>
                        <Card.Header>
                            You are chatting in {room}
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
                                            if (e.code === "Enter" && regExp.test(message.current.value)) {
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
                                            if (regExp.test(message.current.value)) {
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
