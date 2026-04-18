// Intelligent Labor Market Bot - Rule-based analysis engine
// This bot simulates AI insights using predefined logic, patterns, and data analysis

export interface BotMessage {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
  suggestions?: string[];
}

export interface BotContext {
  location?: string;
  industry?: string;
  experienceLevel?: string;
  skills?: string[];
  conversationHistory: BotMessage[];
}

class LaborMarketBot {
  private context: BotContext;
  
  constructor() {
    this.context = {
      conversationHistory: []
    };
  }

  // Main entry point for processing user messages
  async processMessage(message: string): Promise<BotMessage> {
    const userMessage: BotMessage = {
      id: this.generateId(),
      type: 'user',
      content: message,
      timestamp: new Date()
    };

    this.context.conversationHistory.push(userMessage);

    const response = this.generateResponse(message);
    
    this.context.conversationHistory.push(response);
    
    return response;
  }

  // Generate intelligent response based on message content
  private generateResponse(message: string): BotMessage {
    const lowerMessage = message.toLowerCase();
    
    // Detect location
    if (this.detectLocation(lowerMessage)) {
      const location = this.detectLocation(lowerMessage)!;
      this.context.location = location;
      return this.createBotMessage(
        `Great! I'll focus on the **${location}** labor market. ${this.getLocationInsights(location)}`,
        ['Show me top industries', 'What skills are in demand?', 'Salary trends']
      );
    }

    // Detect industry
    if (this.detectIndustry(lowerMessage)) {
      const industry = this.detectIndustry(lowerMessage)!;
      this.context.industry = industry;
      return this.createBotMessage(
        `Excellent choice! The **${industry}** sector is very dynamic. ${this.getIndustryInsights(industry)}`,
        ['Show job growth', 'Required skills', 'Salary range']
      );
    }

    // Detect experience level
    if (lowerMessage.includes('entry') || lowerMessage.includes('junior') || lowerMessage.includes('beginner')) {
      this.context.experienceLevel = 'entry';
      return this.createBotMessage(
        `Perfect! For **entry-level** positions, here's what you need to know:\n\n` +
        `• Focus on building a strong portfolio\n` +
        `• Highlight transferable skills from education or internships\n` +
        `• Consider certifications to stand out\n` +
        `• Network actively in your target industry\n\n` +
        `Entry-level roles often grow 15-20% faster than senior positions in emerging fields.`,
        ['Top entry-level jobs', 'Skills to learn', 'Certification recommendations']
      );
    }

    if (lowerMessage.includes('mid') || lowerMessage.includes('senior') || lowerMessage.includes('experienced')) {
      this.context.experienceLevel = 'senior';
      return this.createBotMessage(
        `For **experienced professionals**, the market looks promising:\n\n` +
        `• Leadership skills are in high demand\n` +
        `• Specialized expertise commands premium salaries\n` +
        `• Consider consulting or freelance opportunities\n` +
        `• Mentorship roles are increasingly valued\n\n` +
        `Senior roles in tech and healthcare show 25% salary growth year-over-year.`,
        ['Leadership opportunities', 'Salary negotiation tips', 'Industry transitions']
      );
    }

    // Specific queries
    if (lowerMessage.includes('skill') && (lowerMessage.includes('demand') || lowerMessage.includes('learn'))) {
      return this.createBotMessage(
        this.getSkillsInDemand(),
        ['Technical skills', 'Soft skills', 'Certifications']
      );
    }

    if (lowerMessage.includes('salary') || lowerMessage.includes('pay') || lowerMessage.includes('compensation')) {
      return this.createBotMessage(
        this.getSalaryInsights(),
        ['By industry', 'By experience', 'Negotiation tips']
      );
    }

    if (lowerMessage.includes('trend') || lowerMessage.includes('growth') || lowerMessage.includes('future')) {
      return this.createBotMessage(
        this.getMarketTrends(),
        ['Growing industries', 'Declining sectors', 'Emerging roles']
      );
    }

    if (lowerMessage.includes('job') && (lowerMessage.includes('openings') || lowerMessage.includes('available'))) {
      return this.createBotMessage(
        this.getJobOpeningsInsight(),
        ['Filter by industry', 'Remote opportunities', 'Local jobs']
      );
    }

    if (lowerMessage.includes('recommend') || lowerMessage.includes('suggest') || lowerMessage.includes('advice')) {
      return this.createBotMessage(
        this.getPersonalizedRecommendations(),
        ['Career path', 'Skills to develop', 'Industries to explore']
      );
    }

    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
      return this.createBotMessage(
        `👋 Hello! I'm your **Labor Market Intelligence Bot**. I can help you:\n\n` +
        `• Analyze local job market trends\n` +
        `• Identify in-demand skills\n` +
        `• Get salary insights\n` +
        `• Discover career opportunities\n\n` +
        `Just tell me your **location** and **industry of interest** to get started!`,
        ['New York tech jobs', 'Healthcare careers', 'Remote opportunities']
      );
    }

    if (lowerMessage.includes('help') || lowerMessage.includes('what can you do')) {
      return this.createBotMessage(
        `I'm here to help you navigate the job market! Here's what I can do:\n\n` +
        `📍 **Location Analysis**: Tell me your city, and I'll share local market insights\n` +
        `🏢 **Industry Insights**: Ask about specific sectors (tech, healthcare, finance, etc.)\n` +
        `💰 **Salary Data**: Get compensation trends and negotiation tips\n` +
        `📈 **Market Trends**: Understand which jobs are growing or declining\n` +
        `🎯 **Career Advice**: Personalized recommendations based on your profile\n\n` +
        `Try asking: "What's the job market like in Boston?" or "Tell me about software engineering salaries"`,
        ['Start analysis', 'View dashboard', 'Explore industries']
      );
    }

    // Default response with contextual suggestions
    return this.createBotMessage(
      `I'd love to help you explore the labor market! To give you the best insights, could you tell me:\n\n` +
      `1. Your **location** (city or region)\n` +
      `2. Your **industry of interest**\n` +
      `3. Your **experience level** (optional)\n\n` +
      `Or ask me about: salary trends, in-demand skills, job growth, or career recommendations!`,
      ['New York tech', 'Los Angeles healthcare', 'Chicago finance', 'Remote jobs']
    );
  }

  // Location detection and insights
  private detectLocation(message: string): string | null {
    const cities = [
      'new york', 'los angeles', 'chicago', 'houston', 'phoenix',
      'philadelphia', 'san antonio', 'san diego', 'dallas', 'san jose',
      'austin', 'seattle', 'denver', 'boston', 'san francisco',
      'miami', 'atlanta', 'portland', 'las vegas', 'minneapolis'
    ];
    
    for (const city of cities) {
      if (message.includes(city)) {
        return city.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
      }
    }
    return null;
  }

  private getLocationInsights(location: string): string {
    const insights: Record<string, string> = {
      'New York': 'Tech and finance dominate with 18% YoY growth. Remote work adoption is 45% higher than national average.',
      'San Francisco': 'AI and biotech lead hiring. Average tech salary increased 22% this year despite market corrections.',
      'Austin': 'Fastest-growing tech hub with 35% increase in startup formations. Cost of living remains competitive.',
      'Seattle': 'Cloud computing and e-commerce drive demand. Amazon and Microsoft expansions creating 50K+ new roles.',
      'Boston': 'Biotech and education sectors thriving. Healthcare jobs up 28% with strong salary growth.',
      'Chicago': 'Diverse economy with strengths in finance, manufacturing, and tech. Central location attracts remote-first companies.'
    };
    
    return insights[location] || 'This market shows steady growth with diverse opportunities across multiple sectors.';
  }

  // Industry detection and insights
  private detectIndustry(message: string): string | null {
    const industries = [
      'technology', 'tech', 'software', 'healthcare', 'finance',
      'banking', 'retail', 'manufacturing', 'education', 'hospitality',
      'construction', 'energy', 'automotive', 'aerospace', 'biotech',
      'pharmaceuticals', 'media', 'entertainment', 'telecommunications',
      'real estate', 'insurance', 'consulting', 'legal', 'agriculture'
    ];
    
    for (const industry of industries) {
      if (message.includes(industry)) {
        return industry.charAt(0).toUpperCase() + industry.slice(1);
      }
    }
    return null;
  }

  private getIndustryInsights(industry: string): string {
    const insights: Record<string, string> = {
      'Technology': 'Projected 23% growth through 2030. AI/ML roles up 74%. Average salary: $95K-$165K.',
      'Healthcare': 'Aging population drives 16% growth. Nursing and allied health most in-demand. Salaries up 12% YoY.',
      'Finance': 'Fintech disruption creates new roles. Traditional banking consolidating. Compliance experts highly valued.',
      'Manufacturing': 'Automation and reshoring trends. Skilled technicians needed. Average wage growth 8% annually.',
      'Education': 'Edtech integration accelerating. Online instruction roles growing. Administrative positions evolving.',
      'Retail': 'E-commerce expertise critical. Supply chain roles in high demand. Customer experience focus increasing.',
      'Biotech': 'Breakthrough therapies driving investment. Research positions up 31%. Competitive salaries with equity options.'
    };
    
    return insights[industry] || 'This industry shows stable growth with opportunities for skilled professionals.';
  }

  // Skills in demand analysis
  private getSkillsInDemand(): string {
    return `**Top In-Demand Skills Right Now:**\n\n` +
      `🔹 **Technical Skills**:\n` +
      `   • Python & Data Analysis (mentioned in 42% of tech jobs)\n` +
      `   • Cloud Platforms (AWS, Azure, GCP) - 38% increase\n` +
      `   • AI/Machine Learning - 74% growth in postings\n` +
      `   • Cybersecurity - Critical shortage, 3.5M unfilled roles globally\n\n` +
      `🔹 **Soft Skills**:\n` +
      `   • Communication & Collaboration\n` +
      `   • Problem-Solving & Critical Thinking\n` +
      `   • Adaptability & Continuous Learning\n` +
      `   • Leadership & Emotional Intelligence\n\n` +
      `💡 **Pro Tip**: Combine technical expertise with strong soft skills for maximum marketability.`;
  }

  // Salary insights
  private getSalaryInsights(): string {
    return `**Current Salary Trends:**\n\n` +
      `📊 **By Experience Level**:\n` +
      `   • Entry-Level: $45K - $65K (varies by industry)\n` +
      `   • Mid-Level: $70K - $110K\n` +
      `   • Senior: $120K - $200K+\n` +
      `   • Executive: $200K - $500K+\n\n` +
      `📈 **Highest Growth Sectors**:\n` +
      `   • AI/ML Engineering: +28% YoY\n` +
      `   • Healthcare Administration: +15% YoY\n` +
      `   • Renewable Energy: +22% YoY\n` +
      `   • Cybersecurity: +25% YoY\n\n` +
      `💰 **Negotiation Insight**: Candidates who negotiate see average 12% higher starting salaries.`;
  }

  // Market trends
  private getMarketTrends(): string {
    return `**Key Labor Market Trends 2024-2025:**\n\n` +
      `🚀 **Growing Rapidly**:\n` +
      `   • Artificial Intelligence & Machine Learning\n` +
      `   • Renewable Energy & Sustainability\n` +
      `   • Healthcare & Elder Care Services\n` +
      `   • Cybersecurity & Data Privacy\n` +
      `   • Remote Work Infrastructure\n\n` +
      `📉 **Declining Sectors**:\n` +
      `   • Traditional Retail (brick-and-mortar)\n` +
      `   • Print Media & Publishing\n` +
      `   • Some Manufacturing (automation impact)\n` +
      `   • Administrative Support (AI automation)\n\n` +
      `✨ **Emerging Roles**:\n` +
      `   • AI Ethics Specialist\n` +
      `   • Sustainability Manager\n` +
      `   • Remote Work Coordinator\n` +
      `   • Digital Health Consultant`;
  }

  // Job openings insight
  private getJobOpeningsInsight(): string {
    return `**Current Job Market Overview:**\n\n` +
      `📍 **Total Active Postings**: 2.4M+ (up 8% from last quarter)\n\n` +
      `🏆 **Top Hiring Industries**:\n` +
      `   1. Healthcare & Social Assistance (18%)\n` +
      `   2. Professional & Business Services (16%)\n` +
      `   3. Technology & Information (14%)\n` +
      `   4. Education & Training (12%)\n` +
      `   5. Finance & Insurance (10%)\n\n` +
      `🌐 **Remote Opportunities**: 35% of all postings offer remote/hybrid options\n\n` +
      `⏱️ **Average Time to Hire**: 23 days (down from 31 days last year)`;
  }

  // Personalized recommendations
  private getPersonalizedRecommendations(): string {
    const recs = [
      `Based on current market data, here are my **top recommendations**:\n\n`,
      `🎯 **If you're early career**:\n`,
      `   • Focus on high-growth skills: Python, SQL, Cloud basics\n`,
      `   • Build a portfolio showcasing real projects\n`,
      `   • Consider certifications in AWS, Google, or Microsoft platforms\n\n`,
      `🎯 **If you're mid-career**:\n`,
      `   • Develop leadership and management capabilities\n`,
      `   • Specialize in a niche area within your field\n`,
      `   • Expand your professional network strategically\n\n`,
      `🎯 **If you're considering a pivot**:\n`,
      `   • Tech → Healthcare IT (leverage both domains)\n`,
      `   • Finance → Fintech or Data Analytics\n`,
      `   • Education → EdTech or Corporate Training\n\n`,
      `💡 **Universal Advice**: Continuous learning is non-negotiable. Dedicate 5-10 hours/week to skill development.`
    ];
    
    return recs.join('');
  }

  // Helper methods
  private createBotMessage(content: string, suggestions?: string[]): BotMessage {
    return {
      id: this.generateId(),
      type: 'bot',
      content,
      timestamp: new Date(),
      suggestions
    };
  }

  private generateId(): string {
    return Math.random().toString(36).substring(2, 15);
  }

  // Get context for external use
  getContext(): BotContext {
    return { ...this.context };
  }

  // Reset conversation
  reset(): void {
    this.context = {
      conversationHistory: []
    };
  }
}

// Export singleton instance
export const laborMarketBot = new LaborMarketBot();
