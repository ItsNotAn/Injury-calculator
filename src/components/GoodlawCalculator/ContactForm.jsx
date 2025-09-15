// In ContactForm.jsx
import React, { useState } from "react";
import { UserCheck, UserX, Phone, Mail, MapPin, User } from "tabler-icons-react";
import styles from "./GoodlawOptionStyle.module.css";

function ContactForm({ handleSubmitForm }) {
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [state, setState] = useState("");
  const [accidentInUS, setAccidentInUS] = useState(null);
  const [phoneError, setPhoneError] = useState("");

  // US phone number validation
  const validateUSPhoneNumber = (phone) => {
    // Remove all non-digits
    const digitsOnly = phone.replace(/\D/g, '');
    
    // Check if it's a valid US phone number (10 digits)
    return digitsOnly.length === 10;
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    
    // Remove all non-digits
    const digitsOnly = value.replace(/\D/g, '');
    
    // Format the phone number
    let formattedNumber = '';
    if (digitsOnly.length <= 3) {
      formattedNumber = digitsOnly;
    } else if (digitsOnly.length <= 6) {
      formattedNumber = `(${digitsOnly.slice(0, 3)}) ${digitsOnly.slice(3)}`;
    } else {
      formattedNumber = `(${digitsOnly.slice(0, 3)}) ${digitsOnly.slice(3, 6)}-${digitsOnly.slice(6, 10)}`;
    }
    
    setPhoneNumber(formattedNumber);
    
    // Validate the number
    if (digitsOnly.length > 0 && digitsOnly.length !== 10) {
      setPhoneError("Please enter a complete 10-digit US phone number");
    } else {
      setPhoneError("");
    }
  };

  const handleAccidentLocationSelection = (option) => {
    setAccidentInUS(option);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate accident location requirement
    if (accidentInUS !== "yes") {
      alert("We only handle cases for accidents that occurred in the United States. Please contact us if you have questions about international cases.");
      return;
    }
    
    // Validate phone number
    if (!validateUSPhoneNumber(phoneNumber)) {
      setPhoneError("Please enter a valid US phone number");
      return;
    }
    
    if (fullName && phoneNumber && email && state && accidentInUS === "yes") {
      handleSubmitForm({ fullName, phoneNumber, email, state, accidentInUS });
    }
  };

  return (
    <div className={styles["option-container"]}>
      <h2 className={styles.formTitle}>
        Contact Information
        <span className={styles.tooltip}>
          <span className={styles.icon}>i</span>
          <span className={styles.tooltiptext}>
            We need your contact information to reach you about your case. 
            We only handle cases for accidents that occurred in the United States.
          </span>
        </span>
      </h2>

      {/* Accident Location Check */}
      <div className={styles.inputGroup}>
        <label className={styles.label}>
          Did the accident happen in the United States? *
        </label>
        <div className={styles.optionRow}>
          <div
            className={`${styles.option} ${styles["option-yes"]} ${
              accidentInUS === "yes" ? styles.selected : ""
            }`}
            onClick={() => handleAccidentLocationSelection("yes")}
            tabIndex={0}
          >
            <UserCheck size={24} />
            <span>Yes, the accident happened in the US</span>
          </div>
          
          <div
            className={`${styles.option} ${styles["option-no"]} ${
              accidentInUS === "no" ? styles.selected : ""
            }`}
            onClick={() => handleAccidentLocationSelection("no")}
            tabIndex={0}
          >
            <UserX size={24} />
            <span>No, the accident happened outside the US</span>
          </div>
        </div>
        {accidentInUS === "no" && (
          <p className={styles.errorMessage}>
            We only handle cases for accidents that occurred in the United States. 
            Please contact us directly if you have questions about international cases.
          </p>
        )}
      </div>

      {/* Full Name */}
      <div className={styles.inputGroup}>
        <label htmlFor="fullName" className={styles.label}>
          Full Name *
        </label>
        <div className={styles.inputWrapper}>
          <User size={20} className={styles.inputIcon} />
          <input
            type="text"
            id="fullName"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className={styles.textInput}
            required
            placeholder="Enter your full name"
          />
        </div>
      </div>
      
      {/* Phone Number */}
      <div className={styles.inputGroup}>
        <label htmlFor="phoneNumber" className={styles.label}>
          US Phone Number *
        </label>
        <div className={styles.inputWrapper}>
          <Phone size={20} className={styles.inputIcon} />
          <input
            type="tel"
            id="phoneNumber"
            value={phoneNumber}
            onChange={handlePhoneChange}
            className={`${styles.textInput} ${phoneError ? styles.inputError : ''}`}
            required
            placeholder="(555) 123-4567"
          />
        </div>
        {phoneError && <p className={styles.errorMessage}>{phoneError}</p>}
        <small className={styles.helpText}>
          Please enter a valid US phone number. We only handle US cases.
        </small>
      </div>
      
      {/* Email */}
      <div className={styles.inputGroup}>
        <label htmlFor="email" className={styles.label}>
          Email Address *
        </label>
        <div className={styles.inputWrapper}>
          <Mail size={20} className={styles.inputIcon} />
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.textInput}
            required
            placeholder="your.email@example.com"
          />
        </div>
      </div>
      
      {/* State */}
      <div className={styles.inputGroup}>
        <label htmlFor="state" className={styles.label}>
          What state are you in? *
        </label>
        <div className={styles.inputWrapper}>
          <MapPin size={20} className={styles.inputIcon} />
          <select
            id="state"
            value={state}
            onChange={(e) => setState(e.target.value)}
            className={styles.textInput}
            required
          >
            <option value="" disabled>
              Select your state
            </option>
            <option value="AL">Alabama</option>
            <option value="AK">Alaska</option>
            <option value="AZ">Arizona</option>
            <option value="AR">Arkansas</option>
            <option value="CA">California</option>
            <option value="CO">Colorado</option>
            <option value="CT">Connecticut</option>
            <option value="DE">Delaware</option>
            <option value="FL">Florida</option>
            <option value="GA">Georgia</option>
            <option value="HI">Hawaii</option>
            <option value="ID">Idaho</option>
            <option value="IL">Illinois</option>
            <option value="IN">Indiana</option>
            <option value="IA">Iowa</option>
            <option value="KS">Kansas</option>
            <option value="KY">Kentucky</option>
            <option value="LA">Louisiana</option>
            <option value="ME">Maine</option>
            <option value="MD">Maryland</option>
            <option value="MA">Massachusetts</option>
            <option value="MI">Michigan</option>
            <option value="MN">Minnesota</option>
            <option value="MS">Mississippi</option>
            <option value="MO">Missouri</option>
            <option value="MT">Montana</option>
            <option value="NE">Nebraska</option>
            <option value="NV">Nevada</option>
            <option value="NH">New Hampshire</option>
            <option value="NJ">New Jersey</option>
            <option value="NM">New Mexico</option>
            <option value="NY">New York</option>
            <option value="NC">North Carolina</option>
            <option value="ND">North Dakota</option>
            <option value="OH">Ohio</option>
            <option value="OK">Oklahoma</option>
            <option value="OR">Oregon</option>
            <option value="PA">Pennsylvania</option>
            <option value="RI">Rhode Island</option>
            <option value="SC">South Carolina</option>
            <option value="SD">South Dakota</option>
            <option value="TN">Tennessee</option>
            <option value="TX">Texas</option>
            <option value="UT">Utah</option>
            <option value="VT">Vermont</option>
            <option value="VA">Virginia</option>
            <option value="WA">Washington</option>
            <option value="WV">West Virginia</option>
            <option value="WI">Wisconsin</option>
            <option value="WY">Wyoming</option>
          </select>
        </div>
      </div>
      
      <div className={styles.buttonGroup}>
        <button
          type="submit"
          className={styles.submitButton}
          disabled={!fullName || !phoneNumber || !email || !state || accidentInUS !== "yes" || phoneError}
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default ContactForm;
