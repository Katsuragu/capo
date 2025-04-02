import React, { useState, useEffect } from 'react';
import './profile.css'; // Import the CSS file for styling

const Profile = () => {
    const [userInfo, setUserInfo] = useState({
        name: '',
        email: '',
        phone: '',
        address: ''
    });
    const [isEditing, setIsEditing] = useState(false);

    // Simulate fetching user data from an API
    useEffect(() => {
        // Replace this with an actual API call
        const fetchUserData = async () => {
            const mockData = {
                name: 'John Doe',
                email: 'johndoe@gmail.com',
                phone: '123-456-7890',
                address: '123 Main St, City, Country'
            };
            setUserInfo(mockData);
        };

        fetchUserData();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserInfo({ ...userInfo, [name]: value });
    };

    const handleSave = () => {
        // Simulate saving data to an API
        console.log('Saved user info:', userInfo);
        setIsEditing(false);
    };

    return (
        <div className="profile-container">
            <h1>My Profile</h1>
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
                <label>
                    Address:
                    {isEditing ? (
                        <input
                            type="text"
                            name="address"
                            value={userInfo.address}
                            onChange={handleInputChange}
                        />
                    ) : (
                        <span>{userInfo.address}</span>
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
    );
};

export default Profile;