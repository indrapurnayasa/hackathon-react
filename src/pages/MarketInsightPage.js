import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const mockData = {
  Indonesia: [
    { name: "Kopi", volume: 4000 },
    { name: "Kakao", volume: 3000 },
    { name: "Karet", volume: 2000 },
    { name: "Udang", volume: 2700 },
    { name: "Kayu Lapis", volume: 1800 },
  ],
  Jepang: [
    { name: "Tuna", volume: 4200 },
    { name: "Udang", volume: 3900 },
    { name: "Kopi", volume: 3200 },
    { name: "Teh", volume: 2900 },
    { name: "Kakao", volume: 1500 },
  ],
  USA: [
    { name: "Furniture", volume: 5000 },
    { name: "Kopi", volume: 4500 },
    { name: "Minyak Kelapa", volume: 3000 },
    { name: "Rempah", volume: 2800 },
    { name: "Karet", volume: 2100 },
  ],
};

const countries = Object.keys(mockData);

export default function MarketInsightsPage() {
  const [selectedCountry, setSelectedCountry] = useState("Indonesia");

  return (
    <div className="min-h-screen p-6 bg-white">
      <h1 className="text-2xl font-bold text-gray-800 mb-2">Market Insights</h1>
      <p className="text-sm text-gray-600 mb-6">
        Lihat tren ekspor berdasarkan negara tujuan. Temukan komoditas dengan
        permintaan tinggi!
      </p>

      {/* Dropdown */}
      <div className="mb-6">
        <label className="block mb-2 text-sm font-medium text-gray-700">
          Pilih Negara Tujuan
        </label>
        <select
          value={selectedCountry}
          onChange={(e) => setSelectedCountry(e.target.value)}
          className="border border-gray-300 rounded-md px-4 py-2 text-sm w-full max-w-xs"
        >
          {countries.map((country, idx) => (
            <option key={idx} value={country}>
              {country}
            </option>
          ))}
        </select>
      </div>

      {/* Chart */}
      <div className="w-full h-80 bg-gray-50 border rounded-lg p-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={mockData[selectedCountry]}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="volume" fill="#2563eb" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Table */}
      <div className="mt-10">
        <h2 className="text-lg font-semibold mb-4">
          Detail Komoditas – {selectedCountry}
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto text-sm">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="text-left px-4 py-2">Komoditas</th>
                <th className="text-left px-4 py-2">Volume Ekspor (ton)</th>
              </tr>
            </thead>
            <tbody>
              {mockData[selectedCountry].map((item, idx) => (
                <tr
                  key={idx}
                  className="border-b hover:bg-gray-50 transition-all"
                >
                  <td className="px-4 py-2">{item.name}</td>
                  <td className="px-4 py-2">{item.volume.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
