'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { SupportedCurrency, CurrencyConfig } from '@/types';

const CURRENCY_META: Record<SupportedCurrency, Omit<CurrencyConfig, 'rateFromJPY'>> = {
  JPY: { code: 'JPY', symbol: '¥', label: 'JPY (Japanese Yen)' },
  USD: { code: 'USD', symbol: '$', label: 'USD (US Dollar)' },
  EUR: { code: 'EUR', symbol: '€', label: 'EUR (Euro)' },
  GBP: { code: 'GBP', symbol: '£', label: 'GBP (British Pound)' },
  AUD: { code: 'AUD', symbol: 'A$', label: 'AUD (Australian Dollar)' },
};

export const CURRENCY_CONFIGS: Record<SupportedCurrency, CurrencyConfig> = {
  JPY: { ...CURRENCY_META.JPY, rateFromJPY: 1 },
  USD: { ...CURRENCY_META.USD, rateFromJPY: 0 },
  EUR: { ...CURRENCY_META.EUR, rateFromJPY: 0 },
  GBP: { ...CURRENCY_META.GBP, rateFromJPY: 0 },
  AUD: { ...CURRENCY_META.AUD, rateFromJPY: 0 },
};

interface CurrencyContextType {
  currency: SupportedCurrency;
  setCurrency: (currency: SupportedCurrency) => void;
  formatPrice: (priceInJPY: number) => string;
  config: CurrencyConfig;
  ratesReady: boolean;
  ratesDate: string | null;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrencyState] = useState<SupportedCurrency>('USD');
  const [rates, setRates] = useState<Record<SupportedCurrency, number>>({
    JPY: 1,
    USD: 0,
    EUR: 0,
    GBP: 0,
    AUD: 0,
  });
  const [ratesDate, setRatesDate] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('sba_selected_currency') as SupportedCurrency;
    if (saved && CURRENCY_META[saved]) {
      setCurrencyState(saved);
    }

    let cancelled = false;

    async function loadRates() {
      try {
        const response = await fetch('/api/exchange-rates', { cache: 'no-store' });
        const payload = await response.json();

        if (!response.ok || !payload?.rates) {
          throw new Error(payload?.error || 'Exchange rates unavailable');
        }

        const nextRates = {
          JPY: 1,
          USD: Number(payload.rates.USD),
          EUR: Number(payload.rates.EUR),
          GBP: Number(payload.rates.GBP),
          AUD: Number(payload.rates.AUD),
        };

        if (Object.values(nextRates).some((rate) => !Number.isFinite(rate) || rate <= 0)) {
          throw new Error('Invalid exchange rates received');
        }

        if (!cancelled) {
          setRates(nextRates);
          setRatesDate(typeof payload.date === 'string' ? payload.date : null);
        }
      } catch (error) {
        console.warn('Current currency rates unavailable:', error);
      }
    }

    loadRates();
    return () => {
      cancelled = true;
    };
  }, []);

  const setCurrency = (c: SupportedCurrency) => {
    setCurrencyState(c);
    try {
      localStorage.setItem('sba_selected_currency', c);
    } catch {
      // ignore storage errors
    }
  };

  const rateFromJPY = rates[currency];
  const config: CurrencyConfig = { ...CURRENCY_META[currency], rateFromJPY };

  const formatPrice = (priceInJPY: number): string => {
    if (!Number.isFinite(priceInJPY) || priceInJPY <= 0) return 'Price On Request';

    if (currency === 'JPY') {
      return `¥${priceInJPY.toLocaleString('en-US')}`;
    }

    if (!ratesReady) return 'Rate unavailable';

    const converted = Math.round(priceInJPY * rateFromJPY);
    return `${config.symbol}${converted.toLocaleString('en-US')} ${currency}`;
  };

  const ratesReady = currency === 'JPY' || rateFromJPY > 0;

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, formatPrice, config, ratesReady, ratesDate }}>
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
