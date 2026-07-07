"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import DashboardSidebar from "@/components/DashboardSidebar";
import { useDemo } from "@/context/DemoContext";
import { ShieldAlert, UserCheck, Briefcase } from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { role, setRole, currentUser, logout } = useDemo();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (!currentUser) {
      router.push("/login");
    }
  }, [currentUser, router]);

  if (!mounted || !currentUser) {
    return (
      <div className="min-h-screen bg-[#FAFAF5] flex items-center justify-center font-sans">
        <div className="text-center space-y-4">
          <div className="w-10 h-10 border-4 border-[#166534] border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-xs font-semibold text-[#57534E] tracking-wide">Memeriksa Sesi Masuk...</p>
        </div>
      </div>
    );
  }

  if (role === "buyer") {
    return (
      <div className="min-h-screen bg-[#1C1917] flex items-center justify-center p-4">
        <div className="max-w-md w-full p-8 rounded-[12px] bg-white border border-[#D6D3D1] border-b-[3px] border-b-[#A8A29E] space-y-6 text-center shadow-none font-sans">
          <ShieldAlert className="w-12 h-12 text-[#A47148] mx-auto animate-pulse" />
          <div className="space-y-2">
            <h2 className="text-xl font-bold font-serif text-[#1C1917]">Akses Terbatas</h2>
            <p className="text-xs text-[#57534E] leading-relaxed">
              {currentUser.role === "admin"
                ? "Anda sedang berada dalam mode Buyer (Publik). Silakan pilih profil simulasi di bawah ini untuk kembali mengakses dashboard manajemen:"
                : "Akun Anda saat ini masuk sebagai Buyer. Dashboard ini hanya ditujukan untuk Mitra UMKM (SME) dan Admin Dinas."}
            </p>
          </div>

          {currentUser.role === "admin" ? (
            /* Admin simulation switcher */
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
          ) : (
            /* Regular buyer actions */
            <div className="grid grid-cols-1 gap-3 pt-2 font-sans">
              <Link
                href="/"
                className="w-full flex items-center justify-center gap-2 p-3.5 rounded-[8px] bg-[#166534] hover:bg-[#14532D] text-white text-xs font-bold transition-all shadow-none cursor-pointer border-none text-center"
              >
                <span>Kembali ke Directory Publik</span>
              </Link>
              <button
                onClick={() => {
                  logout();
                  router.push("/");
                }}
                className="w-full flex items-center justify-center gap-2 p-3.5 rounded-[8px] border border-red-200 hover:bg-red-50 text-[#B91C1C] text-xs font-bold transition-all shadow-none cursor-pointer bg-white"
              >
                <span>Keluar (Log Out)</span>
              </button>
            </div>
          )}
          
          <div className="border-t border-[#E7E5E4] pt-4 font-sans">
            <Link href="/" className="text-xs text-[#166534] font-semibold hover:underline">
              Kembali ke Directory Publik
            </Link>
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
          
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-xs font-bold text-[#1C1917]">{currentUser.name}</p>
              <p className="text-[9px] text-[#57534E] mt-0.5">{currentUser.email}</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-[#A8A29E] font-semibold hidden md:inline">
                {currentUser.role === "admin" ? "Simulated Role:" : "Role:"}
              </span>
              <span className={`px-2.5 py-1 rounded-[4px] text-[10px] font-extrabold uppercase tracking-wide border ${
                role === "admin"
                  ? "bg-amber-50 text-amber-700 border-amber-300"
                  : "bg-forest-100 text-[#166534] border-forest-300"
              }`}>
                {role === "admin" ? "Super Admin" : "Priangan Coffee"}
              </span>
            </div>
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
