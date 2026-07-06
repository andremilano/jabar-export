"use client";

import React from "react";
import DashboardSidebar from "@/components/DashboardSidebar";
import { useDemo } from "@/context/DemoContext";
import { ShieldAlert, UserCheck, Briefcase } from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { role, setRole } = useDemo();

  if (role === "buyer") {
    return (
      <div className="min-h-screen bg-[#1C1917] flex items-center justify-center p-4">
        <div className="max-w-md w-full p-8 rounded-[12px] bg-white border border-[#D6D3D1] border-b-[3px] border-b-[#A8A29E] space-y-6 text-center shadow-none font-sans">
          <ShieldAlert className="w-12 h-12 text-[#A47148] mx-auto animate-pulse" />
          <div className="space-y-2">
            <h2 className="text-xl font-bold font-serif text-[#1C1917]">Partner Portal Access</h2>
            <p className="text-xs text-[#57534E] leading-relaxed">
              Selamat datang di portal B2B. Anda sedang berada dalam mode Buyer (Publik). Untuk mengakses dashboard manajemen, silakan pilih profil simulasi di bawah ini:
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3 pt-2 font-sans">
            <button
              onClick={() => setRole("sme")}
              className="w-full flex items-center justify-center gap-2 p-3.5 rounded-[8px] bg-[#166534] hover:bg-[#14532D] text-white text-xs font-bold transition-all shadow-none cursor-pointer border-none"
            >
              <Briefcase className="w-4.5 h-4.5 text-[#86A873]" />
              <span>Masuk Sebagai Mitra UMKM (SME)</span>
            </button>
            <button
              onClick={() => setRole("admin")}
              className="w-full flex items-center justify-center gap-2 p-3.5 rounded-[8px] bg-[#A47148] hover:bg-[#8B5E3C] text-white text-xs font-bold transition-all shadow-none cursor-pointer border-none"
            >
              <UserCheck className="w-4.5 h-4.5 text-[#FAFAF5]" />
              <span>Masuk Sebagai Admin Dinas (Kurator)</span>
            </button>
          </div>
          
          <div className="border-t border-[#E7E5E4] pt-4 font-sans">
            <a href="/" className="text-xs text-[#166534] font-semibold hover:underline">
              Kembali ke Directory Publik
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-[#FAFAF5]">
      {/* Sidebar */}
      <DashboardSidebar />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-h-screen overflow-y-auto">
        {/* Top bar */}
        <header className="h-20 border-b border-[#D6D3D1] px-8 flex items-center justify-between bg-white shrink-0 font-sans shadow-none">
          <div>
            <h2 className="text-sm font-bold text-[#1C1917] font-serif">
              {role === "admin" ? "Disperindag Admin Console" : "SME Export Dashboard"}
            </h2>
          </div>
          
          <div className="flex items-center gap-3">
            <span className="text-[11px] font-semibold text-[#57534E]">
              Simulated Session:
            </span>
            <span className={`px-2.5 py-1 rounded-[4px] text-[10px] font-extrabold uppercase tracking-wide border ${
              role === "admin"
                ? "bg-amber-50 text-amber-700 border-amber-300"
                : "bg-forest-100 text-[#166534] border-forest-300"
            }`}>
              {role === "admin" ? "Super Admin" : "Priangan Coffee"}
            </span>
          </div>
        </header>

        {/* Dashboard page wrapper */}
        <div className="p-8 flex-1">
          {children}
        </div>
      </main>
    </div>
  );
}
