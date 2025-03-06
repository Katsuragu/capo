import React from "react";
import './BrowseHomes.css'; // Import the CSS file

const BrowseHomes = () => {
  const homeCategories = [
    { name: "Duraville", img: "/src/images/house1.jpg" },
    { name: "Lancrest", img: "/src/images/hotels.jpg" },
    { name: "Treelane", img: "/src/images/images.jpg" },
    { name: "Camella", img: "/src/images/villa.jpg" },
  ];

  const handleImageClick = (categoryName) => {
    console.log(`Clicked on ${categoryName}`);
    // Implement your navigation or action here
  };

  return (
    <div className="browse-homes-container">
      <h2 className="browse-homes-title">Villages</h2>
      <div className="browse-homes-row">
        {homeCategories.map((category, index) => (
          <div
            key={index}
            className="browse-homes-item"
            onClick={() => handleImageClick(category.name)}
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