import React, { useState } from "react";
import {
  CalendarOff,
  Clock,
  CalendarEvent,
  CalendarPlus,
  EmergencyBed,
  StethoscopeOff,
} from "tabler-icons-react";
import styles from "./GoodlawOptionStyle.module.css";

function MedicalVisitsForm({ onNext }) {
  const [medicalVisits, setMedicalVisits] = useState("");
  const [hadSurgery, setHadSurgery] = useState("");

  const handleMedicalVisitsSelection = (value) => {
    setMedicalVisits(value);
    if (value !== "none") {
      setHadSurgery("");
    } else {
      onNext({ medicalVisits: value });
    }
  };

  const handleSurgerySelection = (value) => {
    setHadSurgery(value);
    onNext({ medicalVisits, hadSurgery: value });
  };

  const renderIcon = (timing) => {
    switch (timing) {
      case "none":
        return <CalendarOff className={styles["option-icon"]} size={33} />;
      case "1-3":
        return <Clock className={styles["option-icon"]} size={33} />;
      case "4-6":
        return <CalendarEvent className={styles["option-icon"]} size={33} />;
      case "moreThan6":
        return <CalendarPlus className={styles["option-icon"]} size={33} />;
      case "yes":
        return <EmergencyBed className={styles["option-icon"]} size={33} />;
      case "no":
        return <StethoscopeOff className={styles["option-icon"]} size={33} />;
      default:
        return null;
    }
  };

  return (
    <div className={styles["option-container"]}>
      <h2 className={styles.formTitle}>
        Medical Visits
        <span className={styles.tooltip}>
          <span className={styles.icon}>i</span>
          <span className={styles.tooltiptext}>
            Providing details about your medical visit allows us to understand
            the extent of your injuries and how they may affect your claim. It
            helps to establish a timeline for treatment and ensures we can offer
            the appropriate legal or insurance advice based on your medical
            records and visits.
          </span>
        </span>
      </h2>

      <div
        className={`${styles.option} ${styles["option-none"]} ${medicalVisits === "none" ? styles.selected : ""}`}
        onClick={() => handleMedicalVisitsSelection("none")}
        tabIndex={0}
      >
        {renderIcon("none")}
        <span>No doctor visits</span>
      </div>

      <div
        className={`${styles.option} ${styles["option-1-3"]} ${medicalVisits === "1-3" ? styles.selected : ""}`}
        onClick={() => handleMedicalVisitsSelection("1-3")}
        tabIndex={0}
      >
        {renderIcon("1-3")}
        <span>1-3 visits</span>
      </div>

      <div
        className={`${styles.option} ${styles["option-4-6"]} ${medicalVisits === "4-6" ? styles.selected : ""}`}
        onClick={() => handleMedicalVisitsSelection("4-6")}
        tabIndex={0}
      >
        {renderIcon("4-6")}
        <span>4-6 visits</span>
      </div>

      <div
        className={`${styles.option} ${styles["option-moreThan6"]} ${medicalVisits === "moreThan6" ? styles.selected : ""}`}
        onClick={() => handleMedicalVisitsSelection("moreThan6")}
        tabIndex={0}
      >
        {renderIcon("moreThan6")}
        <span>More than 6 visits</span>
      </div>

      {medicalVisits && medicalVisits !== "none" && (
        <>
          <h2 className={styles.formTitle}>Did you have any surgeries/procedures?</h2>
          <div
            className={`${styles.option} ${styles["option-yes"]} ${hadSurgery === "yes" ? styles.selected : ""}`}
            onClick={() => handleSurgerySelection("yes")}
            tabIndex={0}
          >
            {renderIcon("yes")}
            <span>Yes</span>
          </div>
          <div
            className={`${styles.option} ${styles["option-no"]} ${hadSurgery === "no" ? styles.selected : ""}`}
            onClick={() => handleSurgerySelection("no")}
            tabIndex={0}
          >
            {renderIcon("no")}
            <span>No</span>
          </div>
        </>
      )}
    </div>
  );
}

export default MedicalVisitsForm;
