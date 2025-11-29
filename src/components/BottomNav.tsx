import React from "react";
import { Home, Pill, Utensils, Activity, MessageSquare } from "lucide-react";

interface BottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  const tabs = [
    { id: "home", icon: Home, label: "Asosiy" },
    { id: "medications", icon: Pill, label: "Dorilar" },
    { id: "diet", icon: Utensils, label: "Ovqat" },
    { id: "activities", icon: Activity, label: "Faoliyatlar" },
    { id: "ai", icon: MessageSquare, label: "AI chat" },
  ];

  return (
    <div
      className="fixed bottom-0 left-0 right-0 bg-white border-t"
      style={{
        borderColor: "var(--border-grey)",
        height: "72px",
        maxWidth: "393px",
        margin: "0 auto",
      }}
    >
      <div className="flex items-center justify-around h-full px-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className="flex flex-col items-center justify-center gap-1 flex-1"
              style={{
                color: isActive ? "var(--primary-blue)" : "var(--muted-text)",
                padding: "8px",
              }}
            >
              <Icon size={24} strokeWidth={2} />
              <span className="caption">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
