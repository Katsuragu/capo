import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './login';
import Signup from './signup';
import Dashboard from './dashboard';
import PropertyListing from './PropertyListing';
import Downloads from './downloads';
import Profile from './profile';
import AdminDashboard from './admin/admindashboard'; // Import the Admin Dashboard component

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/property-listing" element={<PropertyListing />} />
                <Route path="/downloads" element={<Downloads />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/admin-dashboard" element={<AdminDashboard />} /> {/* Add Admin Dashboard Route */}
            </Routes>
        </Router>
    );
};

export default App;