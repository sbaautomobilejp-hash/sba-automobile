import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const QUOTES = ['USD', 'EUR', 'GBP', 'AUD', 'BDT'] as const;
const MAX_RATE_AGE_DAYS = 3;

type DailyRatesPayload = {
  date?: string;
  jpy?: Record<string, number>;
};

async function fetchRates(url: string): Promise<DailyRatesPayload> {
  const response = await fetch(url, {
    cache: 'no-store',
    headers: { Accept: 'application/json' },
    signal: AbortSignal.timeout(8000),
  });
  if (!response.ok) throw new Error(`Rate provider returned HTTP ${response.status}`);
  return (await response.json()) as DailyRatesPayload;
}

export async function GET() {
  try {
    let payload: DailyRatesPayload;
    try {
      payload = await fetchRates(
        'https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/jpy.json'
      );
    } catch (primaryError) {
      console.warn('Primary exchange-rate CDN failed; trying fallback:', primaryError);
      payload = await fetchRates('https://latest.currency-api.pages.dev/v1/currencies/jpy.json');
    }

    if (!payload.date || !payload.jpy) {
      throw new Error('Exchange-rate provider returned an invalid payload');
    }

    const rateDate = new Date(`${payload.date}T00:00:00Z`);
    const ageDays = (Date.now() - rateDate.getTime()) / 86_400_000;
    if (!Number.isFinite(rateDate.getTime()) || ageDays < -1 || ageDays > MAX_RATE_AGE_DAYS) {
      throw new Error('Exchange rates are stale or have an invalid date');
    }

    const rates: Record<string, number> = { JPY: 1 };
    for (const code of QUOTES) {
      const rate = Number(payload.jpy[code.toLowerCase()]);
      if (!Number.isFinite(rate) || rate <= 0) {
        throw new Error(`Missing or invalid exchange rate for ${code}`);
      }
      rates[code] = rate;
    }

    return NextResponse.json(
      {
        base: 'JPY',
        rates,
        date: payload.date,
        source: 'Daily reference rates from fawazahmed0/exchange-api',
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
