import React, { useEffect, useState } from 'react';
import AdminNavbar from './AdminNavbar';
import './cssadmin/Reservation.css';

// Firebase imports
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue, off } from 'firebase/database';
import firebaseConfig from '../firebaseConfig';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const Reservation = () => {
    const [reservations, setReservations] = useState([]);

    useEffect(() => {
        const reservationsRef = ref(db, 'reservations');
        const handleValue = (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const reservationList = Object.entries(data).map(([id, value]) => ({
                    id,
                    ...value,
                }));
                setReservations(reservationList);
            } else {
                setReservations([]);
            }
        };
        onValue(reservationsRef, handleValue);
        return () => off(reservationsRef);
    }, []);

    return (
        <div className="reservation-admin-container">
            <AdminNavbar />
            <header className="reservation-admin-header">
                <h1>All Reservations</h1>
                <p>View all user reservation requests and their details.</p>
            </header>
            <main className="reservation-admin-main">
                <table className="reservation-table">
                    <thead>
                        <tr>
                            <th>Full Name</th>
                            <th>Email</th>
                            <th>Contact Number</th>
                            <th>Move-in Date</th>
                            <th>Property Model</th>
                            <th>Callback Time</th>
                            <th>Additional Message</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reservations.length === 0 ? (
                            <tr>
                                <td colSpan="7" style={{ textAlign: 'center' }}>No reservations found.</td>
                            </tr>
                        ) : (
                            reservations.map((r) => (
                                <tr key={r.id}>
                                    <td>{r.fullName}</td>
                                    <td>{r.email}</td>
                                    <td>{r.contactNumber}</td>
                                    <td>{r.moveInDate}</td>
                                    <td>{r.propertyModel}</td>
                                    <td>{r.callbackTime}</td>
                                    <td>{r.additionalMessage}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </main>
        </div>
    );
};

export default Reservation;