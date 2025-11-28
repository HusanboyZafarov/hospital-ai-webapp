import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { OnboardingScreen } from "./OnboardingScreen";

export const OnboardingWrapper = () => {
  const [step, setStep] = useState(0);
  const navigate = useNavigate();

  const handleNext = () => {
    if (step < 2) {
      setStep(step + 1);
    }
  };

  const handleComplete = () => {
    // Check if user has seen onboarding before
    localStorage.setItem("onboarding_completed", "true");
    navigate("/signin");
  };

  return (
    <OnboardingScreen
      step={step}
      onNext={handleNext}
      onComplete={handleComplete}
    />
  );
};
