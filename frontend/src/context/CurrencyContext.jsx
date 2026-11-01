import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { COUNTRIES, DEFAULT_COUNTRY } from '../config/countryConfig';
import { formatINR } from '../utils/formatters';

const CurrencyContext = createContext(null);

const STORAGE_KEY = 'staykart_country';

export function CurrencyProvider({ children }) {
  const [selectedCountry, setSelectedCountry] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const found = COUNTRIES.find((c) => c.code === stored);
        if (found) return found;
      }
    } catch (e) {
      console.warn('Failed to read country from localStorage', e);
    }
    return DEFAULT_COUNTRY;
  });

  const setCountry = useCallback((countryCode) => {
    const found = COUNTRIES.find((c) => c.code === countryCode);
    if (found) {
      setSelectedCountry(found);
      try {
        localStorage.setItem(STORAGE_KEY, found.code);
      } catch (e) {
        console.warn('Failed to save country to localStorage', e);
      }
    }
  }, []);

  const convertPrice = useCallback(
    (amountInInr) => {
      const country = selectedCountry || DEFAULT_COUNTRY;
      if (amountInInr === null || amountInInr === undefined || isNaN(amountInInr)) {
        return 0;
      }
      const num = typeof amountInInr === 'string' ? parseFloat(amountInInr) : amountInInr;
      const inrUnit = country.inrPerUnit || 1;
      return num / inrUnit;
    },
    [selectedCountry]
  );

  const formatPrice = useCallback(
    (amountInInr, alwaysDecimals = false) => {
      const country = selectedCountry || DEFAULT_COUNTRY;
      if (amountInInr === null || amountInInr === undefined || isNaN(amountInInr)) {
        return `${country.symbol || '₹'}0`;
      }
      const num = typeof amountInInr === 'string' ? parseFloat(amountInInr) : amountInInr;

      if (country.code === 'IN') {
        return formatINR(num, alwaysDecimals);
      }

      const inrUnit = country.inrPerUnit || 1;
      const converted = num / inrUnit;
      const minFractionDigits = alwaysDecimals ? 2 : (converted % 1 === 0 ? 0 : 2);
      try {
        const formattedNumber = converted.toLocaleString(country.locale || 'en-US', {
          minimumFractionDigits,
          maximumFractionDigits: 2
        });
        return `${country.symbol}${formattedNumber}`;
      } catch {
        return `${country.symbol}${converted.toFixed(2)}`;
      }
    },
    [selectedCountry]
  );

  const value = {
    countries: COUNTRIES,
    selectedCountry,
    setCountry,
    convertPrice,
    formatPrice
  };

  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (!context) {
    // Graceful fallback for components rendered without provider (e.g. unit tests)
    return {
      countries: COUNTRIES,
      selectedCountry: DEFAULT_COUNTRY,
      setCountry: () => {},
      convertPrice: (amt) => (amt ? Number(amt) : 0),
      formatPrice: (amt, alwaysDecimals = false) => formatINR(amt, alwaysDecimals)
    };
  }
  return context;
}
