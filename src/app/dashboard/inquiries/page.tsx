"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useDemo } from "@/context/DemoContext";
import { Mail, Globe, Send, User, ChevronRight, Check, X, FileText } from "lucide-react";

export default function DashboardInquiries() {
  const { inquiries, companies, currentUser } = useDemo();

  const myCompany = companies.find((c) => c.id === currentUser?.companyId) || companies[0];
  const myInquiries = inquiries.filter((inq) => inq.companyId === myCompany.id);

  // Master-Detail State: default to first inquiry if available
  const [selectedInquiryId, setSelectedInquiryId] = useState<string | null>(
    myInquiries.length > 0 ? myInquiries[0].id : null
  );

  const selectedInquiry = myInquiries.find((inq) => inq.id === selectedInquiryId);

  return (
    <div className="space-y-8 animate-in fade-in duration-300 font-sans">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-[#1C1917] font-serif">Inquiries Inbox</h1>
        <p className="text-xs text-[#57534E] mt-1">
          Review RFQs received from global buyers. Negotiations are conducted via email directly.
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
                  className={`w-full text-left p-4 rounded-[12px] border transition-all duration-200 flex items-start justify-between gap-3 text-xs cursor-pointer shadow-none ${
                    isActive
                      ? "bg-[#166534] border-[#166534] text-white border-l-4 border-l-[#A47148]"
                      : "bg-white border border-[#E7E5E4] border-b-2 border-b-[#D6D3D1] text-[#57534E] hover:border-[#A8A29E]"
                  }`}
                >
                  <div className="space-y-1.5 flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className={`font-bold truncate ${isActive ? "text-white" : "text-[#1C1917]"}`}>
                        {inq.buyerName}
                      </span>
                      <span className={`text-[10px] shrink-0 ${isActive ? "text-white/80" : "text-[#A8A29E]"}`}>
                        ({inq.country})
                      </span>
                    </div>
                    <p className={`line-clamp-1 truncate ${isActive ? "text-white/90" : "text-[#1C1917] font-semibold"}`}>
                      Product: <span>{inq.productName}</span>
                    </p>
                    <p className={`line-clamp-1 text-[11px] leading-relaxed ${isActive ? "text-white/80" : "text-[#57534E]"}`}>
                      {inq.message}
                    </p>
                  </div>
                  <ChevronRight className={`w-4.5 h-4.5 shrink-0 self-center ${isActive ? "text-white" : "text-[#166534]"}`} />
                </button>
              );
            })}
          </div>

          {/* Detail Panel: Inquiry content (2 cols) */}
          <div className="lg:col-span-2">
            {selectedInquiry ? (
              <div className="bg-white rounded-[12px] border border-[#E7E5E4] border-b-2 border-b-[#D6D3D1] p-8 space-y-6 shadow-none">
                
                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-[#E7E5E4]">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-[#A47148] uppercase tracking-widest block font-sans">
                      RFQ Details
                    </span>
                    <h2 className="text-lg font-bold text-[#1C1917] font-serif">
                      Request for Quote: {selectedInquiry.productName}
                    </h2>
                    <p className="text-xs text-[#A8A29E] font-sans">
                      Received: {new Date(selectedInquiry.createdAt).toLocaleString()}
                    </p>
                  </div>

                  <span className="px-3 py-1 rounded-[4px] bg-[#F5F5EB] border border-[#D6D3D1] text-[#166534] text-xs font-bold font-sans">
                    Volume: {selectedInquiry.quantity.toLocaleString()} units
                  </span>
                </div>

                {/* Buyer Credentials */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-5 rounded-[8px] bg-[#F5F5EB] border border-[#D6D3D1] font-sans">
                  <div className="space-y-3">
                    <p className="text-[10px] font-bold text-[#A47148] uppercase tracking-widest">Buyer Info</p>
                    <div className="flex items-center gap-2.5 text-xs">
                      <User className="w-4 h-4 text-[#166534]" />
                      <span className="font-bold text-[#1C1917]">{selectedInquiry.buyerName}</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-xs text-[#57534E]">
                      <Mail className="w-4 h-4 text-[#166534]" />
                      <a href={`mailto:${selectedInquiry.buyerEmail}`} className="hover:underline text-[#166534] font-semibold">
                        {selectedInquiry.buyerEmail}
                      </a>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <p className="text-[10px] font-bold text-[#A47148] uppercase tracking-widest">Shipment Destination</p>
                    <div className="flex items-center gap-2.5 text-xs">
                      <Globe className="w-4 h-4 text-[#166534]" />
                      <span className="font-bold text-[#1C1917]">{selectedInquiry.country}</span>
                    </div>
                    <p className="text-[10px] text-[#57534E] font-medium">Standard Logistics terms: FOB Port Tanjung Priok</p>
                  </div>
                </div>

                {/* Negotiation message */}
                <div className="space-y-3 font-sans">
                  <p className="text-[10px] font-bold text-[#A47148] uppercase tracking-widest">Negotiation Message</p>
                  <div className="p-5 rounded-[8px] border border-[#D6D3D1] bg-white text-xs md:text-sm text-[#1C1917] leading-relaxed italic">
                    &quot;{selectedInquiry.message}&quot;
                  </div>
                </div>

                {/* RFQ Lifecycle / Timeline visual */}
                <div className="space-y-3 pt-2 font-sans">
                  <p className="text-[10px] font-bold text-[#A47148] uppercase tracking-widest">Process Timeline</p>
                  <div className="flex items-center text-xs">
                    <div className="flex items-center text-[#166534]">
                      <Check className="w-4 h-4 bg-[#F0FDF4] border border-[#86EFAC] rounded-full p-0.5" />
                      <span className="font-bold ml-1.5">Submitted</span>
                    </div>
                    <span className="flex-1 border-t border-dashed border-[#D6D3D1] mx-4"></span>
                    <div className="flex items-center text-[#166534]">
                      <Check className="w-4 h-4 bg-[#F0FDF4] border border-[#86EFAC] rounded-full p-0.5" />
                      <span className="font-bold ml-1.5">Received</span>
                    </div>
                    <span className="flex-1 border-t border-dashed border-[#D6D3D1] mx-4"></span>
                    <div className="flex items-center text-warning font-bold">
                      <span className="animate-pulse relative inline-flex rounded-full h-2 w-2 bg-warning mr-1.5"></span>
                      <span>Negotiating</span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="pt-6 border-t border-[#E7E5E4] flex flex-wrap gap-3 font-sans">
                  <a
                    href={`mailto:${selectedInquiry.buyerEmail}?subject=Re: Jabar Export Hub Inquiry for ${selectedInquiry.productName}`}
                    className="flex-1 min-w-[150px] btn-primary py-3.5 flex items-center justify-center gap-2 cursor-pointer shadow-none border-none text-center"
                  >
                    <Send className="w-4 h-4 text-white" />
                    <span>Reply via Direct Email</span>
                  </a>
                  <button
                    onClick={() => alert("RFQ accepted. You will receive draft deal templates in your actual email.")}
                    className="btn-secondary rounded-[8px] border-2 border-[#166534] text-[#166534] hover:bg-[#F0FDF4] py-3.5 px-5 text-xs font-bold cursor-pointer transition-all flex items-center gap-1.5 bg-transparent"
                  >
                    <Check className="w-4 h-4 text-[#166534]" />
                    <span>Accept Quote</span>
                  </button>
                  <button
                    onClick={() => alert("Inquiry declined.")}
                    className="btn-destructive rounded-[8px] border-none bg-error hover:bg-[#991B1B] text-white py-3.5 px-5 text-xs font-bold cursor-pointer transition-all flex items-center gap-1.5"
                  >
                    <X className="w-4 h-4 text-white" />
                    <span>Ignore</span>
                  </button>
                </div>

              </div>
            ) : (
              <div className="bg-white rounded-[12px] border border-[#E7E5E4] border-b-2 border-b-[#D6D3D1] p-12 text-center text-[#57534E] shadow-none">
                <FileText className="w-12 h-12 text-[#A8A29E] mx-auto mb-2" />
                <p className="font-bold text-[#1C1917] font-serif">No Inquiry Selected</p>
                <p className="text-xs text-[#57534E] mt-1">Select an inquiry from the left pane to view details.</p>
              </div>
            )}
          </div>
        </div>
      ) : (
        // Inbox Empty state
        <div className="p-12 text-center rounded-[12px] bg-white border border-[#D6D3D1] border-b-[3px] border-b-[#A8A29E] max-w-xl mx-auto space-y-4 shadow-none">
          <Mail className="w-12 h-12 text-[#A8A29E] mx-auto" />
          <h3 className="text-lg font-bold text-[#1C1917] font-serif">Inboxes are Clean</h3>
          <p className="text-xs text-[#57534E]">
            Koperasi Anda belum menerima inquiry baru dari buyer luar negeri. Anda bisa merangsang data RFQ baru dengan membuka detail produk publik Anda dan mengirim form penawaran secara instan.
          </p>
          <Link
            href="/directory"
            className="btn-primary cursor-pointer px-6 py-2.5 text-xs font-bold inline-block text-center"
          >
            Visit Public Directory Catalog
          </Link>
        </div>
      )}
    </div>
  );
}
