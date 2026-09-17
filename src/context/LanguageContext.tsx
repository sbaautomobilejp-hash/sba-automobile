'use client';

import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

type Language = 'en' | 'ja';
type TranslationKey =
  | 'inventory' | 'services' | 'globalExport' | 'howItWorks' | 'company' | 'inquireNow'
  | 'japanExportPortal' | 'whatsappDirect' | 'admin' | 'browseInventory' | 'customAuctionOrder'
  | 'mileageTransparency' | 'documentationInspection' | 'transportFleet' | 'inHousePortTransport'
  | 'globalShipping' | 'shippingMethods' | 'businessEntity' | 'headquarters' | 'auctionSelection'
  | 'wideAuctionSelection' | 'shippingSupport' | 'worldwide' | 'transportService' | 'exportProcess'
  | 'vehicleInventory' | 'servicesBuySellExportTransport' | 'globalExportShippingRoutes' | 'buyingProcess'
  | 'aboutCompany' | 'adminPortal' | 'chatWhatsApp' | 'sendVehicleInquiry' | 'footerDescription'
  | 'buyJapaneseVehicles' | 'domesticVehiclePurchase' | 'globalVehicleExport' | 'exportDestinations'
  | 'exportDestinationDescription' | 'informationContact' | 'inspectionExportDocs' | 'accessAdminDashboard'
  | 'exportInformation' | 'management';

const translations: Record<Language, Record<TranslationKey, string>> = {
  en: {
    inventory: 'Inventory', services: 'Services', globalExport: 'Global Export', howItWorks: 'How It Works', company: 'Company', inquireNow: 'Inquire Now',
    japanExportPortal: 'JAPAN EXPORT PORTAL', whatsappDirect: 'WhatsApp Direct', admin: 'Admin', browseInventory: 'Browse Inventory', customAuctionOrder: 'Custom Auction Order',
    mileageTransparency: 'Mileage Transparency', documentationInspection: 'Documentation & inspection support', transportFleet: 'SBA Transport Fleet', inHousePortTransport: 'Transport coordination',
    globalShipping: 'Global Shipping', shippingMethods: 'Shipping options arranged as required', businessEntity: 'Business Entity', headquarters: 'Corporate Headquarters', auctionSelection: 'Vehicle Sourcing',
    wideAuctionSelection: 'Vehicle sourcing support', shippingSupport: 'Global Shipping Support', worldwide: 'Worldwide', transportService: 'SBA Transport Service', exportProcess: 'See How Export Process Works',
    vehicleInventory: 'Vehicle Inventory', servicesBuySellExportTransport: 'Services (Buy / Sell / Export / Transport)', globalExportShippingRoutes: 'Global Export & Shipping', buyingProcess: 'How The Buying Process Works',
    aboutCompany: 'About SBA合同会社', adminPortal: 'Admin Management Portal', chatWhatsApp: 'Chat on WhatsApp', sendVehicleInquiry: 'Send Vehicle Inquiry',
    footerDescription: 'Japanese vehicle sourcing, auction support, export coordination, and transport services from Mito, Ibaraki.', buyJapaneseVehicles: 'Buy Japanese Vehicles', domesticVehiclePurchase: 'Domestic Vehicle Purchase', globalVehicleExport: 'Global Vehicle Export',
    exportDestinations: 'Export Destinations', exportDestinationDescription: 'Destinations and shipping routes are arranged according to vehicle, destination-country requirements, and current carrier availability.', informationContact: 'Information & Contact',
    inspectionExportDocs: 'Inspection and export-document support can be arranged when required for the destination country.', accessAdminDashboard: 'Access SBA Admin Dashboard', exportInformation: 'Export Information', management: 'Management',
  },
  ja: {
    inventory: '在庫車両', services: 'サービス', globalExport: '海外輸出', howItWorks: 'ご利用の流れ', company: '会社情報', inquireNow: 'お問い合わせ',
    japanExportPortal: '日本車輸出ポータル', whatsappDirect: 'WhatsAppで相談', admin: '管理', browseInventory: '在庫車両を見る', customAuctionOrder: 'オークション相談',
    mileageTransparency: '走行距離の透明性', documentationInspection: '書類・検査サポート', transportFleet: 'SBA Transport Service', inHousePortTransport: '輸送手配サポート',
    globalShipping: '海外輸送', shippingMethods: 'ご要望に応じて輸送方法を手配', businessEntity: '事業者情報', headquarters: '本社所在地', auctionSelection: '車両調達',
    wideAuctionSelection: '車両調達・オークションサポート', shippingSupport: '海外輸送サポート', worldwide: '世界各地', transportService: 'SBA Transport Service', exportProcess: '輸出の流れを見る',
    vehicleInventory: '車両在庫', servicesBuySellExportTransport: 'サービス（購入・販売・輸出・輸送）', globalExportShippingRoutes: '海外輸出・輸送', buyingProcess: '購入の流れ',
    aboutCompany: 'SBA合同会社について', adminPortal: '管理ダッシュボード', chatWhatsApp: 'WhatsAppで相談', sendVehicleInquiry: '車両について問い合わせる',
    footerDescription: '茨城県水戸市を拠点に、日本車の車両調達、オークションサポート、輸出手配、輸送サービスを提供しています。', buyJapaneseVehicles: '日本車の購入', domesticVehiclePurchase: '国内車両の買取', globalVehicleExport: '海外への車両輸出',
    exportDestinations: '輸出先', exportDestinationDescription: '輸出先と輸送ルートは、車両、仕向国の要件、運送会社の最新の対応状況に応じて手配します。', informationContact: '情報・お問い合わせ',
    inspectionExportDocs: '仕向国で必要な場合、検査および輸出書類のサポートを手配できます。', accessAdminDashboard: '管理ダッシュボードへ', exportInformation: '輸出情報', management: '管理',
  },
};

interface LanguageContextValue { language: Language; setLanguage: (language: Language) => void; t: (key: TranslationKey) => string; }
const LanguageContext = createContext<LanguageContextValue | null>(null);

function setGoogleTranslateCookie(language: Language) {
  const value = language === 'ja' ? '/en/ja' : '/en/en';
  document.cookie = `googtrans=${value};path=/;max-age=31536000;samesite=lax`;
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');

  useEffect(() => {
    const saved = window.localStorage.getItem('sba-language');
    const next = saved === 'ja' ? 'ja' : 'en';
    setLanguageState(next);
    document.documentElement.lang = next;
  }, []);

  const setLanguage = (next: Language) => {
    setLanguageState(next);
    window.localStorage.setItem('sba-language', next);
    setGoogleTranslateCookie(next);
    window.location.reload();
  };

  const value = useMemo(() => ({ language, setLanguage, t: (key: TranslationKey) => translations[language][key] }), [language]);
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used inside LanguageProvider');
  return context;
}
