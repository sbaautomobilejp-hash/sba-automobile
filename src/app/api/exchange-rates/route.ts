import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const QUOTES = ['USD', 'EUR', 'GBP', 'AUD', 'BDT'] as const;
const MAX_RATE_AGE_SECONDS = 48 * 60 * 60;

export async function GET() {
  try {
    const response = await fetch('https://open.er-api.com/v6/latest/JPY', {
      cache: 'no-store',
      headers: { Accept: 'application/json' },
      signal: AbortSignal.timeout(8000),
    });

    if (!response.ok) {
      throw new Error(`Exchange-rate provider returned HTTP ${response.status}`);
    }

    const payload = (await response.json()) as {
      result?: string;
      base_code?: string;
      time_last_update_unix?: number;
      time_last_update_utc?: string;
      rates?: Record<string, number>;
    };

    if (payload.result !== 'success' || payload.base_code !== 'JPY' || !payload.rates) {
      throw new Error('Exchange-rate provider returned an invalid payload');
    }

    const updatedAt = Number(payload.time_last_update_unix);
    const ageSeconds = Math.floor(Date.now() / 1000) - updatedAt;
    if (!Number.isFinite(updatedAt) || ageSeconds < -3600 || ageSeconds > MAX_RATE_AGE_SECONDS) {
      throw new Error('Exchange rates are stale or have an invalid update timestamp');
    }

    const rates: Record<string, number> = { JPY: 1 };
    for (const code of QUOTES) {
      const rate = Number(payload.rates[code]);
      if (!Number.isFinite(rate) || rate <= 0) {
        throw new Error(`Missing or invalid exchange rate for ${code}`);
      }
      rates[code] = rate;
    }

    const date = payload.time_last_update_utc
      ? new Date(payload.time_last_update_utc).toISOString().slice(0, 10)
      : new Date(updatedAt * 1000).toISOString().slice(0, 10);

    return NextResponse.json(
      {
        base: 'JPY',
        rates,
        date,
        source: 'ExchangeRate-API daily rates',
        updatedAt: new Date(updatedAt * 1000).toISOString(),
      },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=3600',
        },
      }
    );
  } catch (error) {
    console.error('Exchange-rate fetch failed:', error);
    return NextResponse.json(
      { error: 'Current exchange rates are temporarily unavailable. Please retry later.' },
      { status: 503, headers: { 'Cache-Control': 'no-store' } }
    );
  }
}
