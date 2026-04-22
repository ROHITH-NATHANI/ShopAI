import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, X, Bot, Sparkles, MessageCircle } from 'lucide-react';
import { Button } from '../../components/ui';
import './AIConcierge.css';

export default function AIConcierge({ products }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'bot', content: "Hello! I'm your Aura Concierge. How can I help you find the perfect product today?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = { role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    setTimeout(() => {
      let botResponse = "I'm analyzing our premium collection for you...";
      const lowerInput = input.toLowerCase();
      
      if (lowerInput.includes('headphone') || lowerInput.includes('audio')) {
        botResponse = "The Aura Pro Wireless Headphones are our top pick for audiophiles. They offer industry-leading noise cancellation.";
      } else if (lowerInput.includes('watch') || lowerInput.includes('time')) {
        botResponse = "The Lumina S1 Master Watch is a masterpiece of precision and style. It features a genuine Italian leather strap.";
      } else if (lowerInput.includes('gift') || lowerInput.includes('recommend')) {
        botResponse = "Based on trending styles, I'd recommend the Hyperion Mechanical Keyboard for tech enthusiasts or the Zenith Organic Tea Collection for a sophisticated gift.";
      } else {
        botResponse = "That's an interesting request. Our current collection features top-tier electronics, fashion, and home goods. Is there a specific category you're looking for?";
      }

      setMessages(prev => [...prev, { role: 'bot', content: botResponse }]);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <>
      <motion.button
        className="ai-toggle-btn"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
      >
        <div className="ai-toggle-icon">
          <Sparkles size={24} color="#f59e0b" />
          <MessageCircle size={32} />
        </div>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="ai-panel glass"
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
          >
            <div className="ai-header">
              <div className="ai-header-title">
                <Bot size={24} className="icon-gold" />
                <div>
                  <h3>Aura Concierge</h3>
                  <span className="ai-status">Online • Powered by AI</span>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="close-btn">
                <X size={20} />
              </button>
            </div>

            <div className="ai-messages" ref={scrollRef}>
              {messages.map((m, i) => (
                <div key={i} className={`ai-message ${m.role}`}>
                  {m.role === 'bot' && <div className="bot-avatar">⚡</div>}
                  <div className="message-bubble">
                    {m.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="ai-message bot">
                  <div className="bot-avatar">⚡</div>
                  <div className="message-bubble loading">
                    <span>●</span><span>●</span><span>●</span>
                  </div>
                </div>
              )}
            </div>

            <div className="ai-input-area">
              <div className="ai-suggestions">
                {['Recommend a gift', 'Best headphones', 'Luxury watches'].map(s => (
                  <button key={s} onClick={() => setInput(s)} className="suggestion-chip">{s}</button>
                ))}
              </div>
              <form className="ai-form" onSubmit={(e) => { e.preventDefault(); handleSend(); }}>
                <input 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask your concierge..."
                />
                <Button type="submit" disabled={!input.trim() || isLoading}>
                  <Send size={20} />
                </Button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
