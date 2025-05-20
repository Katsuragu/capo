import React, { useState, useEffect } from 'react';
import Navbar from './navbar';
import './profile.css';

// Firebase imports
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, get, set } from 'firebase/database';
import firebaseConfig from './firebaseConfig';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const Profile = () => {
    const [userInfo, setUserInfo] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        profilePicture: ''
    });
    const [isEditing, setIsEditing] = useState(false);

    // Get user UID from localStorage (set at login)
    const userUid = localStorage.getItem('userUid');

    // Fetch user data from Firebase (directly from users/{userUid})
    useEffect(() => {
        const fetchUserData = async () => {
            if (!userUid) return;
            const userRef = ref(db, `users/${userUid}`);
            const snapshot = await get(userRef);
            if (snapshot.exists()) {
                const data = snapshot.val();
                setUserInfo((prev) => ({
                    ...prev,
                    name: data.FullName || data.name || '',
                    email: data.email || '',
                    phone: data.ContactNumber || data.phone || '',
                    address: data.address || '',
                    profilePicture: data.profilePicture || ''
                }));
            }
        };
        fetchUserData();
    }, [userUid]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserInfo({ ...userInfo, [name]: value });
    };

    const handleProfilePictureChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setUserInfo({ ...userInfo, profilePicture: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };

    // Save updated user info to Firebase (directly to users/{userUid})
    const handleSave = async () => {
        if (!userUid) return;
        const userRef = ref(db, `users/${userUid}`);
        await set(userRef, {
            ...userInfo,
            FullName: userInfo.name, // Save as FullName for compatibility
            ContactNumber: userInfo.phone
        });
        setIsEditing(false);
    };

    return (
        <div>
            <Navbar />
            <div className="profile-container">
                <h1>My Profile</h1>
                <div className="profile-picture-section">
                    <img
                        src={userInfo.profilePicture || 'https://via.placeholder.com/150'}
                        alt="Profile"
                        className="profile-picture"
                    />
                    {isEditing && (
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleProfilePictureChange}
                        />
                    )}
                </div>
                <div className="profile-info">
                    <label>
                        Name:
                        {isEditing ? (
                            <input
                                type="text"
                                name="name"
                                value={userInfo.name}
                                onChange={handleInputChange}
                            />
                        ) : (
                            <span>{userInfo.name}</span>
                        )}
                    </label>
                    <label>
                        Email:
                        {isEditing ? (
                            <input
                                type="email"
                                name="email"
                                value={userInfo.email}
                                onChange={handleInputChange}
                            />
                        ) : (
                            <span>{userInfo.email}</span>
                        )}
                    </label>
                    <label>
                        Phone:
                        {isEditing ? (
                            <input
                                type="text"
                                name="phone"
                                value={userInfo.phone}
                                onChange={handleInputChange}
                            />
                        ) : (
                            <span>{userInfo.phone}</span>
                        )}
                    </label>
                    
                </div>
                <div className="profile-actions">
                    {isEditing ? (
                        <>
                            <button className="save-button" onClick={handleSave}>
                                Save
                            </button>
                            <button className="cancel-button" onClick={() => setIsEditing(false)}>
                                Cancel
                            </button>
                        </>
                    ) : (
                        <button className="edit-button" onClick={() => setIsEditing(true)}>
                            Edit Profile
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Profile;