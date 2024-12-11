import React from "react";
import styles from "./GoodlawCalculator.module.css";

const EndingPage = ({ compensation }) => {
  return (
    <div className={styles.endingPage}>
      <h2 className={styles.thankYouMessage}>Thank You!</h2>
      <p className={styles.finalMessage}>
        Your estimated compensation is:
        <strong className={styles.finalCompensation}> {compensation}</strong>
      </p>
      <p className={styles.callMessage}>
        We will be calling you shortly. Please leave your phone on loud and
        answer immediately.
      </p>
    </div>
  );
};

export default EndingPage;
