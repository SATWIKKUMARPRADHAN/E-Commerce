// Floating Chatbot Widget Component
// Appears on all pages as a floating button that expands into a chat window
import { useState, useEffect, useRef } from 'react';
import { sendChatbotMessage } from '../api.js';
import './ChatbotWidget.css';

function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      text: 'Hello! I\'m your customer support assistant. How can I help you today?',
      sender: 'bot',
      timestamp: new Date().toISOString()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const widgetRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Close widget when clicking outside
    const handleClickOutside = (event) => {
      if (widgetRef.current && !widgetRef.current.contains(event.target)) {
        // Don't close if clicking the toggle button
        if (!event.target.closest('.chatbot-toggle-btn')) {
          // Keep widget open for now - user can close manually
        }
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSend = async (e) => {
    e.preventDefault();
    
    if (!inputMessage.trim() || loading) return;

    const userMessage = {
      text: inputMessage,
      sender: 'user',
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setLoading(true);

    try {
      const response = await sendChatbotMessage(inputMessage);
      
      const botMessage = {
        text: response.response,
        sender: 'bot',
        timestamp: response.timestamp,
        intent: response.intent
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      const errorMessage = {
        text: 'Sorry, I encountered an error. Please try again later.',
        sender: 'bot',
        timestamp: new Date().toISOString()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleQuickQuestion = (question) => {
    setInputMessage(question);
    setIsOpen(true);
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <button
        className="chatbot-toggle-btn"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Open chat support"
      >
        {isOpen ? '✕' : '💬'}
        {!isOpen && <span className="chatbot-badge">1</span>}
      </button>

      {/* Chat Widget Window */}
      {isOpen && (
        <div className="chatbot-widget-container" ref={widgetRef}>
          <div className="chatbot-widget-header">
            <div className="chatbot-header-content">
              <span className="chatbot-icon">💬</span>
              <div>
                <h3>Customer Support</h3>
                <p className="chatbot-status">Online</p>
              </div>
            </div>
            <button
              className="chatbot-close-btn"
              onClick={() => setIsOpen(false)}
              aria-label="Close chat"
            >
              ✕
            </button>
          </div>

          <div className="chatbot-widget-messages">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`chatbot-message ${message.sender === 'user' ? 'user-message' : 'bot-message'}`}
              >
                <div className="chatbot-message-content">
                  <p>{message.text}</p>
                  <span className="chatbot-message-time">{formatTime(message.timestamp)}</span>
                </div>
              </div>
            ))}
            {loading && (
              <div className="chatbot-message bot-message">
                <div className="chatbot-message-content">
                  <p className="typing-indicator">Typing...</p>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="chatbot-quick-questions">
            <button onClick={() => handleQuickQuestion('How do I track my order?')}>
              Track Order
            </button>
            <button onClick={() => handleQuickQuestion('What products do you have?')}>
              Browse Products
            </button>
            <button onClick={() => handleQuickQuestion('How do I return an item?')}>
              Returns
            </button>
          </div>

          <form className="chatbot-widget-input-form" onSubmit={handleSend}>
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Type your message..."
              disabled={loading}
              className="chatbot-widget-input"
              autoFocus
            />
            <button
              type="submit"
              disabled={loading || !inputMessage.trim()}
              className="chatbot-widget-send-btn"
            >
              Send
            </button>
          </form>
        </div>
      )}
    </>
  );
}

export default ChatbotWidget;

