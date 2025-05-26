import React, { useState, useEffect } from "react";
import Navbar from './navbar';
import { FaSearch, FaHeart } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";
import "./PropertyListing.css";

// Firebase imports
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue, off, runTransaction } from 'firebase/database';
import firebaseConfig from './firebaseConfig';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Only Treelane properties remain here, now with priceRange
const PROPERTY_INFO = [
  {
    id: "treelanecornerleft",
    type: "Treelane Corner Left",
    description: "Treelane Corner Left: Stylish and elegant.",
    location: "Bacoor",
    img: "/src/images/t4.jpg",
    priceRange: "₱3,000,000 - ₱3,500,000"
  },
  {
    id: "treelanecornerright",
    type: "Treelane Corner Right",
    description: "Treelane Corner Right: Perfect for families.",
    location: "Bacoor",
    img: "/src/images/t3.jpg",
    priceRange: "₱2,800,000 - ₱3,200,000"
  },
  {
    id: "treelanemiddle",
    type: "Treelane Middle",
    description: "Treelane Middle: Cozy and affordable.",
    location: "Bacoor",
    img: "/src/images/treelane2.jpg",
    priceRange: "₱2,500,000 - ₱2,900,000"
  },
];

const PropertyListing = () => {
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [propertyViews, setPropertyViews] = useState({});
  const [propertyHearts, setPropertyHearts] = useState({});
  const [hearted, setHearted] = useState({});
  const [slideIndex, setSlideIndex] = useState(0);
  const navigate = useNavigate();

  // Get user identifier (for demo, use email or fallback to localStorage)
  const userEmail = localStorage.getItem('userEmail') || 'guest';
  const userId = userEmail.replace(/[@.]/g, '_');

  useEffect(() => {
    const propertiesRef = ref(db, '/models');
    const handleValue = (snapshot) => {
      const data = snapshot.val() || {};
      const views = {};
      const hearts = {};
      const heartedState = {};
      Object.entries(data).forEach(([key, value]) => {
        if (value && typeof value === 'object') {
          views[key] = value.views || 0;
          hearts[key] = value.heartCount || 0;
          // Check if this user has hearted this property
          if (value.heartedUsers && value.heartedUsers[userId]) {
            heartedState[key] = true;
          } else {
            heartedState[key] = false;
          }
        }
      });
      setPropertyViews(views);
      setPropertyHearts(hearts);
      setHearted(heartedState);
    };
    onValue(propertiesRef, handleValue);
    return () => off(propertiesRef, 'value', handleValue);
    // eslint-disable-next-line
  }, [userId]);

  // Heart property function
  const handleHeart = (propertyId) => {
    const propertyRef = ref(db, `${propertyId}`);
    runTransaction(propertyRef, (currentData) => {
      if (!currentData) return currentData;
      if (!currentData.heartedUsers) currentData.heartedUsers = {};
      if (currentData.heartedUsers[userId]) {
        // Already hearted, unheart
        currentData.heartCount = (currentData.heartCount || 1) - 1;
        delete currentData.heartedUsers[userId];
      } else {
        // Not yet hearted, heart it
        currentData.heartCount = (currentData.heartCount || 0) + 1;
        currentData.heartedUsers[userId] = true;
      }
      return currentData;
    });
  };

  const openModal = (property) => {
    setSelectedProperty(property);
    setIsModalOpen(true);
    setSlideIndex(0);
  };

  const closeModal = () => {
    setSelectedProperty(null);
    setIsModalOpen(false);
  };

  // Blueprint images for each property (replace with your actual blueprint image paths)
  const BLUEPRINTS = {
    treelanecornerleft: "/src/images/blueprint_treelanecornerleft.jpg",
    treelanecornerright: "/src/images/blueprint_treelanecornerright.jpg",
    treelanemiddle: [
      "/src/images/treelane2.jpg", // main facade
      "/src/images/stairs.jpg",
      "/src/images/table.jpg",
      "/src/images/bedroom1.jpg",
      "/src/images/bedroom2.jpg",
      "/src/images/tablejpg",
      "/src/images/cr.jpg",
    ],
  };

  // Handle Reserve Now button click
  const handleReserveNow = (property) => {
    navigate("/processing");
  };

  // Slider controls for Treelane Middle
  const handlePrev = () => {
    if (!selectedProperty) return;
    const images = BLUEPRINTS[selectedProperty.id];
    if (Array.isArray(images)) {
      setSlideIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    }
  };

  const handleNext = () => {
    if (!selectedProperty) return;
    const images = BLUEPRINTS[selectedProperty.id];
    if (Array.isArray(images)) {
      setSlideIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }
  };

  return (
    <div className="property-container">
      <Navbar />
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
          {PROPERTY_INFO.map((property) => (
            <div key={property.id} className="property-card">
              <img src={property.img} alt={property.type} className="property-image" />
              <p className="property-type">{property.type}</p>
              <p className="description">{property.description}</p>
              <p className="location">
                <span>📍</span>{property.location}
              </p>
              <p className="price-range">
                <span>💰</span> {property.priceRange}
              </p>
              <p className="views">
                <span>👁️</span> {propertyViews[property.id] || 0} views
              </p>
              <p className="hearts" style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <button
                  className={`heart-btn${hearted[property.id] ? " hearted" : ""}`}
                  onClick={() => handleHeart(property.id)}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: hearted[property.id] ? "red" : "#888",
                    fontSize: 18,
                    padding: 0,
                  }}
                  title={hearted[property.id] ? "Unheart" : "Heart"}
                >
                  <FaHeart />
                </button>
                <span>{propertyHearts[property.id] || 0} hearts</span>
              </p>
              <div style={{ display: "flex", gap: "10px" }}>
                <button className="contact-button" onClick={() => openModal(property)}>More info</button>
                <button className="contact-button reserve-button" onClick={() => handleReserveNow(property)}>
                  Reserve Now
                </button>
              </div>
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
            {/* Sliding blueprint/gallery for Treelane Middle */}
            {selectedProperty.id === "treelanemiddle" && Array.isArray(BLUEPRINTS.treelanemiddle) ? (
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px" }}>
                <div style={{ position: "relative", width: "100%" }}>
                  <button
                    onClick={handlePrev}
                    style={{
                      position: "absolute",
                      left: 0,
                      top: "50%",
                      transform: "translateY(-50%)",
                      background: "rgba(0,0,0,0.3)",
                      color: "#fff",
                      border: "none",
                      borderRadius: "50%",
                      width: 32,
                      height: 32,
                      cursor: "pointer",
                      zIndex: 2
                    }}
                  >&#8592;</button>
                  <img
                    src={BLUEPRINTS.treelanemiddle[slideIndex]}
                    alt={`Treelane Middle ${slideIndex + 1}`}
                    className="modal-image"
                    style={{ objectFit: "contain", background: "#fff", maxHeight: 250, width: "100%" }}
                  />
                  <button
                    onClick={handleNext}
                    style={{
                      position: "absolute",
                      right: 0,
                      top: "50%",
                      transform: "translateY(-50%)",
                      background: "rgba(0,0,0,0.3)",
                      color: "#fff",
                      border: "none",
                      borderRadius: "50%",
                      width: 32,
                      height: 32,
                      cursor: "pointer",
                      zIndex: 2
                    }}
                  >&#8594;</button>
                </div>
                <div style={{ marginTop: 8, fontSize: 14, color: "#555" }}>
                  {slideIndex + 1} / {BLUEPRINTS.treelanemiddle.length}
                </div>
              </div>
            ) : (
              <img
                src={BLUEPRINTS[selectedProperty.id] || "/src/images/blueprint_default.jpg"}
                alt="Blueprint"
                className="modal-image"
                style={{ objectFit: "contain", background: "#fff" }}
              />
            )}
            <p><strong>Description:</strong> {selectedProperty.description}</p>
            <p><strong>Location:</strong> {selectedProperty.location}</p>
            <p><strong>Price Range:</strong> {selectedProperty.priceRange}</p>
            <p><strong>Views:</strong> {propertyViews[selectedProperty.id] || 0}</p>
            <p><strong>Hearts:</strong> {propertyHearts[selectedProperty.id] || 0}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyListing;