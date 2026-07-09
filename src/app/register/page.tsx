"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useDemo } from "@/context/DemoContext";
import { Leaf, User, Mail, Lock, Building, Briefcase, FileText, ChevronLeft, ChevronRight, CheckCircle, AlertCircle, Calendar, MapPin, Scale } from "lucide-react";
import MapPicker from "@/components/MapPicker";

export default function RegisterPage() {
  const { registerSme } = useDemo();
  const router = useRouter();

  // Step state
  const [step, setStep] = useState(1); // 1: Account, 2: Company details

  // Form states - Account
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Form states - Company
  const [companyName, setCompanyName] = useState("");
  const [category, setCategory] = useState<"Kopi" | "Teh" | "Kriya" | "Tekstil">("Kopi");
  const [establishedYear, setEstablishedYear] = useState("");
  const [location, setLocation] = useState("");
  const [nib, setNib] = useState("");
  const [npwp, setNpwp] = useState("");
  const [monthlyCapacity, setMonthlyCapacity] = useState("");
  const [unit, setUnit] = useState("kg");
  const [description, setDescription] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  // UI States
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const regencies = [
    "Bandung Regency",
    "Bandung City",
    "Garut Regency",
    "Cirebon Regency",
    "Cirebon City",
    "Bogor Regency",
    "Tasikmalaya Regency",
    "Tasikmalaya City",
    "Sukabumi Regency",
    "Sukabumi City",
    "Cianjur Regency",
    "Sumedang Regency",
    "Kuningan Regency",
    "Majalengka Regency",
    "Indramayu Regency",
    "Subang Regency",
    "Purwakarta Regency",
    "Karawang Regency",
    "Bekasi Regency",
    "Bekasi City",
    "Depok City",
    "Pangandaran Regency",
    "West Bandung Regency"
  ];

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validate Step 1
    if (!name.trim()) {
      setError("Nama lengkap harus diisi.");
      return;
    }
    if (!email.trim() || !email.includes("@")) {
      setError("Format email tidak valid.");
      return;
    }
    if (password.length < 6) {
      setError("Kata sandi minimal 6 karakter.");
      return;
    }

    setStep(2);
  };

  const handlePrevStep = () => {
    setError("");
    setStep(1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validate Step 2
    if (!companyName.trim()) {
      setError("Nama perusahaan/koperasi harus diisi.");
      return;
    }
    if (!establishedYear || isNaN(Number(establishedYear)) || Number(establishedYear) < 1900 || Number(establishedYear) > new Date().getFullYear()) {
      setError("Tahun berdiri tidak valid.");
      return;
    }
    if (!location) {
      setError("Lokasi operasional harus diisi.");
      return;
    }
    if (!nib.trim() || nib.trim().length !== 13 || isNaN(Number(nib.trim()))) {
      setError("NIB harus berupa 13 digit angka.");
      return;
    }
    if (!npwp.trim()) {
      setError("NPWP harus diisi.");
      return;
    }
    if (!monthlyCapacity || isNaN(Number(monthlyCapacity)) || Number(monthlyCapacity) <= 0) {
      setError("Kapasitas produksi bulanan harus berupa angka positif.");
      return;
    }
    if (!unit.trim()) {
      setError("Satuan kapasitas harus diisi.");
      return;
    }
    if (!description.trim() || description.trim().length < 20) {
      setError("Deskripsi perusahaan minimal 20 karakter.");
      return;
    }
    if (latitude && (isNaN(Number(latitude)) || Number(latitude) < -90 || Number(latitude) > 90)) {
      setError("Latitude harus berupa angka antara -90 dan 90.");
      return;
    }
    if (longitude && (isNaN(Number(longitude)) || Number(longitude) < -180 || Number(longitude) > 180)) {
      setError("Longitude harus berupa angka antara -180 dan 180.");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const result = registerSme(
        { name, email, password },
        {
          name: companyName,
          establishedYear: Number(establishedYear),
          location: `${location}, West Java`,
          nib: nib.trim(),
          npwp: npwp.trim(),
          description,
          logo: category === "Kopi" ? "coffee" : category === "Tekstil" ? "textile" : category === "Kriya" ? "craft" : "other",
          latitude: latitude ? Number(latitude) : undefined,
          longitude: longitude ? Number(longitude) : undefined,
        }
      );

      setLoading(false);

      if (!result.success) {
        setError(result.error || "Gagal melakukan registrasi.");
      } else {
        setSuccess(true);
        // Redirect to login after 3 seconds
        setTimeout(() => {
          router.push("/login");
        }, 3000);
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#FAFAF5] flex flex-col justify-between py-12 px-4 sm:px-6 lg:px-8 font-sans">
      {/* Back to Login Header */}
      <div className="max-w-xl w-full mx-auto flex justify-start">
        <Link 
          href="/login" 
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#166534] hover:text-[#A47148] transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Kembali ke Halaman Masuk</span>
        </Link>
      </div>

      {/* Main Container */}
      <div className="max-w-xl w-full mx-auto my-auto space-y-8">
        {/* Brand Header */}
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
            Registrasi Mitra UMKM Baru
          </h2>
          <p className="text-xs text-[#57534E] mt-2">
            Mendaftarkan komoditas unggulan Anda ke pasar pembeli global B2B.
          </p>
        </div>

        {/* Progress Bar / Steps */}
        <div className="max-w-xs mx-auto flex items-center justify-between text-xs font-semibold text-[#A8A29E] relative">
          <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-[#E7E5E4] -translate-y-1/2 z-0"></div>
          
          <div className="relative z-10 flex flex-col items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
              step >= 1 ? "bg-[#166534] border-[#166534] text-white" : "bg-white border-[#D6D3D1] text-[#A8A29E]"
            } font-bold text-xs`}>
              1
            </div>
            <span className={`text-[10px] mt-1 ${step >= 1 ? "text-[#166534] font-bold" : ""}`}>Akun</span>
          </div>

          <div className="relative z-10 flex flex-col items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
              step >= 2 ? "bg-[#166534] border-[#166534] text-white" : "bg-white border-[#D6D3D1] text-[#A8A29E]"
            } font-bold text-xs`}>
              2
            </div>
            <span className={`text-[10px] mt-1 ${step >= 2 ? "text-[#166534] font-bold" : ""}`}>Perusahaan</span>
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white p-8 rounded-[12px] border border-[#E7E5E4] border-b-[3px] border-b-[#A8A29E] space-y-6">
          
          {error && (
            <div className="p-3.5 rounded-[8px] bg-red-50 border border-red-200 text-[#B91C1C] flex items-start gap-2.5 text-xs font-medium">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="p-4 rounded-[8px] bg-[#DCFCE7] border border-[#86EFAC] text-[#166534] flex flex-col items-center text-center gap-3 font-medium">
              <CheckCircle className="w-10 h-10 text-[#166534] animate-bounce" />
              <div className="space-y-1">
                <p className="text-sm font-bold">Registrasi Berhasil!</p>
                <p className="text-xs text-[#166534]/95">
                  Akun Anda dan profil perusahaan telah terdaftar. Anda akan diarahkan ke halaman login dalam 3 detik untuk masuk dan melakukan simulasi kurasi.
                </p>
              </div>
            </div>
          )}

          {!success && (
            <form onSubmit={step === 1 ? handleNextStep : handleSubmit} className="space-y-5">
              
              {/* STEP 1: ACCOUNT CREDENTIALS */}
              {step === 1 && (
                <div className="space-y-4 animate-in fade-in slide-in-from-right-3 duration-300">
                  <h3 className="text-sm font-bold text-[#1C1917] uppercase tracking-wider flex items-center gap-2 font-serif border-b border-[#E7E5E4] pb-2">
                    <User className="w-4 h-4 text-[#166534]" />
                    <span>Informasi Akun Pemilik</span>
                  </h3>

                  <div>
                    <label className="block text-xs font-semibold text-[#1C1917] mb-1.5">
                      Nama Lengkap Pendaftar
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-[#A8A29E]">
                        <User className="w-4 h-4" />
                      </span>
                      <input
                        type="text"
                        required
                        placeholder="Contoh: Ahmad Dahlan"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#D6D3D1] rounded-[8px] text-sm text-[#1C1917] placeholder-[#A8A29E] outline-none transition-all focus:border-[#166534] focus:ring-2 focus:ring-[#166534]/20"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#1C1917] mb-1.5">
                      Alamat Email Aktif
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-[#A8A29E]">
                        <Mail className="w-4 h-4" />
                      </span>
                      <input
                        type="email"
                        required
                        placeholder="Contoh: owner@namacompany.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#D6D3D1] rounded-[8px] text-sm text-[#1C1917] placeholder-[#A8A29E] outline-none transition-all focus:border-[#166534] focus:ring-2 focus:ring-[#166534]/20"
                      />
                    </div>
                    <p className="text-[10px] text-[#57534E] mt-1">
                      Email ini akan digunakan untuk masuk ke portal dashboard Anda.
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#1C1917] mb-1.5">
                      Kata Sandi (Password)
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-[#A8A29E]">
                        <Lock className="w-4 h-4" />
                      </span>
                      <input
                        type="password"
                        required
                        placeholder="Minimal 6 karakter"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#D6D3D1] rounded-[8px] text-sm text-[#1C1917] placeholder-[#A8A29E] outline-none transition-all focus:border-[#166534] focus:ring-2 focus:ring-[#166534]/20"
                      />
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-2.5 px-4 rounded-[8px] bg-[#166534] hover:bg-[#14532D] text-white text-xs font-bold transition-all border-none flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>Lanjut Ke Detail Perusahaan</span>
                      <ChevronRight className="w-4 h-4 text-white" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 2: COMPANY DETAILS */}
              {step === 2 && (
                <div className="space-y-4 animate-in fade-in slide-in-from-right-3 duration-300">
                  <h3 className="text-sm font-bold text-[#1C1917] uppercase tracking-wider flex items-center gap-2 font-serif border-b border-[#E7E5E4] pb-2">
                    <Building className="w-4 h-4 text-[#166534]" />
                    <span>Identitas Legalitas UMKM</span>
                  </h3>

                  {/* Company Name & Category */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#1C1917] mb-1.5">
                        Nama Perusahaan / Koperasi
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Contoh: Koperasi Mandiri Sejahtera"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-white border border-[#D6D3D1] rounded-[8px] text-sm text-[#1C1917] placeholder-[#A8A29E] outline-none transition-all focus:border-[#166534] focus:ring-2 focus:ring-[#166534]/20"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#1C1917] mb-1.5">
                        Kategori Komoditas Utama
                      </label>
                      <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value as any)}
                        className="w-full px-3.5 py-2.5 bg-white border border-[#D6D3D1] rounded-[8px] text-sm text-[#1C1917] outline-none transition-all focus:border-[#166534] focus:ring-2 focus:ring-[#166534]/20 cursor-pointer"
                      >
                        <option value="Kopi">Kopi (Coffee)</option>
                        <option value="Teh">Teh (Tea)</option>
                        <option value="Kriya">Kriya (Rattan / Woodcraft)</option>
                        <option value="Tekstil">Tekstil (Silk / Handwoven)</option>
                      </select>
                    </div>
                  </div>

                  {/* Established Year & Regency Location */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#1C1917] mb-1.5">
                        Tahun Berdiri
                      </label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-[#A8A29E]">
                          <Calendar className="w-4 h-4" />
                        </span>
                        <input
                          type="number"
                          required
                          placeholder="Contoh: 2018"
                          value={establishedYear}
                          onChange={(e) => setEstablishedYear(e.target.value)}
                          className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#D6D3D1] rounded-[8px] text-sm text-[#1C1917] placeholder-[#A8A29E] outline-none transition-all focus:border-[#166534] focus:ring-2 focus:ring-[#166534]/20"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#1C1917] mb-1.5">
                        Kota/Kabupaten Jawa Barat
                      </label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-[#A8A29E]">
                          <MapPin className="w-4 h-4" />
                        </span>
                        <select
                          required
                          value={location}
                          onChange={(e) => setLocation(e.target.value)}
                          className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#D6D3D1] rounded-[8px] text-sm text-[#1C1917] outline-none transition-all focus:border-[#166534] focus:ring-2 focus:ring-[#166534]/20 cursor-pointer"
                        >
                          <option value="">-- Pilih Kota/Kabupaten --</option>
                          {regencies.map((reg) => (
                            <option key={reg} value={reg}>
                              {reg}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Coordinates (Latitude & Longitude) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#1C1917] mb-1.5">
                        Latitude Fasilitas (Opsional)
                      </label>
                      <input
                        type="text"
                        placeholder="Contoh: -7.0909"
                        value={latitude}
                        onChange={(e) => setLatitude(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-white border border-[#D6D3D1] rounded-[8px] text-sm text-[#1C1917] placeholder-[#A8A29E] outline-none transition-all focus:border-[#166534] focus:ring-2 focus:ring-[#166534]/20"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#1C1917] mb-1.5">
                        Longitude Fasilitas (Opsional)
                      </label>
                      <input
                        type="text"
                        placeholder="Contoh: 107.5186"
                        value={longitude}
                        onChange={(e) => setLongitude(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-white border border-[#D6D3D1] rounded-[8px] text-sm text-[#1C1917] placeholder-[#A8A29E] outline-none transition-all focus:border-[#166534] focus:ring-2 focus:ring-[#166534]/20"
                      />
                    </div>
                  </div>

                  {/* Interactive Map Picker */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-[#1C1917]">
                      Pilih Titik Lokasi Fasilitas
                    </label>
                    <MapPicker
                      lat={latitude ? Number(latitude) : undefined}
                      lng={longitude ? Number(longitude) : undefined}
                      onChange={(lat, lng) => {
                        setLatitude(lat.toFixed(6));
                        setLongitude(lng.toFixed(6));
                      }}
                    />
                  </div>

                  {/* NIB & NPWP */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-[#E7E5E4] pt-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#1C1917] mb-1.5">
                        Nomor NIB (13 Digit)
                      </label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-[#A8A29E]">
                          <FileText className="w-4 h-4" />
                        </span>
                        <input
                          type="text"
                          required
                          maxLength={13}
                          placeholder="Contoh: 9120005432101"
                          value={nib}
                          onChange={(e) => setNib(e.target.value)}
                          className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#D6D3D1] rounded-[8px] text-sm text-[#1C1917] font-mono placeholder-[#A8A29E] outline-none transition-all focus:border-[#166534] focus:ring-2 focus:ring-[#166534]/20"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#1C1917] mb-1.5">
                        NPWP Perusahaan
                      </label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-[#A8A29E]">
                          <Scale className="w-4 h-4" />
                        </span>
                        <input
                          type="text"
                          required
                          placeholder="Contoh: 01.234.567.8-403.000"
                          value={npwp}
                          onChange={(e) => setNpwp(e.target.value)}
                          className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#D6D3D1] rounded-[8px] text-sm text-[#1C1917] font-mono placeholder-[#A8A29E] outline-none transition-all focus:border-[#166534] focus:ring-2 focus:ring-[#166534]/20"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Capacity & Unit */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#1C1917] mb-1.5">
                        Kapasitas Produksi Bulanan
                      </label>
                      <input
                        type="number"
                        required
                        min="1"
                        placeholder="Contoh: 2500"
                        value={monthlyCapacity}
                        onChange={(e) => setMonthlyCapacity(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-white border border-[#D6D3D1] rounded-[8px] text-sm text-[#1C1917] placeholder-[#A8A29E] outline-none transition-all focus:border-[#166534] focus:ring-2 focus:ring-[#166534]/20"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#1C1917] mb-1.5">
                        Satuan Unit
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Contoh: kg, pcs, box, tons"
                        value={unit}
                        onChange={(e) => setUnit(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-white border border-[#D6D3D1] rounded-[8px] text-sm text-[#1C1917] placeholder-[#A8A29E] outline-none transition-all focus:border-[#166534] focus:ring-2 focus:ring-[#166534]/20"
                      />
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-xs font-semibold text-[#1C1917] mb-1.5">
                      Deskripsi Profil Perusahaan
                    </label>
                    <textarea
                      required
                      rows={3}
                      placeholder="Jelaskan mengenai spesifikasi ekspor komoditas Anda, proses pasca-panen/pembuatan, atau komitmen keberlanjutan bisnis Anda..."
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-white border border-[#D6D3D1] rounded-[8px] text-sm text-[#1C1917] placeholder-[#A8A29E] outline-none transition-all focus:border-[#166534] focus:ring-2 focus:ring-[#166534]/20 h-auto resize-y"
                    ></textarea>
                  </div>

                  {/* Buttons */}
                  <div className="pt-2 flex gap-3">
                    <button
                      type="button"
                      onClick={handlePrevStep}
                      className="flex-1 py-2.5 px-4 rounded-[8px] border-2 border-[#166534] hover:bg-[#F5F5EB] text-[#166534] text-xs font-bold transition-all text-center cursor-pointer bg-transparent"
                    >
                      Kembali
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className="flex-[2] py-2.5 px-4 rounded-[8px] bg-[#166534] hover:bg-[#14532D] text-white text-xs font-bold transition-all border-none flex items-center justify-center gap-2 cursor-pointer disabled:bg-[#166534]/50 disabled:cursor-not-allowed"
                    >
                      {loading ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>Memproses...</span>
                        </>
                      ) : (
                        <span>Daftar Sebagai Mitra</span>
                      )}
                    </button>
                  </div>
                </div>
              )}
              
            </form>
          )}

          {/* Prompt Login Link */}
          {!success && (
            <div className="pt-4 border-t border-[#E7E5E4] text-center text-xs text-[#57534E]">
              <span>Sudah memiliki akun? </span>
              <Link href="/login" className="font-bold text-[#166534] hover:underline">
                Masuk Di Sini
              </Link>
            </div>
          )}

        </div>
      </div>

      {/* Footer */}
      <div className="text-center text-[10px] text-[#A8A29E] font-medium max-w-md w-full mx-auto pt-8">
        <p>&copy; 2026 Pemerintah Provinsi Jawa Barat. All rights reserved.</p>
        <p className="mt-1">Dinas Perindustrian dan Perdagangan (Disperindag) Jawa Barat.</p>
      </div>
    </div>
  );
}
