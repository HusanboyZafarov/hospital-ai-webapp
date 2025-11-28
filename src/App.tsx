import { useState } from 'react';
import { BottomNav } from './components/BottomNav';
import { OnboardingScreen } from './components/OnboardingScreen';
import { SignInScreen } from './components/SignInScreen';
import { HomeScreen } from './components/HomeScreen';
import { MedicationsScreen } from './components/MedicationsScreen';
import { MedicationScheduleScreen } from './components/MedicationScheduleScreen';
import { DietScreen } from './components/DietScreen';
import { ActivitiesScreen } from './components/ActivitiesScreen';
import { CarePlanScreen } from './components/CarePlanScreen';
import { AppointmentsScreen } from './components/AppointmentsScreen';
import { AIAssistantScreen } from './components/AIAssistantScreen';
import { ProfileScreen } from './components/ProfileScreen';

type AppState = 'onboarding' | 'signin' | 'main';
type MainScreen = 'home' | 'medications' | 'medication-schedule' | 'diet' | 'activities' | 'care-plan' | 'appointments' | 'ai' | 'profile';

export default function App() {
  const [appState, setAppState] = useState<AppState>('onboarding');
  const [onboardingStep, setOnboardingStep] = useState(0);
  const [activeScreen, setActiveScreen] = useState<MainScreen>('home');
  const [activeTab, setActiveTab] = useState('home');

  const handleOnboardingNext = () => {
    if (onboardingStep < 2) {
      setOnboardingStep(onboardingStep + 1);
    }
  };

  const handleOnboardingComplete = () => {
    setAppState('signin');
  };

  const handleSignIn = () => {
    setAppState('main');
  };

  const handleLogout = () => {
    setAppState('signin');
    setActiveScreen('home');
    setActiveTab('home');
  };

  const handleNavigate = (screen: string) => {
    if (screen === 'medications' || screen === 'diet' || screen === 'activities' || screen === 'ai') {
      setActiveTab(screen);
      setActiveScreen(screen as MainScreen);
    } else if (screen === 'medication-schedule') {
      setActiveScreen('medication-schedule');
    } else if (screen === 'appointments') {
      setActiveScreen('appointments');
    } else if (screen === 'care-plan') {
      setActiveScreen('care-plan');
    } else if (screen === 'profile') {
      setActiveScreen('profile');
    }
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setActiveScreen(tab as MainScreen);
  };

  const handleBackToMedications = () => {
    setActiveScreen('medications');
  };

  const handleBackToHome = () => {
    setActiveScreen('home');
    setActiveTab('home');
  };

  // Onboarding flow
  if (appState === 'onboarding') {
    return (
      <OnboardingScreen
        step={onboardingStep}
        onNext={handleOnboardingNext}
        onComplete={handleOnboardingComplete}
      />
    );
  }

  // Sign-in screen
  if (appState === 'signin') {
    return <SignInScreen onSignIn={handleSignIn} />;
  }

  // Main app
  return (
    <div style={{ 
      maxWidth: '393px',
      minHeight: '100vh',
      margin: '0 auto',
      position: 'relative',
      backgroundColor: 'var(--bg-light)',
    }}>
      {/* Render active screen */}
      {activeScreen === 'home' && <HomeScreen onNavigate={handleNavigate} />}
      {activeScreen === 'medications' && <MedicationsScreen onViewSchedule={() => handleNavigate('medication-schedule')} />}
      {activeScreen === 'medication-schedule' && <MedicationScheduleScreen onBack={handleBackToMedications} />}
      {activeScreen === 'diet' && <DietScreen onAskAI={() => handleNavigate('ai')} />}
      {activeScreen === 'activities' && <ActivitiesScreen onAskAI={() => handleNavigate('ai')} />}
      {activeScreen === 'care-plan' && <CarePlanScreen onBack={handleBackToHome} />}
      {activeScreen === 'appointments' && <AppointmentsScreen />}
      {activeScreen === 'ai' && <AIAssistantScreen />}
      {activeScreen === 'profile' && <ProfileScreen onLogout={handleLogout} onViewCarePlan={() => handleNavigate('care-plan')} />}

      {/* Bottom Navigation - hide on certain screens */}
      {activeScreen !== 'medication-schedule' && activeScreen !== 'care-plan' && activeScreen !== 'appointments' && activeScreen !== 'profile' && (
        <BottomNav activeTab={activeTab} onTabChange={handleTabChange} />
      )}

      {/* Floating Profile Button - show on main tabs */}
      {(activeScreen === 'home' || activeScreen === 'medications' || activeScreen === 'diet' || activeScreen === 'activities' || activeScreen === 'ai') && (
        <button
          onClick={() => handleNavigate('profile')}
          style={{
            position: 'fixed',
            top: '24px',
            right: '16px',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            backgroundColor: 'var(--primary-blue)',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(37, 99, 235, 0.3)',
            color: 'white',
            fontWeight: '600',
            fontSize: '16px',
            maxWidth: '393px',
            margin: '0 auto',
          }}
        >
          MA
        </button>
      )}
    </div>
  );
}
