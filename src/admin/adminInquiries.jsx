import React, { useEffect, useState } from 'react';
import AdminNavbar from './AdminNavbar';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue, off, push, set } from 'firebase/database';
import firebaseConfig from '../firebaseConfig';
import './cssadmin/adminInquiries.css'; // <-- Add this line

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const AdminInquiries = () => {
    const [inquiries, setInquiries] = useState([]);
    const [users, setUsers] = useState({});
    const [messageModal, setMessageModal] = useState({ open: false, inquiry: null, message: '' });
    const [success, setSuccess] = useState(false);

    // Fetch inquiries
    useEffect(() => {
        const inquiriesRef = ref(db, 'inquiries');
        const handleValue = (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const inquiryList = Object.entries(data).map(([id, value]) => ({
                    id,
                    ...value,
                }));
                setInquiries(inquiryList);
            } else {
                setInquiries([]);
            }
        };
        onValue(inquiriesRef, handleValue);
        return () => off(inquiriesRef, 'value', handleValue);
    }, []);

    // Fetch users (for matching inquiries to user accounts if needed)
    useEffect(() => {
        const usersRef = ref(db, 'users');
        const handleValue = (snapshot) => {
            setUsers(snapshot.val() || {});
        };
        onValue(usersRef, handleValue);
        return () => off(usersRef);
    }, []);

    // Open message modal
    const handleOpenMessage = (inquiry) => {
        setMessageModal({ open: true, inquiry, message: '' });
    };

    // Send message to user (store in messages/{userUid})
    const handleSendMessage = async () => {
        const { inquiry, message } = messageModal;
        if (!inquiry || !message.trim()) return;

        // Try to find user by email
        let userUid = null;
        for (const [uid, user] of Object.entries(users)) {
            if (user.email === inquiry.email) {
                userUid = uid;
                break;
            }
        }

        if (userUid) {
            const userMessagesRef = ref(db, `messages/${userUid}`);
            const newMsgRef = push(userMessagesRef);
            await set(newMsgRef, {
                from: 'admin',
                text: message,
                timestamp: Date.now(),
            });
            setSuccess(true);
            setTimeout(() => setSuccess(false), 2000);
        } else {
            alert('No user account found for this email.');
        }
        setMessageModal({ open: false, inquiry: null, message: '' });
    };

    return (
        <div className="admin-dashboard-container">
            <AdminNavbar />
            <header className="admin-dashboard-header">
                <h1>Inquiries</h1>
                <p>View all inquiries and message users directly.</p>
            </header>
            <main className="admin-dashboard-main">
                <div className="analytics-table-container">
                    <h2>Inquiry List</h2>
                    <table className="analytics-table">
                        <thead>
                            <tr>
                                <th>Type</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Message</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {inquiries.length === 0 ? (
                                <tr>
                                    <td colSpan="6" style={{ textAlign: 'center' }}>No inquiries found.</td>
                                </tr>
                            ) : (
                                inquiries.map((inq) => (
                                    <tr key={inq.id}>
                                        <td>{inq.inquiryType || ''}</td>
                                        <td>{inq.fullName || ''}</td>
                                        <td>{inq.email || ''}</td>
                                        <td>{inq.phone || ''}</td>
                                        <td>{inq.message || ''}</td>
                                        <td>
                                            <button
                                                className="submit-btn"
                                                style={{ padding: '4px 12px', fontSize: '0.95rem' }}
                                                onClick={() => handleOpenMessage(inq)}
                                            >
                                                Message User
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
                {/* Modal for sending message */}
                {messageModal.open && (
                    <div className="modal-overlay">
                        <div className="modal-content" style={{ maxWidth: 400 }}>
                            <h3>Send Message to {messageModal.inquiry.fullName}</h3>
                            <textarea
                                rows={4}
                                style={{ width: '100%', margin: '12px 0', borderRadius: 6, padding: 8 }}
                                value={messageModal.message}
                                onChange={e => setMessageModal({ ...messageModal, message: e.target.value })}
                                placeholder="Type your message..."
                            />
                            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
                                <button className="submit-btn" onClick={handleSendMessage}>Send</button>
                                <button
                                    className="submit-btn"
                                    style={{ background: '#aaa' }}
                                    onClick={() => setMessageModal({ open: false, inquiry: null, message: '' })}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                )}
                {success && (
                    <div className="success-message" style={{ maxWidth: 400, margin: '20px auto' }}>
                        <span>✔️ Message sent!</span>
                    </div>
                )}
            </main>
        </div>
    );
};

export default AdminInquiries;