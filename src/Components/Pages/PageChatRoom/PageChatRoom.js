import React, { useState } from 'react'
import { Button } from 'react-bootstrap';
import ChatBox from '../../Elements/ChatBox/ChatBox';
import UserList from '../../Elements/UserList/UserList';


export default function PageChatRoom() {

  return (
    <div>
      <Button className="justify-content-end">Leave Room</Button>
      <br />
      <br />
      <div className='d-flex'>
        <UserList className="flex" />
        <ChatBox className="flex"/>
      </div>
    </div>

  )
}
