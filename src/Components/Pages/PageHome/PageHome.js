import React from 'react'
import { useSelector } from 'react-redux';
import ChatRoomsTable from '../../Elements/ChatRoomsTable/ChatRoomsTable'
import UserModal from '../../Elements/UserModal/UserModal';

export default function PageHome() {
  // User
  const user = useSelector(state => state.user.name)

  return (
    <div>
      {user === null
        ? <UserModal isOpen={!user} />
        : <ChatRoomsTable />
      }
    </div>
  )
}
