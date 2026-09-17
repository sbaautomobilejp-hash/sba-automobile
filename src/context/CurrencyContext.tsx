'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { SupportedCurrency, CurrencyConfig } from '@/types';

export const CURRENCY_CONFIGS: Record<SupportedCurrency, CurrencyConfig> = {
  JPY: { code: 'JPY', symbol: '¥', rateFromJPY: 1, label: 'JPY (Japanese Yen)' },
  USD: { code: 'USD', symbol: '$', rateFromJPY: 0.0067, label: 'USD (US Dollar)' },
  EUR: { code: 'EUR', symbol: '€', rateFromJPY: 0.0061, label: 'EUR (Euro)' },
  GBP: { code: 'GBP', symbol: '£', rateFromJPY: 0.0052, label: 'GBP (British Pound)' },
  AUD: { code: 'AUD', symbol: 'A$', rateFromJPY: 0.0102, label: 'AUD (Australian Dollar)' },
};

interface CurrencyContextType {
  currency: SupportedCurrency;
  setCurrency: (currency: SupportedCurrency) => void;
  formatPrice: (priceInJPY: number) => string;
  config: CurrencyConfig;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrencyState] = useState<SupportedCurrency>('USD');

  useEffect(() => {
    const saved = localStorage.getItem('sba_selected_currency') as SupportedCurrency;
    if (saved && CURRENCY_CONFIGS[saved]) {
      setCurrencyState(saved);
    }
  }, []);

  const setCurrency = (c: SupportedCurrency) => {
    setCurrencyState(c);
    try {
      localStorage.setItem('sba_selected_currency', c);
    } catch (e) {
      // ignore
    }
  };

  const config = CURRENCY_CONFIGS[currency];

  const formatPrice = (priceInJPY: number): string => {
    if (!priceInJPY) return 'Price On Request';
    const converted = Math.round(priceInJPY * config.rateFromJPY);

    if (currency === 'JPY') {
      return `¥${priceInJPY.toLocaleString('en-US')}`;
    }

    return `${config.symbol}${converted.toLocaleString('en-US')} ${currency}`;
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, formatPrice, config }}>
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
