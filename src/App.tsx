import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { AppLayout } from "./components/AppLayout";
import { OnboardingWrapper } from "./components/OnboardingWrapper";
import { SignInScreen } from "./components/SignInScreen";
import {
  HomeScreenWrapper,
  MedicationsScreenWrapper,
  DietScreenWrapper,
  ActivitiesScreenWrapper,
  CarePlanScreenWrapper,
  AIAssistantScreenWrapper,
  ProfileScreenWrapper,
} from "./components/ScreenWrappers";

function AppRoutes() {
  // Check if onboarding has been completed
  const onboardingCompleted = localStorage.getItem("onboarding_completed");

  return (
    <Routes>
      {/* Onboarding - only show if not completed */}
      {!onboardingCompleted && (
        <Route path="/onboarding" element={<OnboardingWrapper />} />
      )}

      {/* Redirect root to onboarding or signin */}
      <Route
        path="/"
        element={
          onboardingCompleted ? (
            <Navigate to="/signin" replace />
          ) : (
            <Navigate to="/onboarding" replace />
          )
        }
      />

      {/* Public routes */}
      <Route path="/signin" element={<SignInScreen />} />

      {/* Protected routes with layout */}
      <Route
        element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/home" element={<HomeScreenWrapper />} />
        <Route path="/medications" element={<MedicationsScreenWrapper />} />
        {/* <Route
          path="/medication-schedule"
          element={<MedicationScheduleScreenWrapper />}
        /> */}
        <Route path="/diet" element={<DietScreenWrapper />} />
        <Route path="/activities" element={<ActivitiesScreenWrapper />} />
        <Route path="/care-plan" element={<CarePlanScreenWrapper />} />
        {/* <Route path="/appointments" element={<AppointmentsScreenWrapper />} /> */}
        <Route path="/ai-assistant" element={<AIAssistantScreenWrapper />} />
        <Route path="/profile" element={<ProfileScreenWrapper />} />

        {/* Redirect / to /home for authenticated users */}
        <Route path="/" element={<Navigate to="/home" replace />} />
      </Route>

      {/* Catch all - redirect to home */}
      <Route path="*" element={<Navigate to="/home" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}
