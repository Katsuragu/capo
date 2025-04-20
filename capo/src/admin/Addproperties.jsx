import React, { useState } from 'react';
import AdminNavbar from './AdminNavbar'; // Import the Admin Navbar
import './cssadmin/Addproperties.css'; // Import the CSS file for Add Properties

const AddProperties = () => {
    const [newProperty, setNewProperty] = useState({
        type: '',
        description: '',
        location: '',
        img: '',
        views: 0,
        cm: 0,
        sqm: 0,
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewProperty({ ...newProperty, [name]: name === 'views' || name === 'cm' || name === 'sqm' ? parseInt(value) || 0 : value });
    };

    const handleAddProperty = () => {
        if (newProperty.type.trim() && newProperty.description.trim() && newProperty.location.trim()) {
            alert('Property added successfully!');
            setNewProperty({
                type: '',
                description: '',
                location: '',
                img: '',
                views: 0,
                cm: 0,
                sqm: 0,
            });
        } else {
            alert('Please fill in all fields.');
        }
    };

    return (
        <div className="property-container">
            <AdminNavbar /> {/* Use the Admin Navbar */}
            <header className="property-header">
                <h1>Add Properties</h1>
                <p>Manage and add new properties to the listing.</p>
            </header>
            <main className="property-main">
                <div className="add-property-form">
                    <h2>Add New Property</h2>
                    <div className="input-row">
                        <label>
                            Property Type:
                            <input
                                type="text"
                                name="type"
                                value={newProperty.type}
                                onChange={handleInputChange}
                                placeholder="Enter property type"
                            />
                        </label>
                        <label>
                            Location:
                            <input
                                type="text"
                                name="location"
                                value={newProperty.location}
                                onChange={handleInputChange}
                                placeholder="Enter property location"
                            />
                        </label>
                    </div>
                    <div className="input-row">
                        <label>
                            Views:
                            <input
                                type="number"
                                name="views"
                                value={newProperty.views}
                                onChange={handleInputChange}
                                placeholder="Enter number of views"
                            />
                        </label>
                        <label>
                            Image URL:
                            <input
                                type="text"
                                name="img"
                                value={newProperty.img}
                                onChange={handleInputChange}
                                placeholder="Enter image URL"
                            />
                        </label>
                    </div>
                    <div className="input-row">
                        <label>
                            Size (cm):
                            <input
                                type="number"
                                name="cm"
                                value={newProperty.cm}
                                onChange={handleInputChange}
                                placeholder="Enter size in cm"
                            />
                        </label>
                        <label>
                            Size (sqm):
                            <input
                                type="number"
                                name="sqm"
                                value={newProperty.sqm}
                                onChange={handleInputChange}
                                placeholder="Enter size in sqm"
                            />
                        </label>
                    </div>
                    <label>
                        Description:
                        <textarea
                            name="description"
                            value={newProperty.description}
                            onChange={handleInputChange}
                            placeholder="Enter property description"
                        ></textarea>
                    </label>
                    <button className="save-button" onClick={handleAddProperty}>Add Property</button>
                </div>
            </main>
        </div>
    );
};

export default AddProperties;