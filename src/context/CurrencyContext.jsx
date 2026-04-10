'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const CurrencyContext = createContext(null);

const SUPPORTED_CURRENCIES = {
  USD: { symbol: '$', name: 'US Dollar' },
  EUR: { symbol: '€', name: 'Euro' },
  GBP: { symbol: '£', name: 'British Pound' },
  GHC: { symbol: '₵', name: 'Ghanaian Cedi' },
  JPY: { symbol: '¥', name: 'Japanese Yen' },
  CAD: { symbol: 'C$', name: 'Canadian Dollar' },
  AUD: { symbol: 'A$', name: 'Australian Dollar' },
};

// Static exchange rates (base USD) – update occasionally
const STATIC_RATES = {
  EUR: 0.92,
  GBP: 0.79,
  GHC: 11.5,
  JPY: 150.5,
  CAD: 1.36,
  AUD: 1.52,

};

const DEFAULT_CURRENCY = 'USD';
const STORAGE_KEY = 'primeestate_currency';

export function CurrencyProvider({ children }) {
  const [selectedCurrency, setSelectedCurrency] = useState(DEFAULT_CURRENCY);
  const [rates] = useState(STATIC_RATES); // No need to fetch

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && SUPPORTED_CURRENCIES[saved]) {
      setSelectedCurrency(saved);
    }
  }, []);

  const changeCurrency = (currency) => {
    setSelectedCurrency(currency);
    localStorage.setItem(STORAGE_KEY, currency);
  };

  const convertPrice = (usdPrice) => {
    if (!usdPrice || typeof usdPrice !== 'number') return usdPrice;
    if (selectedCurrency === 'USD') return usdPrice;
    const rate = rates[selectedCurrency];
    if (!rate) return usdPrice;
    return usdPrice * rate;
  };

  const formatPrice = (usdPrice, compact = false) => {
    const converted = convertPrice(usdPrice);
    const currency = SUPPORTED_CURRENCIES[selectedCurrency];
    const symbol = currency?.symbol || '$';

    if (compact) {
      if (converted >= 1000000) {
        return `${symbol}${(converted / 1000000).toFixed(1)}M`;
      }
      if (converted >= 1000) {
        return `${symbol}${(converted / 1000).toFixed(0)}k`;
      }
    }

    return `${symbol}${converted.toLocaleString(undefined, {
      maximumFractionDigits: 0,
    })}`;
  };

  return (
    <CurrencyContext.Provider
      value={{
        selectedCurrency,
        setSelectedCurrency: changeCurrency,
        supportedCurrencies: SUPPORTED_CURRENCIES,
        convertPrice,
        formatPrice,
        isLoading: false,
        lastUpdated: null,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
}