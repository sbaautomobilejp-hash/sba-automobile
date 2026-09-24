import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const revalidate = 3600;

const QUOTES = ['USD', 'EUR', 'GBP', 'AUD'] as const;

export async function GET() {
  try {
    const response = await fetch(
      'https://api.frankfurter.dev/v2/rates?base=JPY&quotes=USD,EUR,GBP,AUD',
      {
        next: { revalidate: 3600 },
        headers: { Accept: 'application/json' },
      }
    );

    if (!response.ok) {
      throw new Error(`Exchange-rate provider returned HTTP ${response.status}`);
    }

    const rows = (await response.json()) as Array<{
      date?: string;
      base?: string;
      quote?: string;
      rate?: number;
    }>;

    const rates: Record<string, number> = { JPY: 1 };
    for (const row of rows) {
      if (row.quote && QUOTES.includes(row.quote as (typeof QUOTES)[number]) && typeof row.rate === 'number' && Number.isFinite(row.rate)) {
        rates[row.quote] = row.rate;
      }
    }

    if (Object.keys(rates).length !== QUOTES.length + 1) {
      throw new Error('Exchange-rate provider returned an incomplete rate set');
    }

    return NextResponse.json(
      {
        base: 'JPY',
        rates,
        date: rows[0]?.date ?? new Date().toISOString().slice(0, 10),
        source: 'Frankfurter daily reference rates',
      },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
        },
      }
    );
  } catch (error) {
    console.error('Exchange-rate fetch failed:', error);
    return NextResponse.json(
      { error: 'Current exchange rates are temporarily unavailable.' },
      { status: 503 }
    );
  }
}
