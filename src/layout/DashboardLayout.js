// src/layout/DashboardLayout.js
import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import {
  Home,
  MessageSquare,
  Upload,
  BarChart2,
  HelpCircle,
} from "lucide-react";

export default function DashboardLayout() {
  const menuItems = [
    { label: "Dashboard", to: "home", icon: <Home /> },
    { label: "AI Chat", to: "chat", icon: <MessageSquare /> },
    { label: "Upload a Document", to: "upload", icon: <Upload /> },
    { label: "Market Insights", to: "insights", icon: <BarChart2 /> },
    { label: "Help", to: "help", icon: <HelpCircle /> },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white p-6 border-r">
        <h2 className="text-xl font-bold mb-8 text-gray-400">Dashboard</h2>
        <nav className="space-y-4">
          {menuItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-2 py-2 rounded-md ${
                  isActive
                    ? "bg-blue-100 text-blue-600 font-semibold"
                    : "text-gray-600 hover:text-blue-600"
                }`
              }
            >
              {item.icon} {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Dynamic Content */}
      <main className="flex-1 p-10">
        <Outlet />
      </main>
    </div>
  );
}
