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
  Copy
} from "lucide-react";
import { jsPDF } from 'jspdf';

export default function AIAssistantPage() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      from: "bot",
      text: "Halo! Saya AI Assistant untuk ekspor. Saya bisa membantu Anda dengan berbagai kebutuhan ekspor. Apa yang bisa saya bantu hari ini? 😊",
      timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [currentFlow, setCurrentFlow] = useState(null);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [documentData, setDocumentData] = useState({});
  const [currentFieldIndex, setCurrentFieldIndex] = useState(0);
  const [completedDocuments, setCompletedDocuments] = useState(new Set());
  const [lastGeneratedDocument, setLastGeneratedDocument] = useState(null);
  
  // Email states
  const [selectedEmailTemplate, setSelectedEmailTemplate] = useState(null);
  const [emailData, setEmailData] = useState({});
  
  // Ref for auto scroll
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);

  // Auto scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Reset scroll to top when component mounts
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = 0;
    }
  }, []);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Typing Animation Component
  const TypingIndicator = () => (
    <div className="flex items-end space-x-2 mb-4">
      <div 
        className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 mb-1"
        style={{ 
          backgroundColor: '#ffffff',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
        }}
      >
        <span style={{ fontSize: '22px' }}>🌶️</span>
      </div>

      <div className="max-w-xs lg:max-w-md relative">
        <div
          className="px-4 py-3 text-sm leading-5 text-black relative"
          style={{
            backgroundColor: '#ffffff',
            borderRadius: '20px 20px 20px 4px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            fontFamily: "'Google Sans Text', 'Product Sans', 'Roboto', -apple-system, BlinkMacSystemFont, sans-serif",
            fontSize: '16px',
            lineHeight: '1.4',
            fontWeight: 400
          }}
        >
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
          </div>

          {/* Perfect bubble tail */}
          <div
            className="absolute"
            style={{
              bottom: '0',
              left: '-8px',
              width: '0',
              height: '0',
              borderTop: '12px solid #ffffff',
              borderRight: '12px solid transparent',
              borderTopLeftRadius: '8px'
            }}
          />
        </div>
      </div>
    </div>
  );

  // Data dokumen ekspor
  const exportDocuments = [
    {
      id: 'peb',
      name: 'Pemberitahuan Ekspor Barang (PEB)',
      description: 'Dokumen wajib untuk memberitahukan barang yang akan diekspor melalui sistem CEISA',
      fields: [
        'Nama Eksportir', 'Alamat Eksportir', 'NPWP Eksportir', 'Nama Penerima',
        'Alamat Penerima', 'Negara Tujuan', 'Deskripsi Barang', 'Kode HS'
      ]
    },
    {
      id: 'invoice',
      name: 'Commercial Invoice',
      description: 'Dokumen tagihan yang berisi detail transaksi perdagangan ekspor',
      fields: [
        'Nomor Invoice', 'Tanggal Invoice', 'Nama Penjual', 'Alamat Penjual',
        'Nama Pembeli', 'Alamat Pembeli', 'Deskripsi Barang', 'Total Nilai'
      ]
    }
  ];

  // Data template email ekspor profesional
  const exportEmailTemplates = [
    {
      id: 'product-inquiry',
      name: 'Product Inquiry Email',
      description: 'Email untuk menanyakan produk kepada supplier/eksportir',
      category: 'Inquiry',
      fields: [
        'Nama Perusahaan Anda', 'Nama Anda', 'Jabatan Anda', 'Email Perusahaan',
        'Nama Perusahaan Penerima', 'Nama Penerima', 'Produk yang Diminati'
      ]
    },
    {
      id: 'business-introduction',
      name: 'Business Introduction Email',
      description: 'Email perkenalan perusahaan untuk membangun hubungan bisnis',
      category: 'Introduction',
      fields: [
        'Nama Perusahaan Anda', 'Tahun Berdiri', 'Jenis Bisnis', 'Produk Utama',
        'Nama Anda', 'Jabatan Anda', 'Website Perusahaan'
      ]
    }
  ];

  // Feature suggestions
  const featureSuggestions = [
    {
      id: 'document',
      title: "Generate Dokumen",
      icon: <FileText className="w-5 h-5" />,
      description: "Buat dokumen ekspor resmi",
      prompt: "Saya ingin membuat dokumen ekspor"
    },
    {
      id: 'email',
      title: "Generate Email",
      icon: <Mail className="w-5 h-5" />,
      description: "Buat email bisnis profesional",
      prompt: "Saya ingin membuat email ekspor"
    },
    {
      id: 'proposal',
      title: "Generate Proposal",
      icon: <MessageCircle className="w-5 h-5" />,
      description: "Buat proposal bisnis menarik",
      prompt: "Saya ingin membuat proposal ekspor"
    },
    {
      id: 'cost',
      title: "Estimasi Biaya",
      icon: <Calculator className="w-5 h-5" />,
      description: "Hitung estimasi biaya ekspor",
      prompt: "Berapa estimasi biaya ekspor ke Jepang?"
    }
  ];

  // General suggestions
  const generalSuggestions = [
    "Apa saja dokumen yang diperlukan untuk ekspor?",
    "Bagaimana cara menghitung biaya ekspor?",
    "Negara mana yang mudah untuk ekspor pemula?"
  ];

  // Get document status list with completion status
  const getDocumentStatusList = () => {
    return exportDocuments.map(doc => ({
      ...doc,
      completed: completedDocuments.has(doc.id)
    }));
  };

  const handleSuggestionClick = (suggestion) => {
    setInput(suggestion);
  };

  const handleFeatureSelect = (feature) => {
    setInput(feature.prompt);
  };

  const handleDocumentSelect = (document) => {
    setSelectedDocument(document);
    setCurrentFlow('document-form');
    setDocumentData({});
    setCurrentFieldIndex(0);
    
    const botMessage = {
      from: "bot",
      text: `Baik! Saya akan membantu Anda membuat ${document.name}. \n\nSaya akan menanyakan data yang diperlukan satu per satu. Mari kita mulai:\n\n**${document.fields[0]}**: Silakan masukkan ${document.fields[0].toLowerCase()} Anda.`,
      timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
      type: "asking-field"
    };
    setMessages(prev => [...prev, botMessage]);
  };

  const handleEmailTemplateSelect = (template) => {
    setSelectedEmailTemplate(template);
    setCurrentFlow('email-form');
    setEmailData({});
    setCurrentFieldIndex(0);
    
    const botMessage = {
      from: "bot",
      text: `Baik! Saya akan membantu Anda membuat ${template.name}. \n\nSaya akan menanyakan data yang diperlukan satu per satu untuk mengisi template email profesional ini. Mari kita mulai:\n\n**${template.fields[0]}**: Silakan masukkan ${template.fields[0].toLowerCase()}.`,
      timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
      type: "asking-email-field"
    };
    setMessages(prev => [...prev, botMessage]);
  };

  // Handle send message with typing animation
  const handleSend = () => {
    if (!input.trim()) return;
    
    const userMessage = { 
      from: "user", 
      text: input,
      timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prev => [...prev, userMessage]);
    
    // Show typing indicator
    setIsTyping(true);
    
    // Hide typing indicator and show response after 1 second
    setTimeout(() => {
      setIsTyping(false);
      processUserInput(input);
    }, 1000);
    
    setInput("");
  };

  const handleFormSubmit = () => {
    if (!input.trim()) return;

    const userMessage = {
      from: "user",
      text: input,
      timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prev => [...prev, userMessage]);

    if (currentFlow === 'document-form') {
      const newData = { ...documentData };
      newData[selectedDocument.fields[currentFieldIndex]] = input;
      setDocumentData(newData);

      if (currentFieldIndex < selectedDocument.fields.length - 1) {
        const nextIndex = currentFieldIndex + 1;
        setCurrentFieldIndex(nextIndex);
        
        setIsTyping(true);
        setTimeout(() => {
          setIsTyping(false);
          const botMessage = {
            from: "bot",
            text: `✅ ${selectedDocument.fields[currentFieldIndex]}: ${input}\n\n**${selectedDocument.fields[nextIndex]}**: Silakan masukkan ${selectedDocument.fields[nextIndex].toLowerCase()} Anda.`,
            timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
            type: "asking-field"
          };
          setMessages(prev => [...prev, botMessage]);
        }, 1000);
      } else {
        setIsTyping(true);
        setTimeout(() => {
          setIsTyping(false);
          const confirmMessage = {
            from: "bot",
            text: `✅ ${selectedDocument.fields[currentFieldIndex]}: ${input}\n\n🎉 Semua data telah terkumpul! Saya akan generate ${selectedDocument.name} untuk Anda. Mohon tunggu sebentar...`,
            timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
            type: "generating"
          };
          setMessages(prev => [...prev, confirmMessage]);
          
          generateDocument(newData);
        }, 1000);
      }
    } else if (currentFlow === 'email-form') {
      const newData = { ...emailData };
      newData[selectedEmailTemplate.fields[currentFieldIndex]] = input;
      setEmailData(newData);

      if (currentFieldIndex < selectedEmailTemplate.fields.length - 1) {
        const nextIndex = currentFieldIndex + 1;
        setCurrentFieldIndex(nextIndex);
        
        setIsTyping(true);
        setTimeout(() => {
          setIsTyping(false);
          const botMessage = {
            from: "bot",
            text: `✅ ${selectedEmailTemplate.fields[currentFieldIndex]}: ${input}\n\n**${selectedEmailTemplate.fields[nextIndex]}**: Silakan masukkan ${selectedEmailTemplate.fields[nextIndex].toLowerCase()}.`,
            timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
            type: "asking-email-field"
          };
          setMessages(prev => [...prev, botMessage]);
        }, 1000);
      } else {
        setIsTyping(true);
        setTimeout(() => {
          setIsTyping(false);
          const confirmMessage = {
            from: "bot",
            text: `✅ ${selectedEmailTemplate.fields[currentFieldIndex]}: ${input}\n\n🎉 Semua data telah terkumpul! Saya akan generate ${selectedEmailTemplate.name} untuk Anda. Mohon tunggu sebentar...`,
            timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
            type: "generating"
          };
          setMessages(prev => [...prev, confirmMessage]);
          
          generateEmailContent(newData);
        }, 1000);
      }
    }

    setInput("");
  };

  const processUserInput = (userInput) => {
    const input = userInput.toLowerCase();
    
    // Deteksi permintaan dokumen
    if (input.includes('dokumen') && (input.includes('ekspor') || input.includes('buat') || input.includes('generate'))) {
      setCurrentFlow('document-list');
      const response = {
        text: "Berikut adalah daftar dokumen ekspor yang dapat saya buatkan untuk Anda:",
        type: "document-list",
        documents: getDocumentStatusList()
      };
      const botMessage = {
        from: "bot",
        text: response.text,
        timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
        type: response.type,
        documents: response.documents
      };
      setMessages(prev => [...prev, botMessage]);
      return;
    }

    // Deteksi permintaan email
    if (input.includes('email') && (input.includes('ekspor') || input.includes('buat') || input.includes('generate') || input.includes('penawaran'))) {
      setCurrentFlow('email-list');
      const response = {
        text: "Berikut adalah template email profesional untuk ekspor yang dapat saya buatkan:",
        type: "email-template-list",
        emailTemplates: exportEmailTemplates
      };
      const botMessage = {
        from: "bot",
        text: response.text,
        timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
        type: response.type,
        emailTemplates: response.emailTemplates
      };
      setMessages(prev => [...prev, botMessage]);
      return;
    }

    // Deteksi permintaan proposal
    if (input.includes('proposal')) {
      const botMessage = {
        from: "bot",
        text: "📋 Proposal bisnis berhasil dibuat! Berikut adalah proposal yang sesuai dengan kebutuhan Anda:\n\nBUSINESS PROPOSAL\n\nEXECUTIVE SUMMARY\nWe are pleased to present this proposal for export business collaboration.\n\nCOMPANY OVERVIEW\n[Your Company] is an established Indonesian exporter with proven track record.\n\nPROPOSED COLLABORATION\n- Product Category: [Product Category]\n- Target Markets: [Target Markets]\n- Partnership Model: [Partnership Model]\n\nBest regards,\n[Your Company]",
        timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botMessage]);
      return;
    }

    // Deteksi estimasi biaya
    if (input.includes('biaya') || input.includes('estimasi') || input.includes('cost')) {
      const botMessage = {
        from: "bot",
        text: "💰 Estimasi biaya ekspor telah dihitung! Berikut adalah rincian biaya yang perlu Anda siapkan:\n\nBIAYA DOKUMEN:\n• PEB: Rp 500,000\n• Commercial Invoice: Rp 200,000\n\nBIAYA LOGISTIK:\n• Freight: Rp 2,500,000\n• Insurance: Rp 400,000\n\nTOTAL ESTIMASI: Rp 3,600,000",
        timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botMessage]);
      return;
    }
    
    // Response umum
    const botMessage = {
      from: "bot",
      text: "Terima kasih atas pertanyaannya! Saya siap membantu dengan berbagai kebutuhan ekspor Anda. Silakan pilih salah satu fitur di samping atau tanyakan hal spesifik yang ingin Anda ketahui tentang ekspor.",
      timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prev => [...prev, botMessage]);
  };

  const generateDocument = (data) => {
    setIsGenerating(true);
    
    setTimeout(() => {
      setIsGenerating(false);
      const content = createDocumentContent(selectedDocument, data);
      
      setCompletedDocuments(prev => new Set([...prev, selectedDocument.id]));
      setLastGeneratedDocument(selectedDocument);
      
      const successMessage = {
        from: "bot",
        text: `🎉 ${selectedDocument.name} berhasil dibuat! Berikut adalah dokumen yang telah saya generate berdasarkan data Anda:`,
        timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
        type: "document-ready",
        content: content,
        documentId: selectedDocument.id
      };
      setMessages(prev => [...prev, successMessage]);
      
      setCurrentFlow(null);
      setSelectedDocument(null);
      setDocumentData({});
      setCurrentFieldIndex(0);
    }, 3000);
  };

  const generateEmailContent = (data) => {
    setIsGenerating(true);
    
    setTimeout(() => {
      setIsGenerating(false);
      const content = generateEmailFromTemplate(selectedEmailTemplate, data);
      
      const successMessage = {
        from: "bot",
        text: `🎉 ${selectedEmailTemplate.name} berhasil dibuat! Berikut adalah email profesional yang telah saya generate berdasarkan data Anda:`,
        timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
        type: "email-ready",
        content: content
      };
      setMessages(prev => [...prev, successMessage]);
      
      setCurrentFlow(null);
      setSelectedEmailTemplate(null);
      setEmailData({});
      setCurrentFieldIndex(0);
    }, 3000);
  };

  const generateEmailFromTemplate = (template, data) => {
    switch (template.id) {
      case 'product-inquiry':
        return `Subject: Product Inquiry - ${data['Produk yang Diminati'] || '[Product Name]'}

Dear ${data['Nama Penerima'] || '[Recipient Name]'},

I hope this email finds you well. My name is ${data['Nama Anda'] || '[Your Name]'}, ${data['Jabatan Anda'] || '[Your Position]'} at ${data['Nama Perusahaan Anda'] || '[Your Company]'}.

We are interested in your ${data['Produk yang Diminati'] || '[Product Name]'} and would like to inquire about product specifications, pricing, and delivery terms.

We look forward to establishing a mutually beneficial business relationship.

Best regards,
${data['Nama Anda'] || '[Your Name]'}
${data['Nama Perusahaan Anda'] || '[Your Company]'}
${data['Email Perusahaan'] || '[Your Email]'}`;

      case 'business-introduction':
        return `Subject: Business Introduction - ${data['Nama Perusahaan Anda'] || '[Your Company]'}

Dear Sir/Madam,

I am ${data['Nama Anda'] || '[Your Name]'}, ${data['Jabatan Anda'] || '[Your Position]'} at ${data['Nama Perusahaan Anda'] || '[Your Company]'}.

Established in ${data['Tahun Berdiri'] || '[Year]'}, we are a leading ${data['Jenis Bisnis'] || '[Business Type]'} company specializing in ${data['Produk Utama'] || '[Main Products]'}.

Please visit our website at ${data['Website Perusahaan'] || '[Website]'} for more information.

Looking forward to your positive response.

Best regards,
${data['Nama Anda'] || '[Your Name]'}
${data['Nama Perusahaan Anda'] || '[Your Company]'}`;

      default:
        return "Professional email template generated based on your requirements.";
    }
  };

  const createDocumentContent = (document, data) => {
    switch (document.id) {
      case 'peb':
        return `PEMBERITAHUAN EKSPOR BARANG (PEB)

Nomor: PEB-${Date.now()}
Tanggal: ${new Date().toLocaleDateString()}

EKSPORTIR:
Nama: ${data['Nama Eksportir'] || '[Nama Eksportir]'}
Alamat: ${data['Alamat Eksportir'] || '[Alamat Eksportir]'}
NPWP: ${data['NPWP Eksportir'] || '[NPWP Eksportir]'}

PENERIMA (CONSIGNEE):
Nama: ${data['Nama Penerima'] || '[Nama Penerima]'}
Alamat: ${data['Alamat Penerima'] || '[Alamat Penerima]'}
Negara: ${data['Negara Tujuan'] || '[Negara Tujuan]'}

DETAIL BARANG:
Deskripsi: ${data['Deskripsi Barang'] || '[Deskripsi Barang]'}
Kode HS: ${data['Kode HS'] || '[Kode HS]'}

Dokumen ini telah disesuaikan dengan regulasi terbaru.`;

      case 'invoice':
        return `COMMERCIAL INVOICE

Invoice No: ${data['Nomor Invoice'] || '[Nomor Invoice]'}
Date: ${data['Tanggal Invoice'] || '[Tanggal Invoice]'}

SELLER:
${data['Nama Penjual'] || '[Nama Penjual]'}
${data['Alamat Penjual'] || '[Alamat Penjual]'}

BUYER:
${data['Nama Pembeli'] || '[Nama Pembeli]'}
${data['Alamat Pembeli'] || '[Alamat Pembeli]'}

DESCRIPTION OF GOODS:
${data['Deskripsi Barang'] || '[Deskripsi Barang]'}
Total Amount: USD ${data['Total Nilai'] || '[Total Nilai]'}

This invoice is true and correct.`;

      default:
        return "Dokumen berhasil dibuat berdasarkan data yang Anda berikan.";
    }
  };

  const handleCopy = (content) => {
    navigator.clipboard.writeText(content);
    alert('Content berhasil disalin!');
  };

  const handleDownload = (content, filename) => {
    try {
      const doc = new jsPDF();
      doc.setFont("helvetica");
      doc.setFontSize(12);
      
      const pageWidth = doc.internal.pageSize.getWidth();
      const margin = 20;
      const maxLineWidth = pageWidth - (margin * 2);
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
      console.error('Error generating PDF:', error);
      alert('PDF generation failed.');
    }
  };

  const renderMessage = (message, index) => {
    if (message.type === 'document-list') {
      return (
        <div key={index} className="flex items-end space-x-2 mb-4">
          <div 
            className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 mb-1"
            style={{ 
              backgroundColor: '#ffffff',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
            }}
          >
            <span style={{ fontSize: '22px' }}>🌶️</span>
          </div>

          <div className="max-w-2xl relative">
            <div
              className="px-4 py-3 text-sm leading-5 text-black relative"
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '20px 20px 20px 4px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                fontFamily: "'Google Sans Text', 'Product Sans', 'Roboto', -apple-system, BlinkMacSystemFont, sans-serif",
                fontSize: '16px',
                lineHeight: '1.4',
                fontWeight: 400
              }}
            >
              <p className="text-sm leading-relaxed mb-4" style={{ fontWeight: 400 }}>{message.text}</p>
              <div className="space-y-3">
                {message.documents.map((doc) => (
                  <button
                    key={doc.id}
                    onClick={() => handleDocumentSelect(doc)}
                    className="w-full text-left p-3 bg-gray-50 hover:bg-gray-100 rounded-lg border transition-colors"
                  >
                    <div 
                      className="font-medium text-gray-900"
                      style={{ 
                        fontFamily: "'Product Sans', 'Google Sans Text', sans-serif",
                        fontWeight: 500
                      }}
                    >
                      {doc.name}
                    </div>
                    <div 
                      className="text-xs text-gray-600 mt-1"
                      style={{ 
                        fontFamily: "'Google Sans Text', 'Roboto', sans-serif",
                        fontWeight: 400
                      }}
                    >
                      {doc.description}
                    </div>
                    <div 
                      className="text-xs text-blue-600 mt-1"
                      style={{ 
                        fontFamily: "'Google Sans Text', 'Roboto', sans-serif",
                        fontWeight: 500
                      }}
                    >
                      <strong>Data yang diperlukan:</strong> {doc.fields.length} field
                    </div>
                  </button>
                ))}
              </div>

              <div
                className="absolute"
                style={{
                  bottom: '0',
                  left: '-8px',
                  width: '0',
                  height: '0',
                  borderTop: '12px solid #ffffff',
                  borderRight: '12px solid transparent',
                  borderTopLeftRadius: '8px'
                }}
              />
            </div>

            <div 
              className="text-xs mt-1 text-left text-gray-500" 
              style={{ 
                fontSize: '11px',
                fontFamily: "'Google Sans Text', 'Roboto', sans-serif",
                fontWeight: 400
              }}
            >
              {message.timestamp}
            </div>
          </div>
        </div>
      );
    }

    if (message.type === 'email-template-list') {
      return (
        <div key={index} className="flex items-end space-x-2 mb-4">
          <div 
            className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 mb-1"
            style={{ 
              backgroundColor: '#ffffff',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
            }}
          >
            <span style={{ fontSize: '22px' }}>🌶️</span>
          </div>

          <div className="max-w-2xl relative">
            <div
              className="px-4 py-3 text-sm leading-5 text-black relative"
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '20px 20px 20px 4px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                fontFamily: "'Google Sans Text', 'Product Sans', 'Roboto', -apple-system, BlinkMacSystemFont, sans-serif",
                fontSize: '16px',
                lineHeight: '1.4',
                fontWeight: 400
              }}
            >
              <p className="text-sm leading-relaxed mb-4" style={{ fontWeight: 400 }}>{message.text}</p>
              <div className="space-y-3">
                {message.emailTemplates.map((template) => (
                  <button
                    key={template.id}
                    onClick={() => handleEmailTemplateSelect(template)}
                    className="w-full text-left p-3 bg-gray-50 hover:bg-gray-100 rounded-lg border transition-colors"
                  >
                    <div 
                      className="font-medium text-gray-900"
                      style={{ 
                        fontFamily: "'Product Sans', 'Google Sans Text', sans-serif",
                        fontWeight: 500
                      }}
                    >
                      {template.name}
                    </div>
                    <div 
                      className="text-xs text-gray-600 mt-1"
                      style={{ 
                        fontFamily: "'Google Sans Text', 'Roboto', sans-serif",
                        fontWeight: 400
                      }}
                    >
                      {template.description}
                    </div>
                    <div 
                      className="text-xs text-blue-600 mt-1"
                      style={{ 
                        fontFamily: "'Google Sans Text', 'Roboto', sans-serif",
                        fontWeight: 500
                      }}
                    >
                      <strong>Data yang diperlukan:</strong> {template.fields.length} field
                    </div>
                  </button>
                ))}
              </div>

              <div
                className="absolute"
                style={{
                  bottom: '0',
                  left: '-8px',
                  width: '0',
                  height: '0',
                  borderTop: '12px solid #ffffff',
                  borderRight: '12px solid transparent',
                  borderTopLeftRadius: '8px'
                }}
              />
            </div>

            <div 
              className="text-xs mt-1 text-left text-gray-500" 
              style={{ 
                fontSize: '11px',
                fontFamily: "'Google Sans Text', 'Roboto', sans-serif",
                fontWeight: 400
              }}
            >
              {message.timestamp}
            </div>
          </div>
        </div>
      );
    }

    if (message.type === 'document-ready') {
      return (
        <div key={index} className="flex items-end space-x-2 mb-4">
          <div 
            className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 mb-1"
            style={{ 
              backgroundColor: '#ffffff',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
            }}
          >
            <span style={{ fontSize: '22px' }}>🌶️</span>
          </div>

          <div className="max-w-2xl relative">
            <div
              className="px-4 py-3 text-sm leading-5 text-black relative"
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '20px 20px 20px 4px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                fontFamily: "'Google Sans Text', 'Product Sans', 'Roboto', -apple-system, BlinkMacSystemFont, sans-serif",
                fontSize: '16px',
                lineHeight: '1.4',
                fontWeight: 400
              }}
            >
              <p className="text-sm leading-relaxed mb-3" style={{ fontWeight: 400 }}>{message.text}</p>
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 mb-4">
                <div className="flex items-center justify-between mb-3">
                  <span 
                    className="text-xs font-medium text-gray-700"
                    style={{ 
                      fontFamily: "'Product Sans', 'Google Sans Text', sans-serif",
                      fontWeight: 500
                    }}
                  >
                    Generated Document:
                  </span>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleCopy(message.content)}
                      className="text-xs text-gray-600 hover:text-gray-900 flex items-center space-x-1"
                      style={{ 
                        fontFamily: "'Google Sans Text', 'Roboto', sans-serif",
                        fontWeight: 400
                      }}
                    >
                      <Copy className="w-3 h-3" />
                      <span>Copy</span>
                    </button>
                    <button
                      onClick={() => handleDownload(message.content, lastGeneratedDocument?.name || 'document')}
                      className="text-xs text-gray-600 hover:text-gray-900 flex items-center space-x-1"
                      style={{ 
                        fontFamily: "'Google Sans Text', 'Roboto', sans-serif",
                        fontWeight: 400
                      }}
                    >
                      <Download className="w-3 h-3" />
                      <span>Download PDF</span>
                    </button>
                  </div>
                </div>
                <div className="bg-gray-100 rounded p-3 max-h-64 overflow-y-auto">
                  <pre 
                    className="text-xs text-gray-700 whitespace-pre-wrap font-mono"
                    style={{ 
                      fontFamily: "'Google Sans Text', 'Roboto', monospace",
                      fontWeight: 400
                    }}
                  >
                    {message.content}
                  </pre>
                </div>
              </div>

              <div
                className="absolute"
                style={{
                  bottom: '0',
                  left: '-8px',
                  width: '0',
                  height: '0',
                  borderTop: '12px solid #ffffff',
                  borderRight: '12px solid transparent',
                  borderTopLeftRadius: '8px'
                }}
              />
            </div>

            <div 
              className="text-xs mt-1 text-left text-gray-500" 
              style={{ 
                fontSize: '11px',
                fontFamily: "'Google Sans Text', 'Roboto', sans-serif",
                fontWeight: 400
              }}
            >
              {message.timestamp}
            </div>
          </div>
        </div>
      );
    }

    if (message.type === 'email-ready') {
      return (
        <div key={index} className="flex items-end space-x-2 mb-4">
          <div 
            className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 mb-1"
            style={{ 
              backgroundColor: '#ffffff',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
            }}
          >
            <span style={{ fontSize: '22px' }}>🌶️</span>
          </div>

          <div className="max-w-2xl relative">
            <div
              className="px-4 py-3 text-sm leading-5 text-black relative"
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '20px 20px 20px 4px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                fontFamily: "'Google Sans Text', 'Product Sans', 'Roboto', -apple-system, BlinkMacSystemFont, sans-serif",
                fontSize: '16px',
                lineHeight: '1.4',
                fontWeight: 400
              }}
            >
              <p className="text-sm leading-relaxed mb-3" style={{ fontWeight: 400 }}>{message.text}</p>
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 mb-4">
                <div className="flex items-center justify-between mb-3">
                  <span 
                    className="text-xs font-medium text-gray-700"
                    style={{ 
                      fontFamily: "'Product Sans', 'Google Sans Text', sans-serif",
                      fontWeight: 500
                    }}
                  >
                    Generated Email:
                  </span>
                  <button
                    onClick={() => handleCopy(message.content)}
                    className="text-xs text-gray-600 hover:text-gray-900 flex items-center space-x-1"
                    style={{ 
                      fontFamily: "'Google Sans Text', 'Roboto', sans-serif",
                      fontWeight: 400
                    }}
                  >
                    <Copy className="w-3 h-3" />
                    <span>Copy Email</span>
                  </button>
                </div>
                <div className="bg-gray-100 rounded p-3 max-h-64 overflow-y-auto">
                  <pre 
                    className="text-xs text-gray-700 whitespace-pre-wrap font-mono"
                    style={{ 
                      fontFamily: "'Google Sans Text', 'Roboto', monospace",
                      fontWeight: 400
                    }}
                  >
                    {message.content}
                  </pre>
                </div>
              </div>

              <div
                className="absolute"
                style={{
                  bottom: '0',
                  left: '-8px',
                  width: '0',
                  height: '0',
                  borderTop: '12px solid #ffffff',
                  borderRight: '12px solid transparent',
                  borderTopLeftRadius: '8px'
                }}
              />
            </div>

            <div 
              className="text-xs mt-1 text-left text-gray-500" 
              style={{ 
                fontSize: '11px',
                fontFamily: "'Google Sans Text', 'Roboto', sans-serif",
                fontWeight: 400
              }}
            >
              {message.timestamp}
            </div>
          </div>
        </div>
      );
    }

    return (
      <div key={index} className="flex items-end space-x-2 mb-4">
        {/* Avatar untuk bot */}
        {message.from === "bot" && (
          <div 
            className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 mb-1"
            style={{ 
              backgroundColor: '#ffffff',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
            }}
          >
            <span style={{ fontSize: '22px' }}>🌶️</span>
          </div>
        )}

        <div 
          className={`max-w-xs lg:max-w-md relative ${
            message.from === "user" ? "ml-auto mr-12" : "mr-auto"
          }`}
        >
          {/* Avatar untuk user - Fixed position */}
          {message.from === "user" && (
            <div 
              className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mb-1 absolute -right-12 bottom-0"
              style={{ 
                backgroundColor: '#2c2c2e',
                boxShadow: '0 1px 3px rgba(0,0,0,0.3)'
              }}
            >
              <span style={{ fontSize: '20px' }}>🐴</span>
            </div>
          )}

          <div
            className={`px-4 py-3 text-sm leading-5 relative ${
              message.from === "user" 
                ? "text-white" 
                : "text-black"
            }`}
            style={{
              backgroundColor: message.from === "user" ? '#2c2c2e' : '#ffffff',
              borderRadius: message.from === "user" 
                ? '20px 20px 4px 20px' 
                : '20px 20px 20px 4px',
              boxShadow: message.from === "user"
                ? '0 1px 3px rgba(0,0,0,0.2)'
                : '0 1px 3px rgba(0,0,0,0.1)',
              fontFamily: "'Google Sans Text', 'Product Sans', 'Roboto', -apple-system, BlinkMacSystemFont, sans-serif",
              fontSize: '16px',
              lineHeight: '1.4',
              fontWeight: 400
            }}
          >
            <p className="text-sm leading-relaxed whitespace-pre-line" style={{ fontWeight: 400 }}>{message.text}</p>

            {/* Perfect bubble tail */}
            <div
              className="absolute"
              style={{
                bottom: '0',
                [message.from === "user" ? 'right' : 'left']: '-8px',
                width: '0',
                height: '0',
                borderTop: message.from === "user" 
                  ? '12px solid #2c2c2e'
                  : '12px solid #ffffff',
                [message.from === "user" ? 'borderLeft' : 'borderRight']: '12px solid transparent',
                [message.from === "user" ? 'borderTopRightRadius' : 'borderTopLeftRadius']: '8px'
              }}
            />
          </div>

          <div 
            className={`text-xs mt-1 ${
              message.from === "user" ? "text-right text-gray-500" : "text-left text-gray-500"
            }`}
            style={{ 
              fontSize: '11px',
              fontFamily: "'Google Sans Text', 'Roboto', sans-serif",
              fontWeight: 400
            }}
          >
            {message.timestamp}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="h-full flex flex-col lg:flex-row overflow-hidden p-6 gap-6">
      {/* Sidebar - AI Assistant */}
      <div className="flex-none w-full lg:w-80 h-48 lg:h-full overflow-hidden">
        <div classNameac="bg-white rounded-xl shadow-sm border border-gray-200 p-4 lg:p-6 h-full flex flex-col">
          <div className="flex items-center space-x-3 mb-4 lg:mb-6">
            <div className="w-8 h-8 lg:w-10 lg:h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Bot className="w-4 h-4 lg:w-5 lg:h-5 text-white" />
            </div>
            <h1 
              className="text-lg lg:text-xl font-bold text-gray-900"
              style={{ 
                fontFamily: "'Product Sans', 'Google Sans Text', sans-serif",
                fontWeight: 500
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
                fontWeight: 500
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
                          fontFamily: "'Product Sans', 'Google Sans Text', sans-serif",
                          fontWeight: 500
                        }}
                      >
                        {feature.title}
                      </div>
                      <div 
                        className="text-xs text-gray-600 mt-1 hidden lg:block"
                        style={{ 
                          fontFamily: "'Google Sans Text', 'Roboto', sans-serif",
                          fontWeight: 400
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
                fontWeight: 400
              }}
            >
              💡 Tip: Klik quick action di atas atau ketik pertanyaan langsung di chat
            </p>
          </div>
        </div>
      </div>

      {/* Chat Container */}
      <div className="flex-1 overflow-hidden">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 h-full flex flex-col relative overflow-hidden">
          
          {/* Chat Messages - Only this area can scroll */}
          <div 
            ref={chatContainerRef}
            className="flex-1 overflow-y-auto p-6 space-y-4"
            style={{ 
              background: '#f2f2f7',
              overflowX: 'hidden'
            }}
            data-scroll-container
          >
            {messages.map((message, index) => renderMessage(message, index))}
            {isTyping && <TypingIndicator />}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggestions Bar */}
          <div className="border-t border-gray-100 bg-gray-50 p-3">
            <div className="flex items-center space-x-2 mb-2">
              <Lightbulb className="w-4 h-4 text-orange-500" />
              <span 
                className="text-sm font-medium text-gray-700"
                style={{ 
                  fontFamily: "'Product Sans', 'Google Sans Text', sans-serif",
                  fontWeight: 500
                }}
              >
                Pertanyaan Umum:
              </span>
            </div>
            <div className="overflow-x-auto">
              <div className="flex space-x-2">
                {generalSuggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="flex-shrink-0 text-xs bg-white hover:bg-blue-50 hover:text-blue-700 border border-gray-200 hover:border-blue-300 rounded-full px-3 py-2 transition-all whitespace-nowrap"
                    style={{ 
                      fontFamily: "'Google Sans Text', 'Roboto', sans-serif",
                      fontWeight: 400
                    }}
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Input Section - Fixed at bottom */}
          <div className="border-t border-gray-100 p-4 bg-white">
            <div className="flex space-x-3">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    if (currentFlow === 'document-form' || currentFlow === 'email-form') {
                      handleFormSubmit();
                    } else {
                      handleSend();
                    }
                  }
                }}
                placeholder="Tulis pesan..."
                className="flex-1 border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                style={{
                  fontFamily: "'Google Sans Text', 'Product Sans', 'Roboto', -apple-system, BlinkMacSystemFont, sans-serif",
                  fontSize: '16px',
                  fontWeight: 400
                }}
                disabled={isGenerating || isTyping}
              />
              <button
                onClick={() => {
                  if (currentFlow === 'document-form' || currentFlow === 'email-form') {
                    handleFormSubmit();
                  } else {
                    handleSend();
                  }
                }}
                disabled={!input.trim() || isGenerating || isTyping}
                className="bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors flex items-center space-x-2 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ 
                  fontFamily: "'Product Sans', 'Google Sans Text', sans-serif",
                  fontWeight: 500
                }}
              > 
                <Send className="w-4 h-4" />
                <span className="hidden sm:inline">Kirim</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
