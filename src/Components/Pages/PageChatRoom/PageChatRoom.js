import { HubConnectionBuilder } from '@microsoft/signalr';
import { cloneDeep } from 'lodash';
import React, { useEffect, useState } from 'react'
import { Button, Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setUsers } from '../../../reducers/roomSlice';
import { toggleSpinner } from '../../../reducers/spinnerSlice';
import ChatBox from '../../Elements/ChatBox/ChatBox';
import UserList from '../../Elements/UserList/UserList';


export default function PageChatRoom() {
  const user = useSelector(state => state.user.name);
  const [messages, setMessages] = useState([]);
  const [typingUsers, setTypingUsers] = useState([]);
  const room = useSelector(state => state.room.name);
  const [connection, setConnection] = useState(null);
  const apiIsLoading = useSelector(state => state.spinner.isLoading);

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
    if (connection) {
      joinRoom();
    }
  }, [connection])

  const joinRoom = async () => {
    dispatch(toggleSpinner());
    connection.on("ReceiveMessage", (user, message) => {
      handleMessagesUpdates(user, message)
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
    dispatch(toggleSpinner());
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

  const userIsTyping = async () => {
    try {
      await connection.invoke("IsTypingMessage");
    } catch (e) {
      console.log(e);
    }
  }

  const userStopedTyping = async () => {
    try {
      await connection.invoke("UserStopedTyping");
    } catch (e) {
      console.log(e);
    }
  }

  const handleMessagesUpdates = (username, message) => {
    if (message === username + " is typing") {
      setTypingUsers(messages => [...messages, { user: username, message }])
    }
    else if (message === "") {
      setTypingUsers(messages => messages.filter(m => m.user !== username))
    }
    else {
      setMessages(messages => [...messages, { user: username, message }]);
      setTypingUsers(messages => messages.filter(m => m.user !== username))
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
        {!apiIsLoading &&
          <>
            <UserList />
            <ChatBox className="flex" sendMessage={sendMessage} messages={messages} userIsTyping={userIsTyping} typingUsers={typingUsers} userStopedTyping={userStopedTyping} />
          </>
        }
      </div>
    </div>

  )
}
