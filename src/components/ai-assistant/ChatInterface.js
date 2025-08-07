// src/components/ai-assistant/ChatInterface.js
import React, { useRef, useState } from "react";
import {
  Send,
  Lightbulb,
  CheckCircle,
  Circle,
  Copy,
  Download,
  ChevronRight,
  X,
  FileText,
} from "lucide-react";
import { jsPDF } from "jspdf";
import DocumentGenerator from "./DocumentGenerator";
import EmailGenerator from "./EmailGenerator";
import ProposalGenerator from "./ProposalGenerator";
import EnhancedChatbotSystem from "../../utils/enhancedChatbotSystem";
import { useLocation } from "react-router-dom";

// TAMBAH FUNGSI FORMAT TANGGAL
const formatDate = (date) => {
  const months = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];

  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  return `${day} ${month} ${year}`;
};

// Typing Animation Component
const TypingIndicator = () => (
  <div className="flex items-end space-x-2 mb-4">
    <div
      className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 mb-1"
      style={{
        backgroundColor: "#ffffff",
        boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
      }}
    >
      <span style={{ fontSize: "22px" }}>🌶️</span>
    </div>

    <div className="max-w-xs lg:max-w-md relative">
      <div
        className="px-4 py-3 text-sm leading-5 text-black relative"
        style={{
          backgroundColor: "#ffffff",
          borderRadius: "18px 18px 18px 4px",
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
          fontFamily:
            "'Google Sans Text', 'Product Sans', 'Roboto', -apple-system, BlinkMacSystemFont, sans-serif",
          fontSize: "16px",
          lineHeight: "1.4",
          fontWeight: 400,
        }}
      >
        <div className="flex items-center space-x-2">
          <div className="flex space-x-1">
            <div
              className="w-2 h-2 bg-gray-400 rounded-full"
              style={{
                animation: "typing-dot 1.4s ease-in-out infinite",
                animationDelay: "0ms",
              }}
            ></div>
            <div
              className="w-2 h-2 bg-gray-400 rounded-full"
              style={{
                animation: "typing-dot 1.4s ease-in-out infinite",
                animationDelay: "200ms",
              }}
            ></div>
            <div
              className="w-2 h-2 bg-gray-400 rounded-full"
              style={{
                animation: "typing-dot 1.4s ease-in-out infinite",
                animationDelay: "400ms",
              }}
            ></div>
          </div>
          <span className="text-xs text-gray-500">AI sedang mengetik...</span>
        </div>
        <span
          className="inline-block w-0.5 h-4 bg-gray-600 ml-1 animate-pulse"
          style={{ animation: "blink 1s infinite" }}
        />
      </div>

      <div
        className="absolute bottom-0 w-0 h-0"
        style={{
          left: "0",
          borderRight: "8px solid #ffffff",
          borderBottom: "8px solid transparent",
          transform: "translateX(-2px)",
        }}
      />
    </div>

    <div
      className="text-xs mt-1 text-left text-gray-500"
      style={{
        fontSize: "11px",
        fontFamily: "'Google Sans Text', 'Roboto', sans-serif",
        fontWeight: 400,
      }}
    >
      {new Date().toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
      })}
    </div>
  </div>
);

// Success Popup Component
const SuccessPopup = ({ message, onClose }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white rounded-lg p-6 max-w-sm mx-4">
      <div className="flex items-center space-x-3 mb-4">
        <CheckCircle className="w-6 h-6 text-green-500" />
        <h3 className="text-lg font-semibold text-gray-900">Berhasil!</h3>
      </div>
      <p className="text-gray-600 mb-4">{message}</p>
      <button
        onClick={onClose}
        className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition-colors"
      >
        Tutup
      </button>
    </div>
  </div>
);

const ChatInterface = ({
  messages,
  setMessages,
  isTyping,
  isTypingResponse,
  input,
  setInput,
  handleSend,
  currentFlow,
  generalSuggestions,
  handleSuggestionClick,
  messagesEndRef,
  chatContainerRef,
  completedDocuments,
  setCompletedDocuments,
  completedEmails,
  setCompletedEmails,
  completedProposals,
  setCompletedProposals,
  setCurrentFlow,
  setIsTyping,
  chatHistory,
  setChatHistory,
}) => {
  // Add location check
  const location = useLocation();
  const isAIAssistantPage = location.pathname.includes("ai-assistant");

  // Format text with bold and other formatting
  const formatMessageText = (text) => {
    if (!text) return text;

    // Convert **bold** to HTML
    let formatted = text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");

    // Convert - bullet points to • bullet points
    formatted = formatted.replace(/^- /gm, "• ");

    return formatted;
  };

  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  // Update copy handler
  const handleCopy = (content) => {
    navigator.clipboard.writeText(content);
    setSuccessMessage("Content berhasil disalin ke clipboard!");
    setShowSuccessPopup(true);
  };

  // Update download handler
  const handleDownload = (content, filename) => {
    try {
      console.log("Creating PDF from frontend HTML...");
      const doc = new jsPDF();

      // Check if content is HTML (from enhanced document generator)
      if (content.includes("<div") || content.includes("<table")) {
        // Parse HTML exactly as shown in frontend
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = content;

        let yPosition = 20;
        const margin = 15;

        // Extract title
        const titleEl = tempDiv.querySelector("h1, h2");
        if (titleEl) {
          doc.setFont("helvetica", "bold");
          doc.setFontSize(16);
          doc.text(titleEl.textContent.trim().toUpperCase(), margin, yPosition);
          yPosition += 15;
        }

        // Extract subtitle
        const subtitleEl = tempDiv.querySelector("p");
        if (
          subtitleEl &&
          (subtitleEl.textContent.includes("Export") ||
            subtitleEl.textContent.includes("Document"))
        ) {
          doc.setFont("helvetica", "normal");
          doc.setFontSize(10);
          doc.text(subtitleEl.textContent.trim(), margin, yPosition);
          yPosition += 10;
        }

        // Extract document info (PEB number, Invoice number, etc.)
        const docInfoDivs = tempDiv.querySelectorAll("div");
        docInfoDivs.forEach((div) => {
          const style = div.getAttribute("style") || "";
          if (
            style.includes("background: #f8f9fa") &&
            style.includes("text-align: center")
          ) {
            const strongEl = div.querySelector("strong");
            const spanEl = div.querySelector("span");
            if (strongEl && spanEl) {
              doc.setFont("helvetica", "bold");
              doc.setFontSize(12);
              doc.text(strongEl.textContent.trim(), margin, yPosition);
              yPosition += 8;

              doc.setFont("helvetica", "normal");
              doc.setFontSize(10);
              doc.text(spanEl.textContent.trim(), margin, yPosition);
              yPosition += 10;
            }
          }
        });

        // Extract tables
        const tables = tempDiv.querySelectorAll("table");
        tables.forEach((table) => {
          const rows = table.querySelectorAll("tr");
          rows.forEach((row, rowIndex) => {
            const cells = row.querySelectorAll("td, th");
            let xPosition = margin;
            cells.forEach((cell, cellIndex) => {
              const cellText = cell.textContent.trim();
              if (cellText) {
                doc.setFont("helvetica", rowIndex === 0 ? "bold" : "normal");
                doc.setFontSize(10);
                doc.text(cellText, xPosition, yPosition);
                xPosition += 40; // Adjust based on your table structure
              }
            });
            yPosition += 8;
          });
          yPosition += 5;
        });

        // Extract footer
        const footerEl = tempDiv.querySelector("p[style*='font-style: italic']");
        if (footerEl) {
          doc.setFont("helvetica", "italic");
          doc.setFontSize(8);
          doc.text(footerEl.textContent.trim(), margin, yPosition);
        }
      } else {
        // Handle plain text content
        doc.setFont("helvetica", "normal");
        doc.setFontSize(12);
        const lines = content.split("\n");
        lines.forEach((line, index) => {
          if (line.trim()) {
            doc.text(line.trim(), 15, 20 + index * 10);
          }
        });
      }

      doc.save(filename);
      setSuccessMessage("File PDF berhasil diunduh!");
      setShowSuccessPopup(true);
    } catch (error) {
      console.error("Error creating PDF:", error);
      setSuccessMessage("Gagal membuat PDF. Silakan coba lagi.");
      setShowSuccessPopup(true);
    }
  };

  // Render frontend table for document generation
  const renderFrontendTable = (doc, table, startX, startY) => {
    const tableData = table.data || [];
    const headers = table.headers || [];

    let html = '<table style="width: 100%; border-collapse: collapse; margin: 10px 0;">';
    
    // Add headers
    if (headers.length > 0) {
      html += '<thead><tr>';
      headers.forEach(header => {
        html += `<th style="border: 1px solid #ddd; padding: 8px; background-color: #f8f9fa; font-weight: bold; text-align: left;">${header}</th>`;
      });
      html += '</tr></thead>';
    }
    
    // Add data rows
    html += '<tbody>';
    tableData.forEach(row => {
      html += '<tr>';
      row.forEach(cell => {
        html += `<td style="border: 1px solid #ddd; padding: 8px;">${cell}</td>`;
      });
      html += '</tr>';
    });
    html += '</tbody></table>';
    
    return html;
  };

  const renderMessage = (message, index) => {
    const isUser = message.from === "user";
    const isBot = message.from === "bot";

    return (
      <div key={index} className="flex items-end space-x-2 mb-4">
        <div
          className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 mb-1 ${
            isUser ? "order-2" : "order-1"
          }`}
          style={{
            backgroundColor: isUser ? "#2c2c2e" : "#ffffff",
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
          }}
        >
          {isUser ? (
            <span style={{ fontSize: "22px" }}>👤</span>
          ) : (
            <span style={{ fontSize: "22px" }}>🌶️</span>
          )}
        </div>

        <div
          className={`max-w-xs lg:max-w-md relative ${
            isUser ? "order-1" : "order-2"
          }`}
        >
          <div
            className={`px-4 py-3 text-sm leading-5 relative ${
              isUser ? "text-white" : "text-black"
            }`}
            style={{
              backgroundColor: isUser ? "#2c2c2e" : "#ffffff",
              borderRadius: isUser
                ? "18px 18px 4px 18px"
                : "18px 18px 18px 4px",
              boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
              fontFamily:
                "'Google Sans Text', 'Product Sans', 'Roboto', -apple-system, BlinkMacSystemFont, sans-serif",
              fontSize: "16px",
              lineHeight: "1.4",
              fontWeight: 400,
            }}
          >
            <div
              dangerouslySetInnerHTML={{
                __html: formatMessageText(message.text),
              }}
            />

            {/* Document Preview for bot messages with documentTemplate */}
            {message.from === "bot" && message.documentTemplate && message.htmlTemplate && (
              <div className="mt-3 max-w-full">
                <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
                  {/* Document Header */}
                  <div className="flex items-center justify-between p-3 bg-gray-50 border-b border-gray-200">
                    <div className="flex items-center space-x-2">
                      <FileText className="w-4 h-4 text-gray-600" />
                      <span className="text-sm font-medium text-gray-700">
                        Preview Dokumen - {message.documentType}
                      </span>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => {
                          const newWindow = window.open();
                          newWindow.document.write(message.htmlTemplate);
                          newWindow.document.close();
                        }}
                        className="text-xs bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded transition-colors"
                      >
                        Buka di Tab
                      </button>
                      <button
                        onClick={() => {
                          const blob = new Blob([message.htmlTemplate], { type: 'text/html' });
                          const url = URL.createObjectURL(blob);
                          const a = document.createElement('a');
                          a.href = url;
                          a.download = `${message.documentType || 'document'}.html`;
                          a.click();
                          URL.revokeObjectURL(url);
                        }}
                        className="text-xs bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded transition-colors"
                      >
                        Download
                      </button>
                    </div>
                  </div>
                  
                  {/* Document Content */}
                  <div className="p-4 max-h-96 overflow-y-auto">
                    <div 
                      dangerouslySetInnerHTML={{ __html: message.htmlTemplate }}
                      className="document-preview"
                      style={{
                        fontFamily: "'Times New Roman', serif",
                        fontSize: '12px',
                        lineHeight: '1.4'
                      }}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* WHATSAPP STYLE TAIL */}
            <div
              className="absolute bottom-0 w-0 h-0"
              style={{
                [message.from === "user" ? "right" : "left"]: "0",
                [message.from === "user" ? "borderLeft" : "borderRight"]:
                  message.from === "user"
                    ? "8px solid #2c2c2e"
                    : "8px solid #ffffff",
                borderBottom: "8px solid transparent",
                transform:
                  message.from === "user"
                    ? "translateX(2px)"
                    : "translateX(-2px)",
              }}
            />
          </div>

          <div
            className={`text-xs mt-1 ${
              message.from === "user"
                ? "text-right text-gray-500"
                : "text-left text-gray-500"
            }`}
            style={{
              fontSize: "11px",
              fontFamily: "'Google Sans Text', 'Roboto', sans-serif",
              fontWeight: 400,
            }}
          >
            {message.timestamp}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex-1 bg-gray-50 h-full w-full max-w-none">
      <div className="bg-white rounded-2xl shadow-md border border-gray-200 flex flex-col h-full w-full max-w-none">
        {/* Chat Messages */}
        <div
          ref={chatContainerRef}
          className="flex-1 flex flex-col overflow-y-auto space-y-4 p-6 w-full overflow-x-hidden"
          style={{
            background: "#f2f2f7",
            overflowX: "hidden",
            borderRadius: "0 0 1.25rem 1.25rem",
            minHeight: 0,
            height: "auto",
          }}
        >
          {messages.map((message, index) => renderMessage(message, index))}
          {isTyping && <TypingIndicator />}

          <div ref={messagesEndRef} />
        </div>

        {/* Only render suggestions and input box on AI Assistant page */}
        {isAIAssistantPage && (
          <>
            {/* Suggestions Bar */}
            <div
              className="border-t border-gray-100 bg-gray-50 px-6 py-4 w-full overflow-x-hidden"
              aria-label="Pertanyaan Umum"
            >
              <div className="flex items-center space-x-2 mb-2">
                <Lightbulb className="w-4 h-4 text-orange-500" />
                <span
                  className="text-sm font-medium text-gray-700"
                  style={{
                    fontFamily:
                      "'Product Sans', 'Google Sans Text', sans-serif",
                    fontWeight: 500,
                  }}
                >
                  Pertanyaan Umum:
                </span>
              </div>
              <div
                className="flex gap-3 overflow-x-auto scrollbar-hide pb-2"
                style={{
                  scrollbarWidth: "none",
                  msOverflowStyle: "none",
                  WebkitOverflowScrolling: "touch",
                }}
              >
                {Array.isArray(generalSuggestions) &&
                generalSuggestions.length > 0 ? (
                  generalSuggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="flex-shrink-0 text-xs bg-white hover:bg-blue-50 hover:text-blue-700 border border-gray-200 hover:border-blue-300 rounded-full px-4 py-2 transition-all whitespace-nowrap shadow-sm text-gray-700"
                      style={{
                        fontFamily:
                          "'Google Sans Text', 'Roboto', sans-serif",
                        fontWeight: 400,
                        minWidth: "fit-content",
                      }}
                    >
                      {suggestion}
                    </button>
                  ))
                ) : (
                  <span className="text-xs text-gray-500 px-2 py-1">
                    Tidak ada pertanyaan umum.
                  </span>
                )}
              </div>
            </div>

            {/* Input Section */}
            <div className="border-t border-gray-100 px-6 py-5 bg-white w-full overflow-x-hidden">
              <div className="flex space-x-3">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      handleSend();
                    }
                  }}
                  placeholder="Tulis pesan..."
                  className="flex-1 border border-gray-200 rounded-full px-6 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm shadow-sm text-black"
                  style={{
                    fontFamily:
                      "'Google Sans Text', 'Product Sans', 'Roboto', -apple-system, BlinkMacSystemFont, sans-serif",
                    fontSize: "16px",
                    fontWeight: 400,
                  }}
                  disabled={isTyping}
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim() || isTyping}
                  className="bg-gray-900 text-white px-7 py-4 rounded-full hover:bg-gray-800 transition-colors flex items-center space-x-2 font-medium disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
                  style={{
                    fontFamily:
                      "'Product Sans', 'Google Sans Text', sans-serif",
                    fontWeight: 500,
                  }}
                >
                  <Send className="w-4 h-4" />
                  <span className="hidden sm:inline">Kirim</span>
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Success Popup */}
      {showSuccessPopup && (
        <SuccessPopup
          message={successMessage}
          onClose={() => setShowSuccessPopup(false)}
        />
      )}

      {/* CSS untuk hide scrollbar */}
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        @keyframes blink {
          0%,
          50% {
            opacity: 1;
          }
          51%,
          100% {
            opacity: 0;
          }
        }
        
        /* Document Preview Styles */
        .document-preview {
          font-family: 'Times New Roman', serif;
          font-size: 12px;
          line-height: 1.4;
          color: #333;
        }
        
        .document-preview h1, .document-preview h2, .document-preview h3 {
          font-weight: bold;
          margin-bottom: 8px;
        }
        
        .document-preview table {
          border-collapse: collapse;
          width: 100%;
          margin: 8px 0;
        }
        
        .document-preview table, .document-preview th, .document-preview td {
          border: 1px solid #ddd;
          padding: 4px 8px;
        }
        
        .document-preview th {
          background-color: #f8f9fa;
          font-weight: bold;
        }
      `}</style>
    </div>
  );
};

export default ChatInterface;
