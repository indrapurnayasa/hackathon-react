# Chatbot API Integration

## Overview
This document describes the integration of the real chatbot API into the React application, replacing the mock data system.

## Files Modified

### 1. `src/utils/chatbotAPI.js` (NEW)
- Handles all API communication with the chatbot backend
- Includes error handling and timeout management
- Provides fallback responses when API is unavailable

### 2. `src/config/api.js` (NEW)
- Configuration file for API settings
- Supports different environments (development/production)
- Centralized API URL management

### 3. `src/pages/AIAssistantPage.js` (MODIFIED)
- Updated `processUserInput` function to use real API
- Added API connection testing on component mount
- Maintains fallback to mock system if API fails

## API Endpoint
- **URL**: `http://0.0.0.0:8000/api/v1/chatbot/`
- **Method**: POST
- **Headers**: 
  - `Content-Type: application/json`
  - `accept: application/json`
- **Body**: 
  - **New Chat**: `{ "query": "user question" }`
  - **Continue Chat**: `{ "query": "user question", "session_id": "session_1754216750_7183" }`

## Response Format
The API returns a JSON object with the following structure:
```json
{
  "answer": "The response text",
  "similarity": 0.8017168173040581,
  "prompt_id": 3,
  "execution_time": 5.716023921966553,
  "cot_analysis": { ... },
  "cot_used": true,
  "optimized": true
}
```

## Integration Features

### 1. Session Management
- **New Chat**: First message in a conversation doesn't include session_id
- **Continue Chat**: Subsequent messages include session_id for context continuity
- **Clear Chat**: Resets session and starts fresh conversation
- **Session ID Format**: `session_{timestamp}_{random}`

### 2. Real-time API Calls
- All user queries are sent to the real API
- Only the `answer` field is extracted and displayed
- Maintains the same chat interface experience

### 2. Error Handling
- Network errors are caught and handled gracefully
- Timeout handling (10 seconds in development)
- Fallback to mock system if API is unavailable

### 3. Typing Animation
- Maintains the same typing animation experience
- Calculates delay based on response length
- Smooth transition between user input and bot response

### 4. Connection Testing
- Tests API connection on component mount
- Logs connection status to console
- Provides warnings if API is unavailable

### 5. Session Tracking
- Logs session information to console for debugging
- Tracks session state (new/continuing)
- Provides session info for troubleshooting

### 6. Enhanced Logging
- **🆕 New session**: `Starting new session: session_1754216750_7183`
- **🔄 With session**: `Sending request WITH session_id: {query: "...", session_id: "session_1754216750_7183"}`
- **🆕 Without session**: `Sending request WITHOUT session_id (new chat): {query: "..."}`
- **✅ Session established**: `Session established: session_1754216750_7183`
- **🗑️ Session cleared**: `Session cleared: session_1754216750_7183`
- **📋 Session state**: `Current session state: {sessionId: "...", isNewSession: false, hasActiveSession: true}`

## Fallback System
If the API is unavailable or returns an error:
1. Shows error message to user
2. Falls back to the existing mock system
3. Maintains full functionality even without API

## Configuration
API settings can be modified in `src/config/api.js`:
- Development: `http://0.0.0.0:8000/api/v1/chatbot/`
- Production: Update to your production API URL
- Timeout: 10 seconds (dev) / 15 seconds (prod)

## Testing
To test the integration:
1. Start your API server on `http://0.0.0.0:8000`
2. Start the React app: `npm start`
3. Navigate to the AI Assistant page
4. Check browser console for connection status and session info
5. Try asking questions to test the API
6. **Test Session Management**:
   - First message: Should not include session_id
   - Follow-up messages: Should include session_id
   - Clear chat: Should reset session and start fresh

## Troubleshooting
- **CORS Issues**: Ensure your API server allows requests from `http://localhost:3000`
- **Connection Refused**: Verify the API server is running on the correct port
- **Timeout Errors**: Check if the API server is responding within the timeout period
- **Fallback Mode**: If you see "Falling back to mock system" in console, the API is not available 