import React, { useState } from 'react';
import './navbar.css'; // Import the CSS file

const Navbar = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    return (
        <nav className='navbar'>
            <div className='navbar-brand'>Walk-IN</div>
            <ul className='navbar-nav'>
                <li className='nav-item'><a href='/dashboard'>Dashboard</a></li>
                <li className='nav-item'><a href='/property-listing'>Property</a></li>
                <li className='nav-item'><a href='/downloads' className='active'>Downloads</a></li>
            </ul>
            <div className='user-icon' onClick={toggleDropdown}>
                <span className='text-black'>👤</span>
                {dropdownOpen && (
                    <div className='dropdown-menu'>
                        <a href='/profile' className='dropdown-item'>Profile</a>
                        <a href='/' className='dropdown-item'>Logout</a>
                    </div>
                )}
            </div>
        </nav>
    );
}

export default Navbar;