"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useDemo, Inquiry } from "@/context/DemoContext";
import { Mail, Globe, Send, User, ChevronRight, CornerDownRight, Check, X, FileText } from "lucide-react";

export default function DashboardInquiries() {
  const { inquiries, companies } = useDemo();

  const myCompany = companies.find((c) => c.id === "comp-1") || companies[0];
  const myInquiries = inquiries.filter((inq) => inq.companyId === myCompany.id);

  // Master-Detail State: default to first inquiry if available
  const [selectedInquiryId, setSelectedInquiryId] = useState<string | null>(
    myInquiries.length > 0 ? myInquiries[0].id : null
  );

  const selectedInquiry = myInquiries.find((inq) => inq.id === selectedInquiryId);

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-forest-950 dark:text-white">Inquiries Inbox</h1>
        <p className="text-xs text-forest-700 mt-1">
          Review RFQs received from global buyers. Negotitations are conducted via email directly.
        </p>
      </div>

      {myInquiries.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Master Panel: Inquiries List (1 col) */}
          <div className="lg:col-span-1 space-y-3 max-h-[70vh] overflow-y-auto pr-2">
            {myInquiries.map((inq) => {
              const isActive = inq.id === selectedInquiryId;
              return (
                <button
                  key={inq.id}
                  onClick={() => setSelectedInquiryId(inq.id)}
                  className={`w-full text-left p-4 rounded-2xl border transition-all duration-200 flex items-start justify-between gap-3 text-xs ${
                    isActive
                      ? "bg-forest-600 border-forest-600 text-white shadow-md"
                      : "bg-white dark:bg-forest-900/10 border-forest-100/20 dark:border-forest-900/20 text-forest-600 dark:text-forest-800 hover:bg-forest-50 dark:hover:bg-forest-900/30"
                  }`}
                >
                  <div className="space-y-1.5 flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className={`font-bold truncate ${isActive ? "text-white" : "text-forest-900 dark:text-white"}`}>
                        {inq.buyerName}
                      </span>
                      <span className="text-[10px] opacity-60 shrink-0">({inq.country})</span>
                    </div>
                    <p className={`line-clamp-1 truncate ${isActive ? "text-forest-100" : "text-forest-800"}`}>
                      Product: <span className="font-semibold">{inq.productName}</span>
                    </p>
                    <p className={`line-clamp-1 text-[11px] leading-relaxed ${isActive ? "text-forest-200" : "text-forest-700"}`}>
                      {inq.message}
                    </p>
                  </div>
                  <ChevronRight className={`w-4.5 h-4.5 shrink-0 self-center ${isActive ? "text-white" : "text-forest-800"}`} />
                </button>
              );
            })}
          </div>

          {/* Detail Panel: Inquiry content (2 cols) */}
          <div className="lg:col-span-2">
            {selectedInquiry ? (
              <div className="bg-white dark:bg-forest-900/10 rounded-3xl border border-forest-100/20 dark:border-forest-900/20 shadow-sm p-8 space-y-6">
                
                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-forest-100/10 dark:border-forest-900/20">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-gold-500 uppercase tracking-widest block">
                      RFQ Details
                    </span>
                    <h2 className="text-lg font-bold text-forest-950 dark:text-white">
                      Request for Quote: {selectedInquiry.productName}
                    </h2>
                    <p className="text-xs text-forest-700">
                      Received: {new Date(selectedInquiry.createdAt).toLocaleString()}
                    </p>
                  </div>

                  <span className="px-3 py-1 rounded-xl bg-forest-500/10 text-forest-600 dark:text-forest-700 text-xs font-bold border border-forest-500/20">
                    Volume: {selectedInquiry.quantity.toLocaleString()} units
                  </span>
                </div>

                {/* Buyer Credentials */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-5 rounded-2xl bg-forest-50/30 dark:bg-forest-950/20 border border-forest-100/10 dark:border-forest-900/10">
                  <div className="space-y-3">
                    <p className="text-[10px] font-bold text-forest-700 uppercase tracking-widest">Buyer Info</p>
                    <div className="flex items-center gap-2.5 text-xs">
                      <User className="w-4 h-4 text-forest-700" />
                      <span className="font-bold text-forest-900 dark:text-white">{selectedInquiry.buyerName}</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-xs text-forest-600 dark:text-forest-800">
                      <Mail className="w-4 h-4 text-forest-700" />
                      <a href={`mailto:${selectedInquiry.buyerEmail}`} className="hover:underline text-forest-600 dark:text-forest-700 font-semibold">
                        {selectedInquiry.buyerEmail}
                      </a>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <p className="text-[10px] font-bold text-forest-700 uppercase tracking-widest">Shipment Destination</p>
                    <div className="flex items-center gap-2.5 text-xs">
                      <Globe className="w-4 h-4 text-forest-700" />
                      <span className="font-bold text-forest-900 dark:text-white">{selectedInquiry.country}</span>
                    </div>
                    <p className="text-[10px] text-forest-700 font-medium">Standard Logistics terms: FOB Port Tanjung Priok</p>
                  </div>
                </div>

                {/* Negotiation message */}
                <div className="space-y-3">
                  <p className="text-[10px] font-bold text-forest-700 uppercase tracking-widest">Negotitation Message</p>
                  <div className="p-5 rounded-2xl border border-forest-100/20 dark:border-forest-900/20 bg-white dark:bg-forest-950 text-xs md:text-sm text-forest-700 dark:text-forest-800 leading-relaxed italic">
                    &quot;{selectedInquiry.message}&quot;
                  </div>
                </div>

                {/* RFQ Lifecycle / Timeline visual */}
                <div className="space-y-3 pt-2">
                  <p className="text-[10px] font-bold text-forest-700 uppercase tracking-widest">Process Timeline</p>
                  <div className="flex items-center text-xs">
                    <div className="flex items-center text-forest-600">
                      <Check className="w-4 h-4 bg-forest-600/10 rounded-full p-0.5" />
                      <span className="font-bold ml-1.5">Submitted</span>
                    </div>
                    <span className="flex-1 border-t border-dashed border-forest-200/50 mx-4"></span>
                    <div className="flex items-center text-forest-600">
                      <Check className="w-4 h-4 bg-forest-600/10 rounded-full p-0.5" />
                      <span className="font-bold ml-1.5">Received</span>
                    </div>
                    <span className="flex-1 border-t border-dashed border-forest-200/50 mx-4"></span>
                    <div className="flex items-center text-gold-500 font-bold">
                      <span className="animate-pulse relative inline-flex rounded-full h-2 w-2 bg-gold-500 mr-1.5"></span>
                      <span>Negotiating</span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="pt-6 border-t border-forest-100/10 dark:border-forest-900/20 flex flex-wrap gap-3">
                  <a
                    href={`mailto:${selectedInquiry.buyerEmail}?subject=Re: Jabar Export Hub Inquiry for ${selectedInquiry.productName}`}
                    className="flex-1 min-w-[150px] py-3.5 rounded-xl bg-forest-600 hover:bg-forest-700 text-white font-extrabold text-xs tracking-wider uppercase text-center transition-all shadow-md flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Reply via Direct Email</span>
                  </a>
                  <button
                    onClick={() => alert("RFQ accepted. You will receive draft deal templates in your actual email.")}
                    className="px-5 py-3.5 rounded-xl border border-forest-200 hover:bg-forest-50 dark:border-forest-800 text-xs font-bold text-forest-700 dark:text-forest-800 flex items-center gap-1.5 transition-all"
                  >
                    <Check className="w-4 h-4 text-forest-800" />
                    <span>Accept Quote</span>
                  </button>
                  <button
                    onClick={() => alert("Inquiry declined.")}
                    className="px-5 py-3.5 rounded-xl border border-red-200 hover:bg-red-500/5 text-xs font-bold text-red-500 flex items-center gap-1.5 transition-all"
                  >
                    <X className="w-4 h-4" />
                    <span>Ignore</span>
                  </button>
                </div>

              </div>
            ) : (
              <div className="bg-white dark:bg-forest-900/10 rounded-3xl border border-forest-100/20 dark:border-forest-900/20 shadow-sm p-12 text-center text-forest-700">
                <FileText className="w-12 h-12 text-forest-800 mx-auto mb-2" />
                <p className="font-bold">No Inquiry Selected</p>
                <p className="text-xs text-forest-700 mt-1">Select an inquiry from the left pane to view details.</p>
              </div>
            )}
          </div>
        </div>
      ) : (
        // Inbox Empty state
        <div className="p-12 text-center rounded-2xl glass border border-forest-100/20 dark:border-forest-900/20 max-w-xl mx-auto space-y-4">
          <Mail className="w-12 h-12 text-forest-800 mx-auto" />
          <h3 className="text-lg font-bold text-forest-950 dark:text-white">Inboxes are Clean</h3>
          <p className="text-xs text-forest-600 dark:text-forest-700">
            Koperasi Anda belum menerima inquiry baru dari buyer luar negeri. Anda bisa merangsang data RFQ baru dengan membuka detail produk publik Anda dan mengirim form penawaran secara instan.
          </p>
          <Link
            href="/directory"
            className="inline-block px-6 py-2.5 rounded-xl bg-forest-600 hover:bg-forest-700 text-white text-xs font-bold transition-all shadow-md"
          >
            Visit Public Directory Catalog
          </Link>
        </div>
      )}
    </div>
  );
}
