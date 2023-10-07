import React from 'react'
import { useSelector } from 'react-redux';
import ChatRoomsTable from '../../Elements/ChatRoomsTable/ChatRoomsTable'
import UserModal from '../../Elements/UserModal/UserModal';

export default function PageHome() {
  return (
    <div>
      <ChatRoomsTable />
    </div>
  )
}
