// src/pages/EmailProposalPage.js
import React, { useState } from "react";
import { Mail, FileText, Send, Download, Copy, Lightbulb } from "lucide-react";

export default function EmailProposalPage() {
  const [activeType, setActiveType] = useState("email");
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [input, setInput] = useState("");

  const emailTemplates = [
    {
      id: 1,
      title: "Inquiry Produk",
      description: "Email untuk menanyakan ketersediaan dan harga produk",
      category: "Inquiry"
    },
    {
      id: 2,
      title: "Penawaran Kerjasama",
      description: "Email penawaran kerjasama bisnis ekspor",
      category: "Partnership"
    },
    {
      id: 3,
      title: "Follow Up Order",
      description: "Email follow up setelah pengiriman proposal",
      category: "Follow Up"
    },
    {
      id: 4,
      title: "Konfirmasi Pesanan",
      description: "Email konfirmasi detail pesanan dan pengiriman",
      category: "Confirmation"
    }
  ];

  const proposalTemplates = [
    {
      id: 1,
      title: "Proposal Ekspor Produk",
      description: "Template lengkap proposal ekspor untuk buyer internasional",
      category: "Export Proposal"
    },
    {
      id: 2,
      title: "Partnership Agreement",
      description: "Proposal kerjasama distribusi produk di luar negeri",
      category: "Partnership"
    },
    {
      id: 3,
      title: "Quotation Request",
      description: "Template permintaan quotation yang profesional",
      category: "Quotation"
    },
    {
      id: 4,
      title: "Trade Agreement",
      description: "Proposal perjanjian perdagangan jangka panjang",
      category: "Agreement"
    }
  ];

  const suggestions = [
    "Buat email inquiry untuk produk kopi arabika ke buyer Jepang",
    "Generate proposal ekspor rempah-rempah ke Jerman",
    "Template email follow up setelah trade show",
    "Proposal kerjasama distribusi produk kerajinan"
  ];

  const currentTemplates = activeType === "email" ? emailTemplates : proposalTemplates;

  const handleGenerate = () => {
    if (!input.trim()) return;
    // Simulate generation process
    console.log("Generating:", input);
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">Email & Proposal Generator</h1>
        <p className="text-gray-600 max-w-2xl">
          Generate email profesional dan proposal bisnis yang menarik untuk ekspor. 
          Tingkatkan peluang sukses komunikasi bisnis internasional Anda dengan template yang telah terbukti efektif.
        </p>
      </div>

      {/* Type Selection */}
      <div className="mb-8">
        <div className="flex space-x-4">
          <button
            onClick={() => setActiveType("email")}
            className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-colors ${
              activeType === "email"
                ? "bg-gray-900 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            <Mail className="w-4 h-4" />
            <span>Email Templates</span>
          </button>
          <button
            onClick={() => setActiveType("proposal")}
            className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-colors ${
              activeType === "proposal"
                ? "bg-gray-900 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Proposal Templates</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Template Selection */}
        <div className="lg:col-span-1">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            {activeType === "email" ? "Email Templates" : "Proposal Templates"}
          </h2>
          <div className="space-y-3">
            {currentTemplates.map((template) => (
              <button
                key={template.id}
                onClick={() => setSelectedTemplate(template)}
                className={`w-full text-left p-4 rounded-lg border transition-all ${
                  selectedTemplate?.id === template.id
                    ? "border-gray-900 bg-gray-50"
                    : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900 text-sm">{template.title}</h3>
                    <p className="text-xs text-gray-600 mt-1">{template.description}</p>
                  </div>
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                    {template.category}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Generator Interface */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
            {/* Header */}
            <div className="border-b border-gray-100 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                AI Generator
              </h2>
              <p className="text-sm text-gray-600">
                Deskripsikan kebutuhan Anda dan AI akan generate {activeType === "email" ? "email" : "proposal"} yang profesional
              </p>
            </div>

            {/* Suggestions */}
            <div className="border-b border-gray-100 p-6">
              <div className="flex items-center space-x-2 mb-3">
                <Lightbulb className="w-4 h-4 text-yellow-500" />
                <span className="text-sm font-medium text-gray-700">Contoh Request:</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => setInput(suggestion)}
                    className="text-left text-sm text-gray-600 bg-gray-50 hover:bg-gray-100 p-3 rounded-lg transition-colors"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>

            {/* Input Section */}
            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Deskripsikan kebutuhan {activeType === "email" ? "email" : "proposal"} Anda:
                  </label>
                  <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={`Contoh: Saya ingin membuat ${activeType === "email" ? "email inquiry" : "proposal ekspor"} untuk...`}
                    rows={4}
                    className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent resize-none"
                  />
                </div>

                <button
                  onClick={handleGenerate}
                  className="w-full bg-gray-900 text-white py-3 px-4 rounded-lg hover:bg-gray-800 transition-colors flex items-center justify-center space-x-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Generate {activeType === "email" ? "Email" : "Proposal"}</span>
                </button>
              </div>
            </div>

            {/* Generated Content Preview */}
            {selectedTemplate && (
              <div className="border-t border-gray-100 p-6 bg-gray-50">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-medium text-gray-900">Preview: {selectedTemplate.title}</h3>
                  <div className="flex space-x-2">
                    <button className="flex items-center space-x-1 text-sm text-gray-600 hover:text-gray-900 transition-colors">
                      <Copy className="w-4 h-4" />
                      <span>Copy</span>
                    </button>
                    <button className="flex items-center space-x-1 text-sm text-gray-600 hover:text-gray-900 transition-colors">
                      <Download className="w-4 h-4" />
                      <span>Download</span>
                    </button>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <div className="text-sm text-gray-600 font-mono">
                    {activeType === "email" ? (
                      <div className="space-y-2">
                        <div><strong>Subject:</strong> [Generated subject will appear here]</div>
                        <div><strong>To:</strong> [Recipient email]</div>
                        <div><strong>Body:</strong></div>
                        <div className="pl-4 text-gray-500">
                          [Generated email content will appear here based on your input...]
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <div><strong>Title:</strong> [Generated proposal title]</div>
                        <div><strong>Executive Summary:</strong></div>
                        <div className="pl-4 text-gray-500">
                          [Generated proposal content will appear here based on your input...]
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Tips Section */}
      <div className="mt-12 bg-blue-50 rounded-xl p-6">
        <h3 className="font-semibold text-gray-900 mb-3">💡 Tips untuk {activeType === "email" ? "Email" : "Proposal"} yang Efektif</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
          {activeType === "email" ? (
            <>
              <div>• Gunakan subject line yang jelas dan menarik</div>
              <div>• Sertakan informasi kontak yang lengkap</div>
              <div>• Gunakan bahasa yang profesional namun ramah</div>
              <div>• Lampirkan dokumen pendukung jika diperlukan</div>
            </>
          ) : (
            <>
              <div>• Mulai dengan executive summary yang kuat</div>
              <div>• Sertakan data dan statistik yang relevan</div>
              <div>• Jelaskan value proposition dengan jelas</div>
              <div>• Lampirkan portfolio dan testimoni</div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
