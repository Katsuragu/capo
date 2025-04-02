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

    // Simulate fetching property data from an API
    useEffect(() => {
        // Replace this with an actual API call
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
               
            </main>
        </div>
    );
};

export default AdminDashboard;