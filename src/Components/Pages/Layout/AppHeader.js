import React from 'react'
import Nav from 'react-bootstrap/Nav';
import image from '../../../Style/Images/bee.png';
export default function AppHeader() {
  return (
    <>
      <Nav className="justify-content-center" activeKey="/home">
        <Nav.Item>
          <Nav.Link href="/"><img style={{width: "150px", height: "150px"}} src={image}/></Nav.Link>
        </Nav.Item>
      </Nav>
    </>
  )
}
