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
        question:
          "Halo, saya baru mau belajar ekspor. Saya punya kebun kopi di Lampung dan sudah mulai roasting sendiri, tapi belum tahu mulai dari mana untuk ekspor. Bisa bantu?",
        answer:
          "Halo! Senang sekali bisa bantu Anda memulai journey ekspor ☕🎉 Kopi Indonesia punya reputasi excellent di pasar global, apalagi dari Lampung yang terkenal dengan Robusta berkualitas tinggi!\n\n- Legalitas Usaha yang Wajib:\nNIB (Nomor Induk Berusaha) dengan KBLI yang tepat untuk kopi\nNPWP perusahaan\nIzin industri roasting coffee dari Dinas Perindustrian\n\n- Standar Produk Kopi Ekspor:\nGrading kopi sesuai standar internasional (Grade 1, 2, dst)\nKemasan vacuum sealed atau valve bag untuk freshness\nLabel dengan informasi lengkap: origin, roast level, processing method\nSertifikat organik (jika applicable) untuk premium market\n\n- Kualitas & Testing:\nCupping score minimal 80+ untuk specialty coffee\nMoisture content 12-13% (standar ekspor)\nBean size consistency\n\nSudah punya NIB belum? Dan jenis kopi apa yang mau diekspor - Robusta, Arabica, atau blend? Target negara mana yang Anda minati?",
      },
      {
        question:
          "Saya tertarik ekspor ke Jepang. Dokumen apa saja yang harus saya siapkan?",
        answer:
          'Excellent choice! Jepang memang pasar premium untuk kopi berkualitas dan ready bayar harga bagus untuk specialty coffee 🇯🇵\n\nDokumen Wajib Ekspor Kopi ke Jepang:\n\n- Dokumen Dasar:\nCommercial Invoice dengan detail grade, origin, processing\nPacking List dengan berat nett/gross per bag\nPEB (Pemberitahuan Ekspor Barang) dari Bea Cukai\n\n- Dokumen Khusus untuk Kopi:\nCertificate of Origin (COO) - wajib untuk kopi Indonesia\nPhytosanitary Certificate dari Karantina Pertanian (untuk raw beans)\nHealth Certificate kalau sudah roasted\nFumigation Certificate untuk container shipment\nQuality Certificate dengan cupping score dan lab analysis\n\n- Dokumen Opsional tapi Recommended:\nOrganic Certificate (kalau ada) - premium price up to 30%\nFair Trade Certificate - popular di Jepang\nRainforest Alliance certification\n\nKamu juga bisa gunakan fitur "Generate Document" agar kamu bisa saya bantu untuk membuat dokumen-dokumen mengenai ekspor',
      },
      {
        question:
          "Iya, mau dong info lab testing. By the way, untuk pengirimannya gimana ya? Kopi kan sensitif sama suhu dan kelembaban, takut rusak di perjalanan.",
        answer:
          "Betul sekali! Kopi memang produk yang delicate, tapi ada cara proper untuk shipping 📦☕\n\nAlur Shipping Kopi ke Jepang:\n\n- Pilihan Moda Transportasi:\nContainer Laut (FCL/LCL): 14-21 hari, paling ekonomis untuk volume besar (>5 ton)\nAir Cargo: 3-5 hari, cocok untuk specialty/roasted coffee (<1 ton)\nExpress Air: 1-2 hari, untuk sample atau urgent orders\n\n- Ekspedisi Terpercaya untuk Jepang:\nAir Cargo:\nGaruda Cargo: Rp 35.000-45.000/kg\nJAL Cargo: Rp 40.000-50.000/kg (direct flight)\nCathay Pacific Cargo: Rp 32.000-42.000/kg\nSea Freight:\nContainer 20ft: USD 800-1200 (bisa muat 12-15 ton)\nLCL: Rp 8.000-12.000/kg untuk volume kecil\n\n- Packaging Requirements:\nGreen beans: Jute bags 60kg dengan plastic liner\nRoasted: Valve bags + master cartons dengan desiccant\nTemperature controlled container untuk premium coffee\n\n- Estimasi untuk 1 ton kopi:\nVia laut: Rp 8-12 juta total\nVia udara: Rp 35-45 juta total\n\n💡 Coba fitur Shipping Calculator di tab kedua platform ini! Input 'Kopi Robusta', 'Jepang', dan berat shipment Anda - sistem akan bandingkan semua ekspedisi dengan real-time pricing dan transit time",
      },
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
      {
        question: "Buatkan email inquiry produk",
        answer:
          "📧 **Email Inquiry Produk - Premium Indonesian Coffee**\n\n**Subject:** Inquiry for Premium Indonesian Coffee Supply\n\nDear Procurement Manager,\n\nI hope this email finds you well. I am writing to inquire about your interest in sourcing premium Indonesian coffee beans for your company.\n\n**About Our Product:**\n- **Product:** Premium Arabica Coffee Beans\n- **Origin:** Java and Sumatra Highlands\n- **Grade:** Specialty Grade (Cupping Score 85+)\n- **Processing:** Washed and Semi-washed\n- **Certification:** Organic, Rainforest Alliance\n- **Available Quantity:** 5,000 kg per month\n- **Price:** USD 8.50 per kg FOB Jakarta\n\n**Why Choose Indonesian Coffee:**\n✅ Rich volcanic soil for exceptional flavor\n✅ Traditional processing methods\n✅ Consistent quality and supply\n✅ Competitive pricing\n✅ Full traceability\n\n**Sample Offer:**\n- **Sample Size:** 1 kg (free of charge)\n- **Lead Time:** 30 days after order confirmation\n- **Payment Terms:** T/T 30 days\n- **Packaging:** Vacuum sealed bags, 60kg jute sacks\n\nWe would be delighted to provide samples and discuss potential collaboration. Please let me know if you would like to receive our detailed product catalog and pricing information.\n\nLooking forward to your response.\n\nBest regards,\nAhmad Wijaya\nExport Manager\nPT. Indonesia Coffee Excellence\n📧 ahmad.wijaya@coffeeexcellence.id\n📱 +62-21-5555-0123\n🌐 www.coffeeexcellence.id",
      },
      {
        question: "email inquiry",
        answer:
          "📧 **Email Inquiry Produk - Premium Indonesian Coffee**\n\n**Subject:** Inquiry for Premium Indonesian Coffee Supply\n\nDear Procurement Manager,\n\nI hope this email finds you well. I am writing to inquire about your interest in sourcing premium Indonesian coffee beans for your company.\n\n**About Our Product:**\n- **Product:** Premium Arabica Coffee Beans\n- **Origin:** Java and Sumatra Highlands\n- **Grade:** Specialty Grade (Cupping Score 85+)\n- **Processing:** Washed and Semi-washed\n- **Certification:** Organic, Rainforest Alliance\n- **Available Quantity:** 5,000 kg per month\n- **Price:** USD 8.50 per kg FOB Jakarta\n\n**Why Choose Indonesian Coffee:**\n✅ Rich volcanic soil for exceptional flavor\n✅ Traditional processing methods\n✅ Consistent quality and supply\n✅ Competitive pricing\n✅ Full traceability\n\n**Sample Offer:**\n- **Sample Size:** 1 kg (free of charge)\n- **Lead Time:** 30 days after order confirmation\n- **Payment Terms:** T/T 30 days\n- **Packaging:** Vacuum sealed bags, 60kg jute sacks\n\nWe would be delighted to provide samples and discuss potential collaboration. Please let me know if you would like to receive our detailed product catalog and pricing information.\n\nLooking forward to your response.\n\nBest regards,\nAhmad Wijaya\nExport Manager\nPT. Indonesia Coffee Excellence\n📧 ahmad.wijaya@coffeeexcellence.id\n📱 +62-21-5555-0123\n🌐 www.coffeeexcellence.id",
      },
      {
        question: "generate email",
        answer:
          "📧 **Email Inquiry Produk - Premium Indonesian Coffee**\n\n**Subject:** Inquiry for Premium Indonesian Coffee Supply\n\nDear Procurement Manager,\n\nI hope this email finds you well. I am writing to inquire about your interest in sourcing premium Indonesian coffee beans for your company.\n\n**About Our Product:**\n- **Product:** Premium Arabica Coffee Beans\n- **Origin:** Java and Sumatra Highlands\n- **Grade:** Specialty Grade (Cupping Score 85+)\n- **Processing:** Washed and Semi-washed\n- **Certification:** Organic, Rainforest Alliance\n- **Available Quantity:** 5,000 kg per month\n- **Price:** USD 8.50 per kg FOB Jakarta\n\n**Why Choose Indonesian Coffee:**\n✅ Rich volcanic soil for exceptional flavor\n✅ Traditional processing methods\n✅ Consistent quality and supply\n✅ Competitive pricing\n✅ Full traceability\n\n**Sample Offer:**\n- **Sample Size:** 1 kg (free of charge)\n- **Lead Time:** 30 days after order confirmation\n- **Payment Terms:** T/T 30 days\n- **Packaging:** Vacuum sealed bags, 60kg jute sacks\n\nWe would be delighted to provide samples and discuss potential collaboration. Please let me know if you would like to receive our detailed product catalog and pricing information.\n\nLooking forward to your response.\n\nBest regards,\nAhmad Wijaya\nExport Manager\nPT. Indonesia Coffee Excellence\n📧 ahmad.wijaya@coffeeexcellence.id\n📱 +62-21-5555-0123\n🌐 www.coffeeexcellence.id",
      },
      {
        question: "Buatkan email penawaran untuk buyer",
        answer:
          "📧 **Email Penawaran - Premium Indonesian Spices**\n\n**Subject:** Special Offer: Premium Indonesian Spices for Your Business\n\nDear Purchasing Director,\n\nI hope this message reaches you well. We are pleased to present an exclusive offer for premium Indonesian spices that could enhance your product portfolio.\n\n**Special Offer Details:**\n🎯 **Limited Time Offer:** 15% discount on orders above 2,000 kg\n📅 **Valid Until:** December 31, 2024\n🚢 **Free Sample:** 500g sample pack available\n\n**Product Portfolio:**\n\n**1. Premium Nutmeg (Myristica fragrans)**\n- Grade: A+ (Whole, Clean)\n- Moisture: <8%\n- Price: USD 12.50/kg\n- Available: 3,000 kg/month\n\n**2. Organic Cinnamon (Cinnamomum burmannii)**\n- Grade: Premium (Stick & Powder)\n- Certification: Organic, Fair Trade\n- Price: USD 15.00/kg\n- Available: 2,500 kg/month\n\n**3. Black Pepper (Piper nigrum)**\n- Grade: Premium (500-550 GPL)\n- Origin: Lampung, Indonesia\n- Price: USD 8.75/kg\n- Available: 5,000 kg/month\n\n**Quality Assurance:**\n✅ ISO 22000 Certified\n✅ HACCP Compliant\n✅ Halal Certified\n✅ Organic Certified\n✅ Full Traceability\n\n**Logistics:**\n- **Lead Time:** 45 days\n- **Payment:** T/T 30 days or L/C at sight\n- **Packaging:** Food-grade bags, 25kg cartons\n- **Shipping:** FOB Jakarta or CIF destination\n\n**Why Choose Us:**\n🏆 15+ years export experience\n🌍 Serving 25+ countries\n📈 99% on-time delivery rate\n💎 Premium quality guarantee\n\nWe would be happy to arrange a video call to discuss your specific requirements and provide detailed samples.\n\nBest regards,\nSari Indah\nBusiness Development Manager\nCV. Spice Paradise Indonesia\n📧 sari.indah@spiceparadise.co.id\n📱 +62-31-7777-0234\n🌐 www.spiceparadise.co.id",
      },
      {
        question: "Buatkan proposal kerjasama bisnis",
        answer:
          "🤝 **Proposal Kerjasama Bisnis - Exclusive Distribution Partnership**\n\n**PT. Indonesia Export Excellence**\nJl. Gatot Subroto No. 456, Jakarta Selatan 12930\n📧 info@exportexcellence.id | 📱 +62-21-5555-0123\n\n**PROPOSAL KERJASAMA DISTRIBUSI EKSKLUSIF**\n**Premium Indonesian Agricultural Products**\n\n**Executive Summary:**\nWe propose an exclusive distribution partnership to expand our premium Indonesian agricultural products in your market. This partnership will create mutual growth opportunities with projected annual revenue of USD 2.5 million within 24 months.\n\n**Company Profile:**\n🏢 **Established:** 2015\n👥 **Team:** 50+ experienced professionals\n🌍 **Export Experience:** 10+ years to 15 countries\n📊 **Annual Revenue:** USD 8.5 million\n🏆 **Certifications:** ISO 22000, HACCP, Organic, Halal\n\n**Product Portfolio:**\n\n**1. Premium Coffee Beans**\n- Arabica & Robusta varieties\n- Cupping score: 80-85+\n- Monthly capacity: 50 tons\n- Price range: USD 6.50-12.00/kg\n\n**2. Organic Spices**\n- Nutmeg, Cinnamon, Black Pepper\n- 100% organic certified\n- Monthly capacity: 20 tons\n- Price range: USD 8.00-18.00/kg\n\n**3. Virgin Coconut Oil**\n- Cold-pressed, unrefined\n- Monthly capacity: 30 tons\n- Price range: USD 4.50-6.50/kg\n\n**Partnership Benefits:**\n\n**For Your Company:**\n✅ Exclusive market rights\n✅ 25% profit margin guarantee\n✅ Marketing support & materials\n✅ Technical training & support\n✅ Priority supply allocation\n✅ Volume discounts (5-15%)\n\n**For Our Company:**\n✅ Market expansion\n✅ Stable demand\n✅ Brand recognition\n✅ Shared marketing costs\n✅ Long-term partnership\n\n**Financial Projections:**\n\n**Year 1:**\n- Revenue: USD 1.2 million\n- Profit Margin: 22%\n- Market Share: 15%\n\n**Year 2:**\n- Revenue: USD 2.5 million\n- Profit Margin: 25%\n- Market Share: 25%\n\n**Year 3:**\n- Revenue: USD 4.0 million\n- Profit Margin: 28%\n- Market Share: 35%\n\n**Investment Requirements:**\n- Initial order: USD 50,000\n- Marketing budget: USD 15,000/year\n- Inventory investment: USD 100,000\n- Expected ROI: 35% annually\n\n**Implementation Timeline:**\n\n**Month 1-2:** Contract signing & legal setup\n**Month 3-4:** Product registration & certification\n**Month 5-6:** Marketing campaign launch\n**Month 7-12:** Market expansion & growth\n\n**Risk Mitigation:**\n🛡️ Quality guarantee with replacement policy\n🛡️ Supply chain backup systems\n🛡️ Currency hedging options\n🛡️ Insurance coverage for all shipments\n\n**Next Steps:**\n1. Review and discuss proposal details\n2. Conduct market feasibility study\n3. Negotiate terms and conditions\n4. Sign partnership agreement\n5. Begin implementation\n\nWe look forward to discussing this exciting opportunity and building a successful long-term partnership.\n\nBest regards,\nBudi Santoso\nCEO & Founder\nPT. Indonesia Export Excellence\n📧 budi.santoso@exportexcellence.id\n📱 +62-21-5555-0123",
      },
      {
        question: "generate proposal",
        answer:
          "🤝 **Proposal Kerjasama Bisnis - Exclusive Distribution Partnership**\n\n**PT. Indonesia Export Excellence**\nJl. Gatot Subroto No. 456, Jakarta Selatan 12930\n📧 info@exportexcellence.id | 📱 +62-21-5555-0123\n\n**PROPOSAL KERJASAMA DISTRIBUSI EKSKLUSIF**\n**Premium Indonesian Agricultural Products**\n\n**Executive Summary:**\nWe propose an exclusive distribution partnership to expand our premium Indonesian agricultural products in your market. This partnership will create mutual growth opportunities with projected annual revenue of USD 2.5 million within 24 months.\n\n**Company Profile:**\n🏢 **Established:** 2015\n👥 **Team:** 50+ experienced professionals\n🌍 **Export Experience:** 10+ years to 15 countries\n📊 **Annual Revenue:** USD 8.5 million\n🏆 **Certifications:** ISO 22000, HACCP, Organic, Halal\n\n**Product Portfolio:**\n\n**1. Premium Coffee Beans**\n- Arabica & Robusta varieties\n- Cupping score: 80-85+\n- Monthly capacity: 50 tons\n- Price range: USD 6.50-12.00/kg\n\n**2. Organic Spices**\n- Nutmeg, Cinnamon, Black Pepper\n- 100% organic certified\n- Monthly capacity: 20 tons\n- Price range: USD 8.00-18.00/kg\n\n**3. Virgin Coconut Oil**\n- Cold-pressed, unrefined\n- Monthly capacity: 30 tons\n- Price range: USD 4.50-6.50/kg\n\n**Partnership Benefits:**\n\n**For Your Company:**\n✅ Exclusive market rights\n✅ 25% profit margin guarantee\n✅ Marketing support & materials\n✅ Technical training & support\n✅ Priority supply allocation\n✅ Volume discounts (5-15%)\n\n**For Our Company:**\n✅ Market expansion\n✅ Stable demand\n✅ Brand recognition\n✅ Shared marketing costs\n✅ Long-term partnership\n\n**Financial Projections:**\n\n**Year 1:**\n- Revenue: USD 1.2 million\n- Profit Margin: 22%\n- Market Share: 15%\n\n**Year 2:**\n- Revenue: USD 2.5 million\n- Profit Margin: 25%\n- Market Share: 25%\n\n**Year 3:**\n- Revenue: USD 4.0 million\n- Profit Margin: 28%\n- Market Share: 35%\n\n**Investment Requirements:**\n- Initial order: USD 50,000\n- Marketing budget: USD 15,000/year\n- Inventory investment: USD 100,000\n- Expected ROI: 35% annually\n\n**Implementation Timeline:**\n\n**Month 1-2:** Contract signing & legal setup\n**Month 3-4:** Product registration & certification\n**Month 5-6:** Marketing campaign launch\n**Month 7-12:** Market expansion & growth\n\n**Risk Mitigation:**\n🛡️ Quality guarantee with replacement policy\n🛡️ Supply chain backup systems\n🛡️ Currency hedging options\n🛡️ Insurance coverage for all shipments\n\n**Next Steps:**\n1. Review and discuss proposal details\n2. Conduct market feasibility study\n3. Negotiate terms and conditions\n4. Sign partnership agreement\n5. Begin implementation\n\nWe look forward to discussing this exciting opportunity and building a successful long-term partnership.\n\nBest regards,\nBudi Santoso\nCEO & Founder\nPT. Indonesia Export Excellence\n📧 budi.santoso@exportexcellence.id\n📱 +62-21-5555-0123",
      },
      {
        question: "proposal bisnis",
        answer:
          "🤝 **Proposal Kerjasama Bisnis - Exclusive Distribution Partnership**\n\n**PT. Indonesia Export Excellence**\nJl. Gatot Subroto No. 456, Jakarta Selatan 12930\n📧 info@exportexcellence.id | 📱 +62-21-5555-0123\n\n**PROPOSAL KERJASAMA DISTRIBUSI EKSKLUSIF**\n**Premium Indonesian Agricultural Products**\n\n**Executive Summary:**\nWe propose an exclusive distribution partnership to expand our premium Indonesian agricultural products in your market. This partnership will create mutual growth opportunities with projected annual revenue of USD 2.5 million within 24 months.\n\n**Company Profile:**\n🏢 **Established:** 2015\n👥 **Team:** 50+ experienced professionals\n🌍 **Export Experience:** 10+ years to 15 countries\n📊 **Annual Revenue:** USD 8.5 million\n🏆 **Certifications:** ISO 22000, HACCP, Organic, Halal\n\n**Product Portfolio:**\n\n**1. Premium Coffee Beans**\n- Arabica & Robusta varieties\n- Cupping score: 80-85+\n- Monthly capacity: 50 tons\n- Price range: USD 6.50-12.00/kg\n\n**2. Organic Spices**\n- Nutmeg, Cinnamon, Black Pepper\n- 100% organic certified\n- Monthly capacity: 20 tons\n- Price range: USD 8.00-18.00/kg\n\n**3. Virgin Coconut Oil**\n- Cold-pressed, unrefined\n- Monthly capacity: 30 tons\n- Price range: USD 4.50-6.50/kg\n\n**Partnership Benefits:**\n\n**For Your Company:**\n✅ Exclusive market rights\n✅ 25% profit margin guarantee\n✅ Marketing support & materials\n✅ Technical training & support\n✅ Priority supply allocation\n✅ Volume discounts (5-15%)\n\n**For Our Company:**\n✅ Market expansion\n✅ Stable demand\n✅ Brand recognition\n✅ Shared marketing costs\n✅ Long-term partnership\n\n**Financial Projections:**\n\n**Year 1:**\n- Revenue: USD 1.2 million\n- Profit Margin: 22%\n- Market Share: 15%\n\n**Year 2:**\n- Revenue: USD 2.5 million\n- Profit Margin: 25%\n- Market Share: 25%\n\n**Year 3:**\n- Revenue: USD 4.0 million\n- Profit Margin: 28%\n- Market Share: 35%\n\n**Investment Requirements:**\n- Initial order: USD 50,000\n- Marketing budget: USD 15,000/year\n- Inventory investment: USD 100,000\n- Expected ROI: 35% annually\n\n**Implementation Timeline:**\n\n**Month 1-2:** Contract signing & legal setup\n**Month 3-4:** Product registration & certification\n**Month 5-6:** Marketing campaign launch\n**Month 7-12:** Market expansion & growth\n\n**Risk Mitigation:**\n🛡️ Quality guarantee with replacement policy\n🛡️ Supply chain backup systems\n🛡️ Currency hedging options\n🛡️ Insurance coverage for all shipments\n\n**Next Steps:**\n1. Review and discuss proposal details\n2. Conduct market feasibility study\n3. Negotiate terms and conditions\n4. Sign partnership agreement\n5. Begin implementation\n\nWe look forward to discussing this exciting opportunity and building a successful long-term partnership.\n\nBest regards,\nBudi Santoso\nCEO & Founder\nPT. Indonesia Export Excellence\n📧 budi.santoso@exportexcellence.id\n📱 +62-21-5555-0123",
      },
      {
        question: "Hitung estimasi biaya ekspor kopi ke Jepang",
        answer:
          "💰 **Estimasi Biaya Ekspor Kopi ke Jepang**\n\n**Informasi Produk:**\n- **Produk:** Premium Arabica Coffee Beans\n- **Berat:** 1,000 kg (1 ton)\n- **Nilai FOB:** USD 8,500 (USD 8.50/kg)\n- **Tujuan:** Tokyo, Japan\n- **Kode HS:** 0901.11.00\n\n**Rincian Biaya:**\n\n**1. Biaya FOB:**\n- Nilai barang: USD 8,500\n- Packing & marking: USD 200\n- **Subtotal FOB:** USD 8,700\n\n**2. Biaya Pengiriman:**\n- **Sea Freight (Container 20ft):** USD 1,200\n- **Air Cargo (Alternative):** USD 4,500\n- **Handling charges:** USD 150\n- **Container stuffing:** USD 100\n\n**3. Biaya Asuransi:**\n- Marine cargo insurance (0.5%): USD 43.50\n- Coverage: All risks\n\n**4. Biaya Dokumentasi:**\n- Commercial Invoice: USD 25\n- Packing List: USD 25\n- Certificate of Origin: USD 50\n- Phytosanitary Certificate: USD 75\n- Health Certificate: USD 75\n- **Total Dokumentasi:** USD 250\n\n**5. Biaya Bea Cukai:**\n- PPh Ekspor (2.5%): USD 217.50\n- Pungutan Ekspor (0.5%): USD 43.50\n- **Total Bea Cukai:** USD 261\n\n**6. Biaya Tambahan:**\n- Quality testing: USD 200\n- Fumigation certificate: USD 150\n- **Total Tambahan:** USD 350\n\n**📊 TOTAL ESTIMASI BIAYA:**\n\n**Via Sea Freight:**\n- Total: USD 10,764\n- Per kg: USD 10.76\n- Margin: 26.5%\n\n**Via Air Cargo:**\n- Total: USD 14,064\n- Per kg: USD 14.06\n- Margin: 65.4%\n\n**Informasi Tambahan:**\n⏱️ **Waktu Pengiriman:**\n- Sea freight: 14-21 hari\n- Air cargo: 3-5 hari\n\n📋 **Dokumen Wajib:**\n- Commercial Invoice\n- Packing List\n- Certificate of Origin\n- Phytosanitary Certificate\n- Health Certificate\n- Fumigation Certificate\n\n💳 **Payment Terms:**\n- T/T 30 days\n- L/C at sight\n- Cash on delivery\n\n**Rekomendasi:**\n✅ Untuk volume besar (>5 ton): Gunakan sea freight\n✅ Untuk sample/urgent: Gunakan air cargo\n✅ Pastikan semua sertifikat lengkap\n✅ Pertimbangkan asuransi tambahan\n\n*Estimasi berdasarkan peraturan terbaru. Biaya aktual dapat bervariasi tergantung kondisi pasar dan regulasi.*",
      },
      {
        question: "estimasi biaya",
        answer:
          "💰 **Estimasi Biaya Ekspor Kopi ke Jepang**\n\n**Informasi Produk:**\n- **Produk:** Premium Arabica Coffee Beans\n- **Berat:** 1,000 kg (1 ton)\n- **Nilai FOB:** USD 8,500 (USD 8.50/kg)\n- **Tujuan:** Tokyo, Japan\n- **Kode HS:** 0901.11.00\n\n**Rincian Biaya:**\n\n**1. Biaya FOB:**\n- Nilai barang: USD 8,500\n- Packing & marking: USD 200\n- **Subtotal FOB:** USD 8,700\n\n**2. Biaya Pengiriman:**\n- **Sea Freight (Container 20ft):** USD 1,200\n- **Air Cargo (Alternative):** USD 4,500\n- **Handling charges:** USD 150\n- **Container stuffing:** USD 100\n\n**3. Biaya Asuransi:**\n- Marine cargo insurance (0.5%): USD 43.50\n- Coverage: All risks\n\n**4. Biaya Dokumentasi:**\n- Commercial Invoice: USD 25\n- Packing List: USD 25\n- Certificate of Origin: USD 50\n- Phytosanitary Certificate: USD 75\n- Health Certificate: USD 75\n- **Total Dokumentasi:** USD 250\n\n**5. Biaya Bea Cukai:**\n- PPh Ekspor (2.5%): USD 217.50\n- Pungutan Ekspor (0.5%): USD 43.50\n- **Total Bea Cukai:** USD 261\n\n**6. Biaya Tambahan:**\n- Quality testing: USD 200\n- Fumigation certificate: USD 150\n- **Total Tambahan:** USD 350\n\n**📊 TOTAL ESTIMASI BIAYA:**\n\n**Via Sea Freight:**\n- Total: USD 10,764\n- Per kg: USD 10.76\n- Margin: 26.5%\n\n**Via Air Cargo:**\n- Total: USD 14,064\n- Per kg: USD 14.06\n- Margin: 65.4%\n\n**Informasi Tambahan:**\n⏱️ **Waktu Pengiriman:**\n- Sea freight: 14-21 hari\n- Air cargo: 3-5 hari\n\n📋 **Dokumen Wajib:**\n- Commercial Invoice\n- Packing List\n- Certificate of Origin\n- Phytosanitary Certificate\n- Health Certificate\n- Fumigation Certificate\n\n💳 **Payment Terms:**\n- T/T 30 days\n- L/C at sight\n- Cash on delivery\n\n**Rekomendasi:**\n✅ Untuk volume besar (>5 ton): Gunakan sea freight\n✅ Untuk sample/urgent: Gunakan air cargo\n✅ Pastikan semua sertifikat lengkap\n✅ Pertimbangkan asuransi tambahan\n\n*Estimasi berdasarkan peraturan terbaru. Biaya aktual dapat bervariasi tergantung kondisi pasar dan regulasi.*",
      },
      {
        question: "hitung biaya",
        answer:
          "💰 **Estimasi Biaya Ekspor Kopi ke Jepang**\n\n**Informasi Produk:**\n- **Produk:** Premium Arabica Coffee Beans\n- **Berat:** 1,000 kg (1 ton)\n- **Nilai FOB:** USD 8,500 (USD 8.50/kg)\n- **Tujuan:** Tokyo, Japan\n- **Kode HS:** 0901.11.00\n\n**Rincian Biaya:**\n\n**1. Biaya FOB:**\n- Nilai barang: USD 8,500\n- Packing & marking: USD 200\n- **Subtotal FOB:** USD 8,700\n\n**2. Biaya Pengiriman:**\n- **Sea Freight (Container 20ft):** USD 1,200\n- **Air Cargo (Alternative):** USD 4,500\n- **Handling charges:** USD 150\n- **Container stuffing:** USD 100\n\n**3. Biaya Asuransi:**\n- Marine cargo insurance (0.5%): USD 43.50\n- Coverage: All risks\n\n**4. Biaya Dokumentasi:**\n- Commercial Invoice: USD 25\n- Packing List: USD 25\n- Certificate of Origin: USD 50\n- Phytosanitary Certificate: USD 75\n- Health Certificate: USD 75\n- **Total Dokumentasi:** USD 250\n\n**5. Biaya Bea Cukai:**\n- PPh Ekspor (2.5%): USD 217.50\n- Pungutan Ekspor (0.5%): USD 43.50\n- **Total Bea Cukai:** USD 261\n\n**6. Biaya Tambahan:**\n- Quality testing: USD 200\n- Fumigation certificate: USD 150\n- **Total Tambahan:** USD 350\n\n**📊 TOTAL ESTIMASI BIAYA:**\n\n**Via Sea Freight:**\n- Total: USD 10,764\n- Per kg: USD 10.76\n- Margin: 26.5%\n\n**Via Air Cargo:**\n- Total: USD 14,064\n- Per kg: USD 14.06\n- Margin: 65.4%\n\n**Informasi Tambahan:**\n⏱️ **Waktu Pengiriman:**\n- Sea freight: 14-21 hari\n- Air cargo: 3-5 hari\n\n📋 **Dokumen Wajib:**\n- Commercial Invoice\n- Packing List\n- Certificate of Origin\n- Phytosanitary Certificate\n- Health Certificate\n- Fumigation Certificate\n\n💳 **Payment Terms:**\n- T/T 30 days\n- L/C at sight\n- Cash on delivery\n\n**Rekomendasi:**\n✅ Untuk volume besar (>5 ton): Gunakan sea freight\n✅ Untuk sample/urgent: Gunakan air cargo\n✅ Pastikan semua sertifikat lengkap\n✅ Pertimbangkan asuransi tambahan\n\n*Estimasi berdasarkan peraturan terbaru. Biaya aktual dapat bervariasi tergantung kondisi pasar dan regulasi.*",
      },
      {
        question: "cost calculator",
        answer:
          "💰 **Estimasi Biaya Ekspor Kopi ke Jepang**\n\n**Informasi Produk:**\n- **Produk:** Premium Arabica Coffee Beans\n- **Berat:** 1,000 kg (1 ton)\n- **Nilai FOB:** USD 8,500 (USD 8.50/kg)\n- **Tujuan:** Tokyo, Japan\n- **Kode HS:** 0901.11.00\n\n**Rincian Biaya:**\n\n**1. Biaya FOB:**\n- Nilai barang: USD 8,500\n- Packing & marking: USD 200\n- **Subtotal FOB:** USD 8,700\n\n**2. Biaya Pengiriman:**\n- **Sea Freight (Container 20ft):** USD 1,200\n- **Air Cargo (Alternative):** USD 4,500\n- **Handling charges:** USD 150\n- **Container stuffing:** USD 100\n\n**3. Biaya Asuransi:**\n- Marine cargo insurance (0.5%): USD 43.50\n- Coverage: All risks\n\n**4. Biaya Dokumentasi:**\n- Commercial Invoice: USD 25\n- Packing List: USD 25\n- Certificate of Origin: USD 50\n- Phytosanitary Certificate: USD 75\n- Health Certificate: USD 75\n- **Total Dokumentasi:** USD 250\n\n**5. Biaya Bea Cukai:**\n- PPh Ekspor (2.5%): USD 217.50\n- Pungutan Ekspor (0.5%): USD 43.50\n- **Total Bea Cukai:** USD 261\n\n**6. Biaya Tambahan:**\n- Quality testing: USD 200\n- Fumigation certificate: USD 150\n- **Total Tambahan:** USD 350\n\n**📊 TOTAL ESTIMASI BIAYA:**\n\n**Via Sea Freight:**\n- Total: USD 10,764\n- Per kg: USD 10.76\n- Margin: 26.5%\n\n**Via Air Cargo:**\n- Total: USD 14,064\n- Per kg: USD 14.06\n- Margin: 65.4%\n\n**Informasi Tambahan:**\n⏱️ **Waktu Pengiriman:**\n- Sea freight: 14-21 hari\n- Air cargo: 3-5 hari\n\n📋 **Dokumen Wajib:**\n- Commercial Invoice\n- Packing List\n- Certificate of Origin\n- Phytosanitary Certificate\n- Health Certificate\n- Fumigation Certificate\n\n💳 **Payment Terms:**\n- T/T 30 days\n- L/C at sight\n- Cash on delivery\n\n**Rekomendasi:**\n✅ Untuk volume besar (>5 ton): Gunakan sea freight\n✅ Untuk sample/urgent: Gunakan air cargo\n✅ Pastikan semua sertifikat lengkap\n✅ Pertimbangkan asuransi tambahan\n\n*Estimasi berdasarkan peraturan terbaru. Biaya aktual dapat bervariasi tergantung kondisi pasar dan regulasi.*",
      },
      {
        question: "Hitung biaya ekspor rempah ke Singapura",
        answer:
          "💰 **Estimasi Biaya Ekspor Rempah ke Singapura**\n\n**Informasi Produk:**\n- **Produk:** Premium Indonesian Spices Mix\n- **Berat:** 500 kg\n- **Nilai FOB:** USD 6,000 (USD 12.00/kg)\n- **Tujuan:** Singapore\n- **Kode HS:** 0910.10.00\n\n**Rincian Biaya:**\n\n**1. Biaya FOB:**\n- Nilai barang: USD 6,000\n- Packing & marking: USD 150\n- **Subtotal FOB:** USD 6,150\n\n**2. Biaya Pengiriman:**\n- **Sea Freight (LCL):** USD 400\n- **Air Cargo (Alternative):** USD 1,500\n- **Handling charges:** USD 75\n- **Container stuffing:** USD 50\n\n**3. Biaya Asuransi:**\n- Marine cargo insurance (0.5%): USD 30.75\n- Coverage: All risks\n\n**4. Biaya Dokumentasi:**\n- Commercial Invoice: USD 25\n- Packing List: USD 25\n- Certificate of Origin: USD 50\n- Health Certificate: USD 75\n- **Total Dokumentasi:** USD 175\n\n**5. Biaya Bea Cukai:**\n- PPh Ekspor (2.5%): USD 153.75\n- Pungutan Ekspor (0.5%): USD 30.75\n- **Total Bea Cukai:** USD 184.50\n\n**6. Biaya Tambahan:**\n- Quality testing: USD 150\n- Organic certification: USD 100\n- **Total Tambahan:** USD 250\n\n**📊 TOTAL ESTIMASI BIAYA:**\n\n**Via Sea Freight:**\n- Total: USD 7,015.25\n- Per kg: USD 14.03\n- Margin: 16.9%\n\n**Via Air Cargo:**\n- Total: USD 8,115.25\n- Per kg: USD 16.23\n- Margin: 35.2%\n\n**Informasi Tambahan:**\n⏱️ **Waktu Pengiriman:**\n- Sea freight: 7-10 hari\n- Air cargo: 1-2 hari\n\n📋 **Dokumen Wajib:**\n- Commercial Invoice\n- Packing List\n- Certificate of Origin\n- Health Certificate\n- Organic Certificate\n\n💳 **Payment Terms:**\n- T/T 15 days\n- L/C at sight\n- Cash on delivery\n\n**Rekomendasi:**\n✅ Untuk regular orders: Gunakan sea freight\n✅ Untuk sample/urgent: Gunakan air cargo\n✅ Pastikan organic certification\n✅ Pertimbangkan cold storage\n\n*Estimasi berdasarkan peraturan terbaru. Biaya aktual dapat bervariasi.*",
      },
      {
        question: "Buatkan email perkenalan bisnis",
        answer:
          "📧 **Email Perkenalan Bisnis - Premium Indonesian Products**\n\n**Subject:** Introduction: Premium Indonesian Export Products Partnership Opportunity\n\nDear Business Development Manager,\n\nI hope this email finds you well. I am reaching out to introduce our company and explore potential business opportunities for premium Indonesian products in your market.\n\n**About Our Company:**\n🏢 **PT. Indonesia Export Excellence**\n📍 **Location:** Jakarta, Indonesia\n📅 **Established:** 2015\n🌍 **Experience:** 10+ years exporting to 25+ countries\n📊 **Annual Revenue:** USD 8.5 million\n🏆 **Certifications:** ISO 22000, HACCP, Organic, Halal\n\n**Our Premium Product Portfolio:**\n\n**1. Premium Coffee Beans**\n- Arabica & Robusta varieties\n- Cupping score: 80-85+\n- Monthly capacity: 50 tons\n- Origin: Java, Sumatra, Sulawesi\n\n**2. Organic Spices**\n- Nutmeg, Cinnamon, Black Pepper\n- 100% organic certified\n- Monthly capacity: 20 tons\n- Origin: Maluku, Lampung\n\n**3. Virgin Coconut Oil**\n- Cold-pressed, unrefined\n- Monthly capacity: 30 tons\n- Origin: Bali, Sulawesi\n\n**4. Premium Batik Textiles**\n- Hand-crafted traditional designs\n- Monthly capacity: 5,000 pieces\n- Origin: Yogyakarta, Solo\n\n**Why Partner With Us:**\n✅ **Quality Assurance:** Premium grade products with international certifications\n✅ **Reliable Supply:** Consistent quality and on-time delivery\n✅ **Competitive Pricing:** Direct from source, no middleman\n✅ **Custom Solutions:** Tailored packaging and specifications\n✅ **Full Support:** Technical assistance and marketing materials\n✅ **Traceability:** Complete supply chain transparency\n\n**Market Success:**\n🌍 **Current Markets:** USA, Japan, Germany, Australia, Singapore\n📈 **Growth Rate:** 35% annually\n🎯 **Customer Satisfaction:** 98%\n⏰ **On-time Delivery:** 99%\n\n**Partnership Benefits:**\n🤝 **Exclusive Rights:** Territory protection\n💰 **Profit Margins:** 25-35% guaranteed\n📦 **Volume Discounts:** 5-15% based on quantity\n🎨 **Marketing Support:** Materials and training\n📊 **Market Data:** Industry insights and trends\n\n**Sample Program:**\n🎁 **Free Samples:** Available for qualified buyers\n📋 **Sample Size:** 1-2 kg per product\n⏱️ **Lead Time:** 7-10 days\n🚢 **Shipping:** Free sample shipping\n\n**Next Steps:**\n1. **Product Catalog:** Would you like to receive our detailed catalog?\n2. **Sample Request:** Interested in free samples?\n3. **Video Call:** Schedule a meeting to discuss opportunities?\n4. **Market Visit:** Arrange a visit to our facilities?\n\nWe would be delighted to discuss how our premium Indonesian products can enhance your business portfolio and create mutual growth opportunities.\n\nLooking forward to your response.\n\nBest regards,\nBudi Santoso\nCEO & Founder\nPT. Indonesia Export Excellence\n📧 budi.santoso@exportexcellence.id\n📱 +62-21-5555-0123\n🌐 www.exportexcellence.id\n📍 Jakarta, Indonesia",
      },
      {
        question: "Buatkan proposal joint venture",
        answer:
          "🤝 **Proposal Joint Venture - Indonesian Agricultural Export Partnership**\n\n**PT. Indonesia Export Excellence**\nJl. Gatot Subroto No. 456, Jakarta Selatan 12930\n📧 info@exportexcellence.id | 📱 +62-21-5555-0123\n\n**JOINT VENTURE PROPOSAL**\n**Premium Indonesian Agricultural Products Export**\n\n**Executive Summary:**\nWe propose a strategic joint venture to establish a comprehensive Indonesian agricultural products export business. This partnership will leverage our local expertise and your international market access to create a USD 5 million annual revenue business within 36 months.\n\n**Partnership Structure:**\n\n**Equity Distribution:**\n- **Your Company:** 40% ownership\n- **Our Company:** 40% ownership\n- **Management Pool:** 20% (performance-based)\n\n**Capital Investment:**\n- **Total Investment:** USD 500,000\n- **Your Contribution:** USD 200,000 (40%)\n- **Our Contribution:** USD 200,000 (40%)\n- **Reserved for Management:** USD 100,000 (20%)\n\n**Business Model:**\n\n**Product Portfolio:**\n1. **Premium Coffee Beans** (40% of revenue)\n2. **Organic Spices** (25% of revenue)\n3. **Virgin Coconut Oil** (20% of revenue)\n4. **Traditional Textiles** (15% of revenue)\n\n**Target Markets:**\n- **Primary:** USA, Japan, Germany\n- **Secondary:** Australia, Singapore, UK\n- **Emerging:** China, India, Middle East\n\n**Financial Projections:**\n\n**Year 1:**\n- Revenue: USD 2.0 million\n- Gross Profit: USD 600,000 (30%)\n- Net Profit: USD 300,000 (15%)\n- ROI: 60%\n\n**Year 2:**\n- Revenue: USD 3.5 million\n- Gross Profit: USD 1,225,000 (35%)\n- Net Profit: USD 700,000 (20%)\n- ROI: 140%\n\n**Year 3:**\n- Revenue: USD 5.0 million\n- Gross Profit: USD 2,000,000 (40%)\n- Net Profit: USD 1,250,000 (25%)\n- ROI: 250%\n\n**Operational Structure:**\n\n**Management Team:**\n- **CEO:** Joint appointment\n- **Operations Director:** Our company\n- **Sales Director:** Your company\n- **Finance Director:** Joint appointment\n\n**Infrastructure:**\n- **Warehouse:** 2,000 sqm in Jakarta\n- **Processing Facility:** ISO certified\n- **Quality Lab:** In-house testing\n- **IT System:** ERP and CRM\n\n**Risk Management:**\n🛡️ **Quality Risk:** Insurance and guarantees\n🛡️ **Supply Risk:** Multiple supplier network\n🛡️ **Currency Risk:** Hedging strategies\n🛡️ **Market Risk:** Diversified portfolio\n🛡️ **Legal Risk:** Comprehensive contracts\n\n**Implementation Timeline:**\n\n**Phase 1 (Months 1-3):**\n- Legal entity formation\n- Initial capital injection\n- Team recruitment\n- Infrastructure setup\n\n**Phase 2 (Months 4-6):**\n- Supplier agreements\n- Quality certifications\n- Market entry strategy\n- First shipments\n\n**Phase 3 (Months 7-12):**\n- Market expansion\n- Revenue optimization\n- Process improvement\n- Scale operations\n\n**Success Metrics:**\n📊 **Revenue Growth:** 75% annually\n📈 **Market Share:** 15% in target segments\n🎯 **Customer Satisfaction:** 95%\n⏰ **Delivery Performance:** 98%\n💰 **Profit Margins:** 25-40%\n\n**Exit Strategy:**\n- **Option 1:** IPO after 5 years\n- **Option 2:** Strategic acquisition\n- **Option 3:** Management buyout\n- **Option 4:** Asset sale\n\n**Next Steps:**\n1. **Due Diligence:** Review financials and operations\n2. **Negotiation:** Discuss terms and conditions\n3. **Agreement:** Sign joint venture contract\n4. **Implementation:** Begin partnership execution\n\nWe look forward to building a successful and profitable partnership together.\n\nBest regards,\nBudi Santoso\nCEO & Founder\nPT. Indonesia Export Excellence\n📧 budi.santoso@exportexcellence.id\n📱 +62-21-5555-0123",
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
