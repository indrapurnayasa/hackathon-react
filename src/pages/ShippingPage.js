// src/pages/ShippingPage.js
import React, { useState } from "react";
import { MapPin, Clock, DollarSign, Star, Truck, Plane, Ship } from "lucide-react";

export default function ShippingPage() {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedCourier, setSelectedCourier] = useState(null);

  const countries = [
    { code: "JP", name: "Jepang", flag: "🇯🇵", distance: "5,760 km" },
    { code: "DE", name: "Jerman", flag: "🇩🇪", distance: "11,800 km" }
  ];

  const shippingRoutes = {
    JP: {
      route: "Jakarta → Singapura → Tokyo",
      duration: "5-7 hari",
      steps: [
        { city: "Jakarta", country: "Indonesia", duration: "0 hari" },
        { city: "Singapura", country: "Singapura", duration: "1 hari" },
        { city: "Tokyo", country: "Jepang", duration: "5-7 hari" }
      ]
    },
    DE: {
      route: "Jakarta → Dubai → Frankfurt",
      duration: "8-12 hari", 
      steps: [
        { city: "Jakarta", country: "Indonesia", duration: "0 hari" },
        { city: "Dubai", country: "UAE", duration: "2 hari" },
        { city: "Frankfurt", country: "Jerman", duration: "8-12 hari" }
      ]
    }
  };

  const couriers = {
    JP: [
      {
        id: 1,
        name: "DHL Express",
        type: "Express Air",
        icon: <Plane className="w-5 h-5" />,
        duration: "3-5 hari",
        price: "Rp 2,500,000",
        rating: 4.8,
        features: ["Tracking Real-time", "Asuransi Penuh", "Door-to-door"]
      },
      {
        id: 2,
        name: "FedEx International",
        type: "Express Air",
        icon: <Plane className="w-5 h-5" />,
        duration: "4-6 hari",
        price: "Rp 2,200,000",
        rating: 4.7,
        features: ["Tracking Real-time", "Customs Clearance", "Signature Required"]
      },
      {
        id: 3,
        name: "Sea Freight Standard",
        type: "Sea Cargo",
        icon: <Ship className="w-5 h-5" />,
        duration: "14-21 hari",
        price: "Rp 800,000",
        rating: 4.3,
        features: ["Ekonomis", "Kapasitas Besar", "Eco-friendly"]
      }
    ],
    DE: [
      {
        id: 1,
        name: "DHL Express",
        type: "Express Air",
        icon: <Plane className="w-5 h-5" />,
        duration: "4-7 hari",
        price: "Rp 3,200,000",
        rating: 4.8,
        features: ["Tracking Real-time", "Asuransi Penuh", "Door-to-door"]
      },
      {
        id: 2,
        name: "UPS Worldwide",
        type: "Express Air", 
        icon: <Plane className="w-5 h-5" />,
        duration: "5-8 hari",
        price: "Rp 2,900,000",
        rating: 4.6,
        features: ["Tracking Real-time", "Customs Support", "Flexible Delivery"]
      },
      {
        id: 3,
        name: "Sea Freight Economy",
        type: "Sea Cargo",
        icon: <Ship className="w-5 h-5" />,
        duration: "25-35 hari",
        price: "Rp 1,200,000",
        rating: 4.2,
        features: ["Hemat Biaya", "Kapasitas Besar", "Ramah Lingkungan"]
      }
    ]
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">Smart Shipping</h1>
        <p className="text-gray-600 max-w-2xl">
          Temukan rute pengiriman terbaik dan pilih kurir yang sesuai dengan kebutuhan ekspor Anda. 
          Dapatkan estimasi biaya dan waktu pengiriman yang akurat.
        </p>
      </div>

      {/* Country Selection */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Pilih Negara Tujuan</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {countries.map((country) => (
            <button
              key={country.code}
              onClick={() => setSelectedCountry(country.code)}
              className={`p-6 rounded-xl border-2 transition-all ${
                selectedCountry === country.code
                  ? "border-gray-900 bg-gray-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <div className="flex items-center space-x-4">
                <span className="text-3xl">{country.flag}</span>
                <div className="text-left">
                  <h3 className="font-semibold text-gray-900">{country.name}</h3>
                  <p className="text-sm text-gray-500">{country.distance} dari Jakarta</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Shipping Route */}
      {selectedCountry && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Rute Pengiriman</h2>
          <div className="bg-white rounded-xl border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold text-gray-900">
                {shippingRoutes[selectedCountry].route}
              </h3>
              <div className="flex items-center space-x-2 text-green-600">
                <Clock className="w-4 h-4" />
                <span className="text-sm font-medium">
                  {shippingRoutes[selectedCountry].duration}
                </span>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute left-4 top-8 bottom-0 w-0.5 bg-gray-200"></div>
              {shippingRoutes[selectedCountry].steps.map((step, index) => (
                <div key={index} className="relative flex items-center space-x-4 pb-6">
                  <div className="w-8 h-8 bg-gray-900 rounded-full flex items-center justify-center relative z-10">
                    <MapPin className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{step.city}</h4>
                    <p className="text-sm text-gray-500">{step.country}</p>
                  </div>
                  <div className="text-sm text-gray-500">{step.duration}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Courier Selection */}
      {selectedCountry && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Pilih Kurir Pengiriman</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {couriers[selectedCountry].map((courier) => (
              <div
                key={courier.id}
                className={`bg-white rounded-xl border-2 p-6 cursor-pointer transition-all ${
                  selectedCourier?.id === courier.id
                    ? "border-gray-900 shadow-lg"
                    : "border-gray-100 hover:border-gray-200 hover:shadow-md"
                }`}
                onClick={() => setSelectedCourier(courier)}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                      {courier.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{courier.name}</h3>
                      <p className="text-xs text-gray-500">{courier.type}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-gray-600">{courier.rating}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Estimasi Waktu:</span>
                    <span className="text-sm font-medium text-gray-900">{courier.duration}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Biaya:</span>
                    <span className="text-lg font-bold text-gray-900">{courier.price}</span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="space-y-1">
                    {courier.features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                        <span className="text-xs text-gray-600">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Action Button */}
      {selectedCountry && selectedCourier && (
        <div className="bg-white rounded-xl border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">
                Siap untuk melanjutkan pengiriman?
              </h3>
              <p className="text-sm text-gray-600">
                {selectedCourier.name} ke {countries.find(c => c.code === selectedCountry)?.name}
              </p>
            </div>
            <button className="bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors">
              Lanjutkan Booking
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

