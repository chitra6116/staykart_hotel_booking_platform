export const COUNTRIES = [
  {
    code: 'IN',
    name: 'India',
    currency: 'INR',
    symbol: '₹',
    flag: '🇮🇳',
    inrPerUnit: 1.0,
    taxName: 'Indian GST',
    taxLabel: 'GST Slab on per-night tariff',
    taxRate: null, // Dynamic Indian GST slabs (0%, 5%, 18%)
    isIndianGst: true,
    locale: 'en-IN'
  },
  {
    code: 'GB',
    name: 'United Kingdom',
    currency: 'GBP',
    symbol: '£',
    flag: '🇬🇧',
    inrPerUnit: 105.0,
    taxName: 'UK VAT',
    taxLabel: 'UK Value Added Tax (20%)',
    taxRate: 0.20,
    isIndianGst: false,
    locale: 'en-GB'
  },
  {
    code: 'US',
    name: 'United States',
    currency: 'USD',
    symbol: '$',
    flag: '🇺🇸',
    inrPerUnit: 83.0,
    taxName: 'US Sales Tax',
    taxLabel: 'Estimated State Sales Tax (8.5%)',
    taxRate: 0.085,
    isIndianGst: false,
    locale: 'en-US'
  },
  {
    code: 'AE',
    name: 'United Arab Emirates',
    currency: 'AED',
    symbol: 'AED ',
    flag: '🇦🇪',
    inrPerUnit: 22.6,
    taxName: 'UAE VAT',
    taxLabel: 'Federal Tax Authority VAT (5%)',
    taxRate: 0.05,
    isIndianGst: false,
    locale: 'en-AE'
  },
  {
    code: 'AU',
    name: 'Australia',
    currency: 'AUD',
    symbol: 'A$',
    flag: '🇦🇺',
    inrPerUnit: 54.0,
    taxName: 'Australian GST',
    taxLabel: 'Australian Goods & Services Tax (10%)',
    taxRate: 0.10,
    isIndianGst: false,
    locale: 'en-AU'
  }
];

export const DEFAULT_COUNTRY = COUNTRIES[0]; // India
