"use client";

import React, { useState } from "react";
import { useDemo, Company } from "@/context/DemoContext";
import { ShieldCheck, FileText, CheckCircle, XCircle, Search, Eye, Download, ShieldAlert, Award, Coffee, Scissors, Hammer, Building2 } from "lucide-react";

function CompanyLogo({ logo }: { logo?: string }) {
  const cls = "w-7 h-7";
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
    <div className="space-y-8 animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-forest-950 dark:text-white">Exporter Curation Center</h1>
          <p className="text-xs text-forest-700 mt-1">
            Audit SME legal certifications and NIB profiles. Verified partners receive premium visibility flags.
          </p>
        </div>
        
        {/* Search */}
        <div className="relative w-full sm:w-64 bg-white dark:bg-forest-900/10 rounded-xl border border-forest-100/20 dark:border-forest-900/20 overflow-hidden flex items-center p-1.5">
          <Search className="w-4 h-4 text-forest-700 ml-2" />
          <input
            type="text"
            placeholder="Search by company or NIB..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-transparent border-0 outline-none text-xs ml-2 py-1 focus:ring-0 text-forest-950 dark:text-white"
          />
        </div>
      </div>

      {/* Grid of Companies */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredCompanies.map((comp) => (
          <div
            key={comp.id}
            className="p-6 bg-white dark:bg-forest-900/10 rounded-3xl border border-forest-100/20 dark:border-forest-900/20 shadow-sm space-y-6 flex flex-col justify-between"
          >
            {/* Header info */}
            <div className="space-y-4">
              <div className="flex justify-between items-start gap-4">
                <div className="space-y-1">
                  <h3 className="text-sm font-bold text-forest-950 dark:text-white flex items-center gap-1.5">
                    <span>{comp.name}</span>
                    {comp.isVerified && (
                      <span title="Currently Verified">
                        <ShieldCheck className="w-4.5 h-4.5 text-gold-500 fill-gold-500/10" />
                      </span>
                    )}
                  </h3>
                  <p className="text-[10px] text-forest-700">{comp.location} &bull; Est. {comp.establishedYear}</p>
                </div>
                <div className="p-3 rounded-2xl bg-forest-100 dark:bg-forest-900 text-forest-700 dark:text-forest-300">
                  <CompanyLogo logo={comp.logo} />
                </div>
              </div>

              {/* Status Badge */}
              {comp.isVerified ? (
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-gold-400/10 border border-gold-400/30 text-[10px] font-extrabold text-gold-600 uppercase tracking-wide">
                  <Award className="w-3.5 h-3.5" />
                  <span>Verified Partner status active</span>
                </div>
              ) : (
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-amber-500/10 border border-amber-500/30 text-[10px] font-extrabold text-amber-600 uppercase tracking-wide">
                  <ShieldAlert className="w-3.5 h-3.5" />
                  <span>Audit Document Pending</span>
                </div>
              )}

              <p className="text-xs text-forest-800 dark:text-forest-800 leading-relaxed line-clamp-3">
                {comp.description}
              </p>

              {/* Legal Documents Panel */}
              <div className="space-y-2 pt-2 border-t border-forest-50/10 dark:border-forest-900/10">
                <p className="text-[9px] font-bold text-forest-700 uppercase tracking-wider">Submitted Legal Documents</p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {/* NIB doc */}
                  <div className="p-3 rounded-xl bg-forest-50/30 dark:bg-forest-950/20 border border-forest-100/10 dark:border-forest-900/10 flex justify-between items-center gap-2">
                    <div className="min-w-0">
                      <p className="font-bold text-[10px] truncate">NIB Certificate</p>
                      <p className="font-mono text-[9px] text-forest-700 truncate mt-0.5">{comp.nib}</p>
                    </div>
                    <button
                      onClick={() => alert(`Simulasi unduh dokumen NIB untuk ${comp.name} (${comp.nib})`)}
                      className="p-1.5 rounded hover:bg-forest-100 text-forest-700 hover:text-forest-950"
                      title="Download PDF"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                  </div>

                  {/* NPWP doc */}
                  <div className="p-3 rounded-xl bg-forest-50/30 dark:bg-forest-950/20 border border-forest-100/10 dark:border-forest-900/10 flex justify-between items-center gap-2">
                    <div className="min-w-0">
                      <p className="font-bold text-[10px] truncate">NPWP Certificate</p>
                      <p className="font-mono text-[9px] text-forest-700 truncate mt-0.5">{comp.npwp}</p>
                    </div>
                    <button
                      onClick={() => alert(`Simulasi unduh dokumen NPWP untuk ${comp.name} (${comp.npwp})`)}
                      className="p-1.5 rounded hover:bg-forest-100 text-forest-700 hover:text-forest-950"
                      title="Download PDF"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Verification action panel */}
            <div className="pt-6 border-t border-forest-50/10 dark:border-forest-900/10 flex gap-3">
              {comp.isVerified ? (
                <button
                  onClick={() => handleReject(comp.id, comp.name)}
                  className="w-full py-3 rounded-xl border border-red-200 hover:bg-red-500/5 text-red-500 font-extrabold text-[10px] tracking-wider uppercase transition-all flex items-center justify-center gap-1.5"
                >
                  <XCircle className="w-4 h-4" />
                  <span>Revoke Verification Status</span>
                </button>
              ) : (
                <>
                  <button
                    onClick={() => handleApprove(comp.id, comp.name)}
                    className="w-full py-3 rounded-xl bg-forest-600 hover:bg-forest-700 text-white font-extrabold text-[10px] tracking-wider uppercase transition-all shadow-md flex items-center justify-center gap-1.5"
                  >
                    <CheckCircle className="w-4 h-4" />
                    <span>Approve & Verify SME</span>
                  </button>
                  <button
                    onClick={() => alert("Verification rejected. A notification with audit notes has been sent to the SME.")}
                    className="px-4 py-3 rounded-xl border border-forest-100 text-forest-800 hover:bg-forest-50 text-[10px] font-bold transition-all dark:border-forest-900"
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
