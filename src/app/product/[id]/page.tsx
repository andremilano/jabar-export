"use client";

import React, { useState, use } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useDemo } from "@/context/DemoContext";
import dynamic from "next/dynamic";

const ProductMap = dynamic(() => import("@/components/ProductMap"), { ssr: false });

import { ShieldCheck, ArrowLeft, Send, CheckCircle, MapPin, Calendar, HelpCircle, FileText, Check, Coffee, Scissors, Hammer, Building2, Calculator, Globe2 } from "lucide-react";

const destinationPorts = [
  { name: "Tokyo, Japan", code: "HND", ratePerUnit: 0.8, minFreight: 500, days: 12 },
  { name: "Hamburg, Germany", code: "HAM", ratePerUnit: 1.5, minFreight: 1200, days: 28 },
  { name: "Sydney, Australia", code: "SYD", ratePerUnit: 1.0, minFreight: 800, days: 16 },
  { name: "New York, USA", code: "NYC", ratePerUnit: 2.0, minFreight: 1600, days: 32 },
  { name: "Singapore, Singapore", code: "SIN", ratePerUnit: 0.4, minFreight: 300, days: 4 },
];

const currencies = [
  { code: "USD", symbol: "$", rate: 1.0 },
  { code: "EUR", symbol: "€", rate: 0.92 },
  { code: "JPY", symbol: "¥", rate: 155.0 },
  { code: "IDR", symbol: "Rp", rate: 16200.0 },
];

function CompanyLogo({ logo }: { logo?: string }) {
  const cls = "w-8 h-8 text-[#166534]";
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
  
  const [buyerName, setBuyerName] = useState("");
  const [buyerEmail, setBuyerEmail] = useState("");
  const [country, setCountry] = useState("");
  const [quantity, setQuantity] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [calcQty, setCalcQty] = useState(500);
  const [selectedPort, setSelectedPort] = useState(destinationPorts[0]);
  const [selectedCurrency, setSelectedCurrency] = useState(currencies[0]);

  const product = products.find((p) => p.id === productId);
  const company = product ? companies.find((c) => c.id === product.companyId) : null;

  if (!product) {
    return (
      <div className="flex flex-col min-h-screen bg-[#FAFAF5]">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center space-y-4 font-sans">
          <HelpCircle className="w-16 h-16 text-[#A8A29E]" />
          <h2 className="text-xl font-bold font-serif text-[#1C1917]">Product Not Found</h2>
          <Link href="/directory" className="btn-primary">
            Return to Directory
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  // Calculations
  const basePricePerUnit = product.basePrice || 5.0;
  const exWorksVal = calcQty * basePricePerUnit;
  
  // Local Logistics & Port Handling
  const localTransportVal = 150 + calcQty * 0.15;
  const exportDocsVal = 100;
  const localHandlingVal = 50;
  const fobVal = exWorksVal + localTransportVal + exportDocsVal + localHandlingVal;

  // Ocean Freight
  const rawFreight = calcQty * selectedPort.ratePerUnit;
  const oceanFreightVal = Math.max(rawFreight, selectedPort.minFreight);

  // Insurance
  const insuranceVal = (fobVal + oceanFreightVal) * 0.003;

  // CIF
  const cifVal = fobVal + oceanFreightVal + insuranceVal;

  const formatVal = (valInUsd: number) => {
    const val = valInUsd * selectedCurrency.rate;
    if (selectedCurrency.code === "IDR") {
      return `${selectedCurrency.symbol} ${Math.round(val).toLocaleString("id-ID")}`;
    } else if (selectedCurrency.code === "JPY") {
      return `${selectedCurrency.symbol}${Math.round(val).toLocaleString("ja-JP")}`;
    } else {
      return `${selectedCurrency.symbol}${val.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }
  };

  const handleUseInRfq = (totalCif: number, totalFob: number) => {
    setQuantity(calcQty.toString());
    setCountry(selectedPort.name.split(", ")[1] || "");
    const formattedFob = formatVal(totalFob);
    const formattedCif = formatVal(totalCif);
    setMessage(
      `Halo, kami tertarik untuk mengimpor komoditas ini.\n` +
      `Berdasarkan kalkulator ekspor B2B, berikut perkiraan kebutuhan kami:\n` +
      `- Kuantitas: ${calcQty.toLocaleString()} ${product.unit}\n` +
      `- Pelabuhan Tujuan: ${selectedPort.name}\n` +
      `- Estimasi Nilai FOB: ${formattedFob}\n` +
      `- Estimasi Nilai CIF: ${formattedCif}\n\n` +
      `Mohon berikan konfirmasi ketersediaan pasokan dan penawaran harga ekspor resmi Anda.`
    );
    setIsModalOpen(true);
  };

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
      setBuyerName("");
      setBuyerEmail("");
      setCountry("");
      setQuantity("");
      setMessage("");
    }, 2500);
  };

  return (
    <div className="bg-[#FAFAF5] min-h-screen flex flex-col">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1">
        {/* Back Link & Breadcrumbs */}
        <div className="flex items-center justify-between mb-8 text-xs font-medium text-[#57534E] font-sans">
          <Link href="/directory" className="inline-flex items-center gap-1.5 hover:text-[#166534] transition-colors">
            <ArrowLeft className="w-4 h-4 text-[#166534]" />
            <span>Back to Directory</span>
          </Link>
          <div className="flex items-center gap-1">
            <Link href="/" className="hover:underline">Home</Link>
            <span>/</span>
            <Link href="/directory" className="hover:underline">Directory</Link>
            <span>/</span>
            <span className="text-[#1C1917] truncate max-w-[200px] font-semibold">{product.name}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main Product Showcase (Left 2 cols) */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Main Details Card */}
            <div className="bg-white rounded-[12px] border border-[#E7E5E4] border-b-2 border-b-[#D6D3D1] overflow-hidden">
              <div className="h-[400px] relative overflow-hidden bg-[#F5F5EB]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-8 space-y-6">
                <div>
                  <span className="px-3 py-1 rounded-[4px] bg-[#F5F5EB] border border-[#D6D3D1] text-[#166534] text-[10px] font-extrabold uppercase tracking-wider inline-block mb-3 font-sans">
                    {product.category}
                  </span>
                  <h1 className="text-2xl md:text-3xl font-extrabold text-[#1C1917] leading-tight font-serif">
                    {product.name}
                  </h1>
                </div>

                <div className="border-t border-b border-[#E7E5E4] py-5 grid grid-cols-2 sm:grid-cols-3 gap-6 font-sans">
                  <div>
                    <p className="text-[10px] font-bold text-[#A8A29E] uppercase tracking-widest">Monthly Capacity</p>
                    <p className="text-base font-bold text-[#1C1917] mt-1">
                      {product.monthlyCapacity.toLocaleString()} {product.unit} / month
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-[#A8A29E] uppercase tracking-widest">Min Order Requirement</p>
                    <p className="text-base font-bold text-[#1C1917] mt-1">
                      Negotiable
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-[#A8A29E] uppercase tracking-widest">IncoTerm Options</p>
                    <p className="text-base font-bold text-[#1C1917] mt-1">
                      FOB / CIF
                    </p>
                  </div>
                </div>

                <div className="space-y-3 font-sans">
                  <h3 className="text-sm font-bold text-[#1C1917] font-serif">Product Description</h3>
                  <p className="text-xs md:text-sm text-[#57534E] leading-relaxed">
                    {product.description}
                  </p>
                </div>

                <div className="space-y-3 font-sans">
                  <h3 className="text-sm font-bold text-[#1C1917] font-serif">Product Specifications</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-[#F5F5EB] p-4 rounded-[8px] border border-[#D6D3D1]">
                    <div className="flex justify-between py-1.5 border-b border-[#D6D3D1]">
                      <span className="text-[#57534E] font-medium">Origin Location</span>
                      <span className="font-bold text-[#1C1917]">{company?.location.split(",")[0] || "West Java"}</span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-[#D6D3D1]">
                      <span className="text-[#57534E] font-medium">Standard Grade</span>
                      <span className="font-bold text-[#1C1917]">Export Premium</span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-[#D6D3D1]">
                      <span className="text-[#57534E] font-medium">Packaging Unit</span>
                      <span className="font-bold text-[#1C1917]">Export Standard Bag / Box</span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-[#D6D3D1]">
                      <span className="text-[#57534E] font-medium">Moisture / Spec</span>
                      <span className="font-bold text-[#1C1917]">SGS Quality Inspected</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Certifications and Compliance */}
            <div className="p-8 bg-white rounded-[12px] border border-[#E7E5E4] border-b-2 border-b-[#D6D3D1] space-y-6">
              <h3 className="text-sm font-bold text-[#1C1917] uppercase tracking-wider flex items-center gap-2 font-serif">
                <FileText className="w-5 h-5 text-[#166534]" />
                <span>Certifications & Compliance</span>
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-sans">
                {product.certifications.map((cert) => (
                  <div
                    key={cert}
                    className="p-4 rounded-[8px] bg-[#F5F5EB] border border-[#D6D3D1] flex items-center gap-3"
                  >
                    <div className="p-1.5 rounded-[4px] bg-[#166534]/10 text-[#166534]">
                      <Check className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-[#1C1917]">{cert}</p>
                      <p className="text-[10px] text-[#A8A29E] font-semibold mt-0.5">Verified</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Export Pricing Calculator */}
            <div className="p-8 bg-white rounded-[12px] border border-[#E7E5E4] border-b-2 border-b-[#D6D3D1] space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E7E5E4]">
                <div className="flex items-center gap-2">
                  <Calculator className="w-5 h-5 text-[#166534]" />
                  <h3 className="text-sm font-bold text-[#1C1917] uppercase tracking-wider font-serif">
                    B2B Export Cost Calculator
                  </h3>
                </div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[4px] bg-[#F5F5EB] border border-[#D6D3D1] text-[10px] font-bold text-[#166534] uppercase tracking-wider">
                  <Globe2 className="w-3.5 h-3.5" />
                  <span>Port of Tanjung Priok / Patimban Origin</span>
                </div>
              </div>

              <p className="text-xs text-[#57534E] leading-relaxed">
                Estimasikan rincian biaya dari pabrik (Ex-Works) hingga ke pelabuhan tujuan Anda (FOB & CIF) secara instan.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-sans">
                {/* Qty Input */}
                <div className="space-y-1">
                  <label className="input-label flex items-center justify-between">
                    <span>Quantity ({product.unit})</span>
                    <span className="text-[10px] text-[#A8A29E] font-medium">Base Price: {formatVal(basePricePerUnit)}</span>
                  </label>
                  <input
                    type="number"
                    min="10"
                    value={calcQty}
                    onChange={(e) => setCalcQty(Math.max(10, Number(e.target.value)))}
                    className="input-text"
                  />
                </div>

                {/* Port Select */}
                <div className="space-y-1">
                  <label className="input-label">Destination Port</label>
                  <select
                    value={selectedPort.name}
                    onChange={(e) => {
                      const port = destinationPorts.find((p) => p.name === e.target.value);
                      if (port) setSelectedPort(port);
                    }}
                    className="w-full text-xs p-3 bg-white border border-[#D6D3D1] rounded-[8px] outline-none cursor-pointer focus:border-[#166534] focus:ring-2 focus:ring-[#166534]/20"
                  >
                    {destinationPorts.map((port) => (
                      <option key={port.name} value={port.name}>
                        {port.name} ({port.code})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Currency Select */}
                <div className="space-y-1">
                  <label className="input-label">Display Currency</label>
                  <select
                    value={selectedCurrency.code}
                    onChange={(e) => {
                      const curr = currencies.find((c) => c.code === e.target.value);
                      if (curr) setSelectedCurrency(curr);
                    }}
                    className="w-full text-xs p-3 bg-white border border-[#D6D3D1] rounded-[8px] outline-none cursor-pointer focus:border-[#166534] focus:ring-2 focus:ring-[#166534]/20"
                  >
                    {currencies.map((curr) => (
                      <option key={curr.code} value={curr.code}>
                        {curr.code} ({curr.symbol})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Price Flow Chart (Visual Steps) */}
              <div className="bg-[#F5F5EB]/50 p-4 rounded-[8px] border border-[#D6D3D1] font-sans">
                <div className="text-[10px] font-bold text-[#A47148] uppercase tracking-wider mb-3">
                  Cost Accumulation Flow
                </div>
                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="p-3 bg-white rounded-[6px] border border-[#D6D3D1] flex flex-col justify-between">
                    <span className="text-[9px] uppercase tracking-wide text-[#57534E] font-medium">Ex-Works</span>
                    <span className="font-bold text-[#1C1917] mt-1.5 break-all">{formatVal(exWorksVal)}</span>
                  </div>
                  <div className="p-3 bg-white rounded-[6px] border border-[#166534] flex flex-col justify-between relative overflow-hidden">
                    <div className="absolute top-0 inset-x-0 h-1 bg-[#166534]"></div>
                    <span className="text-[9px] uppercase tracking-wide text-[#166534] font-bold">FOB (Pelabuhan)</span>
                    <span className="font-extrabold text-[#166534] mt-1.5 break-all">{formatVal(fobVal)}</span>
                  </div>
                  <div className="p-3 bg-[#166534] rounded-[6px] text-white flex flex-col justify-between">
                    <span className="text-[9px] uppercase tracking-wide text-[#86A873] font-bold">CIF (Tujuan)</span>
                    <span className="font-extrabold text-white mt-1.5 break-all">{formatVal(cifVal)}</span>
                  </div>
                </div>
              </div>

              {/* Breakdown Table */}
              <div className="border border-[#D6D3D1] rounded-[8px] overflow-hidden font-sans text-xs bg-white">
                <div className="bg-[#F5F5EB] px-4 py-2 text-[10px] font-bold text-[#1C1917] uppercase tracking-wider border-b border-[#D6D3D1]">
                  Cost Breakdown Estimation
                </div>
                <div className="divide-y divide-[#E7E5E4]">
                  {/* ExWorks */}
                  <div className="px-4 py-2.5 flex items-center justify-between">
                    <div>
                      <span className="font-semibold text-[#1C1917]">Commodity Cost (Ex-Works)</span>
                      <p className="text-[10px] text-[#57534E]">{calcQty.toLocaleString()} {product.unit} @ {formatVal(basePricePerUnit)}</p>
                    </div>
                    <span className="font-bold text-[#1C1917]">{formatVal(exWorksVal)}</span>
                  </div>

                  {/* Local transport */}
                  <div className="px-4 py-2.5 flex items-center justify-between">
                    <div>
                      <span className="font-semibold text-[#1C1917]">Local Transport & Document Fees</span>
                      <p className="text-[10px] text-[#57534E]">Trucking to port, customs clearance & THC</p>
                    </div>
                    <span className="font-bold text-[#1C1917]">{formatVal(localTransportVal + exportDocsVal + localHandlingVal)}</span>
                  </div>

                  {/* FOB */}
                  <div className="px-4 py-2.5 flex items-center justify-between bg-[#F5F5EB]/30 border-t-2 border-b-2 border-t-[#D6D3D1] border-b-[#D6D3D1]">
                    <span className="font-bold text-[#166534]">FOB Tanjung Priok / Patimban Est.</span>
                    <span className="font-extrabold text-[#166534]">{formatVal(fobVal)}</span>
                  </div>

                  {/* Freight */}
                  <div className="px-4 py-2.5 flex items-center justify-between">
                    <div>
                      <span className="font-semibold text-[#1C1917]">Ocean Freight Cost</span>
                      <p className="text-[10px] text-[#57534E]">To {selectedPort.name} (~{selectedPort.days} days)</p>
                    </div>
                    <span className="font-bold text-[#1C1917]">{formatVal(oceanFreightVal)}</span>
                  </div>

                  {/* Insurance */}
                  <div className="px-4 py-2.5 flex items-center justify-between">
                    <div>
                      <span className="font-semibold text-[#1C1917]">Marine Cargo Insurance</span>
                      <p className="text-[10px] text-[#57534E]">All-risk marine transit coverage (0.3%)</p>
                    </div>
                    <span className="font-bold text-[#1C1917]">{formatVal(insuranceVal)}</span>
                  </div>

                  {/* CIF */}
                  <div className="px-4 py-3 flex items-center justify-between bg-[#166534]/10 border-t-2 border-t-[#166534]/20">
                    <span className="font-bold text-[#1C1917] text-sm">Estimated CIF {selectedPort.code} Value</span>
                    <span className="font-extrabold text-[#166534] text-sm">{formatVal(cifVal)}</span>
                  </div>
                </div>
              </div>

              {/* Action use in RFQ */}
              <div className="flex justify-end pt-2">
                <button
                  onClick={() => handleUseInRfq(cifVal, fobVal)}
                  className="w-full sm:w-auto btn-secondary text-xs px-5 py-3 font-extrabold flex items-center justify-center gap-2 cursor-pointer rounded-[8px]"
                >
                  <Send className="w-4 h-4 text-[#166534]" />
                  <span>Use Calculations in RFQ Form</span>
                </button>
              </div>
            </div>

            {/* Production Location Map */}
            {company?.latitude && company?.longitude && (
              <div className="p-8 bg-white rounded-[12px] border border-[#E7E5E4] border-b-2 border-b-[#D6D3D1] space-y-6">
                <h3 className="text-sm font-bold text-[#1C1917] uppercase tracking-wider flex items-center gap-2 font-serif">
                  <MapPin className="w-5 h-5 text-[#166534]" />
                  <span>Production Facility Location</span>
                </h3>
                <p className="text-xs text-[#57534E] leading-relaxed font-sans">
                  Lokasi produksi dan operasional resmi dari <b>{company.name}</b> yang telah terdaftar di Jawa Barat.
                </p>
                <ProductMap 
                  lat={Number(company.latitude)} 
                  lng={Number(company.longitude)} 
                  companyName={company.name} 
                />
              </div>
            )}

          </div>

          {/* Supplier Info & RFQ Action Card (Right 1 col) */}
          <div className="space-y-8">
            <div className="p-6 bg-white rounded-[12px] border border-[#E7E5E4] border-b-[3px] border-b-[#A8A29E] space-y-6 sticky top-28 font-sans">
              
              {/* Exporter Details */}
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-[10px] font-extrabold uppercase tracking-widest text-[#A8A29E]">Supplier</p>
                    <h2 className="text-lg font-bold text-[#1C1917] mt-1 font-serif">
                      {product.companyName}
                    </h2>
                  </div>
                  <div className="p-2 rounded-[8px] bg-[#F5F5EB] text-[#166534]">
                    <CompanyLogo logo={company?.logo} />
                  </div>
                </div>

                {/* Verification tag */}
                {company?.isVerified ? (
                  <div className="flex items-center gap-2 px-3 py-2 rounded-[4px] bg-[#DCFCE7] border border-[#86EFAC] text-[11px] font-bold text-[#166534] uppercase tracking-wider">
                    <ShieldCheck className="w-4 h-4 fill-current" />
                    <span>Verified Export Partner</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 px-3 py-2 rounded-[4px] bg-[#F5F5EB] border border-[#D6D3D1] text-[11px] font-semibold text-[#57534E]">
                    <span>Curating Documents...</span>
                  </div>
                )}

                <p className="text-xs text-[#57534E] leading-relaxed">
                  {company?.description}
                </p>

                <div className="space-y-3 pt-2 text-xs border-t border-[#E7E5E4]">
                  <div className="flex items-center gap-2.5 text-[#57534E]">
                    <MapPin className="w-4 h-4 text-[#166534]" />
                    <span>{company?.location || "Jawa Barat, Indonesia"}</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-[#57534E]">
                    <Calendar className="w-4 h-4 text-[#166534]" />
                    <span>Established {company?.establishedYear}</span>
                  </div>
                </div>
              </div>

              {/* RFQ Trigger Button */}
              <button
                onClick={() => setIsModalOpen(true)}
                className="w-full btn-primary py-4 cursor-pointer"
              >
                <Send className="w-4 h-4 mr-2" />
                <span>Request a Quote</span>
              </button>

              <p className="text-[10px] text-center text-[#57534E] leading-normal">
                Sistem akan menyalurkan inquiries langsung kepada pimpinan koperasi dan mengirimkan notifikasi. UMKM akan merespons langsung via email Anda.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* RFQ Modal overlay */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1C1917]/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-[12px] border border-[#D6D3D1] border-b-[3px] border-b-[#A8A29E] w-full max-w-xl p-8 relative animate-in zoom-in-95 duration-200">
            
            {/* Close */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-6 right-6 p-1.5 rounded-[4px] hover:bg-[#F5F5EB] text-[#57534E] hover:text-[#1C1917] cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 rotate-90" />
            </button>

            {isSubmitted ? (
              // Success Screen
              <div className="py-12 text-center space-y-4 animate-in fade-in zoom-in-95 font-sans">
                <CheckCircle className="w-16 h-16 text-[#166534] mx-auto" />
                <h3 className="text-xl font-bold text-[#1C1917] font-serif">Quote Request Submitted</h3>
                <p className="text-xs text-[#57534E] max-w-sm mx-auto">
                  RFQ telah berhasil dikirimkan ke database lokal. Notifikasi email simulasi telah dikirimkan ke pemilik produk.
                </p>
                <div className="inline-flex items-center gap-1 text-[10px] font-bold text-[#A47148] uppercase tracking-widest bg-[#F5F5EB] px-3 py-1 rounded-[4px] border border-[#D6D3D1] animate-pulse">
                  <span>Routing to Partner Inbox...</span>
                </div>
              </div>
            ) : (
              // Form screen
              <form onSubmit={handleRfqSubmit} className="space-y-6">
                <div>
                  <span className="text-[10px] font-bold text-[#A47148] uppercase tracking-widest block mb-1 font-sans">
                    Send RFQ
                  </span>
                  <h3 className="text-lg font-bold text-[#1C1917] leading-tight font-serif">
                    Inquire: {product.name}
                  </h3>
                  <p className="text-xs text-[#57534E] mt-1 font-sans">
                    Supplier: <span className="font-semibold text-[#1C1917]">{product.companyName}</span>
                  </p>
                </div>

                <div className="space-y-4">
                  {/* Row 1 */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="input-label">Your Name</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. John Doe"
                        value={buyerName}
                        onChange={(e) => setBuyerName(e.target.value)}
                        className="input-text"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="input-label">Your Email</label>
                      <input
                        type="email"
                        required
                        placeholder="john@company.com"
                        value={buyerEmail}
                        onChange={(e) => setBuyerEmail(e.target.value)}
                        className="input-text"
                      />
                    </div>
                  </div>

                  {/* Row 2 */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="input-label">Destination Country</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Germany"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        className="input-text"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="input-label">Quantity Needed ({product.unit})</label>
                      <input
                        type="number"
                        required
                        min="1"
                        placeholder="Volume requirement"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        className="input-text"
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div className="space-y-1">
                    <label className="input-label">Negotiation / Details Message</label>
                    <textarea
                      rows={4}
                      placeholder="Discuss target price, shipping terms, sample requirements..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="input-text h-auto py-3"
                    ></textarea>
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn-primary w-full py-3.5 cursor-pointer font-extrabold uppercase tracking-wider"
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
