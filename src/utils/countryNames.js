// Country code to name mapping
export const countryNames = {
  'AF': 'AFGHANISTAN', 'AL': 'ALBANIA', 'DZ': 'ALGERIA', 'AS': 'AMERICAN SAMOA', 'AO': 'ANGOLA', 
  'AG': 'ANTIGUA AND BARBUDA', 'AR': 'ARGENTINA', 'AM': 'ARMENIA', 'AW': 'ARUBA', 'AU': 'AUSTRALIA',
  'AT': 'AUSTRIA', 'BH': 'BAHRAIN', 'BD': 'BANGLADESH', 'BB': 'BARBADOS', 'BE': 'BELGIUM', 
  'BJ': 'BENIN', 'BA': 'BOSNIA AND HERZEGOVINA', 'BR': 'BRAZIL', 'BN': 'BRUNEI DARUSSALAM', 'BG': 'BULGARIA',
  'BF': 'BURKINA FASO', 'BI': 'BURUNDI', 'KH': 'CAMBODIA', 'CM': 'CAMEROON', 'CA': 'CANADA', 
  'CV': 'CAPE VERDE', 'CF': 'CENTRAL AFRICAN REPUBLIC', 'TD': 'CHAD', 'CL': 'CHILE', 'CN': 'CHINA',
  'CO': 'COLOMBIA', 'KM': 'COMOROS', 'CG': 'CONGO', 'CK': 'COOK ISLANDS', 'CR': 'COSTA RICA', 
  'CI': 'COTE DIVOIRE', 'HR': 'CROATIA', 'CU': 'CUBA', 'CW': 'CURACAO', 'CY': 'CYPRUS',
  'CZ': 'CZECH REPUBLIC', 'CD': 'DEMOCRATIC REP. OF THE CONGO', 'DK': 'DENMARK', 'DJ': 'DJIBOUTI', 
  'DM': 'DOMINICA', 'DO': 'DOMINICAN REPUBLIC', 'TL': 'EAST TIMOR', 'EC': 'ECUADOR', 'EG': 'EGYPT', 'SV': 'EL SALVADOR',
  'GQ': 'EQUATORIAL GUINEA', 'EE': 'ESTONIA', 'ET': 'ETHIOPIA', 'FJ': 'FIJI', 'FI': 'FINLAND', 
  'FR': 'FRANCE', 'GA': 'GABON', 'GM': 'GAMBIA', 'GE': 'GEORGIA', 'DE': 'GERMANY, FED. REP. OF',
  'GH': 'GHANA', 'GR': 'GREECE', 'GD': 'GRENADA', 'GP': 'GUADELOUPE', 'GT': 'GUATEMALA', 
  'GN': 'GUINEA', 'GW': 'GUINEA BISSAU', 'GY': 'GUYANA', 'HT': 'HAITI', 'HN': 'HONDURAS',
  'HK': 'HONG KONG', 'IN': 'INDIA', 'IR': 'IRAN (ISLAMIC REPUBLIC OF)', 'IQ': 'IRAQ', 'IE': 'IRELAND', 
  'IL': 'ISRAEL', 'IT': 'ITALY', 'JM': 'JAMAICA', 'JP': 'JAPAN', 'JO': 'JORDAN',
  'KZ': 'KAZAKHSTAN', 'KE': 'KENYA', 'KI': 'KIRIBATI', 'KR': 'KOREA, REPUBLIC OF', 'KW': 'KUWAIT', 
  'KG': 'KYRGYZSTAN', 'LV': 'LATVIA', 'LB': 'LEBANON', 'LR': 'LIBERIA', 'LY': 'LIBYAN ARAB JAMAHIRIYA',
  'LT': 'LITHUANIA', 'MO': 'MACAU', 'MG': 'MADAGASCAR', 'MY': 'MALAYSIA', 'MV': 'MALDIVES', 
  'ML': 'MALI', 'MT': 'MALTA', 'MH': 'MARSHALL ISLANDS', 'MR': 'MAURITANIA', 'MU': 'MAURITIUS',
  'YT': 'MAYOTTE', 'MX': 'MEXICO', 'FM': 'MICRONESIA, FED. STATES OF', 'MN': 'MONGOLIA', 'ME': 'MONTENEGRO', 
  'MA': 'MOROCCO', 'MZ': 'MOZAMBIQUE', 'MM': 'MYANMAR', 'NA': 'NAMIBIA', 'NR': 'NAURU',
  'NP': 'NEPAL', 'NL': 'NETHERLANDS', 'NC': 'NEW CALEDONIA', 'NZ': 'NEW ZEALAND', 'NI': 'NICARAGUA', 
  'NE': 'NIGER', 'NG': 'NIGERIA', 'MP': 'NORTHERN MARIANA ISLANDS', 'NO': 'NORWAY', 'OM': 'OMAN',
  'PK': 'PAKISTAN', 'PW': 'PALAU', 'PA': 'PANAMA', 'PG': 'PAPUA NEW GUINEA', 'PY': 'PARAGUAY', 
  'PE': 'PERU', 'PH': 'PHILIPPINES', 'PL': 'POLAND', 'PT': 'PORTUGAL', 'PR': 'PUERTO RICO',
  'QA': 'QATAR', 'RE': 'REUNION', 'RO': 'ROMANIA', 'RU': 'RUSSIA FEDERATION', 'RW': 'RWANDA', 
  'LC': 'SAINT LUCIA', 'VC': 'SAINT VINCENT AND THE GRENADINES', 'WS': 'SAMOA', 'ST': 'SAO TOME AND PRINCIPE', 'SA': 'SAUDI ARABIA',
  'SN': 'SENEGAL', 'RS': 'SERBIA', 'SC': 'SEYCHELLES', 'SL': 'SIERRA LEONE', 'SG': 'SINGAPORE', 
  'SK': 'SLOVAKIA', 'SI': 'SLOVENIA', 'SB': 'SOLOMON ISLANDS', 'SO': 'SOMALIA', 'ZA': 'SOUTH AFRICA',
  'SS': 'SOUTH SUDAN', 'ES': 'SPAIN', 'LK': 'SRI LANKA', 'SD': 'SUDAN', 'SR': 'SURINAME', 
  'SE': 'SWEDEN', 'CH': 'SWITZERLAND', 'SY': 'SYRIA ARAB REPUBLIC', 'TW': 'TAIWAN', 'TZ': 'TANZANIA, UNITED REP. OF',
  'TH': 'THAILAND', 'TG': 'TOGO', 'TO': 'TONGA', 'TT': 'TRINIDAD AND TOBAGO', 'TN': 'TUNISIA', 
  'TR': 'TURKEY', 'TM': 'TURKMENISTAN', 'TV': 'TUVALU', 'UG': 'UGANDA', 'UA': 'UKRAINE',
  'AE': 'UNITED ARAB EMIRATES', 'GB': 'UNITED KINGDOM', 'US': 'UNITED STATES', 'UY': 'URUGUAY', 'VU': 'VANUATU', 
  'VE': 'VENEZUELA', 'VN': 'VIET NAM', 'VG': 'VIRGIN ISLANDS (BRITISH)', 'YE': 'YEMEN', 'ZM': 'ZAMBIA'
};

// Function to get country name by code
export const getCountryName = (countryCode) => {
  const fullName = countryNames[countryCode] || countryCode;
  // If the name contains a comma, take only the first part
  const nameWithoutComma = fullName.includes(',') ? fullName.split(',')[0].trim() : fullName;
  // Convert to proper case (first letter of each word capitalized)
  return nameWithoutComma.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());
};

// Function to capitalize words (for display)
export const capitalizeWords = (str) => {
  return str.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());
}; 