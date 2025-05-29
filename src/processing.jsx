import React, { useState, useRef } from 'react';
import Navbar from './navbar';
import './processing.css';
import html2pdf from 'html2pdf.js';

// Firebase imports
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, push } from 'firebase/database';
import firebaseConfig from './firebaseConfig';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const initialState = {
  principalLastName: '',
  principalFirstName: '',
  principalMiddleName: '',
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
  spouseLastName: '',
  spouseFirstName: '',
  spouseMiddleName: '',
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
  coLastName: '',
  coFirstName: '',
  coMiddleName: '',
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
  sigPrincipalImg: '',
  sigSpouseImg: '',
  sigCoImg: ''
};

const BuyersInformationForm = () => {
  const [form, setForm] = useState(initialState);
  const formRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const numberOnlyFields = ['contact', 'coContact', 'refContact', 'spouseOfficeTel'];
    // Prevent non-numeric input for specific fields, allowing empty strings
    if (numberOnlyFields.includes(name) && value !== '' && /\D/.test(value)) {
      return;
    }
    setForm({ ...form, [name]: value });
  };
   const getMaxBirthdayDate = () => {
    const today = new Date();
    today.setFullYear(today.getFullYear() - 20);
    return today.toISOString().split('T')[0];
  };


  // Handle signature image upload
  const handleSignatureImage = (e) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setForm((prev) => ({
          ...prev,
          [name]: ev.target.result
        }));
      };
      reader.readAsDataURL(files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Basic validation
    if (!form.principalLastName || !form.principalFirstName || !form.contact) {
      alert('Please fill in all required fields.');
      return;
    }
    try {
      await push(ref(db, 'reservations'), form);
      alert('Reservation submitted!');
      setForm(initialState);
    } catch (err) {
      alert('Error submitting reservation');
      console.error("Firebase submission error:", err); // Log the error for debugging
    }
  };

  const handleSaveAsPDF = () => {
    if (formRef.current) {
      html2pdf()
        .set({
          margin: 0.5,
          filename: 'BuyersInformationSheet.pdf',
          image: { type: 'jpeg', quality: 0.98 },
          html2canvas: { scale: 2 },
          jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
        })
        .from(formRef.current)
        .save();
    }
  };

  return (
    <>
      <Navbar />
      <div className="bis-form-container">
        <h2 className="heading">Buyer's Information Sheet</h2>
        <form className="bis-form" onSubmit={handleSubmit} ref={formRef}>
          {/* Principal Buyer */}
          <fieldset>
            <legend>Principal Buyer</legend>
            <input name="principalLastName" value={form.principalLastName} onChange={handleChange} type="text" placeholder="Last Name" required />
            <input name="principalFirstName" value={form.principalFirstName} onChange={handleChange} type="text" placeholder="First Name" required />
            <input name="principalMiddleName" value={form.principalMiddleName} onChange={handleChange} type="text" placeholder="Middle Name" />
            <textarea name="presentAddress" value={form.presentAddress} onChange={handleChange} placeholder="Present Address" />
            <textarea name="permanentAddress" value={form.permanentAddress} onChange={handleChange} placeholder="Permanent Address" />
            <input name="placeOfBirth" value={form.placeOfBirth} onChange={handleChange} type="text" placeholder="Place of Birth" />
            <input name="birthday" value={form.birthday} onChange={handleChange} type="date" max={getMaxBirthdayDate()} placeholder="Birthday" />
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
              <option>Annulled</option>
              <option>Widow/er</option>
            </select>
            <input name="citizenship" value={form.citizenship} onChange={handleChange} type="text" placeholder="Citizenship" />
            <input name="religion" value={form.religion} onChange={handleChange} type="text" placeholder="Religion" />
            <input name="contact" value={form.contact} onChange={handleChange} type="tel" pattern="[0-9]{10,13}" placeholder="Cellphone/Telephone" required />
            <input name="facebook" value={form.facebook} onChange={handleChange} type="text" placeholder="Facebook/Messenger Account" />
            <input name="tin" value={form.tin} onChange={handleChange} type="text" placeholder="TIN ID No." />
            <input name="pagibig" value={form.pagibig} onChange={handleChange} type="text" placeholder="PAG-IBIG MID No." />
          </fieldset>

          {/* Spouse Information */}
          <fieldset>
            <legend>Spouse Information</legend>
            <input name="spouseLastName" value={form.spouseLastName} onChange={handleChange} type="text" placeholder="Last Name" />
            <input name="spouseFirstName" value={form.spouseFirstName} onChange={handleChange} type="text" placeholder="First Name" />
            <input name="spouseMiddleName" value={form.spouseMiddleName} onChange={handleChange} type="text" placeholder="Middle Name" />
            <input name="spouseBirthPlace" value={form.spouseBirthPlace} onChange={handleChange} type="text" placeholder="Place of Birth" />
            <input name="spouseBirthday" value={form.spouseBirthday} onChange={handleChange} type="date" placeholder="Birthday" />
            <input name="spouseCitizenship" value={form.spouseCitizenship} onChange={handleChange} type="text" placeholder="Citizenship" />
            <input name="spouseReligion" value={form.spouseReligion} onChange={handleChange} type="text" placeholder="Religion" />
            <input name="spouseEmployer" value={form.spouseEmployer} onChange={handleChange} type="text" placeholder="Employer/Business Name" />
            <input name="spouseBusiness" value={form.spouseBusiness} onChange={handleChange} type="text" placeholder="Nature of Business" />
            <input name="spousePosition" value={form.spousePosition} onChange={handleChange} type="text" placeholder="Position & Department" />
            <textarea name="spouseEmployerAddress" value={form.spouseEmployerAddress} onChange={handleChange} placeholder="Employer/Business Address" />
            <input name="spouseOfficeTel" value={form.spouseOfficeTel} onChange={handleChange} type="tel" pattern="[0-9]{7,13}" placeholder="Office Telephone No." />
            <input name="spouseContactPerson" value={form.spouseContactPerson} onChange={handleChange} type="text" placeholder="Contact Person" />
            <input name="spouseEmail" value={form.spouseEmail} onChange={handleChange} type="email" placeholder="Email Address" />
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
            <textarea name="propertyDesc" value={form.propertyDesc} onChange={handleChange} placeholder="Subdivision / Block / Lot / House Description" />
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
            <input name="coLastName" value={form.coLastName} onChange={handleChange} type="text" placeholder="Last Name" />
            <input name="coFirstName" value={form.coFirstName} onChange={handleChange} type="text" placeholder="First Name" />
            <input name="coMiddleName" value={form.coMiddleName} onChange={handleChange} type="text" placeholder="Middle Name" />
            <input name="coBirthday" value={form.coBirthday} onChange={handleChange} type="date" placeholder="Birthday" />
            <input name="coGender" value={form.coGender} onChange={handleChange} type="text" placeholder="Gender" />
            <input name="coBirthPlace" value={form.coBirthPlace} onChange={handleChange} type="text" placeholder="Place of Birth" />
            <input name="coCitizenship" value={form.coCitizenship} onChange={handleChange} type="text" placeholder="Citizenship" />
            <input name="coCivilStatus" value={form.coCivilStatus} onChange={handleChange} type="text" placeholder="Civil Status" />
            <input name="coReligion" value={form.coReligion} onChange={handleChange} type="text" placeholder="Religion" />
            <textarea name="coAddress" value={form.coAddress} onChange={handleChange} placeholder="Present Address" />
            <input name="coContact" value={form.coContact} onChange={handleChange} type="tel" pattern="[0-9]{10,13}" placeholder="Contact No." />
            <input name="coEmail" value={form.coEmail} onChange={handleChange} type="email" placeholder="Email Address" />
            <input name="coSourceOfIncome" value={form.coSourceOfIncome} onChange={handleChange} type="text" placeholder="Source of Income" />
          </fieldset>

          {/* Character References */}
          <fieldset>
            <legend>Character References</legend>
            <input name="refName" value={form.refName} onChange={handleChange} type="text" placeholder="Name" />
            <textarea name="refAddress" value={form.refAddress} onChange={handleChange} placeholder="Address" />
            <input name="refContact" value={form.refContact} onChange={handleChange} type="tel" pattern="[0-9]{10,13}" placeholder="Contact No." />
          </fieldset>

          {/* Signature Section */}
          <div className="signature-section">
            <p>I/We certify that the above information are true and correct.</p>
            <div className="signatures">
              <div>
                <label>Principal Buyer</label>
                <input
                  type="file"
                  accept="image/*"
                  name="sigPrincipalImg"
                  onChange={handleSignatureImage}
                />
                {form.sigPrincipalImg && (
                  <img
                    src={form.sigPrincipalImg}
                    alt="Principal Signature"
                    style={{ width: '120px', marginTop: '8px' }}
                  />
                )}
              </div>
              <div>
                <label>Spouse</label>
                <input
                  type="file"
                  accept="image/*"
                  name="sigSpouseImg"
                  onChange={handleSignatureImage}
                />
                {form.sigSpouseImg && (
                  <img
                    src={form.sigSpouseImg}
                    alt="Spouse Signature"
                    style={{ width: '120px', marginTop: '8px' }}
                  />
                )}
              </div>
              <div>
                <label>Co-Borrower</label>
                <input
                  type="file"
                  accept="image/*"
                  name="sigCoImg"
                  onChange={handleSignatureImage}
                />
                {form.sigCoImg && (
                  <img
                    src={form.sigCoImg}
                    alt="Co-Borrower Signature"
                    style={{ width: '120px', marginTop: '8px' }}
                  />
                )}
              </div>
            </div>
          </div>

          {/* Buttons wrapped in a div for layout */}
          <div className="form-buttons">
            <button type="submit" className="submit-btn">Submit Form</button>
            <button
              type="button"
              className="submit-btn" // Re-using the submit-btn class for consistent styling
              onClick={handleSaveAsPDF}
            >
              Save as PDF
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default BuyersInformationForm;
