import React, { useState } from "react";
import {
  Pill,
  Utensils,
  Activity,
  Calendar,
  Check,
  AlertTriangle,
} from "lucide-react";

interface HomeScreenProps {
  onNavigate: (screen: string) => void;
}

export function HomeScreen({ onNavigate }: HomeScreenProps) {
  const [tasks, setTasks] = useState([
    { id: 1, title: "Take morning medication", completed: true },
    { id: 2, title: "Breakfast - Follow meal plan", completed: true },
    { id: 3, title: "Take afternoon medication", completed: false },
    { id: 4, title: "Avoid strenuous activities", completed: false },
    { id: 5, title: "Evening medication reminder", completed: false },
  ]);

  const completedCount = tasks.filter((t) => t.completed).length;
  const progressPercent = (completedCount / tasks.length) * 100;

  const toggleTask = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const cards = [
    {
      icon: Pill,
      title: "Medications",
      subtitle: "3 today",
      color: "var(--primary-blue)",
      nav: "medications",
    },
    {
      icon: Utensils,
      title: "Diet Plan",
      subtitle: "On track",
      color: "var(--success-green)",
      nav: "diet",
    },
    {
      icon: Activity,
      title: "Activities",
      subtitle: "View safe",
      color: "var(--secondary-teal)",
      nav: "activities",
    },
    {
      icon: Calendar,
      title: "Appointments",
      subtitle: "Next: Dec 2",
      color: "var(--warning-yellow)",
      nav: "appointments",
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
        }}
      >
        <h2 style={{ marginBottom: "4px" }}>Hi, Mohammad 👋</h2>
        <p style={{ color: "var(--muted-text)" }}>Here's your recovery today</p>
      </div>

      <div style={{ padding: "16px" }}>
        {/* Alert Banner */}
        <div
          style={{
            backgroundColor: "#FEF3C7",
            borderLeft: "4px solid var(--warning-yellow)",
            borderRadius: "12px",
            padding: "16px",
            marginBottom: "24px",
            display: "flex",
            gap: "12px",
          }}
        >
          <AlertTriangle
            size={20}
            style={{ color: "#D97706", flexShrink: 0, marginTop: "2px" }}
          />
          <p style={{ fontSize: "14px", color: "#92400E", margin: 0 }}>
            With your current symptoms, caution is advised today.
          </p>
        </div>

        {/* Quick Cards Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "12px",
            marginBottom: "24px",
          }}
        >
          {cards.map((card, index) => {
            const Icon = card.icon;
            return (
              <button
                key={index}
                onClick={() => onNavigate(card.nav)}
                style={{
                  backgroundColor: "var(--bg-white)",
                  borderRadius: "16px",
                  padding: "16px",
                  border: "none",
                  cursor: "pointer",
                  textAlign: "left",
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
                    backgroundColor: card.color + "15",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Icon
                    size={20}
                    style={{ color: card.color }}
                    strokeWidth={2}
                  />
                </div>
                <div>
                  <h3 style={{ marginBottom: "4px" }}>{card.title}</h3>
                  <p className="caption" style={{ color: "var(--muted-text)" }}>
                    {card.subtitle}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Today's Tasks */}
        <div
          style={{
            backgroundColor: "var(--bg-white)",
            borderRadius: "16px",
            padding: "16px",
            boxShadow: "0 4px 16px rgba(0,0,0,0.05)",
          }}
        >
          <div style={{ marginBottom: "16px" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "8px",
              }}
            >
              <h3>Today's Tasks</h3>
              <span className="caption" style={{ color: "var(--muted-text)" }}>
                {completedCount}/{tasks.length}
              </span>
            </div>
            <div
              style={{
                height: "6px",
                backgroundColor: "var(--card-grey)",
                borderRadius: "3px",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  height: "100%",
                  width: `${progressPercent}%`,
                  backgroundColor: "var(--success-green)",
                  transition: "width 0.3s ease",
                }}
              />
            </div>
          </div>

          <div
            style={{ display: "flex", flexDirection: "column", gap: "12px" }}
          >
            {tasks.map((task) => (
              <button
                key={task.id}
                onClick={() => toggleTask(task.id)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: "12px",
                  backgroundColor: "var(--bg-light)",
                  borderRadius: "12px",
                  border: "none",
                  cursor: "pointer",
                  textAlign: "left",
                  width: "100%",
                }}
              >
                <div
                  style={{
                    width: "20px",
                    height: "20px",
                    borderRadius: "6px",
                    border: task.completed
                      ? "none"
                      : "2px solid var(--border-grey)",
                    backgroundColor: task.completed
                      ? "var(--success-green)"
                      : "transparent",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  {task.completed && (
                    <Check size={14} color="white" strokeWidth={3} />
                  )}
                </div>
                <p
                  style={{
                    color: task.completed
                      ? "var(--muted-text)"
                      : "var(--dark-text)",
                    textDecoration: task.completed ? "line-through" : "none",
                  }}
                >
                  {task.title}
                </p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
