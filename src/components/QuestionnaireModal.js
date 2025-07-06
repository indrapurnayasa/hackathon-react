// src/components/QuestionnaireModal.js
import React, { useState } from "react";
import { X, ChevronRight, ChevronLeft } from "lucide-react";

const QuestionnaireModal = ({ isOpen, onClose, onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({
    commodity: "",
    targetCountry: "",
    experience: "",
    purpose: "",
  });

  const steps = [
    {
      id: "commodity",
      title: "Komoditas Ekspor",
      question: "Apa komoditas yang Anda miliki untuk ekspor?",
      options: [
        { value: "kopi", label: "Kopi", emoji: "☕" },
        { value: "rempah", label: "Rempah-rempah", emoji: "🌶️" },
        { value: "kelapa", label: "Produk Kelapa", emoji: "🥥" },
        { value: "udang", label: "Udang Beku", emoji: "🦐" },
        { value: "tekstil", label: "Tekstil Batik", emoji: "👘" },
        { value: "furniture", label: "Furniture Kayu", emoji: "🪑" },
        { value: "lainnya", label: "Lainnya", emoji: "📦" },
      ],
    },
    {
      id: "targetCountry",
      title: "Negara Tujuan",
      question: "Ke negara mana Anda ingin mengekspor?",
      options: [
        { value: "malaysia", label: "Malaysia", emoji: "🇲🇾" },
        { value: "singapore", label: "Singapore", emoji: "🇸🇬" },
        { value: "spain", label: "Spain", emoji: "🇪🇸" },
        { value: "kenya", label: "Kenya", emoji: "🇰🇪" },
        { value: "jepang", label: "Jepang", emoji: "🇯🇵" },
        { value: "jerman", label: "Jerman", emoji: "🇩🇪" },
        { value: "lainnya", label: "Negara Lain", emoji: "🌍" },
      ],
    },
    {
      id: "experience",
      title: "Pengalaman Ekspor",
      question: "Bagaimana pengalaman ekspor Anda?",
      options: [
        { value: "pemula", label: "Pemula (Belum pernah ekspor)", emoji: "🌱" },
        { value: "menengah", label: "Menengah (1-5 kali ekspor)", emoji: "📈" },
        {
          value: "berpengalaman",
          label: "Berpengalaman (>5 kali ekspor)",
          emoji: "🏆",
        },
        { value: "expert", label: "Expert (Rutin ekspor)", emoji: "⭐" },
      ],
    },
    {
      id: "purpose",
      title: "Tujuan Penggunaan",
      question: "Apa tujuan utama Anda menggunakan platform ini?",
      options: [
        {
          value: "belajar-alur",
          label: "Belajar alur pengiriman ekspor",
          emoji: "📚",
        },
        { value: "cara-ekspor", label: "Memahami cara ekspor", emoji: "🎯" },
        { value: "dokumentasi", label: "Bantuan dokumentasi", emoji: "📋" },
        {
          value: "estimasi-biaya",
          label: "Estimasi biaya ekspor",
          emoji: "💰",
        },
        { value: "trend-pasar", label: "Analisis trend pasar", emoji: "📊" },
        { value: "networking", label: "Networking dan koneksi", emoji: "🤝" },
      ],
    },
  ];

  const currentStepData = steps[currentStep];

  const handleAnswerSelect = (value) => {
    setAnswers((prev) => ({
      ...prev,
      [currentStepData.id]: value,
    }));
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Complete questionnaire
      onComplete(answers);
      onClose();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkip = () => {
    onClose();
  };

  if (!isOpen) return null;

  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative w-[90vw] h-[90vh] max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="relative p-6 sm:p-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-full hover:bg-white/20 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="max-w-2xl">
            <h1
              className="text-2xl sm:text-3xl font-bold mb-3"
              style={{
                fontFamily: "'Product Sans', 'Google Sans Text', sans-serif",
                fontWeight: 700,
              }}
            >
              Personalisasi Pengalaman Anda
            </h1>
            <p
              className="text-blue-100 text-lg"
              style={{
                fontFamily: "'Google Sans Text', 'Roboto', sans-serif",
                fontWeight: 400,
              }}
            >
              Bantu kami memberikan rekomendasi yang tepat untuk kebutuhan
              ekspor Anda
            </p>
          </div>

          {/* Progress Bar */}
          <div className="mt-6">
            <div className="flex items-center justify-between text-sm mb-2">
              <span>
                Langkah {currentStep + 1} dari {steps.length}
              </span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-2">
              <div
                className="bg-white rounded-full h-2 transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col h-[calc(90vh-200px)]">
          <div className="flex-1 p-6 sm:p-8 overflow-y-auto">
            <div className="max-w-2xl mx-auto">
              {/* Step Title */}
              <div className="text-center mb-8">
                <h2
                  className="text-xl sm:text-2xl font-bold text-gray-900 mb-2"
                  style={{
                    fontFamily:
                      "'Product Sans', 'Google Sans Text', sans-serif",
                    fontWeight: 600,
                  }}
                >
                  {currentStepData.title}
                </h2>
                <p
                  className="text-gray-600 text-lg"
                  style={{
                    fontFamily: "'Google Sans Text', 'Roboto', sans-serif",
                    fontWeight: 400,
                  }}
                >
                  {currentStepData.question}
                </p>
              </div>

              {/* Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {currentStepData.options.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleAnswerSelect(option.value)}
                    className={`p-4 sm:p-6 rounded-2xl border-2 transition-all duration-200 text-left hover:shadow-lg ${
                      answers[currentStepData.id] === option.value
                        ? "border-blue-500 bg-blue-50 shadow-md"
                        : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center space-x-4">
                      <span className="text-2xl">{option.emoji}</span>
                      <div>
                        <div
                          className={`font-semibold ${
                            answers[currentStepData.id] === option.value
                              ? "text-blue-700"
                              : "text-gray-900"
                          }`}
                          style={{
                            fontFamily:
                              "'Product Sans', 'Google Sans Text', sans-serif",
                            fontWeight: 600,
                          }}
                        >
                          {option.label}
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 sm:p-8 border-t border-gray-200 bg-gray-50">
            <div className="flex items-center justify-between max-w-2xl mx-auto">
              <div className="flex space-x-3">
                {currentStep > 0 && (
                  <button
                    onClick={handlePrevious}
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-full hover:bg-gray-100 transition-colors flex items-center space-x-2"
                    style={{
                      fontFamily:
                        "'Product Sans', 'Google Sans Text', sans-serif",
                      fontWeight: 500,
                    }}
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Sebelumnya</span>
                  </button>
                )}

                <button
                  onClick={handleSkip}
                  className="px-6 py-3 text-gray-500 hover:text-gray-700 transition-colors"
                  style={{
                    fontFamily:
                      "'Product Sans', 'Google Sans Text', sans-serif",
                    fontWeight: 500,
                  }}
                >
                  Lewati
                </button>
              </div>

              <button
                onClick={handleNext}
                disabled={!answers[currentStepData.id]}
                className={`px-8 py-3 rounded-full font-semibold transition-all duration-200 flex items-center space-x-2 ${
                  answers[currentStepData.id]
                    ? "bg-blue-600 text-white hover:bg-blue-700 shadow-lg"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
                style={{
                  fontFamily: "'Product Sans', 'Google Sans Text', sans-serif",
                  fontWeight: 600,
                }}
              >
                <span>
                  {currentStep === steps.length - 1 ? "Selesai" : "Lanjutkan"}
                </span>
                {currentStep < steps.length - 1 && (
                  <ChevronRight className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionnaireModal;
