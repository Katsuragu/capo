import React, { useState, useEffect } from 'react';
import Navbar from './navbar';
import './usermessaging.css';

// Firebase imports
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue, push, set, off } from 'firebase/database';
import firebaseConfig from './firebaseConfig';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const UserMessaging = () => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [selectedInboxId, setSelectedInboxId] = useState(null);
    const [isMessagingVisible, setIsMessagingVisible] = useState(false);

    // Get current user's UID and email from session (localStorage)
    const userEmail = localStorage.getItem('userEmail');
    const userUid = userEmail ? userEmail.replace(/[@.]/g, '') : null; // You should store UID in session for production

    // Fetch inboxes for this user (for demo, just use their UID as inbox)
    const inboxes = [{ id: userUid, subject: 'Admin Messages', sender: 'Admin', timestamp: '' }];

    // Real-time fetch messages for the selected inbox
    useEffect(() => {
        if (!selectedInboxId) {
            setMessages([]);
            return;
        }
        const messagesRef = ref(db, `messages/${selectedInboxId}`);
        const handleValue = (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const msgArray = Object.entries(data)
                    .map(([id, value]) => ({ id, ...value }))
                    .sort((a, b) => a.timestamp - b.timestamp);
                setMessages(msgArray);
            } else {
                setMessages([]);
            }
        };
        onValue(messagesRef, handleValue);
        return () => off(messagesRef);
    }, [selectedInboxId]);

    const handleSendMessage = async () => {
        if (newMessage.trim() !== '' && selectedInboxId) {
            const messagesRef = ref(db, `messages/${selectedInboxId}`);
            const newMsgRef = push(messagesRef);
            await set(newMsgRef, {
                from: 'user',
                text: newMessage,
                timestamp: Date.now()
            });
            setNewMessage('');
        }
    };

    const handleSelectInboxMessage = (inboxId) => {
        setSelectedInboxId(inboxId);
        setIsMessagingVisible(true);
    };

    return (
        <div className="messaging-container">
            <Navbar />
            <header className="messaging-header">
                <h1>User Messaging</h1>
                <p>View your messages and communicate with the admin.</p>
            </header>
            <main className="messaging-main">
                {/* Inbox Section */}
                <div className="inbox-section">
                    <div className="inbox-list">
                        <h2>Inbox</h2>
                        <ul>
                            {inboxes.map((inbox) => (
                                <li key={inbox.id} onClick={() => handleSelectInboxMessage(inbox.id)}>
                                    <div className="message-sender">{inbox.sender}</div>
                                    <div className="message-subject">{inbox.subject}</div>
                                    <div className="message-timestamp">{inbox.timestamp}</div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Messaging Section */}
                {isMessagingVisible && (
                    <div className="messaging-section">
                        <div className="messages-list">
                            {messages.map((message) => (
                                <div
                                    key={message.id}
                                    className={`message ${message.from === 'admin' ? 'admin-message' : 'user-message'}`}
                                >
                                    <strong>{message.from}:</strong>
                                    <p>{message.text}</p>
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
                    </div>
                )}
            </main>
        </div>
    );
};

export default UserMessaging;