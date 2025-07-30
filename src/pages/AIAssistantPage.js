import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import {
  Bot,
  HelpCircle,
  FileText,
  Mail,
  MessageCircle,
  Calculator,
} from "lucide-react";
import ChatInterface from "../components/ai-assistant/ChatInterface";
import EnhancedChatbotSystem from "../utils/enhancedChatbotSystem";

// Import logo AI Assistant
import aiAssistantLogo from "../assets/images/ai-assistant-logo.png";

export default function AIAssistantPage() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      from: "bot",
      text: "Halo! Saya AI Assistant untuk ekspor. Saya bisa membantu Anda dengan berbagai kebutuhan ekspor. Apa yang bisa saya bantu hari ini? 😊",
      timestamp: new Date().toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    },
  ]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isTypingResponse] = useState(false); // Keep for future use
  const [currentFlow, setCurrentFlow] = useState(null);
  const [completedDocuments, setCompletedDocuments] = useState(new Set());
  const [completedEmails, setCompletedEmails] = useState(new Set());
  const [completedProposals, setCompletedProposals] = useState(new Set());
  const [chatHistory, setChatHistory] = useState([]);
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);
  const helpIconRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, isTypingResponse]);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const updateTooltipPosition = () => {
    if (helpIconRef.current) {
      const rect = helpIconRef.current.getBoundingClientRect();
      setTooltipPosition({
        x: rect.right + 8,
        y: rect.top - 8,
      });
    }
  };

  const handleTooltipShow = () => {
    updateTooltipPosition();
    setShowTooltip(true);
  };
  const handleTooltipHide = () => setShowTooltip(false);

  const clearChatHistory = () => {
    setChatHistory([]);
    setMessages([
      {
        from: "bot",
        text: "Halo! Saya AI Assistant untuk ekspor. Saya bisa membantu Anda dengan berbagai kebutuhan ekspor. Apa yang bisa saya bantu hari ini? 😊",
        timestamp: new Date().toLocaleTimeString("id-ID", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
    ]);
  };

  // Add missing handler functions
  const handleFeatureSelect = (feature) => {
    // Instead of auto-sending, just fill the input box
    setInput(feature.prompt);
  };

  const handleSuggestionClick = (suggestion) => {
    // Instead of auto-sending, just fill the input box
    setInput(suggestion);
  };

  const handleSend = () => {
    if (!input.trim()) return;
    const userMessage = {
      from: "user",
      text: input,
      timestamp: new Date().toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    setMessages((prev) => [...prev, userMessage]);
    setChatHistory((prev) => [...prev, { role: "user", content: input }]);
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      processUserInput(input);
    }, 1000); // Smooth delay for typing animation
    setInput("");
  };

  // Enhanced processUserInput with intelligent chatbot system
  const processUserInput = async (userInput) => {
    try {
      setIsGenerating(true);

      // Use Enhanced Chatbot System for intelligent responses
      console.log("Processing user input with Enhanced System:", userInput);
      const response = EnhancedChatbotSystem.getIntelligentResponse(
        userInput,
        setMessages,
        {
          setCompletedDocuments,
          setCompletedEmails,
          setCompletedProposals,
          setIsTyping,
          setCurrentFlow,
        }
      );
      console.log("Enhanced system response:", response);

      // If no specific enhanced response, provide general response
      if (!response) {
        // Immediate response without delay for smoother transition
        EnhancedChatbotSystem.getGeneralResponse(userInput, setMessages);
        setIsGenerating(false);
      } else {
        setIsGenerating(false);
      }
    } catch (error) {
      console.error("Error in processUserInput:", error);
      setIsGenerating(false);
    }
  };

  // ... (API call, formatting, typing animation, etc. as in your code) ...
  // For brevity, not repeating all helper functions here, but they should be included as in your code.

  // Feature suggestions
  const featureSuggestions = [
    {
      id: "document",
      title: "Generate Dokumen",
      icon: <FileText className="w-5 h-5" />,
      description: "Buat dokumen ekspor resmi",
      prompt: "Saya ingin membuat dokumen ekspor",
    },
    {
      id: "email",
      title: "Generate Email",
      icon: <Mail className="w-5 h-5" />,
      description: "Buat email bisnis profesional",
      prompt: "Saya ingin membuat email ekspor",
    },
    {
      id: "proposal",
      title: "Generate Proposal",
      icon: <MessageCircle className="w-5 h-5" />,
      description: "Buat proposal bisnis menarik",
      prompt: "Saya ingin membuat proposal ekspor",
    },
    {
      id: "cost",
      title: "Estimasi Biaya",
      icon: <Calculator className="w-5 h-5" />,
      description: "Hitung estimasi biaya ekspor",
      prompt: "Berapa estimasi biaya ekspor ke Jepang?",
    },
  ];

  const generalSuggestions = [
    // 1. Email generation
    "Saya ingin membuat email inquiry produk",

    // 2. Proposal generation
    "Buatkan proposal kerjasama bisnis",

    // 3. Cost estimation
    "Berapa estimasi biaya ekspor ke Jepang?",

    // 4. Document list request
    "Saya ingin membuat dokumen ekspor resmi",

    // 5. Customs calculation
    "Tolong hitung bea cukai",

    // 6. How to questions
    "Cara membuat email profesional",

    // 7. What is questions
    "Apa itu FOB?",
  ];

  // Tooltip Portal
  const TooltipPortal = () => {
    if (!showTooltip) return null;
    return createPortal(
      <div
        style={{
          position: "fixed",
          left: `${tooltipPosition.x}px`,
          top: `${tooltipPosition.y}px`,
          zIndex: 99999,
          pointerEvents: "none",
        }}
      >
        <div className="w-72 p-3 bg-gray-900 text-white text-xs rounded-lg shadow-xl border border-gray-700">
          <div className="mb-2">
            <span className="font-medium">🤖 Tentang AI Assistant:</span>
          </div>
          <ul className="space-y-1">
            <li>• Bantuan informasi ekspor 24/7</li>
            <li>• Generate dokumen ekspor otomatis</li>
            <li>• Template email bisnis profesional</li>
            <li>• Estimasi biaya ekspor real-time</li>
            <li>• Konsultasi prosedur dan regulasi</li>
            <li>• Tips strategi pemasaran internasional</li>
          </ul>
        </div>
      </div>,
      document.body
    );
  };

  return (
    <div className="h-screen flex flex-col lg:flex-row overflow-hidden overflow-x-hidden p-0">
      <TooltipPortal />
      <div className="relative w-full h-full">
        {/* Sidebar - AI Assistant */}
        <div className="absolute top-24 left-6 bottom-6 w-80 z-20 bg-white rounded-xl shadow-sm border border-gray-200 p-4 lg:p-6 flex flex-col overflow-y-auto overflow-x-hidden">
          <div className="flex items-center space-x-3 mb-4 lg:mb-6">
            {/* Logo AI Assistant - bisa diganti dengan PNG custom */}
            <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-lg flex items-center justify-center overflow-hidden">
              {/* 
                Cara menggunakan logo custom:
                1. Simpan file PNG di: src/assets/images/ai-assistant-logo.png
                2. Path sudah benar: src="/src/assets/images/ai-assistant-logo.png"
                3. Jika masih tidak muncul, coba path alternatif di bawah
              */}
              <img
                src={aiAssistantLogo}
                alt="AI Assistant Logo"
                className="w-full h-full object-cover"
                onError={(e) => {
                  console.log("Logo tidak ditemukan, menggunakan fallback");
                  // Fallback ke icon Bot jika gambar tidak ditemukan
                  e.target.style.display = "none";
                  e.target.nextSibling.style.display = "flex";
                }}
              />
              {/* Fallback icon */}
              <div
                className="w-full h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center"
                style={{ display: "none" }}
              >
                <Bot className="w-4 h-4 lg:w-5 lg:h-5 text-white" />
              </div>
            </div>
            <h1 className="text-lg lg:text-xl font-bold text-gray-900">
              AI Assistant
            </h1>
            <HelpCircle
              ref={helpIconRef}
              className="w-5 h-5 text-gray-400 hover:text-gray-600 cursor-help transition-colors"
              onMouseEnter={handleTooltipShow}
              onMouseLeave={handleTooltipHide}
            />
          </div>
          {/* Quick Actions */}
          <div className="flex-1 flex flex-col">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-gray-700">
                Quick Actions
              </h3>
              <button
                onClick={clearChatHistory}
                className="text-xs bg-blue-50 hover:bg-blue-100 text-blue-600 px-3 py-1 rounded-full transition-colors"
              >
                Clear Chat
              </button>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-1 gap-2 lg:gap-3">
              {featureSuggestions.map((feature) => (
                <button
                  key={feature.id}
                  onClick={() => handleFeatureSelect(feature)}
                  className="w-full bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-full p-3 lg:p-4 transition-all text-left group"
                >
                  <div className="flex items-center space-x-2 lg:space-x-3">
                    <div className="text-gray-600 flex-shrink-0">
                      {feature.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-gray-900 text-xs lg:text-sm truncate">
                        {feature.title}
                      </div>
                      <div className="text-xs text-gray-600 mt-1 hidden lg:block">
                        {feature.description}
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
          <div className="pt-4 border-t border-gray-100 mt-4 lg:mt-6 hidden lg:block">
            <p className="text-xs text-gray-500">
              💡 Tip: Klik quick action di atas atau ketik pertanyaan langsung
              di chat
            </p>
          </div>
        </div>

        {/* Chat Container */}
        <div className="flex-1 h-full min-h-0 flex flex-col pr-6 ml-[352px]">
          <ChatInterface
            messages={messages}
            setMessages={setMessages}
            isTyping={isTyping}
            isTypingResponse={isTypingResponse}
            input={input}
            setInput={setInput}
            handleSend={handleSend}
            isGenerating={isGenerating}
            currentFlow={currentFlow}
            generalSuggestions={generalSuggestions}
            handleSuggestionClick={handleSuggestionClick}
            messagesEndRef={messagesEndRef}
            chatContainerRef={chatContainerRef}
            completedDocuments={completedDocuments}
            setCompletedDocuments={setCompletedDocuments}
            completedEmails={completedEmails}
            setCompletedEmails={setCompletedEmails}
            completedProposals={completedProposals}
            setCompletedProposals={setCompletedProposals}
            setCurrentFlow={setCurrentFlow}
            setIsTyping={setIsTyping}
            chatHistory={chatHistory}
            setChatHistory={setChatHistory}
          />
        </div>
      </div>
    </div>
  );
}
