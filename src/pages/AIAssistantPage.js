// src/pages/AIAssistantPage.js
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
} from "lucide-react";

// Import components
import DocumentGenerator from "../components/ai-assistant/DocumentGenerator";
import EmailGenerator from "../components/ai-assistant/EmailGenerator";
import ProposalGenerator from "../components/ai-assistant/ProposalGenerator";
import CostCalculator from "../components/ai-assistant/CostCalculator";
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
  const [currentFlow, setCurrentFlow] = useState(null);
  const [completedDocuments, setCompletedDocuments] = useState(new Set());
  const [completedEmails, setCompletedEmails] = useState(new Set());
  const [completedProposals, setCompletedProposals] = useState(new Set());

  // Ref for auto scroll
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);

  // Auto scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
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

  // General suggestions
  const generalSuggestions = [
    "Apa saja dokumen yang diperlukan untuk ekspor?",
    "Bagaimana cara menghitung biaya ekspor?",
    "Negara mana yang mudah untuk ekspor pemula?",
  ];

  const handleSuggestionClick = (suggestion) => {
    setInput(suggestion);
  };

  const handleFeatureSelect = (feature) => {
    setInput(feature.prompt);
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

    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      processUserInput(input);
    }, 1000);

    setInput("");
  };

  const processUserInput = (userInput) => {
    const input = userInput.toLowerCase();

    // Deteksi permintaan dokumen
    if (
      input.includes("dokumen") &&
      (input.includes("ekspor") ||
        input.includes("buat") ||
        input.includes("generate"))
    ) {
      DocumentGenerator.showDocumentList(
        setMessages,
        setCurrentFlow,
        completedDocuments
      );
      return;
    }

    // Deteksi permintaan email
    if (
      input.includes("email") &&
      (input.includes("ekspor") ||
        input.includes("buat") ||
        input.includes("generate") ||
        input.includes("penawaran"))
    ) {
      EmailGenerator.showEmailList(
        setMessages,
        setCurrentFlow,
        completedEmails
      );
      return;
    }

    // Deteksi permintaan proposal
    if (input.includes("proposal")) {
      ProposalGenerator.showProposalList(
        setMessages,
        setCurrentFlow,
        completedProposals
      );
      return;
    }

    // Deteksi estimasi biaya
    if (
      input.includes("biaya") ||
      input.includes("estimasi") ||
      input.includes("cost")
    ) {
      CostCalculator.calculateCost(setMessages, input);
      return;
    }

    // Response umum
    const botMessage = {
      from: "bot",
      text: "Terima kasih atas pertanyaannya! Saya siap membantu dengan berbagai kebutuhan ekspor Anda. Silakan pilih salah satu fitur di samping atau tanyakan hal spesifik yang ingin Anda ketahui tentang ekspor.",
      timestamp: new Date().toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    setMessages((prev) => [...prev, botMessage]);
  };

  return (
    <div className="h-full flex flex-col lg:flex-row overflow-hidden p-6 gap-6">
      {/* Sidebar - AI Assistant */}
      <div className="flex-none w-full lg:w-80 h-48 lg:h-full overflow-hidden">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 lg:p-6 h-full flex flex-col">
          <div className="flex items-center space-x-3 mb-4 lg:mb-6">
            <div className="w-8 h-8 lg:w-10 lg:h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Bot className="w-4 h-4 lg:w-5 lg:h-5 text-white" />
            </div>
            <h1
              className="text-lg lg:text-xl font-bold text-gray-900"
              style={{
                fontFamily: "'Product Sans', 'Google Sans Text', sans-serif",
                fontWeight: 500,
              }}
            >
              AI Assistant
            </h1>
          </div>

          {/* Quick Actions */}
          <div className="flex-1 flex flex-col">
            <h3
              className="text-sm font-semibold text-gray-700 mb-3"
              style={{
                fontFamily: "'Product Sans', 'Google Sans Text', sans-serif",
                fontWeight: 500,
              }}
            >
              Quick Actions
            </h3>
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
                      <div
                        className="font-bold text-gray-900 text-xs lg:text-sm truncate"
                        style={{
                          fontFamily:
                            "'Product Sans', 'Google Sans Text', sans-serif",
                          fontWeight: 500,
                        }}
                      >
                        {feature.title}
                      </div>
                      <div
                        className="text-xs text-gray-600 mt-1 hidden lg:block"
                        style={{
                          fontFamily:
                            "'Google Sans Text', 'Roboto', sans-serif",
                          fontWeight: 400,
                        }}
                      >
                        {feature.description}
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-gray-100 mt-4 lg:mt-6 hidden lg:block">
            <p
              className="text-xs text-gray-500"
              style={{
                fontFamily: "'Google Sans Text', 'Roboto', sans-serif",
                fontWeight: 400,
              }}
            >
              💡 Tip: Klik quick action di atas atau ketik pertanyaan langsung
              di chat
            </p>
          </div>
        </div>
      </div>

      {/* Chat Container */}
      <ChatInterface
        messages={messages}
        setMessages={setMessages}
        isTyping={isTyping}
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
      />
    </div>
  );
}
