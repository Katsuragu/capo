import React from 'react';
import Navbar from './navbar'; // Import the Navbar component
import { FaSearch } from 'react-icons/fa'; // Import the search icon
import BrowseHomes from './BrowseHomes'; // Import the BrowseHomes component
import './dashboard.css'; // Import the CSS file

const Dashboard = () => {
    const handleSearch = () => {
        console.log('Search button clicked');
    };

    return (
        <div className='dashboard-container'>
            <Navbar /> {}
            <header className='dashboard-header'>
                <h1>Welcome to WALK-IN</h1>
                <p>Find your dream home today</p>
                <div className='dashboard-search'>
                  
                
                </div>
            </header>
            <main className='dashboard-main'>
                <section className='dashboard-section'>
                    <BrowseHomes /> {}
                </section>
                <section className='dashboard-section2'>
                    <h2>About</h2>
                    <p>© 2025, Epic Games, Inc. All rights reserved. Epic, Epic Games, the Epic Games logo, Fortnite, the Fortnite logo, Unreal, Unreal Engine, the Unreal Engine logo, Unreal Tournament, and the Unreal Tournament logo are trademarks or registered trademarks of Epic Games, Inc. in the United States of America and elsewhere. Other brands or product names are the trademarks of their respective owners.

Our websites may contain links to other sites and resources provided by third parties. These links are provided for your convenience only. Epic Games has no control over the contents of those sites or resources, and accepts no responsibility for them or for any loss or damage that may arise from your use of them.
w</p>
                </section>
            </main>
           
        </div>
    );
}

export default Dashboard;