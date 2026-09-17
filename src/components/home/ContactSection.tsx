'use client';

import React, { useState } from 'react';
import { submitInquiry } from '@/lib/db';
import { MapPin, Phone, Mail, MessageSquare, Send, CheckCircle2, Clock } from 'lucide-react';

const POPULAR_COUNTRIES = [
  'United Kingdom',
  'New Zealand',
  'Australia',
  'Kenya',
  'Tanzania',
  'Uganda',
  'United Arab Emirates',
  'Cyprus',
  'Ireland',
  'Jamaica',
  'Trinidad and Tobago',
  'Guyana',
  'South Africa',
  'Mauritius',
  'Canada',
  'United States',
  'Other Country',
];

export default function ContactSection() {
  const [customerName, setCustomerName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('United Kingdom');
  const [vehicleTitle, setVehicleTitle] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const whatsappNumber = '+818066651199';
  const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=Hello%20SBA%20Automobile,%20I%20would%20like%20to%20inquire%20about%20importing%20a%20vehicle%20from%20Japan.`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');

    try {
      await submitInquiry({
        customerName,
        email,
        phone,
        country,
        vehicleTitle: vehicleTitle || 'General / Custom Vehicle Inquiry',
        message,
      });
      setSubmitted(true);
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to submit inquiry. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="inquiry" className="py-20 bg-obsidian-950 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Company Details & Direct Connect */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-6 h-[2px] bg-japan-red"></span>
                <span className="text-xs uppercase tracking-[0.25em] text-japan-red font-bold">
                  Direct Japan Office
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight">
                Contact & Custom Orders
              </h2>
              <p className="text-sm text-slate-400 mt-2 leading-relaxed">
                Connect with our export coordinators in Mito, Ibaraki. Whether you require a single luxury sports car, an SUV, or a fleet of commercial trucks, our team is ready.
              </p>
            </div>

            {/* Address & Legal Card */}
            <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-4 text-xs">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-obsidian-850 text-japan-red border border-white/10 shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">Corporate Office (Japan)</h4>
                  <p className="text-slate-300 mt-0.5 font-medium">SBA合同会社 (SBA LLC)</p>
                  <p className="text-slate-400 mt-0.5">
                    〒310-0832 茨城県水戸市吉田3066<br />
                    Mito-shi, Yoshida 3066, Ibaraki-ken, Japan
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-obsidian-850 text-japan-red border border-white/10 shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">Email Inquiries</h4>
                  <a href="mailto:sbaautomobile.jp@gmail.com" className="text-slate-300 hover:text-white transition-colors">
                    sbaautomobile.jp@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-obsidian-850 text-japan-red border border-white/10 shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">Telephone</h4>
                  <span className="text-slate-300">+81 80-6665-1199</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-obsidian-850 text-emerald-400 border border-white/10 shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">Operating Hours (JST)</h4>
                  <span className="text-slate-400">Mon – Sat: 09:00 – 19:00 (Tokyo Time)</span>
                </div>
              </div>
            </div>

            {/* Direct WhatsApp Callout */}
            <div className="p-6 rounded-2xl bg-emerald-950/30 border border-emerald-500/20 text-xs">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">Instant International WhatsApp</h4>
                  <p className="text-slate-400">Direct line to our Japanese export desk</p>
                </div>
              </div>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20 transition-all"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Chat On WhatsApp Now</span>
              </a>
            </div>
          </div>

          {/* Right Column: Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="glass-panel p-8 sm:p-10 rounded-2xl border border-white/15 shadow-2xl relative">
              {submitted ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-black text-white">Inquiry Successfully Submitted!</h3>
                  <p className="text-sm text-slate-300 max-w-md mx-auto">
                    Thank you, <strong className="text-white">{customerName}</strong>. Our export desk in Mito, Ibaraki will review your request and reply with a complete quotation.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setCustomerName('');
                      setEmail('');
                      setPhone('');
                      setVehicleTitle('');
                      setMessage('');
                    }}
                    className="mt-4 px-6 py-2.5 bg-obsidian-800 hover:bg-obsidian-750 text-white font-semibold text-xs rounded-xl transition-colors"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                  <div className="border-b border-white/10 pb-4 mb-4">
                    <h3 className="text-xl font-bold text-white">Vehicle Inquiry & Quotation Form</h3>
                    <p className="text-slate-400 text-xs mt-1">
                      Inquire about a specific stock car or request custom Japanese auction bidding.
                    </p>
                  </div>

                  {errorMessage && (
                    <div className="p-3 rounded-lg bg-red-500/20 border border-red-500/30 text-red-300 text-xs">
                      {errorMessage}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-300 font-semibold mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        placeholder="e.g. Johnathan Smith"
                        className="w-full px-3.5 py-2.5 rounded-lg bg-obsidian-850 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-japan-red transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-300 font-semibold mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="john@example.com"
                        className="w-full px-3.5 py-2.5 rounded-lg bg-obsidian-850 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-japan-red transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-300 font-semibold mb-1">
                        Phone / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+44 7700 900123"
                        className="w-full px-3.5 py-2.5 rounded-lg bg-obsidian-850 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-japan-red transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-300 font-semibold mb-1">
                        Destination Country / Port *
                      </label>
                      <select
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-lg bg-obsidian-850 border border-white/10 text-white focus:outline-none focus:border-japan-red transition-colors"
                      >
                        {POPULAR_COUNTRIES.map((c) => (
                          <option key={c} value={c} className="bg-obsidian-900 text-white">
                            {c}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">
                      Vehicle of Interest / Target Specs *
                    </label>
                    <input
                      type="text"
                      required
                      value={vehicleTitle}
                      onChange={(e) => setVehicleTitle(e.target.value)}
                      placeholder="e.g. 2023 Toyota Land Cruiser 300 ZX, or Nissan GT-R R35"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-obsidian-850 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-japan-red transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">
                      Message / Shipping Port Preference
                    </label>
                    <textarea
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Specify budget, target port (e.g. Southampton, Mombasa, Auckland), and any required inspections (JEVIC, JAAI)..."
                      className="w-full px-3.5 py-2.5 rounded-lg bg-obsidian-850 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-japan-red transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 px-6 rounded-xl bg-japan-red hover:bg-red-700 disabled:opacity-50 text-white font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-xl shadow-japan-red/30 transition-all mt-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>{isSubmitting ? 'Transmitting to SBA Japan...' : 'Send Inquiry to SBA Japan'}</span>
                  </button>

                  <p className="text-[11px] text-slate-500 text-center pt-2">
                    🔒 Official SBA合同会社 Inquiry Channel. We respect your confidentiality.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
