import React from 'react'
import { Card } from 'react-bootstrap'
import { useSelector } from 'react-redux';

export default function UserList() {
  const users = useSelector(state => state.room.users);
  return (
    <Card>
      <Card.Header>
        Users chatting
      </Card.Header>
      <Card.Body>
        <ul>
          {users.map(user => <li key={user}>{user}</li>)}
        </ul>
      </Card.Body>
    </Card>
  )
}
