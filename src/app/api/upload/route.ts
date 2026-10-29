import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

const MAX_UPLOAD_BYTES = 16 * 1024 * 1024;
const FIREBASE_API_KEY = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
const ADMIN_EMAIL = 'shadowbrokers731@gmail.com';

type VerificationResult = 'verified-admin' | 'missing-server-config' | 'invalid-server-api-key' | 'invalid-token' | 'not-verified-admin';

async function verifyVerifiedFirebaseUser(request: Request): Promise<VerificationResult> {
  const authorization = request.headers.get('authorization');
  const token = authorization?.match(/^Bearer\s+(.+)$/i)?.[1];

  if (!FIREBASE_API_KEY) return 'missing-server-config';
  if (!token) return 'invalid-token';

  // Firebase Identity Toolkit validates the ID token and returns the current account state.
  const response = await fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${encodeURIComponent(FIREBASE_API_KEY)}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ idToken: token }),
      cache: 'no-store',
    }
  );

  const payload = await response.json().catch(() => null);

  if (!response.ok) {
    // Log only the status and Firebase error code; never log tokens or API keys.
    const firebaseError = typeof payload?.error?.message === 'string' ? payload.error.message : '';
    console.error('Firebase account lookup failed:', response.status, firebaseError);
    if (firebaseError.includes('API_KEY_INVALID') || firebaseError.includes('API_KEY_SERVICE_BLOCKED')) {
      return 'invalid-server-api-key';
    }
    return 'invalid-token';
  }
  const user = payload?.users?.[0];

  if (
    user?.localId &&
    user?.emailVerified === true &&
    typeof user?.email === 'string' &&
    user.email.toLowerCase() === ADMIN_EMAIL.toLowerCase()
  ) {
    return 'verified-admin';
  }

  return 'not-verified-admin';
}

export async function POST(request: Request) {
  try {
    const verification = await verifyVerifiedFirebaseUser(request);

    if (verification !== 'verified-admin') {
      if (verification === 'missing-server-config') {
        return NextResponse.json(
          { error: 'Server Firebase configuration is missing. Please check the NEXT_PUBLIC_FIREBASE_API_KEY setting in Netlify.' },
          { status: 500 }
        );
      }

      if (verification === 'invalid-server-api-key') {
        return NextResponse.json(
          { error: 'Firebase rejected the API key configured for this site. Check NEXT_PUBLIC_FIREBASE_API_KEY and its API restrictions in Netlify and Google Cloud.' },
          { status: 500 }
        );
      }

      if (verification === 'invalid-token') {
        return NextResponse.json(
          { error: 'Your admin session could not be verified. Please sign out, sign in again, and retry the upload.' },
          { status: 401 }
        );
      }

      return NextResponse.json(
        { error: 'Firebase does not recognize this account as the verified SBA admin. Check the email verification status in Firebase Authentication.' },
        { status: 403 }
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
