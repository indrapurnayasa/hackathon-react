// src/pages/RegulationPage.js
import React, { useState } from "react";
import { Send, FileText, Calculator, Lightbulb, MessageCircle, Download, CheckCircle } from "lucide-react";

export default function RegulationPage() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [showWelcome, setShowWelcome] = useState(true);
  const [currentFlow, setCurrentFlow] = useState(null); // 'documents', 'form-filling', 'generating'
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [formData, setFormData] = useState({});
  const [isGenerating, setIsGenerating] = useState(false);

  // Data dokumen ekspor berdasarkan regulasi pemerintah
  const exportDocuments = [
    {
      id: 'peb',
      name: 'Pemberitahuan Ekspor Barang (PEB)',
      description: 'Dokumen wajib yang harus diajukan melalui sistem CEISA sebelum barang diekspor',
      required: true,
      fields: [
        { name: 'exporterName', label: 'Nama Eksportir', type: 'text', required: true },
        { name: 'exporterAddress', label: 'Alamat Eksportir', type: 'textarea', required: true },
        { name: 'exporterNPWP', label: 'NPWP Eksportir', type: 'text', required: true },
        { name: 'consigneeName', label: 'Nama Penerima (Consignee)', type: 'text', required: true },
        { name: 'consigneeAddress', label: 'Alamat Penerima', type: 'textarea', required: true },
        { name: 'destinationCountry', label: 'Negara Tujuan', type: 'select', options: ['Jepang', 'Jerman', 'Singapura', 'Malaysia'], required: true },
        { name: 'goodsDescription', label: 'Deskripsi Barang', type: 'textarea', required: true },
        { name: 'hsCode', label: 'Kode HS', type: 'text', required: true },
        { name: 'quantity', label: 'Jumlah Barang', type: 'number', required: true },
        { name: 'unit', label: 'Satuan', type: 'text', required: true },
        { name: 'fobValue', label: 'Nilai FOB (USD)', type: 'number', required: true }
      ]
    },
    {
      id: 'ska',
      name: 'Surat Keterangan Asal (SKA/COO)',
      description: 'Sertifikasi asal barang untuk memperoleh fasilitas tarif preferensial',
      required: false,
      fields: [
        { name: 'exporterName', label: 'Nama Eksportir', type: 'text', required: true },
        { name: 'exporterAddress', label: 'Alamat Eksportir', type: 'textarea', required: true },
        { name: 'consigneeName', label: 'Nama Penerima', type: 'text', required: true },
        { name: 'consigneeAddress', label: 'Alamat Penerima', type: 'textarea', required: true },
        { name: 'goodsDescription', label: 'Deskripsi Barang', type: 'textarea', required: true },
        { name: 'hsCode', label: 'Kode HS', type: 'text', required: true },
        { name: 'originCriteria', label: 'Kriteria Asal', type: 'select', options: ['Wholly Obtained', 'Regional Value Content', 'Change in Tariff Classification'], required: true },
        { name: 'invoiceNumber', label: 'Nomor Invoice', type: 'text', required: true },
        { name: 'invoiceDate', label: 'Tanggal Invoice', type: 'date', required: true }
      ]
    },
    {
      id: 'invoice',
      name: 'Commercial Invoice',
      description: 'Dokumen tagihan yang berisi detail transaksi ekspor',
      required: true,
      fields: [
        { name: 'invoiceNumber', label: 'Nomor Invoice', type: 'text', required: true },
        { name: 'invoiceDate', label: 'Tanggal Invoice', type: 'date', required: true },
        { name: 'sellerName', label: 'Nama Penjual', type: 'text', required: true },
        { name: 'sellerAddress', label: 'Alamat Penjual', type: 'textarea', required: true },
        { name: 'buyerName', label: 'Nama Pembeli', type: 'text', required: true },
        { name: 'buyerAddress', label: 'Alamat Pembeli', type: 'textarea', required: true },
        { name: 'goodsDescription', label: 'Deskripsi Barang', type: 'textarea', required: true },
        { name: 'quantity', label: 'Jumlah', type: 'number', required: true },
        { name: 'unitPrice', label: 'Harga Satuan (USD)', type: 'number', required: true },
        { name: 'totalValue', label: 'Total Nilai (USD)', type: 'number', required: true },
        { name: 'paymentTerms', label: 'Syarat Pembayaran', type: 'select', options: ['FOB', 'CIF', 'CFR', 'EXW'], required: true }
      ]
    },
    {
      id: 'packinglist',
      name: 'Packing List',
      description: 'Daftar detail kemasan barang yang akan diekspor',
      required: true,
      fields: [
        { name: 'packingListNumber', label: 'Nomor Packing List', type: 'text', required: true },
        { name: 'packingDate', label: 'Tanggal Packing', type: 'date', required: true },
        { name: 'shipperName', label: 'Nama Pengirim', type: 'text', required: true },
        { name: 'consigneeName', label: 'Nama Penerima', type: 'text', required: true },
        { name: 'goodsDescription', label: 'Deskripsi Barang', type: 'textarea', required: true },
        { name: 'numberOfPackages', label: 'Jumlah Kemasan', type: 'number', required: true },
        { name: 'packageType', label: 'Jenis Kemasan', type: 'select', options: ['Karton', 'Pallet', 'Container', 'Drum', 'Bag'], required: true },
        { name: 'grossWeight', label: 'Berat Kotor (Kg)', type: 'number', required: true },
        { name: 'netWeight', label: 'Berat Bersih (Kg)', type: 'number', required: true },
        { name: 'dimensions', label: 'Dimensi (PxLxT cm)', type: 'text', required: true }
      ]
    }
  ];

  const suggestions = [
    "Dokumen apa saja yang diperlukan untuk ekspor?",
    "Bagaimana cara menghitung biaya cukai ekspor?",
    "Saya ingin membuat dokumen PEB",
    "Template surat keterangan asal barang",
    "Estimasi pajak ekspor untuk produk elektronik",
    "Persyaratan ekspor makanan ke Jepang"
  ];

  const handleSend = () => {
    if (!input.trim()) return;
    
    const userMessage = { from: "user", text: input };
    setMessages(prev => [...prev, userMessage]);
    setShowWelcome(false);

    // Process user input and generate appropriate response
    processUserInput(input);
    setInput("");
  };

  const processUserInput = (userInput) => {
    const lowerInput = userInput.toLowerCase();
    
    setTimeout(() => {
      if (lowerInput.includes('dokumen') && (lowerInput.includes('ekspor') || lowerInput.includes('diperlukan'))) {
        // Show export documents list
        setCurrentFlow('documents');
        const botReply = {
          from: "bot",
          text: "Berdasarkan regulasi Kementerian Perdagangan, berikut adalah dokumen-dokumen yang diperlukan untuk ekspor:",
          type: "document-list"
        };
        setMessages(prev => [...prev, botReply]);
      } else if (lowerInput.includes('biaya cukai') || lowerInput.includes('estimasi')) {
        const botReply = {
          from: "bot",
          text: "Untuk menghitung estimasi biaya cukai dan pajak ekspor, saya memerlukan beberapa informasi dari Anda. Biaya yang umumnya dikenakan meliputi:\n\n• Bea Keluar (jika ada)\n• Pajak Ekspor\n• Biaya administrasi\n• Biaya verifikasi\n\nSilakan berikan detail barang yang akan diekspor untuk perhitungan yang lebih akurat."
        };
        setMessages(prev => [...prev, botReply]);
      } else {
        const botReply = {
          from: "bot",
          text: "Terima kasih atas pertanyaannya! Saya siap membantu dengan urusan regulasi ekspor. Apakah Anda ingin mengetahui dokumen yang diperlukan atau ada hal lain yang bisa saya bantu? 😊"
        };
        setMessages(prev => [...prev, botReply]);
      }
    }, 1000);
  };

  const handleDocumentSelect = (document) => {
    setSelectedDocument(document);
    setCurrentFlow('form-filling');
    setFormData({});
    
    const botReply = {
      from: "bot",
      text: `Baik! Saya akan membantu Anda mengisi ${document.name}. Mari kita isi data-data yang diperlukan satu per satu. Silakan lengkapi form di bawah ini:`,
      type: "form"
    };
    setMessages(prev => [...prev, botReply]);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setIsGenerating(true);
    setCurrentFlow('generating');

    const botReply = {
      from: "bot",
      text: `Terima kasih! Data untuk ${selectedDocument.name} sudah lengkap. Saya sedang memproses dan generate PDF dokumen untuk Anda. Mohon tunggu sebentar... ⏳`,
      type: "generating"
    };
    setMessages(prev => [...prev, botReply]);

    // Simulate PDF generation
    setTimeout(() => {
      setIsGenerating(false);
      const successReply = {
        from: "bot",
        text: `🎉 Dokumen ${selectedDocument.name} berhasil dibuat! Silakan download PDF di bawah ini:`,
        type: "download-ready"
      };
      setMessages(prev => [...prev, successReply]);
    }, 3000);
  };

  const handleDownloadPDF = () => {
    // Mock PDF download
    const element = document.createElement('a');
    const file = new Blob(['Mock PDF Content for ' + selectedDocument.name], {type: 'application/pdf'});
    element.href = URL.createObjectURL(file);
    element.download = `${selectedDocument.name.replace(/\s+/g, '_')}_${Date.now()}.pdf`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);

    // Reset flow
    setTimeout(() => {
      setCurrentFlow(null);
      setSelectedDocument(null);
      setFormData({});
      const botReply = {
        from: "bot",
        text: "Dokumen berhasil didownload! 🎉 Ada dokumen lain yang ingin Anda buat atau pertanyaan lain yang bisa saya bantu?"
      };
      setMessages(prev => [...prev, botReply]);
    }, 1000);
  };

  const handleSuggestionClick = (suggestion) => {
    setInput(suggestion);
    setShowWelcome(false);
    processUserInput(suggestion);
  };

  const renderMessage = (message, index) => {
    if (message.type === 'document-list') {
      return (
        <div key={index} className="flex justify-start mb-4">
          <div className="max-w-2xl bg-gray-100 text-gray-900 px-4 py-3 rounded-2xl">
            <p className="text-sm leading-relaxed mb-4">{message.text}</p>
            <div className="space-y-3">
              {exportDocuments.map((doc) => (
                <div key={doc.id} className="bg-white rounded-xl p-4 border border-gray-200 hover:border-blue-300 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h4 className="font-semibold text-gray-900 text-sm">{doc.name}</h4>
                        {doc.required && (
                          <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full font-medium">
                            Wajib
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-gray-600 mb-3">{doc.description}</p>
                      <button
                        onClick={() => handleDocumentSelect(doc)}
                        className="bg-blue-600 text-white text-xs px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                      >
                        Buat Dokumen Ini
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }

    if (message.type === 'form') {
      return (
        <div key={index} className="flex justify-start mb-4">
          <div className="max-w-2xl bg-gray-100 text-gray-900 px-4 py-3 rounded-2xl">
            <p className="text-sm leading-relaxed mb-4">{message.text}</p>
          </div>
        </div>
      );
    }

    if (message.type === 'generating') {
      return (
        <div key={index} className="flex justify-start mb-4">
          <div className="max-w-xs lg:max-w-md bg-gray-100 text-gray-900 px-4 py-3 rounded-2xl">
            <p className="text-sm leading-relaxed">{message.text}</p>
            {isGenerating && (
              <div className="mt-3 flex items-center space-x-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                <span className="text-xs text-gray-600">Generating PDF...</span>
              </div>
            )}
          </div>
        </div>
      );
    }

    if (message.type === 'download-ready') {
      return (
        <div key={index} className="flex justify-start mb-4">
          <div className="max-w-xs lg:max-w-md bg-green-100 text-green-900 px-4 py-3 rounded-2xl">
            <p className="text-sm leading-relaxed mb-3">{message.text}</p>
            <button
              onClick={handleDownloadPDF}
              className="bg-green-600 text-white text-sm px-4 py-2 rounded-lg hover:bg-green-700 transition-colors font-medium flex items-center space-x-2"
            >
              <Download className="w-4 h-4" />
              <span>Download PDF</span>
            </button>
          </div>
        </div>
      );
    }

    return (
      <div key={index} className={`flex mb-4 ${message.from === "user" ? "justify-end" : "justify-start"}`}>
        <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
          message.from === "user" ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
        }`}>
          <p className="text-sm leading-relaxed whitespace-pre-line">{message.text}</p>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-black text-gray-900 mb-4">Regulation Assistant</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto font-medium">
            AI assistant yang siap membantu urusan regulasi ekspor Anda
          </p>
        </div>

        {/* Chat Container */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
          {/* Chat Messages Area */}
          <div className="h-96 overflow-y-auto p-6">
            {/* Welcome Message */}
            {showWelcome && (
              <div className="flex flex-col items-center justify-center h-full text-center space-y-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                  <MessageCircle className="w-8 h-8 text-blue-600" />
                </div>
                
                <div className="max-w-md">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    Halo! Saya di sini untuk membantu 👋
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Tanyakan apa saja tentang regulasi ekspor, dokumen yang diperlukan, 
                    atau estimasi biaya. Saya akan bantu buatkan template dan perhitungan 
                    yang Anda butuhkan dengan mudah dan cepat.
                  </p>
                </div>

                {/* Quick Action Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-lg">
                  <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                        <FileText className="w-4 h-4 text-blue-600" />
                      </div>
                      <h4 className="font-semibold text-gray-900 text-sm">Template Dokumen</h4>
                    </div>
                    <p className="text-xs text-gray-600">
                      Generate template dokumen ekspor sesuai regulasi terbaru
                    </p>
                  </div>

                  <div className="bg-green-50 rounded-xl p-4 border border-green-200">
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                        <Calculator className="w-4 h-4 text-green-600" />
                      </div>
                      <h4 className="font-semibold text-gray-900 text-sm">Estimasi Biaya</h4>
                    </div>
                    <p className="text-xs text-gray-600">
                      Hitung estimasi cukai dan pajak ekspor secara otomatis
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Chat Messages */}
            {messages.map((message, index) => renderMessage(message, index))}
          </div>

          {/* Form Section - Only show when filling form */}
          {currentFlow === 'form-filling' && selectedDocument && (
            <div className="border-t border-gray-100 p-6 bg-gray-50">
              <h4 className="font-semibold text-gray-900 mb-4">Form {selectedDocument.name}</h4>
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-64 overflow-y-auto">
                  {selectedDocument.fields.map((field) => (
                    <div key={field.name}>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {field.label} {field.required && <span className="text-red-500">*</span>}
                      </label>
                      {field.type === 'textarea' ? (
                        <textarea
                          value={formData[field.name] || ''}
                          onChange={(e) => setFormData({...formData, [field.name]: e.target.value})}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                          rows={3}
                          required={field.required}
                        />
                      ) : field.type === 'select' ? (
                        <select
                          value={formData[field.name] || ''}
                          onChange={(e) => setFormData({...formData, [field.name]: e.target.value})}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required={field.required}
                        >
                          <option value="">Pilih {field.label}</option>
                          {field.options?.map((option) => (
                            <option key={option} value={option}>{option}</option>
                          ))}
                        </select>
                      ) : (
                        <input
                          type={field.type}
                          value={formData[field.name] || ''}
                          onChange={(e) => setFormData({...formData, [field.name]: e.target.value})}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required={field.required}
                        />
                      )}
                    </div>
                  ))}
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                >
                  Generate PDF Dokumen
                </button>
              </form>
            </div>
          )}

          {/* Suggestions Section */}
          {(showWelcome || messages.length === 0) && (
            <div className="border-t border-gray-100 p-6 bg-gray-50">
              <div className="flex items-center space-x-2 mb-4">
                <Lightbulb className="w-4 h-4 text-orange-500" />
                <span className="text-sm font-semibold text-gray-700">Contoh pertanyaan yang bisa Anda tanyakan:</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="text-left text-sm text-gray-600 bg-white hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200 p-4 rounded-xl transition-all border border-gray-200 font-medium"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input Section */}
          <div className="border-t border-gray-100 p-6 bg-white">
            <div className="flex space-x-4">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSend()}
                placeholder="Ketik pertanyaan Anda di sini..."
                className="flex-1 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-medium"
                disabled={currentFlow === 'form-filling'}
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || currentFlow === 'form-filling'}
                className="bg-gray-900 text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition-colors flex items-center space-x-2 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-4 h-4" />
                <span>Kirim</span>
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-3 text-center">
              💡 Tip: Semakin detail pertanyaan Anda, semakin akurat jawaban yang saya berikan
            </p>
          </div>
        </div>

        {/* Bottom Info */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            Powered by AI • Selalu update dengan regulasi terbaru • Gratis untuk digunakan
          </p>
        </div>
      </div>
    </div>
  );
}
