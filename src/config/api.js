// src/config/api.js
// API configuration for different environments

const API_CONFIG = {
  development: {
    chatbotBaseUrl: 'http://0.0.0.0:8000/api/v1/chatbot/',
    timeout: 10000, // 10 seconds
  },
  production: {
    chatbotBaseUrl: 'https://your-production-api.com/api/v1/chatbot/',
    timeout: 15000, // 15 seconds
  }
};

// Get current environment
const environment = process.env.NODE_ENV || 'development';

export const apiConfig = API_CONFIG[environment] || API_CONFIG.development;

export default apiConfig; 