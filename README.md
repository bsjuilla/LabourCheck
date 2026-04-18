# LabourCheck - Hyperlocal Labor Market Intelligence Hub

## Overview
LabourCheck is a comprehensive labor market intelligence platform that provides hyperlocal, real-time data and insights for job seekers, career planners, employers, and policymakers. Powered by Qwen AI for intelligent analysis and recommendations.

## The Problem
General job boards and national unemployment statistics fail to provide:
- **Hyperlocal insights**: Neighborhood and community-level employment data
- **Real-time trends**: Current market conditions and emerging opportunities
- **Accessible data**: Easy-to-understand labor market intelligence
- **Actionable insights**: Data that helps make informed career decisions

## Our Solution
LabourCheck bridges this gap by aggregating and analyzing employment data at a granular level, providing:
- 📍 **Location-specific job market trends**
- 📊 **Real-time employment statistics**
- 🎯 **Skills demand analysis**
- 💼 **Career pathway recommendations**
- 🏢 **Employer insights and hiring patterns**
- 🤖 **AI-powered insights via Qwen API**

## Key Features
- **Interactive Dashboards**: Visualize local job market trends with charts and heatmaps
- **Skills Gap Analysis**: Identify in-demand skills in your area
- **Salary Insights**: Hyperlocal compensation data with trend predictions
- **Career Recommendations**: AI-powered job matching using Qwen AI
- **Market Alerts**: Get notified about opportunities in your field
- **Predictive Analytics**: Forecast employment trends before they become mainstream

## Technology Stack
- **Frontend**: React 19 + Vite
- **Routing**: React Router v7
- **Data Visualization**: Chart.js + react-chartjs-2
- **Icons**: Lucide React
- **AI Integration**: Qwen AI API for intelligent insights
- **Backend (planned)**: Supabase for authentication and data storage
- **Deployment**: Netlify/Vercel ready

## Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/LabourCheck.git

# Navigate to project directory
cd LabourCheck

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Edit .env and add your API keys:
# - VITE_QWEN_API_KEY (Get from https://dashscope.console.aliyun.com/)
# - VITE_SUPABASE_URL (Optional - for user authentication)
# - VITE_SUPABASE_ANON_KEY (Optional - for user authentication)

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
labourcheck/
├── src/
│   ├── components/       # Reusable UI components
│   ├── pages/           # Page components
│   │   ├── Dashboard.jsx      # Main dashboard with charts
│   │   └── AIInsights.jsx     # AI-powered insights page
│   ├── services/        # API services
│   │   └── qwenApi.js   # Qwen AI API integration
│   ├── App.jsx          # Main app component with routing
│   ├── main.jsx         # Entry point
│   └── index.css        # Global styles
├── public/              # Static assets
├── index.html           # HTML template
├── vite.config.js       # Vite configuration
├── package.json         # Dependencies and scripts
└── README.md            # This file
```

## Qwen AI Integration

LabourCheck leverages Qwen AI to provide:

1. **Labor Market Insights**: Analyze local job markets with AI-generated reports
2. **Career Recommendations**: Personalized career path suggestions based on user profiles
3. **Job Description Analysis**: Extract key skills and requirements from job postings

### Setting up Qwen API

1. Visit [DashScope Console](https://dashscope.console.aliyun.com/)
2. Create an account and generate an API key
3. Add your key to `.env`:
   ```
   VITE_QWEN_API_KEY=your_api_key_here
   ```

### API Functions

```javascript
// Get labor market insights
const insights = await getLaborMarketInsights(location, industry, marketData);

// Get career recommendations
const recommendations = await getCareerRecommendations(userProfile);

// Analyze job description
const analysis = await analyzeJobDescription(jobDescription);
```

## Features Roadmap

### Phase 1 (Current)
- ✅ Basic dashboard with mock data
- ✅ Interactive charts and visualizations
- ✅ Qwen AI API integration
- ✅ Responsive design

### Phase 2 (Planned)
- [ ] Supabase integration for user authentication
- [ ] Real data from BLS API and job board scraping
- [ ] User saved searches and alerts
- [ ] Premium subscription features

### Phase 3 (Future)
- [ ] Mobile app (React Native)
- [ ] Employer dashboard
- [ ] Advanced predictive modeling
- [ ] Integration with LinkedIn and other platforms

## Monetization Strategy

### Free Tier
- Public analytics dashboards
- Basic market trends
- Limited AI insights (5 per month)

### Premium Tier ($9.99/month)
- Unlimited AI-powered insights
- Personalized career recommendations
- Real-time job alerts
- Deep-dive industry reports
- Salary negotiation tools

## Deployment

The application is optimized for deployment on:

- **Netlify**: Drop the `dist` folder after building
- **Vercel**: Connect your GitHub repository
- **Cloudflare Pages**: Deploy directly from Git

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

ISC

## Contact

For questions or support, please open an issue on GitHub.

---

**Built with ❤️ using React, Vite, and Qwen AI**
