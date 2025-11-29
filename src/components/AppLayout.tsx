import React from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { BottomNav } from "./BottomNav";
import { User } from "lucide-react";

export const AppLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const activeScreen = location.pathname.split("/")[1] || "home";
  // Handle "ai-assistant" route for tab highlighting
  const activeTab = ["medications", "diet", "activities"].includes(activeScreen)
    ? activeScreen
    : activeScreen === "ai-assistant"
    ? "ai"
    : "home";

  const hideBottomNav = [
    "medication-schedule",
    "care-plan",
    "appointments",
    "profile",
  ].includes(activeScreen);

  const showProfileButton = [
    "home",
    "medications",
    "diet",
    "activities",
    "ai-assistant",
  ].includes(activeScreen);

  const handleTabChange = (tab: string) => {
    // Map "ai" tab to "ai-assistant" route
    const route = tab === "ai" ? "/ai-assistant" : `/${tab}`;
    navigate(route);
  };

  return (
    <div
      style={{
        maxWidth: "393px",
        minHeight: "100vh",
        margin: "0 auto",
        position: "relative",
        backgroundColor: "var(--bg-light)",
      }}
    >
      <Outlet />

      {!hideBottomNav && (
        <BottomNav activeTab={activeTab} onTabChange={handleTabChange} />
      )}

      {showProfileButton && (
        <button
          onClick={() => navigate("/profile")}
          style={{
            position: "fixed",
            top: "24px",
            right: "16px",
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            backgroundColor: "var(--primary-blue)",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 4px 12px rgba(37, 99, 235, 0.3)",
            color: "white",
            fontWeight: "600",
            fontSize: "16px",
            maxWidth: "393px",
            margin: "0 auto",
            zIndex: 10,
          }}
        >
          <User size={20} />
        </button>
      )}
    </div>
  );
};
