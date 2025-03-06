import React from "react";
import Navbar from './navbar'; // Import the Navbar component
import { FaSearch } from 'react-icons/fa'; // Import the search icon
import "./PropertyListing.css"; // Import the CSS file

const PropertyListing = () => {
  const properties = [
    {
      id: 1,
      type: "Home",
      price: "$100000",
      description: "Beautiful home with a spacious garden.",
      location: "Imus",
      img: "/src/images/house1.jpg"
    },
    {
      id: 2,
      type: "Hotel",
      price: "$200000",
      description: "Luxurious hotel with modern amenities.",
      location: "Manila",
      img: "/src/images/hotels.jpg"
    },
    {
      id: 3,
      type: "Apartment",
      price: "$150000",
      description: "Cozy apartment in the city center.",
      location: "Quezon City",
      img: "/src/images/images.jpg"
    },
    {
      id: 4,
      type: "Villa",
      price: "$300000",
      description: "Elegant villa with a private pool.",
      location: "Tagaytay",
      img: "/src/images/villa.jpg"
    },
    // Add more properties as needed
  ];

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
        <div className="background-banner"></div>
        <div className="property-listings">
          {properties.map((property) => (
            <div key={property.id} className="property-card">
              <img src={property.img} alt={property.type} className="property-image" />
              <p className="property-type">{property.type}</p>
              <h3 className="price">{property.price}</h3>
              <p className="description">{property.description}</p>
              <p className="location">
                <span>📍</span>{property.location}
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