// src/layout/DashboardLayout.js
import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

export default function DashboardLayout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <Sidebar />
        <main className="flex-1 overflow-hidden">
          <div className="h-screen overflow-y-auto bg-gray-50">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
