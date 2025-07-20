// Utility functions to fetch and handle commodity data from API

export const fetchCommodityData = async (countryCode = null) => {
  try {
    // If countryCode is provided, use the top commodity API
    if (countryCode) {
      const response = await fetch(`http://0.0.0.0:8000/api/v1/export/top-commodity-by-country?endDate=31-12-2024&countryId=${countryCode}`);
      if (!response.ok) {
        throw new Error('Failed to fetch top commodity data');
      }
      const data = await response.json();
      
      if (data.data && data.data.length > 0 && data.data[0].topCommodity) {
        const topCommodity = data.data[0].topCommodity;
        return {
          name: topCommodity.name,
          growth: topCommodity.growth,
          price: topCommodity.price,
          id: topCommodity.id,
          countryCode: countryCode,
          valueUSD: topCommodity.valueUSD,
          valueIDR: topCommodity.valueIDR,
          netweight: topCommodity.netweight
        };
      }
      return null;
    }
    
    // If no country specified, use the original API to get first country's data
    const response = await fetch('http://0.0.0.0:8000/api/v1/export/country-demand?endDate=31-12-2024');
    if (!response.ok) {
      throw new Error('Failed to fetch commodity data');
    }
    const data = await response.json();
    
    if (!data.data || data.data.length === 0) {
      return null;
    }
    
    // Get the first commodity from the first country
    if (data.data[0].products && data.data[0].products.length > 0) {
      const firstCommodity = data.data[0].products[0];
      return {
        name: firstCommodity.name,
        growth: firstCommodity.growth,
        price: firstCommodity.price,
        id: firstCommodity.id,
        countryCode: data.data[0].countryId
      };
    }
    
    return null;
  } catch (error) {
    console.error('Error fetching commodity data:', error);
    return null;
  }
};

// Function to get commodity display name (extract from parentheses)
export const getCommodityDisplayName = (commodityName) => {
  const match = commodityName.match(/\((.*?)\)/);
  return match ? match[1] : commodityName;
};

// Function to format growth percentage
export const formatGrowthPercentage = (growth) => {
  if (growth === null || growth === undefined) return "0%";
  return `${growth >= 0 ? '+' : ''}${growth.toFixed(1)}%`;
};

// Function to get growth trend (up/down)
export const getGrowthTrend = (growth) => {
  if (growth === null || growth === undefined) return "neutral";
  return growth >= 0 ? "up" : "down";
}; 