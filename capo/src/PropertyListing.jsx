import React from "react";
import Navbar from './navbar'; // Import the Navbar component
import { FaSearch } from 'react-icons/fa'; // Import the search icon
import "./PropertyListing.css"; // Import the CSS file

const PropertyListing = () => {
  return (
    <div className="property-container">
      <Navbar /> {/* Add the Navbar component */}
      <header className="property-header">
        <div className="search-bar">
          <input type="text" placeholder="Search..." className="search-input" />
          <button className="search-button">
            <FaSearch />
          </button>
          <button className="search-button">Price</button>
          <button className="search-button">Type</button>
          <button className="search-button">Location</button>
          <button className="search-button">Status</button>
          <button className="search-button">More..</button>
        </div>
      </header>
      <main className="property-main">
        <div
          className="background-banner"
          
        >
          
        </div>

        <div className="property-listings">
          {[1, 2, 3, 4, 5, 6].map((_, index) => (
            <div key={index} className="property-card">
              <div className="image-placeholder"></div>
              <p className="property-type">(property type eg. Home, Hotel)</p>
              <h3 className="price">$100000</h3>
              <p className="description">Description...</p>
              <p className="location">
                <span>📍</span>Imus
              </p>
              <button className="contact-button">Contact agent</button>
            </div>
          ))}
        </div>
      </main>
      <footer className="property-footer">
        <p>&copy; Terms of Services Privacy Policy Publisher index</p>
      </footer>
    </div>
  );
};

export default PropertyListing;