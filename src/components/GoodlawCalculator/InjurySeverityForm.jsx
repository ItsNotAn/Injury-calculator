import React, { useState } from "react";
import { Heart, Skull, Bone, BuildingHospital } from "tabler-icons-react"; // Import relevant icons
import styles from "./GoodlawOptionStyle.module.css";

function InjurySeverityForm({ onNext }) {
  const [injurySeverity, setInjurySeverity] = useState("");

  const handleSelection = (value) => {
    setInjurySeverity(value);
    onNext({ injurySeverity: value });
  };

  const renderIcon = (severity) => {
    switch (severity) {
      case "softTissue":
        return <Heart size={33} />;
      case "brokenBones":
        return <Bone size={33} />;
      case "headInjuries":
        return <Skull size={33} />;
      case "other":
        return <BuildingHospital size={33} />;
      default:
        return null;
    }
  };

  return (
    <div className={styles["option-container"]}>
      <h2 className={styles.formTitle}>
        What type of injuries did you sustain?
        <span className={styles.tooltip}>
          <span className={styles.icon}>i</span>
          <span className={styles.tooltiptext}>
            The severity of your injuries as well as how long
            it takes to recover from your injury directly determines how much
            compensation you are entitled to. It is always advised to speak with
            an attorney if you were injured in an accident, even if insurance is
            helping take care of the bills.
          </span>
        </span>
      </h2>

      <div
        className={`${styles.option} ${styles["option-softTissue"]} ${injurySeverity === "softTissue" ? styles.selected : ""}`}
        onClick={() => handleSelection("softTissue")}
        tabIndex={0}
      >
        {renderIcon("softTissue")}
        <span>Soft tissue injuries</span>
      </div>

      <div
        className={`${styles.option} ${styles["option-brokenBones"]} ${injurySeverity === "brokenBones" ? styles.selected : ""}`}
        onClick={() => handleSelection("brokenBones")}
        tabIndex={0}
      >
        {renderIcon("brokenBones")}
        <span>Broken bones</span>
      </div>

      <div
        className={`${styles.option} ${styles["option-headInjuries"]} ${injurySeverity === "headInjuries" ? styles.selected : ""}`}
        onClick={() => handleSelection("headInjuries")}
        tabIndex={0}
      >
        {renderIcon("headInjuries")}
        <span>Head injuries</span>
      </div>

      <div
        className={`${styles.option} ${styles["option-other"]} ${injurySeverity === "other" ? styles.selected : ""}`}
        onClick={() => handleSelection("other")}
        tabIndex={0}
      >
        {renderIcon("other")}
        <span>Other</span>
      </div>
    </div>
  );
}

export default InjurySeverityForm;
