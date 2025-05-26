import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './navbar';
import './dashboard.css';

import pagsikatImg from './images/treelaneprice.jpg';
import soonToRiseImg from './images/treelanenews.jpg';
import palmerstonImg from './images/treelanenew.jpg';

const ESTIMATED_PRICELIST = [
  {
    name: "Treelane Corner Left",
    price: "₱3,000,000 - ₱3,500,000",
    features: ["3 Bedrooms", "2 Bathrooms", "1 Carport", "80 sqm"]
  },
  {
    name: "Treelane Corner Right",
    price: "₱2,800,000 - ₱3,200,000",
    features: ["3 Bedrooms", "2 Bathrooms", "1 Carport", "75 sqm"]
  },
  {
    name: "Treelane Middle",
    price: "₱2,500,000 - ₱2,900,000",
    features: ["2 Bedrooms", "1 Bathroom", "1 Carport", "65 sqm"]
  }
];

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const userEmail = localStorage.getItem('userEmail');
    if (!userEmail) {
      navigate('/login');
    }
  }, [navigate]);

  const handleReserveInterest = () => {
    navigate('/Property-listing');
  };

  return (
    <div className='dashboard-container dashboard-dark-bg'>
      <Navbar />
      {/* Hero Section */}
      <section className="dashboard-hero">
        <div className="dashboard-hero-content">
          <h1>Discover Your Dream Home</h1>
          <p>Modern, affordable, and quality homes in Bacoor, Cavite.</p>
        </div>
      </section>
      {/* Pricelist Section */}
      <main className='dashboard-main'>
        <section className='dashboard-pricelist-section'>
          <h2>Estimated Pricelist</h2>
          <div className="dashboard-pricelist-cards">
            {ESTIMATED_PRICELIST.map((item, idx) => (
              <div className="dashboard-pricelist-card" key={idx}>
                <h3>{item.name}</h3>
                <div className="dashboard-price">{item.price}</div>
                <ul>
                  {item.features.map((f, i) => <li key={i}>{f}</li>)}
                </ul>
              </div>
            ))}
            {/* Image Cards */}
            <div className="dashboard-pricelist-card">
              <img src={pagsikatImg} alt="Pagsikat Place Naic" style={{width: "100%", borderRadius: "10px", marginBottom: "1rem"}} />
              <h3>Pagsikat Place Naic</h3>
              <ul>
                <li>Lot Area: 36 sqm</li>
                <li>Floor Area: 44 sqm</li>
                <li>Provision for 2 Bedrooms</li>
                <li>Tiled Toilet & Bath</li>
                <li>Sliding Windows</li>
                <li>Steel main door</li>
                <li>Kitchen with stainless sink & tiled countertop</li>
                <li>Skim coated walls for a clean finish</li>
              </ul>
              <div className="dashboard-price" style={{marginTop: "1rem"}}>
                TCP: 1,200,000<br />
                Processing Fee: 4,000<br />
                Monthly Amort.: 0<br />
                Est. 30 Yrs: 7,388<br />
                Required Income: 22K
              </div>
            </div>
            <div className="dashboard-pricelist-card">
              <img src={soonToRiseImg} alt="Soon to Rise - Bucandala 1, Imus, Cavite" style={{width: "100%", borderRadius: "10px", marginBottom: "1rem"}} />
              <h3>Soon to Rise - Bucandala 1, Imus, Cavite</h3>
              <ul>
                <li>Lot Area: 52 sqm</li>
                <li>Floor Area: 94 sqm</li>
                <li>TCP: Php 3,632,000</li>
                <li>Loan Value: Php 3,394,000</li>
                <li>Total DP: Php 238,000</li>
                <li>Reservation Fee: Php 5,000</li>
                <li>DP@24mos.: Php 9,709</li>
                <li>Pag-ibig M.A.: Php 21,453</li>
                <li>GMI: Php 61,293</li>
              </ul>
            </div>
            <div className="dashboard-pricelist-card">
              <img src={palmerstonImg} alt="Palmerston North Naic" style={{width: "100%", borderRadius: "10px", marginBottom: "1rem"}} />
              <h3>Palmerston North Naic</h3>
              <ul>
                <li>Lot Area: 48 sqm</li>
                <li>Floor Area: 44.40 sqm</li>
                <li>Total Contract Price: 1,703,000</li>
                <li>Downpayment: 160,000</li>
                <li>Reservation Fee: 10,000</li>
                <li>NET Downpayment: 150,000</li>
                <li>10 months to pay DP: 15,000/mo</li>
                <li>Move-in Fee: 15,000</li>
                <li>Loanable Amount: 1,543,000</li>
              </ul>
              <div className="dashboard-price" style={{marginTop: "1rem"}}>
                Pag-ibig Financing @ 6.25% interest rate<br />
                30 yrs: 10,350.52/mo (Income: 30,016.51)<br />
                20 yrs: 11,028.70/mo (Income: 31,983.23)<br />
                15 yrs: 12,128.22/mo (Income: 35,171.84)<br />
                10 yrs: 14,083.09/mo (Income: 40,832.09)<br />
                5 yrs: 30,860.21/mo (Income: 89,494.61)
              </div>
            </div>
          </div>
        </section>
        {/* Reservation Section */}
        <section className='dashboard-reserve-section'>
          <h2>Interested in Reserving?</h2>
          <p>
            Click below to view available properties and start your reservation process.
          </p>
          <button className="dashboard-reserve-btn" onClick={handleReserveInterest}>
            View Properties & Reserve
          </button>
        </section>
        {/* About Section */}
        <section className='dashboard-section2'>
          <h2>About</h2>
          <p>
            Walk-IN offers affordable and quality homes in Bacoor, Cavite. Our mission is to help you find the perfect home for your family with ease and confidence.
          </p>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;