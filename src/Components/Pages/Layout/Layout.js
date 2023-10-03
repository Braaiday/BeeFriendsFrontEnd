import React from 'react'
import { Container } from 'react-bootstrap'
import { Outlet } from 'react-router-dom'
import AppFooter from './AppFooter'
import AppHeader from './AppHeader'


export default function Layout() {
    return (
        <Container fluid>
            <AppHeader />
            <Outlet />
            <AppFooter />
        </Container>
    )
}
