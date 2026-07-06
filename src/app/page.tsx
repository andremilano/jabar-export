"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useDemo } from "@/context/DemoContext";
import { Search, ArrowRight, ShieldCheck, Globe2, BadgeCheck, Leaf, Coffee, Hammer, Scissors } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export default function Home() {
  const router = useRouter();
  const { products } = useDemo();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/directory?search=${encodeURIComponent(searchQuery)}`);
    } else {
      router.push("/directory");
    }
  };

  const categories: { name: string; icon: LucideIcon; desc: string; capacity: string; color: string; iconBg: string; iconColor: string }[] = [
    {
      name: "Kopi",
      icon: Coffee,
      desc: "Arabica & Robusta Specialty dari dataran tinggi Priangan",
      capacity: "15,000+ kg/bulan",
      color: "from-amber-800 to-amber-950",
      iconBg: "bg-gold-100 dark:bg-gold-900/30",
      iconColor: "text-gold-700 dark:text-gold-400",
    },
    {
      name: "Teh",
      icon: Leaf,
      desc: "Teh Premium Highland dipetik segar di lereng pegunungan",
      capacity: "10,000+ kg/bulan",
      color: "from-emerald-700 to-emerald-950",
      iconBg: "bg-forest-100 dark:bg-forest-900/30",
      iconColor: "text-forest-700 dark:text-forest-400",
    },
    {
      name: "Kriya",
      icon: Hammer,
      desc: "Kerajinan rotan & kayu bernilai seni tinggi hasil pengrajin lokal",
      capacity: "2,500+ pcs/bulan",
      color: "from-amber-600 to-amber-800",
      iconBg: "bg-gold-100 dark:bg-gold-900/30",
      iconColor: "text-gold-800 dark:text-gold-500",
    },
    {
      name: "Tekstil",
      icon: Scissors,
      desc: "Tenun sutra alam premium bermotif tradisional Sunda",
      capacity: "1,200+ pcs/bulan",
      color: "from-purple-800 to-purple-950",
      iconBg: "bg-forest-100 dark:bg-forest-900/30",
      iconColor: "text-forest-600 dark:text-forest-400",
    },
  ];

  // Get 3 featured products (prioritize verified companies)
  const featuredProducts = products.slice(0, 3);

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-24 pb-20 md:pt-32 md:pb-28 bg-grid-pattern">
        {/* Glow Effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-forest-400/10 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute top-1/3 left-1/3 w-[300px] h-[300px] bg-gold-400/10 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto space-y-8">
            {/* Tagline */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-forest-100/50 dark:bg-forest-900/30 border border-forest-200/30 text-xs font-semibold text-forest-700 dark:text-forest-800">
              <Leaf className="w-3.5 h-3.5 text-gold-500 animate-pulse" />
              <span>Jawa Barat B2B Export Gateway</span>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight md:leading-none">
              Bridging West Java&apos;s Finest{" "}
              <span className="bg-gradient-to-r from-forest-600 via-forest-500 to-gold-500 bg-clip-text text-transparent">
                Commodities
              </span>{" "}
              to the Global Market
            </h1>

            {/* Subtitle */}
            <p className="text-base md:text-lg text-forest-800 dark:text-forest-700 max-w-2xl mx-auto leading-relaxed">
              Jabar Export Hub menghubungkan importir internasional secara langsung dengan UMKM & Koperasi terkurasi Jawa Barat yang memiliki kapasitas produksi tinggi dan standar mutu ekspor dunia.
            </p>

            {/* Search Bar */}
            <form
              onSubmit={handleSearchSubmit}
              className="max-w-2xl mx-auto flex items-center p-2 rounded-2xl bg-white dark:bg-forest-950 border border-forest-100/30 dark:border-forest-900/30 shadow-lg shadow-forest-950/5"
            >
              <div className="flex-1 flex items-center pl-3">
                <Search className="w-5 h-5 text-forest-700" />
                <input
                  type="text"
                  placeholder="Search Arabica coffee, premium silk, rattan craft..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent border-0 outline-none focus:ring-0 text-sm ml-3 text-forest-950 dark:text-white"
                />
              </div>
              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-forest-600 hover:bg-forest-700 text-white text-xs font-bold transition-all shadow-md"
              >
                Find Commodity
              </button>
            </form>

            {/* Trust Badges */}
            <div className="pt-6 grid grid-cols-2 md:grid-cols-3 gap-6 max-w-3xl mx-auto text-xs font-semibold text-forest-800 dark:text-forest-800 border-t border-forest-100/10 dark:border-forest-900/20">
              <div className="flex items-center justify-center gap-2">
                <ShieldCheck className="w-5 h-5 text-gold-500" />
                <span>100% Curated & Verified NIB</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Globe2 className="w-5 h-5 text-gold-500" />
                <span>Direct Global Negotation</span>
              </div>
              <div className="flex items-center justify-center gap-2 col-span-2 md:col-span-1">
                <BadgeCheck className="w-5 h-5 text-gold-500" />
                <span>Official Government-Backed</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-20 bg-forest-50/50 dark:bg-forest-950/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <h2 className="text-2xl md:text-3xl font-bold">Featured Commodities</h2>
            <div className="h-1.5 w-16 bg-gold-400 mx-auto rounded-full"></div>
            <p className="text-xs md:text-sm text-forest-800 dark:text-forest-800">
              Jelajahi komoditas ekspor terbaik Jawa Barat berdasarkan kategori industri
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((cat) => (
              <Link
                key={cat.name}
                href={`/directory?category=${cat.name}`}
                className="group relative overflow-hidden rounded-2xl p-6 bg-white dark:bg-forest-900/30 border border-forest-100/20 dark:border-forest-900/20 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between min-h-[220px]"
              >
                <div>
                  <div className={`inline-flex items-center justify-center mb-4 p-3 rounded-xl ${cat.iconBg}`}>
                    <cat.icon className={`w-6 h-6 ${cat.iconColor}`} />
                  </div>
                  <h3 className="text-lg font-bold text-forest-900 dark:text-white group-hover:text-gold-500 transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-forest-800 dark:text-forest-800 mt-2 leading-relaxed">
                    {cat.desc}
                  </p>
                </div>
                <div className="mt-4 pt-4 border-t border-forest-100/10 dark:border-forest-900/20 flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-forest-800">
                    {cat.capacity}
                  </span>
                  <ArrowRight className="w-4 h-4 text-forest-700 group-hover:text-gold-500 group-hover:translate-x-1 transition-all" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
            <div>
              <span className="text-xs font-bold text-gold-500 uppercase tracking-widest block mb-2">
                Premium Showcase
              </span>
              <h2 className="text-2xl md:text-3xl font-bold">Featured Export Commodities</h2>
              <div className="h-1 w-16 bg-forest-600 mt-3 rounded-full"></div>
            </div>
            <Link
              href="/directory"
              className="inline-flex items-center gap-1 text-xs font-bold text-forest-600 dark:text-forest-700 hover:text-gold-500 transition-colors"
            >
              <span>Explore All Products</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProducts.map((prod) => (
              <div
                key={prod.id}
                className="group flex flex-col bg-white dark:bg-forest-900/20 rounded-2xl border border-forest-100/20 dark:border-forest-900/20 overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
              >
                {/* Product Image */}
                <div className="h-56 relative overflow-hidden bg-forest-100/50">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={prod.imageUrl}
                    alt={prod.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 flex flex-col gap-1.5">
                    <span className="px-2.5 py-1 rounded-lg text-[10px] font-extrabold uppercase bg-forest-950/80 text-white backdrop-blur-sm">
                      {prod.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-1">
                  {/* Company Info */}
                  <div className="flex items-center gap-1.5 mb-2.5">
                    <span className="text-xs font-semibold text-forest-800 hover:underline cursor-pointer">
                      {prod.companyName}
                    </span>
                    <span className="inline-flex items-center p-0.5 rounded-full bg-gold-400/10 text-gold-500" title="Verified exporter">
                      <ShieldCheck className="w-3.5 h-3.5 fill-current" />
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-base font-bold text-forest-950 dark:text-white line-clamp-1 mb-2 hover:text-gold-500">
                    <Link href={`/product/${prod.id}`}>{prod.name}</Link>
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-forest-800 dark:text-forest-800 line-clamp-2 leading-relaxed flex-1">
                    {prod.description}
                  </p>

                  {/* Specs footer */}
                  <div className="border-t border-forest-100/10 dark:border-forest-900/20 pt-4 mt-5 flex items-center justify-between">
                    <div>
                      <p className="text-[10px] uppercase text-forest-700 font-bold">Capacity</p>
                      <p className="text-xs font-bold text-forest-900 dark:text-white">
                        {prod.monthlyCapacity.toLocaleString()} {prod.unit}/month
                      </p>
                    </div>
                    <Link
                      href={`/product/${prod.id}`}
                      className="px-4 py-2.5 rounded-lg border border-forest-100 hover:border-gold-500 dark:border-forest-800 text-[11px] font-bold text-forest-600 dark:text-forest-700 hover:text-gold-500 hover:bg-gold-500/5 transition-all"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden bg-forest-950 text-white">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-gold-500/10 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Callout */}
            <div className="space-y-6">
              <span className="text-xs font-extrabold text-gold-400 uppercase tracking-widest">
                Partner with us
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold leading-tight">
                Are you an International Buyer looking for reliable suppliers?
              </h2>
              <p className="text-xs md:text-sm text-forest-700 leading-relaxed">
                Platform kami mempermudah proses pencarian (sourcing) komoditas Jawa Barat. Anda dapat mengirimkan Request for Quotation (RFQ) langsung ke produsen tanpa perantara, memastikan efisiensi harga dan waktu.
              </p>
              <div className="pt-2 flex flex-wrap gap-4">
                <Link
                  href="/directory"
                  className="px-6 py-3 rounded-xl bg-gold-400 hover:bg-gold-500 text-gold-950 text-xs font-extrabold transition-all shadow-lg shadow-gold-950/20"
                >
                  Browse Catalog Directory
                </Link>
                <a
                  href="#contact"
                  className="px-6 py-3 rounded-xl border border-forest-700 hover:bg-forest-900 text-xs font-extrabold transition-all"
                >
                  Contact Support
                </a>
              </div>
            </div>

            {/* SME CTA Card */}
            <div className="p-8 rounded-2xl glass border border-forest-900/50 space-y-6">
              <span className="px-3 py-1 rounded-full bg-forest-700/50 text-[10px] font-bold text-gold-400 tracking-wider uppercase inline-block">
                For West Java SMEs
              </span>
              <h3 className="text-xl font-bold">UMKM Jawa Barat: Masuk ke Pasar Ekspor Global</h3>
              <p className="text-xs text-forest-700 leading-relaxed">
                Tampilkan produk Anda ke pembeli dari Eropa, Amerika, Australia, dan Asia. Dapatkan validasi legalitas secara resmi dari Dinas Perdagangan untuk meningkatkan kepercayaan pembeli internasional.
              </p>
              <Link
                href="/dashboard"
                className="w-full flex items-center justify-between px-5 py-3 rounded-xl bg-white text-forest-950 hover:text-white hover:bg-forest-800 text-xs font-bold transition-all"
              >
                <span>Daftarkan Profil UMKM / Login Partner</span>
                <ArrowRight className="w-4 h-4 text-forest-600 group-hover:text-white" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
