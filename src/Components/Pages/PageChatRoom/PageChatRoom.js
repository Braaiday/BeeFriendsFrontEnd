import { HubConnectionBuilder } from '@microsoft/signalr';
import React, { useEffect, useState } from 'react'
import { Button, Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setUsers } from '../../../reducers/roomSlice';
import ChatBox from '../../Elements/ChatBox/ChatBox';
import UserList from '../../Elements/UserList/UserList';


export default function PageChatRoom() {
  const user = useSelector(state => state.user.name);
  const [messages, setMessages] = useState([]);
  const room = useSelector(state => state.room.name);
  const users = useSelector(state => state.room.users);
  const [connection, setConnection] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    try {
      const newConnection = new HubConnectionBuilder()
        .withUrl(`${process.env.REACT_APP_API_URL}/chat`)
        .withAutomaticReconnect()
        .build();

      setConnection(newConnection);
    } catch (e) {
      console.log(e);
    }
    return () => {
      closeConnection();
    }
  }, []);

  useEffect(() => {
    debugger
    if (connection) {
      joinRoom();
    }
  }, [connection])

  const joinRoom = async () => {
    connection.on("ReceiveMessage", (user, message) => {
      setMessages(messages => [...messages, { user, message }]);
    });

    connection.on("UsersInRoom", (users) => {
      dispatch(setUsers(users));
    });

    connection.onclose(e => {
      setConnection();
      setMessages([]);
      dispatch(setUsers([]));
    });

    await connection.start();
    await connection.invoke("JoinRoom", { user, room });
  }

  const sendMessage = async (message) => {
    try {
      await connection.invoke("SendMessage", message);
    } catch (e) {
      console.log(e);
    }
  }

  const closeConnection = async () => {
    try {
      await connection.stop();
    } catch (e) {
      console.log(e);
    }
  }


  return (
    <div>
      <Row>
        <Col>
          <Button onClick={() => {
            closeConnection();
            navigate("/");
          }} className="justify-content-end">
            Leave Room
          </Button>
        </Col>
        <Col>
          <p>Chatting as {user}</p>
        </Col>
      </Row>
      <br />
      <br />
      <div className='d-flex'>
        <UserList />
        <ChatBox className="flex" sendMessage={sendMessage} messages={messages} />
      </div>
    </div>

  )
}
