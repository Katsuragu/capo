import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import AdminNavbar from './AdminNavbar'; // Import the Admin Navbar
import './cssadmin/admindashboard.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const AdminDashboard = () => {
    const [propertyData, setPropertyData] = useState([]);
    const [analyticsData, setAnalyticsData] = useState([]);
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null); // State for the selected user
    const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility

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

        const fetchAnalyticsData = async () => {
            const mockAnalytics = [
                { id: 1, user: 'John Doe', property: 'Home', timeSpent: '2 hours' },
                { id: 2, user: 'Jane Smith', property: 'Hotel', timeSpent: '1.5 hours' },
                { id: 3, user: 'Alice Johnson', property: 'Apartment', timeSpent: '3 hours' },
                { id: 4, user: 'John Doe', property: 'Villa', timeSpent: '4 hours' },
            ];
            setAnalyticsData(mockAnalytics);
        };

        fetchPropertyData();
        fetchAnalyticsData();
    }, []);

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

    const handleEditUser = (user) => {
        setSelectedUser(user);
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setSelectedUser(null);
        setIsModalOpen(false);
    };

    const handleSaveChanges = () => {
        const updatedUsers = users.map((user) =>
            user.id === selectedUser.id ? selectedUser : user
        );
        setUsers(updatedUsers);
        setIsModalOpen(false);
        alert('User details updated successfully!');
    };

    const chartData = {
        labels: propertyData.map((property) => property.name),
        datasets: [
            {
                label: 'Property Views',
                data: propertyData.map((property) => property.views),
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

    return (
        <div className="admin-dashboard-container">
            <AdminNavbar /> {/* Use the Admin Navbar */}
            <header className="admin-dashboard-header">
                <h1>Admin Dashboard</h1>
                <p>Welcome to the admin panel. View analytics and manage properties.</p>
            </header>
            <main className="admin-dashboard-main">
                <section className="admin-dashboard-section">
                    <div className="chart-and-analytics">
                        <div className="chart-container">
                            <Bar data={chartData} options={chartOptions} />
                        </div>
                        <div className="analytics-table-container">
                            <h2>Time Spent Analytics</h2>
                            <table className="analytics-table">
                                <thead>
                                    <tr>
                                        <th>User</th>
                                        <th>Property</th>
                                        <th>Time Spent</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {analyticsData.map((data) => (
                                        <tr key={data.id}>
                                            <td>{data.user}</td>
                                            <td>{data.property}</td>
                                            <td>{data.timeSpent}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
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
                                            onClick={() => handleEditUser(user)}
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
            {isModalOpen && (
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

export default AdminDashboard;