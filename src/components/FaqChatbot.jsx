import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send } from 'lucide-react';
import { getBotResponse } from './FaqBotService';
import '../styles/faq-chatbot.css'; 

const FaqChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hi! I'm the AlgoVisualizer FAQ bot. I'm here to answer questions that are very commonly asked", sender: 'bot' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleToggle = () => setIsOpen(prev => !prev);

  const handleSendMessage = (e) => {
    e.preventDefault();
    const userMessage = inputValue.trim();
    if (!userMessage) return;

    setMessages(prev => [...prev, { text: userMessage, sender: 'user' }]);
    setInputValue('');

    
    setTimeout(() => {
      const botResponse = getBotResponse(userMessage);
      if (botResponse) {
        setMessages(prev => [...prev, { text: botResponse, sender: 'bot' }]);
      }
    }, 1000);
  };

  return (
    <div className="chatbot-container">
      {isOpen && (
        <div className="chat-window">
          <div className="chat-header">
            <h3>AlgoVisualizer FAQ Bot</h3>
            <button onClick={handleToggle} className="close-btn"><X size={15} /></button>
          </div>
          <div className="chat-body">
            {messages.map((msg, index) => (
              <div key={index} className={`chat-message ${msg.sender}`}>
                {msg.text}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <form className="chat-footer" onSubmit={handleSendMessage}>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask a question..."
            />
            <button type="submit"><Send size={18} /></button>
          </form>
        </div>
      )}
      <button className="chat-toggle-btn" onClick={handleToggle}>
        <MessageSquare size={24} />
      </button>
    </div>
  );
};

export default FaqChatbot;