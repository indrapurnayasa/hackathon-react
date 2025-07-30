// src/utils/enhancedChatbotSystem.js
import aiAssistantMockData from "./aiAssistantMockData.js";
// import CostCalculator from '../components/ai-assistant/CostCalculator.js'; // Unused for now
import DocumentGenerator from "../components/ai-assistant/DocumentGenerator.js";
import EmailGenerator from "../components/ai-assistant/EmailGenerator.js";
import ProposalGenerator from "../components/ai-assistant/ProposalGenerator.js";

class EnhancedChatbotSystem {
  static init() {
    this.mockData = aiAssistantMockData;
    this.conversationHistory = [];
    this.userProfile = null;
    this.currentContext = null;
  }

  // ===== ENHANCED COST CALCULATOR =====
  static enhancedCostCalculation(userInput, setMessages) {
    const input = userInput.toLowerCase();

    // Detect product from input or use random
    let selectedProduct =
      this.detectProductFromInput(input) ||
      this.mockData.utils.getRandomElement(
        this.mockData.costCalculator.products
      );

    // Detect destination or use random
    let selectedDestination =
      this.detectDestinationFromInput(input) ||
      this.mockData.costCalculator.destinations.find(
        (dest) =>
          input.includes(dest.name.toLowerCase()) ||
          input.includes(dest.region.toLowerCase()) ||
          (dest.name === "Amerika Serikat" &&
            (input.includes("usa") || input.includes("america"))) ||
          (dest.name === "Jepang" && input.includes("japan"))
      );

    // Detect weight/quantity from input
    const detectedWeight = this.detectWeightFromInput(input);
    if (detectedWeight) {
      selectedProduct = { ...selectedProduct, weight: detectedWeight };
    }

    // Calculate enhanced costs
    const calculation = this.calculateEnhancedCosts(
      selectedProduct,
      selectedDestination
    );

    // Create detailed response message
    const botMessage = {
      from: "bot",
      text: `Berdasarkan analisis input Anda, berikut estimasi biaya ekspor untuk ${selectedProduct.name} ke ${selectedDestination.name}:`,
      type: "enhanced-cost-estimation",
      content: {
        productInfo: {
          name: selectedProduct.name,
          category: selectedProduct.category,
          hsCode: selectedProduct.hsCode,
          weight: `${selectedProduct.weight.toLocaleString()} kg`,
          value: this.mockData.utils.formatCurrency(
            selectedProduct.baseValue * selectedDestination.multiplier
          ),
          destination: selectedDestination.name,
          region: selectedDestination.region,
        },
        costs: calculation.costs,
        taxes: calculation.taxes,
        total: calculation.total,
        additionalInfo: {
          shippingTime: this.getEstimatedShippingTime(
            selectedDestination.region
          ),
          documentation: this.getRequiredDocuments(selectedProduct.category),
          paymentTerms: this.getRecommendedPaymentTerms(
            selectedDestination.region
          ),
        },
      },
      timestamp: new Date().toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, botMessage]);
  }

  // ===== ENHANCED DOCUMENT GENERATOR =====
  static enhancedDocumentGeneration(
    userInput,
    setMessages,
    setCurrentFlow,
    setCompletedDocuments,
    additionalParams
  ) {
    const input = userInput.toLowerCase();

    // Detect specific document request
    const requestedDocument = this.detectDocumentFromInput(input);

    console.log("Enhanced document generation:", { input, requestedDocument });

    // Check for general document questions that should show document list
    const generalDocumentQuestions = [
      "dokumen apa saja",
      "dokumen yang diperlukan",
      "dokumen ekspor",
      "export documents",
      "what documents",
      "which documents",
      "dokumen yang dibutuhkan",
      "dokumen wajib",
      "required documents",
      "mandatory documents",
      "dokumen ekspor resmi",
      "buat dokumen ekspor",
      "generate dokumen ekspor",
    ];

    const isGeneralDocumentQuestion = generalDocumentQuestions.some(
      (question) => input.includes(question)
    );

    if (requestedDocument) {
      // Generate specific document with enhanced data
      console.log("Generating specific document:", requestedDocument);
      this.generateEnhancedDocument(
        requestedDocument,
        setMessages,
        setCompletedDocuments,
        additionalParams.setIsTyping
      );
    } else if (isGeneralDocumentQuestion) {
      // Show enhanced document list with recommendations
      console.log("Showing document list for general question");
      this.showEnhancedDocumentList(setMessages, setCurrentFlow, input);
    } else {
      // Show enhanced document list with recommendations
      console.log("Showing document list");
      this.showEnhancedDocumentList(setMessages, setCurrentFlow, input);
    }
  }

  static generateEnhancedDocument(
    documentType,
    setMessages,
    setCompletedDocuments,
    setIsTyping
  ) {
    const document = DocumentGenerator.exportDocuments.find(
      (doc) =>
        doc.id === documentType || doc.name.toLowerCase().includes(documentType)
    );

    if (!document) return;

    // Show typing animation
    setIsTyping(true);

    // Simulate processing time
    setTimeout(() => {
      setIsTyping(false);

      // Get enhanced dummy data based on context
      const enhancedData = this.generateEnhancedDocumentData(document);

      const content = this.createEnhancedDocumentContent(
        document,
        enhancedData
      );

      if (setCompletedDocuments) {
        setCompletedDocuments((prevCompleted) => {
          const newCompleted = new Set(prevCompleted);
          newCompleted.add(document.id);
          return newCompleted;
        });
      }

      const completedMessage = {
        from: "bot",
        text: `✅ ${document.name} telah berhasil dibuat dengan data lengkap dan akurat!`,
        timestamp: new Date().toLocaleTimeString("id-ID", {
          hour: "2-digit",
          minute: "2-digit",
        }),
        type: "enhanced-document-ready",
        content: content,
        documentName: document.name,
        additionalFeatures: {
          autoCompleteFields: true,
          validationChecks: true,
          complianceVerified: true,
        },
      };

      setMessages((prev) => [...prev, completedMessage]);
    }, 2000); // 2 second delay for typing animation
  }

  // ===== ENHANCED EMAIL GENERATOR =====
  static enhancedEmailGeneration(userInput, setMessages) {
    const input = userInput.toLowerCase();

    // Detect email type from input
    const emailType = this.detectEmailTypeFromInput(input);
    const template =
      EmailGenerator.exportEmailTemplates.find(
        (t) => t.id === emailType || t.category.toLowerCase() === emailType
      ) ||
      this.mockData.utils.getRandomElement(EmailGenerator.exportEmailTemplates);

    // Generate enhanced email with smart content
    const enhancedEmailData = this.generateEnhancedEmailData(template, input);
    const content = this.generateEnhancedEmail(template, enhancedEmailData);

    const completedMessage = {
      from: "bot",
      text: `✅ ${template.name} telah dibuat dengan konten yang disesuaikan untuk kebutuhan ekspor Anda!`,
      timestamp: new Date().toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      type: "enhanced-email-ready",
      content: content,
      emailType: template.category,
      smartFeatures: {
        contextAware: true,
        industrySpecific: true,
        professionalTone: true,
      },
    };

    setMessages((prev) => [...prev, completedMessage]);
  }

  // ===== ENHANCED PROPOSAL GENERATOR =====
  static enhancedProposalGeneration(userInput, setMessages) {
    const input = userInput.toLowerCase();

    // Detect proposal type and context
    const proposalType = this.detectProposalTypeFromInput(input);
    const template =
      ProposalGenerator.proposalTemplates.find(
        (t) =>
          t.id === proposalType || t.name.toLowerCase().includes(proposalType)
      ) ||
      this.mockData.utils.getRandomElement(ProposalGenerator.proposalTemplates);

    // Generate enhanced proposal with comprehensive data
    const enhancedProposalData = this.generateEnhancedProposalData(
      template,
      input
    );
    const content = this.generateEnhancedProposal(
      template,
      enhancedProposalData
    );

    const completedMessage = {
      from: "bot",
      text: `✅ ${template.name} telah dibuat dengan proyeksi finansial dan strategi bisnis yang komprehensif!`,
      timestamp: new Date().toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      type: "enhanced-proposal-ready",
      content: content,
      proposalName: template.name,
      businessInsights: {
        marketAnalysis: true,
        financialProjections: true,
        riskAssessment: true,
        competitiveAdvantage: true,
      },
    };

    setMessages((prev) => [...prev, completedMessage]);
  }

  // ===== UTILITY METHODS =====
  static detectProductFromInput(input) {
    return this.mockData.costCalculator.products.find(
      (product) =>
        input.includes(product.name.toLowerCase()) ||
        input.includes(product.category) ||
        (product.name.includes("Kopi") && input.includes("coffee")) ||
        (product.name.includes("Rempah") && input.includes("spice")) ||
        (product.name.includes("Tekstil") && input.includes("textile")) ||
        (product.name.includes("Udang") && input.includes("shrimp"))
    );
  }

  static detectDestinationFromInput(input) {
    return this.mockData.costCalculator.destinations.find(
      (dest) =>
        input.includes(dest.name.toLowerCase()) ||
        input.includes(dest.region.toLowerCase()) ||
        (dest.name === "Amerika Serikat" &&
          (input.includes("usa") || input.includes("america"))) ||
        (dest.name === "Jepang" && input.includes("japan"))
    );
  }

  static detectWeightFromInput(input) {
    const tonMatch = input.match(/(\d+)\s*ton/);
    if (tonMatch) return parseInt(tonMatch[1]) * 1000;

    const kgMatch = input.match(/(\d+)\s*kg/);
    if (kgMatch) return parseInt(kgMatch[1]);

    return null;
  }

  static detectDocumentFromInput(input) {
    const documents = {
      peb: [
        "peb",
        "pemberitahuan ekspor",
        "export declaration",
        "buat peb",
        "generate peb",
        "cara buat peb",
      ],
      invoice: [
        "invoice",
        "commercial invoice",
        "tagihan",
        "buat invoice",
        "generate invoice",
        "cara buat invoice",
      ],
      ska: [
        "ska",
        "certificate of origin",
        "surat keterangan asal",
        "buat ska",
        "generate ska",
        "cara buat ska",
        "preferensi tarif",
        "tariff preference",
      ],
      packinglist: [
        "packing list",
        "daftar kemasan",
        "buat packing list",
        "generate packing list",
        "cara buat packing list",
      ],
      bl: [
        "bill of lading",
        "b/l",
        "konosemen",
        "bl",
        "buat bl",
        "generate bl",
        "cara buat bl",
      ],
      insurance: [
        "insurance",
        "asuransi",
        "marine insurance",
        "buat insurance",
        "generate insurance",
        "cara buat insurance",
      ],
    };

    for (const [docType, keywords] of Object.entries(documents)) {
      if (keywords.some((keyword) => input.includes(keyword))) {
        return docType;
      }
    }
    return null;
  }

  static detectEmailTypeFromInput(input) {
    if (input.includes("inquiry") || input.includes("tanya"))
      return "product-inquiry";
    if (input.includes("introduction") || input.includes("perkenalan"))
      return "business-introduction";
    if (input.includes("offer") || input.includes("penawaran"))
      return "export-offer";
    return null;
  }

  static detectProposalTypeFromInput(input) {
    if (input.includes("partnership") || input.includes("kerjasama"))
      return "business-proposal";
    if (input.includes("export business") || input.includes("bisnis ekspor"))
      return "export-proposal";
    return null;
  }

  static calculateEnhancedCosts(product, destination) {
    const baseValue = Math.round(product.baseValue * destination.multiplier);
    const structure = this.mockData.costCalculator.costStructure;

    const costs = {
      fob: baseValue,
      freight: Math.round(baseValue * structure.freight),
      insurance: Math.round(baseValue * structure.insurance),
      handling: Math.round(baseValue * structure.handling),
      documentation: structure.documentation,
      customs: Math.round(baseValue * structure.customs),
    };

    const taxes = {
      pph: Math.round(baseValue * structure.pph),
      pungutan: Math.round(baseValue * structure.pungutan),
    };

    const total =
      Object.values(costs).reduce((sum, cost) => sum + cost, 0) +
      Object.values(taxes).reduce((sum, tax) => sum + tax, 0);

    return { costs, taxes, total };
  }

  static generateEnhancedDocumentData(document) {
    const exporter = this.mockData.utils.getRandomElement(
      this.mockData.documentGenerator.companies.exporter
    );
    const importer = this.mockData.utils.getRandomElement(
      this.mockData.documentGenerator.companies.importer
    );
    const product = this.mockData.utils.getRandomElement(
      this.mockData.costCalculator.products
    );

    return {
      // Exporter data
      "Nama Eksportir": exporter.name,
      "Alamat Eksportir": exporter.address,
      "NPWP Eksportir": exporter.npwp,

      // Importer data
      "Nama Penerima": importer.name,
      "Alamat Penerima": importer.address,
      "Negara Tujuan": importer.address.split(", ").pop(),

      // Product data
      "Deskripsi Barang": product.name,
      "Kode HS": product.hsCode,

      // Document specific data
      "Nomor Invoice": this.mockData.utils.generateDocumentNumber("INV"),
      "Tanggal Invoice": this.mockData.utils.getCurrentDate(),
      "Total Nilai": this.mockData.utils.formatCurrency(
        product.baseValue,
        "USD"
      ),

      // Additional enhanced fields
      "Berat Bersih": `${product.weight} kg`,
      "Berat Kotor": `${Math.round(product.weight * 1.05)} kg`,
      "Jumlah Kemasan": `${Math.ceil(product.weight / 50)} bags`,
      "Jenis Kemasan": this.mockData.utils.getRandomElement(
        this.mockData.documentGenerator.documentTemplates.packingList
          .packagingTypes
      ),
    };
  }

  static generateEnhancedEmailData(template, userInput) {
    const sender = this.mockData.utils.getRandomElement(
      this.mockData.emailGenerator.senderProfiles
    );
    const recipient = this.mockData.utils.getRandomElement(
      this.mockData.emailGenerator.recipientProfiles
    );
    const product = this.mockData.utils.getRandomElement(
      this.mockData.emailGenerator.productOfferings
    );

    return {
      // Sender data
      "Nama Perusahaan Anda": sender.company,
      "Nama Anda": sender.name,
      "Jabatan Anda": sender.position,
      "Email Perusahaan": sender.email,
      "Website Perusahaan": sender.website,
      "Tahun Berdiri": sender.established,
      "Jenis Bisnis": sender.business,
      "Produk Utama": sender.mainProducts,

      // Recipient data
      "Nama Penerima": recipient.name,
      "Perusahaan Penerima": recipient.company,

      // Product data
      "Produk yang Diminati": product.name,
      "Nama Produk": product.name,
      "Deskripsi Produk": product.description,
      Quantity: product.quantity,
      "Harga per Unit": product.price,
    };
  }

  static generateEnhancedProposalData(template, userInput) {
    const company = this.mockData.utils.getRandomElement(
      this.mockData.proposalGenerator.companyCapabilities
    );
    const partnership = this.mockData.utils.getRandomElement(
      this.mockData.proposalGenerator.partnershipTypes
    );
    const projection = this.mockData.utils.getRandomElement(
      this.mockData.proposalGenerator.financialProjections
    );

    return {
      // Company data
      "Nama Perusahaan Anda": company.name,
      "Alamat Perusahaan": company.address,
      "Nama CEO/Direktur": company.ceo,
      "Tahun Berdiri": company.established,
      "Bidang Usaha": company.business,

      // Partnership data
      "Jenis Kerjasama": partnership.type,
      "Produk/Layanan": company.mainProducts,
      "Target Market": company.targetMarkets.join(", "),

      // Financial projections
      "Proyeksi Keuntungan": projection.yearlyRevenue,

      // Additional enhanced data
      "Kapasitas Produksi": company.capacity,
      Sertifikasi: company.certifications.join(", "),
      "Pengalaman Ekspor": company.experience,
      "Keunggulan Produk": company.advantages.join(", "),
      "Timeline Pengiriman": "30 days after order confirmation",
    };
  }

  // ===== ENHANCED CONTENT GENERATION =====
  static createEnhancedDocumentContent(document, data) {
    // Use existing DocumentGenerator but with enhanced data
    return DocumentGenerator.createDocumentContent(document, data);
  }

  static generateEnhancedEmail(template, data) {
    // Use existing EmailGenerator but with enhanced data
    return EmailGenerator.generateEmailFromTemplate(template, data);
  }

  static generateEnhancedProposal(template, data) {
    // Use existing ProposalGenerator but with enhanced data
    return ProposalGenerator.generateProposalContent(template, data);
  }

  static showEnhancedDocumentList(setMessages, setCurrentFlow, input) {
    // Enhanced document list with contextual recommendations
    const recommendations = this.getDocumentRecommendations(input);

    setCurrentFlow("document-list");
    const documents = DocumentGenerator.exportDocuments.map((doc) => ({
      ...doc,
      recommended: recommendations.includes(doc.id),
      completed: false, // Reset for enhanced system
    }));

    const botMessage = {
      from: "bot",
      text: "Berdasarkan analisis kebutuhan Anda, berikut dokumen ekspor yang direkomendasikan:",
      timestamp: new Date().toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      type: "enhanced-document-list",
      documents: documents,
      recommendations: recommendations,
    };
    setMessages((prev) => [...prev, botMessage]);
  }

  static getDocumentRecommendations(input) {
    const recommendations = [];

    // Basic export process
    if (input.includes("ekspor") || input.includes("export")) {
      recommendations.push("peb", "invoice", "ska");
    }

    // Specific product types
    if (
      input.includes("agriculture") ||
      input.includes("kopi") ||
      input.includes("rempah")
    ) {
      recommendations.push("ska", "invoice");
    }

    // Shipping related
    if (input.includes("shipping") || input.includes("kirim")) {
      recommendations.push("bl", "packinglist", "insurance");
    }

    // Always recommend basic documents if no specific match
    if (recommendations.length === 0) {
      recommendations.push("peb", "invoice", "packinglist");
    }

    return recommendations;
  }

  static getEstimatedShippingTime(region) {
    const times = {
      "Asia Tenggara": "3-5 hari",
      "Asia Timur": "7-10 hari",
      "Amerika Utara": "14-18 hari",
      Eropa: "15-20 hari",
      Oseania: "10-14 hari",
      "Timur Tengah": "12-16 hari",
    };
    return times[region] || "7-14 hari";
  }

  static getRequiredDocuments(category) {
    const docs = {
      agricultural: [
        "Phytosanitary Certificate",
        "Certificate of Origin",
        "Health Certificate",
      ],
      seafood: [
        "Health Certificate",
        "Catch Certificate",
        "Processing Certificate",
      ],
      textile: [
        "Textile Declaration",
        "Certificate of Origin",
        "Quality Certificate",
      ],
      furniture: ["Wood Legal Certificate", "Fumigation Certificate"],
      oil: [
        "Quality Certificate",
        "Health Certificate",
        "Certificate of Origin",
      ],
    };
    return docs[category] || ["Certificate of Origin", "Quality Certificate"];
  }

  static getRecommendedPaymentTerms(region) {
    const terms = {
      "Asia Tenggara": "T/T 30 days",
      "Asia Timur": "L/C at sight",
      "Amerika Utara": "T/T 45 days",
      Eropa: "T/T 60 days",
      Oseania: "T/T 30 days",
      "Timur Tengah": "L/C 30 days",
    };
    return terms[region] || "T/T 30 days";
  }

  // ===== INTELLIGENT RESPONSE SYSTEM =====
  static getIntelligentResponse(userInput, setMessages, additionalParams = {}) {
    const input = userInput.toLowerCase();

    // Detect intent from user input
    if (this.isCalculationRequest(input)) {
      this.enhancedCostCalculation(userInput, setMessages);
      return true;
    } else if (this.isDocumentRequest(input)) {
      this.enhancedDocumentGeneration(
        userInput,
        setMessages,
        additionalParams.setCurrentFlow,
        additionalParams.setCompletedDocuments,
        additionalParams
      );
      return true;
    } else if (this.isEmailRequest(input)) {
      this.enhancedEmailGeneration(userInput, setMessages);
      return true;
    } else if (this.isProposalRequest(input)) {
      this.enhancedProposalGeneration(userInput, setMessages);
      return true;
    } else if (this.isGeneralQuestion(input)) {
      this.handleGeneralQuestion(userInput, setMessages);
      return true;
    } else {
      // Return false to let main system handle general response
      return false;
    }
  }

  static isCalculationRequest(input) {
    const keywords = [
      "biaya",
      "harga",
      "cost",
      "calculate",
      "kalkulasi",
      "estimasi",
      "price",
    ];
    return keywords.some((keyword) => input.includes(keyword));
  }

  static isDocumentRequest(input) {
    const keywords = [
      "dokumen",
      "document",
      "surat",
      "certificate",
      "invoice",
      "peb",
      "packing list",
      "bill of lading",
      "ska",
      "certificate of origin",
      "asuransi",
      "insurance",
      "buat dokumen",
      "generate document",
      "cara buat",
      "how to make",
      "template",
      "form",
      "formulir",
      "sertifikat",
      "konosemen",
      "bl",
      "b/l",
      "tagihan",
      "commercial invoice",
      "daftar kemasan",
      "marine insurance",
      "export declaration",
      "pemberitahuan ekspor",
      "surat keterangan asal",
      "preferensi tarif",
      "tariff preference",
    ];
    return keywords.some((keyword) => input.includes(keyword));
  }

  static isEmailRequest(input) {
    const keywords = ["email", "surat", "inquiry", "offer", "introduction"];
    return keywords.some((keyword) => input.includes(keyword));
  }

  static isProposalRequest(input) {
    const keywords = ["proposal", "kerjasama", "partnership", "business"];
    return keywords.some((keyword) => input.includes(keyword));
  }

  static isGeneralQuestion(input) {
    const generalKeywords = [
      "apa",
      "bagaimana",
      "kapan",
      "dimana",
      "siapa",
      "mengapa",
      "kenapa",
      "jelaskan",
      "pengertian",
      "definisi",
      "arti",
      "apa itu",
      "apa sih",
      "gimana",
      "cara",
      "tips",
      "saran",
      "rekomendasi",
      "bantuan",
      "help",
      "what",
      "how",
      "when",
      "where",
      "why",
      "who",
      "explain",
      "definition",
      "meaning",
      "tips",
      "advice",
      "recommendation",
      "help",
    ];
    return generalKeywords.some((keyword) => input.includes(keyword));
  }

  static handleGeneralQuestion(userInput, setMessages) {
    const input = userInput.toLowerCase();

    // Check if it's actually a document request first
    const requestedDocument = this.detectDocumentFromInput(input);
    if (requestedDocument) {
      // This is actually a document request, not a general question
      return false; // Let the main system handle it as document request
    }

    // Check for general document questions that should be handled by document system
    const generalDocumentQuestions = [
      "dokumen apa saja",
      "dokumen yang diperlukan",
      "dokumen ekspor",
      "export documents",
      "what documents",
      "which documents",
      "dokumen yang dibutuhkan",
      "dokumen wajib",
      "required documents",
      "mandatory documents",
      "dokumen ekspor resmi",
      "buat dokumen ekspor",
      "generate dokumen ekspor",
    ];

    const isGeneralDocumentQuestion = generalDocumentQuestions.some(
      (question) => input.includes(question)
    );

    if (isGeneralDocumentQuestion) {
      // This should be handled by document system, not general questions
      return false;
    }

    // Define only 7 essential general questions
    const mockResponses = {
      // 1. Email generation
      email:
        "Saya dapat membuat email bisnis profesional untuk inquiry, penawaran, dan perkenalan bisnis ekspor. Silakan sebutkan jenis email yang Anda butuhkan.",

      // 2. Proposal generation
      proposal:
        "Saya dapat membuat proposal bisnis lengkap untuk partnership, kerjasama ekspor, dan presentasi perusahaan. Silakan sebutkan jenis proposal yang Anda butuhkan.",

      // 3. Cost estimation
      biaya:
        "Saya dapat menghitung estimasi biaya ekspor secara detail. Termasuk FOB, freight, asuransi, handling, dokumentasi, dan pajak. Silakan berikan detail produk dan tujuan.",

      // 4. Document list request
      "dokumen ekspor resmi":
        "Saya dapat membantu membuat dokumen ekspor resmi. Berikut adalah dokumen yang tersedia: PEB (Pemberitahuan Ekspor Barang), Commercial Invoice, Packing List, Bill of Lading, SKA/Certificate of Origin, dan Marine Insurance. Silakan pilih dokumen yang Anda butuhkan.",

      // 5. Customs calculation
      "bea cukai":
        "Berdasarkan perhitungan bea cukai untuk ekspor, estimasi biaya yang diperlukan: PPh Ekspor 2.5% dari nilai FOB, Pungutan Ekspor 0.5% dari nilai FOB, Bea Masuk 0% (untuk sebagian besar produk), dan PPN 0% untuk ekspor. Total estimasi bea cukai sekitar 3% dari nilai FOB.",

      // 6. How to questions
      cara: "Saya dapat membantu menjelaskan cara membuat email, proposal, dan menghitung biaya ekspor. Silakan sebutkan yang spesifik yang ingin Anda ketahui.",

      // 7. What is questions
      "apa itu":
        "Saya dapat menjelaskan berbagai aspek ekspor seperti email bisnis, proposal, dan komponen biaya. Silakan sebutkan yang ingin Anda ketahui.",
    };

    // Find the most relevant response
    let bestResponse = null;
    let bestMatch = 0;

    for (const [keyword, response] of Object.entries(mockResponses)) {
      if (input.includes(keyword) && keyword.length > bestMatch) {
        bestResponse = response;
        bestMatch = keyword.length;
      }
    }

    // If no specific match found, provide a general helpful response
    if (!bestResponse) {
      bestResponse = this.mockData.utils.getRandomElement([
        "Saya dapat membantu Anda dengan tiga fitur utama: 📧 Generate Email (inquiry, penawaran), 🤝 Generate Proposal (partnership), dan 💰 Estimasi Biaya (FOB, freight, dll). Silakan sebutkan yang Anda butuhkan!",
        "Untuk ekspor, saya dapat membantu dengan: email bisnis profesional, proposal kerjasama, dan kalkulasi biaya detail. Fitur mana yang ingin Anda gunakan?",
        "Saya siap membantu dengan semua kebutuhan ekspor: pembuatan email bisnis, proposal partnership, dan estimasi biaya. Silakan pilih layanan yang Anda butuhkan.",
      ]);
    }

    // Create bot message with typing delay
    const botMessage = {
      from: "bot",
      text: bestResponse,
      timestamp: new Date().toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, botMessage]);
  }

  static getGeneralResponse(userInput, setMessages) {
    const input = userInput.toLowerCase();

    // Try to find a matching question from commonQA
    const matchingQA = this.mockData.chatbotResponses.commonQA.find(
      (qa) =>
        input.includes(qa.question.toLowerCase().replace(/[?]/g, "")) ||
        qa.question.toLowerCase().includes(input)
    );

    if (matchingQA) {
      // Use the specific answer from mock data
      const botMessage = {
        from: "bot",
        text: matchingQA.answer,
        timestamp: new Date().toLocaleTimeString("id-ID", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setMessages((prev) => [...prev, botMessage]);
      return;
    }

    // If no specific match, get contextual response from mock data
    const response = this.mockData.utils.getRandomElement(
      this.mockData.chatbotResponses.welcomeMessages
    );

    const botMessage = {
      from: "bot",
      text:
        response +
        " Silakan jelaskan kebutuhan ekspor Anda, dan saya akan membantu dengan solusi yang tepat!",
      timestamp: new Date().toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, botMessage]);
  }
}

// Initialize the enhanced system
EnhancedChatbotSystem.init();

export default EnhancedChatbotSystem;
