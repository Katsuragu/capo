import React, { useState } from 'react';
import AdminNavbar from './AdminNavbar'; // Use the Admin Navbar
import './cssadmin/Messaging.css';

const Messaging = () => {
    const [messages, setMessages] = useState([
        { id: 1, sender: 'John Doe', content: 'Hello, I need help with my account.', isAdmin: false },
        { id: 2, sender: 'Jane Smith', content: 'Can you provide more details about the property?', isAdmin: false },
        { id: 3, sender: 'Admin', content: 'Sure, I’d be happy to assist you!', isAdmin: true },
    ]);
    const [newMessage, setNewMessage] = useState('');

    const handleSendMessage = () => {
        if (newMessage.trim() !== '') {
            setMessages([...messages, { id: messages.length + 1, sender: 'Admin', content: newMessage, isAdmin: true }]);
            setNewMessage('');
        }
    };

    return (
        <div className="messaging-container">
            <AdminNavbar /> {/* Use the Admin Navbar */}
            <header className="messaging-header">
                <h1>Messaging</h1>
                <p>Communicate with users and respond to their inquiries.</p>
            </header>
            <main className="messaging-main">
                <div className="messages-list">
                    {messages.map((message) => (
                        <div
                            key={message.id}
                            className={`message ${message.isAdmin ? 'admin-message' : 'user-message'}`}
                        >
                            <strong>{message.sender}:</strong>
                            <p>{message.content}</p>
                        </div>
                    ))}
                </div>
                <div className="message-input">
                    <textarea
                        placeholder="Type your message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                    ></textarea>
                    <button onClick={handleSendMessage}>Send</button>
                </div>
            </main>
        </div>
    );
};

export default Messaging;