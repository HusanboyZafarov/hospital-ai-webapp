import React, { useState, useEffect } from "react";
import {
  User,
  Heart,
  Stethoscope,
  Phone,
  LogOut,
  ChevronRight,
  Loader2,
  X,
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { profileService } from "../service/profile";

interface ProfileScreenProps {
  onLogout: () => void;
  onViewCarePlan: () => void;
}

interface ProfileData {
  name?: string;
  date_of_birth?: string;
  blood_type?: string;
  email?: string;
  phone?: string;
  procedure?: string;
  surgery_date?: string;
  hospital?: string;
  room?: string;
  primary_surgeon?: string;
  primary_nurse?: string;
  department?: string;
  emergency_contact?: string;
  patient_id?: string;
}

export function ProfileScreen({
  onLogout,
  onViewCarePlan,
}: ProfileScreenProps) {
  const { user, logout } = useAuth();
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch profile data from API
  useEffect(() => {
    const fetchProfile = async () => {
      setIsLoading(true);
      setError("");
      try {
        const response = await profileService.getMyProfile();

        // Handle API response
        if (response?.detail) {
          setError(response.detail);
          setProfileData(null);
        } else {
          setProfileData(response || {});
        }
      } catch (err: any) {
        console.error("Error fetching profile:", err);
        let errorMessage = "Failed to load profile";

        if (err?.response?.data?.detail) {
          errorMessage = err.response.data.detail;
        } else if (err?.response?.data?.message) {
          errorMessage = err.response.data.message;
        } else if (err?.message) {
          errorMessage = err.message;
        }

        setError(errorMessage);
        setProfileData(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // Get user initials for avatar
  const getUserInitials = () => {
    if (user?.name) {
      const names = user.name.split(" ");
      if (names.length >= 2) {
        return `${names[0][0]}${names[1][0]}`.toUpperCase();
      }
      return user.name.substring(0, 2).toUpperCase();
    }
    if (user?.username) {
      return user.username.substring(0, 2).toUpperCase();
    }
    return "U";
  };

  // Get display name
  const displayName = user?.name || user?.username || "User";

  const profileSections = [
    {
      title: "Shaxsiy ma'lumotlar",
      icon: User,
      items: [
        { label: "Ism", value: profileData?.name || displayName },
        { label: "Tug'ilgan sana", value: profileData?.date_of_birth || "—" },
        { label: "Telefon", value: profileData?.phone || "—" },
      ],
    },
    {
      title: "Jarrohlik ma'lumotlari",
      icon: Heart,
      items: [{ label: "Shifoxona nomi", value: profileData?.hospital || "—" }],
    },
  ];

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
        <h2>Profil</h2>
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
            <span>Profil yuklanmoqda...</span>
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
            {/* Profile Header Card */}
            <div
              style={{
                backgroundColor: "var(--bg-white)",
                borderRadius: "16px",
                padding: "20px",
                boxShadow: "0 4px 16px rgba(0,0,0,0.05)",
                marginBottom: "24px",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  width: "80px",
                  height: "80px",
                  borderRadius: "50%",
                  backgroundColor: "var(--primary-blue)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 16px",
                  color: "white",
                  fontSize: "32px",
                  fontWeight: "600",
                }}
              >
                {getUserInitials()}
              </div>
              <h2 style={{ marginBottom: "4px" }}>{displayName}</h2>
              <p style={{ color: "var(--muted-text)" }}>
                {profileData?.patient_id
                  ? `Bemor ID: ${profileData.patient_id}`
                  : `Foydalanuvchi: ${user?.username || user?.id}`}
              </p>
            </div>

            {/* Information Sections */}
            {profileSections.map((section, sectionIndex) => {
              const Icon = section.icon;
              return (
                <div key={sectionIndex} style={{ marginBottom: "16px" }}>
                  <div
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
                        marginBottom: "16px",
                      }}
                    >
                      <Icon
                        size={20}
                        style={{ color: "var(--primary-blue)" }}
                      />
                      <h3>{section.title}</h3>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "12px",
                      }}
                    >
                      {section.items.map((item, itemIndex) => (
                        <div
                          key={itemIndex}
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "start",
                          }}
                        >
                          <p
                            style={{
                              color: "var(--muted-text)",
                              flex: "0 0 40%",
                            }}
                          >
                            {item.label}
                          </p>
                          <p style={{ textAlign: "right", flex: "0 0 60%" }}>
                            {item.value}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </>
        )}

        {/* Action Buttons */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            marginBottom: "24px",
          }}
        >
          <button
            style={{
              backgroundColor: "var(--bg-white)",
              border: "1px solid var(--border-grey)",
              borderRadius: "12px",
              padding: "16px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <Phone size={20} style={{ color: "var(--primary-blue)" }} />
              <span style={{ fontWeight: "500" }}>
                Qo'llab-quvvatlash bilan bog'lanish
              </span>
            </div>
            <ChevronRight size={20} style={{ color: "var(--muted-text)" }} />
          </button>
        </div>

        {/* Logout Button */}
        <button
          onClick={() => {
            logout();
            onLogout();
          }}
          style={{
            width: "100%",
            backgroundColor: "#FEE2E2",
            color: "var(--error-red)",
            padding: "16px",
            borderRadius: "12px",
            border: "none",
            cursor: "pointer",
            fontWeight: "500",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
          }}
        >
          <LogOut size={20} />
          Chiqish
        </button>

        {/* App Version */}
        <p
          className="caption"
          style={{
            textAlign: "center",
            color: "var(--muted-text)",
            marginTop: "24px",
          }}
        >
          Tiklanish Yordamchisi v1.0.0
        </p>
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
