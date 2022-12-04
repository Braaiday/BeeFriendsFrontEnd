import React, { useState } from 'react';
import { Card, Container, Form, InputGroup } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function ChatBox({ chatName }) {
    const [messages, setMessages] = useState([])

    function mapMessages() {
        return messages.map(message =>
            <p>{message.userName} : {message.text}</p>
        )
    }
    return (
        <Container>
            <Row>
                <Col>
                    <Card>
                        <Card.Header>
                            You are chatting in {chatName}
                        </Card.Header>
                        <Card.Body className='h-75 d-inline-block overflow-scroll'>
                            {mapMessages()}
                        </Card.Body>
                        <Card.Footer>
                            <InputGroup>
                                <InputGroup.Text >Send</InputGroup.Text>
                                <Form.Control as="textarea" aria-label="With textarea" />
                            </InputGroup>
                        </Card.Footer>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}
