import React from 'react'
import Nav from 'react-bootstrap/Nav';

export default function AppHeader() {
  return (
    <>
      <Nav className="justify-content-center" activeKey="/home">
        <Nav.Item>
          <Nav.Link href="/"><img style={{width: "150px", height: "150px"}} src="/images/bee.png"/></Nav.Link>
        </Nav.Item>
      </Nav>
    </>
  )
}
