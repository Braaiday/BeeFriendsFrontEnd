import React from 'react'
import image from '../../../Style/Images/bee.png';
import { NavLink } from 'react-router-dom';
import { Container } from 'react-bootstrap';

export const PageNotFound = () => {
    return (
        <Container>
            <div className='d-flex align-items-center justify-content-center'>
                <NavLink to="/" className="justify-content-left" ><img style={{ width: "150px", height: "150px" }} src={image} /></NavLink>
            </div>
            <div className='d-flex align-items-center justify-content-center'>
                <p>Sorry no friends are here, please click the bee to find some friends.</p>
            </div>
        </Container>
    )
}
