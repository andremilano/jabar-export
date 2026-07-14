"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type Language = "id" | "en";

const translations = {
  id: {
    // Navbar & Common
    nav_home: "Beranda",
    nav_directory: "Direktori",
    nav_dashboard: "Dashboard",
    nav_login: "Login Mitra",
    nav_register: "Daftar UMKM",
    nav_logout: "Keluar",
    
    // Homepage
    hero_badge: "Gerbang Ekspor B2B Jawa Barat",
    hero_title: "Menghubungkan Komoditas Terbaik Jawa Barat ke Pasar Global",
    hero_subtitle: "Jabar Export Hub menghubungkan importir internasional secara langsung dengan UMKM & Koperasi terkurasi Jawa Barat yang memiliki kapasitas produksi tinggi dan standar mutu ekspor dunia.",
    hero_search_placeholder: "Cari kopi Arabika, sutra premium, kerajinan rotan...",
    hero_search_btn: "Cari Komoditas",
    trust_verified: "100% Terkurasi & Verifikasi NIB",
    trust_direct: "Negosiasi Global Langsung",
    trust_independent: "Jaringan Perdagangan B2B",
    
    cat_title: "Komoditas Unggulan",
    cat_subtitle: "Jelajahi komoditas ekspor terbaik Jawa Barat berdasarkan kategori industri",
    cat_coffee_desc: "Arabica & Robusta Specialty dari dataran tinggi Priangan",
    cat_tea_desc: "Teh Premium Highland dipetik segar di lereng pegunungan",
    cat_craft_desc: "Kerajinan rotan & kayu bernilai seni tinggi hasil pengrajin lokal",
    cat_textile_desc: "Tenun sutra alam premium bermotif tradisional Sunda",
    
    showcase_badge: "Showcase Premium",
    showcase_title: "Komoditas Ekspor Unggulan",
    showcase_explore: "Lihat Semua Produk",
    
    cta_buyer_badge: "Bermitralah dengan Kami",
    cta_buyer_title: "Mencari Supplier Tepercaya di Jawa Barat?",
    cta_buyer_desc: "Platform kami mempermudah proses pencarian (sourcing) komoditas Jawa Barat. Anda dapat mengirimkan Request for Quotation (RFQ) langsung ke produsen tanpa perantara, memastikan efisiensi harga dan waktu.",
    cta_buyer_btn_browse: "Telusuri Direktori",
    cta_buyer_btn_support: "Hubungi Layanan Dukungan",
    cta_sme_badge: "Untuk UMKM Jawa Barat",
    cta_sme_title: "UMKM Jawa Barat: Masuk ke Pasar Ekspor Global",
    cta_sme_desc: "Tampilkan produk Anda ke pembeli dari Eropa, Amerika, Australia, dan Asia. Dapatkan eksposur maksimal dan tingkatkan kepercayaan pembeli internasional.",
    cta_sme_btn: "Daftarkan Profil UMKM / Login Partner",
    
    // Directory Page
    dir_badge: "Direktori Pencarian B2B",
    dir_title: "Katalog Komoditas Jawa Barat",
    dir_search_placeholder: "Cari produk, perusahaan, spesifikasi...",
    dir_back_home: "Kembali ke Beranda",
    dir_filters: "Filter",
    dir_reset_all: "Bersihkan Semua",
    dir_category: "Kategori",
    dir_cat_all: "Semua Kategori",
    dir_capacity: "Kapasitas Bulanan",
    dir_capacity_all: "Semua Kapasitas",
    dir_capacity_min: "Min {qty} / bulan",
    dir_certs: "Sertifikasi",
    dir_verified_only: "Hanya Eksportir Terverifikasi",
    dir_showing: "Menampilkan {count} komoditas",
    dir_verified_exporter: "Eksportir Terverifikasi",
    dir_capacity_label: "Kapasitas",
    dir_view_details: "Lihat Detail",
    dir_request_quote: "Minta Penawaran",
    dir_empty_title: "Komoditas Tidak Ditemukan",
    dir_empty_desc: "Kami tidak dapat menemukan produk yang sesuai dengan kriteria filter Anda. Coba kurangi filter atau cari dengan istilah lain.",
    dir_empty_btn: "Bersihkan Semua Filter",
    
    // Product Detail Page
    prod_back: "Kembali ke Direktori",
    prod_min_order: "Kebutuhan Min. Pesanan",
    prod_min_order_val: "Dapat Dinegosiasikan",
    prod_incoterms: "Pilihan IncoTerm",
    prod_desc_title: "Deskripsi Produk",
    prod_specs_title: "Spesifikasi Produk",
    prod_spec_origin: "Lokasi Asal",
    prod_spec_grade: "Tingkat Kualitas",
    prod_spec_grade_val: "Ekspor Premium",
    prod_spec_packaging: "Unit Kemasan",
    prod_spec_packaging_val: "Kantong / Box Standar Ekspor",
    prod_spec_inspection: "Inspeksi Kualitas",
    prod_spec_inspection_val: "Diinspeksi SGS",
    prod_certs_title: "Sertifikasi & Kepatuhan",
    prod_certs_verified: "Terverifikasi",
    prod_map_title: "Lokasi Fasilitas Produksi",
    prod_map_desc: "Lokasi produksi dan operasional resmi yang telah terdaftar di Jawa Barat.",
    prod_supplier_badge: "Supplier",
    prod_supplier_verified: "Eksportir Terverifikasi",
    prod_supplier_curating: "Meninjau Dokumen...",
    prod_supplier_established: "Berdiri Tahun {year}",
    prod_btn_rfq: "Minta Penawaran Harga",
    prod_rfq_desc: "Sistem akan menyalurkan inquiries langsung kepada pimpinan koperasi dan mengirimkan notifikasi. UMKM akan merespons langsung via email Anda.",
    
    // Export Calculator
    calc_title: "Kalkulator Biaya Ekspor B2B",
    calc_origin: "Pelabuhan Asal Tanjung Priok / Patimban",
    calc_desc: "Estimasikan rincian biaya dari pabrik (Ex-Works) hingga ke pelabuhan tujuan Anda (FOB & CIF) secara instan.",
    calc_qty: "Kuantitas",
    calc_base_price: "Harga Dasar:",
    calc_port: "Pelabuhan Tujuan",
    calc_currency: "Display Mata Uang",
    calc_flow_title: "Alur Akumulasi Biaya",
    calc_flow_exworks: "Ex-Works",
    calc_flow_fob: "FOB (Pelabuhan)",
    calc_flow_cif: "CIF (Tujuan)",
    calc_table_title: "Estimasi Rincian Biaya",
    calc_table_exworks: "Biaya Komoditas (Ex-Works)",
    calc_table_local: "Transport Lokal & Dokumen",
    calc_table_local_desc: "Truk ke pelabuhan, bea cukai & THC",
    calc_table_fob: "Estimasi FOB Tanjung Priok / Patimban",
    calc_table_freight: "Biaya Angkut Laut (Freight)",
    calc_table_freight_desc: "Ke {port} (~{days} hari)",
    calc_table_insurance: "Asuransi Kargo Laut",
    calc_table_insurance_desc: "Perlindungan transit laut (0.3%)",
    calc_table_cif: "Estimasi Nilai CIF {port}",
    calc_btn_use: "Gunakan Kalkulasi di Form RFQ",
    
    // RFQ Modal
    rfq_title: "Kirim Permintaan Penawaran",
    rfq_subtitle: "Tanya Harga: {name}",
    rfq_supplier: "Pemasok: {name}",
    rfq_name: "Nama Anda",
    rfq_email: "Email Anda",
    rfq_country: "Negara Tujuan",
    rfq_quantity: "Jumlah yang Dibutuhkan",
    rfq_message: "Pesan Negosiasi / Rincian",
    rfq_message_placeholder: "Diskusikan target harga, syarat pengiriman, sampel...",
    rfq_btn_send: "Kirim Permintaan Penawaran",
    rfq_success_title: "Permintaan Penawaran Terkirim",
    rfq_success_desc: "RFQ telah berhasil dikirimkan ke database lokal. Notifikasi email simulasi telah dikirimkan ke pemilik produk.",
    rfq_success_badge: "Menyalurkan ke Kotak Masuk Mitra...",
    
    // Dashboard & Sidebar
    db_welcome: "Selamat datang kembali, {name}!",
    db_subtitle_sme: "Kelola katalog, sertifikasi, dan RFQ pembeli Anda.",
    db_btn_add: "Tambah Komoditas Baru",
    db_pending_curation: "Persetujuan Tertunda",
    db_pending_desc: "Profil legalitas perusahaan Anda masih dalam proses peninjauan kurasi Admin.",
    db_stat_commodities: "Komoditas Aktif",
    db_stat_inquiries: "Total Inquiries Diterima",
    db_stat_trust: "Tingkat Kepercayaan Ekspor",
    db_recent_inquiries: "Inquiries Terbaru dari Buyer Internasional",
    db_go_inbox: "Buka Kotak Masuk",
    db_no_inquiries: "Belum ada inquiries yang diterima.",
    db_no_inquiries_desc: "Cobalah untuk membuka detail produk di halaman direktori publik dan mengirimkan Request Quote!",
    
    db_sidebar_overview: "Ikhtisar Dashboard",
    db_sidebar_products: "Komoditas Saya",
    db_sidebar_inbox: "Kotak Masuk RFQ",
    db_sidebar_curation: "Kurasi & Legalitas",
    db_sidebar_profile: "Profil Perusahaan",
    db_sidebar_billing: "Langganan & Premium",
    db_sidebar_active_role: "Peran Aktif:",
    db_sidebar_btn_switch: "Ubah Peran",
    db_sidebar_btn_admin: "Mode Admin",
    db_sidebar_btn_sme: "Mode Mitra UMKM",
    db_sidebar_btn_buyer: "Kembali ke Publik",
    
    db_admin_overview: "Ikhtisar Admin",
    db_admin_subtitle: "Status dan analitik untuk platform Jabar Export Hub.",
    db_admin_stat_registered: "Total UMKM Terdaftar",
    db_admin_stat_pending: "Persetujuan Tertunda",
    db_admin_stat_rfqs: "RFQ yang Disalurkan",
    db_admin_pending_title: "Registrasi UMKM yang Tertunda",
    db_admin_go_curator: "Buka Pusat Kurasi",
    db_admin_verified_all: "Semua UMKM terdaftar telah dikurasi dan diverifikasi.",
    db_admin_table_company: "Nama Perusahaan",
    db_admin_table_est: "Berdiri",
    db_admin_table_location: "Lokasi",
    db_admin_table_action: "Aksi",
    db_admin_table_review: "Tinjau Dokumen Legal",
  },
  en: {
    // Navbar & Common
    nav_home: "Home",
    nav_directory: "Directory",
    nav_dashboard: "Dashboard",
    nav_login: "Partner Login",
    nav_register: "Register SME",
    nav_logout: "Logout",
    
    // Homepage
    hero_badge: "West Java B2B Export Gateway",
    hero_title: "Bridging West Java's Finest Commodities to the Global Market",
    hero_subtitle: "Jabar Export Hub connects international importers directly with curated, high-capacity West Java SMEs and cooperatives meeting global export standards.",
    hero_search_placeholder: "Search Arabica coffee, premium silk, rattan craft...",
    hero_search_btn: "Find Commodity",
    trust_verified: "100% Curated & Verified NIB",
    trust_direct: "Direct Global Negotiation",
    trust_independent: "B2B Trade Network",
    
    cat_title: "Featured Commodities",
    cat_subtitle: "Explore West Java's best export commodities based on industry category",
    cat_coffee_desc: "Arabica & Robusta Specialty from Priangan Highlands",
    cat_tea_desc: "Premium Highland Tea freshly picked on mountain slopes",
    cat_craft_desc: "High aesthetic rattan & wood craft made by local artisans",
    cat_textile_desc: "Premium natural silk woven with traditional Sundanese motifs",
    
    showcase_badge: "Premium Showcase",
    showcase_title: "Featured Export Commodities",
    showcase_explore: "Explore All Products",
    
    cta_buyer_badge: "Partner with Us",
    cta_buyer_title: "Looking for Reliable Suppliers in West Java?",
    cta_buyer_desc: "Our platform simplifies the sourcing process of West Java commodities. You can send Request for Quotations (RFQs) directly to producers without intermediaries, ensuring price and time efficiency.",
    cta_buyer_btn_browse: "Browse Catalog Directory",
    cta_buyer_btn_support: "Contact Support",
    cta_sme_badge: "For West Java SMEs",
    cta_sme_title: "West Java SMEs: Enter the Global Export Market",
    cta_sme_desc: "Showcase your products to buyers from Europe, America, Australia, and Asia. Gain maximum exposure and increase the trust of international buyers.",
    cta_sme_btn: "Register SME Profile / Login Partner",
    
    // Directory Page
    dir_badge: "B2B Sourcing Directory",
    dir_title: "West Java Commodities Catalog",
    dir_search_placeholder: "Search products, companies, specifications...",
    dir_back_home: "Back to Home",
    dir_filters: "Filters",
    dir_reset_all: "Reset All",
    dir_category: "Category",
    dir_cat_all: "All Categories",
    dir_capacity: "Monthly Capacity",
    dir_capacity_all: "All Capacities",
    dir_capacity_min: "Min {qty} / month",
    dir_certs: "Certifications",
    dir_verified_only: "Only Verified Exporters",
    dir_showing: "Showing {count} commodities",
    dir_verified_exporter: "Verified Exporter",
    dir_capacity_label: "Capacity",
    dir_view_details: "View Details",
    dir_request_quote: "Request Quote",
    dir_empty_title: "No Commodities Found",
    dir_empty_desc: "We couldn't find any products matching your filters. Try removing some filters or search with another term.",
    dir_empty_btn: "Clear All Filters",
    
    // Product Detail Page
    prod_back: "Back to Directory",
    prod_min_order: "Min Order Requirement",
    prod_min_order_val: "Negotiable",
    prod_incoterms: "IncoTerm Options",
    prod_desc_title: "Product Description",
    prod_specs_title: "Product Specifications",
    prod_spec_origin: "Origin Location",
    prod_spec_grade: "Standard Grade",
    prod_spec_grade_val: "Export Premium",
    prod_spec_packaging: "Packaging Unit",
    prod_spec_packaging_val: "Export Standard Bag / Box",
    prod_spec_inspection: "Quality Inspection",
    prod_spec_inspection_val: "SGS Quality Inspected",
    prod_certs_title: "Certifications & Compliance",
    prod_certs_verified: "Verified",
    prod_map_title: "Production Facility Location",
    prod_map_desc: "Official production and operational location registered in West Java.",
    prod_supplier_badge: "Supplier",
    prod_supplier_verified: "Verified Export Partner",
    prod_supplier_curating: "Curating Documents...",
    prod_supplier_established: "Established {year}",
    prod_btn_rfq: "Request a Quote",
    prod_rfq_desc: "The system will route inquiries directly to cooperative leaders and send a notification. The SME will respond directly to your email.",
    
    // Export Calculator
    calc_title: "B2B Export Cost Calculator",
    calc_origin: "Port of Tanjung Priok / Patimban Origin",
    calc_desc: "Estimate export costs from factory (Ex-Works) to your destination port (FOB & CIF) instantly.",
    calc_qty: "Quantity",
    calc_base_price: "Base Price:",
    calc_port: "Destination Port",
    calc_currency: "Display Currency",
    calc_flow_title: "Cost Accumulation Flow",
    calc_flow_exworks: "Ex-Works",
    calc_flow_fob: "FOB (Port)",
    calc_flow_cif: "CIF (Destination)",
    calc_table_title: "Cost Breakdown Estimation",
    calc_table_exworks: "Commodity Cost (Ex-Works)",
    calc_table_local: "Local Transport & Document Fees",
    calc_table_local_desc: "Trucking to port, customs clearance & THC",
    calc_table_fob: "FOB Tanjung Priok / Patimban Est.",
    calc_table_freight: "Ocean Freight Cost",
    calc_table_freight_desc: "To {port} (~{days} days)",
    calc_table_insurance: "Marine Cargo Insurance",
    calc_table_insurance_desc: "Marine transit coverage (0.3%)",
    calc_table_cif: "Estimated CIF {port} Value",
    calc_btn_use: "Use Calculations in RFQ Form",
    
    // RFQ Modal
    rfq_title: "Send RFQ",
    rfq_subtitle: "Inquire: {name}",
    rfq_supplier: "Supplier: {name}",
    rfq_name: "Your Name",
    rfq_email: "Your Email",
    rfq_country: "Destination Country",
    rfq_quantity: "Quantity Needed",
    rfq_message: "Negotiation / Details Message",
    rfq_message_placeholder: "Discuss target price, shipping terms, samples...",
    rfq_btn_send: "Send Inquiry Request",
    rfq_success_title: "Quote Request Submitted",
    rfq_success_desc: "RFQ has been successfully submitted to local database. A simulated email notification was dispatched to the product owner.",
    rfq_success_badge: "Routing to Partner Inbox...",
    
    // Dashboard & Sidebar
    db_welcome: "Welcome back, {name}!",
    db_subtitle_sme: "Manage your catalog, certifications, and buyer RFQs.",
    db_btn_add: "Add New Commodity",
    db_pending_curation: "Verification Pending Approval",
    db_pending_desc: "Your company legal profile is still under review by the Admin curators.",
    db_stat_commodities: "Active Commodities",
    db_stat_inquiries: "Total Inquiries Received",
    db_stat_trust: "Export Trust Level",
    db_recent_inquiries: "Recent Inquiries from International Buyers",
    db_go_inbox: "Go to Inbox",
    db_no_inquiries: "No inquiries received yet.",
    db_no_inquiries_desc: "Try opening product details in the directory and sending a Request Quote!",
    
    db_sidebar_overview: "Dashboard Overview",
    db_sidebar_products: "My Commodities",
    db_sidebar_inbox: "RFQ Inbox",
    db_sidebar_curation: "Curation & Legal",
    db_sidebar_profile: "Company Profile",
    db_sidebar_billing: "Subscription & Premium",
    db_sidebar_active_role: "Active Role:",
    db_sidebar_btn_switch: "Switch Role",
    db_sidebar_btn_admin: "Admin Mode",
    db_sidebar_btn_sme: "SME Partner Mode",
    db_sidebar_btn_buyer: "Return to Public",
    
    db_admin_overview: "Admin Overview",
    db_admin_subtitle: "Status and analytics for the Jabar Export Hub platform.",
    db_admin_stat_registered: "Registered SMEs",
    db_admin_stat_pending: "Pending Approvals",
    db_admin_stat_rfqs: "Routed RFQs",
    db_admin_pending_title: "Pending SME Registrations",
    db_admin_go_curator: "Go to Curator Center",
    db_admin_verified_all: "All registered SMEs are curated and verified.",
    db_admin_table_company: "Company Name",
    db_admin_table_est: "Established",
    db_admin_table_location: "Location",
    db_admin_table_action: "Action",
    db_admin_table_review: "Review Legal Docs",
  }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: keyof typeof translations.en | keyof typeof translations.id, params?: Record<string, string | number>) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>("id");

  useEffect(() => {
    const storedLang = localStorage.getItem("jebar_lang");
    if (storedLang === "en" || storedLang === "id") {
      setLanguageState(storedLang as Language);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("jebar_lang", lang);
  };

  const t = (
    key: keyof typeof translations.en | keyof typeof translations.id,
    params?: Record<string, string | number>
  ): string => {
    const currentDict = translations[language];
    let value = (currentDict[key as keyof typeof currentDict] || translations["id"][key as keyof typeof translations["id"]] || key) as string;

    if (params) {
      Object.entries(params).forEach(([paramKey, paramVal]) => {
        value = value.replace(new RegExp(`{${paramKey}}`, "g"), String(paramVal));
      });
    }

    return value;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
