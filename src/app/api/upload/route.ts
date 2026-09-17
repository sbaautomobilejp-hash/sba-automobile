import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

const MAX_UPLOAD_BYTES = 16 * 1024 * 1024;

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');

    if (!(file instanceof File)) {
      return NextResponse.json({ error: 'No image file was provided.' }, { status: 400 });
    }

    if (!file.type.startsWith('image/')) {
      return NextResponse.json({ error: 'Only image files are allowed.' }, { status: 400 });
    }

    if (file.size > MAX_UPLOAD_BYTES) {
      return NextResponse.json({ error: 'Image is too large. Maximum size is 16 MB.' }, { status: 413 });
    }

    const upstream = new FormData();
    upstream.append('file', new Blob([await file.arrayBuffer()], { type: file.type }), file.name);

    // Free public image hosting. ttl=0 keeps the returned image URL from expiring.
    const response = await fetch('https://imgdb.io/api/v1/upload?ttl=0', {
      method: 'POST',
      body: upstream,
      headers: { Accept: 'application/json' },
      cache: 'no-store',
    });

    const payload = await response.json().catch(() => null);

    if (!response.ok || !payload?.url) {
      const message = typeof payload?.error === 'string'
        ? payload.error
        : `Image host returned HTTP ${response.status}.`;
      return NextResponse.json({ error: message }, { status: 502 });
    }

    return NextResponse.json({ url: payload.url });
  } catch (error) {
    console.error('Image upload failed:', error);
    return NextResponse.json(
      { error: 'Image upload service is temporarily unavailable. Please try again.' },
      { status: 502 }
    );
  }
}
