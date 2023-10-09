import React from 'react'
import ChatRoomsTable from '../../Elements/ChatRoomsTable/ChatRoomsTable'
import BrowsingUsers from '../../Elements/BrowsingUsers/BrowsingUsers'

export default function PageHome() {
  return (
    <div>
      <ChatRoomsTable />
      <BrowsingUsers />
    </div>
  )
}
