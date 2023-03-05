import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import ChatRoomsTable from '../../Elements/CharRoomsTable/ChatRoomsTable'
import UserModal from '../../Elements/UserModal/UserModal';
import { Button } from 'react-bootstrap';
import CreateChatRoom from '../../Elements/CreateChatRoom/CreateChatRoom';

export default function PageHome() {

  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  function closeModal() {
    setIsOpen(false);
  }

  // User
  const user = useSelector(state => state.user.name)

  return (
    <div>
      {user === null
        ? <UserModal isOpen={user === null ? true : false} />
        : <ChatRoomsTable />
      }
      <div className='d-flex justify-content-center'>
        <Button onClick={() => setIsOpen(true)}>Create Room</Button>
        <CreateChatRoom isOpen={isOpen} closeModal={() => closeModal()} />
      </div>
    </div>

  )
}
