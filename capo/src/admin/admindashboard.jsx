import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2'; // Import Bar chart from react-chartjs-2
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import Navbar from '../navbar'; // Import the Navbar component
import './cssadmin/admindashboard.css'; // Import the CSS file

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const AdminDashboard = () => {
    const [propertyData, setPropertyData] = useState([]);
    const [users, setUsers] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    // Simulate fetching property data from an API
    useEffect(() => {
        const fetchPropertyData = async () => {
            const mockData = [
                { id: 1, name: 'Home', views: 120 },
                { id: 2, name: 'Hotel', views: 250 },
                { id: 3, name: 'Apartment', views: 180 },
                { id: 4, name: 'Villa', views: 300 },
            ];
            setPropertyData(mockData);
        };

        fetchPropertyData();
    }, []);

    // Simulate fetching user data from an API
    useEffect(() => {
        const fetchUserData = async () => {
            const mockUsers = [
                { id: 1, name: 'John Doe', email: 'john.doe@gmail.com', role: 'Admin' },
                { id: 2, name: 'Jane Smith', email: 'jane.smith@gmail.com', role: 'User' },
                { id: 3, name: 'Alice Johnson', email: 'alice.johnson@gmail.com', role: 'User' },
            ];
            setUsers(mockUsers);
        };

        fetchUserData();
    }, []);

    // Prepare data for the Bar chart
    const chartData = {
        labels: propertyData.map((property) => property.name), // Property names
        datasets: [
            {
                label: 'Property Views',
                data: propertyData.map((property) => property.views), // Property views
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Property Views Analytics',
            },
        },
    };

    const openModal = (user) => {
        setSelectedUser(user); // Set the selected user
        setIsModalOpen(true); // Open the modal
    };

    const closeModal = () => {
        setSelectedUser(null); // Clear the selected user
        setIsModalOpen(false); // Close the modal
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSelectedUser({ ...selectedUser, [name]: value });
    };

    const handleSave = () => {
        // Simulate saving the updated user data
        setUsers((prevUsers) =>
            prevUsers.map((user) =>
                user.id === selectedUser.id ? selectedUser : user
            )
        );
        closeModal();
    };

    return (
        <div className="admin-dashboard-container">
            <Navbar /> {/* Add the Navbar component */}
            <header className="admin-dashboard-header">
                <h1>Admin Dashboard</h1>
                <p>Welcome to the admin panel. View analytics and manage properties.</p>
            </header>
            <main className="admin-dashboard-main">
                <section className="admin-dashboard-section">
                    <div className="chart-container">
                        <Bar data={chartData} options={chartOptions} />
                    </div>
                </section>
                <section className="admin-dashboard-section">
                    <h2>User Management</h2>
                    <table className="user-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user.id}>
                                    <td>{user.id}</td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.role}</td>
                                    <td>
                                        <button
                                            className="edit-button"
                                            onClick={() => openModal(user)}
                                        >
                                            Edit
                                        </button>
                                        <button className="delete-button">Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>
            </main>

            {/* Modal */}
            {isModalOpen && selectedUser && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div
                        className="modal-content"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button className="close-button" onClick={closeModal}>
                            ✖
                        </button>
                        <h2>Edit User</h2>
                        <label>
                            Name:
                            <input
                                type="text"
                                name="name"
                                value={selectedUser.name}
                                onChange={handleInputChange}
                            />
                        </label>
                        <label>
                            Email:
                            <input
                                type="email"
                                name="email"
                                value={selectedUser.email}
                                onChange={handleInputChange}
                            />
                        </label>
                        <label>
                            Role:
                            <input
                                type="text"
                                name="role"
                                value={selectedUser.role}
                                onChange={handleInputChange}
                            />
                        </label>
                        <button className="save-button" onClick={handleSave}>
                            Save
                        </button>
                        <button className="cancel-button" onClick={closeModal}>
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;