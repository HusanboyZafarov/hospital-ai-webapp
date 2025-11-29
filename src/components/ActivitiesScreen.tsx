import React, { useState, useEffect } from "react";
import {
  Footprints,
  Dumbbell,
  Bike,
  Waves,
  Mountain,
  Zap,
  Loader2,
  X,
} from "lucide-react";
import { activitiesService } from "../service/activities";

interface ActivitiesScreenProps {
  onAskAI: (query?: string) => void;
}

interface Activity {
  icon: typeof Footprints;
  name: string;
  description: string;
}

interface ActivitiesData {
  id?: number;
  notes?: string;
  allowed?: Array<{
    id: number;
    name: string;
    description?: string;
  }>;
  restricted?: Array<{
    id: number;
    name: string;
    description?: string;
  }>;
  general_guidelines?: string[];
}

export function ActivitiesScreen({ onAskAI }: ActivitiesScreenProps) {
  const [activityQuery, setActivityQuery] = useState("");
  const [activitiesData, setActivitiesData] = useState<ActivitiesData | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch activities from API
  useEffect(() => {
    const fetchActivities = async () => {
      setIsLoading(true);
      setError("");
      try {
        const response = await activitiesService.getActivities();

        // Handle API response
        if (response?.detail) {
          setError(response.detail);
          setActivitiesData(null);
        } else {
          setActivitiesData(response || {});
        }
      } catch (err: any) {
        console.error("Error fetching activities:", err);
        let errorMessage = "Failed to load activities";

        if (err?.response?.data?.detail) {
          errorMessage = err.response.data.detail;
        } else if (err?.response?.data?.message) {
          errorMessage = err.response.data.message;
        } else if (err?.message) {
          errorMessage = err.message;
        }

        setError(errorMessage);
        setActivitiesData(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchActivities();
  }, []);

  // Icon mapping function
  const getIconForActivity = (
    name: string,
    isAllowed: boolean
  ): typeof Footprints => {
    const nameLower = name.toLowerCase();
    if (nameLower.includes("yurish") || nameLower.includes("walking"))
      return Footprints;
    if (
      nameLower.includes("velosiped") ||
      nameLower.includes("bike") ||
      nameLower.includes("cycling")
    )
      return Bike;
    if (nameLower.includes("cho'zish") || nameLower.includes("stretch"))
      return Dumbbell;
    if (nameLower.includes("ko'tarish") || nameLower.includes("lift"))
      return Mountain;
    if (
      nameLower.includes("intensiv") ||
      nameLower.includes("intensive") ||
      nameLower.includes("yugurish") ||
      nameLower.includes("run")
    )
      return Zap;
    if (nameLower.includes("suzish") || nameLower.includes("swim"))
      return Waves;
    return isAllowed ? Footprints : Mountain;
  };

  // Default activities with icons
  const defaultAllowedActivities: Activity[] = [
    { icon: Footprints, name: "Yengil yurish", description: "15-20 daqiqa" },
    { icon: Bike, name: "Statsionar velosiped", description: "Past qarshilik" },
    { icon: Dumbbell, name: "Yumshoq cho'zish", description: "Zo'riqmasdan" },
  ];

  const defaultRestrictedActivities: Activity[] = [
    {
      icon: Mountain,
      name: "Og'ir ko'tarish",
      description: "10 funtdan ortiq",
    },
    {
      icon: Zap,
      name: "Yuqori intensivlikdagi mashqlar",
      description: "Yugurish, HIIT",
    },
    { icon: Waves, name: "Suzish", description: "Yara tuzalguniga qadar" },
  ];

  // Map API activities to UI format
  const allowedActivities: Activity[] =
    activitiesData?.allowed && activitiesData.allowed.length > 0
      ? activitiesData.allowed.map((activity) => ({
          icon: getIconForActivity(activity.name, true),
          name: activity.name,
          description: activity.description || "",
        }))
      : defaultAllowedActivities;

  const restrictedActivities: Activity[] =
    activitiesData?.restricted && activitiesData.restricted.length > 0
      ? activitiesData.restricted.map((activity) => ({
          icon: getIconForActivity(activity.name, false),
          name: activity.name,
          description: activity.description || "",
        }))
      : defaultRestrictedActivities;

  const guidelines =
    activitiesData?.general_guidelines &&
    activitiesData.general_guidelines.length > 0
      ? activitiesData.general_guidelines
      : [
          "Asta-sekin boshlang va faoliyatni bosqichma-bosqich oshiring",
          "Agar og'riq yoki noqulaylik sezsangiz, to'xtating",
          "Kerak bo'lganda dam oling va o'zingizni majburlamang",
          "Yangi faoliyatlarni boshlashdan oldin shifokoringizga maslahat oling",
        ];

  const handleAskAI = () => {
    if (activityQuery.trim()) {
      onAskAI(activityQuery.trim());
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
          position: "sticky",
          top: 0,
          zIndex: 100,
        }}
      >
        <h2>Faoliyatlar</h2>
      </div>

      <div style={{ padding: "16px" }}>
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
            <span>Faoliyatlar yuklanmoqda...</span>
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
              marginBottom: "24px",
            }}
          >
            <X size={20} style={{ flexShrink: 0 }} />
            <span>{error}</span>
          </div>
        ) : (
          <>
            {/* AI Assistant Info */}
            <div
              style={{
                backgroundColor: "#E0F2FE",
                borderLeft: "4px solid var(--primary-blue)",
                borderRadius: "12px",
                padding: "16px",
                marginBottom: "24px",
              }}
            >
              <h3 style={{ marginBottom: "8px", color: "#0C4A6E" }}>
                AI Yordamchi haqida
              </h3>
              <p
                style={{
                  fontSize: "14px",
                  color: "#0C4A6E",
                  margin: 0,
                  lineHeight: "1.5",
                }}
              >
                Bizning AI yordamchisi sizning tiklanish rejangiz va sog'liq
                holatingizga asoslanib, faoliyatlaringizning xavfsizligini
                baholaydi. Har qanday faoliyat haqida savol bering va shaxsiy
                tavsiyalar oling.
              </p>
            </div>

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
              <h3 style={{ marginBottom: "12px" }}>
                AI Xavfsizlik tekshiruvchisi
              </h3>
              <p style={{ color: "var(--muted-text)", marginBottom: "16px" }}>
                Faoliyat tiklanishingiz uchun xavfsizligini so'rang
              </p>
              <div style={{ display: "flex", gap: "8px", width: "100%" }}>
                <input
                  type="text"
                  value={activityQuery}
                  onChange={(e) => setActivityQuery(e.target.value)}
                  placeholder="Masalan, Men yugurishga chiqishim mumkinmi?"
                  style={{
                    flex: 1,
                    padding: "12px 16px",
                    borderRadius: "12px",
                    border: "1px solid var(--border-grey)",
                    backgroundColor: "var(--bg-light)",
                    fontSize: "15px",
                    outline: "none",
                    minWidth: 0,
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
                    justifyContent: "center",
                    gap: "8px",
                    flexShrink: 0,
                    whiteSpace: "nowrap",
                  }}
                >
                  AI dan so'rash
                </button>
              </div>
            </div>

            {/* Allowed Activities */}
            <div style={{ marginBottom: "24px" }}>
              <h3 style={{ marginBottom: "12px" }}>
                Ruxsat etilgan faoliyatlar
              </h3>
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
                        <Icon
                          size={20}
                          style={{ color: "var(--success-green)" }}
                        />
                      </div>
                      <div>
                        <h4 style={{ marginBottom: "4px", fontWeight: "700" }}>
                          {activity.name}
                        </h4>
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
              <h3 style={{ marginBottom: "12px" }}>Cheklangan faoliyatlar</h3>
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
                        <h4 style={{ marginBottom: "4px", fontWeight: "700" }}>
                          {activity.name}
                        </h4>
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

            {/* Notes */}
            {activitiesData?.notes && (
              <div
                style={{
                  backgroundColor: "#E0F2FE",
                  borderLeft: "4px solid var(--primary-blue)",
                  borderRadius: "12px",
                  padding: "16px",
                  marginBottom: "24px",
                }}
              >
                <h3 style={{ marginBottom: "8px", color: "#0C4A6E" }}>
                  Shifokor eslatmasi
                </h3>
                <p
                  style={{
                    fontSize: "14px",
                    color: "#0C4A6E",
                    margin: 0,
                    lineHeight: "1.5",
                  }}
                >
                  {activitiesData.notes}
                </p>
              </div>
            )}

            {/* General Guidelines */}
            <div
              style={{
                backgroundColor: "var(--bg-white)",
                borderRadius: "16px",
                padding: "16px",
                boxShadow: "0 4px 16px rgba(0,0,0,0.05)",
              }}
            >
              <h3 style={{ marginBottom: "12px" }}>Umumiy ko'rsatmalar</h3>
              <ul
                style={{
                  margin: 0,
                  paddingLeft: "20px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "8px",
                }}
              >
                {guidelines.map((guideline, index) => (
                  <li key={index} style={{ color: "var(--dark-text)" }}>
                    {guideline}
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
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
