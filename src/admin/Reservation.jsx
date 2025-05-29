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
    const [sortColumn, setSortColumn] = useState(null); // State for the currently sorted column
    const [sortDirection, setSortDirection] = useState('asc'); // 'asc' for ascending, 'desc' for descending

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

    // Function to format date
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    // Function to parse and format the principal's name
    const formatPrincipalName = (fullName) => {
        if (!fullName) return '';
        const parts = fullName.split(' ').filter(part => part.trim() !== ''); // Split by space and remove empty strings
        let firstName = '';
        let middleName = '';
        let lastName = '';

        if (parts.length === 1) {
            firstName = parts[0];
        } else if (parts.length === 2) {
            firstName = parts[0];
            lastName = parts[1];
        } else if (parts.length >= 3) {
            firstName = parts[0];
            lastName = parts[parts.length - 1]; // Last part is the last name
            middleName = parts.slice(1, parts.length - 1).join(' '); // Middle parts joined
        }

        return `${firstName} ${middleName} ${lastName}`.trim();
    };

    // Function to handle column header clicks for sorting
    const handleSort = (columnName) => {
        if (sortColumn === columnName) {
            // If clicking the same column, reverse the sort direction
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            // If clicking a new column, set it as the sort column and default to ascending
            setSortColumn(columnName);
            setSortDirection('asc');
        }
    };

    // Sort the reservations based on sortColumn and sortDirection
    const sortedReservations = [...reservations].sort((a, b) => {
        if (!sortColumn) return 0; // No sorting if no column is selected

        let aValue = a[sortColumn];
        let bValue = b[sortColumn];

        // Handle cases where values might be numbers or strings
        if (typeof aValue === 'string' && typeof bValue === 'string') {
            return sortDirection === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
        } else if (typeof aValue === 'number' && typeof bValue === 'number') {
            return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
        } else {
            // Fallback for mixed types or other scenarios (e.g., convert to string for comparison)
            const aString = String(aValue);
            const bString = String(bValue);
            return sortDirection === 'asc' ? aString.localeCompare(bString) : bString.localeCompare(aString);
        }
    });

    // Helper to render sort indicator
    const renderSortIndicator = (columnName) => {
        if (sortColumn === columnName) {
            return sortDirection === 'asc' ? ' ⬆️' : ' ⬇️';
        }
        return '';
    };

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
                            <th onClick={() => handleSort('principalName')}>Principal Name {renderSortIndicator('principalName')}</th>
                            <th onClick={() => handleSort('presentAddress')}>Present Address {renderSortIndicator('presentAddress')}</th>
                            <th onClick={() => handleSort('permanentAddress')}>Permanent Address {renderSortIndicator('permanentAddress')}</th>
                            <th onClick={() => handleSort('placeOfBirth')}>Place of Birth {renderSortIndicator('placeOfBirth')}</th>
                            <th onClick={() => handleSort('birthday')}>Birthday {renderSortIndicator('birthday')}</th>
                            <th onClick={() => handleSort('gender')}>Gender {renderSortIndicator('gender')}</th>
                            <th onClick={() => handleSort('civilStatus')}>Civil Status {renderSortIndicator('civilStatus')}</th>
                            <th onClick={() => handleSort('citizenship')}>Citizenship {renderSortIndicator('citizenship')}</th>
                            <th onClick={() => handleSort('religion')}>Religion {renderSortIndicator('religion')}</th>
                            <th onClick={() => handleSort('contact')}>Contact {renderSortIndicator('contact')}</th>
                            <th onClick={() => handleSort('facebook')}>Facebook {renderSortIndicator('facebook')}</th>
                            <th onClick={() => handleSort('tin')}>TIN {renderSortIndicator('tin')}</th>
                            <th onClick={() => handleSort('pagibig')}>PAG-IBIG {renderSortIndicator('pagibig')}</th>
                            <th onClick={() => handleSort('spouseName')}>Spouse Name {renderSortIndicator('spouseName')}</th>
                            <th onClick={() => handleSort('spouseBirthPlace')}>Spouse Birth Place {renderSortIndicator('spouseBirthPlace')}</th>
                            <th onClick={() => handleSort('spouseBirthday')}>Spouse Birthday {renderSortIndicator('spouseBirthday')}</th>
                            <th onClick={() => handleSort('spouseCitizenship')}>Spouse Citizenship {renderSortIndicator('spouseCitizenship')}</th>
                            <th onClick={() => handleSort('spouseReligion')}>Spouse Religion {renderSortIndicator('spouseReligion')}</th>
                            <th onClick={() => handleSort('spouseEmployer')}>Spouse Employer {renderSortIndicator('spouseEmployer')}</th>
                            <th onClick={() => handleSort('spouseBusiness')}>Spouse Business {renderSortIndicator('spouseBusiness')}</th>
                            <th onClick={() => handleSort('spousePosition')}>Spouse Position {renderSortIndicator('spousePosition')}</th>
                            <th onClick={() => handleSort('spouseEmployerAddress')}>Spouse Employer Address {renderSortIndicator('spouseEmployerAddress')}</th>
                            <th onClick={() => handleSort('spouseOfficeTel')}>Spouse Office Tel {renderSortIndicator('spouseOfficeTel')}</th>
                            <th onClick={() => handleSort('spouseContactPerson')}>Spouse Contact Person {renderSortIndicator('spouseContactPerson')}</th>
                            <th onClick={() => handleSort('spouseEmail')}>Spouse Email {renderSortIndicator('spouseEmail')}</th>
                            <th onClick={() => handleSort('sourceOfIncome')}>Source of Income {renderSortIndicator('sourceOfIncome')}</th>
                            <th onClick={() => handleSort('employmentType')}>Employment Type {renderSortIndicator('employmentType')}</th>
                            <th onClick={() => handleSort('yearsInService')}>Years in Service {renderSortIndicator('yearsInService')}</th>
                            <th onClick={() => handleSort('monthlyIncome')}>Monthly Income {renderSortIndicator('monthlyIncome')}</th>
                            <th onClick={() => handleSort('projectName')}>Project Name {renderSortIndicator('projectName')}</th>
                            <th onClick={() => handleSort('propertyDesc')}>Property Desc {renderSortIndicator('propertyDesc')}</th>
                            <th onClick={() => handleSort('lotArea')}>Lot Area {renderSortIndicator('lotArea')}</th>
                            <th onClick={() => handleSort('houseArea')}>House Area {renderSortIndicator('houseArea')}</th>
                            <th onClick={() => handleSort('contractPrice')}>Contract Price {renderSortIndicator('contractPrice')}</th>
                            <th onClick={() => handleSort('downPayment')}>Down Payment {renderSortIndicator('downPayment')}</th>
                            <th onClick={() => handleSort('dpTerm')}>DP Term {renderSortIndicator('dpTerm')}</th>
                            <th onClick={() => handleSort('loanAmount')}>Loan Amount {renderSortIndicator('loanAmount')}</th>
                            <th onClick={() => handleSort('monthlyAmort')}>Monthly Amort {renderSortIndicator('monthlyAmort')}</th>
                            <th onClick={() => handleSort('financingScheme')}>Financing Scheme {renderSortIndicator('financingScheme')}</th>
                            <th onClick={() => handleSort('coName')}>Co-Borrower Name {renderSortIndicator('coName')}</th>
                            <th onClick={() => handleSort('coBirthday')}>Co-Borrower Birthday {renderSortIndicator('coBirthday')}</th>
                            <th onClick={() => handleSort('coGender')}>Co-Borrower Gender {renderSortIndicator('coGender')}</th>
                            <th onClick={() => handleSort('coBirthPlace')}>Co-Borrower Birth Place {renderSortIndicator('coBirthPlace')}</th>
                            <th onClick={() => handleSort('coCitizenship')}>Co-Borrower Citizenship {renderSortIndicator('coCitizenship')}</th>
                            <th onClick={() => handleSort('coCivilStatus')}>Co-Borrower Civil Status {renderSortIndicator('coCivilStatus')}</th>
                            <th onClick={() => handleSort('coReligion')}>Co-Borrower Religion {renderSortIndicator('coReligion')}</th>
                            <th onClick={() => handleSort('coAddress')}>Co-Borrower Address {renderSortIndicator('coAddress')}</th>
                            <th onClick={() => handleSort('coContact')}>Co-Borrower Contact {renderSortIndicator('coContact')}</th>
                            <th onClick={() => handleSort('coEmail')}>Co-Borrower Email {renderSortIndicator('coEmail')}</th>
                            <th onClick={() => handleSort('coSourceOfIncome')}>Co-Borrower Source of Income {renderSortIndicator('coSourceOfIncome')}</th>
                            <th onClick={() => handleSort('refName')}>Reference Name {renderSortIndicator('refName')}</th>
                            <th onClick={() => handleSort('refAddress')}>Reference Address {renderSortIndicator('refAddress')}</th>
                            <th onClick={() => handleSort('refContact')}>Reference Contact {renderSortIndicator('refContact')}</th>
                            <th>Principal Signature</th>
                            <th>Spouse Signature</th>
                            <th>Co-Borrower Signature</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedReservations.length === 0 ? (
                            <tr>
                                <td colSpan="56" style={{ textAlign: 'center' }}>No reservations found.</td>
                            </tr>
                        ) : (
                            sortedReservations.map((r) => (
                                <tr key={r.id}>
                                    <td>{formatPrincipalName(r.principalName)}</td>
                                    <td>{r.presentAddress}</td>
                                    <td>{r.permanentAddress}</td>
                                    <td>{r.placeOfBirth}</td>
                                    <td>{formatDate(r.birthday)}</td>
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
                                    <td>{formatDate(r.spouseBirthday)}</td>
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
                                    <td>{formatDate(r.coBirthday)}</td>
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
                                    <td>
                                        {r.sigPrincipal && <img src={r.sigPrincipal} alt="Principal Signature" style={{ width: '120px' }} />}
                                    </td>
                                    <td>
                                        {r.sigSpouse && <img src={r.sigSpouse} alt="Spouse Signature" style={{ width: '120px' }} />}
                                    </td>
                                    <td>
                                        {r.sigCo && <img src={r.sigCo} alt="Co-Borrower Signature" style={{ width: '120px' }} />}
                                    </td>
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
