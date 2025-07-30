// src/components/ai-assistant/DocumentGenerator.js
import { CheckCircle, Circle, Copy, Download } from "lucide-react";
import { jsPDF } from "jspdf";

class DocumentGenerator {
  static exportDocuments = [
    {
      id: "peb",
      name: "Pemberitahuan Ekspor Barang (PEB)",
      description:
        "Dokumen wajib untuk memberitahukan barang yang akan diekspor melalui sistem CEISA",
      fields: [
        "Nama Eksportir",
        "Alamat Eksportir",
        "NPWP Eksportir",
        "Nama Penerima",
        "Alamat Penerima",
        "Negara Tujuan",
        "Deskripsi Barang",
        "Kode HS",
      ],
    },
    {
      id: "invoice",
      name: "Commercial Invoice",
      description:
        "Dokumen tagihan yang berisi detail transaksi perdagangan ekspor",
      fields: [
        "Nomor Invoice",
        "Tanggal Invoice",
        "Nama Penjual",
        "Alamat Penjual",
        "Nama Pembeli",
        "Alamat Pembeli",
        "Deskripsi Barang",
        "Total Nilai",
      ],
    },
    {
      id: "ska",
      name: "Surat Keterangan Asal (SKA/COO)",
      description:
        "Sertifikat yang menyatakan asal barang untuk mendapatkan fasilitas tarif preferensial",
      fields: [
        "Nama Eksportir",
        "Alamat Eksportir",
        "Nama Penerima",
        "Alamat Penerima",
        "Deskripsi Barang",
        "Kode HS",
        "Kriteria Asal",
        "Nomor Invoice",
        "Tanggal Invoice",
      ],
    },
    {
      id: "packinglist",
      name: "Packing List",
      description: "Daftar detail kemasan barang yang akan diekspor",
      fields: [
        "Nomor Packing List",
        "Tanggal Packing",
        "Nama Pengirim",
        "Nama Penerima",
        "Deskripsi Barang",
        "Jumlah Kemasan",
        "Jenis Kemasan",
        "Berat Kotor",
        "Berat Bersih",
        "Dimensi",
      ],
    },
    {
      id: "bl",
      name: "Bill of Lading (B/L)",
      description: "Dokumen pengangkutan barang melalui laut",
      fields: [
        "Nomor B/L",
        "Nama Kapal",
        "Pelabuhan Muat",
        "Pelabuhan Bongkar",
        "Nama Pengirim",
        "Nama Penerima",
        "Deskripsi Barang",
        "Jumlah Container",
      ],
    },
    {
      id: "insurance",
      name: "Marine Insurance Certificate",
      description: "Sertifikat asuransi untuk pengangkutan barang ekspor",
      fields: [
        "Nomor Polis",
        "Nama Tertanggung",
        "Jenis Barang",
        "Nilai Pertanggungan",
        "Rute Pengangkutan",
        "Jenis Kapal",
        "Periode Asuransi",
      ],
    },
  ];

  static generateDummyData(doc) {
    const dummyData = {};
    doc.fields.forEach((field) => {
      switch (field) {
        case "Nama Eksportir":
        case "Nama Penjual":
        case "Nama Pengirim":
          dummyData[field] = "PT. Indonesia Export Mandiri";
          break;
        case "Alamat Eksportir":
        case "Alamat Penjual":
          dummyData[field] = "Jl. Sudirman No. 123, Jakarta Pusat, Indonesia";
          break;
        case "NPWP Eksportir":
          dummyData[field] = "01.234.567.8-901.000";
          break;
        case "Nama Penerima":
        case "Nama Pembeli":
          dummyData[field] = "Global Trading Company Ltd.";
          break;
        case "Alamat Penerima":
        case "Alamat Pembeli":
          dummyData[field] = "123 Business District, Singapore 049315";
          break;
        case "Negara Tujuan":
          dummyData[field] = "Singapore";
          break;
        case "Deskripsi Barang":
          dummyData[field] = "Kopi Arabika Premium Grade A";
          break;
        case "Kode HS":
          dummyData[field] = "0901.11.00";
          break;
        case "Nomor Invoice":
          dummyData[field] = "INV-2025-001";
          break;
        case "Tanggal Invoice":
        case "Tanggal Packing":
          dummyData[field] = new Date().toLocaleDateString();
          break;
        case "Total Nilai":
          dummyData[field] = "USD 15,000";
          break;
        case "Harga Satuan":
          dummyData[field] = "USD 15.00";
          break;
        case "Syarat Pembayaran":
          dummyData[field] = "T/T 30 days";
          break;
        case "Nomor Packing List":
          dummyData[field] = "PL-2025-001";
          break;
        case "Jumlah Kemasan":
          dummyData[field] = "20 bags";
          break;
        case "Jenis Kemasan":
          dummyData[field] = "Jute bags";
          break;
        case "Berat Kotor":
          dummyData[field] = "1050 kg";
          break;
        case "Berat Bersih":
          dummyData[field] = "1000 kg";
          break;
        case "Dimensi":
          dummyData[field] = "100 x 80 x 60 cm";
          break;
        case "Kriteria Asal":
          dummyData[field] = "Wholly Obtained";
          break;
        case "Nomor B/L":
          dummyData[field] = "BL-2025-SG-001";
          break;
        case "Nama Kapal":
          dummyData[field] = "MV Ocean Trader";
          break;
        case "Pelabuhan Muat":
          dummyData[field] = "Tanjung Priok, Jakarta";
          break;
        case "Pelabuhan Bongkar":
          dummyData[field] = "Port of Singapore";
          break;
        case "Jumlah Container":
          dummyData[field] = "1 x 20' FCL";
          break;
        case "Nomor Polis":
          dummyData[field] = "INS-2025-001";
          break;
        case "Nama Tertanggung":
          dummyData[field] = "PT. Indonesia Export Mandiri";
          break;
        case "Jenis Barang":
          dummyData[field] = "Coffee Beans";
          break;
        case "Nilai Pertanggungan":
          dummyData[field] = "USD 16,500";
          break;
        case "Rute Pengangkutan":
          dummyData[field] = "Jakarta - Singapore";
          break;
        case "Jenis Kapal":
          dummyData[field] = "Container Vessel";
          break;
        case "Periode Asuransi":
          dummyData[field] = "Warehouse to Warehouse";
          break;
        default:
          dummyData[field] = `Sample ${field}`;
      }
    });
    return dummyData;
  }

  static createDocumentContent(document, data) {
    switch (document.id) {
      case "peb":
        return `PEMBERITAHUAN EKSPOR BARANG (PEB)

Nomor: PEB-${Date.now()}
Tanggal: ${new Date().toLocaleDateString()}

EKSPORTIR:
Nama: ${data["Nama Eksportir"] || "[Nama Eksportir]"}
Alamat: ${data["Alamat Eksportir"] || "[Alamat Eksportir]"}
NPWP: ${data["NPWP Eksportir"] || "[NPWP Eksportir]"}

PENERIMA (CONSIGNEE):
Nama: ${data["Nama Penerima"] || "[Nama Penerima]"}
Alamat: ${data["Alamat Penerima"] || "[Alamat Penerima]"}
Negara: ${data["Negara Tujuan"] || "[Negara Tujuan]"}

DETAIL BARANG:
Deskripsi: ${data["Deskripsi Barang"] || "[Deskripsi Barang]"}
Kode HS: ${data["Kode HS"] || "[Kode HS]"}

Dokumen ini telah disesuaikan dengan regulasi terbaru.`;

      case "invoice":
        return `COMMERCIAL INVOICE

Invoice No: ${data["Nomor Invoice"] || "[Nomor Invoice]"}
Date: ${data["Tanggal Invoice"] || "[Tanggal Invoice]"}

SELLER:
${data["Nama Penjual"] || "[Nama Penjual]"}
${data["Alamat Penjual"] || "[Alamat Penjual]"}

BUYER:
${data["Nama Pembeli"] || "[Nama Pembeli]"}
${data["Alamat Pembeli"] || "[Alamat Pembeli]"}

DESCRIPTION OF GOODS:
${data["Deskripsi Barang"] || "[Deskripsi Barang]"}
Total Amount: ${data["Total Nilai"] || "[Total Nilai]"}

This invoice is true and correct.`;

      case "ska":
        return `SURAT KETERANGAN ASAL (SKA/COO)
CERTIFICATE OF ORIGIN

Certificate No: SKA-${Date.now()}
Date: ${new Date().toLocaleDateString()}

EKSPORTIR (EXPORTER):
Nama: ${data["Nama Eksportir"] || "[Nama Eksportir]"}
Alamat: ${data["Alamat Eksportir"] || "[Alamat Eksportir]"}

PENERIMA (CONSIGNEE):
Nama: ${data["Nama Penerima"] || "[Nama Penerima]"}
Alamat: ${data["Alamat Penerima"] || "[Alamat Penerima]"}

DETAIL BARANG:
Deskripsi: ${data["Deskripsi Barang"] || "[Deskripsi Barang]"}
Kode HS: ${data["Kode HS"] || "[Kode HS]"}
Kriteria Asal: ${data["Kriteria Asal"] || "[Kriteria Asal]"}

INVOICE REFERENCE:
Nomor Invoice: ${data["Nomor Invoice"] || "[Nomor Invoice]"}
Tanggal Invoice: ${data["Tanggal Invoice"] || "[Tanggal Invoice]"}

Sertifikat ini menyatakan bahwa barang-barang yang disebutkan di atas berasal dari Indonesia.

This is to certify that the goods described above originate from Indonesia.`;

      case "packinglist":
        return `PACKING LIST

Packing List No: ${data["Nomor Packing List"] || "[Nomor Packing List]"}
Date: ${data["Tanggal Packing"] || "[Tanggal Packing]"}

SHIPPER:
${data["Nama Pengirim"] || "[Nama Pengirim]"}

CONSIGNEE:
${data["Nama Penerima"] || "[Nama Penerima]"}

DESCRIPTION OF GOODS:
${data["Deskripsi Barang"] || "[Deskripsi Barang]"}

PACKAGING DETAILS:
Jumlah Kemasan: ${data["Jumlah Kemasan"] || "[Jumlah Kemasan]"}
Jenis Kemasan: ${data["Jenis Kemasan"] || "[Jenis Kemasan]"}
Berat Kotor: ${data["Berat Kotor"] || "[Berat Kotor]"}
Berat Bersih: ${data["Berat Bersih"] || "[Berat Bersih]"}
Dimensi: ${data["Dimensi"] || "[Dimensi]"}

Total packages as described above.`;

      case "bl":
        return `BILL OF LADING

B/L No: ${data["Nomor B/L"] || "[Nomor B/L]"}
Vessel: ${data["Nama Kapal"] || "[Nama Kapal]"}

PORT OF LOADING: ${data["Pelabuhan Muat"] || "[Pelabuhan Muat]"}
PORT OF DISCHARGE: ${data["Pelabuhan Bongkar"] || "[Pelabuhan Bongkar]"}

SHIPPER:
${data["Nama Pengirim"] || "[Nama Pengirim]"}

CONSIGNEE:
${data["Nama Penerima"] || "[Nama Penerima]"}

DESCRIPTION OF GOODS:
${data["Deskripsi Barang"] || "[Deskripsi Barang]"}
Container: ${data["Jumlah Container"] || "[Jumlah Container]"}

This Bill of Lading is issued subject to the terms and conditions.`;

      case "insurance":
        return `MARINE INSURANCE CERTIFICATE

Policy No: ${data["Nomor Polis"] || "[Nomor Polis]"}
Insured: ${data["Nama Tertanggung"] || "[Nama Tertanggung]"}

DESCRIPTION OF GOODS:
${data["Jenis Barang"] || "[Jenis Barang]"}
Sum Insured: ${data["Nilai Pertanggungan"] || "[Nilai Pertanggungan]"}

VOYAGE:
From: ${data["Rute Pengangkutan"] || "[Rute Pengangkutan]"}
By: ${data["Jenis Kapal"] || "[Jenis Kapal]"}

COVERAGE: ${data["Periode Asuransi"] || "[Periode Asuransi]"}

This certificate is evidence of insurance coverage.`;

      default:
        return "Dokumen berhasil dibuat berdasarkan data yang Anda berikan.";
    }
  }

  static showDocumentList(
    setMessages,
    setCurrentFlow,
    completedDocuments = new Set()
  ) {
    const documents = this.exportDocuments.map((doc) => ({
      ...doc,
      completed: completedDocuments.has(doc.id),
    }));

    const botMessage = {
      from: "bot",
      text: "Berikut adalah daftar dokumen ekspor yang dapat saya bantu generate:",
      timestamp: new Date().toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      type: "document-list",
      documents: documents,
    };

    setMessages((prev) => [...prev, botMessage]);
    if (setCurrentFlow) setCurrentFlow("document-list");
  }

  static async generateDocument(
    docId,
    setMessages,
    setCompletedDocuments,
    setIsTyping
  ) {
    // Show typing animation
    setIsTyping(true);

    // Wait for 2 seconds to simulate processing
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Hide typing animation
    setIsTyping(false);

    // Show document
    const document = this.exportDocuments.find((doc) => doc.id === docId);

    if (document) {
      // Mark document as completed
      if (setCompletedDocuments) {
        setCompletedDocuments((prev) => {
          const newCompleted = new Set(prev);
          newCompleted.add(docId);
          return newCompleted;
        });
      }

      // Add document ready message
      setMessages((prev) => [
        ...prev,
        {
          from: "bot",
          text: `✅ ${document.name} telah berhasil dibuat!`,
          timestamp: new Date().toLocaleTimeString("id-ID", {
            hour: "2-digit",
            minute: "2-digit",
          }),
          type: "document-ready",
          content: this.createDocumentContent(
            document,
            this.generateDummyData(document)
          ),
          documentName: document.name,
        },
      ]);
    }
  }

  static handleCopy(content) {
    navigator.clipboard.writeText(content);
    alert("Content berhasil disalin!");
  }

  // FIX: Hapus parameter yang tidak diperlukan dari handleDownload
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

      // HAPUS bagian yang menyebabkan error - karena parameter tidak tersedia
      // setTimeout(() => {
      //   setCompletedDocuments((currentCompleted) => {
      //     this.showDocumentList(setMessages, setCurrentFlow, currentCompleted);
      //     return currentCompleted;
      //   });
      // }, 500);
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("PDF generation failed.");
    }
  }
}

export default DocumentGenerator;
