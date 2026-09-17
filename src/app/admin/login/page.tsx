'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import { Lock, Mail, ArrowRight, ShieldCheck } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const { signIn, isFirebaseActive } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);
    try {
      await signIn(email, password);
      router.push('/admin');
    } catch (err: any) {
      setError(err.message || 'Login failed. Check credentials.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-obsidian-950 flex flex-col justify-center items-center p-4 relative overflow-hidden">
      {/* Background Japanese Watermark & Ambient Red Glow */}
      <div className="absolute inset-0 bg-japan-grid opacity-20 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-japan-red/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-md space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-japan-lacquer border border-japan-red flex items-center justify-center text-white font-black text-2xl mx-auto shadow-xl shadow-japan-red/20">
            SBA
          </div>
          <h1 className="text-2xl font-black text-white uppercase tracking-tight">
            SBA Automobile Management
          </h1>
          <p className="text-xs text-slate-400">
            SBA合同会社 • 茨城県水戸市吉田3066
          </p>
        </div>

        {/* Login Box */}
        <div className="glass-panel p-8 rounded-3xl border border-white/15 shadow-2xl space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <span className="text-xs uppercase font-bold text-japan-red tracking-wider">
              Staff & Management Portal
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-slate-400">
              {isFirebaseActive ? 'Firebase Auth' : 'Setup Required'}
            </span>
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-red-500/20 border border-red-500/40 text-red-300 text-xs">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">
                Admin Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@sba-automobile.jp"
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-obsidian-850 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-japan-red transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-obsidian-850 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-japan-red transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 px-4 rounded-xl bg-japan-red hover:bg-red-700 disabled:opacity-50 text-white font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg shadow-japan-red/25 transition-all"
            >
              <span>{isSubmitting ? 'Authenticating...' : 'Sign In to Portal'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {!isFirebaseActive && (
            <div className="border-t border-white/10 pt-4 flex gap-3 text-xs text-amber-200/80">
              <ShieldCheck className="w-4 h-4 shrink-0 text-amber-400 mt-0.5" />
              <p>Firebase Authentication is not connected yet. Demo credentials are intentionally disabled on this production-ready build.</p>
            </div>
          )}
        </div>

        <div className="text-center">
          <Link
            href="/"
            className="text-xs text-slate-500 hover:text-slate-300 transition-colors"
          >
            ← Return to Public SBA Automobile Website
          </Link>
        </div>
      </div>
    </div>
  );
}
