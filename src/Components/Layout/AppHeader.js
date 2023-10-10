import React from 'react'
import image from '../../Style/Images/bee.png';
import ThemeChanger from '../../Style/ThemeContext/ThemeChanger';
import { NavLink } from 'react-router-dom';
import { Col, Navbar, NavbarBrand, Row } from 'react-bootstrap';

export default function AppHeader() {
  return (

    <Navbar>
      <NavbarBrand>
        <NavLink to="/" className="justify-content-left" ><img style={{ width: "150px", height: "150px" }} src={image} /></NavLink>
      </NavbarBrand>
      <ThemeChanger />
    </Navbar>
  )
}
