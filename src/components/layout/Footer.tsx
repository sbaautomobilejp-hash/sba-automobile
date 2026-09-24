'use client';

import React from 'react';
import Link from 'next/link';
import { MapPin, Phone, Mail, MessageSquare, ExternalLink } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { t } = useLanguage();
  const whatsappNumber = '+818066651199';
  const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=Hello%20SBA%20Automobile,%20I%20am%20contacting%20regarding%20vehicle%20export.`;

  return (
    <footer className="bg-obsidian-950 border-t border-white/10 text-slate-400 text-sm mt-24">
      <div className="border-b border-white/5 py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="space-y-4 md:col-span-1">
          <div className="flex items-center gap-3"><div className="w-10 h-10 rounded-lg bg-japan-lacquer border border-japan-red/60 flex items-center justify-center text-white font-black text-lg">SBA</div><div><span className="text-lg font-bold text-white tracking-wider block">SBA Automobile</span><span className="text-xs text-japan-red font-semibold tracking-widest block">SBA合同会社</span></div></div>
          <p className="text-xs text-slate-400 leading-relaxed">{t('footerDescription')}</p>
          <div className="space-y-2 pt-2 text-xs">
            <div className="flex items-start gap-2 text-slate-300"><MapPin className="w-4 h-4 text-japan-red shrink-0 mt-0.5" /><span>〒310-0832 茨城県水戸市吉田3066<br />Mito-shi, Yoshida 3066, Ibaraki-ken, Japan</span></div>
            <div className="flex items-center gap-2 text-slate-300"><Mail className="w-4 h-4 text-japan-red shrink-0" /><a href="mailto:sbaautomobile.jp@gmail.com" className="hover:text-white transition-colors">sbaautomobile.jp@gmail.com</a></div>
            <div className="flex items-center gap-2 text-slate-300"><Phone className="w-4 h-4 text-japan-red shrink-0" /><span>+81 80-6665-1199</span></div>
          </div>
        </div>

        <div className="space-y-3"><h4 className="text-xs font-bold uppercase tracking-widest text-slate-200 border-l-2 border-japan-red pl-2.5">{t('services')}</h4><ul className="space-y-2 text-xs"><li><Link href="/services#buy" className="hover:text-white transition-colors">{t('buyJapaneseVehicles')}</Link></li><li><Link href="/services#sell" className="hover:text-white transition-colors">{t('domesticVehiclePurchase')}</Link></li><li><Link href="/services#export" className="hover:text-white transition-colors">{t('globalVehicleExport')}</Link></li><li><Link href="/services#transport" className="hover:text-white transition-colors">SBA Transport Service</Link></li></ul></div>

        <div className="space-y-3"><h4 className="text-xs font-bold uppercase tracking-widest text-slate-200 border-l-2 border-japan-red pl-2.5">{t('exportDestinations')}</h4><p className="text-xs text-slate-400">{t('exportDestinationDescription')}</p><ul className="grid grid-cols-2 gap-1 text-xs text-slate-300">{(t('exportDestinationList')).split('|').map((item) => <li key={item}>• {item}</li>)}</ul></div>

        <div className="space-y-3"><h4 className="text-xs font-bold uppercase tracking-widest text-slate-200 border-l-2 border-japan-red pl-2.5">{t('informationContact')}</h4><p className="text-xs text-slate-400">{t('inspectionExportDocs')}</p><div className="flex flex-wrap gap-1.5"><span className="px-2 py-0.5 text-[10px] font-mono bg-obsidian-850 border border-white/10 text-slate-300 rounded">Inspection Support</span><span className="px-2 py-0.5 text-[10px] font-mono bg-obsidian-850 border border-white/10 text-slate-300 rounded">Export Documentation</span></div><div className="pt-2 flex flex-col gap-2"><a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-1.5 text-xs text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg py-2.5 px-3 font-semibold transition-colors"><MessageSquare className="w-3.5 h-3.5" /> {t('chatWhatsApp')}</a><Link href="/admin/login" className="inline-flex items-center gap-1.5 text-xs text-japan-red hover:underline font-semibold"><span>{t('accessAdminDashboard')}</span><ExternalLink className="w-3 h-3" /></Link></div></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-slate-500"><p>© {currentYear} SBA合同会社. All rights reserved. 茨城県水戸市吉田3066.</p><div className="flex items-center gap-4"><Link href="/company" className="hover:text-slate-400">{t('company')}</Link><span>•</span><Link href="/export" className="hover:text-slate-400">{t('exportInformation')}</Link><span>•</span><Link href="/admin" className="hover:text-slate-400">{t('management')}</Link></div></div>
    </footer>
  );
}
