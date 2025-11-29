import React, { useState, useEffect } from "react";
import { Clock, Check, X, Calendar, Loader2 } from "lucide-react";
import { medicineService } from "../service/medicine";

interface MedicationsScreenProps {
  onViewSchedule: () => void;
}

interface Medication {
  id: number;
  name: string;
  dosage: string;
  period: string;
  times: number;
}

export function MedicationsScreen({ onViewSchedule }: MedicationsScreenProps) {
  const [medications, setMedications] = useState<Medication[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch medications from API on mount
  useEffect(() => {
    const fetchMedications = async () => {
      setIsLoading(true);
      setError("");
      try {
        const response = await medicineService.getMedications();

        // Check if response has error detail
        if (response?.detail) {
          setError(response.detail);
          setMedications([]);
          return;
        }

        // Handle API response - adjust based on actual API structure
        if (response?.medications && Array.isArray(response.medications)) {
          setMedications(response.medications);
        } else if (Array.isArray(response)) {
          setMedications(response);
        } else if (response?.data && Array.isArray(response.data)) {
          setMedications(response.data);
        } else {
          // No medications found
          setMedications([]);
        }
      } catch (err: any) {
        console.error("Error fetching medications:", err);

        // Extract error message from API response
        let errorMessage = "Failed to load medications";

        if (err?.response?.data?.detail) {
          errorMessage = err.response.data.detail;
        } else if (err?.response?.data?.message) {
          errorMessage = err.response.data.message;
        } else if (err?.message) {
          errorMessage = err.message;
        }

        setError(errorMessage);
        setMedications([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMedications();
  }, []);

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
          position: "sticky",
          top: 0,
          zIndex: 100,
        }}
      >
        <h2>Dori-darmonlar</h2>
      </div>

      <div style={{ padding: "16px" }}>
        {/* Today's Medications */}
        <div style={{ marginBottom: "24px" }}>
          <h3 style={{ marginBottom: "12px" }}>Bugungi dori-darmonlar</h3>

          {isLoading ? (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "40px",
                gap: "12px",
                color: "var(--muted-text)",
              }}
            >
              <Loader2
                size={20}
                style={{ animation: "spin 1s linear infinite" }}
              />
              <span>Dori-darmonlar yuklanmoqda...</span>
            </div>
          ) : error ? (
            <div
              style={{
                padding: "16px",
                backgroundColor: "#FEE2E2",
                color: "#DC2626",
                borderRadius: "12px",
                fontSize: "14px",
                lineHeight: "1.5",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <X size={20} style={{ flexShrink: 0 }} />
              <span>{error}</span>
            </div>
          ) : medications.length === 0 ? (
            <div
              style={{
                padding: "40px",
                textAlign: "center",
                color: "var(--muted-text)",
              }}
            >
              <p>Bugun dori-darmonlar yo'q</p>
            </div>
          ) : (
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
                    }}
                  >
                    <div style={{ flex: 1 }}>
                      <h3 style={{ marginBottom: "4px", fontWeight: "600" }}>
                        {med.name}
                      </h3>
                      <p
                        style={{
                          color: "var(--muted-text)",
                          fontSize: "14px",
                          marginBottom: "4px",
                        }}
                      >
                        {med.dosage}
                      </p>
                      <div
                        style={{
                          display: "flex",
                          gap: "12px",
                          marginTop: "8px",
                          flexWrap: "wrap",
                        }}
                      >
                        <span
                          style={{
                            color: "var(--muted-text)",
                            fontSize: "13px",
                            backgroundColor: "var(--bg-light)",
                            padding: "4px 8px",
                            borderRadius: "6px",
                          }}
                        >
                          {med.times} marta
                        </span>
                        <span
                          style={{
                            color: "var(--muted-text)",
                            fontSize: "13px",
                            backgroundColor: "var(--bg-light)",
                            padding: "4px 8px",
                            borderRadius: "6px",
                          }}
                        >
                          {med.period}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
