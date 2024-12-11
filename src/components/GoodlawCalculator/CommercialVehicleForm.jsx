import React, { useState } from "react";
import styles from "./GoodlawCalculator.module.css";

function CommercialVehicleForm({ onNext, onPrevious }) {
  const [commercialVehicleType, setCommercialVehicleType] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (commercialVehicleType) {
      onNext({ commercialVehicleType });
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h2 className={styles.formTitle}>
        What type of commercial vehicle was involved?
      </h2>
      <div className={styles.radioGroup}>
        <label className={styles.radioLabel}>
          <input
            type="radio"
            name="commercialVehicleType"
            value="18wheeler"
            checked={commercialVehicleType === "18wheeler"}
            onChange={(e) => setCommercialVehicleType(e.target.value)}
            className={styles.radioInput}
          />
          <span className={styles.radioText}>18-wheeler</span>
        </label>
        <label className={styles.radioLabel}>
          <input
            type="radio"
            name="commercialVehicleType"
            value="uberLyft"
            checked={commercialVehicleType === "uberLyft"}
            onChange={(e) => setCommercialVehicleType(e.target.value)}
            className={styles.radioInput}
          />
          <span className={styles.radioText}>Uber/Lyft</span>
        </label>
        <label className={styles.radioLabel}>
          <input
            type="radio"
            name="commercialVehicleType"
            value="other"
            checked={commercialVehicleType === "other"}
            onChange={(e) => setCommercialVehicleType(e.target.value)}
            className={styles.radioInput}
          />
          <span className={styles.radioText}>Other</span>
        </label>
      </div>
      <div className={styles.buttonGroup}>
        <button
          type="button"
          onClick={onPrevious}
          className={styles.backButton}
        >
          Back
        </button>
        <button
          type="submit"
          className={styles.submitButton}
          disabled={!commercialVehicleType}
        >
          Next
        </button>
      </div>
    </form>
  );
}

export default CommercialVehicleForm;
