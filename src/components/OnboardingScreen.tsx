import React from "react";
import { Heart, Brain, CheckCircle } from "lucide-react";

interface OnboardingScreenProps {
  step: number;
  onNext: () => void;
  onComplete: () => void;
}

export function OnboardingScreen({
  step,
  onNext,
  onComplete,
}: OnboardingScreenProps) {
  const screens = [
    {
      icon: Heart,
      title: "Sizning shaxsiy tiklanish yordamchingiz",
      subtitle:
        "Dori-darmonlar, ovqatlanish, faoliyatlar va tiklanishni osonlik bilan kuzatib boring.",
    },
    {
      icon: Brain,
      title: "Aqlli tiklanish",
      subtitle:
        "AI sizga parvarish rejangizni xavfsiz ravishda bajarishda yordam beradi.",
    },
    {
      icon: CheckCircle,
      title: "Rejada qoling",
      subtitle:
        "Eslatmalar, ogohlantirishlar, ko'rsatmalar — hammasi bir joyda.",
    },
  ];

  const currentScreen = screens[step];
  const Icon = currentScreen.icon;

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen px-4"
      style={{ backgroundColor: "var(--bg-white)" }}
    >
      <div className="flex flex-col items-center text-center max-w-sm">
        <div
          className="flex items-center justify-center mb-12"
          style={{
            width: "120px",
            height: "120px",
            borderRadius: "24px",
            backgroundColor: "var(--bg-light)",
          }}
        >
          <Icon
            size={64}
            style={{ color: "var(--primary-blue)" }}
            strokeWidth={1.5}
          />
        </div>

        <h1 className="mb-4">{currentScreen.title}</h1>
        <p style={{ color: "var(--muted-text)", fontSize: "16px" }}>
          {currentScreen.subtitle}
        </p>

        <div className="flex gap-2 mt-12 mb-16">
          {screens.map((_, index) => (
            <div
              key={index}
              style={{
                width: index === step ? "32px" : "8px",
                height: "8px",
                borderRadius: "4px",
                backgroundColor:
                  index === step ? "var(--primary-blue)" : "var(--border-grey)",
                transition: "all 0.3s ease",
              }}
            />
          ))}
        </div>

        <button
          onClick={step === screens.length - 1 ? onComplete : onNext}
          className="w-full"
          style={{
            backgroundColor: "var(--primary-blue)",
            color: "white",
            padding: "16px",
            borderRadius: "12px",
            border: "none",
            cursor: "pointer",
            fontSize: "16px",
            fontWeight: "500",
          }}
        >
          {step === screens.length - 1 ? "Davom etish" : "Boshlash"}
        </button>
      </div>
    </div>
  );
}
