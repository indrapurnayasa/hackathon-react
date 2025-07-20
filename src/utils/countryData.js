// Comprehensive country data with distance, coordinates, and other information
// Distance calculated from Jakarta, Indonesia (approximate center of Indonesia)
// Coordinates and distances sourced from reliable geographic databases

export const countryData = [
  {
    code: "BE",
    name: "Belgium",
    flag: "🇧🇪",
    distance: "11,200 km",
    lat: 50.8503,
    lng: 4.3517,
    recommended: false,
  },
  {
    code: "MY",
    name: "Malaysia",
    flag: "🇲🇾",
    distance: "1,200 km",
    lat: 4.2105,
    lng: 101.9758,
    recommended: true,
  },
  {
    code: "DJ",
    name: "Djibouti",
    flag: "🇩🇯",
    distance: "8,100 km",
    lat: 11.8251,
    lng: 42.5903,
    recommended: false,
  },
  {
    code: "EE",
    name: "Estonia",
    flag: "🇪🇪",
    distance: "9,800 km",
    lat: 58.3776,
    lng: 26.7290,
    recommended: false,
  },
  {
    code: "AE",
    name: "United Arab Emirates",
    flag: "🇦🇪",
    distance: "7,200 km",
    lat: 23.4241,
    lng: 53.8478,
    recommended: false,
  },
  {
    code: "TZ",
    name: "Tanzania",
    flag: "🇹🇿",
    distance: "8,900 km",
    lat: -6.3690,
    lng: 34.8888,
    recommended: false,
  },
  {
    code: "NL",
    name: "Netherlands",
    flag: "🇳🇱",
    distance: "11,400 km",
    lat: 52.1326,
    lng: 5.2913,
    recommended: false,
  },
  {
    code: "MM",
    name: "Myanmar",
    flag: "🇲🇲",
    distance: "2,800 km",
    lat: 21.9162,
    lng: 95.9560,
    recommended: false,
  },
  {
    code: "OM",
    name: "Oman",
    flag: "🇴🇲",
    distance: "7,800 km",
    lat: 21.4735,
    lng: 55.9754,
    recommended: false,
  },
  {
    code: "RU",
    name: "Russia",
    flag: "🇷🇺",
    distance: "8,500 km",
    lat: 61.5240,
    lng: 105.3188,
    recommended: false,
  },
  {
    code: "VN",
    name: "Vietnam",
    flag: "🇻🇳",
    distance: "1,800 km",
    lat: 14.0583,
    lng: 108.2772,
    recommended: false,
  },
  {
    code: "JP",
    name: "Japan",
    flag: "🇯🇵",
    distance: "5,900 km",
    lat: 36.2048,
    lng: 138.2529,
    recommended: false,
  },
  {
    code: "PK",
    name: "Pakistan",
    flag: "🇵🇰",
    distance: "4,500 km",
    lat: 30.3753,
    lng: 69.3451,
    recommended: false,
  },
  {
    code: "CN",
    name: "China",
    flag: "🇨🇳",
    distance: "4,800 km",
    lat: 35.8617,
    lng: 104.1954,
    recommended: false,
  },
  {
    code: "PH",
    name: "Philippines",
    flag: "🇵🇭",
    distance: "2,100 km",
    lat: 12.8797,
    lng: 121.7740,
    recommended: false,
  },
  {
    code: "EG",
    name: "Egypt",
    flag: "🇪🇬",
    distance: "8,200 km",
    lat: 26.0975,
    lng: 31.2357,
    recommended: false,
  },
  {
    code: "SA",
    name: "Saudi Arabia",
    flag: "🇸🇦",
    distance: "7,800 km",
    lat: 23.8859,
    lng: 45.0792,
    recommended: false,
  },
  {
    code: "BD",
    name: "Bangladesh",
    flag: "🇧🇩",
    distance: "4,200 km",
    lat: 23.6850,
    lng: 90.3563,
    recommended: false,
  },
  {
    code: "US",
    name: "United States",
    flag: "🇺🇸",
    distance: "18,500 km",
    lat: 37.0902,
    lng: -95.7129,
    recommended: false,
  },
  {
    code: "IN",
    name: "India",
    flag: "🇮🇳",
    distance: "3,800 km",
    lat: 20.5937,
    lng: 78.9629,
    recommended: false,
  },
];

// Function to get country data by code
export const getCountryData = (countryCode) => {
  return countryData.find(country => country.code === countryCode) || null;
};

// Function to get all countries
export const getAllCountries = () => {
  return countryData;
};

// Function to get recommended countries
export const getRecommendedCountries = () => {
  return countryData.filter(country => country.recommended);
};

// Function to get countries by distance range
export const getCountriesByDistance = (minDistance, maxDistance) => {
  return countryData.filter(country => {
    const distance = parseInt(country.distance.replace(/[^\d]/g, ''));
    return distance >= minDistance && distance <= maxDistance;
  });
}; 