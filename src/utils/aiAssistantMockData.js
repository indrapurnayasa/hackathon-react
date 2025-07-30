// src/utils/aiAssistantMockData.js
// Mock data untuk AI Assistant components

export const aiAssistantMockData = {
  // ===== COST CALCULATOR MOCK DATA =====
  costCalculator: {
    // Variasi produk untuk cost calculation
    products: [
      {
        name: "Kopi Arabika Premium",
        baseValue: 12000000, // Rp 12 juta
        weight: 1000, // kg
        hsCode: "0901.11.00",
        category: "agricultural",
      },
      {
        name: "Rempah-rempah Organik",
        baseValue: 8000000, // Rp 8 juta
        weight: 500, // kg
        hsCode: "0910.10.00",
        category: "agricultural",
      },
      {
        name: "Tekstil Batik Premium",
        baseValue: 15000000, // Rp 15 juta
        weight: 300, // kg
        hsCode: "6214.10.00",
        category: "textile",
      },
      {
        name: "Udang Beku Grade A",
        baseValue: 18000000, // Rp 18 juta
        weight: 800, // kg
        hsCode: "0306.17.00",
        category: "seafood",
      },
      {
        name: "Minyak Kelapa Virgin",
        baseValue: 10000000, // Rp 10 juta
        weight: 1200, // kg
        hsCode: "1513.11.00",
        category: "oil",
      },
      {
        name: "Furniture Kayu Jati",
        baseValue: 25000000, // Rp 25 juta
        weight: 2000, // kg
        hsCode: "9403.60.00",
        category: "furniture",
      },
    ],

    // Growth classification
    growthClassification: {
      SANGAT_TINGGI: { min: 100, label: "Sangat Tinggi", color: "#10B981" }, // Green
      TINGGI: { min: 50, max: 99.99, label: "Tinggi", color: "#3B82F6" }, // Blue
      MEDIUM: { min: 10, max: 49.99, label: "Medium", color: "#F59E0B" }, // Yellow
      LOW: { min: 0, max: 9.99, label: "Low", color: "#EF4444" }, // Red
    },

    // Variasi negara tujuan dengan multiplier harga dan demand growth
    destinations: [
      {
        name: "Singapura",
        multiplier: 1.1,
        region: "Asia Tenggara",
        demandGrowth: 45.5, // Medium
        topProducts: [
          "Rempah-rempah Organik",
          "Udang Beku Grade A",
          "Kopi Arabika Premium",
        ],
      },
      {
        name: "Malaysia",
        multiplier: 1.0,
        region: "Asia Tenggara",
        demandGrowth: 8.5, // Low
        topProducts: ["Minyak Kelapa Virgin", "Furniture Kayu Jati"],
      },
      {
        name: "Thailand",
        multiplier: 1.05,
        region: "Asia Tenggara",
        demandGrowth: 15.2, // Medium
        topProducts: ["Tekstil Batik Premium", "Kopi Arabika Premium"],
      },
      {
        name: "Jepang",
        multiplier: 1.4,
        region: "Asia Timur",
        demandGrowth: 125.8, // Sangat Tinggi
        topProducts: [
          "Udang Beku Grade A",
          "Kopi Arabika Premium",
          "Rempah-rempah Organik",
        ],
      },
      {
        name: "Korea Selatan",
        multiplier: 1.3,
        region: "Asia Timur",
        demandGrowth: 85.3, // Tinggi
        topProducts: ["Kopi Arabika Premium", "Rempah-rempah Organik"],
      },
      {
        name: "China",
        multiplier: 1.2,
        region: "Asia Timur",
        demandGrowth: 155.7, // Sangat Tinggi
        topProducts: [
          "Udang Beku Grade A",
          "Minyak Kelapa Virgin",
          "Rempah-rempah Organik",
        ],
      },
      {
        name: "Amerika Serikat",
        multiplier: 1.6,
        region: "Amerika Utara",
        demandGrowth: 75.4, // Tinggi
        topProducts: [
          "Kopi Arabika Premium",
          "Tekstil Batik Premium",
          "Furniture Kayu Jati",
        ],
      },
      {
        name: "Kanada",
        multiplier: 1.5,
        region: "Amerika Utara",
        demandGrowth: 25.8, // Medium
        topProducts: ["Kopi Arabika Premium", "Furniture Kayu Jati"],
      },
      {
        name: "Jerman",
        multiplier: 1.45,
        region: "Eropa",
        demandGrowth: 95.2, // Tinggi
        topProducts: [
          "Kopi Arabika Premium",
          "Rempah-rempah Organik",
          "Tekstil Batik Premium",
        ],
      },
      {
        name: "Belanda",
        multiplier: 1.4,
        region: "Eropa",
        demandGrowth: 115.3, // Sangat Tinggi
        topProducts: ["Rempah-rempah Organik", "Kopi Arabika Premium"],
      },
      {
        name: "Inggris",
        multiplier: 1.42,
        region: "Eropa",
        demandGrowth: 65.7, // Tinggi
        topProducts: ["Tekstil Batik Premium", "Kopi Arabika Premium"],
      },
      {
        name: "Australia",
        multiplier: 1.35,
        region: "Oseania",
        demandGrowth: 35.8, // Medium
        topProducts: ["Furniture Kayu Jati", "Tekstil Batik Premium"],
      },
      {
        name: "Uni Emirat Arab",
        multiplier: 1.25,
        region: "Timur Tengah",
        demandGrowth: 145.2, // Sangat Tinggi
        topProducts: ["Rempah-rempah Organik", "Kopi Arabika Premium"],
      },
    ],

    // Template cost structure (percentage dari base value)
    costStructure: {
      freight: 0.15, // 15% dari nilai FOB
      insurance: 0.005, // 0.5% dari nilai FOB
      handling: 0.02, // 2% dari nilai FOB
      documentation: 2500000, // Fixed Rp 2.5 juta
      customs: 0.01, // 1% dari nilai FOB
      pph: 0.025, // 2.5% PPh
      pungutan: 0.005, // 0.5% pungutan ekspor
    },
  },

  // ===== DOCUMENT GENERATOR MOCK DATA =====
  documentGenerator: {
    // Company profiles untuk document generation
    companies: {
      exporter: [
        {
          name: "PT. Indonesia Export Mandiri",
          address: "Jl. Sudirman No. 123, Jakarta Pusat 10270, Indonesia",
          npwp: "01.234.567.8-901.000",
          phone: "+62-21-5555-0123",
          email: "info@exportmandiri.com",
          director: "Ahmad Wijaya",
          established: "2015",
        },
        {
          name: "CV. Nusantara Trading",
          address: "Jl. Gatot Subroto No. 456, Surabaya 60285, Indonesia",
          npwp: "02.345.678.9-012.000",
          phone: "+62-31-7777-0234",
          email: "sales@nusantaratrading.co.id",
          director: "Siti Rahayu",
          established: "2018",
        },
        {
          name: "PT. Global Spice Indonesia",
          address: "Jl. Asia Afrika No. 789, Bandung 40261, Indonesia",
          npwp: "03.456.789.0-123.000",
          phone: "+62-22-8888-0345",
          email: "export@globalspice.id",
          director: "Bambang Sutrisno",
          established: "2012",
        },
      ],
      importer: [
        {
          name: "Global Trading Company Ltd.",
          address: "123 Business District, Marina Bay, Singapore 049315",
          contact: "John Smith",
          phone: "+65-6234-5678",
          email: "procurement@globaltrading.sg",
        },
        {
          name: "Pacific Import Corporation",
          address: "456 Trade Center, Shibuya, Tokyo 150-0043, Japan",
          contact: "Takeshi Yamamoto",
          phone: "+81-3-1234-5678",
          email: "import@pacificimport.jp",
        },
        {
          name: "European Food Distributors GmbH",
          address: "789 Handelstraße, 20095 Hamburg, Germany",
          contact: "Hans Mueller",
          phone: "+49-40-1234-567",
          email: "purchasing@eurofoods.de",
        },
      ],
    },

    // Document templates dengan sample data
    documentTemplates: {
      peb: {
        prefix: "PEB",
        validityDays: 90,
        requiredFields: [
          "exporterData",
          "importerData",
          "productData",
          "shippingData",
        ],
      },
      invoice: {
        prefix: "INV",
        validityDays: 30,
        paymentTerms: [
          "T/T 30 days",
          "L/C at sight",
          "T/T 15 days",
          "Cash on Delivery",
        ],
      },
      ska: {
        prefix: "SKA",
        validityDays: 365,
        originCriteria: [
          "Wholly Obtained",
          "Wholly Produced",
          "Substantially Transformed",
        ],
      },
      packingList: {
        prefix: "PL",
        packagingTypes: [
          "Jute bags",
          "Carton boxes",
          "Wooden crates",
          "Plastic containers",
          "Vacuum packs",
        ],
      },
      billOfLading: {
        prefix: "BL",
        vessels: [
          "MV Ocean Trader",
          "MV Asia Express",
          "MV Pacific Navigator",
          "MV Global Carrier",
        ],
        ports: {
          loading: [
            "Tanjung Priok (Jakarta)",
            "Tanjung Perak (Surabaya)",
            "Belawan (Medan)",
          ],
          discharge: [
            "Port of Singapore",
            "Tokyo Port",
            "Port of Hamburg",
            "Port of Los Angeles",
          ],
        },
      },
      insurance: {
        prefix: "INS",
        coverage: [
          "Institute Cargo Clauses (A)",
          "Institute Cargo Clauses (B)",
          "Institute Cargo Clauses (C)",
        ],
        period: ["Warehouse to Warehouse", "Port to Port", "Door to Door"],
      },
    },
  },

  // ===== EMAIL GENERATOR MOCK DATA =====
  emailGenerator: {
    // Company profiles untuk email
    senderProfiles: [
      {
        name: "Ahmad Wijaya",
        position: "Export Manager",
        company: "PT. Indonesia Export Solutions",
        email: "ahmad.wijaya@exportindo.com",
        phone: "+62-21-5555-0123",
        website: "www.exportindo.com",
        established: "2015",
        business: "Agricultural Export",
        mainProducts: "Coffee, Spices, and Agricultural Products",
      },
      {
        name: "Sari Indah",
        position: "Business Development Manager",
        company: "CV. Spice Paradise",
        email: "sari.indah@spiceparadise.co.id",
        phone: "+62-31-7777-0234",
        website: "www.spiceparadise.co.id",
        established: "2017",
        business: "Spice Trading",
        mainProducts: "Organic Spices and Herbs",
      },
      {
        name: "Budi Santoso",
        position: "Sales Director",
        company: "PT. Marine Fresh Indonesia",
        email: "budi.santoso@marinefresh.id",
        phone: "+62-22-8888-0345",
        website: "www.marinefresh.id",
        established: "2014",
        business: "Seafood Export",
        mainProducts: "Frozen Shrimp and Fish",
      },
    ],

    // Recipient profiles
    recipientProfiles: [
      {
        name: "John Smith",
        company: "Global Import Trading LLC",
        country: "Singapore",
      },
      {
        name: "Takeshi Yamamoto",
        company: "Pacific Food Import Co.",
        country: "Japan",
      },
      {
        name: "Hans Mueller",
        company: "European Spice Distributors",
        country: "Germany",
      },
      {
        name: "Sarah Johnson",
        company: "American Specialty Foods",
        country: "USA",
      },
    ],

    // Product offerings untuk emails
    productOfferings: [
      {
        name: "Premium Indonesian Coffee",
        description:
          "High-quality Arabica coffee beans from Indonesian highlands with rich flavor profile",
        quantity: "5000 kg per month",
        price: "USD 8.50 per kg",
        origin: "Java and Sumatra",
      },
      {
        name: "Organic Spice Mix",
        description:
          "Certified organic spice blend featuring traditional Indonesian spices",
        quantity: "2000 kg per month",
        price: "USD 12.00 per kg",
        origin: "Central Java",
      },
      {
        name: "Frozen Tiger Shrimp",
        description:
          "Grade A frozen tiger shrimp, individually quick frozen (IQF)",
        quantity: "10000 kg per month",
        price: "USD 18.50 per kg",
        origin: "East Java Aquaculture",
      },
      {
        name: "Premium Batik Textile",
        description:
          "Hand-crafted batik textiles with traditional Indonesian patterns",
        quantity: "1000 pieces per month",
        price: "USD 25.00 per piece",
        origin: "Yogyakarta and Solo",
      },
    ],
  },

  // ===== PROPOSAL GENERATOR MOCK DATA =====
  proposalGenerator: {
    // Company capabilities untuk proposals
    companyCapabilities: [
      {
        name: "PT. Indonesia Export Excellence",
        address: "Jl. Gatot Subroto No. 456, Jakarta Selatan 12930",
        ceo: "Budi Santoso",
        established: "2015",
        business: "Export-Import Agricultural Products",
        mainProducts: "Premium Indonesian Coffee and Spices",
        capacity: "100 tons per month",
        certifications: [
          "ISO 22000",
          "Organic Certification",
          "HACCP",
          "Halal Certificate",
        ],
        experience: "10 years exporting to 15 countries",
        targetMarkets: ["North America", "Europe", "Asia Pacific"],
        advantages: [
          "Premium quality",
          "Sustainable farming",
          "Consistent supply",
          "Competitive pricing",
        ],
      },
      {
        name: "CV. Marine Harvest Indonesia",
        address: "Jl. Perikanan No. 789, Surabaya 60173",
        ceo: "Sari Lestari",
        established: "2013",
        business: "Seafood Processing and Export",
        mainProducts: "Frozen Shrimp and Fish Products",
        capacity: "200 tons per month",
        certifications: ["BRC", "IFS", "MSC", "BAP"],
        experience: "12 years in seafood export",
        targetMarkets: ["USA", "Japan", "Europe"],
        advantages: [
          "Fresh quality",
          "Cold chain management",
          "Traceability system",
          "Fast delivery",
        ],
      },
      {
        name: "PT. Textile Heritage Indonesia",
        address: "Jl. Industri No. 321, Bandung 40184",
        ceo: "Ahmad Sutrisno",
        established: "2016",
        business: "Textile and Handicraft Export",
        mainProducts: "Batik Textile and Traditional Crafts",
        capacity: "5000 pieces per month",
        certifications: ["OEKO-TEX", "GOTS", "Fair Trade"],
        experience: "8 years in textile export",
        targetMarkets: ["Europe", "Australia", "USA"],
        advantages: [
          "Authentic designs",
          "Eco-friendly materials",
          "Cultural heritage",
          "Custom designs",
        ],
      },
    ],

    // Partnership types
    partnershipTypes: [
      {
        type: "Exclusive Distribution Partnership",
        description:
          "Exclusive rights to distribute products in specific territory",
        benefits: [
          "Market exclusivity",
          "Marketing support",
          "Volume discounts",
          "Territory protection",
        ],
      },
      {
        type: "Joint Venture Partnership",
        description: "Collaborative business venture for mutual growth",
        benefits: [
          "Shared resources",
          "Risk mitigation",
          "Market expansion",
          "Technology transfer",
        ],
      },
      {
        type: "Strategic Alliance",
        description: "Long-term strategic cooperation for market development",
        benefits: [
          "Brand association",
          "Market access",
          "Resource sharing",
          "Innovation collaboration",
        ],
      },
      {
        type: "Supply Chain Partnership",
        description: "Integrated supply chain cooperation for efficiency",
        benefits: [
          "Cost reduction",
          "Quality assurance",
          "Delivery optimization",
          "Process integration",
        ],
      },
    ],

    // Financial projections
    financialProjections: [
      {
        scenario: "Conservative",
        yearlyRevenue: "USD 1.5 Million",
        growthRate: "15% annually",
        profitMargin: "12%",
        breakEvenPeriod: "18 months",
      },
      {
        scenario: "Realistic",
        yearlyRevenue: "USD 2.5 Million",
        growthRate: "25% annually",
        profitMargin: "18%",
        breakEvenPeriod: "12 months",
      },
      {
        scenario: "Optimistic",
        yearlyRevenue: "USD 4.0 Million",
        growthRate: "35% annually",
        profitMargin: "22%",
        breakEvenPeriod: "8 months",
      },
    ],
  },

  // ===== GENERAL CHATBOT RESPONSES =====
  chatbotResponses: {
    // Welcome messages
    welcomeMessages: [
      "Selamat datang di ExportIn AI Assistant! Saya siap membantu Anda dengan semua kebutuhan ekspor.",
      "Halo! Saya AI Assistant ExportIn yang akan memandu Anda dalam proses ekspor. Ada yang bisa saya bantu?",
      "Selamat datang! Saya di sini untuk membantu Anda dengan kalkulasi biaya, dokumen, email, dan proposal ekspor.",
    ],

    // Feature explanations
    featureExplanations: {
      costCalculator:
        "Saya dapat menghitung estimasi biaya ekspor berdasarkan produk, tujuan, dan volume yang Anda tentukan. Termasuk FOB, freight, asuransi, dan semua biaya terkait.",
      documentGenerator:
        "Saya dapat membuat dokumen ekspor lengkap seperti PEB, Commercial Invoice, SKA/COO, Packing List, Bill of Lading, dan sertifikat asuransi.",
      emailGenerator:
        "Saya dapat membuat email profesional untuk inquiry produk, perkenalan bisnis, dan penawaran ekspor dengan template yang sudah teruji.",
      proposalGenerator:
        "Saya dapat membuat proposal bisnis lengkap untuk partnership, kerjasama ekspor, dan presentasi perusahaan yang menarik.",
    },

    // Common questions and answers
    commonQA: [
      {
        question: "Bagaimana cara membuat dokumen PEB?",
        answer:
          "PEB (Pemberitahuan Ekspor Barang) adalah dokumen wajib untuk ekspor. Saya dapat membuatkan PEB dengan data lengkap sesuai regulasi Bea Cukai. Berisi detail eksportir, importir, produk, nilai, dan tujuan pengiriman.",
      },
      {
        question: "Saya ingin membuat email inquiry produk",
        answer:
          "Saya dapat membuatkan email inquiry yang profesional untuk menanyakan produk atau layanan. Template mencakup perkenalan perusahaan, detail inquiry, dan kontak yang jelas.",
      },
      {
        question: "Buatkan proposal kerjasama bisnis",
        answer:
          "Saya dapat membuatkan proposal kerjasama bisnis lengkap dengan detail partnership, profit sharing, timeline, dan analisis finansial yang menarik untuk calon partner.",
      },
      {
        question: "Berapa estimasi biaya ekspor ke Jepang?",
        answer:
          "Saya dapat menghitung estimasi biaya ekspor ke Jepang secara detail. Termasuk FOB, freight, asuransi, handling, dokumentasi, dan pajak. Silakan berikan detail produk dan volume.",
      },
      {
        question: "Cara membuat Commercial Invoice",
        answer:
          "Commercial Invoice adalah dokumen penting untuk ekspor. Saya dapat membuatkan invoice dengan detail produk, harga, syarat pembayaran, dan informasi pengiriman yang profesional.",
      },
      {
        question: "Email penawaran untuk buyer",
        answer:
          "Saya dapat membuatkan email penawaran yang kompetitif dengan detail produk, harga, spesifikasi, dan syarat pembayaran yang jelas untuk menarik minat buyer.",
      },
      {
        question: "Proposal partnership untuk distributor",
        answer:
          "Saya dapat membuatkan proposal partnership untuk distributor dengan detail kerjasama, target market, profit sharing, dan strategi pemasaran yang komprehensif.",
      },
      {
        question: "Hitung biaya FOB dan freight",
        answer:
          "Saya dapat menghitung FOB (Free on Board) dan freight cost berdasarkan produk, berat, volume, dan negara tujuan. Kalkulasi mencakup semua komponen biaya pengiriman.",
      },
      {
        question: "Dokumen apa saja yang diperlukan ekspor?",
        answer:
          "Dokumen ekspor utama: PEB, Commercial Invoice, Packing List, Bill of Lading, SKA/Certificate of Origin, Marine Insurance. Saya dapat membuatkan semua dokumen ini sesuai kebutuhan.",
      },
      {
        question: "Template email follow-up",
        answer:
          "Saya dapat membuatkan template email follow-up yang sopan dan efektif untuk menindaklanjuti komunikasi sebelumnya dengan buyer atau calon partner.",
      },
      {
        question: "Proposal presentasi perusahaan",
        answer:
          "Saya dapat membuatkan proposal presentasi perusahaan dengan profil lengkap, produk unggulan, keunggulan kompetitif, dan track record yang menarik.",
      },
      {
        question: "Estimasi biaya asuransi ekspor",
        answer:
          "Saya dapat menghitung estimasi premi asuransi ekspor berdasarkan nilai barang, jenis coverage, dan risiko pengiriman. Termasuk Marine Cargo Insurance dan Export Credit Insurance.",
      },
      {
        question: "Cara membuat Packing List",
        answer:
          "Packing List berisi detail pengemasan barang. Saya dapat membuatkan packing list yang sesuai standar internasional dengan informasi lengkap tentang kemasan dan konten.",
      },
      {
        question: "Email perkenalan bisnis",
        answer:
          "Saya dapat membuatkan email perkenalan bisnis yang menarik dan profesional untuk calon partner atau buyer. Template mencakup profil perusahaan dan value proposition.",
      },
      {
        question: "Proposal joint venture",
        answer:
          "Saya dapat membuatkan proposal joint venture dengan detail kerjasama, pembagian modal, profit sharing, dan timeline yang jelas untuk proyek bersama.",
      },
      {
        question: "Kalkulasi biaya ekspor lengkap",
        answer:
          "Saya dapat menghitung kalkulasi biaya ekspor lengkap termasuk FOB, freight, asuransi, handling, dokumentasi, pajak, dan semua komponen biaya terkait.",
      },
      {
        question: "Apa itu PEB?",
        answer:
          "PEB (Pemberitahuan Ekspor Barang) adalah dokumen wajib yang harus diajukan ke Bea Cukai sebelum barang dapat diekspor. Berisi detail barang, nilai, dan tujuan pengiriman.",
      },
      {
        question: "Apa itu FOB?",
        answer:
          "FOB (Free on Board) adalah istilah perdagangan internasional yang berarti penjual bertanggung jawab sampai barang dimuat ke kapal. Setelah itu, risiko dan biaya menjadi tanggung jawab pembeli.",
      },
      {
        question: "Bagaimana cara membuat email yang profesional?",
        answer:
          "Email profesional untuk ekspor harus mencakup perkenalan perusahaan, detail produk, spesifikasi, harga, dan syarat pembayaran. Saya dapat membuatkan template yang sesuai kebutuhan.",
      },
      {
        question: "Apa itu proposal bisnis?",
        answer:
          "Proposal bisnis adalah dokumen yang menjelaskan kemampuan perusahaan, produk unggulan, target pasar, dan proyeksi kerjasama. Saya dapat membuatkan proposal yang menarik untuk calon partner.",
      },
      {
        question: "Bagaimana cara menghitung biaya ekspor?",
        answer:
          "Biaya ekspor terdiri dari: FOB, freight, asuransi, handling, dokumentasi, dan pajak. Saya dapat menghitung estimasi lengkap berdasarkan produk, berat, dan negara tujuan.",
      },
    ],

    // Error messages
    errorMessages: [
      "Maaf, saya tidak dapat memproses permintaan tersebut. Silakan coba lagi atau ajukan pertanyaan yang lebih spesifik.",
      "Terjadi kesalahan dalam pemrosesan. Silakan refresh halaman dan coba lagi.",
      "Data yang Anda berikan tidak lengkap. Mohon berikan informasi yang lebih detail.",
    ],

    // Success messages
    successMessages: [
      "Berhasil! Data telah diproses dengan sempurna.",
      "Excellent! Dokumen telah dibuat dan siap digunakan.",
      "Perfect! Kalkulasi biaya telah selesai dengan akurat.",
    ],
  },

  // ===== UTILITY FUNCTIONS =====
  utils: {
    // Generate random data
    getRandomElement: (array) =>
      array[Math.floor(Math.random() * array.length)],

    // Format currency
    formatCurrency: (amount, currency = "IDR") => {
      if (currency === "IDR") {
        return `Rp ${amount.toLocaleString("id-ID")}`;
      } else {
        return `${currency} ${amount.toLocaleString("en-US")}`;
      }
    },

    // Generate document number
    generateDocumentNumber: (prefix) => {
      const year = new Date().getFullYear();
      const random = Math.floor(Math.random() * 9999)
        .toString()
        .padStart(4, "0");
      return `${prefix}-${year}-${random}`;
    },

    // Get current date formatted
    getCurrentDate: () => new Date().toLocaleDateString("id-ID"),

    // Calculate shipping cost based on weight and destination
    calculateShippingCost: (weight, destination) => {
      const baseRate = 50000; // Rp 50,000 per kg
      const destinationMultiplier = destination.multiplier || 1;
      return Math.round(weight * baseRate * destinationMultiplier);
    },

    // Get growth classification with color and label
    getGrowthClassification: (growthPercentage) => {
      const classification =
        aiAssistantMockData.costCalculator.growthClassification;

      if (growthPercentage >= classification.SANGAT_TINGGI.min) {
        return classification.SANGAT_TINGGI;
      } else if (
        growthPercentage >= classification.TINGGI.min &&
        growthPercentage <= classification.TINGGI.max
      ) {
        return classification.TINGGI;
      } else if (
        growthPercentage >= classification.MEDIUM.min &&
        growthPercentage <= classification.MEDIUM.max
      ) {
        return classification.MEDIUM;
      } else {
        return classification.LOW;
      }
    },

    // Format growth percentage with classification
    formatGrowthWithClass: (growthPercentage) => {
      const classification =
        aiAssistantMockData.utils.getGrowthClassification(growthPercentage);
      return {
        value: growthPercentage.toFixed(1) + "%",
        label: classification.label,
        color: classification.color,
      };
    },
  },
};

export default aiAssistantMockData;
