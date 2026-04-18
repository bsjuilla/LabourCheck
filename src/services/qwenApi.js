// Qwen AI API Service for LabourCheck
// This service integrates with Qwen AI to provide intelligent labor market insights

const QWEN_API_KEY = import.meta.env.VITE_QWEN_API_KEY || '';
const QWEN_API_URL = 'https://dashscope.aliyuncs.com/api/v1/services/aigc/text-generation/generation';

/**
 * Get AI-powered labor market insights
 * @param {string} location - City or region to analyze
 * @param {string} industry - Industry sector
 * @param {object} marketData - Current market data
 * @returns {Promise<object>} AI-generated insights
 */
export async function getLaborMarketInsights(location, industry, marketData) {
  const prompt = `Analyze the labor market for ${industry} in ${location}. 
  Current data shows:
  - Job postings trend: ${marketData.jobTrends || 'stable'}
  - Average salary range: ${marketData.salaryRange || 'N/A'}
  - Top skills in demand: ${marketData.topSkills?.join(', ') || 'N/A'}
  
  Provide:
  1. Market outlook (bullish/bearish/neutral)
  2. Top 3 emerging skills
  3. Salary trend prediction (next 6 months)
  4. Career recommendations
  5. Key risks and opportunities`;

  try {
    const response = await fetch(QWEN_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${QWEN_API_KEY}`
      },
      body: JSON.stringify({
        model: 'qwen-turbo',
        input: {
          messages: [
            {
              role: 'system',
              content: 'You are a labor market analyst expert. Provide concise, data-driven insights about employment trends, skills demand, and career opportunities.'
            },
            {
              role: 'user',
              content: prompt
            }
          ]
        },
        parameters: {
          result_format: 'text',
          max_tokens: 1000,
          temperature: 0.7
        }
      })
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();
    return {
      success: true,
      insights: data.output?.text || 'Unable to generate insights',
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    console.error('Error fetching AI insights:', error);
    return {
      success: false,
      error: error.message,
      fallback: generateFallbackInsights(location, industry, marketData)
    };
  }
}

/**
 * Generate career path recommendations based on user profile
 * @param {object} userProfile - User's current skills, experience, and interests
 * @returns {Promise<object>} Personalized career recommendations
 */
export async function getCareerRecommendations(userProfile) {
  const prompt = `Based on this user profile:
  - Current role: ${userProfile.currentRole || 'Not specified'}
  - Skills: ${userProfile.skills?.join(', ') || 'Not specified'}
  - Experience level: ${userProfile.experienceLevel || 'Not specified'}
  - Location: ${userProfile.location || 'Not specified'}
  - Career interests: ${userProfile.interests?.join(', ') || 'Not specified'}
  
  Provide:
  1. Top 3 recommended career paths
  2. Skills gap analysis
  3. Recommended courses/certifications
  4. Expected salary progression
  5. Timeline for transition`;

  try {
    const response = await fetch(QWEN_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${QWEN_API_KEY}`
      },
      body: JSON.stringify({
        model: 'qwen-turbo',
        input: {
          messages: [
            {
              role: 'system',
              content: 'You are a career counselor expert. Provide personalized, actionable career advice based on individual profiles and market trends.'
            },
            {
              role: 'user',
              content: prompt
            }
          ]
        },
        parameters: {
          result_format: 'text',
          max_tokens: 1200,
          temperature: 0.8
        }
      })
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();
    return {
      success: true,
      recommendations: data.output?.text || 'Unable to generate recommendations',
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    console.error('Error fetching career recommendations:', error);
    return {
      success: false,
      error: error.message,
      fallback: generateFallbackRecommendations(userProfile)
    };
  }
}

/**
 * Analyze job description and extract key requirements
 * @param {string} jobDescription - Full job posting text
 * @returns {Promise<object>} Extracted skills, requirements, and match score
 */
export async function analyzeJobDescription(jobDescription) {
  const prompt = `Analyze this job description and extract:
  ${jobDescription}
  
  Return structured data:
  1. Required skills (technical and soft)
  2. Nice-to-have skills
  3. Experience level required
  4. Education requirements
  5. Key responsibilities
  6. Salary indicators (if mentioned)`;

  try {
    const response = await fetch(QWEN_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${QWEN_API_KEY}`
      },
      body: JSON.stringify({
        model: 'qwen-turbo',
        input: {
          messages: [
            {
              role: 'system',
              content: 'You are a job analysis expert. Extract structured information from job descriptions.'
            },
            {
              role: 'user',
              content: prompt
            }
          ]
        },
        parameters: {
          result_format: 'text',
          max_tokens: 800,
          temperature: 0.5
        }
      })
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();
    return {
      success: true,
      analysis: data.output?.text || 'Unable to analyze job description',
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    console.error('Error analyzing job description:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

/**
 * Fallback insights when AI service is unavailable
 */
function generateFallbackInsights(location, industry, marketData) {
  return `
## Labor Market Insights for ${industry} in ${location}

### Market Overview
Based on available data, the ${industry} sector in ${location} shows ${marketData.jobTrends || 'stable'} trends.

### Key Observations
- Monitor local employment reports for updated statistics
- Check industry-specific publications for trends
- Network with local professionals for ground-level insights

### General Recommendations
1. Focus on transferable skills
2. Stay updated with industry certifications
3. Build a strong professional network
4. Consider remote opportunities to expand options
  `.trim();
}

/**
 * Fallback recommendations when AI service is unavailable
 */
function generateFallbackRecommendations(userProfile) {
  return `
## Career Recommendations

### Based on Your Profile
**Current Role:** ${userProfile.currentRole || 'Not specified'}  
**Location:** ${userProfile.location || 'Not specified'}

### General Guidance
1. **Skill Development**: Focus on high-demand skills in your industry
2. **Networking**: Attend local industry events and join professional groups
3. **Continuous Learning**: Pursue relevant certifications and online courses
4. **Market Research**: Regularly review job postings to understand requirements

### Next Steps
- Update your resume and LinkedIn profile
- Set up job alerts for target positions
- Consider informational interviews with professionals in desired roles
- Explore online learning platforms for skill enhancement
  `.trim();
}

export default {
  getLaborMarketInsights,
  getCareerRecommendations,
  analyzeJobDescription
};
