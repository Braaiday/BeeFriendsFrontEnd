import React, { useState } from 'react'
import { Dropdown } from 'react-bootstrap';
import DropdownItem from 'react-bootstrap/esm/DropdownItem';
import DropdownMenu from 'react-bootstrap/esm/DropdownMenu';
import DropdownToggle from 'react-bootstrap/esm/DropdownToggle';
import useTheme from './useTheme'

const ThemeChanger = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const { setTheme } = useTheme();

    return (
        <div className='d-flex flex-row-reverse'>
            <Dropdown className='m-5' isOpen={dropdownOpen} toggle={() => setDropdownOpen(!dropdownOpen)}>
                <DropdownToggle caret>
                    Theme
                </DropdownToggle>
                <DropdownMenu>
                    <DropdownItem><div onClick={() => setTheme('dark')}>Dark</div></DropdownItem>
                    <DropdownItem><div onClick={() => setTheme('light')}>Light</div></DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </div>
    )
}

export default ThemeChanger;

