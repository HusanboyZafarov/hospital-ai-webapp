import { Send, Mic } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

export function AIAssistantScreen() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'ai',
      text: "Hi Mohammad! I'm your AI recovery assistant. I can help you with questions about your medications, diet, activities, and symptoms. How can I help you today?",
      time: '10:30 AM'
    },
    {
      id: 2,
      type: 'user',
      text: "Can I eat spicy food?",
      time: '10:31 AM'
    },
    {
      id: 3,
      type: 'ai',
      text: "Based on your post-surgical recovery plan, I recommend avoiding spicy foods for now. Spicy foods can cause inflammation and may interfere with healing. Stick to the bland, nutritious foods in your diet plan. You can gradually reintroduce spicy foods after discussing with your doctor.",
      time: '10:31 AM'
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (inputValue.trim()) {
      const newMessage = {
        id: messages.length + 1,
        type: 'user' as const,
        text: inputValue,
        time: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
      };
      setMessages([...messages, newMessage]);
      setInputValue('');
      setIsTyping(true);

      // Simulate AI response
      setTimeout(() => {
        const aiResponse = {
          id: messages.length + 2,
          type: 'ai' as const,
          text: "I understand your question. Based on your current recovery plan and health status, let me provide you with personalized guidance. Always remember to consult your doctor for specific medical advice.",
          time: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
        };
        setMessages(prev => [...prev, aiResponse]);
        setIsTyping(false);
      }, 1500);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
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
    <div style={{ 
      minHeight: '100vh',
      backgroundColor: 'var(--bg-light)',
      display: 'flex',
      flexDirection: 'column',
    }}>
      {/* Header */}
      <div style={{ 
        backgroundColor: 'var(--bg-white)',
        padding: '16px',
        paddingTop: '24px',
        borderBottom: '1px solid var(--border-grey)',
      }}>
        <h2>Ask AI</h2>
        <p style={{ color: 'var(--muted-text)', marginTop: '4px' }}>
          Your personal health assistant
        </p>
      </div>

      {/* Messages */}
      <div style={{ 
        flex: 1, 
        overflowY: 'auto',
        padding: '16px',
        paddingBottom: '88px',
      }}>
        {messages.map((message) => (
          <div
            key={message.id}
            style={{
              display: 'flex',
              justifyContent: message.type === 'user' ? 'flex-end' : 'flex-start',
              marginBottom: '16px',
            }}
          >
            <div
              style={{
                maxWidth: '80%',
                padding: '12px 16px',
                borderRadius: '16px',
                backgroundColor: message.type === 'user' ? 'var(--primary-blue)' : 'var(--bg-white)',
                color: message.type === 'user' ? 'white' : 'var(--dark-text)',
                boxShadow: message.type === 'ai' ? '0 2px 8px rgba(0,0,0,0.05)' : 'none',
              }}
            >
              <p style={{ marginBottom: '4px' }}>{message.text}</p>
              <p 
                className="caption" 
                style={{ 
                  color: message.type === 'user' ? 'rgba(255,255,255,0.7)' : 'var(--muted-text)',
                  fontSize: '12px'
                }}
              >
                {message.time}
              </p>
            </div>
          </div>
        ))}

        {isTyping && (
          <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: '16px' }}>
            <div
              style={{
                padding: '12px 16px',
                borderRadius: '16px',
                backgroundColor: 'var(--bg-white)',
                boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
              }}
            >
              <div style={{ display: 'flex', gap: '4px' }}>
                <div style={{ 
                  width: '8px', 
                  height: '8px', 
                  borderRadius: '50%', 
                  backgroundColor: 'var(--muted-text)',
                  animation: 'bounce 1.4s infinite ease-in-out both',
                  animationDelay: '0s',
                }} />
                <div style={{ 
                  width: '8px', 
                  height: '8px', 
                  borderRadius: '50%', 
                  backgroundColor: 'var(--muted-text)',
                  animation: 'bounce 1.4s infinite ease-in-out both',
                  animationDelay: '0.16s',
                }} />
                <div style={{ 
                  width: '8px', 
                  height: '8px', 
                  borderRadius: '50%', 
                  backgroundColor: 'var(--muted-text)',
                  animation: 'bounce 1.4s infinite ease-in-out both',
                  animationDelay: '0.32s',
                }} />
              </div>
            </div>
          </div>
        )}

        {messages.length === 3 && (
          <div style={{ marginTop: '8px' }}>
            <p className="caption" style={{ color: 'var(--muted-text)', marginBottom: '8px' }}>
              Quick suggestions:
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => setInputValue(suggestion)}
                  style={{
                    backgroundColor: 'var(--bg-white)',
                    border: '1px solid var(--border-grey)',
                    borderRadius: '12px',
                    padding: '12px',
                    textAlign: 'left',
                    cursor: 'pointer',
                    color: 'var(--primary-blue)',
                  }}
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div style={{
        position: 'fixed',
        bottom: '72px',
        left: 0,
        right: 0,
        maxWidth: '393px',
        margin: '0 auto',
        backgroundColor: 'var(--bg-white)',
        borderTop: '1px solid var(--border-grey)',
        padding: '16px',
      }}>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-end' }}>
          <textarea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask me anything..."
            rows={1}
            style={{
              flex: 1,
              padding: '12px 16px',
              borderRadius: '12px',
              border: '1px solid var(--border-grey)',
              backgroundColor: 'var(--bg-light)',
              fontSize: '15px',
              outline: 'none',
              resize: 'none',
              fontFamily: 'Inter, sans-serif',
              maxHeight: '100px',
            }}
          />
          <button
            onClick={handleSend}
            disabled={!inputValue.trim()}
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              backgroundColor: inputValue.trim() ? 'var(--primary-blue)' : 'var(--card-grey)',
              border: 'none',
              cursor: inputValue.trim() ? 'pointer' : 'not-allowed',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <Send size={20} style={{ color: inputValue.trim() ? 'white' : 'var(--muted-text)' }} />
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
