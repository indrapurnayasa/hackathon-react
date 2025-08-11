// src/utils/chatbotAPI.js
// API integration for chatbot functionality (server-managed sessions)

import apiConfig from '../config/api';

const API_BASE_URL = apiConfig.chatbotBaseUrl;
const LOCAL_STORAGE_KEY = 'chatbot.session_id';

export const chatbotAPI = {
  // Session management
  currentSessionId: null,
  isNewSession: true,

  /**
   * Load a previously saved session_id from localStorage
   */
  loadPersistedSession() {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (stored) {
        this.currentSessionId = stored;
        this.isNewSession = false;
        console.log('♻️ Restored session_id from storage:', stored);
        return stored;
      }
    } catch (_e) {}
    return null;
  },

  /**
   * Persist session_id to localStorage
   */
  persistSession(sessionId) {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, sessionId);
    } catch (_e) {}
  },

  /**
   * Start a new chat session (omit session_id on next request so server issues one)
   */
  startNewSession() {
    const prev = this.currentSessionId;
    this.currentSessionId = null;
    this.isNewSession = true;
    try { localStorage.removeItem(LOCAL_STORAGE_KEY); } catch (_e) {}
    console.log('🆕 Starting new session. Previous session_id:', prev);
  },

  /**
   * Clear current session (for clear chat functionality)
   */
  clearSession() {
    const oldSessionId = this.currentSessionId;
    this.currentSessionId = null;
    this.isNewSession = true;
    try { localStorage.removeItem(LOCAL_STORAGE_KEY); } catch (_e) {}
    console.log('🗑️ Session cleared:', oldSessionId);
  },

  /**
   * Get current session ID, create new one if doesn't exist
   * @returns {string} - Current session ID
   */
  getCurrentSessionId() {
    if (!this.currentSessionId) {
      this.loadPersistedSession();
    }
    return this.currentSessionId;
  },

  /**
   * Test the API connection
   * @returns {Promise<boolean>} - True if connection is successful
   */
  async testConnection() {
    // Do a lightweight ping without affecting session
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), apiConfig.timeout);
      const response = await fetch(API_BASE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'accept': 'application/json',
        },
        body: JSON.stringify({ query: 'ping' }),
        signal: controller.signal,
      });
      clearTimeout(timeoutId);
      return response.ok;
    } catch (error) {
      console.warn('API connectivity check failed:', error?.message || error);
      return false;
    }
  },

  /**
   * Get current session information
   * @returns {Object} - Session info
   */
  getSessionInfo() {
    return {
      session_id: this.currentSessionId,
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

      const doRequest = async () => {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), apiConfig.timeout);
        try {
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
            if (response.status === 429) throw new Error('429');
            if (response.status === 504) throw new Error('504');
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return await response.json();
        } catch (err) {
          clearTimeout(timeoutId);
          throw err;
        }
      };

      // Simple retry for 429/504
      let data;
      try {
        data = await doRequest();
      } catch (err) {
        if (err.message === '429' || err.message === '504') {
          const wait = err.message === '429' ? 1500 : 2500;
          console.warn(`Received ${err.message}. Retrying in ${wait}ms...`);
          await new Promise((r) => setTimeout(r, wait));
          data = await doRequest();
        } else {
          throw err;
        }
      }
      
      // If server returned session_id, remember and persist it
      if (data && data.session_id) {
        this.currentSessionId = data.session_id;
        this.isNewSession = false;
        this.persistSession(data.session_id);
        console.log('✅ Session established (server):', this.currentSessionId);
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
      
      // Extract the answer and document/proposal template fields from the API response
      const answer = apiResponse.answer || 'Maaf, saya tidak dapat memproses permintaan Anda saat ini.';
      const hasDocument =
        apiResponse && (apiResponse.documentTemplate === true || apiResponse.generateProposal === true);

      return {
        success: true,
        answer: answer,
        session_id: this.currentSessionId,
        originalResponse: apiResponse,
        // Only pass through document fields when API explicitly sets documentTemplate to true
        documentTemplate: hasDocument,
        htmlTemplate: hasDocument ? (apiResponse.htmlTemplate || null) : null,
        documentType: hasDocument ? (apiResponse.documentType || (apiResponse.generateProposal ? 'Proposal' : null)) : null,
        // passthrough of new optional fields
        templateName: apiResponse.templateName || null,
        similarity: typeof apiResponse.similarity === 'number' ? apiResponse.similarity : undefined,
        similarityPercentage: typeof apiResponse.similarityPercentage === 'number' ? apiResponse.similarityPercentage : undefined,
        promptId: typeof apiResponse.promptId === 'number' ? apiResponse.promptId : undefined,
        executionTime: typeof apiResponse.executionTime === 'number' ? apiResponse.executionTime : undefined,
        optimized: typeof apiResponse.optimized === 'boolean' ? apiResponse.optimized : undefined,
        // proposal flag passthrough
        generateProposal: apiResponse.generateProposal === true,
      };
    } catch (error) {
      console.error('Error processing user input:', error);
      
      // Fallback response when API fails
      return {
        success: false,
        answer: 'Maaf, terjadi kesalahan dalam memproses permintaan Anda. Silakan coba lagi nanti.',
        error: error.message,
        session_id: this.currentSessionId
      };
    }
  }
};

export default chatbotAPI; 