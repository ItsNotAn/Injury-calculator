import React from "react";
import styles from "./GoodlawCalculator.module.css";

function ProgressBar({ currentStep, totalSteps }) {
  const validCurrentStep =
    typeof currentStep === "number" && currentStep >= 1 ? currentStep : 1;
  const validTotalSteps =
    typeof totalSteps === "number" && totalSteps >= 1 ? totalSteps : 1;

  const percentage = (validCurrentStep / (validTotalSteps + 1)) * 100;

  const finalPercentage = Math.min(Math.max(percentage, 0), 100);

  const circleRadius = 55;
  const strokeWidth = 8;
  const circumference = 2 * Math.PI * circleRadius;
  const offset = circumference - (finalPercentage / 100) * circumference;

  return (
    <div className={styles.progressBarContainer}>
      <svg
        className={styles.circularProgressBar}
        width="120"
        height="120"
        viewBox="0 0 120 120"
      >
        <circle
          className={styles.backgroundCircle}
          cx="60"
          cy="60"
          r={circleRadius}
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        <circle
          className={styles.filledCircle}
          cx="60"
          cy="60"
          r={circleRadius}
          strokeWidth={strokeWidth}
          fill="transparent"
          style={{ strokeDasharray: circumference, strokeDashoffset: offset }}
        />
      </svg>
      <div className={styles.percentageText}>
        {Math.round(finalPercentage)}%
      </div>
    </div>
  );
}

export default ProgressBar;
