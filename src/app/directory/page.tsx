"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useDemo } from "@/context/DemoContext";
import { Search, Filter, ShieldCheck, HelpCircle, X, ListFilter, ArrowLeft } from "lucide-react";
import Link from "next/link";

function DirectoryContent() {
  const { products, companies } = useDemo();
  const searchParams = useSearchParams();
  const router = useRouter();

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedCerts, setSelectedCerts] = useState<string[]>([]);
  const [minCapacity, setMinCapacity] = useState<number>(0);
  const [onlyVerified, setOnlyVerified] = useState<boolean>(false);

  useEffect(() => {
    const categoryQuery = searchParams.get("category");
    const searchQuery = searchParams.get("search");

    if (categoryQuery) {
      setSelectedCategory(categoryQuery);
    }
    if (searchQuery) {
      setSearch(searchQuery);
    }
  }, [searchParams]);

  const certOptions = ["Halal", "HACCP", "Fair Trade", "SVLK", "Organic Indonesia"];

  const capacityOptions = [
    { label: "All Capacities", value: 0 },
    { label: "Min 100 / month", value: 100 },
    { label: "Min 500 / month", value: 500 },
    { label: "Min 1,000 / month", value: 1000 },
    { label: "Min 5,000 / month", value: 5000 },
  ];

  const handleCertToggle = (cert: string) => {
    if (selectedCerts.includes(cert)) {
      setSelectedCerts(selectedCerts.filter((c) => c !== cert));
    } else {
      setSelectedCerts([...selectedCerts, cert]);
    }
  };

  const handleResetFilters = () => {
    setSearch("");
    setSelectedCategory("");
    setSelectedCerts([]);
    setMinCapacity(0);
    setOnlyVerified(false);
    router.push("/directory");
  };

  const isCompanyVerified = (companyId: string) => {
    const company = companies.find((c) => c.id === companyId);
    return company ? company.isVerified : false;
  };

  const filteredProducts = products.filter((prod) => {
    if (search) {
      const q = search.toLowerCase();
      const nameMatch = prod.name.toLowerCase().includes(q);
      const descMatch = prod.description.toLowerCase().includes(q);
      const compMatch = prod.companyName.toLowerCase().includes(q);
      if (!nameMatch && !descMatch && !compMatch) return false;
    }

    if (selectedCategory && prod.category !== selectedCategory) {
      return false;
    }

    if (selectedCerts.length > 0) {
      const hasAllCerts = selectedCerts.every((cert) =>
        prod.certifications.some((c) => c.toLowerCase().includes(cert.toLowerCase()))
      );
      if (!hasAllCerts) return false;
    }

    if (minCapacity > 0 && prod.monthlyCapacity < minCapacity) {
      return false;
    }

    if (onlyVerified && !isCompanyVerified(prod.companyId)) {
      return false;
    }

    return true;
  });

  return (
    <div className="flex flex-col min-h-screen bg-[#FAFAF5]">
      <Navbar />
      {/* Header Search Section */}
      <section className="bg-[#1C1917] text-white py-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Back button */}
          <div className="mb-6 flex justify-start">
            <Link 
              href="/" 
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#86A873] hover:text-[#FAFAF5] transition-colors"
            >
              <ArrowLeft className="w-4 h-4 text-[#86A873] hover:text-[#FAFAF5]" />
              <span>Kembali ke Beranda</span>
            </Link>
          </div>
          <div className="max-w-3xl">
            <span className="text-xs font-bold text-[#86A873] uppercase tracking-widest block mb-2 font-sans">
              B2B Sourcing Directory
            </span>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-6 text-[#FAFAF5] font-serif">
              West Java Commodities Catalog
            </h1>
            
            {/* Embedded Search input inside banner */}
            <div className="relative max-w-xl rounded-[12px] bg-white text-[#1C1917] flex items-center p-1 border border-[#D6D3D1] border-b-[3px] border-b-[#A8A29E] font-sans">
              <Search className="w-5 h-5 text-[#57534E] ml-3" />
              <input
                type="text"
                placeholder="Search products, companies, specifications..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-transparent border-0 outline-none focus:ring-0 text-sm ml-3 py-3"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="p-1 rounded-full hover:bg-[#F5F5EB] mr-2 text-[#57534E] hover:text-[#1C1917] cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Main Catalog Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Filters Sidebar (Desktop) */}
          <aside className="w-full lg:w-68 shrink-0 space-y-6">
            <div className="p-6 rounded-[12px] bg-white border border-[#D6D3D1] border-b-[3px] border-b-[#A8A29E] space-y-6">
              
              {/* Header filter */}
              <div className="flex items-center justify-between pb-4 border-b border-[#E7E5E4] font-sans">
                <h3 className="text-sm font-bold flex items-center gap-2 text-[#1C1917]">
                  <Filter className="w-4 h-4 text-[#166534]" />
                  <span>Filters</span>
                </h3>
                {(selectedCategory || selectedCerts.length > 0 || minCapacity > 0 || onlyVerified || search) && (
                  <button
                    onClick={handleResetFilters}
                    className="text-[11px] font-semibold text-[#A47148] hover:text-[#166534] transition-colors cursor-pointer"
                  >
                    Reset All
                  </button>
                )}
              </div>

              {/* Category Filter */}
              <div className="space-y-2 font-sans">
                <p className="text-xs font-bold text-[#1C1917] uppercase tracking-widest">Category</p>
                <div className="space-y-1.5">
                  {["", "Kopi", "Teh", "Kriya", "Tekstil"].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`w-full text-left px-3 py-2 rounded-[8px] text-xs font-medium cursor-pointer transition-all ${
                        selectedCategory === cat
                          ? "bg-[#166534] text-white font-semibold"
                          : "text-[#57534E] hover:bg-[#F5F5EB] hover:text-[#1C1917]"
                      }`}
                    >
                      {cat === "" ? "All Categories" : cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Capacity Filter */}
              <div className="space-y-2 font-sans">
                <p className="text-xs font-bold text-[#1C1917] uppercase tracking-widest">Monthly Capacity</p>
                <div className="relative">
                  <select
                    value={minCapacity}
                    onChange={(e) => setMinCapacity(Number(e.target.value))}
                    className="w-full text-xs p-3 bg-white border border-[#D6D3D1] rounded-[8px] outline-none focus:border-[#166534] focus:ring-2 focus:ring-[#166534]/20 cursor-pointer"
                  >
                    {capacityOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Certifications Filter */}
              <div className="space-y-2 font-sans">
                <p className="text-xs font-bold text-[#1C1917] uppercase tracking-widest">Certifications</p>
                <div className="space-y-2.5">
                  {certOptions.map((cert) => {
                    const isChecked = selectedCerts.includes(cert);
                    return (
                      <label
                        key={cert}
                        className="flex items-center gap-[10px] text-sm text-[#1C1917] cursor-pointer font-normal"
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => handleCertToggle(cert)}
                        />
                        <span>{cert}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Verified Status Toggle */}
              <div className="pt-4 border-t border-[#E7E5E4] font-sans">
                <label className="flex items-center gap-[10px] text-sm font-semibold text-[#1C1917] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={onlyVerified}
                    onChange={(e) => setOnlyVerified(e.target.checked)}
                  />
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-[#166534] fill-[#166534]/10" />
                    <span>Only Verified Exporters</span>
                  </div>
                </label>
              </div>

            </div>
          </aside>

          {/* Catalog Listing */}
          <main className="grow">
            {/* Active Filters list info header */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6 font-sans">
              <p className="text-xs text-[#57534E] font-medium">
                Showing <span className="font-bold text-[#1C1917]">{filteredProducts.length}</span> commodities
              </p>
              
              <div className="flex flex-wrap gap-2 items-center">
                <ListFilter className="w-4 h-4 text-[#A8A29E]" />
                {selectedCategory && (
                  <span className="chip-filter selected text-xs py-1! px-2.5! cursor-default">
                    {selectedCategory}
                    <button onClick={() => setSelectedCategory("")} className="ml-1 text-white hover:text-red-200 cursor-pointer">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {minCapacity > 0 && (
                  <span className="chip-filter selected text-xs py-1! px-2.5! cursor-default">
                    Min {minCapacity.toLocaleString()}/mo
                    <button onClick={() => setMinCapacity(0)} className="ml-1 text-white hover:text-red-200 cursor-pointer">
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </span>
                )}
                {onlyVerified && (
                  <span className="chip-filter selected text-xs py-1! px-2.5! cursor-default">
                    Verified Exporter
                    <button onClick={() => setOnlyVerified(false)} className="ml-1 text-white hover:text-red-200 cursor-pointer">
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </span>
                )}
              </div>
            </div>

            {/* Products Grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((prod) => {
                  const verified = isCompanyVerified(prod.companyId);
                  return (
                    <div
                      key={prod.id}
                      className="group flex flex-col bg-white rounded-[12px] border border-[#E7E5E4] border-b-2 border-b-[#D6D3D1] hover:border-[#A8A29E] overflow-hidden transition-all duration-300"
                    >
                      {/* Image */}
                      <div className="h-48 relative overflow-hidden bg-[#F5F5EB]">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={prod.imageUrl}
                          alt={prod.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-3 left-3 flex flex-col gap-1">
                          <span className="px-2.5 py-0.5 rounded-[4px] text-[9px] font-extrabold uppercase bg-[#1C1917]/80 text-[#FAFAF5] backdrop-blur-sm">
                            {prod.category}
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-5 flex flex-col flex-1">
                        {/* Company & Verification Status */}
                        <div className="flex items-center gap-1.5 mb-1.5 font-sans">
                          <span className="text-xs font-semibold text-[#57534E] hover:underline">
                            {prod.companyName}
                          </span>
                          {verified && (
                            <span className="inline-flex items-center p-0.5 rounded-full bg-[#166534]/10 text-[#166534]" title="Verified exporter profile">
                              <ShieldCheck className="w-3.5 h-3.5 fill-current" />
                            </span>
                          )}
                        </div>

                        {/* Title */}
                        <h3 className="text-sm font-bold text-[#1C1917] line-clamp-1 mb-2 hover:text-[#166534] font-serif">
                          <Link href={`/product/${prod.id}`}>{prod.name}</Link>
                        </h3>

                        {/* Description */}
                        <p className="text-xs text-[#57534E] line-clamp-2 leading-relaxed flex-1 font-sans">
                          {prod.description}
                        </p>

                        {/* Badges/Certifications */}
                        <div className="flex flex-wrap gap-1 mt-4 font-sans">
                          {prod.certifications.slice(0, 2).map((cert) => (
                            <span
                              key={cert}
                              className="px-2 py-0.5 rounded-[4px] bg-[#F5F5EB] text-[#57534E] text-[9px] font-semibold border border-[#D6D3D1]"
                            >
                              {cert}
                            </span>
                          ))}
                          {prod.certifications.length > 2 && (
                            <span className="px-2 py-0.5 rounded-[4px] bg-[#F5F5EB] text-[#57534E] text-[9px] font-semibold">
                              +{prod.certifications.length - 2}
                            </span>
                          )}
                        </div>

                        {/* Capacity Metrics */}
                        <div className="border-t border-[#E7E5E4] pt-4 mt-5 flex items-center justify-between font-sans">
                          <div>
                            <p className="text-[9px] uppercase text-[#A8A29E] font-bold">Monthly Capacity</p>
                            <p className="text-xs font-bold text-[#1C1917]">
                              {prod.monthlyCapacity.toLocaleString()} {prod.unit}/month
                            </p>
                          </div>
                          <Link
                            href={`/product/${prod.id}`}
                            className="btn-primary btn-sm flex items-center justify-center font-bold"
                          >
                            REQUEST QUOTE
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              // Empty State
              <div className="p-12 text-center rounded-[12px] bg-white border border-[#D6D3D1] border-b-[3px] border-b-[#A8A29E] max-w-xl mx-auto space-y-4 font-sans">
                <HelpCircle className="w-12 h-12 text-[#A47148] mx-auto" />
                <h3 className="text-lg font-bold text-[#1C1917] font-serif">No Commodities Found</h3>
                <p className="text-xs text-[#57534E]">
                  Kami tidak dapat menemukan produk yang sesuai dengan kriteria filter Anda. Coba kurangi filter atau cari dengan istilah lain.
                </p>
                <button
                  onClick={handleResetFilters}
                  className="btn-primary cursor-pointer"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </main>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default function Directory() {
  return (
    <Suspense fallback={
      <div className="flex flex-col min-h-screen bg-[#FAFAF5]">
        <Navbar />
        <div className="flex-1 flex items-center justify-center font-sans">
          <div className="flex items-center gap-2">
            <span className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-[#166534]"></span>
            <span className="text-xs text-[#166534]">Loading Directory...</span>
          </div>
        </div>
        <Footer />
      </div>
    }>
      <DirectoryContent />
    </Suspense>
  );
}
