import React, { useState } from "react";
import Navbar from './navbar'; // Import the Navbar component
import { FaSearch } from 'react-icons/fa'; // Import the search icon
import "./PropertyListing.css"; // Import the CSS file

const PropertyListing = () => {
  const [selectedProperty, setSelectedProperty] = useState(null); // State to store the selected property
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility

  const properties = [
    {
      id: 1,
      type: "Home",
      description: "Beautiful home with a spacious garden.",
      location: "Imus",
      img: "/src/images/house1.jpg",
      views: 120,
      cm: 500,
      sqm: 50
    },
    {
      id: 2,
      type: "Hotel",
      description: "Luxurious hotel with modern amenities.",
      location: "Manila",
      img: "/src/images/hotels.jpg",
      views: 250,
      cm: 1000,
      sqm: 100
    },
    {
      id: 3,
      type: "Apartment",
      description: "Cozy apartment in the city center.",
      location: "Quezon City",
      img: "/src/images/images.jpg",
      views: 180,
      cm: 300,
      sqm: 30
    },
    {
      id: 4,
      type: "Villa",
      description: "Elegant villa with a private pool.",
      location: "Tagaytay",
      img: "/src/images/villa.jpg",
      views: 300,
      cm: 800,
      sqm: 80
    },
    // Add more properties as needed
  ];

  const openModal = (property) => {
    setSelectedProperty(property); // Set the selected property
    setIsModalOpen(true); // Open the modal
  };

  const closeModal = () => {
    setSelectedProperty(null); // Clear the selected property
    setIsModalOpen(false); // Close the modal
  };

  return (
    <div className="property-container">
      <Navbar /> {/* Add the Navbar component */}
      <header className="property-header">
        <div className="search-bar">
          <input type="text" placeholder="Search..." className="search-input" />
          <button className="search-button">
            <FaSearch />
          </button>
          <button className="search-button">Location</button>
          <button className="search-button">Status</button>
        </div>
      </header>
      <main className="property-main">
        <div className="property-listings">
          {properties.map((property) => (
            <div key={property.id} className="property-card">
              <img src={property.img} alt={property.type} className="property-image" />
              <p className="property-type">{property.type}</p>
              <p className="description">{property.description}</p>
              <p className="location">
                <span>📍</span>{property.location}
              </p>
              <p className="views">
                <span>👁️</span> {property.views} views
              </p>
              <button className="contact-button" onClick={() => openModal(property)}>More info</button>
            </div>
          ))}
        </div>
      </main>
      <footer className="property-footer">
        <p>&copy; Terms of Services Privacy Policy Publisher index</p>
      </footer>

      {/* Modal */}
      {isModalOpen && selectedProperty && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={closeModal}>✖</button>
            <h2>{selectedProperty.type}</h2>
            <img src={selectedProperty.img} alt={selectedProperty.type} className="modal-image" />
            <p><strong>Description:</strong> {selectedProperty.description}</p>
            <p><strong>Location:</strong> {selectedProperty.location}</p>
            <p><strong>Views:</strong> {selectedProperty.views}</p>
            <p><strong>Size:</strong> {selectedProperty.cm} cm / {selectedProperty.sqm} sqm</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyListing;