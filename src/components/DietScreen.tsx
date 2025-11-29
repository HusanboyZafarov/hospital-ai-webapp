import React, { useState, useEffect } from "react";
import {
  MessageSquare,
  CheckCircle,
  XCircle,
  Coffee,
  Sun,
  Moon,
  Cookie,
  Loader2,
  X,
} from "lucide-react";
import { dietPlanService } from "../service/diet-plan";

interface DietScreenProps {
  onAskAI: () => void;
}

interface Meal {
  icon: typeof Coffee;
  name: string;
  time: string;
  foods: string[];
}

interface DietPlanData {
  diet_type?: string;
  daily_calories?: string;
  doctor_note?: string;
  meals?: Array<{
    name: string;
    time: string;
    foods: string[];
  }>;
  allowed_foods?: string[];
  forbidden_foods?: string[];
}

export function DietScreen({ onAskAI }: DietScreenProps) {
  const [dietData, setDietData] = useState<DietPlanData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch diet plan from API
  useEffect(() => {
    const fetchDietPlan = async () => {
      setIsLoading(true);
      setError("");
      try {
        const response = await dietPlanService.getDietPlan();

        // Handle API response
        if (response?.detail) {
          setError(response.detail);
          setDietData(null);
        } else {
          setDietData(response || {});
        }
      } catch (err: any) {
        console.error("Error fetching diet plan:", err);
        let errorMessage = "Failed to load diet plan";

        if (err?.response?.data?.detail) {
          errorMessage = err.response.data.detail;
        } else if (err?.response?.data?.message) {
          errorMessage = err.response.data.message;
        } else if (err?.message) {
          errorMessage = err.message;
        }

        setError(errorMessage);
        setDietData(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDietPlan();
  }, []);

  // Default meals with icons
  const defaultMeals: Meal[] = [
    {
      icon: Coffee,
      name: "Nonushta",
      time: "7:00 - 9:00",
      foods: [
        "Meva bilan yulka",
        "Yunoncha yogurt",
        "To'liq bug'doy noni",
        "O'simlik choyi",
      ],
    },
    {
      icon: Sun,
      name: "Tushlik",
      time: "12:00 - 14:00",
      foods: [
        "Grill qilingan tovuq ko'kragi",
        "Bug'langan sabzavotlar",
        "Jigarrang guruch",
        "Yashil salat",
      ],
    },
    {
      icon: Moon,
      name: "Kechki ovqat",
      time: "18:00 - 20:00",
      foods: [
        "Pishirilgan losos",
        "Kinoa",
        "Pishirilgan sabzavotlar",
        "Yangi mevalar",
      ],
    },
    {
      icon: Cookie,
      name: "Qo'shimcha ovqatlar",
      time: "Har qanday vaqt",
      foods: ["Bodom", "Olma bo'laklari", "Sabzi tayoqchalari", "Hummus"],
    },
  ];

  // Map API meals to UI format with icons
  const getMealsWithIcons = (): Meal[] => {
    if (dietData?.meals && dietData.meals.length > 0) {
      const iconMap: Record<string, typeof Coffee> = {
        breakfast: Coffee,
        nonushta: Coffee,
        lunch: Sun,
        tushlik: Sun,
        dinner: Moon,
        "kechki ovqat": Moon,
        snack: Cookie,
        "qo'shimcha ovqatlar": Cookie,
      };

      return dietData.meals.map((meal) => {
        const mealNameLower = meal.name.toLowerCase();
        let icon = Coffee; // default
        for (const [key, iconValue] of Object.entries(iconMap)) {
          if (mealNameLower.includes(key)) {
            icon = iconValue;
            break;
          }
        }
        return {
          icon,
          name: meal.name,
          time: meal.time,
          foods: meal.foods || [],
        };
      });
    }
    return defaultMeals;
  };

  const meals = getMealsWithIcons();

  const allowedFoods =
    dietData?.allowed_foods && dietData.allowed_foods.length > 0
      ? dietData.allowed_foods
      : [
          "Yengil oqsil (tovuq, baliq, kurka)",
          "To'liq donlar (jigarrang guruch, kinoa, yulka)",
          "Yangi mevalar va sabzavotlar",
          "Past yog'li sut mahsulotlari",
          "Yong'oq va urug'lar (o'rtacha miqdorda)",
          "O'simlik choylari va suv",
        ];

  const forbiddenFoods =
    dietData?.forbidden_foods && dietData.forbidden_foods.length > 0
      ? dietData.forbidden_foods
      : [
          "Achchiq ovqatlar",
          "Spirtli ichimliklar",
          "Kofein (qahva, energiya ichimliklari)",
          "Qovurilgan va yog'li ovqatlar",
          "Qayta ishlangan go'sht mahsulotlari",
          "Yuqori shakarli shirinliklar",
          "Gazlangan ichimliklar",
        ];

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "var(--bg-light)",
        paddingBottom: "160px",
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
        <h2>Ovqatlanish rejasi</h2>
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
            <span>Ovqatlanish rejasi yuklanmoqda...</span>
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
            {/* Diet Overview */}
            <div
              style={{
                backgroundColor: "var(--bg-white)",
                borderRadius: "16px",
                padding: "16px",
                boxShadow: "0 4px 16px rgba(0,0,0,0.05)",
                marginBottom: "24px",
              }}
            >
              <h3 style={{ marginBottom: "12px" }}>Ovqatlanish ko'rinishi</h3>
              <div
                style={{ display: "flex", flexDirection: "column", gap: "8px" }}
              >
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <p style={{ color: "var(--muted-text)" }}>Ovqatlanish turi</p>
                  <p>{dietData?.diet_type || "Jarrozdan keyingi tiklanish"}</p>
                </div>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <p style={{ color: "var(--muted-text)" }}>Kunlik kaloriya</p>
                  <p>{dietData?.daily_calories || "1800-2000 kcal"}</p>
                </div>
                {dietData?.doctor_note && (
                  <div
                    style={{
                      padding: "12px",
                      backgroundColor: "var(--bg-light)",
                      borderRadius: "8px",
                      marginTop: "8px",
                    }}
                  >
                    <p
                      className="caption"
                      style={{ color: "var(--muted-text)" }}
                    >
                      Shifokor eslatmasi: {dietData.doctor_note}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Meals */}
            <div style={{ marginBottom: "24px" }}>
              <h3 style={{ marginBottom: "12px" }}>Kunlik ovqatlar</h3>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                }}
              >
                {meals.map((meal, index) => {
                  const Icon = meal.icon;
                  return (
                    <div
                      key={index}
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
                          gap: "12px",
                          marginBottom: "12px",
                        }}
                      >
                        <div
                          style={{
                            width: "40px",
                            height: "40px",
                            borderRadius: "10px",
                            backgroundColor: "var(--primary-blue)" + "15",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Icon
                            size={20}
                            style={{ color: "var(--primary-blue)" }}
                          />
                        </div>
                        <div>
                          <h3>{meal.name}</h3>
                          <p
                            className="caption"
                            style={{ color: "var(--muted-text)" }}
                          >
                            {meal.time}
                          </p>
                        </div>
                      </div>
                      <ul
                        style={{
                          margin: 0,
                          paddingLeft: "20px",
                          display: "flex",
                          flexDirection: "column",
                          gap: "4px",
                        }}
                      >
                        {meal.foods.map((food, foodIndex) => (
                          <li
                            key={foodIndex}
                            style={{ color: "var(--dark-text)" }}
                          >
                            {food}
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Allowed Foods */}
            <div style={{ marginBottom: "24px" }}>
              <h3 style={{ marginBottom: "12px" }}>Ruxsat etilgan ovqatlar</h3>
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
                    flexDirection: "column",
                    gap: "12px",
                  }}
                >
                  {allowedFoods.map((food, index) => (
                    <div
                      key={index}
                      style={{
                        display: "flex",
                        alignItems: "start",
                        gap: "12px",
                      }}
                    >
                      <CheckCircle
                        size={20}
                        style={{
                          color: "var(--success-green)",
                          flexShrink: 0,
                          marginTop: "2px",
                        }}
                      />
                      <p>{food}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Forbidden Foods */}
            <div style={{ marginBottom: "24px" }}>
              <h3 style={{ marginBottom: "12px" }}>Taqiqlangan ovqatlar</h3>
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
                    flexDirection: "column",
                    gap: "12px",
                  }}
                >
                  {forbiddenFoods.map((food, index) => (
                    <div
                      key={index}
                      style={{
                        display: "flex",
                        alignItems: "start",
                        gap: "12px",
                      }}
                    >
                      <XCircle
                        size={20}
                        style={{
                          color: "var(--error-red)",
                          flexShrink: 0,
                          marginTop: "2px",
                        }}
                      />
                      <p>{food}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Fixed Ask AI Button */}
      <div
        style={{
          position: "fixed",
          bottom: "68px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "100%",
          maxWidth: "393px",
          padding: "16px",
        }}
      >
        <button
          onClick={onAskAI}
          style={{
            width: "100%",
            backgroundColor: "var(--primary-blue)",
            color: "white",
            padding: "16px",
            borderRadius: "12px",
            border: "none",
            cursor: "pointer",
            fontWeight: "500",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            boxShadow: "0 4px 12px rgba(37, 99, 235, 0.3)",
          }}
        >
          <MessageSquare size={20} />
          AI dan ovqatlar haqida so'rang
        </button>
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
