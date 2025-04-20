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
import Processing from './processing'; // Import the Processing component
import Inbox from './admin/inbox'; // Import the Inbox component

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
                <Route path="/inbox" element={<Inbox />} /> {/* Inbox Route */}
                <Route path="/processing" element={<Processing />} /> {/* Processing Route */}
            </Routes>
        </Router>
    );
};

export default App;