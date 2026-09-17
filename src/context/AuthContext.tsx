'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { isFirebaseConfigured, auth } from '@/lib/firebase';
import {
  signInWithEmailAndPassword,
  signOut as fbSignOut,
  onAuthStateChanged,
  User as FirebaseUser,
} from 'firebase/auth';

interface AuthUser {
  uid: string;
  email: string | null;
}

interface AuthContextType {
  user: AuthUser | null;
  isLoading: boolean;
  signIn: (email: string, pass: string) => Promise<void>;
  signOut: () => Promise<void>;
  isFirebaseActive: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isFirebaseConfigured || !auth) {
      setUser(null);
      setIsLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, (fbUser: FirebaseUser | null) => {
      setUser(fbUser ? { uid: fbUser.uid, email: fbUser.email } : null);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signIn = async (email: string, pass: string) => {
    if (!isFirebaseConfigured || !auth) {
      throw new Error(
        'Admin login is not enabled yet. Connect this website to Firebase Authentication first.'
      );
    }

    setIsLoading(true);
    try {
      const cred = await signInWithEmailAndPassword(auth, email.trim(), pass);
      if (!cred.user.emailVerified) {
        await fbSignOut(auth);
        throw new Error('Please verify the admin email address before signing in.');
      }
      setUser({ uid: cred.user.uid, email: cred.user.email });
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    if (!auth) {
      setUser(null);
      return;
    }

    setIsLoading(true);
    try {
      await fbSignOut(auth);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        signIn,
        signOut,
        isFirebaseActive: isFirebaseConfigured,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
