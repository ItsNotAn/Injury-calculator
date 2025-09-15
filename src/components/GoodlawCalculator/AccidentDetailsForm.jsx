import React, { useState } from "react";
import styles from "./GoodlawCalculator.module.css";

function AccidentDetailsForm({ onNext }) {
  const [accidentDetails, setAccidentDetails] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (accidentDetails.trim()) {
      onNext({ accidentDetails: accidentDetails.trim() });
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h2 className={styles.formTitle}>Accident Details</h2>
      <p className={styles.formDescription}>
        Please provide a brief description of your accident. This helps us better understand your case and provide more accurate assistance.
      </p>
      
      <div className={styles.inputGroup}>
        <label htmlFor="accidentDetails" className={styles.label}>
          Describe what happened in the accident *
        </label>
        <textarea
          id="accidentDetails"
          value={accidentDetails}
          onChange={(e) => setAccidentDetails(e.target.value)}
          className={styles.textarea}
          placeholder="Please describe the accident, including what happened, where it occurred, and any relevant details..."
          rows={6}
          required
        />
      </div>
      
      <div className={styles.buttonGroup}>
        <button
          type="submit"
          className={styles.submitButton}
          disabled={!accidentDetails.trim()}
        >
          Continue
        </button>
      </div>
    </form>
  );
}

export default AccidentDetailsForm;
