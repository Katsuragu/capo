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
                { id: 1, property: 'Home', timeSpent: '2 hours' },
                { id: 2, property: 'Hotel', timeSpent: '1.5 hours' },
                { id: 3, property: 'Apartment', timeSpent: '3 hours' },
                { id: 4, property: 'Villa', timeSpent: '4 hours' },
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
                                            <td>{data.property}</td>
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
                                        <button className="edit-button">Edit</button>
                                        <button className="delete-button">Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>
            </main>
        </div>
    );
};

export default AdminDashboard;