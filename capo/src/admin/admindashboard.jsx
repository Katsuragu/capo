import React from 'react';
import './App.css'; // Assuming styles are stored in App.css

const Dashboard = () => {
  return (
    <div className="dashboard">
      <nav className="navbar">
        <h2>DASHBOARD</h2>
        <div className="nav-links">
          <button>Add Model</button>
          <button>Add Model</button>
          <button>Add Model</button>
          <button>Analytics</button>
        </div>
      </nav>

      <header className="header">
        <h1>WALK-IN</h1>
        <div className="filters">
          <button>Location</button>
          <button>Type of Selection</button>
        </div>
      </header>
    </div>
  );
};

export default Dashboard;
