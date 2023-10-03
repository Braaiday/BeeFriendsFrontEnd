import React from 'react'
import { Container } from 'react-bootstrap'
import { Outlet } from 'react-router-dom'
import AppFooter from './AppFooter'
import AppHeader from './AppHeader'


export default function Layout() {
    return (
        <Container>
            <div className="w-100 h-25">
                <AppHeader />
            </div>
            <div className="w-100 h-50">
                <Outlet />
            </div>
            <div className="w-100 h-25">
                <AppFooter />
            </div>
        </Container>
    )
}
