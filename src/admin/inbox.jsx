import React, { useState } from 'react';
import AdminNavbar from './AdminNavbar'; // Import the Admin Navbar
import './cssadmin/inbox.css';

const Inbox = () => {
    const [messages, setMessages] = useState([
        { id: 1, sender: 'John Doe', subject: 'Inquiry about property', content: 'Hi, I would like to know more about the property.', timestamp: '2025-04-20 10:00 AM' },
        { id: 2, sender: 'Jane Smith', subject: 'Schedule a site visit', content: 'Can we schedule a site visit for next week?', timestamp: '2025-04-19 3:45 PM' },
        { id: 3, sender: 'Alice Johnson', subject: 'Payment details', content: 'Could you provide the payment details?', timestamp: '2025-04-18 1:30 PM' },
    ]);

    const [searchQuery, setSearchQuery] = useState('');
    const [selectedMessage, setSelectedMessage] = useState(null);

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    const filteredMessages = messages.filter(
        (message) =>
            message.sender.toLowerCase().includes(searchQuery.toLowerCase()) ||
            message.subject.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleSelectMessage = (message) => {
        setSelectedMessage(message);
    };

    const handleCloseMessage = () => {
        setSelectedMessage(null);
    };

    return (
        <div className="admin-dashboard-container">
            <AdminNavbar /> {/* Add the Admin Navbar */}
            <header className="admin-dashboard-header">
                <h1>Inbox</h1>
                <p>View and manage your messages.</p>
            </header>
            <main className="admin-dashboard-main">
                <div className="inbox-container">
                    <div className="inbox-list">
                        <h2>Messages</h2>
                        <input
                            type="text"
                            className="search-bar"
                            placeholder="Search messages..."
                            value={searchQuery}
                            onChange={handleSearch}
                        />
                        <ul>
                            {filteredMessages.map((message) => (
                                <li key={message.id} onClick={() => handleSelectMessage(message)}>
                                    <div className="message-sender">{message.sender}</div>
                                    <div className="message-subject">{message.subject}</div>
                                    <div className="message-timestamp">{message.timestamp}</div>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="inbox-details">
    {selectedMessage ? (
        <div className="message-details" style={{ position: 'relative' }}>
            <button className="close-button" onClick={handleCloseMessage}>
                &times;
            </button>
            <h3>{selectedMessage.subject}</h3>
            <p><strong>From:</strong> {selectedMessage.sender}</p>
            <p><strong>Message:</strong></p>
            <p>{selectedMessage.content}</p>
        </div>
    ) : (
        <p>Select a message to view its details.</p>
    )}
</div>
                </div>
            </main>
        </div>
    );
};

export default Inbox;