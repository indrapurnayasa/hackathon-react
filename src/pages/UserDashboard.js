// src/pages/UserDashboard.js
import React from "react";
import {
  Upload,
  BarChart2,
  HelpCircle,
  CheckCircle,
  Clock,
} from "lucide-react";

const recentActivities = [
  {
    date: "July 7, 2022",
    text: "Requested help with writing an email",
    status: "Pending",
    icon: <Clock className="w-5 h-5 text-gray-500" />,
  },
  {
    date: "July 6, 2022",
    text: "Requested help with writing an email",
    status: "Completed",
    icon: <CheckCircle className="w-5 h-5 text-green-500" />,
  },
  {
    date: "July 6, 2022",
    text: "Requested help with writing an email",
    status: "Completed",
    icon: <CheckCircle className="w-5 h-5 text-green-500" />,
  },
  {
    date: "July 6, 2022",
    text: "Requested help with writing an email",
    status: "Completed",
    icon: <CheckCircle className="w-5 h-5 text-green-500" />,
  },
];

export default function UserDashboard() {
  return (
    <div>
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold">
            Welcome to the platform, Faizal
          </h1>
          <div className="mt-4">
            <h2 className="text-lg font-semibold">AI Chat</h2>
            <p className="text-sm text-gray-600">
              Get answers to your questions, or have us write your emails, ads,
              and more.
            </p>
            <button className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-md text-sm">
              Start chatting
            </button>
          </div>
        </div>
        <img
          src="https://placehold.co/200x120"
          alt="illustration"
          className="rounded-lg"
        />
      </div>

      {/* Quick Access */}
      <div className="mt-10">
        <h2 className="text-lg font-semibold mb-4">Quick access</h2>
        <div className="grid grid-cols-3 gap-4">
          <div className="border rounded-lg p-4">
            <Upload className="w-5 h-5 mb-2 text-gray-600" />
            <h3 className="font-semibold">Upload a document</h3>
            <p className="text-sm text-gray-600">
              Get a quick analysis from our AI
            </p>
          </div>
          <div className="border rounded-lg p-4">
            <BarChart2 className="w-5 h-5 mb-2 text-gray-600" />
            <h3 className="font-semibold">Market insights</h3>
            <p className="text-sm text-gray-600">
              Understand market trends and opportunities
            </p>
          </div>
          <div className="border rounded-lg p-4">
            <HelpCircle className="w-5 h-5 mb-2 text-gray-600" />
            <h3 className="font-semibold">Help</h3>
            <p className="text-sm text-gray-600">
              Find answers to common questions
            </p>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="mt-10">
        <h2 className="text-lg font-semibold mb-4">Recent activity</h2>
        <div className="space-y-4">
          {recentActivities.map((activity, idx) => (
            <div
              key={idx}
              className="flex justify-between items-start bg-white p-4 rounded-lg shadow-sm"
            >
              <div className="flex items-center gap-3">
                {activity.icon}
                <div>
                  <p className="text-sm font-semibold">{activity.date}</p>
                  <p className="text-sm text-gray-600">{activity.text}</p>
                </div>
              </div>
              <p className="text-sm text-gray-500 mt-1">{activity.status}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
