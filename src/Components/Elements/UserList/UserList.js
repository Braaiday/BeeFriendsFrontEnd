import React from 'react'
import { Card, Container } from 'react-bootstrap'
import { useSelector } from 'react-redux';

export default function UserList() {
  const users = useSelector(state => state.room.users);
  return (
    <Container className='chatbox'>
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
    </Container>

  )
}
