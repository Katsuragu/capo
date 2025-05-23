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
    const [topVisitors, setTopVisitors] = useState([]);

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
            setAnalyticsData(mockAnalytics);

            // Calculate top visitors (by total time spent, mock logic)
            const visitorMap = {};
            mockAnalytics.forEach((entry) => {
                // Convert timeSpent to minutes for sorting
                const hoursMatch = entry.timeSpent.match(/([\d.]+)\s*hour/);
                const minsMatch = entry.timeSpent.match(/([\d.]+)\s*min/);
                let minutes = 0;
                if (hoursMatch) minutes += parseFloat(hoursMatch[1]) * 60;
                if (minsMatch) minutes += parseFloat(minsMatch[1]);
                if (!visitorMap[entry.user]) visitorMap[entry.user] = 0;
                visitorMap[entry.user] += minutes;
            });
            const sortedVisitors = Object.entries(visitorMap)
                .sort((a, b) => b[1] - a[1])
                .map(([user, totalMinutes], idx) => ({
                    rank: idx + 1,
                    user,
                    totalMinutes,
                }));
            setTopVisitors(sortedVisitors);
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
                <div className="dashboard-cards">
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
                {/* Top Visitors Section */}
                <section className="admin-dashboard-section">
                    <div className="analytics-table-container">
                        <h2>Top Visitors</h2>
                        <table className="analytics-table">
                            <thead>
                                <tr>
                                    <th>Rank</th>
                                    <th>User</th>
                                    <th>Total Time Spent (minutes)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {topVisitors.length === 0 ? (
                                    <tr>
                                        <td colSpan="3" style={{ textAlign: 'center' }}>No data</td>
                                    </tr>
                                ) : (
                                    topVisitors.map((visitor) => (
                                        <tr key={visitor.user}>
                                            <td>{visitor.rank}</td>
                                            <td>{visitor.user}</td>
                                            <td>{visitor.totalMinutes}</td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default AdminDashboard;