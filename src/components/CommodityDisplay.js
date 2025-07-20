import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { 
  fetchCommodityData, 
  getCommodityDisplayName, 
  formatGrowthPercentage, 
  getGrowthTrend 
} from '../utils/commodityData';

// Commodity emoji mapping
const getCommodityEmoji = (commodityId) => {
  const emojiMap = {
    'CPO': '🛢️',   // Crude Palm Oil - oil barrel
    'CRN': '🌽',    // Corn - corn
    'RUB': '🛞️',   // Natural Rubber - tire/wheel
    'ROB': '☕',    // Robusta Coffee - coffee
    'ARA': '☕',    // Arabica Coffee - coffee
    'COA': '🍫',    // Cocoa - chocolate
    'CIL': '🥥',    // Coconut Oil - coconut
    'OLE': '🛢️',   // Palm Olein - oil barrel
  };
  
  return emojiMap[commodityId] || '🦐'; // Default to shrimp if not found
};

export default function CommodityDisplay({ countryCode = null }) {
  const [commodityData, setCommodityData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadCommodityData = async () => {
      try {
        setLoading(true);
        const data = await fetchCommodityData(countryCode);
        if (data) {
          setCommodityData(data);
        } else {
          setError('No commodity data available');
        }
      } catch (err) {
        setError('Failed to load commodity data');
        console.error('Error loading commodity data:', err);
      } finally {
        setLoading(false);
      }
    };

    loadCommodityData();
  }, [countryCode]);

  if (loading) {
    return (
      <div className="flex items-center space-x-3 w-full">
        <div className="w-8 h-8 bg-gray-200 rounded animate-pulse flex-shrink-0"></div>
        <div className="flex-1 min-w-0">
          <div className="animate-pulse">
            <div className="h-4 bg-gray-200 rounded mb-2" style={{ width: '60%' }}></div>
            <div className="h-3 bg-gray-200 rounded" style={{ width: '40%' }}></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center space-x-3">
        <span className="text-2xl">🦐</span>
        <div className="flex-1">
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      </div>
    );
  }

  if (!commodityData) {
    return (
      <div className="flex items-center space-x-3">
        <span className="text-2xl">🦐</span>
        <div className="flex-1">
          <p className="text-gray-600 text-sm">No commodity data available</p>
        </div>
      </div>
    );
  }

  const displayName = getCommodityDisplayName(commodityData.name);
  const growthPercentage = formatGrowthPercentage(commodityData.growth);
  const trend = getGrowthTrend(commodityData.growth);

  const commodityEmoji = getCommodityEmoji(commodityData.id);
  
  // Determine font size based on title length
  const getFontSize = (title) => {
    if (title.length > 20) return 'text-xs';
    if (title.length > 15) return 'text-sm';
    return 'text-sm';
  };

  return (
    <div className="flex items-center space-x-3 w-full">
      <span className="text-2xl flex-shrink-0">{commodityEmoji}</span>
      <div className="flex-1 min-w-0">
        <div className="flex items-center space-x-2">
          <span
            className={`font-medium text-gray-900 ${getFontSize(displayName)} truncate`}
            style={{
              fontFamily:
                "'Google Sans Text', 'Product Sans', 'Roboto', -apple-system, BlinkMacSystemFont, sans-serif",
              fontWeight: 500,
            }}
            title={displayName}
          >
            {displayName}
          </span>
          <div className="flex-shrink-0">
            {trend === "up" ? (
              <TrendingUp size={16} className="text-green-500" />
            ) : trend === "down" ? (
              <TrendingDown size={16} className="text-red-500" />
            ) : null}
          </div>
        </div>
        <div
          className="text-xs font-medium"
          style={{
            fontFamily:
              "'Google Sans Text', 'Product Sans', 'Roboto', -apple-system, BlinkMacSystemFont, sans-serif",
            fontWeight: 400,
          }}
        >
          <span className="text-gray-900">Growth: </span>
          <span className={trend === "up" ? "text-green-600" : trend === "down" ? "text-red-600" : "text-gray-600"}>
            {growthPercentage}
          </span>
        </div>
      </div>
    </div>
  );
} 