import React, { useState } from "react";
import {
  Calendar,
  Clock,
  CalendarEvent,
  CalendarPlus,
  CalendarTime,
  CalendarOff,
} from "tabler-icons-react";
import styles from "./GoodlawOptionStyle.module.css";

function AccidentTimingForm({ onNext, onSubmit }) {
  const [selectedTiming, setSelectedTiming] = useState(null);

  const handleSelection = (timing) => {
    setSelectedTiming(timing);
    onNext({ accidentTiming: timing });
  };

  const renderIcon = (timing) => {
    switch (timing) {
      case "within1week":
        return <Clock size={33} />;
      case "1-3months":
        return <Calendar size={33} />;
      case "moreThan3months":
        return <CalendarEvent size={33} />;
      case "4-6months":
        return <CalendarPlus size={33} />;
      case "upTo1year":
        return <CalendarTime size={33} />;
      case "moreThan2years":
        return <CalendarOff size={33} />;
      default:
        return null;
    }
  };

  return (
    <div className={styles["option-container"]}>
      <h2 className={styles.formTitle}>
        Select Accident Timing
        <span className={styles.tooltip}>
          <span className={styles.icon}>i</span>
          <span className={styles.tooltiptext}>
            Timing is crucial as it impacts the availability of evidence, the
            validity of legal and insurance deadlines, and the effectiveness of
            medical treatment documentation. Providing the right timeframe helps
            streamline the process and ensures that all relevant details are
            addressed within appropriate windows, reducing potential delays or
            complications.
          </span>
        </span>
      </h2>

      <div
        className={`${styles.option} ${styles["option-within1week"]} ${
          selectedTiming === "within1week" ? styles.selected : ""
        }`}
        onClick={() => handleSelection("within1week")}
        tabIndex={0}
      >
        {renderIcon("within1week")}
        <span>Within 1 Week</span>
      </div>

      <div
        className={`${styles.option} ${styles["option-1-3months"]} ${
          selectedTiming === "1-3months" ? styles.selected : ""
        }`}
        onClick={() => handleSelection("1-3months")}
        tabIndex={0}
      >
        {renderIcon("1-3months")}
        <span>1-3 Months</span>
      </div>

      <div
        className={`${styles.option} ${styles["option-4-6months"]} ${
          selectedTiming === "4-6months" ? styles.selected : ""
        }`}
        onClick={() => handleSelection("4-6months")}
        tabIndex={0}
      >
        {renderIcon("4-6months")}
        <span>4-6 Months</span>
      </div>

      <div
        className={`${styles.option} ${styles["option-upTo1year"]} ${
          selectedTiming === "upTo1year" ? styles.selected : ""
        }`}
        onClick={() => handleSelection("upTo1year")}
        tabIndex={0}
      >
        {renderIcon("upTo1year")}
        <span>Up to 1 Year</span>
      </div>

      <div
        className={`${styles.option} ${styles["option-moreThan2years"]} ${
          selectedTiming === "moreThan2years" ? styles.selected : ""
        }`}
        onClick={() => onSubmit()}
        tabIndex={0}
      >
        {renderIcon("moreThan2years")}
        <span>More than 2 Years</span>
      </div>
    </div>
  );
}

export default AccidentTimingForm;
