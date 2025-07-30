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

    <style jsx>{`
      @keyframes typing-dot {
        0%,
        60%,
        100% {
          opacity: 0.3;
          transform: scale(0.8);
        }
        30% {
          opacity: 1;
          transform: scale(1);
        }
      }
    `}</style>
  </div>
);

const SuccessPopup = ({ message, onClose }) => (
  <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
    <div className="bg-white rounded-2xl p-6 shadow-xl max-w-sm w-full mx-4 relative animate-fade-in-up">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
      >
        <X className="w-5 h-5" />
      </button>
      <div className="flex items-center justify-center mb-4">
        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
          <CheckCircle className="w-6 h-6 text-green-600" />
        </div>
      </div>
      <h3
        className="text-center text-lg font-medium text-gray-900 mb-2"
        style={{
          fontFamily: "'Product Sans', 'Google Sans Text', sans-serif",
          fontWeight: 500,
        }}
      >
        Berhasil!
      </h3>
      <p
        className="text-center text-gray-600"
        style={{
          fontFamily: "'Google Sans Text', 'Roboto', sans-serif",
          fontWeight: 400,
        }}
      >
        {message}
      </p>
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
            if (
              strongEl &&
              (strongEl.textContent.includes("PEB") ||
                strongEl.textContent.includes("Invoice") ||
                strongEl.textContent.includes("No:"))
            ) {
              doc.setFont("helvetica", "bold");
              doc.setFontSize(10);
              doc.text(strongEl.textContent.trim(), margin, yPosition);
              yPosition += 6;
              if (spanEl) {
                doc.setFont("helvetica", "normal");
                doc.setFontSize(9);
                doc.text(spanEl.textContent.trim(), margin, yPosition);
                yPosition += 10;
              }
            }
          }
        });

        // Process tables exactly as they appear in frontend
        const sections = tempDiv.querySelectorAll("div");
        sections.forEach((section) => {
          const h4 = section.querySelector("h4");
          const table = section.querySelector("table");

          if (h4 && table) {
            // Check if we need a new page
            if (yPosition > doc.internal.pageSize.getHeight() - 80) {
              doc.addPage();
              yPosition = 20;
            }

            // Add section title
            doc.setFont("helvetica", "bold");
            doc.setFontSize(11);
            doc.text(h4.textContent.trim(), margin, yPosition);
            yPosition += 8;

            // Process table with frontend structure
            yPosition = renderFrontendTable(doc, table, margin, yPosition);
            yPosition += 10;
          }
        });
      } else {
        // Fallback for plain text
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
      }

      doc.save(`${filename.replace(/[^a-z0-9]/gi, "_")}_${Date.now()}.pdf`);
      setSuccessMessage("PDF berhasil didownload!");
      setShowSuccessPopup(true);
    } catch (error) {
      console.error("Error generating PDF:", error);
      setSuccessMessage("Gagal membuat PDF. Silakan coba lagi.");
      setShowSuccessPopup(true);
    }
  };

  // Function to render table exactly as frontend shows
  const renderFrontendTable = (doc, table, startX, startY) => {
    const pageWidth = doc.internal.pageSize.getWidth() - startX * 2;
    let yPosition = startY;
    const rowHeight = 10;

    // Check table structure
    const thead = table.querySelector("thead");
    const tbody = table.querySelector("tbody");

    if (thead && tbody) {
      // Structured table with proper headers
      const headerCells = thead.querySelectorAll("th");
      if (headerCells.length > 0) {
        const colWidth = pageWidth / headerCells.length;

        // Draw header row with light background like frontend
        doc.setFillColor(248, 249, 250); // #f8f9fa
        doc.rect(startX, yPosition, pageWidth, rowHeight, "F");

        doc.setFont("helvetica", "bold");
        doc.setFontSize(9);
        doc.setTextColor(73, 80, 87); // #495057

        headerCells.forEach((cell, index) => {
          const x = startX + index * colWidth;
          const text = cell.textContent.trim();
          doc.text(
            text.length > 20 ? text.substring(0, 20) + "..." : text,
            x + 2,
            yPosition + 6
          );

          // Draw border
          doc.setDrawColor(222, 226, 230); // #dee2e6
          doc.setLineWidth(0.1);
          doc.rect(x, yPosition, colWidth, rowHeight);
        });

        yPosition += rowHeight;

        // Draw data rows
        const dataRows = tbody.querySelectorAll("tr");
        doc.setFont("helvetica", "normal");
        doc.setFontSize(9);
        doc.setTextColor(0, 0, 0);

        dataRows.forEach((row, rowIndex) => {
          const cells = row.querySelectorAll("td");

          // Alternate row background like frontend
          if (rowIndex % 2 === 1) {
            doc.setFillColor(248, 249, 250);
            doc.rect(startX, yPosition, pageWidth, rowHeight, "F");
          }

          cells.forEach((cell, cellIndex) => {
            const x = startX + cellIndex * colWidth;
            let text = cell.textContent.trim();

            if (text.length > 25) {
              text = text.substring(0, 25) + "...";
            }

            // Right align numbers and currency like frontend
            if (
              text.includes("$") ||
              text.includes("kg") ||
              text.includes("USD") ||
              !isNaN(parseFloat(text.replace(/[^\d.-]/g, "")))
            ) {
              doc.text(text, x + colWidth - 2, yPosition + 6, {
                align: "right",
              });
            } else {
              doc.text(text, x + 2, yPosition + 6);
            }

            // Draw border
            doc.setDrawColor(222, 226, 230);
            doc.setLineWidth(0.1);
            doc.rect(x, yPosition, colWidth, rowHeight);
          });

          yPosition += rowHeight;
        });
      }
    } else {
      // Simple table structure - process all rows
      const allRows = table.querySelectorAll("tr");
      if (allRows.length > 0) {
        const firstRow = allRows[0];
        const cellCount = firstRow.querySelectorAll("th, td").length;
        const colWidth = pageWidth / cellCount;

        allRows.forEach((row, rowIndex) => {
          const cells = row.querySelectorAll("th, td");
          const isHeaderRow = cells[0] && cells[0].tagName === "TH";

          if (isHeaderRow) {
            // Header styling - light gray like frontend
            doc.setFillColor(248, 249, 250);
            doc.rect(startX, yPosition, pageWidth, rowHeight, "F");
            doc.setFont("helvetica", "bold");
            doc.setFontSize(9);
            doc.setTextColor(73, 80, 87);
          } else {
            // Data row
            if (rowIndex % 2 === 1) {
              doc.setFillColor(248, 249, 250);
              doc.rect(startX, yPosition, pageWidth, rowHeight, "F");
            }
            doc.setFont("helvetica", "normal");
            doc.setFontSize(9);
            doc.setTextColor(0, 0, 0);
          }

          cells.forEach((cell, cellIndex) => {
            const x = startX + cellIndex * colWidth;
            let text = cell.textContent.trim();

            if (text.length > 25) {
              text = text.substring(0, 25) + "...";
            }

            doc.text(text, x + 2, yPosition + 6);

            // Draw cell border
            doc.setDrawColor(222, 226, 230);
            doc.setLineWidth(0.1);
            doc.rect(x, yPosition, colWidth, rowHeight);
          });

          yPosition += rowHeight;
        });
      }
    }

    return yPosition;
  };

  const renderMessage = (message, index) => {
    if (
      message.type === "document-list" ||
      message.type === "enhanced-document-list"
    ) {
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
                    onClick={() => {
                      // First add user message showing the selected document with actual data
                      const getDocumentData = (doc) => {
                        const dummyData =
                          DocumentGenerator.generateDummyData(doc);

                        switch (doc.id) {
                          case "peb":
                            return `dengan data: Eksportir ${dummyData["Nama Eksportir"]}, Penerima ${dummyData["Nama Penerima"]}, Barang ${dummyData["Deskripsi Barang"]}, Kode HS ${dummyData["Kode HS"]}`;
                          case "invoice":
                            return `dengan data: Invoice ${dummyData["Nomor Invoice"]}, Tanggal ${dummyData["Tanggal Invoice"]}, Penjual ${dummyData["Nama Penjual"]}, Pembeli ${dummyData["Nama Pembeli"]}, Nilai ${dummyData["Total Nilai"]}`;
                          case "ska":
                            return `dengan data: Eksportir ${dummyData["Nama Eksportir"]}, Penerima ${dummyData["Nama Penerima"]}, Barang ${dummyData["Deskripsi Barang"]}, Kode HS ${dummyData["Kode HS"]}, Kriteria Asal ${dummyData["Kriteria Asal"]}`;
                          case "packinglist":
                            return `dengan data: Packing List ${dummyData["Nomor Packing List"]}, Pengirim ${dummyData["Nama Pengirim"]}, Penerima ${dummyData["Nama Penerima"]}, Kemasan ${dummyData["Jumlah Kemasan"]} ${dummyData["Jenis Kemasan"]}, Berat ${dummyData["Berat Bersih"]}`;
                          case "bl":
                            return `dengan data: B/L ${dummyData["Nomor B/L"]}, Kapal ${dummyData["Nama Kapal"]}, Muat ${dummyData["Pelabuhan Muat"]}, Bongkar ${dummyData["Pelabuhan Bongkar"]}, Container ${dummyData["Jumlah Container"]}`;
                          case "insurance":
                            return `dengan data: Polis ${dummyData["Nomor Polis"]}, Tertanggung ${dummyData["Nama Tertanggung"]}, Barang ${dummyData["Jenis Barang"]}, Nilai ${dummyData["Nilai Pertanggungan"]}, Rute ${dummyData["Rute Pengangkutan"]}`;
                          default:
                            return "dengan data lengkap sesuai standar ekspor";
                        }
                      };

                      const userMessage = {
                        from: "user",
                        text: `Saya ingin membuat ${doc.name} ${getDocumentData(
                          doc
                        )}`,
                        timestamp: new Date().toLocaleTimeString("id-ID", {
                          hour: "2-digit",
                          minute: "2-digit",
                        }),
                      };
                      setMessages((prev) => [...prev, userMessage]);

                      // Then trigger document generation with typing animation
                      setTimeout(() => {
                        DocumentGenerator.generateDocument(
                          doc.id,
                          setMessages,
                          setCompletedDocuments,
                          setIsTyping
                        );
                      }, 500); // Small delay to show user message first
                    }}
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

    if (message.type === "typing") {
      return <TypingIndicator key={index} />;
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
              <div
                className="text-sm leading-relaxed mb-3"
                style={{ fontWeight: 400 }}
                dangerouslySetInnerHTML={{
                  __html: formatMessageText(message.text),
                }}
              />

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
                      }}
                      className="text-xs text-gray-600 hover:text-gray-900 flex items-center space-x-1"
                    >
                      <Download className="w-3 h-3" />
                      <span>Download PDF</span>
                    </button>
                  </div>
                </div>

                <div className="bg-white rounded p-3 max-h-96 overflow-y-auto border">
                  {message.content && message.content.includes("<") ? (
                    <div
                      className="text-sm text-gray-800"
                      dangerouslySetInnerHTML={{
                        __html: message.content,
                      }}
                      style={{
                        fontFamily: "'Google Sans Text', 'Roboto', sans-serif",
                        lineHeight: "1.4",
                      }}
                    />
                  ) : (
                    <pre className="text-xs text-gray-700 whitespace-pre-wrap font-mono">
                      {message.content}
                    </pre>
                  )}
                </div>
              </div>

              {/* Next Button */}
              <div className="flex justify-end mt-4">
                <button
                  onClick={() => {
                    DocumentGenerator.showDocumentList(
                      setMessages,
                      setCurrentFlow,
                      completedDocuments
                    );
                  }}
                  className="text-sm text-white bg-gray-900 hover:bg-gray-800 px-4 py-2 rounded-full transition-colors flex items-center space-x-1"
                >
                  <span>Next Document</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
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

    if (
      message.type === "email-template-list" ||
      message.type === "enhanced-email-list"
    ) {
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

    if (
      message.type === "proposal-list" ||
      message.type === "enhanced-proposal-list"
    ) {
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

    if (
      message.type === "enhanced-email-ready" ||
      message.type === "email-ready"
    ) {
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

    if (
      message.type === "enhanced-proposal-ready" ||
      message.type === "proposal-ready"
    ) {
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

    if (
      message.type === "cost-estimation" ||
      message.type === "enhanced-cost-estimation"
    ) {
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
              <div
                className="text-sm leading-relaxed mb-3"
                style={{ fontWeight: 400 }}
                dangerouslySetInnerHTML={{
                  __html: formatMessageText(message.text),
                }}
              />
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
                    <div className="font-medium">Kategori:</div>
                    <div>{message.content.productInfo.category}</div>
                    <div className="font-medium">Kode HS:</div>
                    <div>{message.content.productInfo.hsCode}</div>
                    <div className="font-medium">Berat:</div>
                    <div>{message.content.productInfo.weight}</div>
                    <div className="font-medium">Nilai FOB:</div>
                    <div>{message.content.productInfo.value}</div>
                    <div className="font-medium">Tujuan:</div>
                    <div>{message.content.productInfo.destination}</div>
                    <div className="font-medium">Region:</div>
                    <div>{message.content.productInfo.region}</div>
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

                {/* Additional Info */}
                <div className="mt-4 pt-4 border-t border-yellow-200">
                  <h4 className="font-medium text-yellow-800 mb-2">
                    Informasi Tambahan:
                  </h4>
                  <div className="text-sm space-y-2">
                    <div>
                      <strong>Estimasi Waktu Kirim:</strong>{" "}
                      {message.content.additionalInfo.shippingTime}
                    </div>
                    <div>
                      <strong>Dokumen Diperlukan:</strong>{" "}
                      {message.content.additionalInfo.documentation.join(", ")}
                    </div>
                    <div>
                      <strong>Payment Terms:</strong>{" "}
                      {message.content.additionalInfo.paymentTerms}
                    </div>
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
              <div
                className="text-sm leading-relaxed whitespace-pre-line"
                style={{ fontWeight: 400 }}
                dangerouslySetInnerHTML={{
                  __html: formatMessageText(
                    message.formattedText || message.text
                  ),
                }}
              />
              {isTypingResponse && message.from === "bot" && (
                <span
                  className="inline-block w-0.5 h-4 bg-gray-600 ml-1 animate-pulse"
                  style={{ animation: "blink 1s infinite" }}
                />
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
      </div>
    );
  };

  // --- NEW: Responsive max width for chat area ---
  // We'll wrap the main chat area in a centered container with max width

  return (
    <div className="flex-1 flex justify-center items-stretch bg-gray-50 h-full w-full max-w-full overflow-hidden mt-24 mb-6">
      <div className="w-full flex flex-col flex-1 max-w-full overflow-x-hidden">
        <div className="bg-white rounded-2xl shadow-md border border-gray-200 flex flex-col flex-1 relative overflow-hidden w-full max-w-full">
          {/* Chat Messages */}
          <div
            ref={chatContainerRef}
            className="flex-1 flex flex-col overflow-y-auto space-y-4 p-6 w-full max-w-full overflow-x-hidden"
            style={{
              background: "#f2f2f7",
              overflowX: "hidden",
              borderRadius: "1.25rem 1.25rem 0 0",
              minHeight: 0,
              height: "auto",
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

          {/* Only render suggestions and input box on AI Assistant page */}
          {isAIAssistantPage && (
            <>
              {/* Suggestions Bar */}
              <div
                className="border-t border-gray-100 bg-gray-50 px-6 py-4 w-full max-w-full overflow-x-hidden"
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
                    className="flex-1 border border-gray-200 rounded-full px-6 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm shadow-sm text-black"
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
        `}</style>
      </div>

      {/* Success Popup */}
      {showSuccessPopup && (
        <SuccessPopup
          message={successMessage}
          onClose={() => setShowSuccessPopup(false)}
        />
      )}

      {/* Add fade-in animation styles */}
      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default ChatInterface;
