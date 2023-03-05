import { HubConnectionBuilder } from '@microsoft/signalr';
import React, { useEffect, useState } from 'react'
import { Button, Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setConnection, setMessages } from '../../../reducers/roomSlice';
import ChatBox from '../../Elements/ChatBox/ChatBox';
import UserList from '../../Elements/UserList/UserList';


export default function PageChatRoom() {
  const name = useSelector(state => state.user.name);
  const connection = useSelector(state => state.room.connection);
  const messages = useSelector(state => state.room.messages);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {

    const newConnection = new HubConnectionBuilder()
      .withUrl(`${process.env.REACT_APP_API_URL}/chat`)
      .withAutomaticReconnect()
      .build();

    dispatch(setConnection(newConnection));
  }, []);

  useEffect(() => {
    if (connection) {
      connection.start()
        .then(result => {
          console.log('Connected!');

          connection.on('JoinRoom', message => {
            const updatedChat = messages;
            updatedChat.push(message);

            dispatch(setMessages(updatedChat));
          });
        })
        .catch(e => console.log('Connection failed: ', e));
    }
  }, [connection]);

  

  return (
    <div>
      <Row>
        <Col>
          <Button onClick={() => navigate("/")} className="justify-content-end">Leave Room</Button>
        </Col>
        <Col>
          <p>Chatting as {name}</p>
        </Col>
      </Row>
      <br />
      <br />
      <div className='d-flex'>
        <UserList className="flex" />
        <ChatBox className="flex" />
      </div>
    </div>

  )
}
