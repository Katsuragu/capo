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
  MailingAdd: '', // Added from form fields
  EmployersName: '', // Added from form fields
  NatureOfBusiness: '', // Added from form fields
  PositionInDepartment: '', // Added from form fields
  EmployersAdd: '', // Added from form fields
  Age: '', // Added from form fields

  spouseLastName: '',
  spouseFirstName: '',
  spouseMiddleName: '',
  spplaceOfBirth: '', // Corrected from 'spouseBirthPlace' to match form
  spbirthday: '', // Corrected from 'spouseBirthday' to match form
  spgender: '', // Corrected from 'spouseGender' to match form
  spcivilStatus: '', // Corrected from 'spouseCivilStatus' to match form
  spcitizenship: '', // Corrected from 'spouseCitizenship' to match form
  spreligion: '', // Corrected from 'spouseReligion' to match form
  spcontact: '', // Corrected from 'spouseContact' to match form
  spfacebook: '', // Corrected from 'spouseFacebook' to match form
  sppresentAddress: '', // Corrected from 'spousePresentAddress' to match form
  sppermanentAddress: '', // Corrected from 'spousePermanentAddress' to match form
  spMailingAdd: '', // Added from form fields
  spEmployersName: '', // Added from form fields
  spNatureOfBusiness: '', // Added from form fields
  spositionInDepartment: '', // Corrected from 'spousePositionInDepartment' to match form
  spEmployersAdd: '', // Corrected from 'spouseEmployersAdd' to match form
  sptin: '', // Corrected from 'spouseTin' to match form
  sppagibig: '', // Corrected from 'spousePagibig' to match form
  spsourceOfIncome: '', // Corrected from 'spouseSourceOfIncome' to match form
  spAge: '', // Added from form fields

  AttorneyLastName: '', // Added from form fields
  AttorneyFirstName: '', // Added from form fields
  AttorneyMiddleName: '', // Added from form fields
  Attorneygender: '', // Added from form fields
  AttorneypresentAddress: '', // Added from form fields
  Attorneycontact: '', // Added from form fields

  coLastName: '',
  coFirstName: '',
  coMiddleName: '',
  coBirthday: '',
  coGender: '',
  coPlaceOfBirth: '', // Added from form fields
  coAge: '', // Added from form fields
  coCivilStatus: '',
  coCitizenship: '',
  coReligion: '',
  coAddress: '', // Note: This was 'coPresentAddress' and 'coPermanentAddress' in form, consolidated for clarity
  coContact: '',
  coEmail: '', // Not in form fields, but in initialState
  coSourceOfIncome: '',
  coFacebook: '', // Added from form fields
  coPresentAddress: '', // Added from form fields
  coPermanentAddress: '', // Added from form fields
  coMailingAdd: '', // Added from form fields
  coEmployersName: '', // Added from form fields
  coNatureOfBusiness: '', // Added from form fields
  coPositionInDepartment: '', // Added from form fields
  coEmployersAdd: '', // Added from form fields
  coTin: '', // Added from form fields
  coPagibig: '', // Added from form fields

  coSpouseLastName: '', // Added from form fields
  coSpouseFirstName: '', // Added from form fields
  coSpouseMiddleName: '', // Added from form fields
  coSpousePlaceOfBirth: '', // Added from form fields
  coSpouseAge: '', // Added from form fields
  coSpouseBirthday: '', // Added from form fields
  coSpouseGender: '', // Added from form fields
  coSpouseCivilStatus: '', // Added from form fields
  coSpouseCitizenship: '', // Added from form fields
  coSpouseReligion: '', // Added from form fields
  coSpouseContact: '', // Added from form fields
  coSpouseFacebook: '', // Added from form fields
  coSpousePresentAddress: '', // Added from form fields
  coSpousePermanentAddress: '', // Added from form fields
  coSpouseMailingAdd: '', // Added from form fields
  coSpouseEmployersName: '', // Added from form fields
  coSpouseNatureOfBusiness: '', // Added from form fields
  coSpousePositionInDepartment: '', // Added from form fields
  coSpouseEmployersAdd: '', // Added from form fields
  coSpouseTin: '', // Added from form fields
  coSpousePagibig: '', // Added from form fields
  coSpouseSourceOfIncome: '', // Added from form fields


  refName: '',
  refAddress: '',
  refContact: '',
 CorefName: '',
CorefAddress: '',
  CorefContact: '',

  subdivision: '', // Added from Marketing Department section
  houseDescription: '', // Added from Marketing Department section
  lotArea: '', // Added from Marketing Department section
  houseArea: '', // Added from Marketing Department section
  totalContractPrice: '', // Added from Marketing Department section
  downPayment: '', // Added from Marketing Department section
  dpTerm: '', // Added from Marketing Department section
  loanAmount: '', // Added from Marketing Department section
  maTerm: '', // Added from Marketing Department section
  monthlyAmortization: '', // Added from Marketing Department section

  sigPrincipalImg: '', // Base64 string or URL
  sigSpouseImg: '',    // Base64 string or URL
  sigCoImg: ''         // Base64 string or URL
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
      await push(ref(db, 'principalBuyers'), form);
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
            <input name="placeOfBirth" value={form.placeOfBirth} onChange={handleChange} type="text" placeholder="Place of Birth" />
            <input name="Age" value={form.Age} onChange={handleChange} type="text" placeholder="Age" />
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
            <textarea name="presentAddress" value={form.presentAddress} onChange={handleChange} placeholder="Present Address" />
            <textarea name="permanentAddress" value={form.permanentAddress} onChange={handleChange} placeholder="Permanent Address" />
             <select name="MailingAdd" value={form.MailingAdd} onChange={handleChange}>
              <option value="">PREFERRED MAILING ADD.:</option>
              <option value="presentaddress">Present Address</option>
              <option value="permanentaddress">Permanent Address</option>
              <option value="employersaddress">Employers Address</option>
            </select>
            <input name="EmployersName" value={form.EmployersName} onChange={handleChange} type="text" placeholder="EMPLOYER/BUSINESS NAME:" required />
            <input name="NatureOfBusiness" value={form.NatureOfBusiness} onChange={handleChange} type="text" placeholder="NATURE OF BUSINESS:" required />
           <input name="PositionInDepartment" value={form.PositionInDepartment} onChange={handleChange} type="text" placeholder="POSITION & DEPARTMENT:" required />
          <textarea name="EmployersAdd" value={form.Empolyers} onChange={handleChange} placeholder="EMPLOYER/BUSINESS ADDRESS:" />
            <input name="tin" value={form.tin} onChange={handleChange} type="text" placeholder="TIN ID No." />
            <input name="pagibig" value={form.pagibig} onChange={handleChange} type="text" placeholder="PAG-IBIG MID No." />
             <select name="sourceOfIncome" value={form.sourceOfIncome} onChange={handleChange}>
              <option value="">SOURCE OF INCOME:</option>
              <option value="Investment">Investment</option>
              <option value="Remittance">Remittance</option>
              <option value="Pension">Pension</option>
              <option value="Employment">Employment</option>
              <option value="Other">Other</option>
            </select>
           
          </fieldset>

          {/* Spouse Information */}
          <fieldset>
            <legend>Spouse Information</legend>
            <input name="SpouseLastName" value={form.SpouseLastName} onChange={handleChange} type="text" placeholder="Last Name" required />
            <input name="SpouseFirstName" value={form.SpouseFirstName} onChange={handleChange} type="text" placeholder="First Name" required />
            <input name="SpouseMiddleName" value={form.SpouseMiddleName} onChange={handleChange} type="text" placeholder="Middle Name" />
            <input name="spplaceOfBirth" value={form.spplaceOfBirth} onChange={handleChange} type="text" placeholder="Place of Birth" />
            <input name="spAge" value={form.spAge} onChange={handleChange} type="text" placeholder="Age" />
            <input name="spbirthday" value={form.spbirthday} onChange={handleChange} type="date" max={getMaxBirthdayDate()} placeholder="Birthday" />
            <select name="spgender" value={form.spgender} onChange={handleChange}>
              <option value="">Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            <select name="spcivilStatus" value={form.spcivilStatus} onChange={handleChange}>
              <option value="">Civil Status</option>
              <option>Single</option>
              <option>Married</option>
              <option>Legally Separated</option>
              <option>Annulled</option>
              <option>Widow/er</option>
            </select>
            <input name="spcitizenship" value={form.spcitizenship} onChange={handleChange} type="text" placeholder="Citizenship" />
            <input name="spreligion" value={form.spreligion} onChange={handleChange} type="text" placeholder="Religion" />
            <input name="spcontact" value={form.spcontact} onChange={handleChange} type="tel" pattern="[0-9]{10,13}" placeholder="Cellphone/Telephone" required />
            <input name="spfacebook" value={form.spfacebook} onChange={handleChange} type="text" placeholder="Facebook/Messenger Account" />
            <textarea name="sppresentAddress" value={form.sppresentAddress} onChange={handleChange} placeholder="Present Address" />
            <textarea name="sppermanentAddress" value={form.sppermanentAddress} onChange={handleChange} placeholder="Permanent Address" />
             <select name="spMailingAdd" value={form.spMailingAdd} onChange={handleChange}>
              <option value="">PREFERRED MAILING ADD.:</option>
              <option value="sppresentaddress">Present Address</option>
              <option value="sppermanentaddress">Permanent Address</option>
              <option value="spemployersaddress">Employers Address</option>
            </select>
            <input name="EmployersName" value={form.spEmployersName} onChange={handleChange} type="text" placeholder="EMPLOYER/BUSINESS NAME:" required />
            <input name="NatureOfBusiness" value={form.spNatureOfBusiness} onChange={handleChange} type="text" placeholder="NATURE OF BUSINESS:" required />
           <input name="PositionInDepartment" value={form.spositionInDepartment} onChange={handleChange} type="text" placeholder="POSITION & DEPARTMENT:" required />
          <textarea name="EmployersAdd" value={form.spEmployersaddress} onChange={handleChange} placeholder="EMPLOYER/BUSINESS ADDRESS:" />
            <input name="tin" value={form.sptin} onChange={handleChange} type="text" placeholder="TIN ID No." />
            <input name="pagibig" value={form.sppagibig} onChange={handleChange} type="text" placeholder="PAG-IBIG MID No." />
             <select name="spsourceOfIncome" value={form.spsourceOfIncome} onChange={handleChange}>
              <option value="">SOURCE OF INCOME:</option>
              <option value="Investment">Investment</option>
              <option value="Remittance">Remittance</option>
              <option value="Pension">Pension</option>
              <option value="Employment">Employment</option>
              <option value="Other">Other</option>
            </select>
          </fieldset>

          <fieldset>
            <legend>ATTORNEY-IN-FACT/AUTHORIZED REPRESENTATIVE</legend>
            <input name="AttorneyLastName" value={form.AttorneyLastName} onChange={handleChange} type="text" placeholder="Last Name" required />
            <input name="AttorneyFirstName" value={form.AttorneyFirstName} onChange={handleChange} type="text" placeholder="First Name" required />
            <input name="AttorneyMiddleName" value={form.AttorneyMiddleName} onChange={handleChange} type="text" placeholder="Middle Name" />
            <select name="Attorneygender" value={form.Attorneygender} onChange={handleChange}>
              <option value="">Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          <textarea name="AttorneypresentAddress" value={form.AttorneypresentAddress} onChange={handleChange} placeholder="Present Address" />
          <input name="Attorneycontact" value={form.Attorneycontact} onChange={handleChange} type="tel" pattern="[0-9]{10,13}" placeholder="Cellphone/Telephone" required />

           
          </fieldset>

           <fieldset>
            <legend>Character References</legend>
            <input name="refName" value={form.refName} onChange={handleChange} type="text" placeholder="Name" />
            <textarea name="refAddress" value={form.refAddress} onChange={handleChange} placeholder="Address" />
            <input name="refContact" value={form.refContact} onChange={handleChange} type="tel" pattern="[0-9]{10,13}" placeholder="Contact No." />
          </fieldset>


          {/* Co-Borrower */}
          <fieldset>
            <legend>Co-Borrower (if any)</legend>
            <input name="coLastName" value={form.coLastName} onChange={handleChange} type="text" placeholder="Last Name" />
<input name="coFirstName" value={form.coFirstName} onChange={handleChange} type="text" placeholder="First Name" />
<input name="coMiddleName" value={form.coMiddleName} onChange={handleChange} type="text" placeholder="Middle Name" />
<input name="coPlaceOfBirth" value={form.coPlaceOfBirth} onChange={handleChange} type="text" placeholder="Place of Birth" />
<input name="coAge" value={form.coAge} onChange={handleChange} type="text" placeholder="Age" />
<input name="coBirthday" value={form.coBirthday} onChange={handleChange} type="date" placeholder="Birthday" />
<select name="coGender" value={form.coGender} onChange={handleChange}>
  <option value="">Gender</option>
  <option value="Male">Male</option>
  <option value="Female">Female</option>
  <option value="Other">Other</option>
</select>
<select name="coCivilStatus" value={form.coCivilStatus} onChange={handleChange}>
  <option value="">Civil Status</option>
  <option>Single</option>
  <option>Married</option>
  <option>Legally Separated</option>
  <option>Annulled</option>
  <option>Widow/er</option>
</select>
<input name="coCitizenship" value={form.coCitizenship} onChange={handleChange} type="text" placeholder="Citizenship" />
<input name="coReligion" value={form.coReligion} onChange={handleChange} type="text" placeholder="Religion" />
<input name="coContact" value={form.coContact} onChange={handleChange} type="tel" pattern="[0-9]{10,13}" placeholder="Cellphone/Telephone" />
<input name="coFacebook" value={form.coFacebook} onChange={handleChange} type="text" placeholder="Facebook/Messenger Account" />
<textarea name="coPresentAddress" value={form.coPresentAddress} onChange={handleChange} placeholder="Present Address" />
<textarea name="coPermanentAddress" value={form.coPermanentAddress} onChange={handleChange} placeholder="Permanent Address" />
<select name="coMailingAdd" value={form.coMailingAdd} onChange={handleChange}>
  <option value="">PREFERRED MAILING ADD.:</option>
  <option value="presentaddress">Present Address</option>
  <option value="permanentaddress">Permanent Address</option>
  <option value="employersaddress">Employers Address</option>
</select>
<input name="coEmployersName" value={form.coEmployersName} onChange={handleChange} type="text" placeholder="EMPLOYER/BUSINESS NAME:" required />
<input name="coNatureOfBusiness" value={form.coNatureOfBusiness} onChange={handleChange} type="text" placeholder="NATURE OF BUSINESS:" required />
<input name="coPositionInDepartment" value={form.coPositionInDepartment} onChange={handleChange} type="text" placeholder="POSITION & DEPARTMENT:" required />
<textarea name="coEmployersAdd" value={form.coEmployersAdd} onChange={handleChange} placeholder="EMPLOYER/BUSINESS ADDRESS:" />
<input name="coTin" value={form.coTin} onChange={handleChange} type="text" placeholder="TIN ID No." />
<input name="coPagibig" value={form.coPagibig} onChange={handleChange} type="text" placeholder="PAG-IBIG MID No." />
<select name="coSourceOfIncome" value={form.coSourceOfIncome} onChange={handleChange}>
<option value="">SOURCE OF INCOME:</option>
  <option value="Investment">Investment</option>
  <option value="Remittance">Remittance</option>
  <option value="Pension">Pension</option>
  <option value="Employment">Employment</option>
  <option value="Other">Other</option>
</select>

          </fieldset>
          <fieldset>
    <legend>Co-Borrower Spouse Information</legend>
    <input name="coSpouseLastName" value={form.coSpouseLastName} onChange={handleChange} type="text" placeholder="Last Name" required />
    <input name="coSpouseFirstName" value={form.coSpouseFirstName} onChange={handleChange} type="text" placeholder="First Name" required />
    <input name="coSpouseMiddleName" value={form.coSpouseMiddleName} onChange={handleChange} type="text" placeholder="Middle Name" />
    <input name="coSpousePlaceOfBirth" value={form.coSpousePlaceOfBirth} onChange={handleChange} type="text" placeholder="Place of Birth" />
    <input name="coSpouseAge" value={form.coSpouseAge} onChange={handleChange} type="text" placeholder="Age" />
    <input name="coSpouseBirthday" value={form.coSpouseBirthday} onChange={handleChange} type="date" max={getMaxBirthdayDate()} placeholder="Birthday" />
    <select name="coSpouseGender" value={form.coSpouseGender} onChange={handleChange}>
        <option value="">Gender</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="Other">Other</option>
    </select>
    <select name="coSpouseCivilStatus" value={form.coSpouseCivilStatus} onChange={handleChange}>
        <option value="">Civil Status</option>
        <option>Single</option>
        <option>Married</option>
        <option>Legally Separated</option>
        <option>Annulled</option>
        <option>Widow/er</option>
    </select>
    <input name="coSpouseCitizenship" value={form.coSpouseCitizenship} onChange={handleChange} type="text" placeholder="Citizenship" />
    <input name="coSpouseReligion" value={form.coSpouseReligion} onChange={handleChange} type="text" placeholder="Religion" />
    <input name="coSpouseContact" value={form.coSpouseContact} onChange={handleChange} type="tel" pattern="[0-9]{10,13}" placeholder="Cellphone/Telephone" required />
    <input name="coSpouseFacebook" value={form.coSpouseFacebook} onChange={handleChange} type="text" placeholder="Facebook/Messenger Account" />
    <textarea name="coSpousePresentAddress" value={form.coSpousePresentAddress} onChange={handleChange} placeholder="Present Address" />
    <textarea name="coSpousePermanentAddress" value={form.coSpousePermanentAddress} onChange={handleChange} placeholder="Permanent Address" />
    <select name="coSpouseMailingAdd" value={form.coSpouseMailingAdd} onChange={handleChange}>
        <option value="">PREFERRED MAILING ADD.:</option>
        <option value="coSpousePresentAddress">Present Address</option>
        <option value="coSpousePermanentAddress">Permanent Address</option>
        <option value="coSpouseEmployersAddress">Employers Address</option>
    </select>
    <input name="coSpouseEmployersName" value={form.coSpouseEmployersName} onChange={handleChange} type="text" placeholder="EMPLOYER/BUSINESS NAME:" required />
    <input name="coSpouseNatureOfBusiness" value={form.coSpouseNatureOfBusiness} onChange={handleChange} type="text" placeholder="NATURE OF BUSINESS:" required />
    <input name="coSpousePositionInDepartment" value={form.coSpousePositionInDepartment} onChange={handleChange} type="text" placeholder="POSITION & DEPARTMENT:" required />
    <textarea name="coSpouseEmployersAdd" value={form.coSpouseEmployersAdd} onChange={handleChange} placeholder="EMPLOYER/BUSINESS ADDRESS:" />
    <input name="coSpouseTin" value={form.coSpouseTin} onChange={handleChange} type="text" placeholder="TIN ID No." />
    <input name="coSpousePagibig" value={form.coSpousePagibig} onChange={handleChange} type="text" placeholder="PAG-IBIG MID No." />
    <select name="coSpouseSourceOfIncome" value={form.coSpouseSourceOfIncome} onChange={handleChange}>
        <option value="">SOURCE OF INCOME:</option>
        <option value="Investment">Investment</option>
        <option value="Remittance">Remittance</option>
        <option value="Pension">Pension</option>
        <option value="Employment">Employment</option>
        <option value="Other">Other</option>
    </select>
</fieldset>

<fieldset>
            <legend>ATTORNEY-IN-FACT/AUTHORIZED REPRESENTATIVE</legend>
            <input name="AttorneycLastName" value={form.AttorneycLastName} onChange={handleChange} type="text" placeholder="Last Name" required />
            <input name="AttorneycFirstName" value={form.AttorneycFirstName} onChange={handleChange} type="text" placeholder="First Name" required />
            <input name="AttorneycMiddleName" value={form.AttorneycMiddleName} onChange={handleChange} type="text" placeholder="Middle Name" />
            <select name="Attorneycgender" value={form.Attorneycgender} onChange={handleChange}>
              <option value="">Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          <textarea name="AttorneycpresentAddress" value={form.AttorneycpresentAddress} onChange={handleChange} placeholder="Present Address" />
          <input name="Attorneyccontact" value={form.Attorneyccontact} onChange={handleChange} type="tel" pattern="[0-9]{10,13}" placeholder="Cellphone/Telephone" required />

           
          </fieldset>
            <fieldset className="form-section">
            <legend>TO BE FILLED-UP BY MARKETING DEPARTMENT (For Pre-evaluation purposes)</legend>
            <input name="subdivision" value={form.subdivision} onChange={handleChange} type="text" placeholder="SUBDIVISION/BLOCK/LOT" required />
            <input name="houseDescription" value={form.houseDescription} onChange={handleChange} type="text" placeholder="HOUSE DESCRIPTION" required />
            <input name="lotArea" value={form.lotArea} onChange={handleChange} type="text" placeholder="LOT AREA" required />
            <input name="houseArea" value={form.houseArea} onChange={handleChange} type="text" placeholder="HOUSE AREA" required />
            <input name="totalContractPrice" value={form.totalContractPrice} onChange={handleChange} type="text" placeholder="TOTAL CONTRACT PRICE" required />
            <input name="downPayment" value={form.downPayment} onChange={handleChange} type="text" placeholder="DOWN PAYMENT" required />
            <input name="dpTerm" value={form.dpTerm} onChange={handleChange} type="text" placeholder="DP TERM" required />
            <input name="loanAmount" value={form.loanAmount} onChange={handleChange} type="text" placeholder="LOAN AMOUNT" required />
            <input name="maTerm" value={form.maTerm} onChange={handleChange} type="text" placeholder="MA TERM" required />
            <input name="monthlyAmortization" value={form.monthlyAmortization} onChange={handleChange} type="text" placeholder="MONTHLY AMORTIZATION" required />
          </fieldset>
          {/* Character References */}
          <fieldset>
            <legend>Character References</legend>
            <input name="CorefName" value={form.CorefName} onChange={handleChange} type="text" placeholder="Name" />
            <textarea name="CorefAddress" value={form.CorefAddress} onChange={handleChange} placeholder="Address" />
            <input name="CorefContact" value={form.CorefContact} onChange={handleChange} type="tel" pattern="[0-9]{10,13}" placeholder="Contact No." />
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
