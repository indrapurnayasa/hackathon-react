
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
      icon: <Bot size={20} />,
      path: "/dashboard/ai-assistant",
      description: "Generate dokumen, email & estimasi biaya"
    },
    {
      name: "Shipping",
      icon: <Truck size={20} />,
      path: "/dashboard/shipping", 
      description: "Alur pengiriman & rekomendasi kurir"
    },
    {
      name: "Trend",
      icon: <TrendingUp size={20} />,
      path: "/dashboard/trend",
      description: "Analisis tren produk & permintaan"
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
              `group flex items-center justify-between p-4 rounded-xl transition-all duration-200 ${
                isActive
                  ? "bg-gray-900 text-white shadow-lg"
                  : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
              }`
            }
          >
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                {menu.icon}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold truncate">
                  {menu.name}
                </p>
                <p className="text-xs opacity-75 truncate font-medium">
                  {menu.description}
                </p>
              </div>
            </div>
            <ChevronRight size={16} className="opacity-50 group-hover:opacity-100 transition-opacity" />
          </NavLink>
        ))}
      </nav>

      {/* Bottom Section */}
      <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-100">
        <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
          <h3 className="text-sm font-bold text-gray-900 mb-2">Butuh Bantuan?</h3>
          <p className="text-xs text-gray-600 mb-4 font-medium">
            Tim support kami siap membantu 24/7
          </p>
          <button className="w-full bg-gray-900 text-white text-xs py-3 px-4 rounded-lg hover:bg-gray-800 transition-colors font-semibold uppercase tracking-wide">
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
}
