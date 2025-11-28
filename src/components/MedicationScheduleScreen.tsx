import { ArrowLeft, Sunrise, Sun, Moon } from "lucide-react";
import React from "react";

interface MedicationScheduleScreenProps {
  onBack: () => void;
}

export function MedicationScheduleScreen({
  onBack,
}: MedicationScheduleScreenProps) {
  const schedule = [
    {
      day: "Today - Nov 28",
      medications: [
        {
          period: "Morning",
          icon: Sunrise,
          meds: ["Amoxicillin 500mg - 8:00 AM", "Vitamin D 1000 IU - 8:00 AM"],
        },
        { period: "Afternoon", icon: Sun, meds: ["Ibuprofen 400mg - 2:00 PM"] },
        {
          period: "Evening",
          icon: Moon,
          meds: ["Amoxicillin 500mg - 8:00 PM"],
        },
      ],
    },
    {
      day: "Tomorrow - Nov 29",
      medications: [
        {
          period: "Morning",
          icon: Sunrise,
          meds: ["Amoxicillin 500mg - 8:00 AM", "Vitamin D 1000 IU - 8:00 AM"],
        },
        { period: "Afternoon", icon: Sun, meds: ["Ibuprofen 400mg - 2:00 PM"] },
        {
          period: "Evening",
          icon: Moon,
          meds: ["Amoxicillin 500mg - 8:00 PM"],
        },
      ],
    },
    {
      day: "Saturday - Nov 30",
      medications: [
        {
          period: "Morning",
          icon: Sunrise,
          meds: ["Amoxicillin 500mg - 8:00 AM", "Vitamin D 1000 IU - 8:00 AM"],
        },
        { period: "Afternoon", icon: Sun, meds: ["Ibuprofen 400mg - 2:00 PM"] },
        {
          period: "Evening",
          icon: Moon,
          meds: ["Amoxicillin 500mg - 8:00 PM"],
        },
      ],
    },
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "var(--bg-light)",
        paddingBottom: "32px",
      }}
    >
      {/* Header */}
      <div
        style={{
          backgroundColor: "var(--bg-white)",
          padding: "16px",
          paddingTop: "24px",
          borderBottom: "1px solid var(--border-grey)",
        }}
      >
        <button
          onClick={onBack}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            color: "var(--primary-blue)",
            padding: 0,
            marginBottom: "12px",
            fontWeight: "500",
          }}
        >
          <ArrowLeft size={20} />
          Back
        </button>
        <h2>Full Schedule</h2>
      </div>

      <div style={{ padding: "16px" }}>
        {schedule.map((daySchedule, dayIndex) => (
          <div key={dayIndex} style={{ marginBottom: "24px" }}>
            <h3 style={{ marginBottom: "12px", color: "var(--dark-text)" }}>
              {daySchedule.day}
            </h3>

            <div
              style={{ display: "flex", flexDirection: "column", gap: "12px" }}
            >
              {daySchedule.medications.map((periodData, periodIndex) => {
                const Icon = periodData.icon;
                return (
                  <div
                    key={periodIndex}
                    style={{
                      backgroundColor: "var(--bg-white)",
                      borderRadius: "16px",
                      padding: "16px",
                      boxShadow: "0 4px 16px rgba(0,0,0,0.05)",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        marginBottom: "12px",
                      }}
                    >
                      <Icon
                        size={20}
                        style={{ color: "var(--primary-blue)" }}
                      />
                      <h3>{periodData.period}</h3>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "8px",
                      }}
                    >
                      {periodData.meds.map((med, medIndex) => (
                        <div
                          key={medIndex}
                          style={{
                            padding: "12px",
                            backgroundColor: "var(--bg-light)",
                            borderRadius: "12px",
                          }}
                        >
                          <p>{med}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
