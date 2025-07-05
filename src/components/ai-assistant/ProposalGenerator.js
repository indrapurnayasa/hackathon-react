// src/components/ai-assistant/ProposalGenerator.js
import { Copy, Download } from "lucide-react";
import { jsPDF } from "jspdf";

class ProposalGenerator {
  static proposalTemplates = [
    {
      id: "business-proposal",
      name: "Business Partnership Proposal",
      description: "Proposal kerjasama bisnis ekspor-impor",
      fields: [
        "Nama Perusahaan Anda",
        "Alamat Perusahaan",
        "Nama CEO/Direktur",
        "Tahun Berdiri",
        "Bidang Usaha",
        "Nama Perusahaan Partner",
        "Jenis Kerjasama",
        "Produk/Layanan",
        "Target Market",
        "Proyeksi Keuntungan",
      ],
    },
    {
      id: "export-proposal",
      name: "Export Business Proposal",
      description: "Proposal bisnis ekspor untuk klien internasional",
      fields: [
        "Nama Perusahaan",
        "Produk Utama",
        "Kapasitas Produksi",
        "Sertifikasi",
        "Pengalaman Ekspor",
        "Negara Tujuan",
        "Volume Ekspor",
        "Harga Kompetitif",
        "Keunggulan Produk",
        "Timeline Pengiriman",
      ],
    },
  ];

  static generateDummyProposalData(proposal) {
    const dummyData = {};
    proposal.fields.forEach((field) => {
      switch (field) {
        case "Nama Perusahaan Anda":
        case "Nama Perusahaan":
          dummyData[field] = "PT. Indonesia Export Excellence";
          break;
        case "Alamat Perusahaan":
          dummyData[field] = "Jl. Gatot Subroto No. 456, Jakarta Selatan";
          break;
        case "Nama CEO/Direktur":
          dummyData[field] = "Budi Santoso";
          break;
        case "Tahun Berdiri":
          dummyData[field] = "2015";
          break;
        case "Bidang Usaha":
          dummyData[field] = "Export-Import Agricultural Products";
          break;
        case "Nama Perusahaan Partner":
          dummyData[field] = "International Trading Corp";
          break;
        case "Jenis Kerjasama":
          dummyData[field] = "Exclusive Distribution Partnership";
          break;
        case "Produk/Layanan":
          dummyData[field] = "Premium Indonesian Coffee and Spices";
          break;
        case "Target Market":
          dummyData[field] = "North America and Europe";
          break;
        case "Proyeksi Keuntungan":
          dummyData[field] = "USD 2 Million annually";
          break;
        case "Produk Utama":
          dummyData[field] = "Premium Indonesian Coffee";
          break;
        case "Kapasitas Produksi":
          dummyData[field] = "100 tons per month";
          break;
        case "Sertifikasi":
          dummyData[field] = "ISO 22000, Organic Certification";
          break;
        case "Pengalaman Ekspor":
          dummyData[field] = "10 years exporting to 15 countries";
          break;
        case "Negara Tujuan":
          dummyData[field] = "USA, Europe, Japan";
          break;
        case "Volume Ekspor":
          dummyData[field] = "500 tons annually";
          break;
        case "Harga Kompetitif":
          dummyData[field] = "USD 8.50 per kg FOB";
          break;
        case "Keunggulan Produk":
          dummyData[field] =
            "Premium quality, sustainable farming, consistent supply";
          break;
        case "Timeline Pengiriman":
          dummyData[field] = "30 days after order confirmation";
          break;
        default:
          dummyData[field] = `Sample ${field}`;
      }
    });
    return dummyData;
  }

  static generateProposalContent(proposal, data) {
    return (
      `BUSINESS PROPOSAL\n\n${proposal.name}\n\nPrepared by: ${
        data["Nama Perusahaan Anda"] || data["Nama Perusahaan"]
      }\nDate: ${new Date().toLocaleDateString()}\n\n` +
      Object.entries(data)
        .map(([key, value]) => `${key}: ${value}`)
        .join("\n\n") +
      "\n\nThank you for considering our proposal. We look forward to a successful partnership."
    );
  }

  // HAPUS PARAMETER completedProposals
  static showProposalList(setMessages, setCurrentFlow) {
    setCurrentFlow("proposal-list");
    // LANGSUNG GUNAKAN TEMPLATE TANPA STATUS
    const proposals = this.proposalTemplates;

    const botMessage = {
      from: "bot",
      text: "Berikut adalah template proposal bisnis ekspor yang dapat saya buatkan:",
      timestamp: new Date().toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      type: "proposal-list",
      proposals: proposals,
    };
    setMessages((prev) => [...prev, botMessage]);
  }

  // HAPUS PARAMETER setCompletedProposals
  static async generateProposal(proposal, setMessages, setIsTyping) {
    setIsTyping(true);

    const processingMessage = {
      from: "bot",
      text: `Sedang memproses ${proposal.name}... Saya akan mengisi semua informasi yang diperlukan secara otomatis. ⏳`,
      timestamp: new Date().toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [...prev, processingMessage]);

      setTimeout(() => {
        const dummyData = this.generateDummyProposalData(proposal);
        const content = this.generateProposalContent(proposal, dummyData);

        // HAPUS LOGIC COMPLETED PROPOSALS

        const completedMessage = {
          from: "bot",
          text: `✅ Excellent! ${proposal.name} telah berhasil dibuat dengan konten lengkap. Proposal siap untuk dicopy atau didownload.`,
          timestamp: new Date().toLocaleTimeString("id-ID", {
            hour: "2-digit",
            minute: "2-digit",
          }),
          type: "proposal-ready",
          content: content,
          proposalName: proposal.name,
        };
        setMessages((prev) => [...prev, completedMessage]);

        // TIDAK PERLU TIMEOUT UNTUK SHOW LIST LAGI
      }, 2000);
    }, 1000);
  }

  static handleCopy(content) {
    navigator.clipboard.writeText(content);
    alert("Proposal berhasil dicopy!");
  }

  static handleDownload(content, filename) {
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
  }
}

export default ProposalGenerator;
