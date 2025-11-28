import React, { useState } from "react";
import {
  CheckCircle,
  XCircle,
  MessageSquare,
  Footprints,
  Dumbbell,
  Bike,
  Waves,
  Mountain,
  Zap,
} from "lucide-react";

interface ActivitiesScreenProps {
  onAskAI: () => void;
}

export function ActivitiesScreen({ onAskAI }: ActivitiesScreenProps) {
  const [activityQuery, setActivityQuery] = useState("");

  const allowedActivities = [
    { icon: Footprints, name: "Light walking", description: "15-20 minutes" },
    { icon: Bike, name: "Stationary bike", description: "Low resistance" },
    { icon: Dumbbell, name: "Gentle stretching", description: "No strain" },
  ];

  const restrictedActivities = [
    { icon: Mountain, name: "Heavy lifting", description: "Over 10 lbs" },
    {
      icon: Zap,
      name: "High-intensity exercise",
      description: "Running, HIIT",
    },
    { icon: Waves, name: "Swimming", description: "Until wound heals" },
  ];

  const handleAskAI = () => {
    if (activityQuery.trim()) {
      onAskAI();
    }
  };

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
        <h2>Activities</h2>
      </div>

      <div style={{ padding: "16px" }}>
        {/* AI Safety Checker */}
        <div
          style={{
            backgroundColor: "var(--bg-white)",
            borderRadius: "16px",
            padding: "16px",
            boxShadow: "0 4px 16px rgba(0,0,0,0.05)",
            marginBottom: "24px",
          }}
        >
          <h3 style={{ marginBottom: "12px" }}>AI Safety Checker</h3>
          <p style={{ color: "var(--muted-text)", marginBottom: "16px" }}>
            Ask if an activity is safe for your recovery
          </p>
          <div style={{ display: "flex", gap: "8px" }}>
            <input
              type="text"
              value={activityQuery}
              onChange={(e) => setActivityQuery(e.target.value)}
              placeholder="e.g., Can I go jogging?"
              style={{
                flex: 1,
                padding: "12px 16px",
                borderRadius: "12px",
                border: "1px solid var(--border-grey)",
                backgroundColor: "var(--bg-light)",
                fontSize: "15px",
                outline: "none",
              }}
            />
            <button
              onClick={handleAskAI}
              style={{
                backgroundColor: "var(--primary-blue)",
                color: "white",
                padding: "12px 20px",
                borderRadius: "12px",
                border: "none",
                cursor: "pointer",
                fontWeight: "500",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              Ask AI
            </button>
          </div>
        </div>

        {/* Allowed Activities */}
        <div style={{ marginBottom: "24px" }}>
          <h3 style={{ marginBottom: "12px" }}>Allowed Activities</h3>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: "12px",
            }}
          >
            {allowedActivities.map((activity, index) => {
              const Icon = activity.icon;
              return (
                <div
                  key={index}
                  style={{
                    backgroundColor: "var(--bg-white)",
                    borderRadius: "16px",
                    padding: "16px",
                    boxShadow: "0 4px 16px rgba(0,0,0,0.05)",
                    height: "120px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <div
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "10px",
                      backgroundColor: "var(--success-green)" + "15",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Icon size={20} style={{ color: "var(--success-green)" }} />
                  </div>
                  <div>
                    <h3 style={{ marginBottom: "4px", fontSize: "16px" }}>
                      {activity.name}
                    </h3>
                    <p
                      className="caption"
                      style={{ color: "var(--muted-text)" }}
                    >
                      {activity.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Restricted Activities */}
        <div style={{ marginBottom: "24px" }}>
          <h3 style={{ marginBottom: "12px" }}>Restricted Activities</h3>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: "12px",
            }}
          >
            {restrictedActivities.map((activity, index) => {
              const Icon = activity.icon;
              return (
                <div
                  key={index}
                  style={{
                    backgroundColor: "var(--bg-white)",
                    borderRadius: "16px",
                    padding: "16px",
                    boxShadow: "0 4px 16px rgba(0,0,0,0.05)",
                    height: "120px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <div
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "10px",
                      backgroundColor: "var(--error-red)" + "15",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Icon size={20} style={{ color: "var(--error-red)" }} />
                  </div>
                  <div>
                    <h3 style={{ marginBottom: "4px", fontSize: "16px" }}>
                      {activity.name}
                    </h3>
                    <p
                      className="caption"
                      style={{ color: "var(--muted-text)" }}
                    >
                      {activity.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* General Guidelines */}
        <div
          style={{
            backgroundColor: "var(--bg-white)",
            borderRadius: "16px",
            padding: "16px",
            boxShadow: "0 4px 16px rgba(0,0,0,0.05)",
          }}
        >
          <h3 style={{ marginBottom: "12px" }}>General Guidelines</h3>
          <ul
            style={{
              margin: 0,
              paddingLeft: "20px",
              display: "flex",
              flexDirection: "column",
              gap: "8px",
            }}
          >
            <li style={{ color: "var(--dark-text)" }}>
              Start slowly and gradually increase activity
            </li>
            <li style={{ color: "var(--dark-text)" }}>
              Stop if you experience pain or discomfort
            </li>
            <li style={{ color: "var(--dark-text)" }}>
              Rest when needed and don't push yourself
            </li>
            <li style={{ color: "var(--dark-text)" }}>
              Consult your doctor before starting new activities
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
