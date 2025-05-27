import React from 'react';
import './buyersInformationForm.css';

const BuyersInformationForm = () => {
  return (
    <div className="bis-form-container">
      <h2 className="heading">Buyer's Information Sheet</h2>

      <form className="bis-form">
        {/* Principal Buyer Information */}
        <fieldset>
          <legend>Principal Buyer</legend>
          <input type="text" placeholder="Last Name, First Name, Middle Name" required />
          <input type="text" placeholder="Present Address" />
          <input type="text" placeholder="Permanent Address" />
          <input type="text" placeholder="Place of Birth" />
          <input type="date" placeholder="Birthday" />
          <select>
            <option value="">Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          <select>
            <option value="">Civil Status</option>
            <option>Single</option>
            <option>Married</option>
            <option>Legally Separated</option>
            <option>Annuled</option>
            <option>Widow/er</option>
          </select>
          <input type="text" placeholder="Citizenship" />
          <input type="text" placeholder="Religion" />
          <input type="text" placeholder="Cellphone/Telephone/Email" />
          <input type="text" placeholder="Facebook/Messenger Account" />
          <input type="text" placeholder="TIN ID No." />
          <input type="text" placeholder="PAG-IBIG MID No." />
        </fieldset>

        {/* Spouse Information */}
        <fieldset>
          <legend>Spouse Information</legend>
          <input type="text" placeholder="Last Name, First Name, Middle Name" />
          <input type="text" placeholder="Place of Birth" />
          <input type="date" placeholder="Birthday" />
          <input type="text" placeholder="Citizenship" />
          <input type="text" placeholder="Religion" />
          <input type="text" placeholder="Employer/Business Name" />
          <input type="text" placeholder="Nature of Business" />
          <input type="text" placeholder="Position & Department" />
          <input type="text" placeholder="Employer/Business Address" />
          <input type="text" placeholder="Office Telephone No." />
          <input type="text" placeholder="Contact Person" />
          <input type="text" placeholder="Email Address" />
        </fieldset>

        {/* Employment & Financial */}
        <fieldset>
          <legend>Employment & Financial</legend>
          <input type="text" placeholder="Source of Income" />
          <input type="text" placeholder="Employment Type" />
          <input type="text" placeholder="Years in Service" />
          <input type="text" placeholder="Monthly Income" />
        </fieldset>

        {/* Property Details */}
        <fieldset>
          <legend>Property & Financing</legend>
          <input type="text" placeholder="Project Name & Location" />
          <input type="text" placeholder="Subdivision / Block / Lot / House Description" />
          <input type="text" placeholder="Lot Area" />
          <input type="text" placeholder="House Area" />
          <input type="text" placeholder="Total Contract Price" />
          <input type="text" placeholder="Down Payment" />
          <input type="text" placeholder="DP Term" />
          <input type="text" placeholder="Loan Amount" />
          <input type="text" placeholder="Monthly Amortization" />
          <select>
            <option value="">Financing Scheme</option>
            <option>PAG-IBIG</option>
            <option>In-House</option>
            <option>Other</option>
          </select>
        </fieldset>

        {/* Co-Borrower Information */}
        <fieldset>
          <legend>Co-Borrower (if any)</legend>
          <input type="text" placeholder="Last Name, First Name, Middle Name" />
          <input type="text" placeholder="Birthday" />
          <input type="text" placeholder="Gender" />
          <input type="text" placeholder="Place of Birth" />
          <input type="text" placeholder="Citizenship" />
          <input type="text" placeholder="Civil Status" />
          <input type="text" placeholder="Religion" />
          <input type="text" placeholder="Present Address" />
          <input type="text" placeholder="Contact No." />
          <input type="text" placeholder="Email Address" />
          <input type="text" placeholder="Source of Income" />
        </fieldset>

        {/* Character References */}
        <fieldset>
          <legend>Character References</legend>
          <input type="text" placeholder="Name" />
          <input type="text" placeholder="Address" />
          <input type="text" placeholder="Contact No." />
        </fieldset>

        {/* Signature Section */}
        <div className="signature-section">
          <p>I/We certify that the above information are true and correct.</p>
          <div className="signatures">
            <div>
              <label>Principal Buyer</label>
              <input type="text" placeholder="Signature over Printed Name" />
            </div>
            <div>
              <label>Spouse</label>
              <input type="text" placeholder="Signature over Printed Name" />
            </div>
            <div>
              <label>Co-Borrower</label>
              <input type="text" placeholder="Signature over Printed Name" />
            </div>
          </div>
        </div>

        <button type="submit" className="submit-btn">Submit Form</button>
      </form>
    </div>
  );
};

export default BuyersInformationForm;
