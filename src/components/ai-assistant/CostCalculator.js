// src/components/ai-assistant/CostCalculator.js
class CostCalculator {
  static generateExportCostEstimation(input) {
    // Parse input untuk mendapatkan data yang lebih realistis
    const inputLower = input.toLowerCase();

    // Dummy data berdasarkan input atau default
    let productName = "Kopi Arabika Premium";
    let baseWeight = 1000; // kg
    let baseValue = 10000000; // Rp 10 juta
    let destination = "Asia Tenggara";

    // Deteksi produk dari input
    if (inputLower.includes("kopi")) {
      productName = "Kopi Arabika Premium";
      baseValue = 12000000;
    } else if (inputLower.includes("rempah")) {
      productName = "Rempah-rempah Organik";
      baseValue = 8000000;
    } else if (inputLower.includes("tekstil") || inputLower.includes("batik")) {
      productName = "Tekstil Batik";
      baseValue = 15000000;
      baseWeight = 500;
    } else if (inputLower.includes("udang")) {
      productName = "Udang Beku";
      baseValue = 18000000;
      baseWeight = 800;
    }

    // Deteksi negara tujuan dari input
    if (inputLower.includes("jepang") || inputLower.includes("japan")) {
      destination = "Jepang";
      baseValue = Math.round(baseValue * 1.2); // Harga lebih tinggi untuk Jepang
    } else if (
      inputLower.includes("singapur") ||
      inputLower.includes("singapore")
    ) {
      destination = "Singapura";
      baseValue = Math.round(baseValue * 1.1);
    } else if (inputLower.includes("malaysia")) {
      destination = "Malaysia";
    } else if (
      inputLower.includes("amerika") ||
      inputLower.includes("usa") ||
      inputLower.includes("us")
    ) {
      destination = "Amerika Serikat";
      baseValue = Math.round(baseValue * 1.5);
    } else if (inputLower.includes("eropa") || inputLower.includes("europe")) {
      destination = "Eropa";
      baseValue = Math.round(baseValue * 1.4);
    }

    // Deteksi berat dari input
    if (inputLower.includes("ton")) {
      const tonMatch = inputLower.match(/(\d+)\s*ton/);
      if (tonMatch) {
        baseWeight = parseInt(tonMatch[1]) * 1000;
      }
    } else if (inputLower.includes("kg")) {
      const kgMatch = inputLower.match(/(\d+)\s*kg/);
      if (kgMatch) {
        baseWeight = parseInt(kgMatch[1]);
      }
    }

    const costs = {
      fob: baseValue,
      freight: Math.round(baseValue * 0.15), // 15% dari nilai FOB
      insurance: Math.round(baseValue * 0.005), // 0.5% dari nilai FOB
      handling: Math.round(baseValue * 0.02), // 2% dari nilai FOB
      documentation: 2500000, // Rp 2.5 juta
      customs: Math.round(baseValue * 0.01), // 1% dari nilai FOB
    };

    const taxes = {
      pph: Math.round(baseValue * 0.025), // 2.5% PPh
      pungutan: Math.round(baseValue * 0.005), // 0.5% pungutan ekspor
    };

    const total =
      costs.fob +
      costs.freight +
      costs.insurance +
      costs.handling +
      costs.documentation +
      costs.customs +
      taxes.pph +
      taxes.pungutan;

    return {
      productInfo: {
        name: productName,
        weight: `${baseWeight.toLocaleString()} kg`,
        value: `Rp ${baseValue.toLocaleString()}`,
        destination: destination,
      },
      costs,
      taxes,
      total,
      breakdown: {
        productName,
        baseWeight,
        baseValue,
        destination,
      },
    };
  }

  static calculateCost(setMessages, input) {
    const calculation = this.generateExportCostEstimation(input);
    const botMessage = {
      from: "bot",
      text: "Berdasarkan informasi yang Anda berikan, berikut adalah estimasi biaya ekspor:",
      type: "cost-estimation",
      content: calculation,
      timestamp: new Date().toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    setMessages((prev) => [...prev, botMessage]);
  }
}

export default CostCalculator;
