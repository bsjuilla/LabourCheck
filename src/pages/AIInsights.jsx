import React, { useState } from 'react';
import { getLaborMarketInsights, getCareerRecommendations } from '../services/qwenApi';
import { Brain, Sparkles, TrendingUp, Target, BookOpen, DollarSign } from 'lucide-react';

const AIInsights = () => {
  const [location, setLocation] = useState('');
  const [industry, setIndustry] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [insights, setInsights] = useState(null);
  const [error, setError] = useState(null);

  const handleGetInsights = async () => {
    if (!location || !industry) {
      setError('Please enter both location and industry');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const marketData = {
        jobTrends: 'growing',
        salaryRange: '$80,000 - $120,000',
        topSkills: ['Python', 'JavaScript', 'Cloud Computing']
      };

      const result = await getLaborMarketInsights(location, industry, marketData);
      
      if (result.success) {
        setInsights(result.insights);
      } else {
        setInsights(result.fallback);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <header style={styles.header}>
        <div style={styles.headerContent}>
          <h1 style={styles.logo}>LabourCheck</h1>
          <p style={styles.tagline}>AI-Powered Labor Market Insights</p>
        </div>
        <nav style={styles.nav}>
          <a href="/" style={styles.navLink}>Dashboard</a>
          <button style={styles.navButton}>AI Insights</button>
        </nav>
      </header>

      {/* Main Content */}
      <div style={styles.main}>
        {/* Input Section */}
        <div style={styles.inputCard}>
          <div style={styles.cardHeader}>
            <Brain size={28} color="#6366f1" />
            <h2 style={styles.cardTitle}>Get AI-Powered Market Insights</h2>
          </div>
          
          <p style={styles.description}>
            Leverage Qwen AI to analyze labor market trends, get career recommendations, 
            and make data-driven decisions about your professional future.
          </p>

          <div style={styles.inputGrid}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Location</label>
              <input
                type="text"
                style={styles.input}
                placeholder="e.g., San Francisco, CA"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Industry</label>
              <input
                type="text"
                style={styles.input}
                placeholder="e.g., Technology, Healthcare"
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
              />
            </div>
          </div>

          {error && <div style={styles.error}>{error}</div>}

          <button 
            style={isLoading ? styles.buttonDisabled : styles.button}
            onClick={handleGetInsights}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Sparkles size={20} />
                Analyzing...
              </>
            ) : (
              <>
                <Sparkles size={20} />
                Generate Insights
              </>
            )}
          </button>
        </div>

        {/* Results Section */}
        {insights && (
          <div style={styles.resultsCard}>
            <div style={styles.cardHeader}>
              <Target size={28} color="#10b981" />
              <h2 style={styles.cardTitle}>Market Analysis Results</h2>
            </div>

            <div style={styles.insightsContent}>
              <pre style={styles.pre}>{insights}</pre>
            </div>

            <div style={styles.featuresGrid}>
              <div style={styles.featureCard}>
                <TrendingUp size={24} color="#3b82f6" />
                <h3 style={styles.featureTitle}>Market Trends</h3>
                <p style={styles.featureText}>Real-time analysis of job market dynamics</p>
              </div>

              <div style={styles.featureCard}>
                <DollarSign size={24} color="#10b981" />
                <h3 style={styles.featureTitle}>Salary Insights</h3>
                <p style={styles.featureText}>Compensation trends and predictions</p>
              </div>

              <div style={styles.featureCard}>
                <BookOpen size={24} color="#f59e0b" />
                <h3 style={styles.featureTitle}>Skill Recommendations</h3>
                <p style={styles.featureText}>In-demand skills for your career path</p>
              </div>
            </div>
          </div>
        )}

        {/* Career Recommendations Section */}
        <div style={styles.careerSection}>
          <div style={styles.cardHeader}>
            <Brain size={28} color="#8b5cf6" />
            <h2 style={styles.cardTitle}>Personalized Career Recommendations</h2>
          </div>

          <p style={styles.description}>
            Get tailored career advice based on your profile, skills, and aspirations.
            Our AI analyzes thousands of data points to provide actionable recommendations.
          </p>

          <button style={styles.secondaryButton}>
            <Sparkles size={20} />
            Get Career Recommendations (Premium)
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer style={styles.footer}>
        <p>&copy; 2024 LabourCheck. Powered by Qwen AI.</p>
        <div style={styles.footerLinks}>
          <a href="#privacy" style={styles.footerLink}>Privacy</a>
          <a href="#terms" style={styles.footerLink}>Terms</a>
          <a href="#api" style={styles.footerLink}>API</a>
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
  inputCard: {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '2rem',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    marginBottom: '2rem'
  },
  cardHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    marginBottom: '1.5rem'
  },
  cardTitle: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#1e293b',
    margin: 0
  },
  description: {
    fontSize: '1rem',
    color: '#64748b',
    lineHeight: '1.6',
    marginBottom: '2rem'
  },
  inputGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '1.5rem',
    marginBottom: '1.5rem'
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem'
  },
  label: {
    fontSize: '0.875rem',
    fontWeight: '600',
    color: '#475569'
  },
  input: {
    padding: '0.75rem 1rem',
    borderRadius: '8px',
    border: '1px solid #cbd5e1',
    fontSize: '1rem',
    outline: 'none',
    transition: 'border-color 0.2s'
  },
  button: {
    backgroundColor: '#6366f1',
    color: 'white',
    border: 'none',
    padding: '1rem 2rem',
    borderRadius: '8px',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    width: '100%',
    justifyContent: 'center',
    transition: 'background-color 0.2s'
  },
  buttonDisabled: {
    backgroundColor: '#a5b4fc',
    color: 'white',
    border: 'none',
    padding: '1rem 2rem',
    borderRadius: '8px',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'not-allowed',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    width: '100%',
    justifyContent: 'center'
  },
  error: {
    backgroundColor: '#fee2e2',
    color: '#dc2626',
    padding: '1rem',
    borderRadius: '8px',
    marginBottom: '1.5rem',
    fontSize: '0.875rem'
  },
  resultsCard: {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '2rem',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    marginBottom: '2rem'
  },
  insightsContent: {
    backgroundColor: '#f8fafc',
    padding: '1.5rem',
    borderRadius: '8px',
    marginBottom: '2rem',
    border: '1px solid #e2e8f0'
  },
  pre: {
    whiteSpace: 'pre-wrap',
    wordWrap: 'break-word',
    fontFamily: 'Inter, system-ui, sans-serif',
    fontSize: '0.9rem',
    lineHeight: '1.6',
    color: '#334155',
    margin: 0
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
    border: '1px solid #e2e8f0'
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
  careerSection: {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '2rem',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    textAlign: 'center'
  },
  secondaryButton: {
    backgroundColor: '#8b5cf6',
    color: 'white',
    border: 'none',
    padding: '1rem 2rem',
    borderRadius: '8px',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
    marginTop: '1.5rem',
    transition: 'background-color 0.2s'
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
  }
};

export default AIInsights;
