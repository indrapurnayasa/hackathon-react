// src/components/Sidebar.js
import React from "react";
import {
  Home,
  MessageSquare,
  Upload,
  BarChart2,
  HelpCircle,
} from "lucide-react";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const menus = [
    {
      name: "Dashboard",
      icon: <Home className="w-5 h-5" />,
      path: "/dashboard/home",
    },
    {
      name: "AI Chat",
      icon: <MessageSquare className="w-5 h-5" />,
      path: "/dashboard/ai-chat",
    },
    {
      name: "Upload",
      icon: <Upload className="w-5 h-5" />,
      path: "/dashboard/upload",
    },
    {
      name: "Market Insights",
      icon: <BarChart2 className="w-5 h-5" />,
      path: "/dashboard/insights",
    },
    {
      name: "Help",
      icon: <HelpCircle className="w-5 h-5" />,
      path: "/dashboard/help",
    },
  ];

  return (
    <aside className="w-64 bg-white p-6 border-r">
      <h2 className="text-xl font-bold mb-8 text-gray-400">Dashboard</h2>
      <nav className="space-y-4">
        {menus.map((menu, idx) => (
          <NavLink
            key={idx}
            to={menu.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-2 py-2 rounded-md ${
                isActive
                  ? "text-blue-600 font-semibold bg-blue-50"
                  : "text-gray-600 hover:text-blue-600 hover:bg-gray-50"
              }`
            }
          >
            {menu.icon}
            <span>{menu.name}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
