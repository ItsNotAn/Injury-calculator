import React from "react";
import styles from "./GoodlawCalculator.module.css";

const EndingPageWithAccidentMoreThanTwoYears = () => {
  return (
    <div className={styles.endingPage}>
      <h2 className={styles.thankYouMessage}>
        We understand your situation and appreciate you reaching out to us.
        However, unfortunately, we are unable to assist with cases that occurred
        more than two years ago!
      </h2>
      <p className={styles.callMessage}>
        This is due to the statute of limitations, which is a legal timeframe
        within which a lawsuit must be filed. Once this timeframe passes, it's
        generally too late to pursue legal action, regardless of the
        circumstances. This is because evidence can become stale, witnesses may
        become unavailable, and legal rights may be lost over time.
      </p>
    </div>
  );
};

export default EndingPageWithAccidentMoreThanTwoYears;
