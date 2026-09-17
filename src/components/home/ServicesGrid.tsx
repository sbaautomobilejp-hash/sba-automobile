'use client';

import React from 'react';
import Link from 'next/link';
import { ShoppingBag, ArrowRightLeft, Ship, Truck, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function ServicesGrid() {
  const { language } = useLanguage();
  const ja = language === 'ja';
  const services = ja ? [
    { id: 'buy', title: '車両購入サポート', subtitle: 'オークション・仕入れサポート', icon: ShoppingBag, description: '日本国内のオークションや仕入れ先から、ご希望に合う車両の調達をサポートします。利用可能な車両情報やオークション書類を確認しながら進めます。', points: ['車両・オークション情報の確認', '必要に応じた検査・翻訳サポート', '購入条件・費用について事前にご案内'], badge: '車両調達' },
    { id: 'sell', title: '販売・買取相談', subtitle: '日本国内での車両売却', icon: ArrowRightLeft, description: '日本国内で車両の売却や取引を検討されている方からのご相談を受け付けています。', points: ['車両情報の確認', '売却・取引条件のご相談', '必要書類についてご案内'], badge: '国内取引' },
    { id: 'export', title: '海外輸出サポート', subtitle: '輸出手配・書類サポート', icon: Ship, description: '仕向国の要件に応じて、輸出に必要な手続きや書類、輸送方法についてご相談いただけます。', points: ['輸出関連書類のサポート', '仕向国の要件に応じた確認', 'Ro-Ro・コンテナなど輸送方法の相談'], badge: '海外輸出' },
    { id: 'transport', title: 'SBA Transport Service', subtitle: '車両輸送の手配サポート', icon: Truck, description: 'オークション会場や保管場所から港までの車両輸送について、SBA Transport Serviceとして手配・調整をサポートします。', points: ['国内車両輸送の手配', '港までの輸送スケジュール調整', '輸出手続きとの連携サポート'], badge: '輸送サポート' },
  ] : [
    { id: 'buy', title: 'Buy Vehicles', subtitle: 'Auction Sourcing & Private Purchases', icon: ShoppingBag, description: 'We support vehicle sourcing through Japanese auctions and sourcing partners, with vehicle information and available auction documentation reviewed where applicable.', points: ['Vehicle and auction information review', 'Inspection and translation support when required', 'Purchase terms and costs explained in advance'], badge: 'Vehicle Sourcing' },
    { id: 'sell', title: 'Sell & Consign', subtitle: 'Japanese Domestic Sales', icon: ArrowRightLeft, description: 'If you are considering selling or trading a vehicle in Japan, contact SBA合同会社 to discuss the vehicle and transaction requirements.', points: ['Vehicle information review', 'Sale and transaction consultation', 'Guidance on required documents'], badge: 'Domestic Sales' },
    { id: 'export', title: 'Export Worldwide', subtitle: 'Export Coordination & Documents', icon: Ship, description: 'We support export procedures, documentation and shipping arrangements according to the requirements of the destination country.', points: ['Export-document support', 'Destination-country requirement review', 'Ro-Ro and container shipping consultation'], badge: 'Export Support' },
    { id: 'transport', title: 'SBA Transport Service', subtitle: 'Vehicle Transport Coordination', icon: Truck, description: 'We coordinate vehicle transport from auction yards or storage locations to the port as part of the SBA Transport Service offering.', points: ['Domestic vehicle transport coordination', 'Port delivery scheduling', 'Coordination with export procedures'], badge: 'Transport Support' },
  ];

  return <section id="services" className="py-20 bg-obsidian-900 border-b border-white/10 relative">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 mb-2"><span className="w-6 h-[2px] bg-japan-red" /><span className="text-xs uppercase tracking-[0.25em] text-japan-red font-bold">{ja ? '総合車両サービス' : 'Integrated Automobile Solutions'}</span><span className="w-6 h-[2px] bg-japan-red" /></div>
        <h2 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight">{ja ? 'サービス内容' : 'Our Services'}</h2>
        <p className="text-sm text-slate-400 mt-2">{ja ? '車両の購入・販売から輸出、国内輸送まで、ご要望に応じてサポートします。' : 'Support for vehicle sourcing, domestic transactions, export coordination and transport, arranged according to your requirements.'}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {services.map((s) => { const Icon = s.icon; return <div key={s.id} className="glass-panel p-8 rounded-2xl border border-white/10 hover:border-japan-red/40 transition-all flex flex-col justify-between group relative overflow-hidden">
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-japan-red/5 rounded-full blur-2xl group-hover:bg-japan-red/15 transition-colors pointer-events-none" />
          <div>
            <div className="flex items-start justify-between mb-6"><div className="w-14 h-14 rounded-xl bg-obsidian-850 border border-white/10 flex items-center justify-center text-japan-red group-hover:scale-110 group-hover:bg-japan-red group-hover:text-white transition-all shadow-lg shadow-black/40"><Icon className="w-7 h-7" /></div><span className="px-3 py-1 text-[11px] font-mono font-semibold rounded-full bg-white/5 border border-white/10 text-slate-300">{s.badge}</span></div>
            <span className="text-xs uppercase font-bold text-japan-red tracking-wider block">{s.subtitle}</span><h3 className="text-2xl font-black text-white mt-1 mb-3">{s.title}</h3><p className="text-sm text-slate-300 leading-relaxed mb-6">{s.description}</p>
            <ul className="space-y-2 mb-6 border-t border-white/5 pt-4 text-xs text-slate-300">{s.points.map((pt, idx) => <li key={idx} className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-japan-red shrink-0" /><span>{pt}</span></li>)}</ul>
          </div>
          <Link href={`/services#${s.id}`} className="inline-flex items-center gap-2 text-xs font-bold text-slate-200 group-hover:text-japan-red transition-colors pt-2 uppercase tracking-wider"><span>{ja ? '詳しいサービス内容を見る' : 'Learn Detailed Capabilities'}</span><ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></Link>
        </div>; })}
      </div>
    </div>
  </section>;
}
