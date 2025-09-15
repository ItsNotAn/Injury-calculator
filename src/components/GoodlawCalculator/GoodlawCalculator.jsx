import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./GoodlawCalculator.module.css";
import Header from "./Header";
import ExistingCaseForm from "./ExistingCaseForm";
import AccidentTimingForm from "./AccidentTimingForm";
import FaultForm from "./FaultForm";
import InjuryTypeForm from "./InjuryTypeForm";
import CommercialVehicleForm from "./CommercialVehicleForm";
import MedicalVisitsForm from "./MedicalVisitsForm";
import AccidentDetailsForm from "./AccidentDetailsForm";
import ContactForm from "./ContactForm";
import EndingPage from "./EndingPage";
import EndingPageHandledByAnotherAttorney from "./EndingPageHandledByAnotherAttorney";
import EndingPageWithAccidentMoreThanTwoYears from "./EndingPageWithAccidentMoreThanTwoYears";
import EndingPageExistingClient from "./EndingPageExistingClient";
import AttorneyRepresentationForm from "./AttorneyRepresentationForm";
import InjurySeverityForm from "./InjurySeverityForm";
import {
  calculateEstimatedCompensation,
  isFormComplete,
  submitForm,
} from "./utils";

function GoodlawCalculator() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({});
  const [estimatedCompensation, setEstimatedCompensation] =
    useState("$6,000 - $11,000");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isHandledByAnotherAttorney, setIsHandledByAnotherAttorney] =
    useState(false);
  const [isMoreThanTwoYears, setIsMoreThanTwoYears] = useState(false);
  const [isExistingClient, setIsExistingClient] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);

  useEffect(() => {
    const compensation = calculateEstimatedCompensation(formData);
    setEstimatedCompensation(compensation);
  }, [formData]);

  const handleNextStep = (data) => {
    setFormData({ ...formData, ...data });
    setCurrentStep(currentStep + 1);
  };

  const handleSubmitWithAnotherAttorney = (data) => {
    setFormData({ ...formData, ...data });
    setIsHandledByAnotherAttorney(true);
  };

  const handleSubmitWithMoreThanTwoYears = (data) => {
    setFormData({ ...formData, ...data });
    setIsMoreThanTwoYears(true);
  };

  const handleSubmitWithExistingClient = (data) => {
    setFormData({ ...formData, ...data });
    setIsExistingClient(true);
  };

  const handleSubmitForm = async (data) => {
    setFormData((prevData) => {
      const updatedData = { ...prevData, ...data };
      return updatedData;
    });

    setIsSubmitted(true);
    setIsConfirmed(true);

    // Call uet_report_conversion after setting submission state
    if (typeof window.uet_report_conversion === "function") {
      window.uet_report_conversion();
    }
    
    const newData = {...data, ...formData};
    try {
      await submitForm(
        newData,
        "http://localhost:5000/send-email",
        (error) => console.error("Error submitting form data:", error)
      );
    } catch (error) {
      console.error("Error during handleSubmitForm:", error);
    }
  };
  

  if (isSubmitted && isConfirmed) {
    return <EndingPage compensation={estimatedCompensation} />;
  }
  if (isHandledByAnotherAttorney ) {
    return <EndingPageHandledByAnotherAttorney formData={formData} />;
  }
  if (isMoreThanTwoYears) {
    return <EndingPageWithAccidentMoreThanTwoYears />;
  }
  if (isExistingClient) {
    return <EndingPageExistingClient />;
  }

  const renderForm = () => {
    switch (currentStep) {
      case 1:
        return (
          <ExistingCaseForm
            onNext={handleNextStep}
            onSubmit={handleSubmitWithExistingClient}
          />
        );
      case 2:
        return (
          <AccidentTimingForm
            onNext={handleNextStep}
            onSubmit={handleSubmitWithMoreThanTwoYears}
          />
        );
      case 3:
        return <FaultForm onNext={handleNextStep} />;
      case 4:
        return <InjuryTypeForm onNext={handleNextStep} />;
      case 5:
        return formData.injuryType === "commercial" ? (
          <CommercialVehicleForm onNext={handleNextStep} />
        ) : (
          <MedicalVisitsForm onNext={handleNextStep} />
        );
      case 6:
        return (
          <AttorneyRepresentationForm
            onNext={handleNextStep}
            onSubmit={handleSubmitWithAnotherAttorney}
          />
        );
      case 7:
        return <InjurySeverityForm onNext={handleNextStep} />;
      case 8:
        return <AccidentDetailsForm onNext={handleNextStep} />;
      case 9:
        return (
          <ContactForm
            isComplete={isFormComplete(formData)}
            handleSubmitForm={handleSubmitForm}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Header
          estimatedCompensation={estimatedCompensation}
          currentStep={currentStep}
          totalSteps={9}
        />
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 1, x: 0 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            {renderForm()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

export default GoodlawCalculator;
