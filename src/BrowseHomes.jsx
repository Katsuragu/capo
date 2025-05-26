import React from "react";
import { useNavigate } from "react-router-dom";
import './BrowseHomes.css';

const BrowseHomes = () => {
  const navigate = useNavigate();

  const homeCategories = [
    { name: "Lancris", img: "/src/images/hotels.jpg" },
    { name: "Treelane", img: "/src/images/images.jpg" },
  ];

  const handleImageClick = (categoryName) => {
    // Pass the category as a query parameter
    navigate(`/property-listing?category=${encodeURIComponent(categoryName)}`);
  };

  return (
    <div className="browse-homes-container">
      <h2 className="browse-homes-title">Available Properties</h2>
      <div className="browse-homes-row">
        {homeCategories.map((category, index) => (
          <div
            key={index}
            className="browse-homes-item"
            onClick={() => handleImageClick(category.name)}
            style={{ cursor: 'pointer' }}
          >
            <img src={category.img} alt={category.name} className="browse-homes-image" />
            <div className="browse-homes-label">
              {category.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BrowseHomes;