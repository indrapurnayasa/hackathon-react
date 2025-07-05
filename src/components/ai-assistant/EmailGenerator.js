// src/components/ai-assistant/EmailGenerator.js
import { Copy } from "lucide-react";

class EmailGenerator {
  static exportEmailTemplates = [
    {
      id: "product-inquiry",
      name: "Product Inquiry Email",
      description: "Email untuk menanyakan produk kepada supplier/eksportir",
      category: "Inquiry",
      fields: [
        "Nama Perusahaan Anda",
        "Nama Anda",
        "Jabatan Anda",
        "Email Perusahaan",
        "Nama Perusahaan Penerima",
        "Nama Penerima",
        "Produk yang Diminati",
      ],
    },
    {
      id: "business-introduction",
      name: "Business Introduction Email",
      description:
        "Email perkenalan perusahaan untuk membangun hubungan bisnis",
      category: "Introduction",
      fields: [
        "Nama Perusahaan Anda",
        "Tahun Berdiri",
        "Jenis Bisnis",
        "Produk Utama",
        "Nama Anda",
        "Jabatan Anda",
        "Website Perusahaan",
      ],
    },
    {
      id: "export-offer",
      name: "Export Offer Email",
      description: "Email penawaran ekspor produk dengan detail lengkap",
      category: "Offer",
      fields: [
        "Nama Perusahaan Anda",
        "Nama Anda",
        "Jabatan Anda",
        "Nama Penerima",
        "Perusahaan Penerima",
        "Nama Produk",
        "Deskripsi Produk",
        "Quantity",
        "Harga per Unit",
      ],
    },
  ];

  static generateDummyEmailData(template) {
    const dummyData = {};
    template.fields.forEach((field) => {
      switch (field) {
        case "Nama Perusahaan Anda":
          dummyData[field] = "PT. Indonesia Export Solutions";
          break;
        case "Nama Anda":
          dummyData[field] = "Ahmad Wijaya";
          break;
        case "Jabatan Anda":
          dummyData[field] = "Export Manager";
          break;
        case "Email Perusahaan":
          dummyData[field] = "ahmad.wijaya@exportindo.com";
          break;
        case "Nama Penerima":
          dummyData[field] = "John Smith";
          break;
        case "Nama Perusahaan Penerima":
        case "Perusahaan Penerima":
          dummyData[field] = "Global Import Trading LLC";
          break;
        case "Produk yang Diminati":
          dummyData[field] = "Premium Coffee Beans";
          break;
        case "Tahun Berdiri":
          dummyData[field] = "2015";
          break;
        case "Jenis Bisnis":
          dummyData[field] = "Coffee Export";
          break;
        case "Produk Utama":
          dummyData[field] = "Arabica and Robusta Coffee";
          break;
        case "Website Perusahaan":
          dummyData[field] = "www.exportindo.com";
          break;
        case "Nama Produk":
          dummyData[field] = "Premium Indonesian Coffee";
          break;
        case "Deskripsi Produk":
          dummyData[field] =
            "High-quality Arabica coffee beans from Indonesian highlands";
          break;
        case "Quantity":
          dummyData[field] = "5000 kg per month";
          break;
        case "Harga per Unit":
          dummyData[field] = "USD 8.50 per kg";
          break;
        default:
          dummyData[field] = `Sample ${field}`;
      }
    });
    return dummyData;
  }

  static generateEmailFromTemplate(template, data) {
    switch (template.id) {
      case "product-inquiry":
        return `Subject: Product Inquiry - ${
          data["Produk yang Diminati"] || "[Product Name]"
        }

Dear ${data["Nama Penerima"] || "[Recipient Name]"},

I hope this email finds you well. My name is ${
          data["Nama Anda"] || "[Your Name]"
        }, ${data["Jabatan Anda"] || "[Your Position]"} at ${
          data["Nama Perusahaan Anda"] || "[Your Company]"
        }.

We are interested in your ${
          data["Produk yang Diminati"] || "[Product Name]"
        } and would like to inquire about product specifications, pricing, and delivery terms.

We look forward to establishing a mutually beneficial business relationship.

Best regards,
${data["Nama Anda"] || "[Your Name]"}
${data["Nama Perusahaan Anda"] || "[Your Company]"}
${data["Email Perusahaan"] || "[Your Email]"}`;

      case "business-introduction":
        return `Subject: Business Introduction - ${
          data["Nama Perusahaan Anda"] || "[Your Company]"
        }

Dear Sir/Madam,

I am ${data["Nama Anda"] || "[Your Name]"}, ${
          data["Jabatan Anda"] || "[Your Position]"
        } at ${data["Nama Perusahaan Anda"] || "[Your Company]"}.

Established in ${data["Tahun Berdiri"] || "[Year]"}, we are a leading ${
          data["Jenis Bisnis"] || "[Business Type]"
        } company specializing in ${data["Produk Utama"] || "[Main Products]"}.

Please visit our website at ${
          data["Website Perusahaan"] || "[Website]"
        } for more information.

Looking forward to your positive response.

Best regards,
${data["Nama Anda"] || "[Your Name]"}
${data["Nama Perusahaan Anda"] || "[Your Company]"}`;

      case "export-offer":
        return `Subject: Export Offer - ${
          data["Nama Produk"] || "[Product Name]"
        }

Dear ${data["Nama Penerima"] || "[Recipient Name]"},

I am ${data["Nama Anda"] || "[Your Name]"}, ${
          data["Jabatan Anda"] || "[Your Position]"
        } at ${data["Nama Perusahaan Anda"] || "[Your Company]"}.

We are pleased to offer you our ${
          data["Nama Produk"] || "[Product Name]"
        } with the following specifications:

Product: ${data["Nama Produk"] || "[Product Name]"}
Description: ${data["Deskripsi Produk"] || "[Product Description]"}
Quantity: ${data["Quantity"] || "[Quantity]"}
Price: ${data["Harga per Unit"] || "[Price per Unit]"}

We believe this product will meet your requirements and look forward to your favorable response.

Best regards,
${data["Nama Anda"] || "[Your Name]"}
${data["Nama Perusahaan Anda"] || "[Your Company]"}`;

      default:
        return "Professional email template generated based on your requirements.";
    }
  }

  // HAPUS PARAMETER completedEmails - tidak perlu tracking
  static showEmailList(setMessages, setCurrentFlow) {
    setCurrentFlow("email-list");
    // LANGSUNG GUNAKAN TEMPLATE TANPA STATUS
    const emailTemplates = this.exportEmailTemplates;

    const botMessage = {
      from: "bot",
      text: "Berikut adalah template email profesional untuk ekspor yang dapat saya buatkan:",
      timestamp: new Date().toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      type: "email-template-list",
      emailTemplates: emailTemplates,
    };
    setMessages((prev) => [...prev, botMessage]);
  }

  // HAPUS PARAMETER setCompletedEmails
  static async generateEmail(template, setMessages, setIsTyping) {
    setIsTyping(true);

    const processingMessage = {
      from: "bot",
      text: `Sedang memproses ${template.name}... Saya akan mengisi semua informasi yang diperlukan secara otomatis. ⏳`,
      timestamp: new Date().toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [...prev, processingMessage]);

      setTimeout(() => {
        const dummyData = this.generateDummyEmailData(template);
        const content = this.generateEmailFromTemplate(template, dummyData);

        // HAPUS LOGIC COMPLETED EMAILS

        const completedMessage = {
          from: "bot",
          text: `✅ Excellent! ${template.name} telah berhasil dibuat dengan konten lengkap. Email siap untuk dicopy.`,
          timestamp: new Date().toLocaleTimeString("id-ID", {
            hour: "2-digit",
            minute: "2-digit",
          }),
          type: "email-ready",
          content: content,
        };
        setMessages((prev) => [...prev, completedMessage]);

        // TIDAK PERLU TIMEOUT UNTUK SHOW LIST LAGI
      }, 2000);
    }, 1000);
  }

  static handleCopy(content) {
    navigator.clipboard.writeText(content);
    alert("Email berhasil dicopy ke clipboard!");
  }
}

export default EmailGenerator;
