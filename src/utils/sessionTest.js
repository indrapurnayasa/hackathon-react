// src/utils/sessionTest.js
// Test utility for session management logging

import chatbotAPI from './chatbotAPI';

export const sessionTest = {
  /**
   * Test session management with sample queries
   */
  async testSessionFlow() {
    console.log('🧪 Starting session management test...');
    
    // Test 1: New session
    console.log('\n📝 Test 1: New chat session');
    chatbotAPI.clearSession(); // Ensure clean start
    await chatbotAPI.processUserInput("apakah yang harus dipersiapkan untuk pertama kali memulai export?");
    
    // Test 2: Continue session
    console.log('\n📝 Test 2: Continue existing session');
    await chatbotAPI.processUserInput("berapa lama proses export?");
    
    // Test 3: Another follow-up
    console.log('\n📝 Test 3: Another follow-up question');
    await chatbotAPI.processUserInput("apa dokumen yang diperlukan?");
    
    // Test 4: Clear session
    console.log('\n📝 Test 4: Clear session');
    chatbotAPI.clearSession();
    
    // Test 5: New session after clear
    console.log('\n📝 Test 5: New session after clear');
    await chatbotAPI.processUserInput("bagaimana cara menghitung biaya ekspor?");
    
    console.log('\n✅ Session management test completed!');
  },

  /**
   * Log current session state
   */
  logCurrentState() {
    console.log('📊 Current session state:');
    chatbotAPI.logSessionState();
  }
};

export default sessionTest; 