"use client";

import React, { useState } from "react";
import { useDemo } from "@/context/DemoContext";
import { ShieldCheck, FileText, CheckCircle, XCircle, Search, Download, ShieldAlert, Award, Coffee, Scissors, Hammer, Building2 } from "lucide-react";

function CompanyLogo({ logo }: { logo?: string }) {
  const cls = "w-7 h-7 text-[#166534]";
  if (logo === "coffee") return <Coffee className={cls} />;
  if (logo === "textile") return <Scissors className={cls} />;
  if (logo === "craft") return <Hammer className={cls} />;
  return <Building2 className={cls} />;
}

export default function AdminCuration() {
  const { companies, updateCompanyVerification } = useDemo();
  const [search, setSearch] = useState("");

  const filteredCompanies = companies.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.nib.includes(search)
  );

  const handleApprove = (id: string, name: string) => {
    updateCompanyVerification(id, true);
    alert(`Mitra ${name} berhasil diverifikasi! Verified badge telah disematkan secara global.`);
  };

  const handleReject = (id: string, name: string) => {
    updateCompanyVerification(id, false);
    alert(`Verifikasi Mitra ${name} dibatalkan / ditolak.`);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300 font-sans">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#1C1917] font-serif">Exporter Curation Center</h1>
          <p className="text-xs text-[#57534E] mt-1">
            Audit SME legal certifications and NIB profiles. Verified partners receive premium visibility flags.
          </p>
        </div>
        
        {/* Search */}
        <div className="relative w-full sm:w-64 bg-white rounded-[8px] border border-[#D6D3D1] overflow-hidden flex items-center p-1.5 focus-within:border-[#166534]">
          <Search className="w-4 h-4 text-[#57534E] ml-2" />
          <input
            type="text"
            placeholder="Search by company or NIB..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-transparent border-0 outline-none text-xs ml-2 py-1 text-[#1C1917] placeholder-[#A8A29E] focus:ring-0"
          />
        </div>
      </div>

      {/* Grid of Companies */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredCompanies.map((comp) => (
          <div
            key={comp.id}
            className="p-6 bg-white rounded-[12px] border border-[#E7E5E4] border-b-2 border-b-[#D6D3D1] hover:border-[#A8A29E] space-y-6 flex flex-col justify-between shadow-none transition-all duration-200"
          >
            {/* Header info */}
            <div className="space-y-4">
              <div className="flex justify-between items-start gap-4">
                <div className="space-y-1">
                  <h3 className="text-sm font-bold text-[#1C1917] flex items-center gap-1.5 font-serif">
                    <span>{comp.name}</span>
                    {comp.isVerified && (
                      <span title="Currently Verified">
                        <ShieldCheck className="w-4.5 h-4.5 text-[#166534] fill-[#166534]/10" />
                      </span>
                    )}
                  </h3>
                  <p className="text-[10px] text-[#A8A29E] font-sans">{comp.location} &bull; Est. {comp.establishedYear}</p>
                </div>
                <div className="p-3 rounded-[8px] bg-[#F5F5EB] text-[#166534]">
                  <CompanyLogo logo={comp.logo} />
                </div>
              </div>

              {/* Status Badge */}
              {comp.isVerified ? (
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-[4px] bg-[#DCFCE7] border border-[#86EFAC] text-[10px] font-extrabold text-[#166534] uppercase tracking-wide font-sans">
                  <Award className="w-3.5 h-3.5 text-[#166534]" />
                  <span>Verified Partner status active</span>
                </div>
              ) : (
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-[4px] bg-[#FEF9C3] border border-[#CA8A04] text-[10px] font-extrabold text-[#CA8A04] uppercase tracking-wide font-sans">
                  <ShieldAlert className="w-3.5 h-3.5 text-[#CA8A04]" />
                  <span>Audit Document Pending</span>
                </div>
              )}

              <p className="text-xs text-[#57534E] leading-relaxed line-clamp-3 font-sans">
                {comp.description}
              </p>

              {/* Legal Documents Panel */}
              <div className="space-y-2 pt-2 border-t border-[#E7E5E4] font-sans">
                <p className="text-[9px] font-bold text-[#57534E] uppercase tracking-wider">Submitted Legal Documents</p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {/* NIB doc */}
                  <div className="p-3 rounded-[8px] bg-[#F5F5EB] border border-[#D6D3D1] flex justify-between items-center gap-2">
                    <div className="min-w-0">
                      <p className="font-bold text-[10px] text-[#1C1917] truncate">NIB Certificate</p>
                      <p className="font-mono text-[9px] text-[#57534E] truncate mt-0.5">{comp.nib}</p>
                    </div>
                    <button
                      onClick={() => alert(`Simulasi unduh dokumen NIB untuk ${comp.name} (${comp.nib})`)}
                      className="p-1.5 rounded-[4px] hover:bg-[#E7E5E4] text-[#166534] cursor-pointer bg-transparent border-none"
                      title="Download PDF"
                    >
                      <Download className="w-4 h-4 text-[#166534]" />
                    </button>
                  </div>

                  {/* NPWP doc */}
                  <div className="p-3 rounded-[8px] bg-[#F5F5EB] border border-[#D6D3D1] flex justify-between items-center gap-2">
                    <div className="min-w-0">
                      <p className="font-bold text-[10px] text-[#1C1917] truncate">NPWP Certificate</p>
                      <p className="font-mono text-[9px] text-[#57534E] truncate mt-0.5">{comp.npwp}</p>
                    </div>
                    <button
                      onClick={() => alert(`Simulasi unduh dokumen NPWP untuk ${comp.name} (${comp.npwp})`)}
                      className="p-1.5 rounded-[4px] hover:bg-[#E7E5E4] text-[#166534] cursor-pointer bg-transparent border-none"
                      title="Download PDF"
                    >
                      <Download className="w-4 h-4 text-[#166534]" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Verification action panel */}
            <div className="pt-6 border-t border-[#E7E5E4] flex gap-3 font-sans">
              {comp.isVerified ? (
                <button
                  onClick={() => handleReject(comp.id, comp.name)}
                  className="w-full btn-destructive py-3 text-[10px] tracking-wider uppercase flex items-center justify-center gap-1.5 cursor-pointer shadow-none"
                >
                  <XCircle className="w-4 h-4 text-white" />
                  <span>Revoke Verification Status</span>
                </button>
              ) : (
                <>
                  <button
                    onClick={() => handleApprove(comp.id, comp.name)}
                    className="w-full btn-primary py-3 text-[10px] tracking-wider uppercase flex items-center justify-center gap-1.5 cursor-pointer shadow-none"
                  >
                    <CheckCircle className="w-4 h-4 text-white" />
                    <span>Approve & Verify SME</span>
                  </button>
                  <button
                    onClick={() => alert("Verification rejected. A notification with audit notes has been sent to the SME.")}
                    className="btn-secondary rounded-[8px] px-4 py-3 text-[10px] font-bold text-red-600 border-2 border-red-200 hover:bg-[#FEE2E2] hover:border-red-500 cursor-pointer bg-transparent"
                  >
                    Reject
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
