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
import AdminNavbar from './AdminNavbar';
import './cssadmin/admindashboard.css';

// Firebase imports
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue, off } from 'firebase/database';
import firebaseConfig from '../firebaseConfig';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Static model names and their display names
const MODEL_LIST = [
    { key: 'lancriscorner', name: 'Lancris Corner' },
    { key: 'lancrismiddle', name: 'Lancris Middle' },
    { key: 'treelanecornerleft', name: 'Treelane Corner Left' },
    { key: 'treelanecornerright', name: 'Treelane Corner Right' },
    { key: 'treelanemiddle', name: 'Treelane Middle' },
];

const AdminDashboard = () => {
    const [propertyData, setPropertyData] = useState([]);
    const [userCount, setUserCount] = useState(0);

    // Fetch property data from Firebase (from 'models' node)
    useEffect(() => {
        const modelsRef = ref(db, 'models');
        const handleValue = (snapshot) => {
            const data = snapshot.val() || {};
            // Map static model list to data from database
            const propertyList = MODEL_LIST.map((model) => ({
                id: model.key,
                name: model.name,
                views: data[model.key]?.views || 0,
                heartCount: data[model.key]?.heartCount || 0,
            }));
            setPropertyData(propertyList);
        };
        onValue(modelsRef, handleValue);
        return () => off(modelsRef, 'value', handleValue);
    }, []);

    // Fetch user count from Firebase
    useEffect(() => {
        const usersRef = ref(db, 'users');
        const handleValue = (snapshot) => {
            const data = snapshot.val();
            setUserCount(data ? Object.keys(data).length : 0);
        };
        onValue(usersRef, handleValue);
        return () => off(usersRef, 'value', handleValue);
    }, []);

    // Chart data for property views
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
            {
                label: 'Hearts',
                data: propertyData.map((property) => property.heartCount),
                backgroundColor: 'rgba(255, 99, 132, 0.4)',
                borderColor: 'rgba(255, 99, 132, 1)',
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
                text: 'Property Views & Hearts Analytics',
            },
        },
    };

    return (
        <div className="admin-dashboard-container">
            <AdminNavbar />
            <header className="admin-dashboard-header">
                <h1>Admin Dashboard</h1>
                <p>Welcome to the admin panel. View analytics and manage properties.</p>
            </header>
            <main className="admin-dashboard-main">
                {/* Card View for User Count */}
                <div className="dashboard-cards" style={{ display: 'flex', justifyContent: 'center' }}>
                    <div className="dashboard-card">
                        <div className="dashboard-card-title">Total Users</div>
                        <div className="dashboard-card-value">{userCount}</div>
                    </div>
                </div>
                <section className="admin-dashboard-section">
                    <div className="chart-and-analytics">
                        <div className="chart-container">
                            <Bar data={chartData} options={chartOptions} />
                        </div>
                        <div className="analytics-table-container">
                            <h2>Property Analytics</h2>
                            <table className="analytics-table">
                                <thead>
                                    <tr>
                                        <th>Model Name</th>
                                        <th>Views</th>
                                        <th>Hearts</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {propertyData.length === 0 ? (
                                        <tr>
                                            <td colSpan="3" style={{ textAlign: 'center' }}>No data</td>
                                        </tr>
                                    ) : (
                                        propertyData.map((property) => (
                                            <tr key={property.id}>
                                                <td>{property.name}</td>
                                                <td>{property.views}</td>
                                                <td>{property.heartCount}</td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default AdminDashboard;