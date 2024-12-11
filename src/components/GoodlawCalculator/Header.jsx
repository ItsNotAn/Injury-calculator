import React, { useState, useEffect } from "react";
import styles from "./GoodlawCalculator.module.css";
import ProgressBar from "./ProgressBar";
import logo from "./Logo-image.png"

function Header({ estimatedCompensation, currentStep, totalSteps }) {
  const [currentMinAmount, setCurrentMinAmount] = useState(6000);
  const [currentMaxAmount, setCurrentMaxAmount] = useState(11000);
  const [animationFrame, setAnimationFrame] = useState(null);

  useEffect(() => {
    cancelAnimationFrame(animationFrame);

    const finalCompensation = parseCompensationRange(estimatedCompensation);
    const startTime = Date.now();

    const animateCompensation = () => {
      const elapsedTime = Date.now() - startTime;
      const progress = Math.min(elapsedTime / 2000, 1);

      const currentMin = Math.floor(
        currentMinAmount + (finalCompensation.min - currentMinAmount) * progress
      );
      const currentMax = Math.floor(
        currentMaxAmount + (finalCompensation.max - currentMaxAmount) * progress
      );

      setCurrentMinAmount(currentMin);
      setCurrentMaxAmount(currentMax);

      if (progress < 1) {
        const nextFrame = requestAnimationFrame(animateCompensation);
        setAnimationFrame(nextFrame);
      }
    };

    animateCompensation();
    // eslint-disable-next-line
  }, [estimatedCompensation]);

  const parseCompensationRange = (compensation) => {
    const regex = /\$(\d[\d,]*)\s*-\s*\$(\d[\d,]*)/;
    const match = compensation.match(regex);
    if (match) {
      const min = parseInt(match[1].replace(/,/g, ""));
      const max = parseInt(match[2].replace(/,/g, ""));
      return { min, max };
    }
    return { min: 10000, max: 10000 };
  };

  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <div className={styles.logoContainer}>
          <div className={styles.logoFrame}>
          <img src={logo} alt="react logo"  loading="lazy" className={styles.logoImage}/>
          </div>
          <h1 className={styles.calculatorTitle}>
            Personal Injury Fee Calculator
          </h1>
        </div>
        <div className={styles.progressCompensationRow}>
          <div className={styles.progressContainer}>
            <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
          </div>
          <div className={styles.compensationText}>
            <span>Estimated Compensation: </span>
            <strong style={{ marginLeft: "10px" }}>
              ${currentMinAmount.toLocaleString()} - $
              {currentMaxAmount.toLocaleString()}
            </strong>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
