import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './login';
import Signup from './signup';
import Dashboard from './dashboard';
import PropertyListing from './PropertyListing';
import Downloads from './downloads';
import Profile from './profile';
import AdminDashboard from './admin/admindashboard';
import Messaging from './admin/Messaging';
import AddProperties from './admin/addproperties';
import Processing from './admin/processing'; // Import the Processing component

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
                <Route path="/admin-dashboard" element={<AdminDashboard />} />
                <Route path="/messaging" element={<Messaging />} />
                <Route path="/add-properties" element={<AddProperties />} />
                <Route path="/processing" element={<Processing />} /> {/* Add Processing Route */}
            </Routes>
        </Router>
    );
};

export default App;