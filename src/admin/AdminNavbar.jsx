import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './cssadmin/AdminNavbar.css';

const AdminNavbar = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    return (
        <nav className="navbar">
            <div className="navbar-brand">Admin Panel</div>
            <ul className="navbar-nav">
                <li className="nav-item"><Link to="/admin-dashboard">Dashboard</Link></li>
                <li className="nav-item"><Link to="/user-management">User Management</Link></li>
                <li className="nav-item"><Link to="/messaging">Messaging</Link></li>
                <li className="nav-item"><Link to="/reservation">Reservation</Link></li>
            </ul>
            <div className="user-icon" onClick={toggleDropdown}>
                <span className="text-black">👤</span>
                {dropdownOpen && (
                    <div className="dropdown-menu">
                        <Link to="/" className="dropdown-item">Logout</Link>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default AdminNavbar;