// src/components/ai-assistant/ChatInterface.js
import React, { useRef } from "react";
import {
  Send,
  Lightbulb,
  CheckCircle,
  Circle,
  Copy,
  Download,
} from "lucide-react";
import { jsPDF } from "jspdf";
import DocumentGenerator from "./DocumentGenerator";
import EmailGenerator from "./EmailGenerator";
import ProposalGenerator from "./ProposalGenerator";

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
        <div className="flex space-x-1">
          <div
            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
            style={{ animationDelay: "0ms" }}
          ></div>
          <div
            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
            style={{ animationDelay: "150ms" }}
          ></div>
          <div
            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
            style={{ animationDelay: "300ms" }}
          ></div>
        </div>

        {/* WHATSAPP STYLE TAIL */}
        <div
          className="absolute bottom-0 left-0 w-0 h-0"
          style={{
            borderRight: "8px solid #ffffff",
            borderBottom: "8px solid transparent",
            transform: "translateX(-2px)",
          }}
        />
      </div>
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
  isGenerating,
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
  const handleCopy = (content) => {
    navigator.clipboard.writeText(content);
    alert("Content berhasil disalin!");
  };

  const handleDownload = (content, filename) => {
    try {
      const doc = new jsPDF();
      doc.setFont("helvetica");
      doc.setFontSize(12);

      const pageWidth = doc.internal.pageSize.getWidth();
      const margin = 20;
      const maxLineWidth = pageWidth - margin * 2;
      const lines = doc.splitTextToSize(content, maxLineWidth);

      doc.setFontSize(16);
      doc.setFont("helvetica", "bold");
      doc.text(filename.toUpperCase(), margin, 20);

      doc.setFontSize(12);
      let yPosition = 45;
      const lineHeight = 7;

      lines.forEach((line) => {
        if (yPosition > doc.internal.pageSize.getHeight() - 20) {
          doc.addPage();
          yPosition = 20;
        }
        doc.text(line, margin, yPosition);
        yPosition += lineHeight;
      });

      doc.save(`${filename}_${Date.now()}.pdf`);
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("PDF generation failed.");
    }
  };

  const renderMessage = (message, index) => {
    if (message.type === "document-list") {
      return (
        <div key={index} className="flex items-end space-x-2 mb-4">
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 mb-1"
            style={{
              backgroundColor: "#ffffff",
              boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
            }}
          >
            <span style={{ fontSize: "22px" }}>🌶️</span>
          </div>

          <div className="max-w-2xl relative">
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
              <p
                className="text-sm leading-relaxed mb-4"
                style={{ fontWeight: 400 }}
              >
                {message.text}
              </p>
              <div className="space-y-3">
                {message.documents.map((doc) => (
                  <button
                    key={doc.id}
                    onClick={() =>
                      DocumentGenerator.generateDocument(
                        doc,
                        setMessages,
                        setCompletedDocuments,
                        setIsTyping,
                        setCurrentFlow
                      )
                    }
                    className="w-full text-left p-3 bg-gray-50 hover:bg-gray-100 rounded-lg border transition-colors"
                  >
                    <div className="flex items-center space-x-2 mb-2">
                      {doc.completed ? (
                        <CheckCircle className="w-4 h-4 text-green-500" />
                      ) : (
                        <Circle className="w-4 h-4 text-gray-400" />
                      )}
                      <div
                        className="font-medium text-gray-900"
                        style={{
                          fontFamily:
                            "'Product Sans', 'Google Sans Text', sans-serif",
                          fontWeight: 500,
                        }}
                      >
                        {doc.name}
                      </div>
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          doc.completed
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {doc.completed ? "Selesai" : "Belum Selesai"}
                      </span>
                    </div>
                    <div
                      className="text-xs text-gray-600 mt-1"
                      style={{
                        fontFamily: "'Google Sans Text', 'Roboto', sans-serif",
                        fontWeight: 400,
                      }}
                    >
                      {doc.description}
                    </div>
                    <div
                      className="text-xs text-blue-600 mt-1"
                      style={{
                        fontFamily: "'Google Sans Text', 'Roboto', sans-serif",
                        fontWeight: 500,
                      }}
                    >
                      <strong>Data yang diperlukan:</strong> {doc.fields.length}{" "}
                      field
                    </div>
                  </button>
                ))}
              </div>

              {/* WHATSAPP STYLE TAIL */}
              <div
                className="absolute bottom-0 left-0 w-0 h-0"
                style={{
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
              {message.timestamp}
            </div>
          </div>
        </div>
      );
    }

    if (message.type === "email-template-list") {
      return (
        <div key={index} className="flex items-end space-x-2 mb-4">
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 mb-1"
            style={{
              backgroundColor: "#ffffff",
              boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
            }}
          >
            <span style={{ fontSize: "22px" }}>🌶️</span>
          </div>

          <div className="max-w-2xl relative">
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
              <p
                className="text-sm leading-relaxed mb-4"
                style={{ fontWeight: 400 }}
              >
                {message.text}
              </p>
              <div className="space-y-3">
                {message.emailTemplates.map((template) => (
                  <button
                    key={template.id}
                    onClick={() =>
                      EmailGenerator.generateEmail(
                        template,
                        setMessages,
                        setIsTyping
                      )
                    }
                    className="w-full text-left p-3 bg-gray-50 hover:bg-gray-100 rounded-lg border transition-colors"
                  >
                    <div className="mb-2">
                      <div
                        className="font-medium text-gray-900"
                        style={{
                          fontFamily:
                            "'Product Sans', 'Google Sans Text', sans-serif",
                          fontWeight: 500,
                        }}
                      >
                        {template.name}
                      </div>
                    </div>
                    <div
                      className="text-xs text-gray-600 mt-1"
                      style={{
                        fontFamily: "'Google Sans Text', 'Roboto', sans-serif",
                        fontWeight: 400,
                      }}
                    >
                      {template.description}
                    </div>
                    <div
                      className="text-xs text-blue-600 mt-1"
                      style={{
                        fontFamily: "'Google Sans Text', 'Roboto', sans-serif",
                        fontWeight: 500,
                      }}
                    >
                      <strong>Data yang diperlukan:</strong>{" "}
                      {template.fields.length} field
                    </div>
                  </button>
                ))}
              </div>

              {/* WHATSAPP STYLE TAIL */}
              <div
                className="absolute bottom-0 left-0 w-0 h-0"
                style={{
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
              {message.timestamp}
            </div>
          </div>
        </div>
      );
    }

    if (message.type === "proposal-list") {
      return (
        <div key={index} className="flex items-end space-x-2 mb-4">
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 mb-1"
            style={{
              backgroundColor: "#ffffff",
              boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
            }}
          >
            <span style={{ fontSize: "22px" }}>🌶️</span>
          </div>

          <div className="max-w-2xl relative">
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
              <p
                className="text-sm leading-relaxed mb-4"
                style={{ fontWeight: 400 }}
              >
                {message.text}
              </p>
              <div className="space-y-3">
                {message.proposals.map((proposal) => (
                  <button
                    key={proposal.id}
                    onClick={() =>
                      ProposalGenerator.generateProposal(
                        proposal,
                        setMessages,
                        setIsTyping
                      )
                    }
                    className="w-full text-left p-3 bg-gray-50 hover:bg-gray-100 rounded-lg border transition-colors"
                  >
                    <div className="mb-2">
                      <div
                        className="font-medium text-gray-900"
                        style={{
                          fontFamily:
                            "'Product Sans', 'Google Sans Text', sans-serif",
                          fontWeight: 500,
                        }}
                      >
                        {proposal.name}
                      </div>
                    </div>
                    <div
                      className="text-xs text-gray-600 mt-1"
                      style={{
                        fontFamily: "'Google Sans Text', 'Roboto', sans-serif",
                        fontWeight: 400,
                      }}
                    >
                      {proposal.description}
                    </div>
                  </button>
                ))}
              </div>

              {/* WHATSAPP STYLE TAIL */}
              <div
                className="absolute bottom-0 left-0 w-0 h-0"
                style={{
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
              {message.timestamp}
            </div>
          </div>
        </div>
      );
    }

    if (message.type === "document-ready") {
      return (
        <div key={index} className="flex items-end space-x-2 mb-4">
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 mb-1"
            style={{
              backgroundColor: "#ffffff",
              boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
            }}
          >
            <span style={{ fontSize: "22px" }}>🌶️</span>
          </div>

          <div className="max-w-2xl relative">
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
              <p
                className="text-sm leading-relaxed mb-3"
                style={{ fontWeight: 400 }}
              >
                {message.text}
              </p>
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 mb-4">
                <div className="flex items-center justify-between mb-3">
                  <span
                    className="text-xs font-medium text-gray-700"
                    style={{
                      fontFamily:
                        "'Product Sans', 'Google Sans Text', sans-serif",
                      fontWeight: 500,
                    }}
                  >
                    Generated Document:
                  </span>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleCopy(message.content)}
                      className="text-xs text-gray-600 hover:text-gray-900 flex items-center space-x-1"
                    >
                      <Copy className="w-3 h-3" />
                      <span>Copy</span>
                    </button>
                    <button
                      onClick={() => {
                        handleDownload(
                          message.content,
                          message.documentName || "document"
                        );
                        setTimeout(() => {
                          DocumentGenerator.showDocumentList(
                            setMessages,
                            setCurrentFlow,
                            completedDocuments
                          );
                        }, 500);
                      }}
                      className="text-xs text-gray-600 hover:text-gray-900 flex items-center space-x-1"
                    >
                      <Download className="w-3 h-3" />
                      <span>Download PDF</span>
                    </button>
                  </div>
                </div>
                <div className="bg-gray-100 rounded p-3 max-h-64 overflow-y-auto">
                  <pre className="text-xs text-gray-700 whitespace-pre-wrap font-mono">
                    {message.content}
                  </pre>
                </div>
              </div>

              {/* WHATSAPP STYLE TAIL */}
              <div
                className="absolute bottom-0 left-0 w-0 h-0"
                style={{
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
              {message.timestamp}
            </div>
          </div>
        </div>
      );
    }

    if (message.type === "email-ready") {
      return (
        <div key={index} className="flex items-end space-x-2 mb-4">
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 mb-1"
            style={{
              backgroundColor: "#ffffff",
              boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
            }}
          >
            <span style={{ fontSize: "22px" }}>🌶️</span>
          </div>

          <div className="max-w-2xl relative">
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
              <p
                className="text-sm leading-relaxed mb-3"
                style={{ fontWeight: 400 }}
              >
                {message.text}
              </p>
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 mb-4">
                <div className="flex items-center justify-between mb-3">
                  <span
                    className="text-xs font-medium text-gray-700"
                    style={{
                      fontFamily:
                        "'Product Sans', 'Google Sans Text', sans-serif",
                      fontWeight: 500,
                    }}
                  >
                    Generated Email:
                  </span>
                  <button
                    onClick={() => {
                      handleCopy(message.content);
                      setTimeout(() => {
                        EmailGenerator.showEmailList(
                          setMessages,
                          setCurrentFlow
                        );
                      }, 500);
                    }}
                    className="text-xs text-gray-600 hover:text-gray-900 flex items-center space-x-1"
                  >
                    <Copy className="w-3 h-3" />
                    <span>Copy Email</span>
                  </button>
                </div>
                <div className="bg-gray-100 rounded p-3 max-h-64 overflow-y-auto">
                  <pre className="text-xs text-gray-700 whitespace-pre-wrap font-mono">
                    {message.content}
                  </pre>
                </div>
              </div>

              {/* WHATSAPP STYLE TAIL */}
              <div
                className="absolute bottom-0 left-0 w-0 h-0"
                style={{
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
              {message.timestamp}
            </div>
          </div>
        </div>
      );
    }

    if (message.type === "proposal-ready") {
      return (
        <div key={index} className="flex items-end space-x-2 mb-4">
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 mb-1"
            style={{
              backgroundColor: "#ffffff",
              boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
            }}
          >
            <span style={{ fontSize: "22px" }}>🌶️</span>
          </div>

          <div className="max-w-2xl relative">
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
              <p
                className="text-sm leading-relaxed mb-3"
                style={{ fontWeight: 400 }}
              >
                {message.text}
              </p>
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 mb-4">
                <div className="flex items-center justify-between mb-3">
                  <span
                    className="text-xs font-medium text-gray-700"
                    style={{
                      fontFamily:
                        "'Product Sans', 'Google Sans Text', sans-serif",
                      fontWeight: 500,
                    }}
                  >
                    Generated Proposal:
                  </span>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleCopy(message.content)}
                      className="text-xs text-gray-600 hover:text-gray-900 flex items-center space-x-1"
                    >
                      <Copy className="w-3 h-3" />
                      <span>Copy</span>
                    </button>
                    <button
                      onClick={() => {
                        handleDownload(
                          message.content,
                          message.proposalName || "proposal"
                        );
                        setTimeout(() => {
                          ProposalGenerator.showProposalList(
                            setMessages,
                            setCurrentFlow
                          );
                        }, 500);
                      }}
                      className="text-xs text-gray-600 hover:text-gray-900 flex items-center space-x-1"
                    >
                      <Download className="w-3 h-3" />
                      <span>Download PDF</span>
                    </button>
                  </div>
                </div>
                <div className="bg-gray-100 rounded p-3 max-h-64 overflow-y-auto">
                  <pre className="text-xs text-gray-700 whitespace-pre-wrap font-mono">
                    {message.content}
                  </pre>
                </div>
              </div>

              {/* WHATSAPP STYLE TAIL */}
              <div
                className="absolute bottom-0 left-0 w-0 h-0"
                style={{
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
              {message.timestamp}
            </div>
          </div>
        </div>
      );
    }

    if (message.type === "cost-estimation") {
      return (
        <div key={index} className="flex items-end space-x-2 mb-4">
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 mb-1"
            style={{
              backgroundColor: "#ffffff",
              boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
            }}
          >
            <span style={{ fontSize: "22px" }}>🌶️</span>
          </div>

          <div className="max-w-2xl relative">
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
              <p
                className="text-sm leading-relaxed mb-3"
                style={{ fontWeight: 400 }}
              >
                {message.text}
              </p>
              <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
                <div className="font-medium text-yellow-800 mb-3">
                  💰 Estimasi Biaya Ekspor
                </div>

                {/* Product Info */}
                <div className="bg-white rounded-lg p-3 mb-4">
                  <h4 className="font-medium text-gray-800 mb-2">
                    Informasi Produk:
                  </h4>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="font-medium">Produk:</div>
                    <div>{message.content.productInfo.name}</div>
                    <div className="font-medium">Berat:</div>
                    <div>{message.content.productInfo.weight}</div>
                    <div className="font-medium">Nilai FOB:</div>
                    <div>{message.content.productInfo.value}</div>
                    <div className="font-medium">Tujuan:</div>
                    <div>{message.content.productInfo.destination}</div>
                  </div>
                </div>

                {/* Cost Breakdown */}
                <div className="space-y-3 text-sm">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="font-medium">Biaya FOB:</div>
                    <div>Rp {message.content.costs.fob.toLocaleString()}</div>
                    <div className="font-medium">Freight (15%):</div>
                    <div>
                      Rp {message.content.costs.freight.toLocaleString()}
                    </div>
                    <div className="font-medium">Asuransi (0.5%):</div>
                    <div>
                      Rp {message.content.costs.insurance.toLocaleString()}
                    </div>
                    <div className="font-medium">Handling (2%):</div>
                    <div>
                      Rp {message.content.costs.handling.toLocaleString()}
                    </div>
                    <div className="font-medium">Dokumentasi:</div>
                    <div>
                      Rp {message.content.costs.documentation.toLocaleString()}
                    </div>
                    <div className="font-medium">Bea Cukai (1%):</div>
                    <div>
                      Rp {message.content.costs.customs.toLocaleString()}
                    </div>
                    <div className="font-medium">PPh (2.5%):</div>
                    <div>Rp {message.content.taxes.pph.toLocaleString()}</div>
                    <div className="font-medium">Pungutan (0.5%):</div>
                    <div>
                      Rp {message.content.taxes.pungutan.toLocaleString()}
                    </div>
                  </div>
                  <div className="border-t pt-2 font-bold">
                    <div className="flex justify-between">
                      <span>Total Estimasi:</span>
                      <span>Rp {message.content.total.toLocaleString()}</span>
                    </div>
                  </div>
                  <div className="text-xs text-yellow-700 mt-2">
                    *Estimasi berdasarkan peraturan Dirjen Bea dan Cukai. Biaya
                    aktual dapat bervariasi.
                  </div>
                </div>
              </div>

              {/* WHATSAPP STYLE TAIL */}
              <div
                className="absolute bottom-0 left-0 w-0 h-0"
                style={{
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
              {message.timestamp}
            </div>
          </div>
        </div>
      );
    }

    // Default message rendering - ENHANCED WHATSAPP STYLE
    return (
      <div key={index}>
        {/* DATE LABEL WHATSAPP STYLE - HANYA UNTUK PESAN PERTAMA */}
        {index === 0 && (
          <div className="flex justify-center mb-4">
            <div
              className="px-3 py-1 text-xs text-gray-600 rounded-full"
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.8)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(229, 231, 235, 0.5)",
                fontFamily:
                  "'Google Sans Text', 'Product Sans', 'Roboto', -apple-system, BlinkMacSystemFont, sans-serif",
                fontWeight: 400,
              }}
            >
              {formatDate(new Date())}
            </div>
          </div>
        )}

        <div className="flex items-end space-x-2 mb-4">
          {message.from === "bot" && (
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 mb-1"
              style={{
                backgroundColor: "#ffffff",
                boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
              }}
            >
              <span style={{ fontSize: "22px" }}>🌶️</span>
            </div>
          )}

          <div
            className={`max-w-xs lg:max-w-md relative ${
              message.from === "user" ? "ml-auto mr-12" : "mr-auto"
            }`}
          >
            {message.from === "user" && (
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mb-1 absolute -right-12 bottom-0"
                style={{
                  backgroundColor: "#2c2c2e",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.3)",
                }}
              >
                <span style={{ fontSize: "20px" }}>🐴</span>
              </div>
            )}

            <div
              className={`px-4 py-3 text-sm leading-5 relative ${
                message.from === "user" ? "text-white" : "text-black"
              }`}
              style={{
                backgroundColor:
                  message.from === "user" ? "#2c2c2e" : "#ffffff",
                borderRadius:
                  message.from === "user"
                    ? "18px 18px 4px 18px"
                    : "18px 18px 18px 4px",
                boxShadow:
                  message.from === "user"
                    ? "0 1px 3px rgba(0,0,0,0.2)"
                    : "0 1px 3px rgba(0,0,0,0.1)",
                fontFamily:
                  "'Google Sans Text', 'Product Sans', 'Roboto', -apple-system, BlinkMacSystemFont, sans-serif",
                fontSize: "16px",
                lineHeight: "1.4",
                fontWeight: 400,
              }}
            >
              <p
                className="text-sm leading-relaxed whitespace-pre-line"
                style={{ fontWeight: 400 }}
              >
                {message.formattedText ? message.formattedText : message.text}
                {isTypingResponse && message.from === "bot" && (
                  <span 
                    className="inline-block w-0.5 h-4 bg-gray-600 ml-1 animate-pulse"
                    style={{ animation: 'blink 1s infinite' }}
                  />
                )}
              </p>

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
      </div>
    );
  };

  // --- NEW: Responsive max width for chat area ---
  // We'll wrap the main chat area in a centered container with max width

  return (
    <div className="flex-1 flex justify-center items-stretch bg-gray-50 min-h-screen w-full max-w-full overflow-x-hidden">
      <div className="w-full flex flex-col flex-1 max-w-full overflow-x-hidden">
        <div className="bg-white rounded-2xl shadow-md border border-gray-200 flex flex-col flex-1 relative overflow-hidden w-full max-w-full">
          {/* Chat Messages */}
          <div
            ref={chatContainerRef}
            className="flex-1 flex flex-col overflow-y-auto space-y-4 p-6 w-full max-w-full overflow-x-hidden"
            style={{
              background: "#f2f2f7",
              overflowX: "hidden",
              borderRadius: '1.25rem 1.25rem 0 0',
              minHeight: 0,
              height: 'auto',
            }}
          >
            {messages.map((message, index) => renderMessage(message, index))}
            {isTyping && <TypingIndicator />}
            {isGenerating && (
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
                <div className="max-w-xs lg:max-w-lg relative">
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
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                      <span className="text-gray-600">Mencari jawaban...</span>
                    </div>
                    <div
                      className="absolute bottom-0 left-0 w-0 h-0"
                      style={{
                        borderRight: "8px solid #ffffff",
                        borderBottom: "8px solid transparent",
                        transform: "translateX(-2px)",
                      }}
                    />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggestions Bar - flush with border */}
          <div className="border-t border-gray-100 bg-gray-50 px-6 py-4 w-full max-w-full overflow-x-hidden" aria-label="Pertanyaan Umum">
            <div className="flex items-center space-x-2 mb-2">
              <Lightbulb className="w-4 h-4 text-orange-500" />
              <span
                className="text-sm font-medium text-gray-700"
                style={{
                  fontFamily: "'Product Sans', 'Google Sans Text', sans-serif",
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
              {(Array.isArray(generalSuggestions) && generalSuggestions.length > 0) ? (
                generalSuggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="flex-shrink-0 text-xs bg-white hover:bg-blue-50 hover:text-blue-700 border border-gray-200 hover:border-blue-300 rounded-full px-4 py-2 transition-all whitespace-nowrap shadow-sm text-gray-700"
                    style={{
                      fontFamily: "'Google Sans Text', 'Roboto', sans-serif",
                      fontWeight: 400,
                      minWidth: "fit-content",
                    }}
                  >
                    {suggestion}
                  </button>
                ))
              ) : (
                <span className="text-xs text-gray-500 px-2 py-1">Tidak ada pertanyaan umum.</span>
              )}
            </div>
          </div>

          {/* Input Section - flush with border */}
          <div className="border-t border-gray-100 px-6 py-5 bg-white w-full max-w-full overflow-x-hidden">
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
                className="flex-1 border border-gray-200 rounded-lg px-4 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm shadow-sm"
                style={{
                  fontFamily:
                    "'Google Sans Text', 'Product Sans', 'Roboto', -apple-system, BlinkMacSystemFont, sans-serif",
                  fontSize: "16px",
                  fontWeight: 400,
                }}
                disabled={isGenerating}
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || isGenerating}
                className="bg-gray-900 text-white px-7 py-4 rounded-lg hover:bg-gray-800 transition-colors flex items-center space-x-2 font-medium disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
                style={{
                  fontFamily: "'Product Sans', 'Google Sans Text', sans-serif",
                  fontWeight: 500,
                }}
              >
                <Send className="w-4 h-4" />
                <span className="hidden sm:inline">Kirim</span>
              </button>
            </div>
          </div>
        </div>
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
            0%, 50% { opacity: 1; }
            51%, 100% { opacity: 0; }
          }
        `}</style>
      </div>
    </div>
  );
};

export default ChatInterface;
