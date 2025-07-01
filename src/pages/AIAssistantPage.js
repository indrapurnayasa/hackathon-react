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
      timestamp: new Date().toLocaleTimeString()
    }
  ]);
  const [isGenerating, setIsGenerating] = useState(false);
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
  }, [messages]);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Data dokumen ekspor
  const exportDocuments = [
    {
      id: 'peb',
      name: 'Pemberitahuan Ekspor Barang (PEB)',
      description: 'Dokumen wajib untuk memberitahukan barang yang akan diekspor melalui sistem CEISA',
      fields: [
        'Nama Eksportir', 'Alamat Eksportir', 'NPWP Eksportir', 'Nama Penerima', 
        'Alamat Penerima', 'Negara Tujuan', 'Deskripsi Barang', 'Kode HS', 
        'Jumlah', 'Satuan', 'Nilai FOB'
      ]
    },
    {
      id: 'ska',
      name: 'Surat Keterangan Asal (SKA/COO)',
      description: 'Sertifikat yang menyatakan asal barang untuk mendapatkan fasilitas tarif preferensial',
      fields: [
        'Nama Eksportir', 'Alamat Eksportir', 'Nama Penerima', 'Alamat Penerima', 
        'Deskripsi Barang', 'Kode HS', 'Kriteria Asal', 'Nomor Invoice', 'Tanggal Invoice'
      ]
    },
    {
      id: 'invoice',
      name: 'Commercial Invoice',
      description: 'Dokumen tagihan yang berisi detail transaksi perdagangan ekspor',
      fields: [
        'Nomor Invoice', 'Tanggal Invoice', 'Nama Penjual', 'Alamat Penjual', 
        'Nama Pembeli', 'Alamat Pembeli', 'Deskripsi Barang', 'Jumlah', 
        'Harga Satuan', 'Total Nilai', 'Syarat Pembayaran'
      ]
    },
    {
      id: 'packinglist',
      name: 'Packing List',
      description: 'Daftar detail kemasan barang yang akan diekspor',
      fields: [
        'Nomor Packing List', 'Tanggal Packing', 'Nama Pengirim', 'Nama Penerima', 
        'Deskripsi Barang', 'Jumlah Kemasan', 'Jenis Kemasan', 'Berat Kotor', 
        'Berat Bersih', 'Dimensi'
      ]
    },
    {
      id: 'bl',
      name: 'Bill of Lading (B/L)',
      description: 'Dokumen pengangkutan barang melalui laut',
      fields: [
        'Nomor B/L', 'Nama Kapal', 'Pelabuhan Muat', 'Pelabuhan Bongkar', 
        'Nama Pengirim', 'Nama Penerima', 'Deskripsi Barang', 'Jumlah Container'
      ]
    },
    {
      id: 'insurance',
      name: 'Marine Insurance Certificate',
      description: 'Sertifikat asuransi untuk pengangkutan barang ekspor',
      fields: [
        'Nomor Polis', 'Nama Tertanggung', 'Jenis Barang', 'Nilai Pertanggungan', 
        'Rute Pengangkutan', 'Jenis Kapal', 'Periode Asuransi'
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
        'Nama Perusahaan Penerima', 'Nama Penerima', 'Produk yang Diminati',
        'Quantity yang Dibutuhkan', 'Negara Tujuan', 'Informasi Tambahan'
      ]
    },
    {
      id: 'business-introduction',
      name: 'Business Introduction Email',
      description: 'Email perkenalan perusahaan untuk membangun hubungan bisnis',
      category: 'Introduction',
      fields: [
        'Nama Perusahaan Anda', 'Tahun Berdiri', 'Jenis Bisnis', 'Produk Utama',
        'Kapasitas Produksi', 'Nama Anda', 'Jabatan Anda', 'Website Perusahaan',
        'Nama Perusahaan Penerima', 'Nama Penerima', 'Alasan Menghubungi'
      ]
    },
    {
      id: 'export-offer',
      name: 'Export Offer Email',
      description: 'Email penawaran ekspor produk dengan detail lengkap',
      category: 'Offer',
      fields: [
        'Nama Perusahaan Anda', 'Nama Anda', 'Jabatan Anda', 'Nama Penerima',
        'Perusahaan Penerima', 'Nama Produk', 'Deskripsi Produk', 'Quantity',
        'Harga per Unit', 'Currency', 'Delivery Terms', 'Payment Terms',
        'Delivery Time', 'Validity Period'
      ]
    },
    {
      id: 'quotation-follow-up',
      name: 'Quotation Follow-up Email',
      description: 'Email follow up setelah mengirim quotation',
      category: 'Follow-up',
      fields: [
        'Nama Penerima', 'Perusahaan Penerima', 'Nama Anda', 'Nama Perusahaan Anda',
        'Tanggal Quotation', 'Nomor Quotation', 'Produk yang Ditawarkan',
        'Benefit Utama', 'Call to Action'
      ]
    },
    {
      id: 'partnership-proposal',
      name: 'Partnership Proposal Email',
      description: 'Email proposal kerjasama bisnis ekspor-impor',
      category: 'Partnership',
      fields: [
        'Nama Perusahaan Anda', 'Nama Anda', 'Jabatan Anda', 'Nama Penerima',
        'Perusahaan Penerima', 'Jenis Kerjasama', 'Produk/Kategori',
        'Target Market', 'Benefit untuk Partner', 'Pengalaman Perusahaan'
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
      examples: [
        "Saya ingin membuat dokumen ekspor",
        "Buatkan dokumen untuk ekspor saya",
        "Dokumen apa saja yang diperlukan untuk ekspor?"
      ]
    },
    {
      id: 'email',
      title: "Generate Email",
      icon: <Mail className="w-5 h-5" />,
      description: "Buat email bisnis profesional",
      examples: [
        "Saya ingin membuat email ekspor",
        "Buatkan email penawaran produk",
        "Generate email untuk buyer internasional"
      ]
    },
    {
      id: 'proposal',
      title: "Generate Proposal",
      icon: <MessageCircle className="w-5 h-5" />,
      description: "Buat proposal bisnis menarik",
      examples: [
        "Proposal ekspor produk kerajinan tangan ke pasar Amerika",
        "Proposal kerjasama distribusi produk makanan ke Asia Tenggara"
      ]
    },
    {
      id: 'cost',
      title: "Estimasi Biaya",
      icon: <Calculator className="w-5 h-5" />,
      description: "Hitung estimasi biaya ekspor",
      examples: [
        "Estimasi biaya ekspor produk elektronik ke Jerman",
        "Hitung biaya cukai untuk ekspor makanan ke Singapura"
      ]
    }
  ];

  // General suggestions
  const generalSuggestions = [
    "Apa saja dokumen yang diperlukan untuk ekspor?",
    "Bagaimana cara menghitung biaya ekspor?",
    "Negara mana yang mudah untuk ekspor pemula?",
    "Syarat dan ketentuan ekspor produk makanan",
    "Cara mencari buyer internasional",
    "Perbedaan FOB, CIF, dan CFR dalam ekspor"
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

  const handleFeatureClick = (feature) => {
    if (feature.id === 'document') {
      setInput("Saya ingin membuat dokumen ekspor");
    } else if (feature.id === 'email') {
      setInput("Saya ingin membuat email ekspor");
    } else {
      const randomExample = feature.examples[Math.floor(Math.random() * feature.examples.length)];
      setInput(randomExample);
    }
  };

  const handleDocumentSelect = (document) => {
    setSelectedDocument(document);
    setCurrentFlow('document-form');
    setDocumentData({});
    setCurrentFieldIndex(0);
    
    const botMessage = {
      from: "bot",
      text: `Baik! Saya akan membantu Anda membuat ${document.name}. \n\nSaya akan menanyakan data yang diperlukan satu per satu. Mari kita mulai:\n\n**${document.fields[0]}**: Silakan masukkan ${document.fields[0].toLowerCase()} Anda.`,
      timestamp: new Date().toLocaleTimeString(),
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
      timestamp: new Date().toLocaleTimeString(),
      type: "asking-email-field"
    };
    setMessages(prev => [...prev, botMessage]);
  };

  const handleSend = () => {
    if (!input.trim()) return;
    
    const userMessage = { 
      from: "user", 
      text: input,
      timestamp: new Date().toLocaleTimeString()
    };
    setMessages(prev => [...prev, userMessage]);
    
    processUserInput(input);
    setInput("");
  };

  const processUserInput = (userInput) => {
    // Jika sedang dalam flow pengisian data dokumen
    if (currentFlow === 'document-form' && selectedDocument) {
      const currentField = selectedDocument.fields[currentFieldIndex];
      
      // Simpan data yang diinput user
      const newDocumentData = {
        ...documentData,
        [currentField]: userInput
      };
      setDocumentData(newDocumentData);
      
      // Cek apakah masih ada field yang perlu diisi
      if (currentFieldIndex < selectedDocument.fields.length - 1) {
        const nextIndex = currentFieldIndex + 1;
        setCurrentFieldIndex(nextIndex);
        const nextField = selectedDocument.fields[nextIndex];
        
        setTimeout(() => {
          const botMessage = {
            from: "bot",
            text: `✅ ${currentField}: ${userInput}\n\n**${nextField}**: Silakan masukkan ${nextField.toLowerCase()} Anda.`,
            timestamp: new Date().toLocaleTimeString(),
            type: "asking-field"
          };
          setMessages(prev => [...prev, botMessage]);
        }, 500);
      } else {
        // Semua data sudah terkumpul, generate dokumen
        setTimeout(() => {
          const confirmMessage = {
            from: "bot",
            text: `✅ ${currentField}: ${userInput}\n\n🎉 Semua data telah terkumpul! Saya akan generate ${selectedDocument.name} untuk Anda. Mohon tunggu sebentar...`,
            timestamp: new Date().toLocaleTimeString(),
            type: "generating"
          };
          setMessages(prev => [...prev, confirmMessage]);
          
          // Generate dokumen
          generateDocument(newDocumentData);
        }, 500);
      }
      return;
    }

    // Jika sedang dalam flow pengisian data email
    if (currentFlow === 'email-form' && selectedEmailTemplate) {
      const currentField = selectedEmailTemplate.fields[currentFieldIndex];
      
      // Simpan data yang diinput user
      const newEmailData = {
        ...emailData,
        [currentField]: userInput
      };
      setEmailData(newEmailData);
      
      // Cek apakah masih ada field yang perlu diisi
      if (currentFieldIndex < selectedEmailTemplate.fields.length - 1) {
        const nextIndex = currentFieldIndex + 1;
        setCurrentFieldIndex(nextIndex);
        const nextField = selectedEmailTemplate.fields[nextIndex];
        
        setTimeout(() => {
          const botMessage = {
            from: "bot",
            text: `✅ ${currentField}: ${userInput}\n\n**${nextField}**: Silakan masukkan ${nextField.toLowerCase()}.`,
            timestamp: new Date().toLocaleTimeString(),
            type: "asking-email-field"
          };
          setMessages(prev => [...prev, botMessage]);
        }, 500);
      } else {
        // Semua data sudah terkumpul, generate email
        setTimeout(() => {
          const confirmMessage = {
            from: "bot",
            text: `✅ ${currentField}: ${userInput}\n\n🎉 Semua data telah terkumpul! Saya akan generate ${selectedEmailTemplate.name} untuk Anda. Mohon tunggu sebentar...`,
            timestamp: new Date().toLocaleTimeString(),
            type: "generating"
          };
          setMessages(prev => [...prev, confirmMessage]);
          
          // Generate email
          generateEmailContent(newEmailData);
        }, 500);
      }
      return;
    }
    
    // Proses input normal
    setTimeout(() => {
      const response = generateResponse(userInput);
      const botMessage = {
        from: "bot",
        text: response.text,
        timestamp: new Date().toLocaleTimeString(),
        type: response.type,
        content: response.content,
        documents: response.documents,
        emailTemplates: response.emailTemplates
      };
      setMessages(prev => [...prev, botMessage]);
    }, 1000);
  };

  const generateResponse = (userInput) => {
    const input = userInput.toLowerCase();
    
    // Deteksi permintaan dokumen
    if (input.includes('dokumen') && (input.includes('ekspor') || input.includes('buat') || input.includes('generate'))) {
      setCurrentFlow('document-list');
      return {
        text: "Berikut adalah daftar dokumen ekspor yang dapat saya buatkan untuk Anda. Dokumen yang sudah selesai akan ditandai dengan bulatan hijau:",
        type: "document-list",
        documents: getDocumentStatusList()
      };
    }

    // Deteksi permintaan email
    if (input.includes('email') && (input.includes('ekspor') || input.includes('buat') || input.includes('generate') || input.includes('penawaran'))) {
      setCurrentFlow('email-list');
      return {
        text: "Berikut adalah template email profesional untuk ekspor yang dapat saya buatkan. Pilih template yang sesuai dengan kebutuhan Anda:",
        type: "email-template-list",
        emailTemplates: exportEmailTemplates
      };
    }
    
    // Response untuk fitur lain
    if (input.includes('proposal') || input.includes('kerjasama') || input.includes('partnership')) {
      return {
        text: "📋 Proposal bisnis berhasil dibuat! Berikut adalah proposal yang sesuai dengan kebutuhan Anda:",
        type: "proposal",
        content: generateProposalContent(input)
      };
    }
    
    if (input.includes('biaya') || input.includes('estimasi') || input.includes('cukai') || input.includes('cost')) {
      return {
        text: "💰 Estimasi biaya ekspor telah dihitung! Berikut adalah rincian biaya yang perlu Anda siapkan:",
        type: "cost",
        content: generateCostEstimation()
      };
    }
    
    return {
      text: generateGeneralResponse(input),
      type: "text"
    };
  };

  const generateDocument = (data) => {
    setIsGenerating(true);
    
    setTimeout(() => {
      setIsGenerating(false);
      const content = createDocumentContent(selectedDocument, data);
      
      // Mark document as completed
      setCompletedDocuments(prev => new Set([...prev, selectedDocument.id]));
      setLastGeneratedDocument(selectedDocument);
      
      const successMessage = {
        from: "bot",
        text: `🎉 ${selectedDocument.name} berhasil dibuat! Berikut adalah dokumen yang telah saya generate berdasarkan data Anda:`,
        timestamp: new Date().toLocaleTimeString(),
        type: "document-ready",
        content: content,
        documentId: selectedDocument.id
      };
      setMessages(prev => [...prev, successMessage]);
      
      // Reset current flow but don't auto-redirect
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
        timestamp: new Date().toLocaleTimeString(),
        type: "email-ready",
        content: content
      };
      setMessages(prev => [...prev, successMessage]);
      
      // Reset flow
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

We are interested in your ${data['Produk yang Diminati'] || '[Product Name]'} for import to ${data['Negara Tujuan'] || '[Destination Country]'}. We would like to inquire about the following:

• Product availability and specifications
• Pricing for quantity: ${data['Quantity yang Dibutuhkan'] || '[Quantity]'}
• Minimum order quantity (MOQ)
• Lead time and delivery terms
• Payment terms and conditions
• Quality certificates and compliance standards

${data['Informasi Tambahan'] ? `Additional Information: ${data['Informasi Tambahan']}` : ''}

We look forward to establishing a mutually beneficial business relationship with your esteemed company.

Best regards,

${data['Nama Anda'] || '[Your Name]'}
${data['Jabatan Anda'] || '[Your Position]'}
${data['Nama Perusahaan Anda'] || '[Your Company]'}
Email: ${data['Email Perusahaan'] || '[Your Email]'}

---
This email is sent with professional intent for business inquiry purposes.`;

      case 'business-introduction':
        return `Subject: Business Introduction - ${data['Nama Perusahaan Anda'] || '[Your Company]'}

Dear ${data['Nama Penerima'] || '[Recipient Name]'},

Greetings from ${data['Nama Perusahaan Anda'] || '[Your Company]'}!

I am ${data['Nama Anda'] || '[Your Name]'}, ${data['Jabatan Anda'] || '[Your Position]'} at ${data['Nama Perusahaan Anda'] || '[Your Company]'}. I am writing to introduce our company and explore potential business opportunities with ${data['Nama Perusahaan Penerima'] || '[Recipient Company]'}.

ABOUT OUR COMPANY:
• Company: ${data['Nama Perusahaan Anda'] || '[Your Company]'}
• Established: ${data['Tahun Berdiri'] || '[Year]'}
• Business Type: ${data['Jenis Bisnis'] || '[Business Type]'}
• Main Products: ${data['Produk Utama'] || '[Main Products]'}
• Production Capacity: ${data['Kapasitas Produksi'] || '[Production Capacity]'}
• Website: ${data['Website Perusahaan'] || '[Website]'}

${data['Alasan Menghubungi'] || 'We believe there are excellent opportunities for mutual business growth and would welcome the chance to discuss potential collaboration.'}

We would be delighted to provide more information about our products and services. Please feel free to visit our website or contact us directly.

Looking forward to your positive response.

Best regards,

${data['Nama Anda'] || '[Your Name]'}
${data['Jabatan Anda'] || '[Your Position]'}
${data['Nama Perusahaan Anda'] || '[Your Company]'}
${data['Website Perusahaan'] || '[Website]'}

---
Professional business introduction for export-import opportunities.`;

      case 'export-offer':
        return `Subject: Export Offer - ${data['Nama Produk'] || '[Product Name]'} from ${data['Nama Perusahaan Anda'] || '[Your Company]'}

Dear ${data['Nama Penerima'] || '[Recipient Name]'},

I hope this email finds you in good health and prosperity.

I am ${data['Nama Anda'] || '[Your Name]'}, ${data['Jabatan Anda'] || '[Your Position]'} at ${data['Nama Perusahaan Anda'] || '[Your Company]'}. We are pleased to present our export offer for ${data['Nama Produk'] || '[Product Name]'}.

PRODUCT DETAILS:
• Product: ${data['Nama Produk'] || '[Product Name]'}
• Description: ${data['Deskripsi Produk'] || '[Product Description]'}
• Quantity: ${data['Quantity'] || '[Quantity]'}
• Unit Price: ${data['Currency'] || 'USD'} ${data['Harga per Unit'] || '[Unit Price]'}
• Total Value: ${data['Currency'] || 'USD'} ${data['Quantity'] && data['Harga per Unit'] ? (parseFloat(data['Quantity']) * parseFloat(data['Harga per Unit'])).toLocaleString() : '[Total Value]'}

TERMS & CONDITIONS:
• Delivery Terms: ${data['Delivery Terms'] || '[Delivery Terms - FOB/CIF/CFR]'}
• Payment Terms: ${data['Payment Terms'] || '[Payment Terms]'}
• Delivery Time: ${data['Delivery Time'] || '[Delivery Time]'} after confirmation
• Offer Validity: ${data['Validity Period'] || '[Validity Period]'}

We assure you of our best quality products and timely delivery. Our products meet international quality standards and we provide all necessary export documentation.

Please feel free to contact us for any clarifications or if you need samples for quality evaluation.

Looking forward to your favorable response.

Best regards,

${data['Nama Anda'] || '[Your Name]'}
${data['Jabatan Anda'] || '[Your Position]'}
${data['Nama Perusahaan Anda'] || '[Your Company]'}

---
Professional export offer with complete commercial terms.`;

      case 'quotation-follow-up':
        return `Subject: Follow-up on Quotation ${data['Nomor Quotation'] || '[Quote Number]'} - ${data['Produk yang Ditawarkan'] || '[Product]'}

Dear ${data['Nama Penerima'] || '[Recipient Name]'},

I hope you are doing well.

I am following up on the quotation we sent on ${data['Tanggal Quotation'] || '[Date]'} (Reference: ${data['Nomor Quotation'] || '[Quote Number]'}) for ${data['Produk yang Ditawarkan'] || '[Product/Service]'}.

I wanted to ensure you received our proposal and see if you have any questions or need additional information. Our offer includes:

${data['Benefit Utama'] || '• Competitive pricing with excellent quality\n• Reliable delivery schedule\n• Complete export documentation\n• After-sales support'}

We understand that making business decisions takes time, and we're here to support you throughout the process. If you need any clarifications, product samples, or would like to discuss terms, please don't hesitate to reach out.

${data['Call to Action'] || 'Would you be available for a brief call this week to discuss your requirements in detail?'}

Thank you for considering ${data['Nama Perusahaan Anda'] || '[Your Company]'} as your business partner.

Best regards,

${data['Nama Anda'] || '[Your Name]'}
${data['Nama Perusahaan Anda'] || '[Your Company]'}

---
Professional follow-up to maintain business momentum.`;

      case 'partnership-proposal':
        return `Subject: Partnership Proposal - ${data['Jenis Kerjasama'] || '[Partnership Type]'} Opportunity

Dear ${data['Nama Penerima'] || '[Recipient Name]'},

Greetings from ${data['Nama Perusahaan Anda'] || '[Your Company]'}!

I am ${data['Nama Anda'] || '[Your Name]'}, ${data['Jabatan Anda'] || '[Your Position]'} at ${data['Nama Perusahaan Anda'] || '[Your Company]'}. I am writing to propose a strategic ${data['Jenis Kerjasama'] || '[Partnership Type]'} partnership between our companies.

PARTNERSHIP PROPOSAL:
• Partnership Type: ${data['Jenis Kerjasama'] || '[Partnership Type]'}
• Product Category: ${data['Produk/Kategori'] || '[Product/Category]'}
• Target Market: ${data['Target Market'] || '[Target Market]'}
• Our Experience: ${data['Pengalaman Perusahaan'] || '[Company Experience]'}

BENEFITS FOR YOUR COMPANY:
${data['Benefit untuk Partner'] || '• Access to high-quality products at competitive prices\n• Reliable supply chain and timely delivery\n• Marketing and technical support\n• Exclusive territorial rights (if applicable)'}

We believe this partnership will create significant value for both organizations and help us establish a strong presence in the target markets.

I would welcome the opportunity to discuss this proposal in detail. Would you be available for a video conference next week?

Thank you for your time and consideration.

Best regards,

${data['Nama Anda'] || '[Your Name]'}
${data['Jabatan Anda'] || '[Your Position]'}
${data['Nama Perusahaan Anda'] || '[Your Company]'}

---
Strategic partnership proposal for mutual business growth.`;

      default:
        return "Professional email template generated based on your requirements.";
    }
  };

  // Function to show document list after download
  const showDocumentListAfterDownload = () => {
    const remainingDocs = exportDocuments.filter(doc => !completedDocuments.has(doc.id));
    
    if (remainingDocs.length > 0) {
      const returnToListMessage = {
        from: "bot",
        text: `✅ ${lastGeneratedDocument.name} telah berhasil didownload!\n\nBerikut adalah status terbaru dokumen ekspor Anda. Anda masih memiliki ${remainingDocs.length} dokumen yang perlu diisi:`,
        timestamp: new Date().toLocaleTimeString(),
        type: "document-list",
        documents: getDocumentStatusList()
      };
      setMessages(prev => [...prev, returnToListMessage]);
    } else {
      const allCompleteMessage = {
        from: "bot",
        text: `🎊 Selamat! Anda telah menyelesaikan semua dokumen ekspor yang diperlukan:\n\n${exportDocuments.map(doc => `✅ ${doc.name}`).join('\n')}\n\nSemua dokumen ekspor Anda sudah siap digunakan!`,
        timestamp: new Date().toLocaleTimeString(),
        type: "all-documents-complete"
      };
      setMessages(prev => [...prev, allCompleteMessage]);
    }
    
    setCurrentFlow('document-list');
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
Jumlah: ${data['Jumlah'] || '[Jumlah]'}
Satuan: ${data['Satuan'] || '[Satuan]'}
Nilai FOB: USD ${data['Nilai FOB'] || '[Nilai FOB]'}

Dokumen ini telah disesuaikan dengan regulasi terbaru.`;

      case 'ska':
        return `SURAT KETERANGAN ASAL (SKA/COO)

EKSPORTIR:
Nama: ${data['Nama Eksportir'] || '[Nama Eksportir]'}
Alamat: ${data['Alamat Eksportir'] || '[Alamat Eksportir]'}

PENERIMA:
Nama: ${data['Nama Penerima'] || '[Nama Penerima]'}
Alamat: ${data['Alamat Penerima'] || '[Alamat Penerima]'}

DETAIL BARANG:
Deskripsi: ${data['Deskripsi Barang'] || '[Deskripsi Barang]'}
Kode HS: ${data['Kode HS'] || '[Kode HS]'}
Kriteria Asal: ${data['Kriteria Asal'] || '[Kriteria Asal]'}

INVOICE:
Nomor: ${data['Nomor Invoice'] || '[Nomor Invoice]'}
Tanggal: ${data['Tanggal Invoice'] || '[Tanggal Invoice]'}

Sertifikat ini menyatakan bahwa barang tersebut di atas berasal dari Indonesia.`;

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
Quantity: ${data['Jumlah'] || '[Jumlah]'}
Unit Price: USD ${data['Harga Satuan'] || '[Harga Satuan]'}
Total Amount: USD ${data['Total Nilai'] || '[Total Nilai]'}

TERMS: ${data['Syarat Pembayaran'] || '[Syarat Pembayaran]'}

This invoice is true and correct.`;

      case 'packinglist':
        return `PACKING LIST

Packing List No: ${data['Nomor Packing List'] || '[Nomor Packing List]'}
Date: ${data['Tanggal Packing'] || '[Tanggal Packing]'}

SHIPPER:
${data['Nama Pengirim'] || '[Nama Pengirim]'}

CONSIGNEE:
${data['Nama Penerima'] || '[Nama Penerima]'}

DESCRIPTION OF GOODS:
${data['Deskripsi Barang'] || '[Deskripsi Barang]'}

PACKAGING DETAILS:
Number of Packages: ${data['Jumlah Kemasan'] || '[Jumlah Kemasan]'}
Type of Package: ${data['Jenis Kemasan'] || '[Jenis Kemasan]'}
Gross Weight: ${data['Berat Kotor'] || '[Berat Kotor]'} kg
Net Weight: ${data['Berat Bersih'] || '[Berat Bersih]'} kg
Dimensions: ${data['Dimensi'] || '[Dimensi]'}

This packing list is true and correct.`;

      case 'bl':
        return `BILL OF LADING (B/L)

B/L No: ${data['Nomor B/L'] || '[B/L Number]'}
Vessel: ${data['Nama Kapal'] || '[Vessel Name]'}

PORT OF LOADING: ${data['Pelabuhan Muat'] || '[Port of Loading]'}
PORT OF DISCHARGE: ${data['Pelabuhan Bongkar'] || '[Port of Discharge]'}

SHIPPER:
${data['Nama Pengirim'] || '[Shipper Name]'}

CONSIGNEE:
${data['Nama Penerima'] || '[Consignee Name]'}

DESCRIPTION OF GOODS:
${data['Deskripsi Barang'] || '[Description of Goods]'}

CONTAINER DETAILS:
Number of Containers: ${data['Jumlah Container'] || '[Number of Containers]'}

This Bill of Lading is issued subject to the terms and conditions on the reverse side.`;

      case 'insurance':
        return `MARINE INSURANCE CERTIFICATE

Policy No: ${data['Nomor Polis'] || '[Policy Number]'}
Insured: ${data['Nama Tertanggung'] || '[Insured Name]'}

GOODS INSURED:
${data['Jenis Barang'] || '[Type of Goods]'}

SUM INSURED: USD ${data['Nilai Pertanggungan'] || '[Sum Insured]'}

VOYAGE:
${data['Rute Pengangkutan'] || '[Route of Transportation]'}

VESSEL: ${data['Jenis Kapal'] || '[Vessel Type]'}

PERIOD OF INSURANCE: ${data['Periode Asuransi'] || '[Insurance Period]'}

This certificate is issued in accordance with the terms and conditions of the marine insurance policy.`;

      default:
        return "Dokumen berhasil dibuat berdasarkan data yang Anda berikan.";
    }
  };

  const generateProposalContent = (input) => {
    return `BUSINESS PROPOSAL

EXECUTIVE SUMMARY
We are pleased to present this proposal for export business collaboration.

COMPANY OVERVIEW
[Your Company] is an established Indonesian exporter with proven track record.

PROPOSED COLLABORATION
- Product Category: [Product Category]
- Target Markets: [Target Markets]
- Partnership Model: [Partnership Model]

Best regards,
[Your Company]`;
  };

  const generateCostEstimation = () => {
    return `ESTIMASI BIAYA EKSPOR

BIAYA DOKUMEN:
• PEB: Rp 500,000
• Commercial Invoice: Rp 200,000
• Packing List: Rp 150,000
• Certificate of Origin: Rp 300,000

BIAYA LOGISTIK:
• Freight: Rp 2,500,000
• Insurance: Rp 400,000
• Handling: Rp 300,000

TOTAL ESTIMASI: Rp 4,350,000`;
  };

  const generateGeneralResponse = (input) => {
    if (input.includes('dokumen')) {
      return "Untuk ekspor, Anda memerlukan beberapa dokumen penting. Saya bisa membantu generate dokumen-dokumen tersebut. Ketik 'saya ingin membuat dokumen ekspor' untuk melihat daftar dokumen yang tersedia.";
    } else if (input.includes('email')) {
      return "Saya bisa membantu Anda membuat email profesional untuk ekspor. Ketik 'saya ingin membuat email ekspor' untuk melihat template yang tersedia.";
    }
    return "Terima kasih atas pertanyaannya! Saya siap membantu dengan berbagai kebutuhan ekspor Anda. Silakan pilih salah satu fitur di samping atau tanyakan hal spesifik yang ingin Anda ketahui tentang ekspor.";
  };

  const handleCopy = (content) => {
    navigator.clipboard.writeText(content);
    alert('Content berhasil disalin!');
  };

  const handleDownload = (content, filename, isFromDocumentReady = false) => {
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
      
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      doc.text(`Generated on: ${new Date().toLocaleDateString()}`, margin, 30);
      doc.line(margin, 35, pageWidth - margin, 35);
      
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
      
      const pageCount = doc.internal.getNumberOfPages();
      for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFontSize(8);
        doc.setFont("helvetica", "italic");
        doc.text(
          `Generated by ExportHub AI Assistant - Page ${i} of ${pageCount}`,
          margin,
          doc.internal.pageSize.getHeight() - 10
        );
      }
      
      doc.save(`${filename}_${Date.now()}.pdf`);
      
      // Trigger document list after download if it's from document-ready
      if (isFromDocumentReady) {
        setTimeout(() => {
          showDocumentListAfterDownload();
          // Auto scroll to bottom after showing document list
          setTimeout(() => {
            if (messagesEndRef.current) {
              messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
            }
          }, 500);
        }, 1000);
      }
      
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('PDF generation failed.');
    }
  };

  const renderMessage = (message, index) => {
    if (message.type === 'document-list') {
      return (
        <div key={index} className="flex justify-start mb-4">
          <div className="max-w-4xl bg-blue-50 text-blue-900 px-4 py-3 rounded-2xl border border-blue-200">
            <p className="text-sm leading-relaxed mb-4">{message.text}</p>
            {/* Grid 2 kolom untuk document list */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {message.documents.map((doc) => (
                <div key={doc.id} className={`bg-white rounded-xl p-4 border transition-colors ${
                  doc.completed ? 'border-green-300 bg-green-50' : 'border-gray-200 hover:border-blue-300'
                }`}>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-1">
                        {/* Circle shape for status */}
                        {doc.completed ? (
                          <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                        ) : (
                          <div className="w-4 h-4 bg-gray-400 rounded-full"></div>
                        )}
                        <h4 className={`font-semibold text-sm ${doc.completed ? 'text-green-800' : 'text-gray-900'}`}>
                          {doc.name}
                        </h4>
                        {/* Penanda tulisan "Selesai" */}
                        {doc.completed && (
                          <span className="text-xs text-green-700 font-semibold bg-green-200 px-3 py-1 rounded-full border border-green-300">
                            Selesai
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-gray-600 mb-3 ml-7">{doc.description}</p>
                      <p className="text-xs text-gray-500 mb-3 ml-7">
                        <strong>Data yang diperlukan:</strong> {doc.fields.length} field
                      </p>
                      {!doc.completed && (
                        <div className="ml-7">
                          <button
                            onClick={() => handleDocumentSelect(doc)}
                            className="bg-blue-600 text-white text-xs px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                          >
                            Isi Dokumen Ini
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }

    if (message.type === 'email-template-list') {
      return (
        <div key={index} className="flex justify-start mb-4">
          <div className="max-w-2xl bg-green-50 text-green-900 px-4 py-3 rounded-2xl border border-green-200">
            <p className="text-sm leading-relaxed mb-4">{message.text}</p>
            <div className="space-y-3">
              {message.emailTemplates.map((template) => (
                <div key={template.id} className="bg-white rounded-xl p-4 border border-gray-200 hover:border-green-300 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="font-semibold text-gray-900 text-sm">{template.name}</h4>
                        <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded">
                          {template.category}
                        </span>
                      </div>
                      <p className="text-xs text-gray-600 mb-3">{template.description}</p>
                      <p className="text-xs text-gray-500 mb-3">
                        <strong>Data yang diperlukan:</strong> {template.fields.length} field
                      </p>
                      <button
                        onClick={() => handleEmailTemplateSelect(template)}
                        className="bg-green-600 text-white text-xs px-3 py-2 rounded-lg hover:bg-green-700 transition-colors"
                      >
                        Pilih Template
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

    if (message.type === 'document-ready') {
      return (
        <div key={index} className="flex justify-start mb-4">
          <div className="max-w-2xl bg-green-100 text-green-900 px-4 py-3 rounded-2xl border border-green-200">
            <p className="text-sm leading-relaxed mb-3">{message.text}</p>
            <div className="bg-white rounded-lg p-4 border border-gray-200 mb-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-medium text-gray-700">Generated Document:</span>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleCopy(message.content)}
                    className="text-xs text-gray-600 hover:text-gray-900 flex items-center space-x-1"
                  >
                    <Copy className="w-3 h-3" />
                    <span>Copy</span>
                  </button>
                  <button
                    onClick={() => handleDownload(message.content, lastGeneratedDocument?.name || 'document', true)}
                    className="text-xs text-gray-600 hover:text-gray-900 flex items-center space-x-1"
                  >
                    <Download className="w-3 h-3" />
                    <span>Download PDF</span>
                  </button>
                </div>
              </div>
              <div className="bg-gray-50 rounded p-3 max-h-64 overflow-y-auto">
                <pre className="text-xs text-gray-700 whitespace-pre-wrap font-mono">
                  {message.content}
                </pre>
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (message.type === 'email-ready') {
      return (
        <div key={index} className="flex justify-start mb-4">
          <div className="max-w-2xl bg-green-100 text-green-900 px-4 py-3 rounded-2xl border border-green-200">
            <p className="text-sm leading-relaxed mb-3">{message.text}</p>
            <div className="bg-white rounded-lg p-4 border border-gray-200 mb-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-medium text-gray-700">Generated Email:</span>
                <button
                  onClick={() => handleCopy(message.content)}
                  className="text-xs text-gray-600 hover:text-gray-900 flex items-center space-x-1"
                >
                  <Copy className="w-3 h-3" />
                  <span>Copy Email</span>
                </button>
              </div>
              <div className="bg-gray-50 rounded p-3 max-h-64 overflow-y-auto">
                <pre className="text-xs text-gray-700 whitespace-pre-wrap font-mono">
                  {message.content}
                </pre>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div key={index} className={`flex ${message.from === "user" ? "justify-end" : "justify-start"} mb-4`}>
        <div className={`max-w-xs lg:max-w-md ${
          message.from === "user" 
            ? "bg-gray-900 text-white" 
            : "bg-gray-100 text-gray-900"
        } px-3 lg:px-4 py-2 lg:py-3 rounded-2xl`}>
          <p className="text-sm leading-relaxed whitespace-pre-line">{message.text}</p>
          
          {message.content && message.type !== 'document-ready' && message.type !== 'email-ready' && (
            <div className="mt-3 bg-white rounded-lg p-2 lg:p-3 border">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-gray-700">Generated Content:</span>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleCopy(message.content)}
                    className="text-xs text-gray-600 hover:text-gray-900 flex items-center space-x-1"
                  >
                    <Copy className="w-3 h-3" />
                    <span className="hidden sm:inline">Copy</span>
                  </button>
                  <button
                    onClick={() => handleDownload(message.content, message.type, false)}
                    className="text-xs text-gray-600 hover:text-gray-900 flex items-center space-x-1"
                  >
                    <Download className="w-3 h-3" />
                    <span className="hidden sm:inline">Download PDF</span>
                  </button>
                </div>
              </div>
              <div className="bg-gray-50 rounded p-2 max-h-32 overflow-y-auto">
                <pre className="text-xs text-gray-700 whitespace-pre-wrap font-mono">
                  {message.content}
                </pre>
              </div>
            </div>
          )}
          
          {message.type === "generating" && isGenerating && (
            <div className="mt-2 flex items-center space-x-2">
              <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-current"></div>
              <span className="text-xs">Generating...</span>
            </div>
          )}
          
          <div className="text-xs opacity-70 mt-2">{message.timestamp}</div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8 overflow-hidden">
      <div className="max-w-7xl mx-auto overflow-hidden">
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 h-[calc(100vh-2rem)] md:h-[calc(100vh-3rem)] lg:h-[calc(100vh-4rem)] overflow-hidden">
          
          {/* Sidebar - AI Assistant */}
          <div className="flex-none w-full lg:w-80 h-64 lg:h-full overflow-hidden">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 lg:p-6 h-full flex flex-col overflow-hidden">
              <div className="flex items-center space-x-3 mb-4 lg:mb-6">
                <div className="w-8 h-8 lg:w-10 lg:h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Bot className="w-4 h-4 lg:w-5 lg:h-5 text-white" />
                </div>
                <h1 className="text-lg lg:text-xl font-bold text-gray-900">AI Assistant</h1>
              </div>
              
              <div className="flex-1 overflow-y-auto">
                <h3 className="text-sm font-semibold text-gray-700 mb-3">Quick Actions</h3>
                <div className="grid grid-cols-2 lg:grid-cols-1 gap-2 lg:gap-3">
                  {featureSuggestions.map((feature) => (
                    <button
                      key={feature.id}
                      onClick={() => handleFeatureClick(feature)}
                      className="w-full bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg p-3 lg:p-4 transition-all text-left group"
                    >
                      <div className="flex items-center space-x-2 lg:space-x-3">
                        <div className="text-gray-600 flex-shrink-0">
                          {feature.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-gray-900 text-xs lg:text-sm truncate">{feature.title}</div>
                          <div className="text-xs text-gray-600 mt-1 hidden lg:block">{feature.description}</div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
                
              <div className="pt-4 border-t border-gray-100 mt-4 lg:mt-6 hidden lg:block">
                <p className="text-xs text-gray-500">
                  💡 Tip: Klik quick action di atas atau ketik pertanyaan langsung di chat
                </p>
              </div>
            </div>
          </div>

          {/* Chat Container */}
          <div className="flex-1 overflow-hidden">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 h-full flex flex-col relative overflow-hidden">
              
              {/* Chat Messages */}
              <div 
                ref={chatContainerRef}
                className="flex-1 overflow-y-auto p-4 lg:p-6 space-y-4"
              >
                {messages.map((message, index) => renderMessage(message, index))}
                {/* Auto scroll anchor */}
                <div ref={messagesEndRef} />
              </div>

              {/* Suggestions Bar */}
              <div className="border-t border-gray-100 bg-gray-50 p-3">
                <div className="flex items-center space-x-2 mb-2">
                  <Lightbulb className="w-4 h-4 text-orange-500" />
                  <span className="text-sm font-medium text-gray-700">Pertanyaan Umum:</span>
                </div>
                <div 
                  className="overflow-x-auto"
                  style={{
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none',
                  }}
                >
                  <style jsx>{`
                    div::-webkit-scrollbar {
                      display: none;
                    }
                  `}</style>
                  <div className="flex space-x-2">
                    {generalSuggestions.map((suggestion, index) => (
                      <button
                        key={index}
                        onClick={() => handleSuggestionClick(suggestion)}
                        className="flex-shrink-0 text-xs bg-white hover:bg-blue-50 hover:text-blue-700 border border-gray-200 hover:border-blue-300 rounded-full px-3 py-2 transition-all whitespace-nowrap"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Input Section */}
              <div className="border-t border-gray-100 p-3 lg:p-4 bg-white">
                <div className="flex space-x-2 lg:space-x-3">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSend()}
                    placeholder={
                      currentFlow === 'document-form' && selectedDocument 
                        ? `Masukkan ${selectedDocument.fields[currentFieldIndex]?.toLowerCase()}...`
                        : currentFlow === 'email-form' && selectedEmailTemplate
                        ? `Masukkan ${selectedEmailTemplate.fields[currentFieldIndex]?.toLowerCase()}...`
                        : "Ketik pertanyaan Anda di sini..."
                    }
                    className="flex-1 border border-gray-200 rounded-lg px-3 lg:px-4 py-2 lg:py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    disabled={isGenerating}
                  />
                  <button
                    onClick={handleSend}
                    disabled={!input.trim() || isGenerating}
                    className="bg-gray-900 text-white px-4 lg:px-6 py-2 lg:py-3 rounded-lg hover:bg-gray-800 transition-colors flex items-center space-x-1 lg:space-x-2 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="w-4 h-4" />
                    <span className="hidden sm:inline">Kirim</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
