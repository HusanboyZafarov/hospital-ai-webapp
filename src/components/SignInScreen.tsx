import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { ROUTES } from "../constants/paths";

export function SignInScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login, isLoading, isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate(ROUTES.HOME);
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!username.trim() || !password.trim()) {
      setError("Iltimos, foydalanuvchi nomi va parolni kiriting");
      return;
    }

    try {
      // Login and store user (handled by AuthContext)
      // This will:
      // 1. Call authService.login()
      // 2. Store tokens via setSession()
      // 3. Store user data in localStorage under "hospital_ai_auth"
      // 4. Update user state via setUser()
      await login(username.trim(), password);

      // Verify user is stored in localStorage
      const storedAuth = localStorage.getItem("hospital_ai_auth");
      if (!storedAuth) {
        throw new Error("Failed to store user data");
      }

      const authData = JSON.parse(storedAuth);
      console.log("✅ User stored successfully:", {
        id: authData.user?.id,
        username: authData.user?.username,
        name: authData.user?.name,
        role: authData.user?.role,
      });

      // Navigate to home - user is now stored and authenticated
      navigate(ROUTES.HOME);
    } catch (err: any) {
      const errorMessage =
        err?.response?.data?.message ||
        err?.message ||
        "Kirish muvaffaqiyatsiz. Iltimos, qayta urinib ko'ring.";
      setError(errorMessage);
    }
  };

  return (
    <div
      className="flex flex-col min-h-screen"
      style={{ backgroundColor: "var(--bg-white)" }}
    >
      <div className="flex-1 flex flex-col justify-center px-4">
        <div className="max-w-sm mx-auto w-full">
          <h1 className="mb-2">Kirish</h1>
          <p style={{ color: "var(--muted-text)", marginBottom: "32px" }}>
            Hospital AI yordamchingizga xush kelibsiz
          </p>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="username"
                className="caption block mb-2"
                style={{ color: "var(--dark-text)" }}
              >
                Foydalanuvchi nomi
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Foydalanuvchi nomingizni kiriting"
                required
                autoComplete="username"
                disabled={isLoading}
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  borderRadius: "12px",
                  border: "1px solid var(--border-grey)",
                  backgroundColor: isLoading
                    ? "var(--card-grey)"
                    : "var(--bg-light)",
                  fontSize: "15px",
                  outline: "none",
                  transition: "background-color 0.2s",
                }}
              />
            </div>

            <div className="mb-2">
              <label
                htmlFor="password"
                className="caption block mb-2"
                style={{ color: "var(--dark-text)" }}
              >
                Parol
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Parolingizni kiriting"
                required
                autoComplete="current-password"
                disabled={isLoading}
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  borderRadius: "12px",
                  border: "1px solid var(--border-grey)",
                  backgroundColor: isLoading
                    ? "var(--card-grey)"
                    : "var(--bg-light)",
                  fontSize: "15px",
                  outline: "none",
                  transition: "background-color 0.2s",
                }}
              />
            </div>

            <div className="text-right mb-6">
              <button
                type="button"
                className="caption"
                style={{
                  color: "var(--primary-blue)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: "4px 0",
                }}
              >
                Parolni unutdingizmi?
              </button>
            </div>

            {error && (
              <div
                className="mb-4 p-3 rounded-lg"
                style={{ backgroundColor: "#FEE2E2", color: "#DC2626" }}
              >
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              style={{
                width: "100%",
                backgroundColor: isLoading ? "#94A3B8" : "var(--primary-blue)",
                color: "white",
                padding: "16px",
                borderRadius: "12px",
                border: "none",
                cursor: isLoading ? "not-allowed" : "pointer",
                fontSize: "16px",
                fontWeight: "500",
              }}
            >
              {isLoading ? "Kirilmoqda..." : "Kirish"}
            </button>
          </form>
        </div>
      </div>

      <div
        className="text-center pb-8 caption"
        style={{ color: "var(--muted-text)" }}
      >
        Hospital AI System tomonidan yaratilgan
      </div>
    </div>
  );
}
