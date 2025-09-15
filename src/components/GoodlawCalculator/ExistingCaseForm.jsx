import React, { useState } from "react";
import { UserCheck, UserPlus } from "tabler-icons-react";
import styles from "./GoodlawOptionStyle.module.css";

function ExistingCaseForm({ onNext, onSubmit }) {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleSelection = (option) => {
    setSelectedOption(option);
    if (option === "yes") {
      onSubmit({ hasExistingCase: option });
    } else {
      onNext({ hasExistingCase: option });
    }
  };

  const renderIcon = (option) => {
    switch (option) {
      case "yes":
        return <UserCheck size={33} />;
      case "no":
        return <UserPlus size={33} />;
      default:
        return null;
    }
  };

  return (
    <div className={styles["option-container"]}>
      <h2 className={styles.formTitle}>
        Existing Case Check
        <span className={styles.tooltip}>
          <span className={styles.icon}>i</span>
          <span className={styles.tooltiptext}>
            We need to determine if you're an existing client to provide the most appropriate assistance. 
            If you already have a case with us, we'll direct you to call our office for updates. 
            If this is a new case, you can proceed with our injury calculator.
          </span>
        </span>
      </h2>

      <div
        className={`${styles.option} ${styles["option-yes"]} ${
          selectedOption === "yes" ? styles.selected : ""
        }`}
        onClick={() => handleSelection("yes")}
        tabIndex={0}
      >
        {renderIcon("yes")}
        <span>Yes, I have an existing case</span>
      </div>

      <div
        className={`${styles.option} ${styles["option-no"]} ${
          selectedOption === "no" ? styles.selected : ""
        }`}
        onClick={() => handleSelection("no")}
        tabIndex={0}
      >
        {renderIcon("no")}
        <span>No, this is a new case</span>
      </div>
    </div>
  );
}

export default ExistingCaseForm;
