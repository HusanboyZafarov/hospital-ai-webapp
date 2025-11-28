import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export function SignInScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login, isLoading, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/home");
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await login(email, password);
      navigate("/home");
    } catch (err) {
      setError("Login failed. Please try again.");
    }
  };

  return (
    <div
      className="flex flex-col min-h-screen"
      style={{ backgroundColor: "var(--bg-white)" }}
    >
      <div className="flex-1 flex flex-col justify-center px-4">
        <div className="max-w-sm mx-auto w-full">
          <h1 className="mb-2">Sign In</h1>
          <p style={{ color: "var(--muted-text)", marginBottom: "32px" }}>
            Welcome back to your recovery companion
          </p>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="caption block mb-2"
                style={{ color: "var(--dark-text)" }}
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your.email@example.com"
                required
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  borderRadius: "12px",
                  border: "1px solid var(--border-grey)",
                  backgroundColor: "var(--bg-light)",
                  fontSize: "15px",
                  outline: "none",
                }}
              />
            </div>

            <div className="mb-2">
              <label
                htmlFor="password"
                className="caption block mb-2"
                style={{ color: "var(--dark-text)" }}
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  borderRadius: "12px",
                  border: "1px solid var(--border-grey)",
                  backgroundColor: "var(--bg-light)",
                  fontSize: "15px",
                  outline: "none",
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
                Forgot password?
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
              {isLoading ? "Signing in..." : "Sign In"}
            </button>
          </form>
        </div>
      </div>

      <div
        className="text-center pb-8 caption"
        style={{ color: "var(--muted-text)" }}
      >
        Powered by Hospital AI System
      </div>
    </div>
  );
}
