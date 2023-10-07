import React, { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import AppFooter from './AppFooter'
import AppHeader from './AppHeader'
import { setUser } from '../../../reducers/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import UserModal from '../../Elements/UserModal/UserModal';

export default function Layout() {
    const dispatch = useDispatch();
    const location = useLocation();
    const user = useSelector(state => state.user.name)
    const name = localStorage.getItem('name');

    useEffect(() => {
        if (name) {
            dispatch(setUser(name));
        }
    }, []);

    if (user) return (
        <div className='w-100 h-100'>
            <AppHeader />
            <Outlet />
            <AppFooter />
        </div>
    )

    if (!user) return (
        <UserModal isOpen={true} />
    )

    return (<></>)
}
