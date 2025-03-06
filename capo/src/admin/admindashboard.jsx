import React from 'react';
import { Line, Bar } from 'react-chartjs-2';
import './cssadmin/admindashboard.css'; // Assuming styles are stored in admindashboard.css

const AdminDashboard = () => {
  const lineChartData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        label: 'Site Traffic',
        data: [65, 59, 80, 81, 56, 55],
        fill: false,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
      },
    ],
  };

  const barChartData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        label: 'User Engagement',
        data: [65, 59, 80, 81, 56, 55],
        backgroundColor: 'rgba(153,102,255,0.2)',
        borderColor: 'rgba(153,102,255,1)',
        borderWidth: 1,
      },
    ],
  };

  const salesChartData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        label: 'Sales Data',
        data: [65, 59, 80, 81, 56, 55],
        backgroundColor: 'rgba(255,159,64,0.2)',
        borderColor: 'rgba(255,159,64,1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="dashboard">
      <nav className="navbar">
        <h2>ANALYTICS DASHBOARD</h2>
        <div className="nav-links">
          <button>Overview</button>
          <button>Reports</button>
          <button>Settings</button>
        </div>
      </nav>

      <main className="analytics-content">
        <section className="analytics-section">
          <h2>Site Traffic</h2>
          <div className="chart">
            <Line data={lineChartData} />
          </div>
        </section>
        <section className="analytics-section">
          <h2>User Engagement</h2>
          <div className="chart">
            <Bar data={barChartData} />
          </div>
        </section>
        <section className="analytics-section">
          <h2>Sales Data</h2>
          <div className="chart">
            <Bar data={salesChartData} />
          </div>
        </section>
      </main>
    </div>
  );
};

export default AdminDashboard;