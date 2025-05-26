import React, { useState } from 'react';
import Navbar from './navbar';
import './processing.css';

// Firebase imports
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, push, set } from 'firebase/database';
import firebaseConfig from './firebaseConfig';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const Processing = () => {
    const [reservation, setReservation] = useState({
        fullName: '',
        email: '',
        contactNumber: '',
        propertyModel: '',
        blk: '',
        lot: '',
        additionalMessage: '',
        callbackDate: '',
        callbackTime: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setReservation({ ...reservation, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (
            reservation.fullName &&
            reservation.email &&
            reservation.contactNumber &&
            reservation.propertyModel &&
            reservation.blk &&
            reservation.lot
        ) {
            try {
                // Push reservation to Firebase under 'reservations'
                const reservationsRef = ref(db, 'reservations');
                const newReservationRef = push(reservationsRef);
                await set(newReservationRef, {
                    ...reservation,
                    timestamp: Date.now()
                });
                alert('Reservation submitted successfully!');
                setReservation({
                    fullName: '',
                    email: '',
                    contactNumber: '',
                    propertyModel: '',
                    blk: '',
                    lot: '',
                    additionalMessage: '',
                    callbackDate: '',
                    callbackTime: '',
                });
            } catch (error) {
                alert('Failed to submit reservation. Please try again.');
            }
        } else {
            alert('Please fill in all required fields.');
        }
    };

    return (
        <div className="processing-container">
            <Navbar />
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
                            Chosen Property Model:
                            <select
                                name="propertyModel"
                                value={reservation.propertyModel}
                                onChange={handleInputChange}
                                required
                            >
                                <option value="">Select property model</option>
                                <option value="Townhouse">Townhouse</option>
                                <option value="Standard">Standard</option>
                            </select>
                        </label>
                    </div>
                    {/* New section for BLK and LOT */}
                    <div className="form-row">
                        <label>
                            Block (BLK):
                            <input
                                type="text"
                                name="blk"
                                value={reservation.blk}
                                onChange={handleInputChange}
                                placeholder="Enter block number"
                                required
                            />
                        </label>
                        <label>
                            Lot:
                            <input
                                type="text"
                                name="lot"
                                value={reservation.lot}
                                onChange={handleInputChange}
                                placeholder="Enter lot number"
                                required
                            />
                        </label>
                    </div>
                    <div className="form-row">
                        <label>
                            Preferred Date for Callback/Site Visit (optional):
                            <input
                                type="date"
                                name="callbackDate"
                                value={reservation.callbackDate}
                                onChange={handleInputChange}
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
                    <div style={{ textAlign: "center", margin: "1.5rem 0" }}>
                        <a
                            href="https://drive.google.com/drive/folders/1O1IqG-zkAedoLPZWt9embTM-UPrnb2ZS?usp=drive_link"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="download-pdf-link"
                            style={{
                                display: "inline-block",
                                padding: "0.75rem 2rem",
                                background: "#16a34a",
                                color: "#fff",
                                borderRadius: "8px",
                                textDecoration: "none",
                                fontWeight: "bold",
                                boxShadow: "0 2px 8px rgba(0,0,0,0.08)"
                            }}
                        >
                            View Reservation Guide (Google Drive)
                        </a>
                    </div>
                    <button type="submit" className="submit-button">
                        Submit Reservation
                    </button>
                    
                </form>
            </main>
            
        </div>
    );
};

export default Processing;