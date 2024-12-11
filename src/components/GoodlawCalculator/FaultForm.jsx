import React, { useState } from "react";
import { MoodSad, MoodHappy } from "tabler-icons-react";
import styles from "./GoodlawOptionStyle.module.css";

const renderIcon = (condition) => {
  switch (condition) {
    case "no":
      return <MoodHappy size={45} />;
    case "yes":
      return <MoodSad size={45} />;

    default:
      return null;
  }
};

function FaultForm({ onNext }) {
  const [selectedFault, setSelectedFault] = useState(null);

  const handleSelection = (fault) => {
    setSelectedFault(fault);
    onNext({ fault });
  };

  return (
    <div className={styles["option-container"]}>
      <h2 className={styles.formTitle}>Was it your fault?</h2>
      <div
        className={`${styles.option} ${styles["option-yes"]}${selectedFault === "yes" ? styles.selected : ""}`}
        onClick={() => handleSelection("yes")}
        tabIndex={0}
      >
        {renderIcon("yes")}
        <span> Yes</span>
      </div>
      <div
        className={`${styles.option} ${styles["option-no"]}${selectedFault === "no" ? styles.selected : ""}`}
        onClick={() => handleSelection("no")}
        tabIndex={0}
      >
        {renderIcon("no")}
        <span> No</span>
      </div>
    </div>
  );
}

export default FaultForm;
