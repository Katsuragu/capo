import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './login';
import Signup from './signup';
import Dashboard from './dashboard';
import PropertyListing from './PropertyListing';
import Downloads from './downloads'; // Import the Downloads component
import AdminDashboard from './admin/admindashboard'; // Import the AdminDashboard component

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} /> {/* Set Login as the landing page */}
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/property-listing" element={<PropertyListing />} />
                <Route path="/downloads" element={<Downloads />} /> {/* Add the Downloads route */}
                <Route path="/admin-dashboard" element={<AdminDashboard />} /> {/* Add the AdminDashboard route */}
            </Routes>
        </Router>
    );
}

export default App;