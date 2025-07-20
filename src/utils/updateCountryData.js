// Utility script to help update country data from API responses
// This can be used to fetch and update the country data when needed

export const fetchAndUpdateCountryData = async () => {
  try {
    const response = await fetch('http://0.0.0.0:8000/api/v1/export/country-demand?endDate=31-12-2024');
    if (!response.ok) {
      throw new Error('Failed to fetch country data');
    }
    const data = await response.json();
    
    // Extract unique countries from API response
    const apiCountries = data.data.map(item => ({
      countryId: item.countryId,
      countryName: item.countryName
    }));
    
    console.log('Countries from API:', apiCountries);
    return apiCountries;
  } catch (error) {
    console.error('Error fetching country data:', error);
    return [];
  }
};

// Function to generate country data template
export const generateCountryDataTemplate = (apiCountries) => {
  return apiCountries.map(country => ({
    code: country.countryId,
    name: country.countryName.split(',')[0].trim(), // Take first part before comma
    flag: "🏳️", // Placeholder - needs to be updated manually
    distance: "0 km", // Placeholder - needs to be calculated
    lat: 0, // Placeholder - needs to be updated manually
    lng: 0, // Placeholder - needs to be updated manually
    recommended: false,
  }));
};

// Function to calculate distance from Jakarta to a country (approximate)
export const calculateDistance = (lat1, lng1, lat2, lng2) => {
  const R = 6371; // Earth's radius in kilometers
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLng/2) * Math.sin(dLng/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  const distance = R * c;
  return Math.round(distance);
};

// Jakarta coordinates (approximate center of Indonesia)
export const JAKARTA_COORDS = {
  lat: -6.2088,
  lng: 106.8456
}; 