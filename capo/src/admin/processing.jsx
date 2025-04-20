import React, { useState } from 'react';
import AdminNavbar from './AdminNavbar'; // Import the Admin Navbar
import './cssadmin/processing.css'; // Import the CSS file for Processing

const Processing = () => {
    const [reservation, setReservation] = useState({
        fullName: '',
        email: '',
        contactNumber: '',
        moveInDate: '',
        propertyModel: '',
        additionalMessage: '',
        callbackTime: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setReservation({ ...reservation, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (
            reservation.fullName &&
            reservation.email &&
            reservation.contactNumber &&
            reservation.moveInDate &&
            reservation.propertyModel
        ) {
            alert('Reservation submitted successfully!');
            setReservation({
                fullName: '',
                email: '',
                contactNumber: '',
                moveInDate: '',
                propertyModel: '',
                additionalMessage: '',
                callbackTime: '',
            });
        } else {
            alert('Please fill in all required fields.');
        }
    };

    return (
        <div className="processing-container">
            <AdminNavbar /> {/* Use the Admin Navbar */}
            <main className="processing-main">
                <h1>Reservation Processing</h1>
                <form className="reservation-form" onSubmit={handleSubmit}>
                    <div className="form-row">
                        <label>
                            Full Name:
                            <input
                                type="text"
                                name="fullName"
                                value={reservation.fullName}
                                onChange={handleInputChange}
                                placeholder="Enter your full name"
                                required
                            />
                        </label>
                        <label>
                            Email Address:
                            <input
                                type="email"
                                name="email"
                                value={reservation.email}
                                onChange={handleInputChange}
                                placeholder="Enter your email address"
                                required
                            />
                        </label>
                    </div>
                    <div className="form-row">
                        <label>
                            Contact Number:
                            <input
                                type="tel"
                                name="contactNumber"
                                value={reservation.contactNumber}
                                onChange={handleInputChange}
                                placeholder="Enter your contact number"
                                required
                            />
                        </label>
                        <label>
                            Preferred Move-in Date:
                            <input
                                type="date"
                                name="moveInDate"
                                value={reservation.moveInDate}
                                onChange={handleInputChange}
                                required
                            />
                        </label>
                    </div>
                    <div className="form-row">
                        <label>
                            Chosen Property Model:
                            <input
                                type="text"
                                name="propertyModel"
                                value={reservation.propertyModel}
                                onChange={handleInputChange}
                                placeholder="Enter property model"
                                required
                            />
                        </label>
                        <label>
                            Preferred Time for Callback/Site Visit (optional):
                            <input
                                type="time"
                                name="callbackTime"
                                value={reservation.callbackTime}
                                onChange={handleInputChange}
                            />
                        </label>
                    </div>
                    <label>
                        Additional Message or Questions:
                        <textarea
                            name="additionalMessage"
                            value={reservation.additionalMessage}
                            onChange={handleInputChange}
                            placeholder="Enter any additional message or questions"
                        ></textarea>
                    </label>
                    <button type="submit" className="submit-button">
                        Submit Reservation
                    </button>
                </form>
            </main>
        </div>
    );
};

export default Processing;