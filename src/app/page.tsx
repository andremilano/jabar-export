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

  const categories: { name: string; icon: LucideIcon; desc: string; capacity: string; iconBg: string; iconColor: string }[] = [
    {
      name: "Kopi",
      icon: Coffee,
      desc: "Arabica & Robusta Specialty dari dataran tinggi Priangan",
      capacity: "15,000+ kg/bulan",
      iconBg: "bg-[#F5F5EB]",
      iconColor: "text-[#A47148]",
    },
    {
      name: "Teh",
      icon: Leaf,
      desc: "Teh Premium Highland dipetik segar di lereng pegunungan",
      capacity: "10,000+ kg/bulan",
      iconBg: "bg-[#F5F5EB]",
      iconColor: "text-[#166534]",
    },
    {
      name: "Kriya",
      icon: Hammer,
      desc: "Kerajinan rotan & kayu bernilai seni tinggi hasil pengrajin lokal",
      capacity: "2,500+ pcs/bulan",
      iconBg: "bg-[#F5F5EB]",
      iconColor: "text-[#A47148]",
    },
    {
      name: "Tekstil",
      icon: Scissors,
      desc: "Tenun sutra alam premium bermotif tradisional Sunda",
      capacity: "1,200+ pcs/bulan",
      iconBg: "bg-[#F5F5EB]",
      iconColor: "text-[#166534]",
    },
  ];

  const featuredProducts = products.slice(0, 3);

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-24 pb-20 md:pt-32 md:pb-28 bg-grid-pattern bg-[#FAFAF5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto space-y-8">
            {/* Tagline */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-[4px] bg-[#F5F5EB] border border-[#D6D3D1] text-xs font-semibold text-[#166534]">
              <Leaf className="w-3.5 h-3.5 text-[#A47148]" />
              <span>Jawa Barat B2B Export Gateway</span>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight md:leading-none text-[#1C1917]">
              Bridging West Java&apos;s Finest{" "}
              <span className="text-[#166534]">
                Commodities
              </span>{" "}
              to the Global Market
            </h1>

            {/* Subtitle */}
            <p className="text-base md:text-lg text-[#57534E] max-w-2xl mx-auto leading-relaxed font-sans">
              Jabar Export Hub menghubungkan importir internasional secara langsung dengan UMKM & Koperasi terkurasi Jawa Barat yang memiliki kapasitas produksi tinggi dan standar mutu ekspor dunia.
            </p>

            {/* Search Bar */}
            <form
              onSubmit={handleSearchSubmit}
              className="max-w-2xl mx-auto flex items-center p-2 rounded-[12px] bg-white border border-[#D6D3D1] border-b-[3px] border-b-[#A8A29E]"
            >
              <div className="flex-1 flex items-center pl-3">
                <Search className="w-5 h-5 text-[#57534E]" />
                <input
                  type="text"
                  placeholder="Search Arabica coffee, premium silk, rattan craft..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent border-0 outline-none focus:ring-0 text-sm ml-3 text-[#1C1917] placeholder-[#A8A29E]"
                />
              </div>
              <button
                type="submit"
                className="btn-primary"
              >
                Find Commodity
              </button>
            </form>

            {/* Trust Badges */}
            <div className="pt-6 grid grid-cols-2 md:grid-cols-3 gap-6 max-w-3xl mx-auto text-xs font-semibold text-[#57534E] border-t border-[#E7E5E4]">
              <div className="flex items-center justify-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#166534]" />
                <span>100% Curated & Verified NIB</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Globe2 className="w-5 h-5 text-[#166534]" />
                <span>Direct Global Negotiation</span>
              </div>
              <div className="flex items-center justify-center gap-2 col-span-2 md:col-span-1">
                <BadgeCheck className="w-5 h-5 text-[#166534]" />
                <span>Official Government-Backed</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-20 bg-[#F5F5EB]/30 border-t border-b border-[#E7E5E4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <h2 className="text-2xl md:text-3xl font-bold text-[#1C1917]">Featured Commodities</h2>
            <div className="h-1.5 w-16 bg-[#A47148] mx-auto rounded-[4px]"></div>
            <p className="text-xs md:text-sm text-[#57534E]">
              Jelajahi komoditas ekspor terbaik Jawa Barat berdasarkan kategori industri
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((cat) => (
              <Link
                key={cat.name}
                href={`/directory?category=${cat.name}`}
                className="group relative overflow-hidden rounded-[12px] p-6 bg-white border border-[#E7E5E4] border-b-2 border-b-[#D6D3D1] hover:border-[#A8A29E] transition-all duration-300 flex flex-col justify-between min-h-[220px]"
              >
                <div>
                  <div className={`inline-flex items-center justify-center mb-4 p-3 rounded-[8px] ${cat.iconBg}`}>
                    <cat.icon className={`w-6 h-6 ${cat.iconColor}`} />
                  </div>
                  <h3 className="text-lg font-bold text-[#1C1917] group-hover:text-[#166534] transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-[#57534E] mt-2 leading-relaxed font-sans">
                    {cat.desc}
                  </p>
                </div>
                <div className="mt-4 pt-4 border-t border-[#E7E5E4] flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#A47148]">
                    {cat.capacity}
                  </span>
                  <ArrowRight className="w-4 h-4 text-[#166534] group-hover:translate-x-1 transition-all" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-[#FAFAF5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
            <div>
              <span className="text-xs font-bold text-[#A47148] uppercase tracking-widest block mb-2 font-sans">
                Premium Showcase
              </span>
              <h2 className="text-2xl md:text-3xl font-bold text-[#1C1917]">Featured Export Commodities</h2>
              <div className="h-1 w-16 bg-[#166534] mt-3 rounded-[4px]"></div>
            </div>
            <Link
              href="/directory"
              className="inline-flex items-center gap-1 text-xs font-bold text-[#166534] hover:text-[#A47148] transition-colors font-sans"
            >
              <span>Explore All Products</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProducts.map((prod) => (
              <div
                key={prod.id}
                className="group flex flex-col bg-white rounded-[12px] border border-[#E7E5E4] border-b-2 border-b-[#D6D3D1] hover:border-[#A8A29E] overflow-hidden transition-all duration-300"
              >
                {/* Product Image */}
                <div className="h-56 relative overflow-hidden bg-[#F5F5EB]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={prod.imageUrl}
                    alt={prod.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 flex flex-col gap-1.5">
                    <span className="px-2.5 py-1 rounded-[4px] text-[10px] font-extrabold uppercase bg-[#1C1917]/80 text-[#FAFAF5] backdrop-blur-sm">
                      {prod.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-1">
                  {/* Company Info */}
                  <div className="flex items-center gap-1.5 mb-2.5 font-sans">
                    <span className="text-xs font-semibold text-[#57534E] hover:underline cursor-pointer">
                      {prod.companyName}
                    </span>
                    <span className="inline-flex items-center p-0.5 rounded-full bg-[#166534]/10 text-[#166534]" title="Verified exporter">
                      <ShieldCheck className="w-3.5 h-3.5 fill-current" />
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-base font-bold text-[#1C1917] line-clamp-1 mb-2 hover:text-[#166534] font-serif">
                    <Link href={`/product/${prod.id}`}>{prod.name}</Link>
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-[#57534E] line-clamp-2 leading-relaxed flex-1 font-sans">
                    {prod.description}
                  </p>

                  {/* Specs footer */}
                  <div className="border-t border-[#E7E5E4] pt-4 mt-5 flex items-center justify-between font-sans">
                    <div>
                      <p className="text-[10px] uppercase text-[#A8A29E] font-bold">Capacity</p>
                      <p className="text-xs font-bold text-[#1C1917]">
                        {prod.monthlyCapacity.toLocaleString()} {prod.unit}/month
                      </p>
                    </div>
                    <Link
                      href={`/product/${prod.id}`}
                      className="btn-secondary btn-sm"
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
      <section className="py-20 relative overflow-hidden bg-[#1C1917] text-white">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Callout */}
            <div className="space-y-6">
              <span className="text-xs font-extrabold text-[#86A873] uppercase tracking-widest block font-sans">
                Partner with us
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold leading-tight font-serif text-[#FAFAF5]">
                Are you an International Buyer looking for reliable suppliers?
              </h2>
              <p className="text-xs md:text-sm text-[#A8A29E] leading-relaxed font-sans">
                Platform kami mempermudah proses pencarian (sourcing) komoditas Jawa Barat. Anda dapat mengirimkan Request for Quotation (RFQ) langsung ke produsen tanpa perantara, memastikan efisiensi harga dan waktu.
              </p>
              <div className="pt-2 flex flex-wrap gap-4 font-sans">
                <Link
                  href="/directory"
                  className="px-6 py-3 rounded-[8px] bg-[#166534] hover:bg-[#14532D] text-white text-xs font-extrabold transition-all"
                >
                  Browse Catalog Directory
                </Link>
                <a
                  href="#contact"
                  className="px-6 py-3 rounded-[8px] border border-[#57534E] hover:bg-white/5 text-white text-xs font-extrabold transition-all text-center"
                >
                  Contact Support
                </a>
              </div>
            </div>

            {/* SME CTA Card */}
            <div className="p-8 rounded-[12px] bg-white text-[#1C1917] border border-[#D6D3D1] border-b-[3px] border-b-[#A8A29E] space-y-6">
              <span className="px-3 py-1 rounded-[4px] bg-[#F5F5EB] text-[10px] font-bold text-[#166534] tracking-wider uppercase inline-block font-sans">
                For West Java SMEs
              </span>
              <h3 className="text-xl font-bold font-serif text-[#1C1917]">UMKM Jawa Barat: Masuk ke Pasar Ekspor Global</h3>
              <p className="text-xs text-[#57534E] leading-relaxed font-sans">
                Tampilkan produk Anda ke pembeli dari Eropa, Amerika, Australia, dan Asia. Dapatkan validasi legalitas secara resmi dari Dinas Perdagangan untuk meningkatkan kepercayaan pembeli internasional.
              </p>
              <Link
                href="/dashboard"
                className="w-full btn-primary flex items-center justify-between px-5 py-3 rounded-[8px]"
              >
                <span>Daftarkan Profil UMKM / Login Partner</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
