import React from "react";
import './BrowseHomes.css'; // Import the CSS file

const BrowseHomes = () => {
  const homeCategories = [
    { name: "Houses", img: "/src/images/house1.jpg" },
    { name: "Hotels", img: "/src/images/hotels.jpg" },
    { name: "Apartments", img: "/src/images/images.jpg" },
    { name: "Villa", img: "/src/images/villa.jpg" },
  ];

  return (
    <div className="browse-homes-container">
      <h2 className="browse-homes-title">Browse Homes</h2>
      <div className="browse-homes-row">
        {homeCategories.map((category, index) => (
          <div key={index} className="browse-homes-item">
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