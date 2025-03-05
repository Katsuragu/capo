import React from 'react';
import { FaGooglePlay, FaApple } from 'react-icons/fa';
import Navbar from './navbar'; // Import the Navbar component
import './downloads.css'; // Import the CSS file

const Downloads = () => {
  return (
    <div className="downloads-container">
      <Navbar /> {/* Add the Navbar component */}

      {/* Hero Section */}
      <div className="hero-section">
        <div className="overlay"></div>
        <div className="hero-content">
          <h1 className="hero-title">WALK IN</h1>
          <p className="hero-subtitle">
            Enhance your virtual touring experience by stepping into a fully immersive 3D environment where you can explore and interact with the model as if you were truly there.
          </p>
          <div className="app-buttons">
            <button className="app-button google-play">
              <FaGooglePlay /> Google Play
            </button>
            <button className="app-button app-store">
              <FaApple /> App Store
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-links">
          <a href="#" className="footer-link">Terms of Services</a>
          <a href="#" className="footer-link">Privacy Policy</a>
          <a href="#" className="footer-link">Publisher Index</a>
        </div>
      </footer>
    </div>
  );
}

export default Downloads;