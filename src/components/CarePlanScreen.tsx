import React, { useState } from "react";
import { ChevronDown, ChevronUp, ArrowLeft } from "lucide-react";

interface CarePlanScreenProps {
  onBack: () => void;
}

export function CarePlanScreen({ onBack }: CarePlanScreenProps) {
  const [expandedSections, setExpandedSections] = useState<string[]>([
    "pre-op",
  ]);

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) =>
      prev.includes(sectionId)
        ? prev.filter((id) => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const sections = [
    {
      id: "pre-op",
      title: "Pre-Operative Instructions",
      items: [
        "Fast for 8 hours before surgery (no food or drink)",
        "Stop taking blood thinners 7 days before surgery",
        "Arrange for someone to drive you home",
        "Wear comfortable, loose-fitting clothing",
        "Remove all jewelry and contact lenses",
        "Bring your insurance card and ID",
      ],
    },
    {
      id: "post-op",
      title: "Post-Operative Instructions",
      items: [
        "Take all medications as prescribed",
        "Keep the surgical site clean and dry",
        "Change dressings as instructed by your nurse",
        "Watch for signs of infection (fever, redness, swelling)",
        "Avoid lifting anything heavier than 10 lbs",
        "Get plenty of rest and stay hydrated",
        "Follow up with your doctor in 7-10 days",
      ],
    },
    {
      id: "general",
      title: "General Guidelines",
      items: [
        "Take pain medication before pain becomes severe",
        "Use ice packs to reduce swelling (20 min on, 20 min off)",
        "Sleep with your head elevated for the first few days",
        "Walk short distances to promote circulation",
        "Avoid smoking and alcohol during recovery",
        "Contact your doctor immediately if you experience severe pain",
        "Keep all follow-up appointments",
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
        <h2>Your Care Plan</h2>
      </div>

      <div style={{ padding: "16px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {sections.map((section) => {
            const isExpanded = expandedSections.includes(section.id);
            return (
              <div
                key={section.id}
                style={{
                  backgroundColor: "var(--bg-white)",
                  borderRadius: "16px",
                  boxShadow: "0 4px 16px rgba(0,0,0,0.05)",
                  overflow: "hidden",
                }}
              >
                <button
                  onClick={() => toggleSection(section.id)}
                  style={{
                    width: "100%",
                    padding: "16px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    textAlign: "left",
                  }}
                >
                  <h3>{section.title}</h3>
                  {isExpanded ? (
                    <ChevronUp
                      size={20}
                      style={{ color: "var(--primary-blue)" }}
                    />
                  ) : (
                    <ChevronDown
                      size={20}
                      style={{ color: "var(--muted-text)" }}
                    />
                  )}
                </button>

                {isExpanded && (
                  <div style={{ padding: "0 16px 16px" }}>
                    <ul
                      style={{
                        margin: 0,
                        paddingLeft: "20px",
                        display: "flex",
                        flexDirection: "column",
                        gap: "12px",
                      }}
                    >
                      {section.items.map((item, index) => (
                        <li key={index} style={{ color: "var(--dark-text)" }}>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Emergency Contact */}
        <div
          style={{
            backgroundColor: "#FEE2E2",
            borderLeft: "4px solid var(--error-red)",
            borderRadius: "12px",
            padding: "16px",
            marginTop: "24px",
          }}
        >
          <h3 style={{ marginBottom: "8px" }}>Emergency Contact</h3>
          <p style={{ color: "var(--dark-text)" }}>
            If you experience severe pain, difficulty breathing, or signs of
            infection, call your doctor immediately or go to the nearest
            emergency room.
          </p>
          <p style={{ marginTop: "8px", fontWeight: "500" }}>
            Emergency Line: (555) 123-4567
          </p>
        </div>
      </div>
    </div>
  );
}
