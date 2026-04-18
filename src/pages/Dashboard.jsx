import React, { useState } from 'react';
import { Bar, Line, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { TrendingUp, MapPin, Briefcase, DollarSign, Users, ArrowUpRight } from 'lucide-react';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const Dashboard = () => {
  const [selectedLocation, setSelectedLocation] = useState('San Francisco, CA');
  const [selectedIndustry, setSelectedIndustry] = useState('Technology');

  // Mock data - In production, this would come from your backend/Supabase
  const marketData = {
    jobGrowth: 12.5,
    avgSalary: 95000,
    activeJobs: 3420,
    topSkills: ['Python', 'JavaScript', 'React', 'AWS', 'Machine Learning'],
    industryBreakdown: [
      { name: 'Technology', percentage: 35, growth: 15.2 },
      { name: 'Healthcare', percentage: 22, growth: 8.5 },
      { name: 'Finance', percentage: 18, growth: 6.3 },
      { name: 'Retail', percentage: 12, growth: -2.1 },
      { name: 'Education', percentage: 8, growth: 3.7 },
      { name: 'Other', percentage: 5, growth: 1.2 }
    ],
    salaryTrends: [
      { month: 'Jan', avgSalary: 92000 },
      { month: 'Feb', avgSalary: 93500 },
      { month: 'Mar', avgSalary: 94200 },
      { month: 'Apr', avgSalary: 95000 },
      { month: 'May', avgSalary: 96800 },
      { month: 'Jun', avgSalary: 98500 }
    ],
    jobPostingsTrend: [
      { month: 'Jan', count: 2800 },
      { month: 'Feb', count: 3100 },
      { month: 'Mar', count: 2950 },
      { month: 'Apr', count: 3420 },
      { month: 'May', count: 3680 },
      { month: 'Jun', count: 3890 }
    ]
  };

  const industryChartData = {
    labels: marketData.industryBreakdown.map(i => i.name),
    datasets: [
      {
        label: 'Market Share (%)',
        data: marketData.industryBreakdown.map(i => i.percentage),
        backgroundColor: [
          'rgba(59, 130, 246, 0.8)',
          'rgba(16, 185, 129, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(239, 68, 68, 0.8)',
          'rgba(139, 92, 246, 0.8)',
          'rgba(107, 114, 128, 0.8)'
        ],
        borderColor: [
          'rgb(59, 130, 246)',
          'rgb(16, 185, 129)',
          'rgb(245, 158, 11)',
          'rgb(239, 68, 68)',
          'rgb(139, 92, 246)',
          'rgb(107, 114, 128)'
        ],
        borderWidth: 2
      }
    ]
  };

  const salaryTrendData = {
    labels: marketData.salaryTrends.map(s => s.month),
    datasets: [
      {
        label: 'Average Salary ($)',
        data: marketData.salaryTrends.map(s => s.avgSalary),
        borderColor: 'rgb(16, 185, 129)',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        fill: true,
        tension: 0.4
      }
    ]
  };

  const jobTrendData = {
    labels: marketData.jobPostingsTrend.map(j => j.month),
    datasets: [
      {
        label: 'Active Job Postings',
        data: marketData.jobPostingsTrend.map(j => j.count),
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        fill: true,
        tension: 0.4
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
      }
    }
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <header style={styles.header}>
        <div style={styles.headerContent}>
          <h1 style={styles.logo}>LabourCheck</h1>
          <p style={styles.tagline}>Hyperlocal Labor Market Intelligence</p>
        </div>
        <nav style={styles.nav}>
          <button style={styles.navButton}>Dashboard</button>
          <button style={styles.navButtonSecondary}>Analytics</button>
          <button style={styles.navButtonSecondary}>Alerts</button>
          <button style={styles.navButtonSecondary}>Profile</button>
        </nav>
      </header>

      {/* Filters */}
      <div style={styles.filters}>
        <div style={styles.filterGroup}>
          <label style={styles.label}>Location</label>
          <select 
            style={styles.select}
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
          >
            <option>San Francisco, CA</option>
            <option>New York, NY</option>
            <option>Austin, TX</option>
            <option>Seattle, WA</option>
            <option>Boston, MA</option>
          </select>
        </div>
        <div style={styles.filterGroup}>
          <label style={styles.label}>Industry</label>
          <select 
            style={styles.select}
            value={selectedIndustry}
            onChange={(e) => setSelectedIndustry(e.target.value)}
          >
            <option>Technology</option>
            <option>Healthcare</option>
            <option>Finance</option>
            <option>Retail</option>
            <option>Education</option>
          </select>
        </div>
      </div>

      {/* Key Metrics */}
      <div style={styles.metricsGrid}>
        <div style={styles.metricCard}>
          <div style={styles.metricIcon}>
            <TrendingUp size={24} color="#10b981" />
          </div>
          <div style={styles.metricContent}>
            <h3 style={styles.metricValue}>{marketData.jobGrowth}%</h3>
            <p style={styles.metricLabel}>Job Growth (YoY)</p>
            <span style={styles.trendPositive}>↑ 2.3% from last month</span>
          </div>
        </div>

        <div style={styles.metricCard}>
          <div style={styles.metricIcon}>
            <DollarSign size={24} color="#3b82f6" />
          </div>
          <div style={styles.metricContent}>
            <h3 style={styles.metricValue}>${marketData.avgSalary.toLocaleString()}</h3>
            <p style={styles.metricLabel}>Average Salary</p>
            <span style={styles.trendPositive}>↑ $1,500 from last month</span>
          </div>
        </div>

        <div style={styles.metricCard}>
          <div style={styles.metricIcon}>
            <Briefcase size={24} color="#f59e0b" />
          </div>
          <div style={styles.metricContent}>
            <h3 style={styles.metricValue}>{marketData.activeJobs.toLocaleString()}</h3>
            <p style={styles.metricLabel}>Active Job Postings</p>
            <span style={styles.trendPositive}>↑ 260 from last month</span>
          </div>
        </div>

        <div style={styles.metricCard}>
          <div style={styles.metricIcon}>
            <Users size={24} color="#8b5cf6" />
          </div>
          <div style={styles.metricContent}>
            <h3 style={styles.metricValue}>{marketData.topSkills.length}</h3>
            <p style={styles.metricLabel}>Top In-Demand Skills</p>
            <span style={styles.trendNeutral}>→ Stable demand</span>
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div style={styles.chartsGrid}>
        {/* Industry Breakdown */}
        <div style={styles.chartCard}>
          <h2 style={styles.chartTitle}>Industry Distribution</h2>
          <div style={styles.chartContainer}>
            <Pie data={industryChartData} options={chartOptions} />
          </div>
        </div>

        {/* Salary Trends */}
        <div style={styles.chartCard}>
          <h2 style={styles.chartTitle}>Salary Trends (6 Months)</h2>
          <div style={styles.chartContainer}>
            <Line data={salaryTrendData} options={chartOptions} />
          </div>
        </div>

        {/* Job Postings Trend */}
        <div style={styles.chartCardFull}>
          <h2 style={styles.chartTitle}>Job Postings Trend</h2>
          <div style={styles.chartContainerLarge}>
            <Bar data={jobTrendData} options={chartOptions} />
          </div>
        </div>
      </div>

      {/* Top Skills Section */}
      <div style={styles.skillsSection}>
        <h2 style={styles.sectionTitle}>Top In-Demand Skills</h2>
        <div style={styles.skillsGrid}>
          {marketData.topSkills.map((skill, index) => (
            <div key={index} style={styles.skillBadge}>
              <span style={styles.skillName}>{skill}</span>
              <ArrowUpRight size={16} color="#10b981" />
            </div>
          ))}
        </div>
      </div>

      {/* AI Insights CTA */}
      <div style={styles.aiInsightsCard}>
        <div style={styles.aiInsightsContent}>
          <h2 style={styles.aiTitle}>🤖 Get AI-Powered Career Insights</h2>
          <p style={styles.aiDescription}>
            Leverage Qwen AI to get personalized labor market analysis, career recommendations, 
            and predictive insights tailored to your profile and location.
          </p>
          <ul style={styles.aiFeatures}>
            <li>✓ Personalized career path recommendations</li>
            <li>✓ Skills gap analysis</li>
            <li>✓ Salary negotiation insights</li>
            <li>✓ Emerging trends prediction</li>
          </ul>
          <button style={styles.aiButton}>Get AI Insights</button>
        </div>
      </div>

      {/* Footer */}
      <footer style={styles.footer}>
        <p>&copy; 2024 LabourCheck. All rights reserved.</p>
        <div style={styles.footerLinks}>
          <a href="#privacy" style={styles.footerLink}>Privacy Policy</a>
          <a href="#terms" style={styles.footerLink}>Terms of Service</a>
          <a href="#contact" style={styles.footerLink}>Contact</a>
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
    gap: '0.5rem',
    flexWrap: 'wrap'
  },
  navButton: {
    backgroundColor: '#3b82f6',
    color: 'white',
    border: 'none',
    padding: '0.6rem 1.2rem',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: '500',
    transition: 'background-color 0.2s'
  },
  navButtonSecondary: {
    backgroundColor: 'transparent',
    color: '#e2e8f0',
    border: '1px solid #475569',
    padding: '0.6rem 1.2rem',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: '500',
    transition: 'all 0.2s'
  },
  filters: {
    backgroundColor: 'white',
    padding: '1.5rem 2rem',
    borderBottom: '1px solid #e2e8f0',
    display: 'flex',
    gap: '2rem',
    flexWrap: 'wrap'
  },
  filterGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem'
  },
  label: {
    fontSize: '0.875rem',
    fontWeight: '600',
    color: '#475569'
  },
  select: {
    padding: '0.6rem 1rem',
    borderRadius: '6px',
    border: '1px solid #cbd5e1',
    fontSize: '0.9rem',
    minWidth: '200px',
    backgroundColor: 'white',
    cursor: 'pointer'
  },
  metricsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '1.5rem',
    padding: '2rem'
  },
  metricCard: {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '1.5rem',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    display: 'flex',
    gap: '1rem',
    alignItems: 'flex-start'
  },
  metricIcon: {
    width: '48px',
    height: '48px',
    borderRadius: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f1f5f9'
  },
  metricContent: {
    flex: 1
  },
  metricValue: {
    fontSize: '1.8rem',
    fontWeight: 'bold',
    color: '#1e293b',
    margin: '0 0 0.25rem 0'
  },
  metricLabel: {
    fontSize: '0.875rem',
    color: '#64748b',
    margin: '0 0 0.5rem 0'
  },
  trendPositive: {
    fontSize: '0.75rem',
    color: '#10b981',
    fontWeight: '500'
  },
  trendNeutral: {
    fontSize: '0.75rem',
    color: '#64748b',
    fontWeight: '500'
  },
  chartsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
    gap: '1.5rem',
    padding: '0 2rem 2rem 2rem'
  },
  chartCard: {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '1.5rem',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
  },
  chartCardFull: {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '1.5rem',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    gridColumn: '1 / -1'
  },
  chartTitle: {
    fontSize: '1.1rem',
    fontWeight: '600',
    color: '#1e293b',
    margin: '0 0 1rem 0'
  },
  chartContainer: {
    height: '300px',
    position: 'relative'
  },
  chartContainerLarge: {
    height: '350px',
    position: 'relative'
  },
  skillsSection: {
    backgroundColor: 'white',
    padding: '2rem',
    margin: '0 2rem 2rem 2rem',
    borderRadius: '12px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
  },
  sectionTitle: {
    fontSize: '1.1rem',
    fontWeight: '600',
    color: '#1e293b',
    margin: '0 0 1.5rem 0'
  },
  skillsGrid: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.75rem'
  },
  skillBadge: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    backgroundColor: '#eff6ff',
    padding: '0.6rem 1rem',
    borderRadius: '20px',
    border: '1px solid #bfdbfe'
  },
  skillName: {
    fontSize: '0.9rem',
    fontWeight: '500',
    color: '#1e40af'
  },
  aiInsightsCard: {
    backgroundColor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    margin: '0 2rem 2rem 2rem',
    borderRadius: '12px',
    padding: '2rem',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
  },
  aiInsightsContent: {
    maxWidth: '800px',
    margin: '0 auto',
    textAlign: 'center'
  },
  aiTitle: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: 'white',
    margin: '0 0 1rem 0'
  },
  aiDescription: {
    fontSize: '1rem',
    color: '#e0e7ff',
    marginBottom: '1.5rem',
    lineHeight: '1.6'
  },
  aiFeatures: {
    listStyle: 'none',
    padding: '0',
    marginBottom: '1.5rem',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '1rem'
  },
  aiFeatureItem: {
    color: '#e0e7ff',
    fontSize: '0.9rem'
  },
  aiButton: {
    backgroundColor: 'white',
    color: '#667eea',
    border: 'none',
    padding: '0.8rem 2rem',
    borderRadius: '8px',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'transform 0.2s'
  },
  footer: {
    backgroundColor: '#1e293b',
    color: '#94a3b8',
    padding: '2rem',
    textAlign: 'center'
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

export default Dashboard;
