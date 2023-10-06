import { HubConnectionBuilder } from '@microsoft/signalr';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { setRoom, setUsers } from '../../../reducers/roomSlice';
import { toggleSpinner } from '../../../reducers/spinnerSlice';
import ChatBox from '../../Elements/ChatBox/ChatBox';
import UserList from '../../Elements/UserList/UserList';
import { toast } from 'react-toastify';

export default function PageChatRoom() {
  const user = useSelector(state => state.user.name);
  const [messages, setMessages] = useState([]);
  const [typingUsers, setTypingUsers] = useState([]);
  const room = useSelector(state => state.room.name);
  const [connection, setConnection] = useState(null);
  const apiIsLoading = useSelector(state => state.spinner.isLoading);
  const { id } = useParams();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    try {
      const newConnection = new HubConnectionBuilder()
        .withUrl(`${process.env.REACT_APP_API_URL}/chat`)
        .withAutomaticReconnect()
        .build();

      setConnection(newConnection);
    } catch (error) {
      toast(error.message);
    }
    return () => {
      closeConnection();
    }
  }, []);

  useEffect(() => {
    if (room === null) {
      axios.get(`${process.env.REACT_APP_API_URL}/api/ChatRoom`).then((response) => {
        dispatch(toggleSpinner());
        let foundRoom = response.data.find(chat => chat.id === Number(id));
        dispatch(setRoom(foundRoom.name));
      })
        .catch((error) => {
          toast(error.message);
          dispatch(toggleSpinner());
        })
    }

    axios.post(`${process.env.REACT_APP_API_URL}/api/GetChatHistory`, { Id: id })
      .then((response) => {
        let mapMessages = [];
        response.data.forEach((item) => {
          let newMessage = {
            message: item.userMessage,
            user: item.user
          }
          mapMessages.push(newMessage)
        })
        setMessages(mapMessages);
      })
      .catch((error) => {
        toast(error.message);
      });
  }, [])

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
      setConnection(null);
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
    } catch (error) {
      toast(error.message);
    }
  }

  const closeConnection = async () => {
    try {
      await connection.stop();
    } catch (error) {
      toast(error.message);
    }
  }

  const userIsTyping = async () => {
    try {
      await connection.invoke("IsTypingMessage");
    } catch (error) {
      toast(error.message);
    }
  }

  const userStoppedTyping = async () => {
    try {
      await connection.invoke("UserStoppedTyping");
    } catch (error) {
      toast(error.message);
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
    <div className='PageChatRoom'>
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
            <ChatBox className="flex" sendMessage={sendMessage} messages={messages} userIsTyping={userIsTyping} typingUsers={typingUsers} userStoppedTyping={userStoppedTyping} />
            {typingUsers.map(user => <p className='loading mr-1'>{user.message}</p>)}
          </>
        }
      </div>
    </div>

  )
}
