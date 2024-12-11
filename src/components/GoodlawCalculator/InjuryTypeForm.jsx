import React, { useState } from "react";
import { Car, Bike, Truck, Motorbike, UserOff } from "tabler-icons-react"; // Importing Tabler Icons
import styles from "./GoodlawOptionStyle.module.css";

function InjuryTypeForm({ onNext }) {
  const [selectedInjury, setSelectedInjury] = useState(null);

  const handleSelection = (injuryType) => {
    setSelectedInjury(injuryType);
    // Automatically proceed to the next step
    onNext({ injuryType });
  };

  return (
    <div className={styles["option-container"]}>
      <h2 className={styles.formTitle}>
        How were you hurt?
        <span className={styles.tooltip}>
          <span className={styles.icon}>i</span>
          <span className={styles.tooltiptext}>
            Understanding how you were hurt helps us categorize the incident and
            tailor the process to your specific situation. Different types of
            injuries may have unique legal considerations, insurance
            implications, and medical documentation requirements.
          </span>
        </span>
      </h2>
      <div
        className={`${styles.option} ${styles["option-automobile"]}${selectedInjury === "automobile" ? styles.selected : ""}`}
        onClick={() => handleSelection("automobile")}
        tabIndex={0}
      >
        <Car size={33} />
        <span>Automobile</span>
      </div>
      <div
        className={`${styles.option} ${styles["option-bikePedestrian"]}${selectedInjury === "bikePedestrian" ? styles.selected : ""}`}
        onClick={() => handleSelection("bikePedestrian")}
        tabIndex={0}
      >
        <Bike size={33} />
        <span>Bike/Pedestrian</span>
      </div>
      <div
        className={`${styles.option} ${styles["option-motorcycle"]}${selectedInjury === "motorcycle" ? styles.selected : ""}`}
        onClick={() => handleSelection("motorcycle")}
        tabIndex={0}
      >
        <Motorbike size={33} />
        <span>Motorcycle</span>
      </div>
      <div
        className={`${styles.option} ${styles["option-truck"]}${selectedInjury === "truck" ? styles.selected : ""}`}
        onClick={() => handleSelection("truck")}
        tabIndex={0}
      >
        <Truck size={33} />
        <span>Truck</span>
      </div>
      <div
        className={`${styles.option} ${styles["option-fallSlip"]}${selectedInjury === "fallSlip" ? styles.selected : ""}`}
        onClick={() => handleSelection("fallSlip")}
        tabIndex={0}
      >
        <UserOff size={33} />
        <span>Fall or Slip</span>
      </div>
    </div>
  );
}

export default InjuryTypeForm;
