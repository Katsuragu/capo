import React, { useState, useEffect } from 'react';
import AdminNavbar from './AdminNavbar';
import './cssadmin/Messaging.css';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue, off, push, set } from 'firebase/database';
import firebaseConfig from '../firebaseConfig';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const Messaging = () => {
    const [messages, setMessages] = useState([]);
    const [inboxIds, setInboxIds] = useState([]);
    const [users, setUsers] = useState({});
    const [newMessage, setNewMessage] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedInboxId, setSelectedInboxId] = useState(null);
    const [isMessagingVisible, setIsMessagingVisible] = useState(false);
    const [inboxTimestamps, setInboxTimestamps] = useState({});

    // Fetch user info
    useEffect(() => {
        const usersRef = ref(db, 'users');
        const handleValue = (snapshot) => {
            const data = snapshot.val() || {};
            setUsers(data);
        };
        onValue(usersRef, handleValue);
        return () => off(usersRef);
    }, []);

    // Real-time load inbox IDs (user UIDs) from Firebase and track latest message timestamp
    useEffect(() => {
        const messagesRef = ref(db, 'messages');
        const handleValue = (snapshot) => {
            const data = snapshot.val();
            if (data) {
                setInboxIds(Object.keys(data));
                // Get latest timestamp for each inbox
                const timestamps = {};
                Object.entries(data).forEach(([uid, msgs]) => {
                    const msgArr = Object.values(msgs);
                    if (msgArr.length > 0) {
                        const latest = Math.max(...msgArr.map(m => m.timestamp || 0));
                        timestamps[uid] = latest;
                    } else {
                        timestamps[uid] = 0;
                    }
                });
                setInboxTimestamps(timestamps);
            } else {
                setInboxIds([]);
                setInboxTimestamps({});
            }
        };
        onValue(messagesRef, handleValue);
        return () => off(messagesRef, 'value', handleValue);
    }, []);

    // Real-time load messages for the selected inbox (user UID) from Firebase
    useEffect(() => {
        if (!selectedInboxId) {
            setMessages([]);
            return;
        }
        const userMessagesRef = ref(db, `messages/${selectedInboxId}`);
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
        onValue(userMessagesRef, handleValue);
        return () => off(userMessagesRef);
    }, [selectedInboxId]);

    const handleSendMessage = async () => {
        if (newMessage.trim() !== '' && selectedInboxId) {
            const userMessagesRef = ref(db, `messages/${selectedInboxId}`);
            const newMsgRef = push(userMessagesRef);
            await set(newMsgRef, {
                from: 'admin',
                text: newMessage,
                timestamp: Date.now()
            });
            setNewMessage('');
        }
    };

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    // Show email or name instead of UID, and sort by latest message timestamp
    const filteredInboxIds = inboxIds
        .filter((uid) => {
            const user = users[uid];
            const displayName = user?.profile?.FullName || user?.email || uid;
            return displayName.toLowerCase().includes(searchQuery.toLowerCase());
        })
        .sort((a, b) => (inboxTimestamps[b] || 0) - (inboxTimestamps[a] || 0)); // Sort by latest message

    const handleSelectInboxMessage = (inboxId) => {
        setSelectedInboxId(inboxId);
        setIsMessagingVisible(true);
    };

    return (
        <div className="messaging-container">
            <AdminNavbar />
            <header className="messaging-header">
                <h1>Messaging & Inbox</h1>
                <p>Communicate with users and manage your inbox.</p>
            </header>
            <main className="messaging-main">
                {/* Inbox Section */}
                <div className="inbox-section">
                    <div className="inbox-list">
                        <h2>Inbox</h2>
                        <input
                            type="text"
                            className="search-bar"
                            placeholder="Search user..."
                            value={searchQuery}
                            onChange={handleSearch}
                        />
                        <ul>
                            {filteredInboxIds.map((uid) => {
                                const user = users[uid];
                                const displayName = user?.profile?.FullName || user?.email || uid;
                                return (
                                    <li key={uid} onClick={() => handleSelectInboxMessage(uid)}>
                                        <div className="message-sender">{displayName}</div>
                                        <div className="message-subject">User Inbox</div>
                                    </li>
                                );
                            })}
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
                                    className={`message-row ${message.from === 'admin' ? 'admin-row' : 'user-row'}`}
                                >
                                    <div className={`message-sender-label ${message.from === 'admin' ? 'right' : 'left'}`}>
                                        {message.from === 'admin'
                                            ? 'Admin'
                                            : (users[selectedInboxId]?.profile?.FullName ||
                                                users[selectedInboxId]?.email ||
                                                'User')}
                                    </div>
                                    <div
                                        className={`message ${message.from === 'admin' ? 'admin-message' : 'user-message'}`}
                                    >
                                        <p>{message.text}</p>
                                        <span className="message-timestamp">
                                            {new Date(message.timestamp).toLocaleString()}
                                        </span>
                                    </div>
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

export default Messaging;