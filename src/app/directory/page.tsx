"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useDemo, Product } from "@/context/DemoContext";
import { Search, Filter, ShieldCheck, HelpCircle, X, ChevronDown, ListFilter } from "lucide-react";
import Link from "next/link";

function DirectoryContent() {
  const { products, companies } = useDemo();
  const searchParams = useSearchParams();
  const router = useRouter();

  // State filters
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedCerts, setSelectedCerts] = useState<string[]>([]);
  const [minCapacity, setMinCapacity] = useState<number>(0);
  const [onlyVerified, setOnlyVerified] = useState<boolean>(false);

  // Read URL search params on mount/change
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

  // Certifications list options
  const certOptions = ["Halal", "HACCP", "Fair Trade", "SVLK", "Organic Indonesia"];

  // Capacity range choices
  const capacityOptions = [
    { label: "All Capacities", value: 0 },
    { label: "Min 100 / month", value: 100 },
    { label: "Min 500 / month", value: 500 },
    { label: "Min 1,000 / month", value: 1000 },
    { label: "Min 5,000 / month", value: 5000 },
  ];

  // Helper to toggle certifications
  const handleCertToggle = (cert: string) => {
    if (selectedCerts.includes(cert)) {
      setSelectedCerts(selectedCerts.filter((c) => c !== cert));
    } else {
      setSelectedCerts([...selectedCerts, cert]);
    }
  };

  // Reset all filters
  const handleResetFilters = () => {
    setSearch("");
    setSelectedCategory("");
    setSelectedCerts([]);
    setMinCapacity(0);
    setOnlyVerified(false);
    router.push("/directory");
  };

  // Helper to check if company of product is verified
  const isCompanyVerified = (companyId: string) => {
    const company = companies.find((c) => c.id === companyId);
    return company ? company.isVerified : false;
  };

  // Filter products logic
  const filteredProducts = products.filter((prod) => {
    // 1. Search Query
    if (search) {
      const q = search.toLowerCase();
      const nameMatch = prod.name.toLowerCase().includes(q);
      const descMatch = prod.description.toLowerCase().includes(q);
      const compMatch = prod.companyName.toLowerCase().includes(q);
      if (!nameMatch && !descMatch && !compMatch) return false;
    }

    // 2. Category
    if (selectedCategory && prod.category !== selectedCategory) {
      return false;
    }

    // 3. Certifications (must match all selected certs)
    if (selectedCerts.length > 0) {
      const hasAllCerts = selectedCerts.every((cert) =>
        prod.certifications.some((c) => c.toLowerCase().includes(cert.toLowerCase()))
      );
      if (!hasAllCerts) return false;
    }

    // 4. Capacity
    if (minCapacity > 0 && prod.monthlyCapacity < minCapacity) {
      return false;
    }

    // 5. Only Verified
    if (onlyVerified && !isCompanyVerified(prod.companyId)) {
      return false;
    }

    return true;
  });

  return (
    <div className="flex flex-col min-h-screen bg-forest-50/20 dark:bg-forest-950/10">
      {/* Header Search Section */}
      <section className="bg-forest-950 text-white py-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <span className="text-xs font-bold text-gold-400 uppercase tracking-widest block mb-2">
              B2B Sourcing Directory
            </span>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-6">
              West Java Commodities Catalog
            </h1>
            
            {/* Embedded Search input inside banner */}
            <div className="relative max-w-xl shadow-lg rounded-xl overflow-hidden bg-white text-forest-950 flex items-center p-1 border border-forest-800">
              <Search className="w-5 h-5 text-forest-700 ml-3" />
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
                  className="p-1 rounded-full hover:bg-forest-50 mr-2 text-forest-700 hover:text-forest-950"
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
            <div className="p-6 rounded-2xl glass border border-forest-100/30 dark:border-forest-900/30 space-y-6">
              
              {/* Header filter */}
              <div className="flex items-center justify-between pb-4 border-b border-forest-100/10 dark:border-forest-900/20">
                <h3 className="text-sm font-bold flex items-center gap-2 text-forest-950 dark:text-white">
                  <Filter className="w-4 h-4 text-forest-600 dark:text-forest-700" />
                  <span>Filters</span>
                </h3>
                {(selectedCategory || selectedCerts.length > 0 || minCapacity > 0 || onlyVerified || search) && (
                  <button
                    onClick={handleResetFilters}
                    className="text-[11px] font-semibold text-gold-600 hover:text-gold-500 transition-colors"
                  >
                    Reset All
                  </button>
                )}
              </div>

              {/* Category Filter */}
              <div className="space-y-2">
                <p className="text-xs font-bold text-forest-700 uppercase tracking-widest">Category</p>
                <div className="space-y-1.5">
                  {["", "Kopi", "Teh", "Kriya", "Tekstil"].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                        selectedCategory === cat
                          ? "bg-forest-600 text-white font-semibold"
                          : "text-forest-700 hover:bg-forest-50 dark:text-forest-800 dark:hover:bg-forest-900/30"
                      }`}
                    >
                      {cat === "" ? "All Categories" : cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Capacity Filter */}
              <div className="space-y-2">
                <p className="text-xs font-bold text-forest-700 uppercase tracking-widest">Monthly Capacity</p>
                <div className="relative">
                  <select
                    value={minCapacity}
                    onChange={(e) => setMinCapacity(Number(e.target.value))}
                    className="w-full text-xs p-3 bg-white dark:bg-forest-950 border border-forest-100 dark:border-forest-900 rounded-xl outline-none focus:border-forest-500"
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
              <div className="space-y-2">
                <p className="text-xs font-bold text-forest-700 uppercase tracking-widest">Certifications</p>
                <div className="space-y-2">
                  {certOptions.map((cert) => {
                    const isChecked = selectedCerts.includes(cert);
                    return (
                      <label
                        key={cert}
                        className="flex items-center gap-2 text-xs text-forest-700 dark:text-forest-800 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => handleCertToggle(cert)}
                          className="rounded border-forest-200 dark:border-forest-800 text-forest-600 focus:ring-forest-500 w-4 h-4 cursor-pointer"
                        />
                        <span>{cert}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Verified Status Toggle */}
              <div className="pt-4 border-t border-forest-100/10 dark:border-forest-900/20">
                <label className="flex items-center gap-2 text-xs font-semibold text-forest-800 dark:text-forest-200 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={onlyVerified}
                    onChange={(e) => setOnlyVerified(e.target.checked)}
                    className="rounded border-forest-200 dark:border-forest-800 text-forest-600 focus:ring-forest-500 w-4 h-4 cursor-pointer"
                  />
                  <div className="flex items-center gap-1">
                    <ShieldCheck className="w-4 h-4 text-gold-500 fill-gold-500/10" />
                    <span>Only Verified Exporters</span>
                  </div>
                </label>
              </div>

            </div>
          </aside>

          {/* Directory Listings */}
          <main className="flex-1 space-y-6">
            {/* Top Toolbar */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 rounded-xl bg-white dark:bg-forest-900/10 border border-forest-100/20 dark:border-forest-900/20 gap-4 text-xs font-medium text-forest-600 dark:text-forest-800">
              <p>
                Showing <span className="font-bold text-forest-900 dark:text-white">{filteredProducts.length}</span> commodities
              </p>
              
              {/* Active Filter Tags */}
              <div className="flex flex-wrap gap-2">
                {selectedCategory && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-forest-100/50 text-forest-700 dark:bg-forest-900 dark:text-forest-800">
                    Category: {selectedCategory}
                    <button onClick={() => setSelectedCategory("")}>
                      <X className="w-3.5 h-3.5 hover:text-red-500" />
                    </button>
                  </span>
                )}
                {minCapacity > 0 && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-forest-100/50 text-forest-700 dark:bg-forest-900 dark:text-forest-800">
                    Capacity: {"\u2265"} {minCapacity.toLocaleString()}
                    <button onClick={() => setMinCapacity(0)}>
                      <X className="w-3.5 h-3.5 hover:text-red-500" />
                    </button>
                  </span>
                )}
                {selectedCerts.map((cert) => (
                  <span key={cert} className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-forest-100/50 text-forest-700 dark:bg-forest-900 dark:text-forest-800">
                    Cert: {cert}
                    <button onClick={() => handleCertToggle(cert)}>
                      <X className="w-3.5 h-3.5 hover:text-red-500" />
                    </button>
                  </span>
                ))}
                {onlyVerified && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-forest-100/50 text-forest-700 dark:bg-forest-900 dark:text-forest-800">
                    Verified Exporters
                    <button onClick={() => setOnlyVerified(false)}>
                      <X className="w-3.5 h-3.5 hover:text-red-500" />
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
                      className="group flex flex-col bg-white dark:bg-forest-900/10 rounded-2xl border border-forest-100/20 dark:border-forest-900/20 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
                    >
                      {/* Image */}
                      <div className="h-48 relative overflow-hidden bg-forest-100/50">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={prod.imageUrl}
                          alt={prod.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-3 left-3 flex flex-col gap-1">
                          <span className="px-2.5 py-0.5 rounded-lg text-[9px] font-extrabold uppercase bg-forest-950/80 text-white backdrop-blur-sm">
                            {prod.category}
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-5 flex flex-col flex-1">
                        {/* Company & Verification Status */}
                        <div className="flex items-center gap-1.5 mb-1.5">
                          <span className="text-xs font-semibold text-forest-800 hover:underline">
                            {prod.companyName}
                          </span>
                          {verified && (
                            <span className="inline-flex items-center p-0.5 rounded-full bg-gold-400/10 text-gold-500" title="Verified exporter profile">
                              <ShieldCheck className="w-3.5 h-3.5 fill-current" />
                            </span>
                          )}
                        </div>

                        {/* Title */}
                        <h3 className="text-sm font-bold text-forest-950 dark:text-white line-clamp-1 mb-2 hover:text-gold-500">
                          <Link href={`/product/${prod.id}`}>{prod.name}</Link>
                        </h3>

                        {/* Description */}
                        <p className="text-xs text-forest-800 dark:text-forest-800 line-clamp-2 leading-relaxed flex-1">
                          {prod.description}
                        </p>

                        {/* Badges/Certifications */}
                        <div className="flex flex-wrap gap-1 mt-4">
                          {prod.certifications.slice(0, 2).map((cert) => (
                            <span
                              key={cert}
                              className="px-2 py-0.5 rounded bg-forest-50 dark:bg-forest-900/50 text-forest-600 dark:text-forest-800 text-[9px] font-semibold border border-forest-100/30 dark:border-forest-900/30"
                            >
                              {cert}
                            </span>
                          ))}
                          {prod.certifications.length > 2 && (
                            <span className="px-2 py-0.5 rounded bg-forest-50 dark:bg-forest-900/50 text-forest-600 dark:text-forest-800 text-[9px] font-semibold">
                              +{prod.certifications.length - 2}
                            </span>
                          )}
                        </div>

                        {/* Capacity Metrics */}
                        <div className="border-t border-forest-100/10 dark:border-forest-900/20 pt-4 mt-5 flex items-center justify-between">
                          <div>
                            <p className="text-[9px] uppercase text-forest-700 font-bold">Monthly Capacity</p>
                            <p className="text-xs font-bold text-forest-900 dark:text-white">
                              {prod.monthlyCapacity.toLocaleString()} {prod.unit}/month
                            </p>
                          </div>
                          <Link
                            href={`/product/${prod.id}`}
                            className="px-4.5 py-2 rounded-lg bg-forest-50 hover:bg-forest-600 dark:bg-forest-900/50 text-forest-600 dark:text-forest-800 hover:text-white dark:hover:bg-forest-600 text-[10px] font-extrabold tracking-wider transition-all"
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
              <div className="p-12 text-center rounded-2xl glass border border-forest-100/20 dark:border-forest-900/20 max-w-xl mx-auto space-y-4">
                <HelpCircle className="w-12 h-12 text-forest-800 mx-auto" />
                <h3 className="text-lg font-bold text-forest-950 dark:text-white">No Commodities Found</h3>
                <p className="text-xs text-forest-600 dark:text-forest-700">
                  Kami tidak dapat menemukan produk yang sesuai dengan kriteria filter Anda. Coba kurangi filter atau cari dengan istilah lain.
                </p>
                <button
                  onClick={handleResetFilters}
                  className="px-6 py-2.5 rounded-xl bg-forest-600 hover:bg-forest-700 text-white text-xs font-bold transition-all shadow-md"
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
      <div className="flex flex-col min-h-screen bg-forest-50/20">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="flex items-center gap-2">
            <span className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-forest-600"></span>
            <span className="text-xs text-forest-600">Loading Directory...</span>
          </div>
        </div>
        <Footer />
      </div>
    }>
      <DirectoryContent />
    </Suspense>
  );
}
