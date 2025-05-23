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
import Processing from './processing';
import Inbox from './admin/inbox';
import UserManagement from './admin/Usermanagement';
import UserMessaging from './usermessaging';
import Reservation from './admin/Reservation';
import InquiryForm from './inquiry';
import AdminInquiries from './admin/adminInquiries'; // <-- Import admin inquiries

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
                <Route path="/inbox" element={<Inbox />} />
                <Route path="/processing" element={<Processing />} />
                <Route path="/user-management" element={<UserManagement />} />
                <Route path="/user-messaging" element={<UserMessaging />} />
                <Route path="/reservation" element={<Reservation />} />
                <Route path="/inquiry" element={<InquiryForm />} />
                <Route path="/admin-inquiries" element={<AdminInquiries />} /> {/* <-- Admin Inquiries route */}
            </Routes>
        </Router>
    );
};

export default App;