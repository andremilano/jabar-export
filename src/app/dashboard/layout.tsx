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
      <div className="min-h-screen bg-forest-950 text-white flex items-center justify-center p-4">
        <div className="max-w-md w-full p-8 rounded-3xl glass border border-forest-900/50 space-y-6 text-center shadow-2xl">
          <ShieldAlert className="w-12 h-12 text-gold-400 mx-auto animate-bounce" />
          <div className="space-y-2">
            <h2 className="text-xl font-bold">Partner Portal Access</h2>
            <p className="text-xs text-forest-700 leading-relaxed">
              Selamat datang di portal B2B. Anda sedang berada dalam mode Buyer (Publik). Untuk mengakses dashboard manajemen, silakan pilih profil simulasi di bawah ini:
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3 pt-2">
            <button
              onClick={() => setRole("sme")}
              className="flex items-center justify-center gap-2 p-3.5 rounded-xl bg-forest-600 hover:bg-forest-500 text-white text-xs font-bold transition-all shadow-md"
            >
              <Briefcase className="w-4.5 h-4.5 text-gold-400" />
              <span>Masuk Sebagai Mitra UMKM (SME)</span>
            </button>
            <button
              onClick={() => setRole("admin")}
              className="flex items-center justify-center gap-2 p-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-white text-xs font-bold transition-all shadow-md"
            >
              <UserCheck className="w-4.5 h-4.5 text-amber-950" />
              <span>Masuk Sebagai Admin Dinas (Kurator)</span>
            </button>
          </div>
          
          <div className="border-t border-forest-900/50 pt-4">
            <a href="/" className="text-xs text-gold-400 font-semibold hover:underline">
              Kembali ke Directory Publik
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-forest-50/20 dark:bg-forest-950/10">
      {/* Sidebar */}
      <DashboardSidebar />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-h-screen overflow-y-auto">
        {/* Top bar */}
        <header className="h-20 border-b border-forest-100/10 dark:border-forest-900/20 px-8 flex items-center justify-between glass shrink-0">
          <div>
            <h2 className="text-sm font-bold text-forest-950 dark:text-white">
              {role === "admin" ? "Disperindag Admin Console" : "SME Export Dashboard"}
            </h2>
          </div>
          
          <div className="flex items-center gap-3">
            <span className="text-[11px] font-semibold text-forest-700">
              Simulated Session:
            </span>
            <span className={`px-2.5 py-1 rounded-lg text-[10px] font-extrabold uppercase tracking-wide border ${
              role === "admin"
                ? "bg-amber-500/10 text-amber-600 border-amber-500/20"
                : "bg-forest-600/10 text-forest-600 border-forest-600/20"
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
