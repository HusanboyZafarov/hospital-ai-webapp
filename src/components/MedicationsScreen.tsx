import React, { useState } from "react";
import { Clock, Check, X, Calendar } from "lucide-react";

interface MedicationsScreenProps {
  onViewSchedule: () => void;
}

export function MedicationsScreen({ onViewSchedule }: MedicationsScreenProps) {
  const [medications, setMedications] = useState([
    {
      id: 1,
      name: "Amoxicillin",
      dosage: "500mg",
      time: "8:00 AM",
      status: "taken",
    },
    {
      id: 2,
      name: "Ibuprofen",
      dosage: "400mg",
      time: "2:00 PM",
      status: "upcoming",
    },
    {
      id: 3,
      name: "Vitamin D",
      dosage: "1000 IU",
      time: "8:00 PM",
      status: "upcoming",
    },
  ]);

  const markAsTaken = (id: number) => {
    setMedications(
      medications.map((med) =>
        med.id === id ? { ...med, status: "taken" } : med
      )
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "taken":
        return "var(--success-green)";
      case "missed":
        return "var(--error-red)";
      default:
        return "var(--muted-text)";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "taken":
        return <Check size={16} />;
      case "missed":
        return <X size={16} />;
      default:
        return <Clock size={16} />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "taken":
        return "Taken";
      case "missed":
        return "Missed";
      default:
        return "Upcoming";
    }
  };

  const timelineHours = ["8 AM", "12 PM", "2 PM", "6 PM", "8 PM"];

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "var(--bg-light)",
        paddingBottom: "88px",
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
        <h2>Medications</h2>
      </div>

      <div style={{ padding: "16px" }}>
        {/* Today's Medications */}
        <div style={{ marginBottom: "24px" }}>
          <h3 style={{ marginBottom: "12px" }}>Today's Medication</h3>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "12px" }}
          >
            {medications.map((med) => (
              <div
                key={med.id}
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
                    justifyContent: "space-between",
                    alignItems: "start",
                    marginBottom: "12px",
                  }}
                >
                  <div>
                    <h3 style={{ marginBottom: "4px" }}>{med.name}</h3>
                    <p style={{ color: "var(--muted-text)" }}>{med.dosage}</p>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                      padding: "6px 12px",
                      borderRadius: "8px",
                      backgroundColor: getStatusColor(med.status) + "15",
                      color: getStatusColor(med.status),
                    }}
                    className="caption"
                  >
                    {getStatusIcon(med.status)}
                    {getStatusText(med.status)}
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    marginBottom: "12px",
                  }}
                >
                  <Clock size={16} style={{ color: "var(--muted-text)" }} />
                  <p style={{ color: "var(--muted-text)" }}>
                    Due at {med.time}
                  </p>
                </div>

                {med.status === "upcoming" && (
                  <button
                    onClick={() => markAsTaken(med.id)}
                    style={{
                      width: "100%",
                      backgroundColor: "var(--primary-blue)",
                      color: "white",
                      padding: "12px",
                      borderRadius: "12px",
                      border: "none",
                      cursor: "pointer",
                      fontWeight: "500",
                    }}
                  >
                    Mark as Taken
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Timeline View */}
        <div
          style={{
            backgroundColor: "var(--bg-white)",
            borderRadius: "16px",
            padding: "16px",
            boxShadow: "0 4px 16px rgba(0,0,0,0.05)",
            marginBottom: "16px",
          }}
        >
          <h3 style={{ marginBottom: "16px" }}>Timeline View</h3>
          <div
            style={{
              display: "flex",
              gap: "24px",
              overflowX: "auto",
              paddingBottom: "8px",
            }}
          >
            {timelineHours.map((hour, index) => (
              <div
                key={index}
                style={{ textAlign: "center", minWidth: "60px" }}
              >
                <div
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "10px",
                    backgroundColor:
                      index === 0 ? "var(--primary-blue)" : "var(--card-grey)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 8px",
                  }}
                >
                  <div
                    style={{
                      width: "20px",
                      height: "20px",
                      borderRadius: "50%",
                      backgroundColor:
                        index === 0 ? "white" : "var(--muted-text)",
                    }}
                  />
                </div>
                <p className="caption" style={{ color: "var(--muted-text)" }}>
                  {hour}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* View Full Schedule Button */}
        <button
          onClick={onViewSchedule}
          style={{
            width: "100%",
            backgroundColor: "var(--bg-white)",
            color: "var(--primary-blue)",
            padding: "16px",
            borderRadius: "12px",
            border: "1px solid var(--primary-blue)",
            cursor: "pointer",
            fontWeight: "500",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
          }}
        >
          <Calendar size={20} />
          View Full Schedule
        </button>
      </div>
    </div>
  );
}
