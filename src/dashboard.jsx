import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './navbar';
import { FaSearch } from 'react-icons/fa';
import BrowseHomes from './BrowseHomes';
import './dashboard.css';

const Dashboard = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const userEmail = localStorage.getItem('userEmail');
        if (!userEmail) {
            navigate('/login');
        }
    }, [navigate]);

    const handleSearch = () => {
        console.log('Search button clicked');
    };

    return (
        <div className='dashboard-container'>
            <Navbar />
            <header className='dashboard-header'>
                <h1>Welcome to WALK-IN</h1>
                <p>Find your dream home today</p>
                <div className='dashboard-search'>
                    {/* Search bar here */}
                </div>
            </header>
            <main className='dashboard-main'>
                <section className='dashboard-section'>
                    <BrowseHomes />
                </section>
                <section className='dashboard-section2'>
                    <h2>About</h2>
                    <p>© 2025, Epic Games, Inc. All rights reserved. ...</p>
                </section>
            </main>
        </div>
    );
}

export default Dashboard;