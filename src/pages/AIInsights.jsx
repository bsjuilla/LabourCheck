import React, { useState, useEffect, useRef } from 'react';
import { laborMarketBot } from '../services/laborBot';
import { Brain, TrendingUp, Target, BookOpen, DollarSign, Send, Bot, RefreshCw } from 'lucide-react';

const AIInsights = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Initialize with bot greeting
  useEffect(() => {
    const initializeChat = async () => {
      const greeting = await laborMarketBot.processMessage('hello');
      setMessages([greeting]);
    };
    initializeChat();
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMsg = inputMessage.trim();
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await laborMarketBot.processMessage(userMsg);
      setMessages(prev => [...prev, { id: Date.now() - 1, type: 'user', content: userMsg, timestamp: new Date() }, response]);
    } catch (err) {
      console.error('Bot error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setInputMessage(suggestion);
  };

  const handleReset = () => {
    laborMarketBot.reset();
    setMessages([]);
    setTimeout(async () => {
      const greeting = await laborMarketBot.processMessage('hello');
      setMessages([greeting]);
    }, 100);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Format message content (basic markdown support)
  const formatContent = (content) => {
    return content.split('\n').map((line, i) => {
      let formattedLine = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      if (line.trim().startsWith('•') || line.trim().startsWith('-')) {
        return <li key={i} style={styles.listItem} dangerouslySetInnerHTML={{ __html: formattedLine }} />;
      }
      if (line.match(/^\d+\./)) {
        return <li key={i} style={styles.listItem} dangerouslySetInnerHTML={{ __html: formattedLine }} />;
      }
      if (line.startsWith('###')) {
        return <h4 key={i} style={styles.subHeader}>{line.replace('###', '')}</h4>;
      }
      if (line.startsWith('##')) {
        return <h3 key={i} style={styles.header}>{line.replace('##', '')}</h3>;
      }
      if (line.trim() === '') {
        return <br key={i} />;
      }
      return <span key={i} dangerouslySetInnerHTML={{ __html: formattedLine }} />;
    });
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <header style={styles.header}>
        <div style={styles.headerContent}>
          <h1 style={styles.logo}>LabourCheck</h1>
          <p style={styles.tagline}>Intelligent Labor Market Bot</p>
        </div>
        <nav style={styles.nav}>
          <a href="/" style={styles.navLink}>Dashboard</a>
          <button style={styles.navButton}>AI Insights</button>
        </nav>
      </header>

      {/* Main Content */}
      <div style={styles.main}>
        {/* Chat Interface */}
        <div style={styles.chatCard}>
          <div style={styles.cardHeader}>
            <div style={styles.botInfo}>
              <Bot size={28} color="#6366f1" />
              <div>
                <h2 style={styles.cardTitle}>Labor Market Intelligence Bot</h2>
                <p style={styles.botStatus}>Online • Ready to help</p>
              </div>
            </div>
            <button onClick={handleReset} style={styles.resetButton} title="Reset conversation">
              <RefreshCw size={20} />
            </button>
          </div>
          
          <p style={styles.description}>
            Chat with our intelligent bot to get instant insights about labor market trends, 
            salary data, in-demand skills, and personalized career recommendations.
          </p>

          {/* Messages Area */}
          <div style={styles.messagesContainer}>
            {messages.map((message) => (
              <div
                key={message.id}
                style={{
                  ...styles.message,
                  ...(message.type === 'user' ? styles.userMessage : styles.botMessage)
                }}
              >
                {message.type === 'bot' && (
                  <div style={styles.botAvatar}>
                    <Bot size={20} color="#6366f1" />
                  </div>
                )}
                <div style={styles.messageContent}>
                  <div style={styles.messageText}>
                    {formatContent(message.content)}
                  </div>
                  <div style={styles.messageTime}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                  {message.suggestions && message.type === 'bot' && (
                    <div style={styles.suggestions}>
                      {message.suggestions.map((suggestion, idx) => (
                        <button
                          key={idx}
                          style={styles.suggestionChip}
                          onClick={() => handleSuggestionClick(suggestion)}
                        >
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            {isLoading && (
              <div style={styles.typingIndicator}>
                <Bot size={20} color="#6366f1" />
                <span>Bot is thinking...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div style={styles.inputArea}>
            <textarea
              style={styles.textarea}
              placeholder="Ask about job markets, salaries, skills, or career advice..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              rows={2}
            />
            <button
              style={inputMessage.trim() ? styles.sendButton : styles.sendButtonDisabled}
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || isLoading}
            >
              <Send size={20} />
            </button>
          </div>
        </div>

        {/* Features Section */}
        <div style={styles.featuresSection}>
          <h3 style={styles.featuresTitle}>What I Can Help You With</h3>
          <div style={styles.featuresGrid}>
            <div style={styles.featureCard}>
              <TrendingUp size={24} color="#3b82f6" />
              <h4 style={styles.featureTitle}>Market Trends</h4>
              <p style={styles.featureText}>Get insights on growing and declining industries</p>
            </div>
            <div style={styles.featureCard}>
              <DollarSign size={24} color="#10b981" />
              <h4 style={styles.featureTitle}>Salary Data</h4>
              <p style={styles.featureText}>Learn about compensation trends and negotiation tips</p>
            </div>
            <div style={styles.featureCard}>
              <BookOpen size={24} color="#f59e0b" />
              <h4 style={styles.featureTitle}>Skills Analysis</h4>
              <p style={styles.featureText}>Discover in-demand skills for your career path</p>
            </div>
            <div style={styles.featureCard}>
              <Target size={24} color="#8b5cf6" />
              <h4 style={styles.featureTitle}>Career Advice</h4>
              <p style={styles.featureText}>Get personalized recommendations based on your goals</p>
            </div>
          </div>
        </div>

        {/* Quick Start Guide */}
        <div style={styles.guideCard}>
          <h3 style={styles.guideTitle}>💡 Try Asking:</h3>
          <div style={styles.examplesGrid}>
            <div style={styles.exampleItem}>"What's the job market like in New York?"</div>
            <div style={styles.exampleItem}>"Tell me about software engineering salaries"</div>
            <div style={styles.exampleItem}>"What skills are in demand for healthcare?"</div>
            <div style={styles.exampleItem}>"Give me career advice for entry-level tech"</div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer style={styles.footer}>
        <p>&copy; 2024 LabourCheck. Powered by Intelligent Bot Technology.</p>
        <div style={styles.footerLinks}>
          <a href="#privacy" style={styles.footerLink}>Privacy</a>
          <a href="#terms" style={styles.footerLink}>Terms</a>
          <a href="#about" style={styles.footerLink}>About</a>
        </div>
      </footer>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#f8fafc',
  },
  header: {
    backgroundColor: '#1e293b',
    color: 'white',
    padding: '1.5rem 2rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '1rem'
  },
  headerContent: {
    flex: 1,
    minWidth: '200px'
  },
  logo: {
    fontSize: '1.8rem',
    fontWeight: 'bold',
    margin: '0 0 0.25rem 0',
    background: 'linear-gradient(135deg, #60a5fa 0%, #34d399 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent'
  },
  tagline: {
    margin: 0,
    fontSize: '0.9rem',
    opacity: 0.8
  },
  nav: {
    display: 'flex',
    gap: '1rem',
    alignItems: 'center'
  },
  navLink: {
    color: '#e2e8f0',
    textDecoration: 'none',
    padding: '0.6rem 1.2rem',
    borderRadius: '6px',
    transition: 'background-color 0.2s'
  },
  navButton: {
    backgroundColor: '#6366f1',
    color: 'white',
    border: 'none',
    padding: '0.6rem 1.2rem',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: '500'
  },
  main: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '2rem'
  },
  chatCard: {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '2rem',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    marginBottom: '2rem'
  },
  cardHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '1.5rem'
  },
  botInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem'
  },
  cardTitle: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#1e293b',
    margin: 0
  },
  botStatus: {
    fontSize: '0.875rem',
    color: '#10b981',
    margin: '0.25rem 0 0 0'
  },
  resetButton: {
    backgroundColor: '#f1f5f9',
    border: '1px solid #e2e8f0',
    padding: '0.5rem',
    borderRadius: '6px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'background-color 0.2s'
  },
  description: {
    fontSize: '1rem',
    color: '#64748b',
    lineHeight: '1.6',
    marginBottom: '2rem'
  },
  messagesContainer: {
    backgroundColor: '#f8fafc',
    borderRadius: '8px',
    padding: '1.5rem',
    maxHeight: '500px',
    overflowY: 'auto',
    marginBottom: '1.5rem',
    border: '1px solid #e2e8f0'
  },
  message: {
    display: 'flex',
    gap: '0.75rem',
    marginBottom: '1.25rem',
    animation: 'fadeIn 0.3s ease-in'
  },
  userMessage: {
    flexDirection: 'row-reverse'
  },
  botMessage: {
    flexDirection: 'row'
  },
  botAvatar: {
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    backgroundColor: '#e0e7ff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0
  },
  messageContent: {
    maxWidth: '70%',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem'
  },
  messageText: {
    fontSize: '0.95rem',
    lineHeight: '1.6',
    color: '#334155',
    padding: '0.75rem 1rem',
    borderRadius: '12px',
    backgroundColor: 'white',
    border: '1px solid #e2e8f0'
  },
  userMessageText: {
    backgroundColor: '#6366f1',
    color: 'white',
    border: 'none'
  },
  messageTime: {
    fontSize: '0.75rem',
    color: '#94a3b8',
    textAlign: 'right'
  },
  suggestions: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.5rem',
    marginTop: '0.5rem'
  },
  suggestionChip: {
    backgroundColor: '#e0e7ff',
    color: '#4f46e5',
    border: 'none',
    padding: '0.5rem 0.75rem',
    borderRadius: '20px',
    fontSize: '0.8rem',
    cursor: 'pointer',
    transition: 'all 0.2s'
  },
  typingIndicator: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    color: '#64748b',
    fontSize: '0.875rem',
    padding: '0.75rem',
    backgroundColor: 'white',
    borderRadius: '12px',
    border: '1px solid #e2e8f0',
    marginBottom: '1rem'
  },
  inputArea: {
    display: 'flex',
    gap: '0.75rem',
    alignItems: 'flex-end'
  },
  textarea: {
    flex: 1,
    padding: '0.75rem 1rem',
    borderRadius: '8px',
    border: '1px solid #cbd5e1',
    fontSize: '0.95rem',
    resize: 'none',
    fontFamily: 'inherit',
    outline: 'none',
    transition: 'border-color 0.2s'
  },
  sendButton: {
    backgroundColor: '#6366f1',
    color: 'white',
    border: 'none',
    padding: '0.75rem 1rem',
    borderRadius: '8px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'background-color 0.2s'
  },
  sendButtonDisabled: {
    backgroundColor: '#cbd5e1',
    color: '#64748b',
    border: 'none',
    padding: '0.75rem 1rem',
    borderRadius: '8px',
    cursor: 'not-allowed',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  featuresSection: {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '2rem',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    marginBottom: '2rem'
  },
  featuresTitle: {
    fontSize: '1.25rem',
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: '1.5rem',
    textAlign: 'center'
  },
  featuresGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '1.5rem'
  },
  featureCard: {
    backgroundColor: '#f8fafc',
    padding: '1.5rem',
    borderRadius: '8px',
    textAlign: 'center',
    border: '1px solid #e2e8f0',
    transition: 'transform 0.2s'
  },
  featureTitle: {
    fontSize: '1rem',
    fontWeight: '600',
    color: '#1e293b',
    margin: '0.75rem 0 0.5rem 0'
  },
  featureText: {
    fontSize: '0.875rem',
    color: '#64748b',
    margin: 0
  },
  guideCard: {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '2rem',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
  },
  guideTitle: {
    fontSize: '1.1rem',
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: '1rem'
  },
  examplesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '1rem'
  },
  exampleItem: {
    backgroundColor: '#f8fafc',
    padding: '1rem',
    borderRadius: '8px',
    border: '1px solid #e2e8f0',
    fontSize: '0.9rem',
    color: '#475569',
    fontStyle: 'italic'
  },
  footer: {
    backgroundColor: '#1e293b',
    color: '#94a3b8',
    padding: '2rem',
    textAlign: 'center',
    marginTop: '3rem'
  },
  footerLinks: {
    display: 'flex',
    justifyContent: 'center',
    gap: '2rem',
    marginTop: '1rem',
    flexWrap: 'wrap'
  },
  footerLink: {
    color: '#94a3b8',
    textDecoration: 'none',
    fontSize: '0.875rem'
  },
  listItem: {
    marginLeft: '1.5rem',
    marginBottom: '0.5rem'
  },
  subHeader: {
    fontSize: '1.1rem',
    fontWeight: '600',
    color: '#1e293b',
    margin: '1rem 0 0.5rem 0'
  },
  header: {
    fontSize: '1.25rem',
    fontWeight: 'bold',
    color: '#1e293b',
    margin: '1rem 0 0.5rem 0'
  }
};

export default AIInsights;
