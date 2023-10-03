import React from 'react'
import { Outlet } from 'react-router-dom'
import AppFooter from './AppFooter'
import AppHeader from './AppHeader'

export default function Layout() {
    return (
        <div className='w-100 h-100'>
            <AppHeader />
            <Outlet />
            <AppFooter />
        </div>
    )
}
