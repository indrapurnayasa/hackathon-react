import React, { useState, useEffect, useRef } from "react";
import {
  Send,
  FileText,
  Calculator,
  Mail,
  MessageCircle,
  Download,
  Bot,
  Lightbulb,
  Copy,
  CheckCircle,
  Circle,
  HelpCircle, // TAMBAH IMPORT INI
} from "lucide-react";
import { createPortal } from "react-dom"; // TAMBAH IMPORT INI
import config from '../config';

// Import components
// import DocumentGenerator from "../components/ai-assistant/DocumentGenerator";
// import EmailGenerator from "../components/ai-assistant/EmailGenerator";
// import ProposalGenerator from "../components/ai-assistant/ProposalGenerator";
// import CostCalculator from "../components/ai-assistant/CostCalculator"; // Removed as requested
import ChatInterface from "../components/ai-assistant/ChatInterface";

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
  const [isTypingResponse, setIsTypingResponse] = useState(false);
  const [currentFlow, setCurrentFlow] = useState(null);
  const [completedDocuments, setCompletedDocuments] = useState(new Set());
  const [completedEmails, setCompletedEmails] = useState(new Set());
  const [completedProposals, setCompletedProposals] = useState(new Set());
  const [chatHistory, setChatHistory] = useState([]); // Add chat history for context

  // TAMBAH STATE UNTUK TOOLTIP
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  // Ref for auto scroll
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);
  const helpIconRef = useRef(null); // TAMBAH REF INI

  // Auto scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, isTypingResponse]);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  // TAMBAH FUNGSI TOOLTIP
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

  const handleTooltipHide = () => {
    setShowTooltip(false);
  };

  // Function to clear chat history and start new conversation
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

  // Function to call chatbot API with chat history for context
  const callChatbotAPI = async (query) => {
    try {
      // Prepare conversation context
      const conversationContext = chatHistory.length > 0 
        ? chatHistory.slice(-5).map(msg => `${msg.role}: ${msg.content}`).join('\n') + '\n'
        : '';
      
      // Combine context with current query
      const fullQuery = conversationContext + `User: ${query}`;
      
      console.log('Sending to API:', {
        url: `${config.API_BASE_URL}/api/v1/prompt-library/chatbot/`,
        query: fullQuery
      });
      
      const response = await fetch(`${config.API_BASE_URL}/api/v1/prompt-library/chatbot/`, {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: fullQuery,
        }),
      });

      const data = await response.json();
      
      console.log('API Response:', {
        status: response.status,
        ok: response.ok,
        data: data
      });
      
      if (!response.ok) {
        throw new Error(data?.detail || data?.message || data?.error || `HTTP error! status: ${response.status}`);
      }

      return data;
    } catch (error) {
      console.error('Error calling chatbot API:', error);
      throw error;
    }
  };

  // Function to format API response with proper line breaks and bold text
  const formatAPIResponse = (answer) => {
    // Split by \n and create proper formatting
    const lines = answer.split('\n');
    return lines.map((line, index) => {
      if (line.trim() === '') {
        return <br key={index} />;
      }
      
      // Handle bold text (**text**)
      const parts = [];
      let currentIndex = 0;
      let boldMatch;
      const boldRegex = /\*\*(.*?)\*\*/g;
      
      while ((boldMatch = boldRegex.exec(line)) !== null) {
        // Add text before the bold match
        if (boldMatch.index > currentIndex) {
          parts.push(line.slice(currentIndex, boldMatch.index));
        }
        
        // Add bold text
        parts.push(
          <strong key={`bold-${index}-${parts.length}`} style={{ fontWeight: 600 }}>
            {boldMatch[1]}
          </strong>
        );
        
        currentIndex = boldMatch.index + boldMatch[0].length;
      }
      
      // Add remaining text after the last bold match
      if (currentIndex < line.length) {
        parts.push(line.slice(currentIndex));
      }
      
      // If no bold text found, just return the line as is
      if (parts.length === 0) {
        parts.push(line);
      }
      
      return (
        <span key={index}>
          {parts}
          {index < lines.length - 1 && <br />}
        </span>
      );
    });
  };

  // Function to animate typing response
  const animateTypingResponse = (fullText, formattedText) => {
    setIsTypingResponse(true);
    
    // Create initial message with empty text
    const botMessage = {
      from: "bot",
      text: "",
      formattedText: null,
      timestamp: new Date().toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    
    setMessages((prev) => [...prev, botMessage]);
    
    // Animate character by character
    let currentIndex = 0;
    const typingSpeed = 30; // milliseconds per character
    
    const typeNextCharacter = () => {
      if (currentIndex < fullText.length) {
        const currentText = fullText.slice(0, currentIndex + 1);
        
        setMessages((prev) => {
          const newMessages = [...prev];
          const lastMessage = newMessages[newMessages.length - 1];
          if (lastMessage.from === "bot") {
            lastMessage.text = currentText;
            // Only apply formatting when typing is complete
            if (currentIndex === fullText.length - 1) {
              lastMessage.formattedText = formattedText;
            }
          }
          return newMessages;
        });
        
        currentIndex++;
        setTimeout(typeNextCharacter, typingSpeed);
      } else {
        // Typing animation complete
        setIsTypingResponse(false);
      }
    };
    
    typeNextCharacter();
  };

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

  // General suggestions - TAMBAH JADI 6 PERTANYAAN
  const generalSuggestions = [
    "Apa saja dokumen yang diperlukan untuk ekspor?",
    "Bagaimana cara menghitung biaya ekspor?",
    "Negara mana yang mudah untuk ekspor pemula?",
    "Bagaimana cara memulai ekspor?",
    "Apa saja syarat kemasan untuk ekspor makanan?",
    "Prosedur bea cukai untuk ekspor seperti apa?",
  ];

  const handleSuggestionClick = (suggestion) => {
    // Create user message immediately
    const userMessage = {
      from: "user",
      text: suggestion,
      timestamp: new Date().toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    setMessages((prev) => [...prev, userMessage]);

    // Add to chat history for context
    setChatHistory((prev) => [...prev, { role: 'user', content: suggestion }]);

    // Start typing animation
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      processUserInput(suggestion);
    }, 500);
  };

  const handleFeatureSelect = (feature) => {
    // Create user message immediately
    const userMessage = {
      from: "user",
      text: feature.prompt,
      timestamp: new Date().toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    setMessages((prev) => [...prev, userMessage]);

    // Add to chat history for context
    setChatHistory((prev) => [...prev, { role: 'user', content: feature.prompt }]);

    // Start typing animation
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      processUserInput(feature.prompt);
    }, 500);
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

    // Add to chat history for context
    setChatHistory((prev) => [...prev, { role: 'user', content: input }]);

    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      processUserInput(input);
    }, 500);

    setInput("");
  };

  // All user input now goes directly to the chatbot API
  const processUserInput = async (userInput) => {
    try {
      setIsGenerating(true);
      
      // Call the chatbot API
      const apiResponse = await callChatbotAPI(userInput);
      
      console.log('Processing API response:', apiResponse);
      
      // Check for different possible response formats
      const answer = apiResponse.answer || apiResponse.response || apiResponse.message || apiResponse.text;
      const isSuccess = apiResponse.success !== false; // Consider success unless explicitly false
      
      if (isSuccess && answer) {
        // Add bot response to chat history
        setChatHistory((prev) => [...prev, { role: 'assistant', content: answer }]);
        
        // Format the response
        const formattedText = formatAPIResponse(answer);
        
        // Start typing animation
        animateTypingResponse(answer, formattedText);
        
      } else {
        // Use API response error message if available, otherwise fallback
        const errorMessage = apiResponse?.detail || apiResponse?.message || apiResponse?.error || apiResponse?.reason || "Maaf, saya mengalami kesalahan dalam memproses pertanyaan Anda. Silakan coba lagi.";
        
        console.log('API returned error:', errorMessage);
        
        // Animate error message too
        animateTypingResponse(errorMessage, null);
      }
    } catch (error) {
      console.error('Error processing user input:', error);
      
      // Use the actual error message from the API response
      const errorMessage = error.message || "Maaf, terjadi kesalahan koneksi. Silakan coba lagi.";
      
      // Animate error message
      animateTypingResponse(errorMessage, null);
    } finally {
      setIsGenerating(false);
    }
  };

  // TAMBAH TOOLTIP PORTAL
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
            <span
              className="font-medium"
              style={{
                fontFamily:
                  "'Google Sans Text', 'Product Sans', 'Roboto', -apple-system, BlinkMacSystemFont, sans-serif",
                fontWeight: 500,
              }}
            >
              🤖 Tentang AI Assistant:
            </span>
          </div>
          <ul
            className="space-y-1"
            style={{
              fontFamily:
                "'Google Sans Text', 'Product Sans', 'Roboto', -apple-system, BlinkMacSystemFont, sans-serif",
              fontWeight: 400,
            }}
          >
            <li>• Bantuan informasi ekspor 24/7</li>
            <li>• Generate dokumen ekspor otomatis</li>
            <li>• Template email bisnis profesional</li>
            <li>• Estimasi biaya ekspor real-time</li>
            <li>• Konsultasi prosedur dan regulasi</li>
            <li>• Tips strategi pemasaran internasional</li>
          </ul>

          <div
            style={{
              position: "absolute",
              left: "-6px",
              top: "8px",
              width: 0,
              height: 0,
              borderTop: "4px solid transparent",
              borderBottom: "4px solid transparent",
              borderRight: "6px solid #1f2937",
            }}
          />
        </div>
      </div>,
      document.body
    );
  };

  return (
    <div style={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'column', flex: 1 }}>
      {/* Your AI Assistant content here, e.g. chat UI, etc. */}
      {/* Example placeholder: */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#fff', borderRadius: 16, boxShadow: '0 2px 12px rgba(0,0,0,0.04)', margin: 0, padding: 0, minHeight: 0 }}>
        {/* Replace this with your actual chat UI or assistant components */}
        <h2 style={{ padding: 24, margin: 0 }}>AI Assistant Chat</h2>
        <div style={{ flex: 1, overflow: 'auto', padding: 24 }}>
          {/* Chat messages or assistant UI goes here */}
        </div>
      </div>
    </div>
  );
}
