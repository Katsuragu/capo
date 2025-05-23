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

const AdminDashboard = () => {
    const [propertyData, setPropertyData] = useState([]);
    const [analyticsData, setAnalyticsData] = useState([]);
    const [userCount, setUserCount] = useState(0);

    useEffect(() => {
        // Fetch property data (mock)
        const fetchPropertyData = async () => {
            const mockData = [
                { id: 1, name: 'Home', views: 120 },
                { id: 2, name: 'Hotel', views: 250 },
                { id: 3, name: 'Apartment', views: 180 },
                { id: 4, name: 'Villa', views: 300 },
            ];
            setPropertyData(mockData);
        };

        // Fetch analytics data (mock)
        const fetchAnalyticsData = async () => {
            const mockAnalytics = [
                { id: 1, user: 'John Doe', property: 'Home', timeSpent: '2 hours' },
                { id: 2, user: 'Jane Smith', property: 'Hotel', timeSpent: '1.5 hours' },
                { id: 3, user: 'Alice Johnson', property: 'Apartment', timeSpent: '3 hours' },
                { id: 4, user: 'John Doe', property: 'Villa', timeSpent: '4 hours' },
            ];
            // Improved: Calculate total time spent per user per property (in hours)
            const analyticsMap = {};
            mockAnalytics.forEach((entry) => {
                const key = `${entry.user}-${entry.property}`;
                const hoursMatch = entry.timeSpent.match(/([\d.]+)\s*hour/);
                const minsMatch = entry.timeSpent.match(/([\d.]+)\s*min/);
                let hours = 0;
                if (hoursMatch) hours += parseFloat(hoursMatch[1]);
                if (minsMatch) hours += parseFloat(minsMatch[1]) / 60;
                if (!analyticsMap[key]) {
                    analyticsMap[key] = {
                        user: entry.user,
                        property: entry.property,
                        totalHours: 0,
                    };
                }
                analyticsMap[key].totalHours += hours;
            });
            const improvedAnalytics = Object.values(analyticsMap).map((item, idx) => ({
                id: idx + 1,
                user: item.user,
                property: item.property,
                totalHours: item.totalHours.toFixed(2),
            }));
            setAnalyticsData(improvedAnalytics);
        };

        fetchPropertyData();
        fetchAnalyticsData();
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
                            <h2>Time Spent Analytics</h2>
                            <table className="analytics-table">
                                <thead>
                                    <tr>
                                        <th>User</th>
                                        <th>Property</th>
                                        <th>Total Time Spent (hours)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {analyticsData.length === 0 ? (
                                        <tr>
                                            <td colSpan="3" style={{ textAlign: 'center' }}>No data</td>
                                        </tr>
                                    ) : (
                                        analyticsData.map((data) => (
                                            <tr key={data.id}>
                                                <td>{data.user}</td>
                                                <td>{data.property}</td>
                                                <td>{data.totalHours}</td>
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