'use client';

import React from 'react';
import { Search, ClipboardCheck, CreditCard, Truck, Ship } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function ProcessFlow() {
  const { language } = useLanguage();
  const ja = language === 'ja';
  const steps = ja ? [
    ['01','車両を選ぶ・相談する','在庫 / オークション','在庫車両をご覧いただくか、ご希望の車種・年式・予算などをお知らせください。',Search],
    ['02','確認・検査サポート','車両情報の確認','利用可能なオークションシートや車両情報を確認し、必要に応じて検査・翻訳をサポートします。',ClipboardCheck],
    ['03','見積・お支払い','正式なお取引','車両・輸送などの条件を確認し、合意した内容に基づいてお取引を進めます。',CreditCard],
    ['04','国内輸送・港への搬入','輸送手配','SBA Transport Serviceにより、車両の国内輸送や港への搬入について手配・調整します。',Truck],
    ['05','輸出・書類','船積み・書類','仕向国の要件に応じて輸出手続き、船積み、必要書類の準備・案内を進めます。',Ship],
  ] : [
    ['01','Select or Request','Stock / Custom Auction','Browse available vehicles or tell us your preferred model, year and budget for a sourcing request.',Search],
    ['02','Inspect & Review','Vehicle Information','We review available auction sheets and vehicle information, with inspection or translation support when required.',ClipboardCheck],
    ['03','Quote & Payment','Agreed Transaction','Vehicle and shipping terms are confirmed before the transaction proceeds according to the agreed conditions.',CreditCard],
    ['04','Transport & Port','Domestic Transport Coordination','SBA Transport Service coordinates domestic vehicle transport and delivery to the relevant port.',Truck],
    ['05','Export & Documents','Shipping & Documentation','Export procedures, shipping and required documents are arranged according to destination-country requirements.',Ship],
  ];

  return <section id="process" className="py-20 bg-obsidian-950 border-b border-white/10 relative">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-3xl mx-auto mb-16"><div className="inline-flex items-center gap-2 mb-2"><span className="w-6 h-[2px] bg-japan-red" /><span className="text-xs uppercase tracking-[0.25em] text-japan-red font-bold">{ja ? '5つのステップ' : 'Transparent 5-Step Journey'}</span><span className="w-6 h-[2px] bg-japan-red" /></div><h2 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight">{ja ? 'ご利用の流れ' : 'How The Buying Process Works'}</h2><p className="text-sm text-slate-400 mt-2">{ja ? '車両調達、国内輸送、輸出手配を一つの窓口でご相談いただけます。' : 'Discuss vehicle sourcing, domestic transport and export coordination through one contact point.'}</p></div>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">{steps.map(([step,title,subtitle,desc,Icon]) => <div key={String(step)} className="glass-panel p-6 rounded-2xl border border-white/10 relative flex flex-col justify-between group hover:border-japan-red/50 transition-all"><div className="flex items-center justify-between mb-4"><span className="font-mono text-2xl font-black text-japan-red">{step}</span><div className="w-10 h-10 rounded-lg bg-obsidian-850 border border-white/10 flex items-center justify-center text-slate-300 group-hover:bg-japan-red group-hover:text-white transition-all shadow"><Icon className="w-5 h-5" /></div></div><div><span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">{subtitle}</span><h3 className="text-base font-black text-white mt-0.5 mb-2">{title}</h3><p className="text-xs text-slate-400 leading-relaxed">{desc}</p></div></div>)}</div>
    </div>
  </section>;
}
