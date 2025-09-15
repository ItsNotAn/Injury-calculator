import React from "react";
import styles from "./GoodlawCalculator.module.css";

function EndingPageExistingClient() {
  return (
    <div className={styles.endingPage}>
      <h2 className={styles.thankYouMessage}>Existing Client</h2>
      
      <p className={styles.finalMessage}>
        Thank you for being our client! Since you already have an existing case with us, 
        please call our office directly for updates on your case.
      </p>
      
      <div className={styles.callMessage}>
        <p><strong>Phone:</strong> (770) 869-2325</p>
        <p><strong>Office Hours:</strong> Monday - Friday, 8:00 AM - 6:00 PM</p>
        <p>
          Our team will be happy to provide you with the latest updates on your case 
          and answer any questions you may have.
        </p>
      </div>
      
      <p className={styles.finalMessage}>
        Thank you for choosing Goodlaw!
      </p>
    </div>
  );
}

export default EndingPageExistingClient;
