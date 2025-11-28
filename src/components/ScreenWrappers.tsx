import React from "react";
import { useNavigate } from "react-router-dom";
import { HomeScreen } from "./HomeScreen";
import { MedicationsScreen } from "./MedicationsScreen";
import { MedicationScheduleScreen } from "./MedicationScheduleScreen";
import { DietScreen } from "./DietScreen";
import { ActivitiesScreen } from "./ActivitiesScreen";
import { CarePlanScreen } from "./CarePlanScreen";
import { AppointmentsScreen } from "./AppointmentsScreen";
import { AIAssistantScreen } from "./AIAssistantScreen";
import { ProfileScreen } from "./ProfileScreen";
import { useAuth } from "../contexts/AuthContext";

export const HomeScreenWrapper = () => {
  const navigate = useNavigate();
  return (
    <HomeScreen
      onNavigate={(screen) => {
        // Map 'ai' to 'ai-assistant' route
        const route = screen === "ai" ? "ai-assistant" : screen;
        navigate(`/${route}`);
      }}
    />
  );
};

export const MedicationsScreenWrapper = () => {
  const navigate = useNavigate();
  return (
    <MedicationsScreen
      onViewSchedule={() => navigate("/medication-schedule")}
    />
  );
};

export const MedicationScheduleScreenWrapper = () => {
  const navigate = useNavigate();
  return <MedicationScheduleScreen onBack={() => navigate("/medications")} />;
};

export const DietScreenWrapper = () => {
  const navigate = useNavigate();
  return <DietScreen onAskAI={() => navigate("/ai-assistant")} />;
};

export const ActivitiesScreenWrapper = () => {
  const navigate = useNavigate();
  return <ActivitiesScreen onAskAI={() => navigate("/ai-assistant")} />;
};

export const CarePlanScreenWrapper = () => {
  const navigate = useNavigate();
  return <CarePlanScreen onBack={() => navigate("/home")} />;
};

export const ProfileScreenWrapper = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/signin");
  };

  return (
    <ProfileScreen
      onLogout={handleLogout}
      onViewCarePlan={() => navigate("/care-plan")}
    />
  );
};

export const AppointmentsScreenWrapper = () => {
  return <AppointmentsScreen />;
};

export const AIAssistantScreenWrapper = () => {
  return <AIAssistantScreen />;
};
