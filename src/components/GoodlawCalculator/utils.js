export function getProgressPercentage(currentStep, totalSteps) {
  return (currentStep / totalSteps) * 100;
}

export function isFormComplete(formData) {
  const requiredFields = [
    "accidentTiming",
    "fault",
    "injuryType",
    "medicalVisits",
    "hasAttorney",
    "injurySeverity",
    "fullName",
    "phoneNumber",
    "email",
    "state",
  ];

  return requiredFields.every((field) => formData[field]);
}

export const submitForm = async (data, url, onSuccess, onFailure) => {
  const finalFormData = { ...data };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...finalFormData,
        compensation: "Estimated compensation",
      }),
    });

    if (response.ok) {
      console.log("Form submitted successfully:", finalFormData);
      if (onSuccess) onSuccess(finalFormData);
    } else {
      const errorData = await response.json();
      console.error("Failed to submit form:", errorData);
      if (onFailure) onFailure(errorData);
    }
  } catch (error) {
    console.error("An error occurred during form submission:", error);
    if (onFailure) onFailure(error);
  }
};

export function calculateEstimatedCompensation(formData) {
  let baseAmount = 10000;

  if (formData.accidentTiming === "within1week") {
    baseAmount += 5870;
  } else if (formData.accidentTiming === "1-3months") {
    baseAmount += 3200;
  }

  if (formData.fault === "no") {
    baseAmount += 2000;
  }

  if (formData.injuryType === "truck") {
    baseAmount *= 1.8;
  }

  if (formData.injuryType === "commercial") {
    baseAmount *= 1.5;
  }

  if (formData.medicalVisits === "1-3") {
    baseAmount *= 1.3;
  }

  if (formData.medicalVisits === "4-6") {
    baseAmount *= 1.5;
  }

  if (formData.medicalVisits === "moreThan6") {
    baseAmount *= 2.1;
  }

  if (formData.hadSurgery === "yes") {
    baseAmount *= 2;
  }

  if (formData.injurySeverity === "brokenBones") {
    baseAmount *= 1.3;
  }

  if (formData.injurySeverity === "headInjuries") {
    baseAmount *= 2;
  }

  const minAmount = Math.round(baseAmount * 0.6);
  const maxAmount = Math.round(baseAmount * 1.1);

  return `$${minAmount.toLocaleString()} - $${maxAmount.toLocaleString()}`;
}
