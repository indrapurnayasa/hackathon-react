
// src/pages/UserDashboard.js
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Bot, 
  Truck, 
  TrendingUp, 
  ArrowRight,
  Globe,
  DollarSign,
  FileText
} from 'lucide-react';

export default function UserDashboard() {
  const stats = [
    {
      title: "Total Ekspor",
      subtitle: "Bulan Ini",
      value: "Rp 2.8M",
      change: "+12%",
      icon: <DollarSign className="w-8 h-8" />,
      color: "blue"
    },
    {
      title: "Dokumen",
      subtitle: "Diproses",
      value: "24",
      change: "+8%",
      icon: <FileText className="w-8 h-8" />,
      color: "green"
    },
    {
      title: "Pengiriman",
      subtitle: "Aktif",
      value: "7",
      change: "+3",
      icon: <Truck className="w-8 h-8" />,
      color: "purple"
    },
    {
      title: "Negara",
      subtitle: "Tujuan",
      value: "12",
      change: "+2",
      icon: <Globe className="w-8 h-8" />,
      color: "orange"
    }
  ];

  const features = [
    {
      title: "AI Assistant",
      description: "Generate dokumen, email, proposal dan estimasi biaya dengan AI",
      icon: <Bot className="w-12 h-12" />,
      path: "/dashboard/ai-assistant",
      benefits: ["Generate Dokumen", "Email & Proposal", "Estimasi Biaya"],
      color: "blue"
    },
    {
      title: "Shipping",
      description: "Rute pengiriman optimal dan rekomendasi kurir terpercaya",
      icon: <Truck className="w-12 h-12" />,
      path: "/dashboard/shipping",
      benefits: ["Rute Optimal", "Perbandingan Harga", "Tracking Real-time"],
      color: "green"
    },
    {
      title: "Trend Analysis",
      description: "Analisis tren musiman dan permintaan pasar per negara",
      icon: <TrendingUp className="w-12 h-12" />,
      path: "/dashboard/trend",
      benefits: ["Data Musiman", "Market Insight", "Demand Forecast"],
      color: "purple"
    }
  ];

  const recentActivities = [
    {
      action: "Dokumen ekspor kopi ke Jepang telah disetujui",
      time: "2 jam yang lalu",
      status: "success"
    },
    {
      action: "Pengiriman rempah ke Jerman dalam perjalanan",
      time: "5 jam yang lalu", 
      status: "info"
    },
    {
      action: "Proposal kerjasama dengan buyer Belanda dikirim",
      time: "1 hari yang lalu",
      status: "warning"
    },
    {
      action: "Estimasi biaya ekspor tekstil telah dihitung",
      time: "2 hari yang lalu",
      status: "success"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="hero-section px-8 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="fade-in-up">
            <h1 className="text-hero text-gray-900 mb-6">
              We Craft
              <br />
              <span className="text-blue-600">Export Success</span>
            </h1>
            <p className="text-large max-w-2xl mb-8">
              Platform terdepan untuk mengelola ekspor Indonesia dengan teknologi AI dan automasi terbaru
            </p>
            <div className="flex space-x-4">
              <button className="btn-primary">Mulai Ekspor</button>
              <button className="btn-secondary">Pelajari Lebih Lanjut</button>
            </div>
          </div>
        </div>
      </div>

      <div className="px-8 pb-12">
        <div className="max-w-7xl mx-auto">
          {/* Stats Section */}
          <div className="stats-grid mb-16">
            {stats.map((stat, index) => (
              <div key={index} className="feature-card text-center">
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6 ${
                  stat.color === 'blue' ? 'bg-blue-100 text-blue-600' :
                  stat.color === 'green' ? 'bg-green-100 text-green-600' :
                  stat.color === 'purple' ? 'bg-purple-100 text-purple-600' :
                  'bg-orange-100 text-orange-600'
                }`}>
                  {stat.icon}
                </div>
                <div className="mb-4">
                  <h3 className="text-4xl font-black text-gray-900 mb-1">{stat.value}</h3>
                  <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                    {stat.title} {stat.subtitle}
                  </p>
                </div>
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${
                  stat.change.startsWith('+') ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {stat.change}
                </span>
              </div>
            ))}
          </div>

          {/* Features Section */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-5xl font-black text-gray-900 mb-4">Fitur Utama</h2>
              <p className="text-large max-w-3xl mx-auto">
                Solusi lengkap untuk setiap kebutuhan ekspor Anda
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {features.map((feature, index) => (
                <Link
                  key={index}
                  to={feature.path}
                  className="feature-card group cursor-pointer"
                >
                  <div className="flex items-start space-x-6">
                    <div className={`flex-shrink-0 p-4 rounded-2xl ${
                      feature.color === 'blue' ? 'bg-blue-100 text-blue-600' :
                      feature.color === 'green' ? 'bg-green-100 text-green-600' :
                      feature.color === 'purple' ? 'bg-purple-100 text-purple-600' :
                      'bg-orange-100 text-orange-600'
                    }`}>
                      {feature.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                          {feature.title}
                        </h3>
                        <ArrowRight className="w-6 h-6 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                      </div>
                      <p className="text-gray-600 mb-6 font-medium">
                        {feature.description}
                      </p>
                      <div className="space-y-2">
                        {feature.benefits.map((benefit, idx) => (
                          <div key={idx} className="flex items-center space-x-3">
                            <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                            <span className="text-sm text-gray-700 font-medium">{benefit}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Activities & Quick Actions */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Recent Activities */}
            <div className="lg:col-span-2 card-modern">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-bold text-gray-900">Aktivitas Terbaru</h3>
                <button className="text-sm text-blue-600 hover:text-blue-800 font-semibold uppercase tracking-wide">
                  Lihat Semua
                </button>
              </div>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-4 p-4 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className={`w-3 h-3 rounded-full mt-2 ${
                      activity.status === 'success' ? 'bg-green-500' :
                      activity.status === 'info' ? 'bg-blue-500' :
                      activity.status === 'warning' ? 'bg-orange-500' :
                      'bg-gray-500'
                    }`}></div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-gray-900">{activity.action}</p>
                      <p className="text-xs text-gray-500 mt-1 font-medium">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="card-modern">
              <h3 className="text-2xl font-bold text-gray-900 mb-8">Quick Actions</h3>
              <div className="space-y-4">
                <button className="w-full bg-gray-900 text-white py-4 px-6 rounded-lg hover:bg-gray-800 transition-colors text-sm font-bold uppercase tracking-wide">
                  Buat Dokumen Baru
                </button>
                <button className="w-full bg-gray-100 text-gray-900 py-4 px-6 rounded-lg hover:bg-gray-200 transition-colors text-sm font-semibold">
                  Cek Status Pengiriman
                </button>
                <button className="w-full bg-gray-100 text-gray-900 py-4 px-6 rounded-lg hover:bg-gray-200 transition-colors text-sm font-semibold">
                  Analisis Tren Terbaru
                </button>
                <button className="w-full bg-gray-100 text-gray-900 py-4 px-6 rounded-lg hover:bg-gray-200 transition-colors text-sm font-semibold">
                  Generate Email
                </button>
              </div>

              {/* Help Section */}
              <div className="mt-8 pt-8 border-t border-gray-200">
                <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                  <h4 className="font-bold text-gray-900 mb-2">Butuh Bantuan?</h4>
                  <p className="text-sm text-gray-600 mb-4 font-medium">
                    Tim support kami siap membantu 24/7
                  </p>
                  <button className="text-sm bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-semibold uppercase tracking-wide">
                    Contact Support
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
