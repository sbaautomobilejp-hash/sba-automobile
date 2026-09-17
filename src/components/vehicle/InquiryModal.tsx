'use client';

import React, { useState } from 'react';
import { Vehicle } from '@/types';
import { submitInquiry } from '@/lib/db';
import { X, Send, MessageSquare, CheckCircle2, ShieldCheck, Globe } from 'lucide-react';

interface InquiryModalProps {
  vehicle?: Vehicle | null;
  isOpen: boolean;
  onClose: () => void;
  defaultVehicleName?: string;
}

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
  'Bahamas',
  'Guyana',
  'Mauritius',
  'South Africa',
  'Zambia',
  'Democratic Republic of the Congo',
  'Zimbabwe',
  'Malta',
  'Canada',
  'United States',
  'Other Country',
];

export default function InquiryModal({
  vehicle,
  isOpen,
  onClose,
  defaultVehicleName,
}: InquiryModalProps) {
  const [customerName, setCustomerName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('United Kingdom');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  const vehicleTitle = vehicle
    ? `${vehicle.year} ${vehicle.make} ${vehicle.model} ${vehicle.trim}`
    : defaultVehicleName || 'Custom Vehicle Order Request';

  const whatsappNumber = '+818066651199';
  const whatsappEncodedMessage = encodeURIComponent(
    `Hello SBA Automobile (SBA合同会社), I would like to inquire about: ${vehicleTitle}.\nName: ${customerName}\nCountry: ${country}\nPhone: ${phone}`
  );
  const whatsappLink = `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=${whatsappEncodedMessage}`;

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
        vehicleId: vehicle?.id || undefined,
        vehicleTitle,
        message,
      });

      setSubmitted(true);
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to submit inquiry. Please try again or reach out on WhatsApp.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-lg bg-obsidian-900 border border-white/15 rounded-2xl shadow-2xl p-6 sm:p-8 my-8 text-left">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h3 className="text-2xl font-black text-white">Inquiry Received!</h3>
            <p className="text-sm text-slate-300 max-w-md mx-auto">
              Thank you, <span className="text-white font-semibold">{customerName}</span>. Your vehicle export request for <span className="text-japan-red font-semibold">{vehicleTitle}</span> has been logged with SBA合同会社.
            </p>
            <p className="text-xs text-slate-400">
              Our export specialists in Mito, Ibaraki will contact you within 24 hours with an official C&F/CIF quotation and auction inspection report.
            </p>

            <div className="pt-4 flex flex-col gap-3">
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20 transition-all"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Speed Up Inquiry via WhatsApp</span>
              </a>

              <button
                onClick={onClose}
                className="w-full py-2.5 px-4 rounded-xl bg-obsidian-800 hover:bg-obsidian-750 text-slate-300 text-xs font-semibold transition-colors"
              >
                Close Window
              </button>
            </div>
          </div>
        ) : (
          <div>
            {/* Header */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="w-2 h-2 rounded-full bg-japan-red" />
                <span className="text-[11px] font-bold uppercase tracking-widest text-japan-red">
                  Official Vehicle Inquiry
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white">
                Request Export Quotation
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Target Vehicle: <strong className="text-slate-200">{vehicleTitle}</strong>
              </p>
            </div>

            {errorMessage && (
              <div className="mb-4 p-3 rounded-lg bg-red-500/20 border border-red-500/40 text-red-300 text-xs">
                {errorMessage}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  Your Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="e.g. Marcus Vance"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-obsidian-850 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-japan-red transition-colors"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-obsidian-850 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-japan-red transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    Phone / WhatsApp Number *
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

              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  Message / Special Requirements
                </label>
                <textarea
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Ask about CIF/C&F shipping rates, inspection certificates (JEVIC, JAAI), auction sheets, or payment terms..."
                  className="w-full px-3.5 py-2.5 rounded-lg bg-obsidian-850 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-japan-red transition-colors resize-none"
                />
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 py-3 px-4 rounded-xl bg-japan-red hover:bg-red-700 disabled:opacity-50 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-japan-red/25 transition-all"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? 'Sending...' : 'Submit Inquiry'}</span>
                </button>

                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow transition-all"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>WhatsApp</span>
                </a>
              </div>

              <p className="text-[10px] text-slate-500 text-center pt-2">
                🔒 Data submitted directly to SBA合同会社 (310-0832 茨城県水戸市吉田3066). No spam guarantee.
              </p>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
