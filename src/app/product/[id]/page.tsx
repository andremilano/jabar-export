"use client";

import React, { useState, use } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useDemo } from "@/context/DemoContext";
import { ShieldCheck, ArrowLeft, Send, CheckCircle, MapPin, Calendar, HelpCircle, FileText, Check, Coffee, Scissors, Hammer, Building2 } from "lucide-react";

function CompanyLogo({ logo }: { logo?: string }) {
  const cls = "w-8 h-8";
  if (logo === "coffee") return <Coffee className={cls} />;
  if (logo === "textile") return <Scissors className={cls} />;
  if (logo === "craft") return <Hammer className={cls} />;
  return <Building2 className={cls} />;
}

export default function ProductDetail({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const productId = resolvedParams.id;

  const { products, companies, addInquiry } = useDemo();
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // RFQ Form state
  const [buyerName, setBuyerName] = useState("");
  const [buyerEmail, setBuyerEmail] = useState("");
  const [country, setCountry] = useState("");
  const [quantity, setQuantity] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Find product and company
  const product = products.find((p) => p.id === productId);
  const company = product ? companies.find((c) => c.id === product.companyId) : null;

  if (!product) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center space-y-4">
          <HelpCircle className="w-16 h-16 text-forest-300" />
          <h2 className="text-xl font-bold">Product Not Found</h2>
          <Link href="/directory" className="px-6 py-2.5 rounded-xl bg-forest-600 text-white text-xs font-bold shadow-md">
            Return to Directory
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const handleRfqSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!buyerName || !buyerEmail || !country || !quantity) return;

    addInquiry({
      productId: product.id,
      buyerName,
      buyerEmail,
      country,
      quantity: Number(quantity),
      message,
    });

    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setIsModalOpen(false);
      // Reset form
      setBuyerName("");
      setBuyerEmail("");
      setCountry("");
      setQuantity("");
      setMessage("");
    }, 2500);
  };

  return (
    <div className="bg-forest-50/10 dark:bg-forest-950/10 min-h-screen flex flex-col">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1">
        {/* Back Link & Breadcrumbs */}
        <div className="flex items-center justify-between mb-8 text-xs font-medium text-forest-700">
          <Link href="/directory" className="inline-flex items-center gap-1.5 hover:text-gold-500 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Directory</span>
          </Link>
          <div className="flex items-center gap-1">
            <Link href="/" className="hover:underline">Home</Link>
            <span>/</span>
            <Link href="/directory" className="hover:underline">Directory</Link>
            <span>/</span>
            <span className="text-forest-800 dark:text-forest-200 truncate max-w-[200px]">{product.name}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main Product Showcase (Left 2 cols) */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Main Details Card */}
            <div className="bg-white dark:bg-forest-900/10 rounded-3xl border border-forest-100/20 dark:border-forest-900/20 overflow-hidden shadow-sm">
              <div className="h-[400px] relative overflow-hidden bg-forest-100/30">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-8 space-y-6">
                <div>
                  <span className="px-3 py-1 rounded-full bg-forest-100/50 dark:bg-forest-900 text-forest-700 dark:text-forest-300 text-[10px] font-extrabold uppercase tracking-wider inline-block mb-3">
                    {product.category}
                  </span>
                  <h1 className="text-2xl md:text-3xl font-extrabold text-forest-950 dark:text-white leading-tight">
                    {product.name}
                  </h1>
                </div>

                <div className="border-t border-b border-forest-100/10 dark:border-forest-900/20 py-5 grid grid-cols-2 sm:grid-cols-3 gap-6">
                  <div>
                    <p className="text-[10px] font-bold text-forest-700 uppercase tracking-widest">Monthly Capacity</p>
                    <p className="text-base font-bold text-forest-900 dark:text-white mt-1">
                      {product.monthlyCapacity.toLocaleString()} {product.unit} / month
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-forest-700 uppercase tracking-widest">Min Order Requirement</p>
                    <p className="text-base font-bold text-forest-900 dark:text-white mt-1">
                      Negotiable
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-forest-700 uppercase tracking-widest">IncoTerm Options</p>
                    <p className="text-base font-bold text-forest-900 dark:text-white mt-1">
                      FOB / CIF
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="text-sm font-bold text-forest-950 dark:text-white">Product Description</h3>
                  <p className="text-xs md:text-sm text-forest-800 dark:text-forest-200 leading-relaxed">
                    {product.description}
                  </p>
                </div>

                <div className="space-y-3">
                  <h3 className="text-sm font-bold text-forest-950 dark:text-white">Product Specifications</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-forest-50/20 dark:bg-forest-950/20 p-4 rounded-2xl border border-forest-100/10 dark:border-forest-900/10">
                    <div className="flex justify-between py-1.5 border-b border-forest-100/10 dark:border-forest-900/10">
                      <span className="text-forest-700 font-medium">Origin Location</span>
                      <span className="font-bold text-forest-800 dark:text-forest-200">{company?.location.split(",")[0] || "West Java"}</span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-forest-100/10 dark:border-forest-900/10">
                      <span className="text-forest-700 font-medium">Standard Grade</span>
                      <span className="font-bold text-forest-800 dark:text-forest-200">Export Premium</span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-forest-100/10 dark:border-forest-900/10">
                      <span className="text-forest-700 font-medium">Packaging Unit</span>
                      <span className="font-bold text-forest-800 dark:text-forest-200">Export Standard Bag / Box</span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-forest-100/10 dark:border-forest-900/10">
                      <span className="text-forest-700 font-medium">Moisture / Spec</span>
                      <span className="font-bold text-forest-800 dark:text-forest-200">SGS Quality Inspected</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Certifications and Compliance */}
            <div className="p-8 bg-white dark:bg-forest-900/10 rounded-3xl border border-forest-100/20 dark:border-forest-900/20 shadow-sm space-y-6">
              <h3 className="text-sm font-bold text-forest-950 dark:text-white uppercase tracking-wider flex items-center gap-2">
                <FileText className="w-5 h-5 text-gold-500" />
                <span>Certifications & Compliance</span>
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {product.certifications.map((cert) => (
                  <div
                    key={cert}
                    className="p-4 rounded-2xl bg-forest-50/50 dark:bg-forest-900/50 border border-forest-100/30 dark:border-forest-900/30 flex items-center gap-3"
                  >
                    <div className="p-1.5 rounded-lg bg-gold-400/10 text-gold-500">
                      <Check className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-forest-900 dark:text-white">{cert}</p>
                      <p className="text-[10px] text-forest-700 font-semibold mt-0.5">Verified</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Supplier Info & RFQ Action Card (Right 1 col) */}
          <div className="space-y-8">
            <div className="p-6 bg-white dark:bg-forest-900/10 rounded-3xl border border-forest-100/20 dark:border-forest-900/20 shadow-sm space-y-6 sticky top-28">
              
              {/* Exporter Details */}
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-[10px] font-extrabold uppercase tracking-widest text-forest-700">Supplier</p>
                    <h2 className="text-lg font-bold text-forest-950 dark:text-white mt-1">
                      {product.companyName}
                    </h2>
                  </div>
                  <div className="p-2 rounded-2xl bg-forest-100 dark:bg-forest-900 text-forest-700 dark:text-forest-300">
                    <CompanyLogo logo={company?.logo} />
                  </div>
                </div>

                {/* Verification tag */}
                {company?.isVerified ? (
                  <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-gold-400/10 border border-gold-400/30 text-[11px] font-extrabold text-gold-600 uppercase tracking-wider">
                    <ShieldCheck className="w-4 h-4 fill-current" />
                    <span>Verified Export Partner</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-forest-50 border border-forest-100 text-[11px] font-semibold text-forest-800">
                    <span>Curating Documents...</span>
                  </div>
                )}

                <p className="text-xs text-forest-800 dark:text-forest-200 leading-relaxed">
                  {company?.description}
                </p>

                <div className="space-y-3 pt-2 text-xs border-t border-forest-100/10 dark:border-forest-900/20">
                  <div className="flex items-center gap-2.5 text-forest-800 dark:text-forest-200">
                    <MapPin className="w-4 h-4 text-forest-700" />
                    <span>{company?.location || "Jawa Barat, Indonesia"}</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-forest-800 dark:text-forest-200">
                    <Calendar className="w-4 h-4 text-forest-700" />
                    <span>Established {company?.establishedYear}</span>
                  </div>
                </div>
              </div>

              {/* RFQ Trigger Button */}
              <button
                onClick={() => setIsModalOpen(true)}
                className="w-full py-4 rounded-xl bg-forest-600 hover:bg-forest-700 text-white font-extrabold text-xs tracking-wider uppercase transition-all shadow-md shadow-forest-900/10 hover:shadow-forest-950/20 flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Request a Quote</span>
              </button>

              <p className="text-[10px] text-center text-forest-700 leading-normal">
                Sistem akan menyalurkan inquiries langsung kepada pimpinan koperasi dan mengirimkan notifikasi. UMKM akan merespons langsung via email Anda.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* RFQ Modal overlay */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-forest-950 rounded-3xl border border-forest-100/20 dark:border-forest-900/30 w-full max-w-xl p-8 relative shadow-2xl animate-in zoom-in-95 duration-200">
            
            {/* Close */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-6 right-6 p-1.5 rounded-full hover:bg-forest-50 dark:hover:bg-forest-900 text-forest-400 hover:text-forest-950 dark:hover:text-white"
            >
              <ArrowLeft className="w-4 h-4 rotate-90" />
            </button>

            {isSubmitted ? (
              // Success Screen
              <div className="py-12 text-center space-y-4 animate-in fade-in zoom-in-95">
                <CheckCircle className="w-16 h-16 text-forest-500 mx-auto" />
                <h3 className="text-xl font-bold text-forest-950 dark:text-white">Quote Request Submitted</h3>
                <p className="text-xs text-forest-800 max-w-sm mx-auto">
                  RFQ telah berhasil dikirimkan ke database lokal. Notifikasi email simulasi telah dikirimkan ke pemilik produk.
                </p>
                <div className="inline-flex items-center gap-1 text-[10px] font-bold text-gold-500 uppercase tracking-widest bg-gold-500/5 px-3 py-1 rounded-full animate-pulse">
                  <span>Routing to Partner Inbox...</span>
                </div>
              </div>
            ) : (
              // Form screen
              <form onSubmit={handleRfqSubmit} className="space-y-6">
                <div>
                  <span className="text-[10px] font-bold text-gold-500 uppercase tracking-widest block mb-1">
                    Send RFQ
                  </span>
                  <h3 className="text-lg font-bold text-forest-950 dark:text-white leading-tight">
                    Inquire: {product.name}
                  </h3>
                  <p className="text-xs text-forest-700 mt-1">
                    Supplier: <span className="font-semibold text-forest-900">{product.companyName}</span>
                  </p>
                </div>

                <div className="space-y-4">
                  {/* Row 1 */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-forest-700 uppercase tracking-wider">Your Name</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. John Doe"
                        value={buyerName}
                        onChange={(e) => setBuyerName(e.target.value)}
                        className="w-full text-xs p-3 bg-forest-50/50 dark:bg-forest-900 border border-forest-100 dark:border-forest-900 rounded-xl outline-none focus:border-forest-500"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-forest-700 uppercase tracking-wider">Your Email</label>
                      <input
                        type="email"
                        required
                        placeholder="john@company.com"
                        value={buyerEmail}
                        onChange={(e) => setBuyerEmail(e.target.value)}
                        className="w-full text-xs p-3 bg-forest-50/50 dark:bg-forest-900 border border-forest-100 dark:border-forest-900 rounded-xl outline-none focus:border-forest-500"
                      />
                    </div>
                  </div>

                  {/* Row 2 */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-forest-700 uppercase tracking-wider">Destination Country</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Germany"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        className="w-full text-xs p-3 bg-forest-50/50 dark:bg-forest-900 border border-forest-100 dark:border-forest-900 rounded-xl outline-none focus:border-forest-500"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-forest-700 uppercase tracking-wider">Quantity Needed ({product.unit})</label>
                      <input
                        type="number"
                        required
                        min="1"
                        placeholder="Volume requirement"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        className="w-full text-xs p-3 bg-forest-50/50 dark:bg-forest-900 border border-forest-100 dark:border-forest-900 rounded-xl outline-none focus:border-forest-500"
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-forest-700 uppercase tracking-wider">Negotiation / Details Message</label>
                    <textarea
                      rows={4}
                      placeholder="Discuss target price, shipping terms, sample requirements..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full text-xs p-3 bg-forest-50/50 dark:bg-forest-900 border border-forest-100 dark:border-forest-900 rounded-xl outline-none focus:border-forest-500"
                    ></textarea>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-forest-600 hover:bg-forest-700 text-white font-extrabold text-xs tracking-wider uppercase transition-all shadow-md"
                >
                  Send Inquiry Request
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
