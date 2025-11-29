import React, { useState, useMemo, useEffect } from "react";
import {
  Pill,
  Utensils,
  Activity,
  Calendar,
  Check,
  Heart,
  Sparkles,
  FileText,
  Loader2,
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { homeService } from "../service/home";

interface HomeScreenProps {
  onNavigate: (screen: string) => void;
}

interface Task {
  id: number;
  title: string;
  completed: boolean;
}

export function HomeScreen({ onNavigate }: HomeScreenProps) {
  const { user } = useAuth();
  const userName = user?.name || user?.username || "there";
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoadingTasks, setIsLoadingTasks] = useState(true);
  const [error, setError] = useState("");

  // Fetch tasks from API on mount
  useEffect(() => {
    const fetchTasks = async () => {
      setIsLoadingTasks(true);
      setError("");
      try {
        const response = await homeService.getHome();
        // Handle API response - adjust based on actual API structure
        if (response?.tasks && Array.isArray(response.tasks)) {
          setTasks(response.tasks);
        } else if (Array.isArray(response)) {
          setTasks(response);
        } else {
          // Fallback to default tasks if API doesn't return expected format
          setTasks([
            {
              id: 1,
              title: "Ertalabki dori-darmonlarni ichish",
              completed: true,
            },
            {
              id: 2,
              title: "Nonushta - Ovqatlanish rejasiga rioya qilish",
              completed: true,
            },
            {
              id: 3,
              title: "Tushdan keyingi dori-darmonlarni ichish",
              completed: false,
            },
            {
              id: 4,
              title: "Og'ir jismoniy mashqlardan saqlanish",
              completed: false,
            },
            {
              id: 5,
              title: "Kechki dori-darmonlarni eslatma",
              completed: false,
            },
          ]);
        }
      } catch (err: any) {
        console.error("Error fetching tasks:", err);
        setError("Vazifalarni yuklashda xatolik yuz berdi");
        // Use default tasks on error
        setTasks([
          {
            id: 1,
            title: "Ertalabki dori-darmonlarni ichish",
            completed: true,
          },
          {
            id: 2,
            title: "Nonushta - Ovqatlanish rejasiga rioya qilish",
            completed: true,
          },
          {
            id: 3,
            title: "Tushdan keyingi dori-darmonlarni ichish",
            completed: false,
          },
          {
            id: 4,
            title: "Og'ir jismoniy mashqlardan saqlanish",
            completed: false,
          },
          { id: 5, title: "Kechki dori-darmonlarni eslatma", completed: false },
        ]);
      } finally {
        setIsLoadingTasks(false);
      }
    };

    fetchTasks();
  }, []);

  const completedCount = tasks.filter((t) => t.completed).length;
  const progressPercent =
    tasks.length > 0 ? (completedCount / tasks.length) * 100 : 0;

  // Motivational messages in Uzbek
  const motivationalMessages = useMemo(() => {
    const messages = [
      "Har bir kun yangi imkoniyatdir. Bugun ham yaxshiroq bo'lishingiz mumkin! 💪",
      "Sizning kuchlilik va sabringiz sizni yanada kuchliroq qiladi. Davom eting! 🌟",
      "Kichik qadamlar ham katta natijalarga olib keladi. Har kuni yaxshilashyapsiz! ✨",
      "Sizning irodangiz va ijobiy fikrlashingiz tuzalishingizga yordam beradi. 💚",
      "Har bir kichik yutuq - bu katta g'alaba. O'zingiz bilan faxrlanishingiz mumkin! 🎯",
      "Bugun ham o'zingizga g'amxo'rlik qiling. Siz buni qilyapsiz! 🌸",
      "Sabr va izchillik - bu muvaffaqiyatning kalitidir. Siz yo'ldasiz! 🚀",
      "Har kuni yangi boshlanishdir. Bugun ham yaxshi kun bo'lsin! ☀️",
      "Sizning salomatligingiz eng muhim narsa. Har kuni o'zingizga yaxshilik qiling! 💙",
      "Kichik o'zgarishlar ham katta farq qiladi. Davom eting! 🌈",
      "Sizning kuchlilik va irodangiz sizni yanada kuchliroq qiladi. 💪",
      "Har bir kun sizga yangi imkoniyat beradi. Undan foydalaning! ⭐",
      "Sizning ijobiy fikrlashingiz va harakatlaringiz natijalar beradi! 🌺",
      "Bugun ham o'zingizga e'tibor bering. Siz buni qilyapsiz! 💫",
      "Har bir kichik yutuq - bu katta g'alaba. O'zingiz bilan faxrlanishingiz mumkin! 🎉",
    ];
    return messages[Math.floor(Math.random() * messages.length)];
  }, []);

  const motivationalIcon = useMemo(() => {
    const icons = [Heart, Sparkles];
    return icons[Math.floor(Math.random() * icons.length)];
  }, []);

  const toggleTask = async (id: number) => {
    const task = tasks.find((t) => t.id === id);
    if (!task) return;

    const newCompleted = !task.completed;

    // Optimistic update
    setTasks(
      tasks.map((t) => (t.id === id ? { ...t, completed: newCompleted } : t))
    );

    // Update on server
    try {
      await homeService.taskStatus(id, newCompleted);
    } catch (err: any) {
      console.error("Error updating task status:", err);
      // Revert on error
      setTasks(
        tasks.map((t) => (t.id === id ? { ...t, completed: !newCompleted } : t))
      );
    }
  };

  const cards = [
    {
      icon: Pill,
      title: "Dori-darmonlar",
      subtitle: "Dori-darmonlaringizni ko'ring",
      color: "var(--primary-blue)",
      nav: "medications",
    },
    {
      icon: Utensils,
      title: "Ovqatlanish rejasi",
      subtitle: "Ovqatlanish rejangizni ko'ring",
      color: "var(--success-green)",
      nav: "diet",
    },
    {
      icon: Activity,
      title: "Faoliyatlar",
      subtitle: "Faoliyatlaringizni ko'ring",
      color: "var(--secondary-teal)",
      nav: "activities",
    },
    {
      icon: FileText,
      title: "Parvarish rejasi",
      subtitle: "Parvarish rejangizni ko'ring",
      color: "var(--warning-yellow)",
      nav: "care-plan",
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
        <h2 style={{ marginBottom: "4px" }}>Salom, {userName} 👋</h2>
        <p style={{ color: "var(--muted-text)" }}>
          Bugungi sizning reabilitatsiyangiz haqida ma'lumotlar
        </p>
      </div>

      <div style={{ padding: "16px" }}>
        {/* Motivational Banner */}
        <div
          style={{
            backgroundColor: "#E0F2FE",
            borderLeft: "4px solid var(--primary-blue)",
            borderRadius: "12px",
            padding: "16px",
            marginBottom: "24px",
            display: "flex",
            gap: "12px",
          }}
        >
          {(() => {
            const Icon = motivationalIcon;
            return (
              <Icon
                size={20}
                style={{
                  color: "var(--primary-blue)",
                  flexShrink: 0,
                  marginTop: "2px",
                }}
              />
            );
          })()}
          <p
            style={{
              fontSize: "14px",
              color: "#0C4A6E",
              margin: 0,
              lineHeight: "1.5",
            }}
          >
            {motivationalMessages}
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
                  <h4 style={{ marginBottom: "4px", fontWeight: "700" }}>
                    {card.title}
                  </h4>
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
              <h3>Bugungi vazifalar</h3>
              {!isLoadingTasks && (
                <span
                  className="caption"
                  style={{ color: "var(--muted-text)" }}
                >
                  {completedCount}/{tasks.length}
                </span>
              )}
            </div>
            {!isLoadingTasks && (
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
            )}
          </div>

          {isLoadingTasks ? (
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
              <span>Vazifalar yuklanmoqda...</span>
            </div>
          ) : error ? (
            <div
              style={{
                padding: "16px",
                backgroundColor: "#FEE2E2",
                color: "#DC2626",
                borderRadius: "12px",
                fontSize: "14px",
              }}
            >
              {error}
            </div>
          ) : tasks.length === 0 ? (
            <div
              style={{
                padding: "40px",
                textAlign: "center",
                color: "var(--muted-text)",
              }}
            >
              <p>Bugun vazifalar yo'q</p>
            </div>
          ) : (
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
