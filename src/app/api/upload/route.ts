import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

const MAX_UPLOAD_BYTES = 16 * 1024 * 1024;
const FIREBASE_API_KEY = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
const ADMIN_EMAIL = 'shadowbrokers731@gmail.com';

async function verifyVerifiedFirebaseUser(request: Request): Promise<boolean> {
  const authorization = request.headers.get('authorization');
  const token = authorization?.match(/^Bearer\\s+(.+)$/i)?.[1];

  if (!token || !FIREBASE_API_KEY) return false;

  // Firebase Identity Toolkit validates the ID token signature and expiry.
  const response = await fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${encodeURIComponent(FIREBASE_API_KEY)}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ idToken: token }),
      cache: 'no-store',
    }
  );

  if (!response.ok) return false;
  const payload = await response.json().catch(() => null);
  const user = payload?.users?.[0];

  return Boolean(
    user?.localId &&
    user?.emailVerified === true &&
    typeof user?.email === 'string' &&
    user.email.toLowerCase() === ADMIN_EMAIL
  );
}

export async function POST(request: Request) {
  try {
    const authorized = await verifyVerifiedFirebaseUser(request);
    if (!authorized) {
      return NextResponse.json(
        { error: 'Please sign in with a verified admin account before uploading images.' },
        { status: 401 }
      );
    }

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
