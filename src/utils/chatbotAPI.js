// src/utils/chatbotAPI.js
// API integration for chatbot functionality

import apiConfig from '../config/api';

const API_BASE_URL = apiConfig.chatbotBaseUrl;

export const chatbotAPI = {
  // Session management
  currentSessionId: null,
  isNewSession: true,

  /**
   * Generate a new session ID
   * @returns {string} - New session ID
   */
  generateSessionId() {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 10000);
    return `session_${timestamp}_${random}`;
  },

  /**
   * Start a new chat session
   * @returns {string} - New session ID
   */
  startNewSession() {
    this.currentSessionId = this.generateSessionId();
    this.isNewSession = true;
    console.log('🆕 Starting new session:', this.currentSessionId);
    return this.currentSessionId;
  },

  /**
   * Clear current session (for clear chat functionality)
   */
  clearSession() {
    const oldSessionId = this.currentSessionId;
    this.currentSessionId = null;
    this.isNewSession = true;
    console.log('🗑️ Session cleared:', oldSessionId);
  },

  /**
   * Get current session ID, create new one if doesn't exist
   * @returns {string} - Current session ID
   */
  getCurrentSessionId() {
    if (!this.currentSessionId) {
      this.startNewSession();
    }
    return this.currentSessionId;
  },

  /**
   * Test the API connection
   * @returns {Promise<boolean>} - True if connection is successful
   */
  async testConnection() {
    try {
      const testQuery = "test connection";
      const response = await this.sendQuery(testQuery);
      console.log("API connection test successful:", response);
      return true;
    } catch (error) {
      console.error("API connection test failed:", error);
      return false;
    }
  },

  /**
   * Get current session information
   * @returns {Object} - Session info
   */
  getSessionInfo() {
    return {
      sessionId: this.currentSessionId,
      isNewSession: this.isNewSession,
      hasActiveSession: !!this.currentSessionId
    };
  },

  /**
   * Log current session state
   */
  logSessionState() {
    const sessionInfo = this.getSessionInfo();
    console.log('📋 Current session state:', sessionInfo);
    return sessionInfo;
  },

  /**
   * Send a query to the chatbot API
   * @param {string} query - The user's query
   * @param {string|null} sessionId - Optional session ID for context
   * @returns {Promise<Object>} - The API response
   */
  async sendQuery(query, sessionId = null) {
    try {
      // Prepare request body
      const requestBody = {
        query: query
      };

      // Add session_id if provided or if we have an existing session
      if (sessionId) {
        requestBody.session_id = sessionId;
      } else if (this.currentSessionId && !this.isNewSession) {
        requestBody.session_id = this.currentSessionId;
      }

      // Enhanced logging for session management
      if (requestBody.session_id) {
        console.log('🔄 Sending request WITH session_id:', {
          query: requestBody.query,
          session_id: requestBody.session_id,
          isNewSession: this.isNewSession
        });
      } else {
        console.log('🆕 Sending request WITHOUT session_id (new chat):', {
          query: requestBody.query
        });
      }

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), apiConfig.timeout);

      const response = await fetch(API_BASE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'accept': 'application/json',
        },
        body: JSON.stringify(requestBody),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      // Mark session as established after first successful request
      if (this.isNewSession) {
        this.isNewSession = false;
        console.log('✅ Session established:', this.currentSessionId);
      }

      return data;
    } catch (error) {
      console.error('Error calling chatbot API:', error);
      if (error.name === 'AbortError') {
        throw new Error('Request timeout - server took too long to respond');
      }
      throw error;
    }
  },

  /**
   * Process user input and return formatted response
   * @param {string} userInput - The user's input
   * @param {boolean} isNewChat - Whether this is a new chat session
   * @returns {Promise<Object>} - Formatted response for the chat interface
   */
  async processUserInput(userInput, isNewChat = false) {
    try {
      // Handle new chat session
      if (isNewChat) {
        this.startNewSession();
      }

      const apiResponse = await this.sendQuery(userInput);
      
      // Extract the answer and document template fields from the API response
      const answer = apiResponse.answer || 'Maaf, saya tidak dapat memproses permintaan Anda saat ini.';
      
      return {
        success: true,
        answer: answer,
        sessionId: this.currentSessionId,
        originalResponse: apiResponse,
        // Pass through document template fields if present
        documentTemplate: apiResponse.documentTemplate || false,
        htmlTemplate: apiResponse.htmlTemplate || null,
        documentType: apiResponse.documentType || null,
      };
    } catch (error) {
      console.error('Error processing user input:', error);
      
      // Fallback response when API fails
      return {
        success: false,
        answer: 'Maaf, terjadi kesalahan dalam memproses permintaan Anda. Silakan coba lagi nanti.',
        error: error.message,
        sessionId: this.currentSessionId
      };
    }
  }
};

export default chatbotAPI; 