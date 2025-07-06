import React, { useState, useEffect, useRef } from "react";
import {
  Calendar,
  Globe,
  TrendingUp,
  ArrowUp,
  ArrowDown,
  ChevronLeft,
  ChevronRight,
  Leaf,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
// Import vector image (jika menggunakan src/assets)
import vectorImage from "../assets/images/vector.png";

export default function TrendPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("seasonal");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [seasonalCurrentPage, setSeasonalCurrentPage] = useState(0);
  const [countryCurrentPage, setCountryCurrentPage] = useState(0);
  const countryProductsRefs = useRef({});

  // Check if navigated from ShippingPage with specific tab
  useEffect(() => {
    if (location.state && location.state.activeTab) {
      setActiveTab(
        location.state.activeTab === "country-demand"
          ? "country"
          : location.state.activeTab
      );
    }
  }, [location.state]);

  // Handle navigation to ShippingPage with selected country
  const handleCountryClick = (countryCode) => {
    navigate("/dashboard/shipping", {
      state: { selectedCountry: countryCode },
    });
  };

  // Handle tab change with simple fade animation
  const handleTabChange = (tab) => {
    if (tab !== activeTab && !isTransitioning) {
      setIsTransitioning(true);
      setTimeout(() => {
        setActiveTab(tab);
        setTimeout(() => {
          setIsTransitioning(false);
        }, 100);
      }, 200);
    }
  };

  // Scroll functions for country products
  const scrollProductsLeft = (countryIndex) => {
    if (countryProductsRefs.current[countryIndex]) {
      countryProductsRefs.current[countryIndex].scrollBy({
        left: -250,
        behavior: "smooth",
      });
    }
  };

  const scrollProductsRight = (countryIndex) => {
    if (countryProductsRefs.current[countryIndex]) {
      countryProductsRefs.current[countryIndex].scrollBy({
        left: 250,
        behavior: "smooth",
      });
    }
  };

  // Data seasonal trends dengan produk baru
  const seasonalTrends = [
    {
      id: "cpo",
      product: "Minyak Kelapa Sawit Mentah (CPO)",
      season: "Q1 2025",
      trend: "up",
      percentage: "+28%",
      countries: [
        { name: "India", code: "IN", flag: "🇮🇳" },
        { name: "China", code: "CN", flag: "🇨🇳" },
        { name: "Pakistan", code: "PK", flag: "🇵🇰" },
      ],
      price: "Rp 12,500/kg",
    },
    {
      id: "ole",
      product: "Minyak Kelapa Sawit Olahan (OLE)",
      season: "Q1 2025",
      trend: "up",
      percentage: "+22%",
      countries: [
        { name: "Egypt", code: "EG", flag: "🇪🇬" },
        { name: "Bangladesh", code: "BD", flag: "🇧🇩" },
        { name: "Myanmar", code: "MM", flag: "🇲🇲" },
      ],
      price: "Rp 14,200/kg",
    },
    {
      id: "cil",
      product: "Minyak Kelapa (CIL)",
      season: "Q2 2025",
      trend: "up",
      percentage: "+18%",
      countries: [
        { name: "United States", code: "US", flag: "🇺🇸" },
        { name: "Germany", code: "DE", flag: "🇩🇪" },
        { name: "Japan", code: "JP", flag: "🇯🇵" },
      ],
      price: "Rp 28,000/kg",
    },
    {
      id: "coa",
      product: "Kakao (COA)",
      season: "Q2 2025",
      trend: "up",
      percentage: "+15%",
      countries: [
        { name: "Malaysia", code: "MY", flag: "🇲🇾" },
        { name: "Singapore", code: "SG", flag: "🇸🇬" },
        { name: "Philippines", code: "PH", flag: "🇵🇭" },
      ],
      price: "Rp 35,000/kg",
    },
    {
      id: "ara",
      product: "Kopi Arabika (ARA)",
      season: "Q3 2025",
      trend: "up",
      percentage: "+25%",
      countries: [
        { name: "United States", code: "US", flag: "🇺🇸" },
        { name: "Japan", code: "JP", flag: "🇯🇵" },
        { name: "Germany", code: "DE", flag: "🇩🇪" },
      ],
      price: "Rp 85,000/kg",
    },
    {
      id: "rob",
      product: "Kopi Robusta (ROB)",
      season: "Q3 2025",
      trend: "up",
      percentage: "+20%",
      countries: [
        { name: "Vietnam", code: "VN", flag: "🇻🇳" },
        { name: "India", code: "IN", flag: "🇮🇳" },
        { name: "France", code: "FR", flag: "🇫🇷" },
      ],
      price: "Rp 45,000/kg",
    },
    {
      id: "rub",
      product: "Karet Alam (RUB)",
      season: "Q4 2025",
      trend: "down",
      percentage: "-8%",
      countries: [
        { name: "China", code: "CN", flag: "🇨🇳" },
        { name: "Malaysia", code: "MY", flag: "🇲🇾" },
        { name: "Thailand", code: "TH", flag: "🇹🇭" },
      ],
      price: "Rp 22,000/kg",
    },
    {
      id: "crn",
      product: "Jagung (CRN)",
      season: "Q4 2025",
      trend: "up",
      percentage: "+12%",
      countries: [
        { name: "Philippines", code: "PH", flag: "🇵🇭" },
        { name: "Malaysia", code: "MY", flag: "🇲🇾" },
        { name: "Vietnam", code: "VN", flag: "🇻🇳" },
      ],
      price: "Rp 8,500/kg",
    },
  ];

  // Data country demands dengan negara baru
  const countryDemands = [
    {
      country: "Bangladesh",
      flag: "🇧🇩",
      code: "BD",
      topProducts: [
        {
          name: "Minyak Kelapa Sawit Mentah",
          demand: "Sangat Tinggi",
          growth: "+32%",
          value: "Rp 12,500/kg",
        },
        {
          name: "Minyak Kelapa Sawit Olahan",
          demand: "Sangat Tinggi",
          growth: "+28%",
          value: "Rp 14,200/kg",
        },
        {
          name: "Kopi Robusta",
          demand: "Tinggi",
          growth: "+18%",
          value: "Rp 45,000/kg",
        },
        {
          name: "Jagung",
          demand: "Tinggi",
          growth: "+15%",
          value: "Rp 8,500/kg",
        },
        {
          name: "Karet Alam",
          demand: "Sedang",
          growth: "+8%",
          value: "Rp 22,000/kg",
        },
        {
          name: "Minyak Kelapa",
          demand: "Sedang",
          growth: "+5%",
          value: "Rp 28,000/kg",
        },
      ],
      totalValue: "Rp 2.8 Triliun",
      growth: "+22%",
    },
    {
      country: "Canada",
      flag: "🇨🇦",
      code: "CA",
      topProducts: [
        {
          name: "Kopi Arabika",
          demand: "Sangat Tinggi",
          growth: "+25%",
          value: "Rp 85,000/kg",
        },
        {
          name: "Minyak Kelapa",
          demand: "Sangat Tinggi",
          growth: "+22%",
          value: "Rp 28,000/kg",
        },
        {
          name: "Kakao",
          demand: "Tinggi",
          growth: "+18%",
          value: "Rp 35,000/kg",
        },
        {
          name: "Kopi Robusta",
          demand: "Tinggi",
          growth: "+15%",
          value: "Rp 45,000/kg",
        },
        {
          name: "Minyak Kelapa Sawit Olahan",
          demand: "Sedang",
          growth: "+10%",
          value: "Rp 14,200/kg",
        },
        {
          name: "Jagung",
          demand: "Sedang",
          growth: "+8%",
          value: "Rp 8,500/kg",
        },
      ],
      totalValue: "Rp 1.9 Triliun",
      growth: "+18%",
    },
    {
      country: "China",
      flag: "🇨🇳",
      code: "CN",
      topProducts: [
        {
          name: "Minyak Kelapa Sawit Mentah",
          demand: "Sangat Tinggi",
          growth: "+35%",
          value: "Rp 12,500/kg",
        },
        {
          name: "Karet Alam",
          demand: "Sangat Tinggi",
          growth: "+30%",
          value: "Rp 22,000/kg",
        },
        {
          name: "Minyak Kelapa Sawit Olahan",
          demand: "Tinggi",
          growth: "+20%",
          value: "Rp 14,200/kg",
        },
        {
          name: "Jagung",
          demand: "Tinggi",
          growth: "+18%",
          value: "Rp 8,500/kg",
        },
        {
          name: "Kopi Robusta",
          demand: "Sedang",
          growth: "+12%",
          value: "Rp 45,000/kg",
        },
        {
          name: "Kakao",
          demand: "Sedang",
          growth: "+8%",
          value: "Rp 35,000/kg",
        },
      ],
      totalValue: "Rp 8.5 Triliun",
      growth: "+25%",
    },
    {
      country: "Egypt",
      flag: "🇪🇬",
      code: "EG",
      topProducts: [
        {
          name: "Minyak Kelapa Sawit Olahan",
          demand: "Sangat Tinggi",
          growth: "+28%",
          value: "Rp 14,200/kg",
        },
        {
          name: "Minyak Kelapa Sawit Mentah",
          demand: "Tinggi",
          growth: "+22%",
          value: "Rp 12,500/kg",
        },
        {
          name: "Jagung",
          demand: "Tinggi",
          growth: "+18%",
          value: "Rp 8,500/kg",
        },
        {
          name: "Kopi Robusta",
          demand: "Sedang",
          growth: "+12%",
          value: "Rp 45,000/kg",
        },
        {
          name: "Minyak Kelapa",
          demand: "Sedang",
          growth: "+8%",
          value: "Rp 28,000/kg",
        },
        {
          name: "Karet Alam",
          demand: "Rendah",
          growth: "+5%",
          value: "Rp 22,000/kg",
        },
      ],
      totalValue: "Rp 1.2 Triliun",
      growth: "+19%",
    },
    {
      country: "France",
      flag: "🇫🇷",
      code: "FR",
      topProducts: [
        {
          name: "Kopi Arabika",
          demand: "Sangat Tinggi",
          growth: "+30%",
          value: "Rp 85,000/kg",
        },
        {
          name: "Kakao",
          demand: "Sangat Tinggi",
          growth: "+25%",
          value: "Rp 35,000/kg",
        },
        {
          name: "Minyak Kelapa",
          demand: "Tinggi",
          growth: "+20%",
          value: "Rp 28,000/kg",
        },
        {
          name: "Kopi Robusta",
          demand: "Tinggi",
          growth: "+15%",
          value: "Rp 45,000/kg",
        },
        {
          name: "Minyak Kelapa Sawit Olahan",
          demand: "Sedang",
          growth: "+10%",
          value: "Rp 14,200/kg",
        },
        {
          name: "Karet Alam",
          demand: "Sedang",
          growth: "+8%",
          value: "Rp 22,000/kg",
        },
      ],
      totalValue: "Rp 2.1 Triliun",
      growth: "+21%",
    },
    {
      country: "Germany",
      flag: "🇩🇪",
      code: "DE",
      topProducts: [
        {
          name: "Kopi Arabika",
          demand: "Sangat Tinggi",
          growth: "+28%",
          value: "Rp 85,000/kg",
        },
        {
          name: "Minyak Kelapa",
          demand: "Sangat Tinggi",
          growth: "+25%",
          value: "Rp 28,000/kg",
        },
        {
          name: "Kakao",
          demand: "Tinggi",
          growth: "+22%",
          value: "Rp 35,000/kg",
        },
        {
          name: "Kopi Robusta",
          demand: "Tinggi",
          growth: "+18%",
          value: "Rp 45,000/kg",
        },
        {
          name: "Minyak Kelapa Sawit Olahan",
          demand: "Sedang",
          growth: "+12%",
          value: "Rp 14,200/kg",
        },
        {
          name: "Karet Alam",
          demand: "Sedang",
          growth: "+8%",
          value: "Rp 22,000/kg",
        },
      ],
      totalValue: "Rp 3.2 Triliun",
      growth: "+23%",
    },
    {
      country: "India",
      flag: "🇮🇳",
      code: "IN",
      topProducts: [
        {
          name: "Minyak Kelapa Sawit Mentah",
          demand: "Sangat Tinggi",
          growth: "+40%",
          value: "Rp 12,500/kg",
        },
        {
          name: "Minyak Kelapa Sawit Olahan",
          demand: "Sangat Tinggi",
          growth: "+35%",
          value: "Rp 14,200/kg",
        },
        {
          name: "Minyak Kelapa",
          demand: "Tinggi",
          growth: "+25%",
          value: "Rp 28,000/kg",
        },
        {
          name: "Kopi Robusta",
          demand: "Tinggi",
          growth: "+20%",
          value: "Rp 45,000/kg",
        },
        {
          name: "Jagung",
          demand: "Sedang",
          growth: "+15%",
          value: "Rp 8,500/kg",
        },
        {
          name: "Karet Alam",
          demand: "Sedang",
          growth: "+10%",
          value: "Rp 22,000/kg",
        },
      ],
      totalValue: "Rp 6.8 Triliun",
      growth: "+28%",
    },
    {
      country: "Japan",
      flag: "🇯🇵",
      code: "JP",
      topProducts: [
        {
          name: "Kopi Arabika",
          demand: "Sangat Tinggi",
          growth: "+32%",
          value: "Rp 85,000/kg",
        },
        {
          name: "Minyak Kelapa",
          demand: "Sangat Tinggi",
          growth: "+28%",
          value: "Rp 28,000/kg",
        },
        {
          name: "Kakao",
          demand: "Tinggi",
          growth: "+22%",
          value: "Rp 35,000/kg",
        },
        {
          name: "Kopi Robusta",
          demand: "Tinggi",
          growth: "+18%",
          value: "Rp 45,000/kg",
        },
        {
          name: "Karet Alam",
          demand: "Sedang",
          growth: "+12%",
          value: "Rp 22,000/kg",
        },
        {
          name: "Minyak Kelapa Sawit Olahan",
          demand: "Sedang",
          growth: "+8%",
          value: "Rp 14,200/kg",
        },
      ],
      totalValue: "Rp 4.5 Triliun",
      growth: "+24%",
    },
    {
      country: "Malaysia",
      flag: "🇲🇾",
      code: "MY",
      topProducts: [
        {
          name: "Kopi Arabika",
          demand: "Sangat Tinggi",
          growth: "+25%",
          value: "Rp 85,000/kg",
        },
        {
          name: "Kakao",
          demand: "Tinggi",
          growth: "+20%",
          value: "Rp 35,000/kg",
        },
        {
          name: "Kopi Robusta",
          demand: "Tinggi",
          growth: "+18%",
          value: "Rp 45,000/kg",
        },
        {
          name: "Jagung",
          demand: "Tinggi",
          growth: "+15%",
          value: "Rp 8,500/kg",
        },
        {
          name: "Karet Alam",
          demand: "Sedang",
          growth: "+12%",
          value: "Rp 22,000/kg",
        },
        {
          name: "Minyak Kelapa",
          demand: "Sedang",
          growth: "+8%",
          value: "Rp 28,000/kg",
        },
      ],
      totalValue: "Rp 2.3 Triliun",
      growth: "+18%",
    },
    {
      country: "Mexico",
      flag: "🇲🇽",
      code: "MX",
      topProducts: [
        {
          name: "Kopi Arabika",
          demand: "Sangat Tinggi",
          growth: "+22%",
          value: "Rp 85,000/kg",
        },
        {
          name: "Minyak Kelapa",
          demand: "Tinggi",
          growth: "+18%",
          value: "Rp 28,000/kg",
        },
        {
          name: "Kakao",
          demand: "Tinggi",
          growth: "+15%",
          value: "Rp 35,000/kg",
        },
        {
          name: "Kopi Robusta",
          demand: "Sedang",
          growth: "+12%",
          value: "Rp 45,000/kg",
        },
        {
          name: "Jagung",
          demand: "Sedang",
          growth: "+10%",
          value: "Rp 8,500/kg",
        },
        {
          name: "Minyak Kelapa Sawit Olahan",
          demand: "Sedang",
          growth: "+8%",
          value: "Rp 14,200/kg",
        },
      ],
      totalValue: "Rp 1.8 Triliun",
      growth: "+16%",
    },
    {
      country: "Myanmar",
      flag: "🇲🇲",
      code: "MM",
      topProducts: [
        {
          name: "Minyak Kelapa Sawit Olahan",
          demand: "Sangat Tinggi",
          growth: "+30%",
          value: "Rp 14,200/kg",
        },
        {
          name: "Minyak Kelapa Sawit Mentah",
          demand: "Tinggi",
          growth: "+25%",
          value: "Rp 12,500/kg",
        },
        {
          name: "Jagung",
          demand: "Tinggi",
          growth: "+20%",
          value: "Rp 8,500/kg",
        },
        {
          name: "Kopi Robusta",
          demand: "Sedang",
          growth: "+15%",
          value: "Rp 45,000/kg",
        },
        {
          name: "Karet Alam",
          demand: "Sedang",
          growth: "+12%",
          value: "Rp 22,000/kg",
        },
        {
          name: "Minyak Kelapa",
          demand: "Sedang",
          growth: "+8%",
          value: "Rp 28,000/kg",
        },
      ],
      totalValue: "Rp 0.9 Triliun",
      growth: "+20%",
    },
    {
      country: "Pakistan",
      flag: "🇵🇰",
      code: "PK",
      topProducts: [
        {
          name: "Minyak Kelapa Sawit Mentah",
          demand: "Sangat Tinggi",
          growth: "+35%",
          value: "Rp 12,500/kg",
        },
        {
          name: "Minyak Kelapa Sawit Olahan",
          demand: "Tinggi",
          growth: "+28%",
          value: "Rp 14,200/kg",
        },
        {
          name: "Jagung",
          demand: "Tinggi",
          growth: "+22%",
          value: "Rp 8,500/kg",
        },
        {
          name: "Kopi Robusta",
          demand: "Sedang",
          growth: "+15%",
          value: "Rp 45,000/kg",
        },
        {
          name: "Minyak Kelapa",
          demand: "Sedang",
          growth: "+12%",
          value: "Rp 28,000/kg",
        },
        {
          name: "Karet Alam",
          demand: "Sedang",
          growth: "+8%",
          value: "Rp 22,000/kg",
        },
      ],
      totalValue: "Rp 1.5 Triliun",
      growth: "+22%",
    },
    {
      country: "Philippines",
      flag: "🇵🇭",
      code: "PH",
      topProducts: [
        {
          name: "Jagung",
          demand: "Sangat Tinggi",
          growth: "+30%",
          value: "Rp 8,500/kg",
        },
        {
          name: "Minyak Kelapa",
          demand: "Sangat Tinggi",
          growth: "+25%",
          value: "Rp 28,000/kg",
        },
        {
          name: "Kakao",
          demand: "Tinggi",
          growth: "+20%",
          value: "Rp 35,000/kg",
        },
        {
          name: "Kopi Arabika",
          demand: "Tinggi",
          growth: "+18%",
          value: "Rp 85,000/kg",
        },
        {
          name: "Kopi Robusta",
          demand: "Sedang",
          growth: "+12%",
          value: "Rp 45,000/kg",
        },
        {
          name: "Karet Alam",
          demand: "Sedang",
          growth: "+8%",
          value: "Rp 22,000/kg",
        },
      ],
      totalValue: "Rp 1.3 Triliun",
      growth: "+19%",
    },
    {
      country: "Russia",
      flag: "🇷🇺",
      code: "RU",
      topProducts: [
        {
          name: "Minyak Kelapa Sawit Mentah",
          demand: "Sangat Tinggi",
          growth: "+25%",
          value: "Rp 12,500/kg",
        },
        {
          name: "Minyak Kelapa Sawit Olahan",
          demand: "Tinggi",
          growth: "+20%",
          value: "Rp 14,200/kg",
        },
        {
          name: "Kopi Arabika",
          demand: "Tinggi",
          growth: "+18%",
          value: "Rp 85,000/kg",
        },
        {
          name: "Kakao",
          demand: "Sedang",
          growth: "+15%",
          value: "Rp 35,000/kg",
        },
        {
          name: "Kopi Robusta",
          demand: "Sedang",
          growth: "+12%",
          value: "Rp 45,000/kg",
        },
        {
          name: "Karet Alam",
          demand: "Sedang",
          growth: "+8%",
          value: "Rp 22,000/kg",
        },
      ],
      totalValue: "Rp 2.0 Triliun",
      growth: "+17%",
    },
    {
      country: "Saudi Arabia",
      flag: "🇸🇦",
      code: "SA",
      topProducts: [
        {
          name: "Minyak Kelapa Sawit Olahan",
          demand: "Sangat Tinggi",
          growth: "+32%",
          value: "Rp 14,200/kg",
        },
        {
          name: "Minyak Kelapa Sawit Mentah",
          demand: "Tinggi",
          growth: "+25%",
          value: "Rp 12,500/kg",
        },
        {
          name: "Jagung",
          demand: "Tinggi",
          growth: "+20%",
          value: "Rp 8,500/kg",
        },
        {
          name: "Kopi Arabika",
          demand: "Sedang",
          growth: "+15%",
          value: "Rp 85,000/kg",
        },
        {
          name: "Minyak Kelapa",
          demand: "Sedang",
          growth: "+12%",
          value: "Rp 28,000/kg",
        },
        {
          name: "Karet Alam",
          demand: "Sedang",
          growth: "+8%",
          value: "Rp 22,000/kg",
        },
      ],
      totalValue: "Rp 1.7 Triliun",
      growth: "+20%",
    },
    {
      country: "Spain",
      flag: "🇪🇸",
      code: "ES",
      topProducts: [
        {
          name: "Kopi Arabika",
          demand: "Sangat Tinggi",
          growth: "+28%",
          value: "Rp 85,000/kg",
        },
        {
          name: "Minyak Kelapa",
          demand: "Tinggi",
          growth: "+22%",
          value: "Rp 28,000/kg",
        },
        {
          name: "Kakao",
          demand: "Tinggi",
          growth: "+18%",
          value: "Rp 35,000/kg",
        },
        {
          name: "Kopi Robusta",
          demand: "Sedang",
          growth: "+15%",
          value: "Rp 45,000/kg",
        },
        {
          name: "Minyak Kelapa Sawit Olahan",
          demand: "Sedang",
          growth: "+12%",
          value: "Rp 14,200/kg",
        },
        {
          name: "Karet Alam",
          demand: "Sedang",
          growth: "+8%",
          value: "Rp 22,000/kg",
        },
      ],
      totalValue: "Rp 2.4 Triliun",
      growth: "+19%",
    },
    {
      country: "Tanzania",
      flag: "🇹🇿",
      code: "TZ",
      topProducts: [
        {
          name: "Minyak Kelapa Sawit Mentah",
          demand: "Tinggi",
          growth: "+22%",
          value: "Rp 12,500/kg",
        },
        {
          name: "Minyak Kelapa Sawit Olahan",
          demand: "Tinggi",
          growth: "+18%",
          value: "Rp 14,200/kg",
        },
        {
          name: "Jagung",
          demand: "Tinggi",
          growth: "+15%",
          value: "Rp 8,500/kg",
        },
        {
          name: "Kopi Robusta",
          demand: "Sedang",
          growth: "+12%",
          value: "Rp 45,000/kg",
        },
        {
          name: "Minyak Kelapa",
          demand: "Sedang",
          growth: "+10%",
          value: "Rp 28,000/kg",
        },
        {
          name: "Karet Alam",
          demand: "Sedang",
          growth: "+8%",
          value: "Rp 22,000/kg",
        },
      ],
      totalValue: "Rp 0.7 Triliun",
      growth: "+16%",
    },
    {
      country: "United Arab Emirates",
      flag: "🇦🇪",
      code: "AE",
      topProducts: [
        {
          name: "Minyak Kelapa Sawit Olahan",
          demand: "Sangat Tinggi",
          growth: "+30%",
          value: "Rp 14,200/kg",
        },
        {
          name: "Minyak Kelapa",
          demand: "Tinggi",
          growth: "+25%",
          value: "Rp 28,000/kg",
        },
        {
          name: "Kopi Arabika",
          demand: "Tinggi",
          growth: "+20%",
          value: "Rp 85,000/kg",
        },
        {
          name: "Jagung",
          demand: "Sedang",
          growth: "+15%",
          value: "Rp 8,500/kg",
        },
        {
          name: "Kakao",
          demand: "Sedang",
          growth: "+12%",
          value: "Rp 35,000/kg",
        },
        {
          name: "Karet Alam",
          demand: "Sedang",
          growth: "+8%",
          value: "Rp 22,000/kg",
        },
      ],
      totalValue: "Rp 1.9 Triliun",
      growth: "+21%",
    },
    {
      country: "United States",
      flag: "🇺🇸",
      code: "US",
      topProducts: [
        {
          name: "Kopi Arabika",
          demand: "Sangat Tinggi",
          growth: "+35%",
          value: "Rp 85,000/kg",
        },
        {
          name: "Minyak Kelapa",
          demand: "Sangat Tinggi",
          growth: "+30%",
          value: "Rp 28,000/kg",
        },
        {
          name: "Kakao",
          demand: "Tinggi",
          growth: "+25%",
          value: "Rp 35,000/kg",
        },
        {
          name: "Kopi Robusta",
          demand: "Tinggi",
          growth: "+20%",
          value: "Rp 45,000/kg",
        },
        {
          name: "Minyak Kelapa Sawit Olahan",
          demand: "Sedang",
          growth: "+15%",
          value: "Rp 14,200/kg",
        },
        {
          name: "Karet Alam",
          demand: "Sedang",
          growth: "+10%",
          value: "Rp 22,000/kg",
        },
      ],
      totalValue: "Rp 7.2 Triliun",
      growth: "+26%",
    },
    {
      country: "Vietnam",
      flag: "🇻🇳",
      code: "VN",
      topProducts: [
        {
          name: "Kopi Robusta",
          demand: "Sangat Tinggi",
          growth: "+28%",
          value: "Rp 45,000/kg",
        },
        {
          name: "Jagung",
          demand: "Tinggi",
          growth: "+22%",
          value: "Rp 8,500/kg",
        },
        {
          name: "Karet Alam",
          demand: "Tinggi",
          growth: "+18%",
          value: "Rp 22,000/kg",
        },
        {
          name: "Minyak Kelapa Sawit Mentah",
          demand: "Sedang",
          growth: "+15%",
          value: "Rp 12,500/kg",
        },
        {
          name: "Minyak Kelapa",
          demand: "Sedang",
          growth: "+12%",
          value: "Rp 28,000/kg",
        },
        {
          name: "Kakao",
          demand: "Sedang",
          growth: "+8%",
          value: "Rp 35,000/kg",
        },
      ],
      totalValue: "Rp 1.6 Triliun",
      growth: "+18%",
    },
  ];

  // Pagination untuk seasonal trends (4 items per page, layout 2x2)
  const itemsPerSeasonalPage = 4;
  const totalSeasonalPages = Math.ceil(
    seasonalTrends.length / itemsPerSeasonalPage
  );
  const currentSeasonalItems = seasonalTrends.slice(
    seasonalCurrentPage * itemsPerSeasonalPage,
    (seasonalCurrentPage + 1) * itemsPerSeasonalPage
  );

  // Pagination untuk country demands (4 countries per page)
  const itemsPerCountryPage = 4;
  const totalCountryPages = Math.ceil(
    countryDemands.length / itemsPerCountryPage
  );
  const currentCountryItems = countryDemands.slice(
    countryCurrentPage * itemsPerCountryPage,
    (countryCurrentPage + 1) * itemsPerCountryPage
  );

  return (
    <div className="h-full overflow-y-auto">
      {/* Container utama dengan max-width yang dibatasi */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 py-6 sm:py-8">
        {/* Hero Section dengan simple fade animation */}
        <div
          className={`relative rounded-3xl overflow-hidden mb-6 sm:mb-8 w-full transition-opacity duration-300 ${
            isTransitioning ? "opacity-50" : "opacity-100"
          }`}
          style={{
            background: activeTab === "seasonal" ? "#A0D4CE" : "#C7DB9C",
            minHeight: "400px",
          }}
        >
          {/* Background Pattern/Texture */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                activeTab === "seasonal"
                  ? "radial-gradient(circle at 25% 25%, white 2px, transparent 2px)"
                  : "radial-gradient(circle at 75% 75%, rgba(255,255,255,0.3) 2px, transparent 2px)",
              backgroundSize: "50px 50px",
              opacity: 0.1,
            }}
          />

          <div className="relative z-10 p-6 sm:p-8 lg:p-12 xl:p-16 h-full flex items-center">
            <div
              className={`w-full grid grid-cols-1 xl:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-stretch ${
                activeTab === "country" ? "xl:grid-cols-2" : ""
              }`}
            >
              {/* Conditional Layout based on activeTab */}
              {activeTab === "seasonal" ? (
                <>
                  {/* Left Content - Market Trend Analysis */}
                  <div className="text-gray-800 flex flex-col justify-center">
                    <h1
                      className="text-3xl sm:text-4xl lg:text-5xl xl:text-5xl 2xl:text-6xl font-bold mb-4 sm:mb-6 leading-tight"
                      style={{
                        fontFamily:
                          "'Product Sans', 'Google Sans Text', sans-serif",
                        fontWeight: 700,
                        color: "#2D3748",
                      }}
                    >
                      Market Trend Analysis
                    </h1>

                    <p
                      className="text-base sm:text-lg lg:text-xl xl:text-2xl mb-6 sm:mb-8 leading-relaxed"
                      style={{
                        fontFamily: "'Google Sans Text', 'Roboto', sans-serif",
                        fontWeight: 400,
                        color: "#4A5568",
                      }}
                    >
                      Analisis mendalam tentang tren pasar ekspor berdasarkan
                      musim dan permintaan negara. Temukan peluang terbaik untuk
                      produk Anda di pasar internasional.
                    </p>

                    {/* Navigation Buttons dengan simbol di kanan */}
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                      <button
                        onClick={() => handleTabChange("seasonal")}
                        className={`px-4 sm:px-6 py-3 rounded-full font-semibold text-sm sm:text-base transition-all duration-200 flex items-center justify-center gap-2 ${
                          activeTab === "seasonal"
                            ? "bg-gray-800 text-white shadow-lg"
                            : "bg-white/60 text-gray-800 border border-gray-300 hover:bg-white/80"
                        }`}
                        style={{
                          fontFamily:
                            "'Product Sans', 'Google Sans Text', sans-serif",
                          fontWeight: 600,
                        }}
                      >
                        <span>Seasonal Trends</span>
                        <Leaf className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => handleTabChange("country")}
                        className={`px-4 sm:px-6 py-3 rounded-full font-semibold text-sm sm:text-base transition-all duration-200 flex items-center justify-center gap-2 ${
                          activeTab === "country"
                            ? "bg-gray-800 text-white shadow-lg"
                            : "bg-white/60 text-gray-800 border border-gray-300 hover:bg-white/80"
                        }`}
                        style={{
                          fontFamily:
                            "'Product Sans', 'Google Sans Text', sans-serif",
                          fontWeight: 600,
                        }}
                      >
                        <span>Country Demand</span>
                        <Globe className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Right Content - Top Trend Section */}
                  <div className="flex flex-col justify-center">
                    <div
                      className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-lg w-full h-full flex flex-col relative overflow-hidden"
                      style={{ borderRadius: "20px", minHeight: "350px" }}
                    >
                      {/* Title dengan margin yang diperkecil */}
                      <div
                        className="border-2 border-gray-800 px-8 py-4 mb-8 mt-2 self-center"
                        style={{ borderRadius: "30px" }}
                      >
                        <h3
                          className="font-bold text-gray-900 text-center"
                          style={{
                            fontFamily:
                              "'Product Sans', 'Google Sans Text', sans-serif",
                            fontWeight: 700,
                            fontSize: "32px",
                          }}
                        >
                          Top Trend Bulan Ini
                        </h3>
                      </div>

                      {/* Content rata kiri dengan vector di sebelah kanan Kopi Arabika */}
                      <div className="flex items-center justify-start space-x-6 ml-4 pr-4">
                        <div className="flex items-center space-x-2">
                          <TrendingUp className="w-8 h-8 text-green-500" />
                          <div
                            className="text-5xl sm:text-6xl font-bold text-gray-900"
                            style={{
                              fontFamily:
                                "'Product Sans', 'Google Sans Text', sans-serif",
                              fontWeight: 700,
                            }}
                          >
                            25%
                          </div>
                        </div>

                        <div
                          className="text-xl sm:text-2xl font-medium text-gray-900"
                          style={{
                            fontFamily:
                              "'Google Sans Text', 'Roboto', sans-serif",
                            fontWeight: 500,
                          }}
                        >
                          Kopi Arabika
                        </div>

                        {/* Vector di sebelah kanan Kopi Arabika dengan ukuran 180px */}
                        <div className="ml-4">
                          <img
                            src={vectorImage}
                            alt="Market Trend Vector"
                            className="object-contain"
                            style={{
                              maxWidth: "180px",
                              maxHeight: "180px",
                              width: "auto",
                              height: "auto",
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {/* Country Demand Layout - Flipped */}
                  {/* Left Content - Top Negara Section dengan ukuran container yang sama */}
                  <div className="flex flex-col justify-center">
                    <div
                      className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-lg w-full h-full flex flex-col relative overflow-hidden"
                      style={{ borderRadius: "20px", minHeight: "350px" }}
                    >
                      {/* Title dengan margin yang diperkecil */}
                      <div
                        className="border-2 border-gray-800 px-8 py-4 mb-8 mt-2 self-center"
                        style={{ borderRadius: "30px" }}
                      >
                        <h3
                          className="font-bold text-gray-900 text-center"
                          style={{
                            fontFamily:
                              "'Product Sans', 'Google Sans Text', sans-serif",
                            fontWeight: 700,
                            fontSize: "32px",
                          }}
                        >
                          Top Negara Bulan Ini
                        </h3>
                      </div>

                      {/* Content Malaysia rata kiri dengan vector sebaris */}
                      <div className="flex items-center justify-start space-x-4 ml-4 pr-4">
                        <div className="flex flex-col items-start space-y-2">
                          <div className="flex items-center space-x-3">
                            <span className="text-3xl">🇲🇾</span>
                            <div
                              className="text-2xl sm:text-3xl font-bold text-gray-900"
                              style={{
                                fontFamily:
                                  "'Product Sans', 'Google Sans Text', sans-serif",
                                fontWeight: 700,
                              }}
                            >
                              Malaysia
                            </div>
                          </div>

                          <div
                            className="text-lg text-gray-700"
                            style={{
                              fontFamily:
                                "'Google Sans Text', 'Roboto', sans-serif",
                              fontWeight: 500,
                            }}
                          >
                            Total Nilai Ekspor: Rp 3.2 Triliun
                          </div>
                        </div>

                        {/* Vector dengan batasan margin yang ketat - sebaris */}
                        <div className="flex-shrink-0 max-w-[140px] ml-auto">
                          <img
                            src={vectorImage}
                            alt="Market Trend Vector"
                            className="object-contain w-full h-auto"
                            style={{
                              maxWidth: "140px",
                              maxHeight: "140px",
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Content - Market Trend Analysis */}
                  <div className="text-gray-800 flex flex-col justify-center">
                    <h1
                      className="text-3xl sm:text-4xl lg:text-5xl xl:text-5xl 2xl:text-6xl font-bold mb-4 sm:mb-6 leading-tight"
                      style={{
                        fontFamily:
                          "'Product Sans', 'Google Sans Text', sans-serif",
                        fontWeight: 700,
                        color: "#2D3748",
                      }}
                    >
                      Market Trend Analysis
                    </h1>

                    <p
                      className="text-base sm:text-lg lg:text-xl xl:text-2xl mb-6 sm:mb-8 leading-relaxed"
                      style={{
                        fontFamily: "'Google Sans Text', 'Roboto', sans-serif",
                        fontWeight: 400,
                        color: "#4A5568",
                      }}
                    >
                      Analisis mendalam tentang tren pasar ekspor berdasarkan
                      musim dan permintaan negara. Temukan peluang terbaik untuk
                      produk Anda di pasar internasional.
                    </p>

                    {/* Navigation Buttons dengan simbol di kanan */}
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                      <button
                        onClick={() => handleTabChange("seasonal")}
                        className={`px-4 sm:px-6 py-3 rounded-full font-semibold text-sm sm:text-base transition-all duration-200 flex items-center justify-center gap-2 ${
                          activeTab === "seasonal"
                            ? "bg-gray-800 text-white shadow-lg"
                            : "bg-white/60 text-gray-800 border border-gray-300 hover:bg-white/80"
                        }`}
                        style={{
                          fontFamily:
                            "'Product Sans', 'Google Sans Text', sans-serif",
                          fontWeight: 600,
                        }}
                      >
                        <span>Seasonal Trends</span>
                        <Leaf className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => handleTabChange("country")}
                        className={`px-4 sm:px-6 py-3 rounded-full font-semibold text-sm sm:text-base transition-all duration-200 flex items-center justify-center gap-2 ${
                          activeTab === "country"
                            ? "bg-gray-800 text-white shadow-lg"
                            : "bg-white/60 text-gray-800 border border-gray-300 hover:bg-white/80"
                        }`}
                        style={{
                          fontFamily:
                            "'Product Sans', 'Google Sans Text', sans-serif",
                          fontWeight: 600,
                        }}
                      >
                        <span>Country Demand</span>
                        <Globe className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Dynamic Title dengan full width dan border melengkung hitam */}
        <div className="mb-4 sm:mb-6 w-full">
          <div
            className="inline-block px-8 py-3 border-4 border-black"
            style={{ borderRadius: "50px" }}
          >
            <h2
              className="text-xl sm:text-2xl font-bold text-gray-900"
              style={{
                fontFamily: "'Product Sans', 'Google Sans Text', sans-serif",
                fontWeight: 500,
              }}
            >
              {activeTab === "seasonal" ? "Seasonal Trends" : "Country Demand"}
            </h2>
          </div>
        </div>

        {/* Content Area dengan full width */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6 w-full">
          {/* Seasonal Trends Tab - Grid 2x2 dengan Pagination */}
          {activeTab === "seasonal" && (
            <div className="space-y-6">
              {/* Grid 2x2 Layout */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                {currentSeasonalItems.map((item, index) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-xl border border-gray-100 p-4 sm:p-6 hover:shadow-lg transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3
                          className="font-semibold text-gray-900 text-base sm:text-lg"
                          style={{
                            fontFamily:
                              "'Product Sans', 'Google Sans Text', sans-serif",
                            fontWeight: 500,
                          }}
                        >
                          {item.product}
                        </h3>
                        <p
                          className="text-sm text-gray-500"
                          style={{
                            fontFamily:
                              "'Google Sans Text', 'Roboto', sans-serif",
                            fontWeight: 400,
                          }}
                        >
                          {item.season}
                        </p>
                      </div>
                      <div
                        className={`flex items-center space-x-1 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium ${
                          item.trend === "up"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {item.trend === "up" ? (
                          <ArrowUp className="w-3 h-3" />
                        ) : (
                          <ArrowDown className="w-3 h-3" />
                        )}
                        <span
                          style={{
                            fontFamily:
                              "'Product Sans', 'Google Sans Text', sans-serif",
                            fontWeight: 500,
                          }}
                        >
                          {item.percentage}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <span
                          className="text-xs font-medium text-gray-500 uppercase tracking-wide"
                          style={{
                            fontFamily:
                              "'Google Sans Text', 'Roboto', sans-serif",
                            fontWeight: 500,
                          }}
                        >
                          Target Countries
                        </span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {item.countries.map((country, idx) => (
                            <button
                              key={idx}
                              onClick={() => handleCountryClick(country.code)}
                              className="bg-gray-100 text-gray-700 px-3 py-1 text-xs hover:bg-gray-200 transition-colors cursor-pointer flex items-center space-x-1"
                              style={{
                                fontFamily:
                                  "'Google Sans Text', 'Roboto', sans-serif",
                                fontWeight: 400,
                                borderRadius: "15px",
                              }}
                            >
                              <span>{country.name}</span>
                              <span>{country.flag}</span>
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                        <span
                          className="text-sm text-gray-600"
                          style={{
                            fontFamily:
                              "'Google Sans Text', 'Roboto', sans-serif",
                            fontWeight: 400,
                          }}
                        >
                          Harga Rata-rata:
                        </span>
                        <span
                          className="font-semibold text-gray-900 text-sm"
                          style={{
                            fontFamily:
                              "'Product Sans', 'Google Sans Text', sans-serif",
                            fontWeight: 500,
                          }}
                        >
                          {item.price}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination Controls for Seasonal */}
              {totalSeasonalPages > 1 && (
                <div className="flex justify-center items-center space-x-4 mt-6">
                  <button
                    onClick={() =>
                      setSeasonalCurrentPage(
                        Math.max(0, seasonalCurrentPage - 1)
                      )
                    }
                    disabled={seasonalCurrentPage === 0}
                    className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 disabled:bg-gray-50 disabled:text-gray-400 rounded-lg transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Previous</span>
                  </button>

                  <span className="text-sm text-gray-600">
                    Page {seasonalCurrentPage + 1} of {totalSeasonalPages}
                  </span>

                  <button
                    onClick={() =>
                      setSeasonalCurrentPage(
                        Math.min(
                          totalSeasonalPages - 1,
                          seasonalCurrentPage + 1
                        )
                      )
                    }
                    disabled={seasonalCurrentPage === totalSeasonalPages - 1}
                    className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 disabled:bg-gray-50 disabled:text-gray-400 rounded-lg transition-colors"
                  >
                    <span>Next</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Country Demand Tab - Vertical List dengan Pagination */}
          {activeTab === "country" && (
            <div className="space-y-6 sm:space-y-8">
              {currentCountryItems.map((country, index) => (
                <div
                  key={country.code}
                  className="bg-white rounded-xl border border-gray-100 overflow-hidden w-full"
                >
                  {/* Country Header */}
                  <div className="bg-gray-50 px-4 sm:px-6 py-4 border-b border-gray-100">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <span className="text-xl sm:text-2xl">
                          {country.flag}
                        </span>
                        <div>
                          <h3
                            className="font-semibold text-gray-900 text-base sm:text-lg"
                            style={{
                              fontFamily:
                                "'Product Sans', 'Google Sans Text', sans-serif",
                              fontWeight: 500,
                            }}
                          >
                            {country.country}
                          </h3>
                          <p
                            className="text-sm text-gray-600"
                            style={{
                              fontFamily:
                                "'Google Sans Text', 'Roboto', sans-serif",
                              fontWeight: 400,
                            }}
                          >
                            Total Nilai Ekspor: {country.totalValue}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1 bg-green-100 text-green-800 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium">
                        <TrendingUp className="w-3 h-3" />
                        <span
                          style={{
                            fontFamily:
                              "'Product Sans', 'Google Sans Text', sans-serif",
                            fontWeight: 500,
                          }}
                        >
                          {country.growth}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Products List - Horizontal Scrollable dengan Arrow Navigation */}
                  <div className="p-4 sm:p-6">
                    <h4
                      className="font-medium text-gray-900 mb-4 text-base sm:text-lg"
                      style={{
                        fontFamily:
                          "'Product Sans', 'Google Sans Text', sans-serif",
                        fontWeight: 500,
                      }}
                    >
                      Produk dengan Permintaan Tertinggi
                    </h4>

                    <div className="relative">
                      {/* Product Carousel Navigation */}
                      <button
                        onClick={() => scrollProductsLeft(index)}
                        className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-2 hover:bg-gray-50 transition-colors"
                        style={{ marginLeft: "-20px" }}
                      >
                        <ChevronLeft className="w-4 h-4 text-gray-600" />
                      </button>

                      <button
                        onClick={() => scrollProductsRight(index)}
                        className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-2 hover:bg-gray-50 transition-colors"
                        style={{ marginRight: "-20px" }}
                      >
                        <ChevronRight className="w-4 h-4 text-gray-600" />
                      </button>

                      {/* Scrollable Products Container */}
                      <div
                        ref={(el) => (countryProductsRefs.current[index] = el)}
                        className="flex gap-4 overflow-x-auto scrollbar-hide pb-4"
                        style={{
                          scrollbarWidth: "none",
                          msOverflowStyle: "none",
                        }}
                      >
                        {country.topProducts.map((product, idx) => (
                          <div
                            key={idx}
                            className="flex-shrink-0 p-3 sm:p-4 bg-gray-50 rounded-lg"
                            style={{ minWidth: "250px" }}
                          >
                            <div className="flex-1">
                              <h5
                                className="font-medium text-gray-900 text-sm sm:text-base mb-2"
                                style={{
                                  fontFamily:
                                    "'Product Sans', 'Google Sans Text', sans-serif",
                                  fontWeight: 500,
                                }}
                              >
                                {product.name}
                              </h5>
                              <div className="flex items-center space-x-2 mb-2">
                                <span
                                  className={`text-xs px-2 py-1 rounded-full font-medium ${
                                    product.demand === "Sangat Tinggi"
                                      ? "bg-red-100 text-red-800"
                                      : product.demand === "Tinggi"
                                      ? "bg-orange-100 text-orange-800"
                                      : product.demand === "Sedang"
                                      ? "bg-yellow-100 text-yellow-800"
                                      : "bg-gray-100 text-gray-800"
                                  }`}
                                  style={{
                                    fontFamily:
                                      "'Google Sans Text', 'Roboto', sans-serif",
                                    fontWeight: 500,
                                  }}
                                >
                                  {product.demand}
                                </span>
                                <span
                                  className="text-xs text-gray-500"
                                  style={{
                                    fontFamily:
                                      "'Google Sans Text', 'Roboto', sans-serif",
                                    fontWeight: 400,
                                  }}
                                >
                                  Growth: {product.growth}
                                </span>
                              </div>
                              <div className="text-right">
                                <span
                                  className="font-semibold text-gray-900 text-xs sm:text-sm"
                                  style={{
                                    fontFamily:
                                      "'Product Sans', 'Google Sans Text', sans-serif",
                                    fontWeight: 500,
                                  }}
                                >
                                  {product.value}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Pagination Controls for Country */}
              {totalCountryPages > 1 && (
                <div className="flex justify-center items-center space-x-4 mt-6">
                  <button
                    onClick={() =>
                      setCountryCurrentPage(Math.max(0, countryCurrentPage - 1))
                    }
                    disabled={countryCurrentPage === 0}
                    className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 disabled:bg-gray-50 disabled:text-gray-400 rounded-lg transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Previous</span>
                  </button>

                  <span className="text-sm text-gray-600">
                    Page {countryCurrentPage + 1} of {totalCountryPages}
                  </span>

                  <button
                    onClick={() =>
                      setCountryCurrentPage(
                        Math.min(totalCountryPages - 1, countryCurrentPage + 1)
                      )
                    }
                    disabled={countryCurrentPage === totalCountryPages - 1}
                    className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 disabled:bg-gray-50 disabled:text-gray-400 rounded-lg transition-colors"
                  >
                    <span>Next</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* CSS untuk hide scrollbar */}
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}
