// src/utils/chatbotIntegrationExample.js
// CONTOH INTEGRASI ENHANCED CHATBOT SYSTEM KE CHATINTERFACE

import EnhancedChatbotSystem from './enhancedChatbotSystem.js';

// ===== CARA MENGGUNAKAN ENHANCED CHATBOT SYSTEM =====

// 1. IMPORT DI CHATINTERFACE.JS
// import EnhancedChatbotSystem from '../utils/enhancedChatbotSystem.js';

// 2. REPLACE EXISTING HANDLESUBMIT FUNCTION
const enhancedHandleSubmit = (e, setMessages, setCurrentFlow, setCompletedDocuments, setIsTyping) => {
  e.preventDefault();
  const form = e.target;
  const formData = new FormData(form);
  const userInput = formData.get('message').trim();
  
  if (!userInput) return;

  // Add user message
  const userMessage = {
    from: "user",
    text: userInput,
    timestamp: new Date().toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
    }),
  };
  
  setMessages((prev) => [...prev, userMessage]);
  
  // Set typing indicator
  setIsTyping(true);
  
  // Use enhanced chatbot system for intelligent response
  setTimeout(() => {
    setIsTyping(false);
    EnhancedChatbotSystem.getIntelligentResponse(userInput, setMessages, {
      setCurrentFlow,
      setCompletedDocuments
    });
  }, 1000);

  // Clear form
  form.reset();
};

// 3. UPDATE GENERAL SUGGESTIONS DENGAN MOCK DATA
const getEnhancedGeneralSuggestions = () => {
  return [
    "Hitung biaya ekspor kopi ke Jepang 2 ton",
    "Buatkan commercial invoice untuk ekspor",
    "Email penawaran untuk produk rempah",
    "Proposal kerjasama bisnis ekspor",
    "Dokumen yang diperlukan untuk ekspor udang",
    "Estimasi biaya shipping ke Singapura"
  ];
};

// 4. ENHANCED MESSAGE RENDERING
const renderEnhancedMessage = (message) => {
  // Handle enhanced cost estimation
  if (message.type === "enhanced-cost-estimation") {
    return (
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-semibold text-blue-800 mb-3">
          📊 Estimasi Biaya Ekspor Detail
        </h4>
        
        {/* Product Info */}
        <div className="mb-4 p-3 bg-white rounded border">
          <h5 className="font-medium mb-2">Informasi Produk:</h5>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div><strong>Produk:</strong> {message.content.productInfo.name}</div>
            <div><strong>Kategori:</strong> {message.content.productInfo.category}</div>
            <div><strong>Kode HS:</strong> {message.content.productInfo.hsCode}</div>
            <div><strong>Berat:</strong> {message.content.productInfo.weight}</div>
            <div><strong>Tujuan:</strong> {message.content.productInfo.destination}</div>
            <div><strong>Region:</strong> {message.content.productInfo.region}</div>
          </div>
        </div>

        {/* Cost Breakdown */}
        <div className="mb-4 p-3 bg-white rounded border">
          <h5 className="font-medium mb-2">Breakdown Biaya:</h5>
          <div className="space-y-1 text-sm">
            <div className="flex justify-between">
              <span>FOB Value:</span>
              <span className="font-mono">{formatCurrency(message.content.costs.fob)}</span>
            </div>
            <div className="flex justify-between">
              <span>Freight:</span>
              <span className="font-mono">{formatCurrency(message.content.costs.freight)}</span>
            </div>
            <div className="flex justify-between">
              <span>Insurance:</span>
              <span className="font-mono">{formatCurrency(message.content.costs.insurance)}</span>
            </div>
            <div className="flex justify-between">
              <span>Handling:</span>
              <span className="font-mono">{formatCurrency(message.content.costs.handling)}</span>
            </div>
            <div className="flex justify-between">
              <span>Documentation:</span>
              <span className="font-mono">{formatCurrency(message.content.costs.documentation)}</span>
            </div>
            <div className="flex justify-between">
              <span>Customs:</span>
              <span className="font-mono">{formatCurrency(message.content.costs.customs)}</span>
            </div>
            <hr className="my-2"/>
            <div className="flex justify-between font-semibold text-lg">
              <span>Total:</span>
              <span className="font-mono text-green-600">{formatCurrency(message.content.total)}</span>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="p-3 bg-white rounded border">
          <h5 className="font-medium mb-2">Informasi Tambahan:</h5>
          <div className="text-sm space-y-1">
            <div><strong>Estimasi Waktu Kirim:</strong> {message.content.additionalInfo.shippingTime}</div>
            <div><strong>Dokumen Diperlukan:</strong> {message.content.additionalInfo.documentation.join(", ")}</div>
            <div><strong>Payment Terms:</strong> {message.content.additionalInfo.paymentTerms}</div>
          </div>
        </div>
      </div>
    );
  }

  // Handle enhanced document ready
  if (message.type === "enhanced-document-ready") {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <h4 className="font-semibold text-green-800 mb-3">
          ✅ {message.documentName} - Dokumen Siap
        </h4>
        
        {/* Enhanced Features */}
        <div className="mb-3 flex gap-2 flex-wrap">
          {message.additionalFeatures.autoCompleteFields && (
            <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
              ✓ Auto-Complete Fields
            </span>
          )}
          {message.additionalFeatures.validationChecks && (
            <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">
              ✓ Validation Checks
            </span>
          )}
          {message.additionalFeatures.complianceVerified && (
            <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded">
              ✓ Compliance Verified
            </span>
          )}
        </div>

        <div className="bg-white p-3 rounded border font-mono text-sm whitespace-pre-wrap">
          {message.content}
        </div>
        
        <div className="mt-3 flex gap-2">
          <button 
            onClick={() => handleCopy(message.content)}
            className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
          >
            📋 Copy
          </button>
          <button 
            onClick={() => handleDownload(message.content, message.documentName)}
            className="px-3 py-1 bg-green-500 text-white rounded text-sm hover:bg-green-600"
          >
            📄 Download PDF
          </button>
        </div>
      </div>
    );
  }

  // Handle enhanced email ready
  if (message.type === "enhanced-email-ready") {
    return (
      <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
        <h4 className="font-semibold text-purple-800 mb-3">
          ✉️ Email Profesional - {message.emailType}
        </h4>
        
        {/* Smart Features */}
        <div className="mb-3 flex gap-2 flex-wrap">
          {message.smartFeatures.contextAware && (
            <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
              🧠 Context Aware
            </span>
          )}
          {message.smartFeatures.industrySpecific && (
            <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">
              🏭 Industry Specific
            </span>
          )}
          {message.smartFeatures.professionalTone && (
            <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded">
              💼 Professional Tone
            </span>
          )}
        </div>

        <div className="bg-white p-3 rounded border font-mono text-sm whitespace-pre-wrap">
          {message.content}
        </div>
        
        <div className="mt-3">
          <button 
            onClick={() => handleCopy(message.content)}
            className="px-3 py-1 bg-purple-500 text-white rounded text-sm hover:bg-purple-600"
          >
            📋 Copy Email
          </button>
        </div>
      </div>
    );
  }

  // Handle enhanced proposal ready
  if (message.type === "enhanced-proposal-ready") {
    return (
      <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
        <h4 className="font-semibold text-orange-800 mb-3">
          📋 {message.proposalName} - Proposal Siap
        </h4>
        
        {/* Business Insights */}
        <div className="mb-3 flex gap-2 flex-wrap">
          {message.businessInsights.marketAnalysis && (
            <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
              📈 Market Analysis
            </span>
          )}
          {message.businessInsights.financialProjections && (
            <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">
              💰 Financial Projections
            </span>
          )}
          {message.businessInsights.riskAssessment && (
            <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded">
              ⚠️ Risk Assessment
            </span>
          )}
          {message.businessInsights.competitiveAdvantage && (
            <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded">
              🏆 Competitive Advantage
            </span>
          )}
        </div>

        <div className="bg-white p-3 rounded border font-mono text-sm whitespace-pre-wrap">
          {message.content}
        </div>
        
        <div className="mt-3 flex gap-2">
          <button 
            onClick={() => handleCopy(message.content)}
            className="px-3 py-1 bg-orange-500 text-white rounded text-sm hover:bg-orange-600"
          >
            📋 Copy
          </button>
          <button 
            onClick={() => handleDownload(message.content, message.proposalName)}
            className="px-3 py-1 bg-green-500 text-white rounded text-sm hover:bg-green-600"
          >
            📄 Download PDF
          </button>
        </div>
      </div>
    );
  }

  // Default message rendering (existing)
  return (
    <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
      <p className="text-gray-800">{message.text}</p>
    </div>
  );
};

// 5. UTILITY FUNCTIONS
const formatCurrency = (amount) => {
  return `Rp ${amount.toLocaleString('id-ID')}`;
};

const handleCopy = (content) => {
  navigator.clipboard.writeText(content);
  alert("Content berhasil disalin!");
};

const handleDownload = (content, filename) => {
  // Implementation untuk download PDF
  console.log("Download:", filename, content);
};

// ===== EXPORT UNTUK DIGUNAKAN DI CHATINTERFACE =====
export {
  enhancedHandleSubmit,
  getEnhancedGeneralSuggestions,
  renderEnhancedMessage,
  formatCurrency,
  handleCopy,
  handleDownload
};

// ===== CONTOH IMPLEMENTASI DI CHATINTERFACE.JS =====
/*

LANGKAH-LANGKAH INTEGRASI:

1. Import enhanced system:
   import EnhancedChatbotSystem from '../utils/enhancedChatbotSystem.js';
   import { enhancedHandleSubmit, getEnhancedGeneralSuggestions, renderEnhancedMessage } from '../utils/chatbotIntegrationExample.js';

2. Replace handleSubmit function:
   const handleSubmit = (e) => enhancedHandleSubmit(e, setMessages, setCurrentFlow, setCompletedDocuments, setIsTyping);

3. Update general suggestions:
   const generalSuggestions = getEnhancedGeneralSuggestions();

4. Update message rendering dalam return statement:
   {messages.map((message, index) => (
     <div key={index} className={`${message.from === 'user' ? 'text-right' : 'text-left'} mb-4`}>
       {message.from === 'user' ? (
         // User message styling (existing)
       ) : (
         // Bot message dengan enhanced rendering
         {renderEnhancedMessage(message)}
       )}
     </div>
   ))}

5. Test dengan input seperti:
   - "Hitung biaya ekspor kopi ke Jepang 2 ton"
   - "Buatkan commercial invoice"
   - "Email penawaran produk"
   - "Proposal bisnis ekspor"

HASIL:
- Chatbot akan memberikan respons yang lebih intelligent
- Data yang digunakan akan lebih realistis dan variatif
- UI akan menampilkan informasi yang lebih detail dan terstruktur
- User experience akan lebih baik dengan fitur-fitur enhanced

*/ 