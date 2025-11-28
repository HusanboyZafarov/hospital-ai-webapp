import React, { useState, useRef, useEffect } from "react";
import { Send } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import aiChatService from "../service/aiChat";

interface Message {
  id: number;
  type: "user" | "ai";
  text: string;
  time: string;
}

export function AIAssistantScreen() {
  const { user } = useAuth();
  const userName = user?.name || user?.username || "there";
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize with welcome message
  useEffect(() => {
    if (messages.length === 0) {
      const welcomeMessage: Message = {
        id: 1,
        type: "ai",
        text: `Hi ${userName}! I'm your AI recovery assistant. I can help you with questions about your medications, diet, activities, and symptoms. How can I help you today?`,
        time: new Date().toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
        }),
      };
      setMessages([welcomeMessage]);
    }
  }, [userName, messages.length]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!inputValue.trim() || isTyping) return;

    const question = inputValue.trim();
    const userMessage: Message = {
      id: Date.now(),
      type: "user",
      text: question,
      time: new Date().toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);
    setError("");

    try {
      // Call real AI chat API
      const response = await aiChatService.postChat(question);

      console.log("🔍 AI Chat response:", response);

      const aiResponse: Message = {
        id: Date.now() + 1,
        type: "ai",
        text:
          response?.answer ||
          response?.response ||
          response?.message ||
          "I understand your question. Based on your current recovery plan and health status, let me provide you with personalized guidance. Always remember to consult your doctor for specific medical advice.",
        time: new Date().toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
        }),
      };

      setMessages((prev) => [...prev, aiResponse]);
    } catch (err: any) {
      console.error("AI Chat error:", err);
      const errorMessage =
        err?.response?.data?.message ||
        err?.message ||
        "Sorry, I'm having trouble connecting. Please try again.";
      setError(errorMessage);

      const errorResponse: Message = {
        id: Date.now() + 1,
        type: "ai",
        text: `Sorry, I encountered an error: ${errorMessage}. Please try again or contact your healthcare provider for immediate assistance.`,
        time: new Date().toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
        }),
      };
      setMessages((prev) => [...prev, errorResponse]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const suggestions = [
    "Explain my medication schedule",
    "What foods should I avoid?",
    "Can I exercise today?",
    "I have a headache, what should I do?",
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "var(--bg-light)",
        display: "flex",
        flexDirection: "column",
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
        <h2>Ask AI</h2>
        <p style={{ color: "var(--muted-text)", marginTop: "4px" }}>
          Your personal health assistant
        </p>
      </div>

      {/* Messages */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "16px",
          paddingBottom: "88px",
        }}
      >
        {messages.map((message) => (
          <div
            key={message.id}
            style={{
              display: "flex",
              justifyContent:
                message.type === "user" ? "flex-end" : "flex-start",
              marginBottom: "16px",
            }}
          >
            <div
              style={{
                maxWidth: "80%",
                padding: "12px 16px",
                borderRadius: "16px",
                backgroundColor:
                  message.type === "user"
                    ? "var(--primary-blue)"
                    : "var(--bg-white)",
                color: message.type === "user" ? "white" : "var(--dark-text)",
                boxShadow:
                  message.type === "ai" ? "0 2px 8px rgba(0,0,0,0.05)" : "none",
              }}
            >
              <p style={{ marginBottom: "4px" }}>{message.text}</p>
              <p
                className="caption"
                style={{
                  color:
                    message.type === "user"
                      ? "rgba(255,255,255,0.7)"
                      : "var(--muted-text)",
                  fontSize: "12px",
                }}
              >
                {message.time}
              </p>
            </div>
          </div>
        ))}

        {isTyping && (
          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
              marginBottom: "16px",
            }}
          >
            <div
              style={{
                padding: "12px 16px",
                borderRadius: "16px",
                backgroundColor: "var(--bg-white)",
                boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
              }}
            >
              <div style={{ display: "flex", gap: "4px" }}>
                <div
                  style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    backgroundColor: "var(--muted-text)",
                    animation: "bounce 1.4s infinite ease-in-out both",
                    animationDelay: "0s",
                  }}
                />
                <div
                  style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    backgroundColor: "var(--muted-text)",
                    animation: "bounce 1.4s infinite ease-in-out both",
                    animationDelay: "0.16s",
                  }}
                />
                <div
                  style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    backgroundColor: "var(--muted-text)",
                    animation: "bounce 1.4s infinite ease-in-out both",
                    animationDelay: "0.32s",
                  }}
                />
              </div>
            </div>
          </div>
        )}

        {messages.length === 1 && (
          <div style={{ marginTop: "8px" }}>
            <p
              className="caption"
              style={{ color: "var(--muted-text)", marginBottom: "8px" }}
            >
              Quick suggestions:
            </p>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "8px" }}
            >
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setInputValue(suggestion);
                    setTimeout(() => handleSend(), 100);
                  }}
                  disabled={isTyping}
                  style={{
                    backgroundColor: "var(--bg-white)",
                    border: "1px solid var(--border-grey)",
                    borderRadius: "12px",
                    padding: "12px",
                    textAlign: "left",
                    cursor: isTyping ? "not-allowed" : "pointer",
                    color: "var(--primary-blue)",
                    opacity: isTyping ? 0.6 : 1,
                  }}
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}

        {error && (
          <div
            style={{
              backgroundColor: "#FEE2E2",
              color: "#DC2626",
              padding: "12px",
              borderRadius: "12px",
              marginTop: "8px",
              fontSize: "14px",
            }}
          >
            {error}
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div
        style={{
          position: "fixed",
          bottom: "72px",
          left: 0,
          right: 0,
          maxWidth: "393px",
          margin: "0 auto",
          backgroundColor: "var(--bg-white)",
          borderTop: "1px solid var(--border-grey)",
          padding: "16px",
        }}
      >
        <div style={{ display: "flex", gap: "8px", alignItems: "flex-end" }}>
          <textarea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask me anything..."
            rows={1}
            disabled={isTyping}
            style={{
              flex: 1,
              padding: "12px 16px",
              borderRadius: "12px",
              border: "1px solid var(--border-grey)",
              backgroundColor: isTyping
                ? "var(--card-grey)"
                : "var(--bg-light)",
              fontSize: "15px",
              outline: "none",
              resize: "none",
              fontFamily: "Inter, sans-serif",
              maxHeight: "100px",
              cursor: isTyping ? "not-allowed" : "text",
            }}
          />
          <button
            onClick={handleSend}
            disabled={!inputValue.trim() || isTyping}
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "12px",
              backgroundColor:
                inputValue.trim() && !isTyping
                  ? "var(--primary-blue)"
                  : "var(--card-grey)",
              border: "none",
              cursor:
                inputValue.trim() && !isTyping ? "pointer" : "not-allowed",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <Send
              size={20}
              style={{
                color:
                  inputValue.trim() && !isTyping
                    ? "white"
                    : "var(--muted-text)",
              }}
            />
          </button>
        </div>
      </div>

      <style>{`
        @keyframes bounce {
          0%, 80%, 100% {
            transform: scale(0);
          }
          40% {
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
}
