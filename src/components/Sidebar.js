// src/components/Sidebar.js
import React from "react";
import {
  Bot,
  Truck,
  TrendingUp,
  ChevronRight,
} from "lucide-react";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const menus = [
    {
      name: "AI Assistant",
      icon: <Bot size={16} />,
      path: "/dashboard/ai-assistant",
      description: "Generate & estimasi"
    },
    {
      name: "Shipping",
      icon: <Truck size={16} />,
      path: "/dashboard/shipping", 
      description: "Pengiriman & kurir"
    },
    {
      name: "Trend",
      icon: <TrendingUp size={16} />,
      path: "/dashboard/trend",
      description: "Analisis & permintaan"
    }
  ];

  return (
    <div className="w-72 bg-white border-r border-gray-200 h-screen sticky top-0 shadow-sm">
      {/* Logo Section */}
      <div className="p-8 border-b border-gray-100">
        <h1 className="text-2xl font-black text-gray-900 tracking-tight">ExportHub</h1>
        <p className="text-sm text-gray-500 mt-2 font-medium">Dashboard Ekspor Indonesia</p>
      </div>

      {/* Navigation Menu */}
      <nav className="p-6 space-y-3">
        {menus.map((menu, index) => (
          <NavLink
            key={index}
            to={menu.path}
            className={({ isActive }) =>
              `group flex items-center p-4 rounded-xl transition-all duration-200 overflow-hidden ${
                isActive
                  ? "bg-gray-900 text-white shadow-lg"
                  : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
              }`
            }
          >
            <div className="flex items-center min-w-0 flex-1">
              <div className="flex-shrink-0 mr-3">
                {menu.icon}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold truncate">
                  {menu.name}
                </p>
                <p className="text-xs opacity-75 truncate font-medium">
                  {menu.description}
                </p>
              </div>
            </div>
            <div className="flex-shrink-0 ml-2">
              <ChevronRight size={12} className="opacity-50 group-hover:opacity-100 transition-opacity" />
            </div>
          </NavLink>
        ))}
      </nav>

      {/* User Section - Mengganti Help Section */}
      <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-100">
        <div className="bg-gray-100 rounded-xl p-6 border border-gray-300/50">
          <h4 className="font-bold text-gray-900 mb-2">Halo, Versa!</h4>
          <p className="text-sm text-gray-700 mb-3 font-medium">
            Selamat datang kembali di ExportHub. Apa yang ingin Anda lakukan hari ini?
          </p>
          <button className="w-full text-sm bg-gray-900 text-white px-3 py-2 rounded-lg hover:bg-gray-800 transition-colors font-semibold uppercase tracking-wide">
            Lihat Profil
          </button>
        </div>
      </div>
    </div>
  );
}
