import React from 'react'
import image from '../../../Style/Images/bee.png';
import ThemeChanger from '../../../Style/ThemeContext/ThemeChanger';
import { NavLink } from 'react-router-dom';

export default function AppHeader() {
  return (
    <div className="row">
      <div className="col-6">
        <NavLink to="/" className="justify-content-left" ><img style={{ width: "150px", height: "150px" }} src={image} /></NavLink>
      </div>
      <div className="col-6" >
        <ThemeChanger />
      </div>
    </div>
  )
}
