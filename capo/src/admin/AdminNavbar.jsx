import React, { useState } from 'react';
import './cssadmin/AdminNavbar.css';

const AdminNavbar = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    return (
        <nav className="admin-navbar">
            <div className="admin-navbar-brand">Admin Panel</div>
            <ul className="admin-navbar-nav">
                <li className="nav-item"><a href="/admin-dashboard">Dashboard</a></li>
                <li className="nav-item"><a href="/messaging">Messaging</a></li>
                <li className="nav-item"><a href="/add-properties">Add Properties</a></li>
                <li className="nav-item"><a href="/processing">Processing</a></li> {/* New Processing Tab */}
            </ul>
            <div className="admin-user-icon" onClick={toggleDropdown}>
                <span className="text-black">👤</span>
                {dropdownOpen && (
                    <div className="dropdown-menu">
                        <a href="/profile" className="dropdown-item">Profile</a>
                        <a href="/" className="dropdown-item">Logout</a>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default AdminNavbar;