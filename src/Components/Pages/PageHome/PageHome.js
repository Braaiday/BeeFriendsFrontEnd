import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import ChatRoomsTable from '../../Elements/CharRoomsTable/ChatRoomsTable'
import UserModal from '../../Elements/UserModal/UserModal';

import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { Button } from 'react-bootstrap';
import CreateChatRoom from '../../Elements/CreateChatRoom/CreateChatRoom';

export default function PageHome() {

  const [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  // User
  const user = useSelector(state => state.user.name)

  // Signal R logic
  const [connection, setConnection] = useState();
  const [messages, setMessages] = useState([]);

  const joinChat = async (user, room) => {
    try {
      const connection = new HubConnectionBuilder()
        .withUrl(`${process.env.REACT_APP_API_URL}/chat`)
        .configureLogging(LogLevel.Information)
        .build();

      connection.on("ReceiveMessage", (user, message) => {
        setMessages(messages => [...messages, { user, message }])
      });

      await connection.start();
      await connection.invoke("JoinRoom", { user, room });
      setConnection(connection);
    }
    catch (e) {
      console.log(e);
    }
  }


  return (
    <div>
      {user === null
        ? <UserModal isOpen={user === null ? true : false} />
        : <ChatRoomsTable joinChat={joinChat} />
      }
      <div className='d-flex justify-content-center'>
        <Button onClick={() => setIsOpen(true)}>Create Room</Button>
        <CreateChatRoom isOpen={isOpen} closeModal={() => closeModal()} joinChat={joinChat}/>
      </div>
    </div>

  )
}
