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
const reservationsRef = ref(db, 'principalBuyers');        
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
            <main className="reservation-admin-main" style={{ overflowX: 'auto' }}>
                <table className="reservation-table">
                    <thead>
                        <tr>
                            <th>Principal Name</th>
                            <th>Present Address</th>
                            <th>Permanent Address</th>
                            <th>Place of Birth</th>
                            <th>Birthday</th>
                            <th>Gender</th>
                            <th>Civil Status</th>
                            <th>Citizenship</th>
                            <th>Religion</th>
                            <th>Contact</th>
                            <th>Facebook</th>
                            <th>TIN</th>
                            <th>PAG-IBIG</th>
                            <th>Spouse Name</th>
                            <th>Spouse Birth Place</th>
                            <th>Spouse Birthday</th>
                            <th>Spouse Citizenship</th>
                            <th>Spouse Religion</th>
                            <th>Spouse Employer</th>
                            <th>Spouse Business</th>
                            <th>Spouse Position</th>
                            <th>Spouse Employer Address</th>
                            <th>Spouse Office Tel</th>
                            <th>Spouse Contact Person</th>
                            <th>Spouse Email</th>
                            <th>Source of Income</th>
                            <th>Employment Type</th>
                            <th>Years in Service</th>
                            <th>Monthly Income</th>
                            <th>Project Name</th>
                            <th>Property Desc</th>
                            <th>Lot Area</th>
                            <th>House Area</th>
                            <th>Contract Price</th>
                            <th>Down Payment</th>
                            <th>DP Term</th>
                            <th>Loan Amount</th>
                            <th>Monthly Amort</th>
                            <th>Financing Scheme</th>
                            <th>Co-Borrower Name</th>
                            <th>Co-Borrower Birthday</th>
                            <th>Co-Borrower Gender</th>
                            <th>Co-Borrower Birth Place</th>
                            <th>Co-Borrower Citizenship</th>
                            <th>Co-Borrower Civil Status</th>
                            <th>Co-Borrower Religion</th>
                            <th>Co-Borrower Address</th>
                            <th>Co-Borrower Contact</th>
                            <th>Co-Borrower Email</th>
                            <th>Co-Borrower Source of Income</th>
                            <th>Reference Name</th>
                            <th>Reference Address</th>
                            <th>Reference Contact</th>
                            <th>Principal Signature</th>
                            <th>Spouse Signature</th>
                            <th>Co-Borrower Signature</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reservations.length === 0 ? (
                            <tr>
                                <td colSpan="56" style={{ textAlign: 'center' }}>No reservations found.</td>
                            </tr>
                        ) : (
                            reservations.map((r) => (
                                <tr key={r.id}>
                                    <td>{r.principalName}</td>
                                    <td>{r.presentAddress}</td>
                                    <td>{r.permanentAddress}</td>
                                    <td>{r.placeOfBirth}</td>
                                    <td>{r.birthday}</td>
                                    <td>{r.gender}</td>
                                    <td>{r.civilStatus}</td>
                                    <td>{r.citizenship}</td>
                                    <td>{r.religion}</td>
                                    <td>{r.contact}</td>
                                    <td>{r.facebook}</td>
                                    <td>{r.tin}</td>
                                    <td>{r.pagibig}</td>
                                    <td>{r.spouseName}</td>
                                    <td>{r.spouseBirthPlace}</td>
                                    <td>{r.spouseBirthday}</td>
                                    <td>{r.spouseCitizenship}</td>
                                    <td>{r.spouseReligion}</td>
                                    <td>{r.spouseEmployer}</td>
                                    <td>{r.spouseBusiness}</td>
                                    <td>{r.spousePosition}</td>
                                    <td>{r.spouseEmployerAddress}</td>
                                    <td>{r.spouseOfficeTel}</td>
                                    <td>{r.spouseContactPerson}</td>
                                    <td>{r.spouseEmail}</td>
                                    <td>{r.sourceOfIncome}</td>
                                    <td>{r.employmentType}</td>
                                    <td>{r.yearsInService}</td>
                                    <td>{r.monthlyIncome}</td>
                                    <td>{r.projectName}</td>
                                    <td>{r.propertyDesc}</td>
                                    <td>{r.lotArea}</td>
                                    <td>{r.houseArea}</td>
                                    <td>{r.contractPrice}</td>
                                    <td>{r.downPayment}</td>
                                    <td>{r.dpTerm}</td>
                                    <td>{r.loanAmount}</td>
                                    <td>{r.monthlyAmort}</td>
                                    <td>{r.financingScheme}</td>
                                    <td>{r.coName}</td>
                                    <td>{r.coBirthday}</td>
                                    <td>{r.coGender}</td>
                                    <td>{r.coBirthPlace}</td>
                                    <td>{r.coCitizenship}</td>
                                    <td>{r.coCivilStatus}</td>
                                    <td>{r.coReligion}</td>
                                    <td>{r.coAddress}</td>
                                    <td>{r.coContact}</td>
                                    <td>{r.coEmail}</td>
                                    <td>{r.coSourceOfIncome}</td>
                                    <td>{r.refName}</td>
                                    <td>{r.refAddress}</td>
                                    <td>{r.refContact}</td>
                                    <td>{r.sigPrincipal}</td>
                                    <td>{r.sigSpouse}</td>
                                    <td>{r.sigCo}</td>
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