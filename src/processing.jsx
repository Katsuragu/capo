import React, { useState } from 'react';
import Navbar from './navbar';
import './processing.css';

// Firebase imports
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, push } from 'firebase/database';
import firebaseConfig from './firebaseConfig';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const initialState = {
  principalName: '',
  presentAddress: '',
  permanentAddress: '',
  placeOfBirth: '',
  birthday: '',
  gender: '',
  civilStatus: '',
  citizenship: '',
  religion: '',
  contact: '',
  facebook: '',
  tin: '',
  pagibig: '',
  spouseName: '',
  spouseBirthPlace: '',
  spouseBirthday: '',
  spouseCitizenship: '',
  spouseReligion: '',
  spouseEmployer: '',
  spouseBusiness: '',
  spousePosition: '',
  spouseEmployerAddress: '',
  spouseOfficeTel: '',
  spouseContactPerson: '',
  spouseEmail: '',
  sourceOfIncome: '',
  employmentType: '',
  yearsInService: '',
  monthlyIncome: '',
  projectName: '',
  propertyDesc: '',
  lotArea: '',
  houseArea: '',
  contractPrice: '',
  downPayment: '',
  dpTerm: '',
  loanAmount: '',
  monthlyAmort: '',
  financingScheme: '',
  coName: '',
  coBirthday: '',
  coGender: '',
  coBirthPlace: '',
  coCitizenship: '',
  coCivilStatus: '',
  coReligion: '',
  coAddress: '',
  coContact: '',
  coEmail: '',
  coSourceOfIncome: '',
  refName: '',
  refAddress: '',
  refContact: '',
  sigPrincipal: '',
  sigSpouse: '',
  sigCo: ''
};

const BuyersInformationForm = () => {
  const [form, setForm] = useState(initialState);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await push(ref(db, 'reservations'), form);
      alert('Reservation submitted!');
      setForm(initialState);
    } catch (err) {
      alert('Error submitting reservation');
    }
  };

  return (
    <>
      <Navbar />
      <div className="bis-form-container">
        <h2 className="heading">Buyer's Information Sheet</h2>
        <form className="bis-form" onSubmit={handleSubmit}>
          {/* Principal Buyer */}
          <fieldset>
            <legend>Principal Buyer</legend>
            <input name="principalName" value={form.principalName} onChange={handleChange} type="text" placeholder="Last Name, First Name, Middle Name" required />
            <input name="presentAddress" value={form.presentAddress} onChange={handleChange} type="text" placeholder="Present Address" />
            <input name="permanentAddress" value={form.permanentAddress} onChange={handleChange} type="text" placeholder="Permanent Address" />
            <input name="placeOfBirth" value={form.placeOfBirth} onChange={handleChange} type="text" placeholder="Place of Birth" />
            <input name="birthday" value={form.birthday} onChange={handleChange} type="date" placeholder="Birthday" />
            <select name="gender" value={form.gender} onChange={handleChange}>
              <option value="">Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            <select name="civilStatus" value={form.civilStatus} onChange={handleChange}>
              <option value="">Civil Status</option>
              <option>Single</option>
              <option>Married</option>
              <option>Legally Separated</option>
              <option>Annuled</option>
              <option>Widow/er</option>
            </select>
            <input name="citizenship" value={form.citizenship} onChange={handleChange} type="text" placeholder="Citizenship" />
            <input name="religion" value={form.religion} onChange={handleChange} type="text" placeholder="Religion" />
            <input name="contact" value={form.contact} onChange={handleChange} type="text" placeholder="Cellphone/Telephone/Email" />
            <input name="facebook" value={form.facebook} onChange={handleChange} type="text" placeholder="Facebook/Messenger Account" />
            <input name="tin" value={form.tin} onChange={handleChange} type="text" placeholder="TIN ID No." />
            <input name="pagibig" value={form.pagibig} onChange={handleChange} type="text" placeholder="PAG-IBIG MID No." />
          </fieldset>

          {/* Spouse Information */}
          <fieldset>
            <legend>Spouse Information</legend>
            <input name="spouseName" value={form.spouseName} onChange={handleChange} type="text" placeholder="Last Name, First Name, Middle Name" />
            <input name="spouseBirthPlace" value={form.spouseBirthPlace} onChange={handleChange} type="text" placeholder="Place of Birth" />
            <input name="spouseBirthday" value={form.spouseBirthday} onChange={handleChange} type="date" placeholder="Birthday" />
            <input name="spouseCitizenship" value={form.spouseCitizenship} onChange={handleChange} type="text" placeholder="Citizenship" />
            <input name="spouseReligion" value={form.spouseReligion} onChange={handleChange} type="text" placeholder="Religion" />
            <input name="spouseEmployer" value={form.spouseEmployer} onChange={handleChange} type="text" placeholder="Employer/Business Name" />
            <input name="spouseBusiness" value={form.spouseBusiness} onChange={handleChange} type="text" placeholder="Nature of Business" />
            <input name="spousePosition" value={form.spousePosition} onChange={handleChange} type="text" placeholder="Position & Department" />
            <input name="spouseEmployerAddress" value={form.spouseEmployerAddress} onChange={handleChange} type="text" placeholder="Employer/Business Address" />
            <input name="spouseOfficeTel" value={form.spouseOfficeTel} onChange={handleChange} type="text" placeholder="Office Telephone No." />
            <input name="spouseContactPerson" value={form.spouseContactPerson} onChange={handleChange} type="text" placeholder="Contact Person" />
            <input name="spouseEmail" value={form.spouseEmail} onChange={handleChange} type="text" placeholder="Email Address" />
          </fieldset>

          {/* Employment & Financial */}
          <fieldset>
            <legend>Employment & Financial</legend>
            <input name="sourceOfIncome" value={form.sourceOfIncome} onChange={handleChange} type="text" placeholder="Source of Income" />
            <input name="employmentType" value={form.employmentType} onChange={handleChange} type="text" placeholder="Employment Type" />
            <input name="yearsInService" value={form.yearsInService} onChange={handleChange} type="text" placeholder="Years in Service" />
            <input name="monthlyIncome" value={form.monthlyIncome} onChange={handleChange} type="text" placeholder="Monthly Income" />
          </fieldset>

          {/* Property & Financing */}
          <fieldset>
            <legend>Property & Financing</legend>
            <input name="projectName" value={form.projectName} onChange={handleChange} type="text" placeholder="Project Name & Location" />
            <input name="propertyDesc" value={form.propertyDesc} onChange={handleChange} type="text" placeholder="Subdivision / Block / Lot / House Description" />
            <input name="lotArea" value={form.lotArea} onChange={handleChange} type="text" placeholder="Lot Area" />
            <input name="houseArea" value={form.houseArea} onChange={handleChange} type="text" placeholder="House Area" />
            <input name="contractPrice" value={form.contractPrice} onChange={handleChange} type="text" placeholder="Total Contract Price" />
            <input name="downPayment" value={form.downPayment} onChange={handleChange} type="text" placeholder="Down Payment" />
            <input name="dpTerm" value={form.dpTerm} onChange={handleChange} type="text" placeholder="DP Term" />
            <input name="loanAmount" value={form.loanAmount} onChange={handleChange} type="text" placeholder="Loan Amount" />
            <input name="monthlyAmort" value={form.monthlyAmort} onChange={handleChange} type="text" placeholder="Monthly Amortization" />
            <select name="financingScheme" value={form.financingScheme} onChange={handleChange}>
              <option value="">Financing Scheme</option>
              <option>PAG-IBIG</option>
              <option>In-House</option>
              <option>Other</option>
            </select>
          </fieldset>

          {/* Co-Borrower */}
          <fieldset>
            <legend>Co-Borrower (if any)</legend>
            <input name="coName" value={form.coName} onChange={handleChange} type="text" placeholder="Last Name, First Name, Middle Name" />
            <input name="coBirthday" value={form.coBirthday} onChange={handleChange} type="text" placeholder="Birthday" />
            <input name="coGender" value={form.coGender} onChange={handleChange} type="text" placeholder="Gender" />
            <input name="coBirthPlace" value={form.coBirthPlace} onChange={handleChange} type="text" placeholder="Place of Birth" />
            <input name="coCitizenship" value={form.coCitizenship} onChange={handleChange} type="text" placeholder="Citizenship" />
            <input name="coCivilStatus" value={form.coCivilStatus} onChange={handleChange} type="text" placeholder="Civil Status" />
            <input name="coReligion" value={form.coReligion} onChange={handleChange} type="text" placeholder="Religion" />
            <input name="coAddress" value={form.coAddress} onChange={handleChange} type="text" placeholder="Present Address" />
            <input name="coContact" value={form.coContact} onChange={handleChange} type="text" placeholder="Contact No." />
            <input name="coEmail" value={form.coEmail} onChange={handleChange} type="text" placeholder="Email Address" />
            <input name="coSourceOfIncome" value={form.coSourceOfIncome} onChange={handleChange} type="text" placeholder="Source of Income" />
          </fieldset>

          {/* Character References */}
          <fieldset>
            <legend>Character References</legend>
            <input name="refName" value={form.refName} onChange={handleChange} type="text" placeholder="Name" />
            <input name="refAddress" value={form.refAddress} onChange={handleChange} type="text" placeholder="Address" />
            <input name="refContact" value={form.refContact} onChange={handleChange} type="text" placeholder="Contact No." />
          </fieldset>

          {/* Signature Section */}
          <div className="signature-section">
            <p>I/We certify that the above information are true and correct.</p>
            <div className="signatures">
              <div>
                <label>Principal Buyer</label>
                <input name="sigPrincipal" value={form.sigPrincipal} onChange={handleChange} type="text" placeholder="Signature over Printed Name" />
              </div>
              <div>
                <label>Spouse</label>
                <input name="sigSpouse" value={form.sigSpouse} onChange={handleChange} type="text" placeholder="Signature over Printed Name" />
              </div>
              <div>
                <label>Co-Borrower</label>
                <input name="sigCo" value={form.sigCo} onChange={handleChange} type="text" placeholder="Signature over Printed Name" />
              </div>
            </div>
          </div>

          <button type="submit" className="submit-btn">Submit Form</button>
        </form>
      </div>
    </>
  );
};

export default BuyersInformationForm;