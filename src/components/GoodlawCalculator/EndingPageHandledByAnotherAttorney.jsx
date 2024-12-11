import React from "react";
import ContactForm from "./ContactForm";
import { submitForm } from "./utils";
import styles from "./GoodlawCalculator.module.css";

const EndingPageHandledByAnotherAttorney = (formData) => {
  const handleSubmitForm = async (formData) => {
    try {
      await submitForm(
        formData,
        "https://770goodlaw.com/wp-json/goodlaw/v1/submit",
        () => {
          console.log("Form data submitted successfully.");
        },
        (error) => console.error("Error submitting form data:", error)
      );
    } catch (error) {
      console.error("Error during handleSubmitForm:", error);
    }
  };
  return (
    <>
      <div className={styles.endingPage}>
        <h2 className={styles.thankYouMessage}>
          Thank you for taking the time to complete our survey!
        </h2>
        <p className={styles.callMessage}>
          We appreciate your interest in our services. However, as you are
          already represented by an attorney, we are unable to assist you at
          this time. If you would like to discuss your legal needs further or
          consider our services in the future, please feel free to contact us
          directly. We would be happy to provide you with more information.
        </p>
      </div>
      <ContactForm handleSubmitForm={handleSubmitForm} />
    </>
  );
};

export default EndingPageHandledByAnotherAttorney;
