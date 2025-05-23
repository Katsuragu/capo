import React, { useState, useEffect } from 'react';
import AdminNavbar from './AdminNavbar';
import './cssadmin/Usermanagement.css';

// Firebase imports
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue, set, remove } from 'firebase/database';
import firebaseConfig from '../firebaseConfig';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    // Fetch users from Firebase in real time
    useEffect(() => {
        const usersRef = ref(db, 'users');
        const unsubscribe = onValue(usersRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                // Map users to a flat array for the table
                const userList = Object.entries(data).map(([uid, value]) => {
                    let name = value.profile?.FullName || '';
                    let email = value.email || value.profile?.Email || '';
                    let role = value.isAdmin ? 'Admin' : 'User';
                    return {
                        id: uid,
                        name,
                        email,
                        role,
                        ...value
                    };
                });
                setUsers(userList);
            } else {
                setUsers([]);
            }
        });
        return () => unsubscribe();
    }, []);

    const handleEditUser = (user) => {
        setSelectedUser(user);
        setIsModalOpen(true);
    };

    // Delete user from Firebase
    const handleDeleteUser = async (userId) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            await remove(ref(db, `users/${userId}`));
            alert('User deleted successfully!');
        }
    };

    const handleModalClose = () => {
        setSelectedUser(null);
        setIsModalOpen(false);
    };

    // Save changes to Firebase
    const handleSaveChanges = async () => {
        if (!selectedUser) return;
        const updates = {
            ...(selectedUser.profile ? { profile: { ...selectedUser.profile, FullName: selectedUser.name, Email: selectedUser.email } } : {}),
            email: selectedUser.email,
            isAdmin: selectedUser.role === 'Admin'
        };
        await set(ref(db, `users/${selectedUser.id}`), updates);
        setIsModalOpen(false);
        alert('User details updated successfully!');
    };

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    const filteredUsers = users.filter(
        (user) =>
            (user.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
            (user.email || '').toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="user-management-container">
            <AdminNavbar />
            <header className="user-management-header">
                <h1>User Management</h1>
                <p>Manage users and their roles.</p>
            </header>
            <main className="user-management-main">
                <div className="search-bar">
                    <input
                        type="text"
                        placeholder="Search users..."
                        value={searchQuery}
                        onChange={handleSearch}
                    />
                </div>
                <table className="user-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.length === 0 ? (
                            <tr>
                                <td colSpan="4" style={{ textAlign: 'center' }}>No users found.</td>
                            </tr>
                        ) : (
                            filteredUsers.map((user) => (
                                <tr key={user.id}>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.role}</td>
                                    <td>
                                        <button
                                            className="edit-button"
                                            onClick={() => handleEditUser(user)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="delete-button"
                                            onClick={() => handleDeleteUser(user.id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </main>

            {/* Modal */}
            {isModalOpen && selectedUser && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <button className="close-button" onClick={handleModalClose}>
                            &times;
                        </button>
                        <h2>Edit User</h2>
                        <label>
                            Name:
                            <input
                                type="text"
                                value={selectedUser.name}
                                onChange={(e) =>
                                    setSelectedUser({ ...selectedUser, name: e.target.value })
                                }
                            />
                        </label>
                        <label>
                            Email:
                            <input
                                type="email"
                                value={selectedUser.email}
                                onChange={(e) =>
                                    setSelectedUser({ ...selectedUser, email: e.target.value })
                                }
                            />
                        </label>
                        <label>
                            Role:
                            <select
                                value={selectedUser.role}
                                onChange={(e) =>
                                    setSelectedUser({ ...selectedUser, role: e.target.value })
                                }
                            >
                                <option value="Admin">Admin</option>
                                <option value="User">User</option>
                            </select>
                        </label>
                        <button className="save-button" onClick={handleSaveChanges}>
                            Save Changes
                        </button>
                        <button className="cancel-button" onClick={handleModalClose}>
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserManagement;