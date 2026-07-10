"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useDemo } from "@/context/DemoContext";
import { Leaf, Mail, Lock, ShieldAlert, Globe, Briefcase, ChevronLeft, AlertCircle } from "lucide-react";

export default function LoginPage() {
  const { login, currentUser } = useDemo();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Redirect if already logged in
  useEffect(() => {
    if (currentUser) {
      if (currentUser.role === "buyer") {
        router.push("/");
      } else {
        router.push("/dashboard");
      }
    }
  }, [currentUser, router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Small delay to simulate server communication
    setTimeout(() => {
      const result = login(email, password);
      setLoading(false);
      
      if (!result.success) {
        setError(result.error || "Gagal masuk. Silakan periksa kembali email dan password.");
      }
    }, 600);
  };

  const handleQuickLogin = (presetEmail: string, presetPass: string) => {
    setError("");
    setLoading(true);
    
    setTimeout(() => {
      const result = login(presetEmail, presetPass);
      setLoading(false);
      if (!result.success) {
        setError(result.error || "Gagal masuk.");
      }
    }, 400);
  };

  return (
    <div className="min-h-screen bg-[#FAFAF5] flex flex-col justify-between py-12 px-4 sm:px-6 lg:px-8 font-sans">
      {/* Back to Home Header */}
      <div className="max-w-md w-full mx-auto flex justify-start">
        <Link 
          href="/" 
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#166534] hover:text-[#A47148] transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Kembali ke Halaman Utama</span>
        </Link>
      </div>

      {/* Main Container */}
      <div className="max-w-md w-full mx-auto my-auto space-y-8">
        {/* Brand & Title */}
        <div className="text-center">
          <Link href="/" className="inline-flex items-center gap-2 group mb-4">
            <span className="text-4xl font-extrabold tracking-tight text-[#166534] font-serif">
              JABAR
            </span>
            <span className="text-xs uppercase tracking-widest font-bold px-2 py-0.5 rounded-[4px] bg-[#A47148] text-white">
              Export Hub
            </span>
          </Link>
          <h2 className="text-2xl font-bold font-serif text-[#1C1917] tracking-tight">
            Selamat Datang Kembali
          </h2>
          <p className="text-xs text-[#57534E] mt-2">
            Silakan masuk ke akun Anda untuk mengelola portal ekspor B2B Jawa Barat.
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-white p-8 rounded-[12px] border border-[#E7E5E4] border-b-[3px] border-b-[#A8A29E] space-y-6">
          {error && (
            <div className="p-3 rounded-[8px] bg-red-50 border border-red-200 text-[#B91C1C] flex items-start gap-2 text-xs">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#1C1917] mb-1.5">
                Alamat Email
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-[#A8A29E]">
                  <Mail className="w-4 h-4" />
                </span>
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#D6D3D1] rounded-[8px] text-sm text-[#1C1917] placeholder-[#A8A29E] outline-none transition-all focus:border-[#166534] focus:ring-2 focus:ring-[#166534]/20"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-xs font-semibold text-[#1C1917]">
                  Kata Sandi
                </label>
              </div>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-[#A8A29E]">
                  <Lock className="w-4 h-4" />
                </span>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#D6D3D1] rounded-[8px] text-sm text-[#1C1917] placeholder-[#A8A29E] outline-none transition-all focus:border-[#166534] focus:ring-2 focus:ring-[#166534]/20"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 px-4 rounded-[8px] bg-[#166534] hover:bg-[#14532D] disabled:bg-[#166534]/50 disabled:cursor-not-allowed text-white text-xs font-bold transition-all border-none flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Memproses...</span>
                </>
              ) : (
                <span>Masuk Sekarang</span>
              )}
            </button>
          </form>

          {/* Registration Prompt */}
          <div className="text-center text-xs text-[#57534E] pt-1">
            <span>Belum punya akun mitra? </span>
            <Link href="/register" className="font-bold text-[#166534] hover:underline">
              Daftar Sebagai Mitra Baru
            </Link>
          </div>

          {/* Divider */}
          <div className="relative flex py-2 items-center">
            <div className="flex-grow border-t border-[#E7E5E4]"></div>
            <span className="flex-shrink mx-3 text-[10px] font-bold text-[#A8A29E] uppercase tracking-wider">
              Uji Coba Cepat (Presets)
            </span>
            <div className="flex-grow border-t border-[#E7E5E4]"></div>
          </div>

          {/* Quick Login Presets Grid */}
          <div className="grid grid-cols-1 gap-2.5">
            {/* Presets - Admin */}
            <button
              type="button"
              onClick={() => handleQuickLogin("admin@jabar.go.id", "admin123")}
              className="w-full p-3 rounded-[8px] border border-[#E7E5E4] hover:border-amber-400 hover:bg-amber-50/30 text-left transition-all group flex items-center justify-between cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-[6px] bg-amber-50 text-amber-700">
                  <ShieldAlert className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-[#1C1917] group-hover:text-amber-800">Platform Super Admin</p>
                  <p className="text-[10px] text-[#57534E]">admin@jabarexporthub.com / admin123</p>
                </div>
              </div>
              <span className="text-[10px] font-bold text-amber-600 bg-amber-100/50 px-2 py-0.5 rounded-[4px]">
                Full Access
              </span>
            </button>

            {/* Presets - SME */}
            <button
              type="button"
              onClick={() => handleQuickLogin("sme@priangan.com", "sme123")}
              className="w-full p-3 rounded-[8px] border border-[#E7E5E4] hover:border-forest-400 hover:bg-[#F0FDF4]/30 text-left transition-all group flex items-center justify-between cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-[6px] bg-[#F5F5EB] text-[#166534]">
                  <Briefcase className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-[#1C1917] group-hover:text-[#166534]">Mitra UMKM (SME)</p>
                  <p className="text-[10px] text-[#57534E]">sme@priangan.com / sme123</p>
                </div>
              </div>
              <span className="text-[10px] font-bold text-[#166534] bg-forest-100/50 px-2 py-0.5 rounded-[4px]">
                SME Portal
              </span>
            </button>

            {/* Presets - Buyer */}
            <button
              type="button"
              onClick={() => handleQuickLogin("buyer@global.com", "buyer123")}
              className="w-full p-3 rounded-[8px] border border-[#E7E5E4] hover:border-cyan-400 hover:bg-cyan-50/30 text-left transition-all group flex items-center justify-between cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-[6px] bg-cyan-50 text-cyan-700">
                  <Globe className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-[#1C1917] group-hover:text-cyan-800">International Buyer</p>
                  <p className="text-[10px] text-[#57534E]">buyer@global.com / buyer123</p>
                </div>
              </div>
              <span className="text-[10px] font-bold text-cyan-600 bg-cyan-100/50 px-2 py-0.5 rounded-[4px]">
                Public Directory
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center text-[10px] text-[#A8A29E] font-medium max-w-md w-full mx-auto">
        <p>&copy; 2026 Jabar Export Hub. All rights reserved.</p>
        <p className="mt-1">Independent B2B Trade Network.</p>
      </div>
    </div>
  );
}
