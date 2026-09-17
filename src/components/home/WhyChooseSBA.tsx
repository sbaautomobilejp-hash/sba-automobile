'use client';

import React from 'react';
import { Truck, ShieldCheck, FileCheck, Anchor, MapPin, Award } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function WhyChooseSBA() {
  const { language } = useLanguage();
  const ja = language === 'ja';
  const reasons = ja ? [
    [Truck,'国内輸送の手配','SBA Transport Serviceとして、車両の国内輸送や港への搬入について手配・調整をサポートします。'],
    [FileCheck,'オークションシート・車両情報','利用可能なオークションシートや車両書類を確認し、必要に応じて翻訳・確認をサポートします。'],
    [MapPin,'茨城県水戸市を拠点','SBA合同会社の所在地は、〒310-0832 茨城県水戸市吉田3066です。お問い合わせやお取引の窓口としてご利用いただけます。'],
    [ShieldCheck,'日本法人との取引','SBA合同会社として、日本国内での車両取引・輸出に関するご相談を受け付けています。'],
    [Anchor,'海外輸送の相談','仕向国や車両に応じて、Ro-Ro・コンテナなどの輸送方法についてご相談いただけます。'],
    [Award,'輸出書類・検査サポート','仕向国で必要となる輸出書類や検査について、要件に応じたサポートを手配します。'],
  ] : [
    [Truck,'Domestic Transport Coordination','SBA Transport Service supports the arrangement and coordination of domestic vehicle transport and port delivery.'],
    [FileCheck,'Auction Sheets & Vehicle Information','We review available auction sheets and vehicle documentation, with translation or information support when required.'],
    [MapPin,'Based in Mito, Ibaraki','SBA合同会社 is based at 〒310-0832 茨城県水戸市吉田3066. This is our listed corporate contact location.'],
    [ShieldCheck,'Japanese Business Entity','SBA合同会社 accepts consultations for vehicle transactions and export-related services in Japan.'],
    [Anchor,'International Shipping Consultation','Ro-Ro and container shipping options can be discussed according to the vehicle and destination requirements.'],
    [Award,'Export Document & Inspection Support','We can arrange support for export documents and inspections when required by the destination country.'],
  ];
  return <section className="py-20 bg-obsidian-950 border-b border-white/10 relative"><div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center max-w-3xl mx-auto mb-16"><div className="inline-flex items-center gap-2 mb-2"><span className="w-6 h-[2px] bg-japan-red" /><span className="text-xs uppercase tracking-[0.25em] text-japan-red font-bold">{ja ? 'SBAのサポート' : 'SBA Support'}</span><span className="w-6 h-[2px] bg-japan-red" /></div><h2 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight">{ja ? 'SBAにご相談いただけること' : 'What You Can Discuss With SBA'}</h2><p className="text-sm text-slate-400 mt-2">{ja ? '車両調達から輸送、輸出手配まで、ご要望に応じてサポートします。' : 'Support for vehicle sourcing, transport and export coordination, arranged according to your requirements.'}</p></div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">{reasons.map(([Icon,title,desc],i) => <div key={i} className="glass-panel p-6 rounded-2xl border border-white/10 hover:border-japan-red/40 transition-all flex flex-col justify-between group"><div><div className="w-12 h-12 rounded-xl bg-obsidian-850 border border-white/10 flex items-center justify-center text-japan-red group-hover:scale-110 group-hover:bg-japan-red group-hover:text-white transition-all mb-4 shadow"><Icon className="w-6 h-6" /></div><h3 className="text-base font-bold text-white mb-2 leading-snug">{title}</h3><p className="text-xs text-slate-400 leading-relaxed">{desc}</p></div></div>)}</div>
  </div></section>;
}
