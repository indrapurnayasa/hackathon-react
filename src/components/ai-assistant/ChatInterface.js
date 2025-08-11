// src/components/ai-assistant/ChatInterface.js
import { useState } from "react";
import { Send, Lightbulb, CheckCircle } from "lucide-react";
import { useLocation } from "react-router-dom";
// jsPDF is dynamically imported where needed

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

// Fungsi untuk format response dari Backend
const formatResponse = (text) => {
  if (!text) return "";

  // Replace /n dengan line break
  let formatted = text.replace(/\/n/g, "\n");

  // Replace **text** dengan <strong>text</strong>
  formatted = formatted.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");

  // Replace *text* dengan <em>text</em>
  formatted = formatted.replace(/\*(.*?)\*/g, "<em>$1</em>");

  // Replace __text__ dengan <u>text</u>
  formatted = formatted.replace(/__(.*?)__/g, "<u>$1</u>");

  // Replace ~~text~~ dengan <del>text</del>
  formatted = formatted.replace(/~~(.*?)~~/g, "<del>$1</del>");

  // Split by line breaks and wrap in paragraphs
  const lines = formatted.split("\n");
  return lines
    .map((line, index) =>
      line.trim() ? `<p key="${index}">${line}</p>` : "<br/>"
    )
    .join("");
};

const generatePDFfromIframe = async (iframe, documentType) => {
  try {
    const jsPDF = (await import("jspdf")).default;
    const html2canvas = (await import("html2canvas")).default;

    // Wait for iframe to load
    await new Promise((resolve) => {
      if (
        iframe.contentDocument &&
        iframe.contentDocument.readyState === "complete"
      ) {
        resolve();
      } else {
        iframe.onload = resolve;
      }
    });

    const doc = iframe.contentDocument;
    const body = doc.body;

    // Use the same wrapper as fitIframeContent
    let wrapper = body.querySelector("#pdf-center-wrapper");
    if (!wrapper) {
      // If wrapper doesn't exist, create it with same structure as fitIframeContent
      wrapper = doc.createElement("div");
      wrapper.id = "pdf-center-wrapper";
      wrapper.style.cssText = `
        width: 794px !important;
        min-width: 794px !important;
        max-width: 794px !important;
        background: white !important;
        box-sizing: border-box !important;
        padding-left: 16px !important;
        padding-right: 16px !important;
        padding-bottom: 32px !important;
      `;

      // Move all body content to wrapper
      while (body.firstChild) {
        wrapper.appendChild(body.firstChild);
      }
      body.appendChild(wrapper);
    }

    // Reset scaling for PDF generation (remove any transform from preview)
    const originalTransform = wrapper.style.transform;
    const originalHeight = wrapper.style.height;
    wrapper.style.transform = "none";
    wrapper.style.height = "auto";

    const canvas = await html2canvas(wrapper, {
      scale: 2,
      useCORS: true,
      backgroundColor: "#ffffff",
      width: 794,
      height: wrapper.scrollHeight + 32,
      windowWidth: 794,
      windowHeight: wrapper.scrollHeight + 32,
    });

    // Restore original styles
    wrapper.style.transform = originalTransform;
    wrapper.style.height = originalHeight;

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "pt", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const imgWidth = 794;
    const imgHeight = (794 * canvas.height) / canvas.width;
    const x = (pdfWidth - imgWidth) / 2;

    pdf.addImage(imgData, "PNG", x, 0, imgWidth, imgHeight);
    return pdf;
  } catch (error) {
    console.error("Error generating PDF:", error);
    throw error;
  }
};

// Fungsi untuk inject CSS agar dokumen fit di iframe preview
const fitIframeContent = (iframe, maxHeight = 400) => {
  if (!iframe) return;
  try {
    const doc = iframe.contentDocument || iframe.contentWindow.document;
    const style = doc.createElement("style");
    style.innerHTML = `
      html, body {
        margin: 0 !important;
        padding: 0 !important;
        width: 794px !important;
        min-width: 794px !important;
        max-width: 794px !important;
        height: auto !important;
        overflow-x: hidden !important;
        overflow-y: auto !important;
        background: white !important;
        display: block !important;
        box-sizing: border-box !important;
        font-family: 'Times New Roman', Arial, sans-serif !important;
        font-size: 14px !important;
        line-height: 1.4 !important;
      }
      *, *::before, *::after {
        box-sizing: border-box !important;
        max-width: 100% !important;
        word-break: break-word !important;
      }
      #pdf-center-wrapper {
        width: 794px !important;
        min-width: 794px !important;
        max-width: 794px !important;
        background: white !important;
        box-sizing: border-box !important;
        padding-left: 16px !important;
        padding-right: 16px !important;
        padding-bottom: 32px !important;
      }
      table {
        border-collapse: collapse !important;
        width: 100% !important;
        table-layout: auto !important;
      }
      th, td {
        padding: 6px 10px !important;
        border: 1.5px solid #222 !important;
        vertical-align: top !important;
        background: white !important;
      }
      h1, h2, h3, h4, h5, h6 {
        margin: 0 0 8px 0 !important;
        font-weight: bold !important;
      }
      div, p, span, tr {
        margin: 0 !important;
        padding: 0 !important;
        background: transparent !important;
      }
      tr {
        border: none !important;
      }
      .pdf-field-row {
        margin-bottom: 8px !important;
        padding-bottom: 4px !important;
      }
    `;
    doc.head.appendChild(style);
    // Center content horizontally
    doc.body.style.display = "flex";
    doc.body.style.justifyContent = "center";
    doc.body.style.alignItems = "flex-start";
    // Wrap content in a container with fixed width (A4)
    let wrapper = doc.getElementById("pdf-center-wrapper");
    if (!wrapper) {
      wrapper = doc.createElement("div");
      wrapper.id = "pdf-center-wrapper";
      wrapper.style.width = "794px";
      wrapper.style.minWidth = "794px";
      wrapper.style.maxWidth = "794px";
      wrapper.style.background = "white";
      wrapper.style.boxSizing = "border-box";
      wrapper.style.paddingLeft = "16px";
      wrapper.style.paddingRight = "16px";
      wrapper.style.paddingBottom = "32px";
      // Move all children into wrapper
      while (doc.body.firstChild) {
        wrapper.appendChild(doc.body.firstChild);
      }
      doc.body.appendChild(wrapper);
    } else {
      wrapper.style.paddingBottom = "32px";
    }
    // --- SCALING FOR PREVIEW ONLY ---
    const previewWidth = iframe.offsetWidth || 400;
    const previewHeight = maxHeight;
    const contentWidth = wrapper.scrollWidth;
    const contentHeight = wrapper.scrollHeight;
    const scaleX = previewWidth / contentWidth;
    const scaleY = previewHeight / contentHeight;
    const scale = Math.min(scaleX, scaleY, 1);
    wrapper.style.transform = `scale(${scale})`;
    wrapper.style.transformOrigin = "top left";
    wrapper.style.height = scale < 1 ? `${100 / scale}%` : "auto";
  } catch (e) {}
};

// WhatsApp-style PDF Preview Card
const PDFCardPreview = ({ fileName, onPreview, onDownload }) => (
  <div
    className="flex flex-row items-center bg-white rounded-xl shadow-lg border border-gray-200 p-4 w-full max-w-sm mx-auto"
    style={{ minHeight: 80, marginBottom: 16, marginTop: 8 }}
  >
    {/* Logo PDF di kiri */}
    <div className="flex-shrink-0 mr-4">
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <rect width="40" height="40" rx="8" fill="#F44336" />
        <text
          x="20"
          y="25"
          textAnchor="middle"
          fontSize="14"
          fontWeight="bold"
          fill="#fff"
        >
          PDF
        </text>
      </svg>
    </div>

    {/* Deskripsi di kanan */}
    <div className="flex-1 min-w-0">
      <div
        className="font-semibold text-sm text-gray-900 truncate mb-1"
        title={fileName}
      >
        {fileName}
      </div>
      <div className="flex items-center justify-between">
        <div className="text-xs text-gray-500">PDF Document</div>
        <div className="flex flex-row items-center gap-2">
          <button
            onClick={onPreview}
            className="text-xs bg-gray-900 hover:bg-gray-800 text-white px-3 py-1 rounded-full transition-colors font-medium"
          >
            Preview
          </button>
          <button
            onClick={onDownload}
            className="text-xs bg-gray-900 hover:bg-gray-800 text-white px-3 py-1 rounded-full transition-colors font-medium"
          >
            Download
          </button>
        </div>
      </div>
    </div>
  </div>
);

// Typing Animation Component
const TypingIndicator = () => (
  <div className="flex items-end space-x-3 mb-4">
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
              className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
              style={{ animationDelay: "0ms" }}
            ></div>
            <div
              className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
              style={{ animationDelay: "200ms" }}
            ></div>
            <div
              className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
              style={{ animationDelay: "400ms" }}
            ></div>
          </div>
          <span className="text-xs text-gray-500">AI sedang mengetik...</span>
        </div>
      </div>
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

// Generate filename with template name and timestamp
const generateFileName = (templateName) => {
  const now = new Date();
  const day = String(now.getDate()).padStart(2, "0");
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const year = now.getFullYear();
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");

  const timestamp = `${day}${month}${year} ${hours}.${minutes}`;
  return `${templateName} - ${timestamp}.pdf`;
};

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
  const [showDocModal, setShowDocModal] = useState(false);
  const [modalDocHtml, setModalDocHtml] = useState("");
  const [modalDocIndex, setModalDocIndex] = useState(null);

  const renderMessage = (message, index) => {
    const isUser = message.from === "user";

    return (
      <div
        key={index}
        className={`flex items-end space-x-3 mb-4 ${
          isUser ? "justify-end" : "justify-start"
        }`}
      >
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
            <span style={{ fontSize: "22px", color: "#ffffff" }}>🐴</span>
          ) : (
            <span style={{ fontSize: "22px" }}>🌶️</span>
          )}
        </div>

        <div
          className={`relative ${
            isUser
              ? "order-1 max-w-md lg:max-w-lg"
              : "order-2 max-w-xs lg:max-w-md"
          }`}
        >
          <div
            className={`px-4 py-3 text-sm leading-5 relative ${
              message.from === "user" ? "text-white" : "text-black"
            }`}
            style={{
              backgroundColor: message.from === "user" ? "#2c2c2e" : "#ffffff",
              borderRadius:
                message.from === "user"
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
                __html:
                  message.from === "user"
                    ? formatMessageText(message.text)
                    : formatResponse(message.text),
              }}
            />

            {/* HTML safe preview for document templates */}
            {message.documentTemplate === true && message.htmlTemplate && (
              <div className="mt-3 mb-2 w-full max-w-sm">
                <div className="rounded-lg border border-gray-200 overflow-hidden bg-gray-50">
                  <iframe
                    id={`doc-iframe-${index}`}
                    srcDoc={message.htmlTemplate}
                    title="Document Preview"
                    sandbox="allow-same-origin"
                    style={{ width: '100%', height: 220, border: 'none', background: 'white' }}
                    onLoad={(e) => fitIframeContent(e.target, 220)}
                  />
                </div>
              </div>
            )}

            {/* WhatsApp-style PDF Preview Card - only when API explicitly set documentTemplate=true */}
            {message.documentTemplate === true && message.htmlTemplate && (
              <PDFCardPreview
                fileName={generateFileName(message.documentType || "Dokumen")}
                onPreview={() => {
                  setModalDocHtml(message.htmlTemplate);
                  setModalDocIndex(index);
                  setShowDocModal(true);
                }}
                onDownload={async () => {
                  const iframe =
                    document.getElementById(`doc-iframe-modal-${index}`) ||
                    document.getElementById(`doc-iframe-${index}`);
                  let pdf;
                  if (iframe) {
                    pdf = await generatePDFfromIframe(
                      iframe,
                      message.documentType
                    );
                  } else {
                    // fallback: create temp iframe
                    const tempIframe = document.createElement("iframe");
                    tempIframe.style.display = "none";
                    document.body.appendChild(tempIframe);
                    tempIframe.srcdoc = message.htmlTemplate;
                    tempIframe.onload = async () => {
                      pdf = await generatePDFfromIframe(
                        tempIframe,
                        message.documentType
                      );
                      pdf.save(
                        generateFileName(message.documentType || "document")
                      );
                      document.body.removeChild(tempIframe);
                    };
                    return;
                  }
                  pdf.save(
                    generateFileName(message.documentType || "document")
                  );
                }}
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

          {/* Modal untuk preview dokumen (iframe) */}
          {showDocModal && modalDocIndex === index && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white rounded-xl shadow-lg p-6 max-w-2xl w-full relative">
                <button
                  className="absolute top-4 right-4 text-xs bg-gray-900 hover:bg-gray-800 text-white px-3 py-1 rounded-full transition-colors font-medium"
                  onClick={() => setShowDocModal(false)}
                  aria-label="Tutup Preview"
                >
                  Close
                </button>
                <div className="w-full h-[70vh] overflow-auto rounded-lg border border-gray-200 bg-gray-50">
                  <iframe
                    id={`doc-iframe-modal-${index}`}
                    srcDoc={modalDocHtml}
                    title="Document Preview"
                    sandbox="allow-same-origin"
                    style={{
                      width: "100%",
                      height: "100%",
                      border: "none",
                      background: "white",
                      borderRadius: "8px",
                    }}
                    onLoad={(e) => fitIframeContent(e.target, 600)}
                  />
                </div>
              </div>
            </div>
          )}
          {/* End Modal */}
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
    <div className="flex-1 bg-gray-50 h-full w-full max-w-full overflow-hidden">
      <div className="bg-white border-l border-gray-200 flex flex-col h-full w-full rounded-none max-w-full overflow-hidden shadow-sm mb-6">
        {/* Chat Messages */}
        <div
          ref={chatContainerRef}
          className="flex-1 flex flex-col overflow-y-auto space-y-4 px-8 py-6 w-full overflow-x-hidden max-w-full min-w-0"
          style={{
            background: "#f2f2f7",
            overflowX: "hidden",
            borderRadius: "0",
            minHeight: 0,
            height: "auto",
          }}
        >
          {/* Date Header */}
          <div className="flex justify-center mt-2 mb-2">
            <span className="bg-white px-3 py-1 rounded-full shadow-sm border border-gray-100 mx-auto inline-block text-xs font-medium text-gray-500">
              {formatDate(new Date())}
            </span>
          </div>
          {messages.map((message, index) => renderMessage(message, index))}
          {isTyping && <TypingIndicator />}

          <div ref={messagesEndRef} />
        </div>

        {/* Only render suggestions and input box on AI Assistant page */}
        {isAIAssistantPage && (
          <>
            {/* Suggestions Bar */}
            <div
              className="border-t border-gray-100 bg-white px-8 py-4 w-full overflow-x-hidden max-w-full min-w-0"
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
                        fontFamily: "'Google Sans Text', 'Roboto', sans-serif",
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
            <div className="border-t border-gray-100 px-8 py-5 bg-white w-full overflow-x-hidden max-w-full min-w-0">
              <div className="flex space-x-3 min-w-0">
                <textarea
                  value={input}
                  onChange={(e) => {
                    setInput(e.target.value);
                    // auto resize
                    e.target.style.height = 'auto';
                    e.target.style.height = `${e.target.scrollHeight}px`;
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSend();
                    }
                  }}
                  placeholder="Tulis pesan... (Shift+Enter untuk baris baru)"
                  rows={1}
                  className="flex-1 border border-gray-200 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm shadow-sm text-black min-w-0 resize-none"
                  style={{
                    fontFamily:
                      "'Google Sans Text', 'Product Sans', 'Roboto', -apple-system, BlinkMacSystemFont, sans-serif",
                    fontSize: "16px",
                    fontWeight: 400,
                    maxHeight: '180px',
                    overflowY: 'auto',
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
      <style>{`
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
          font-family: "Times New Roman", serif;
          font-size: 12px;
          line-height: 1.4;
          color: #333;
          contain: layout style paint;
          isolation: isolate;
          max-width: 100%;
          overflow: hidden;
          word-wrap: break-word;
          background: transparent !important;
          margin: 0 !important;
          padding: 0 !important;
          border: none !important;
          outline: none !important;
        }

        .document-preview h1,
        .document-preview h2,
        .document-preview h3 {
          font-weight: bold;
          margin-bottom: 8px;
          max-width: 100%;
          overflow: hidden;
          background: transparent !important;
          margin-left: 0 !important;
          margin-right: 0 !important;
          padding-left: 0 !important;
          padding-right: 0 !important;
        }

        .document-preview table {
          border-collapse: collapse;
          width: 100%;
          margin: 8px 0;
          max-width: 100%;
          table-layout: fixed;
          background: transparent !important;
        }

        .document-preview table,
        .document-preview th,
        .document-preview td {
          border: 1px solid #ddd;
          padding: 4px 8px;
          max-width: 100%;
          overflow: hidden;
          word-wrap: break-word;
          background: transparent !important;
          margin: 0 !important;
        }

        .document-preview th {
          background-color: #f8f9fa;
          font-weight: bold;
        }

        /* Prevent document preview from affecting parent layout */
        .document-preview * {
          max-width: 100% !important;
          box-sizing: border-box !important;
          background: transparent !important;
          margin-left: 0 !important;
          margin-right: 0 !important;
          padding-left: 0 !important;
          padding-right: 0 !important;
          position: relative !important;
          float: none !important;
          clear: none !important;
        }

        /* Reset any problematic styles from HTML template */
        .document-preview body,
        .document-preview html {
          margin: 0 !important;
          padding: 0 !important;
          background: transparent !important;
          color: inherit !important;
          width: 100% !important;
          max-width: 100% !important;
          overflow: hidden !important;
          position: relative !important;
        }

       /* Additional reset for any remaining problematic elements */
       .document-preview div,
       .document-preview p,
       .document-preview span {
         background: transparent !important;
         margin-left: 0 !important;
         margin-right: 0 !important;
         padding-left: 0 !important;
         padding-right: 0 !important;
         max-width: 100% !important;
         overflow: hidden !important;
         word-wrap: break-word !important;
       }
      `}</style>
    </div>
  );
};

export default ChatInterface;
