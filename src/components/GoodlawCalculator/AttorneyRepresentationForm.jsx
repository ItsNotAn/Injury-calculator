import React, { useState } from "react";
import { Scale, Gavel } from "tabler-icons-react";
import styles from "./GoodlawOptionStyle.module.css";

function AttorneyRepresentationForm({ onNext, onSubmit }) {
  const [hasAttorney, setHasAttorney] = useState("");

  const handleSelection = (value) => {
    setHasAttorney(value);
    onNext({ hasAttorney: value });
  };

  const renderIcon = (condition) => {
    switch (condition) {
      case "no":
        return <Gavel size={33} />;
      case "yes":
        return <Scale size={33} />;
      default:
        return null;
    }
  };

  return (
    <div className={styles["option-container"]}>
      <h2 className={styles.formTitle}>
        Are you currently represented by an attorney?
      </h2>

      <div
        className={`${styles.option} ${styles["option-no"]} ${hasAttorney === "no" ? styles.selected : ""}`}
        onClick={() => handleSelection("no")}
        tabIndex={0}
      >
        {renderIcon("no")}
        <span> No</span>
      </div>
      <div
        className={`${styles.option} ${styles["option-yes"]} ${hasAttorney === "yes" ? styles.selected : ""}`}
        onClick={() => onSubmit()}
        tabIndex={0}
      >
        {renderIcon("yes")}
        <span> Yes</span>
      </div>
    </div>
  );
}

export default AttorneyRepresentationForm;
