"use client";

import React, { useState } from "react";
import { useDemo } from "@/context/DemoContext";
import { Building, ShieldCheck, FileText, Check, Upload, HelpCircle, Save } from "lucide-react";

export default function DashboardProfile() {
  const { companies, updateCompanyVerification } = useDemo();

  // For simulation, we represent company ID "comp-1"
  const myCompany = companies.find((c) => c.id === "comp-1") || companies[0];

  // Local Form State
  const [name, setName] = useState(myCompany.name);
  const [establishedYear, setEstablishedYear] = useState(myCompany.establishedYear.toString());
  const [location, setLocation] = useState(myCompany.location);
  const [nib, setNib] = useState(myCompany.nib);
  const [npwp, setNpwp] = useState(myCompany.npwp);
  const [description, setDescription] = useState(myCompany.description);
  
  // Certifications list (mock upload list)
  const [certs, setCerts] = useState([
    { name: "Halal MUI Indonesia", uploaded: true, filename: "halal_cert_2026.pdf" },
    { name: "HACCP Food Safety", uploaded: true, filename: "haccp_accreditation.pdf" },
    { name: "Fair Trade Certification", uploaded: false, filename: "" },
    { name: "SVLK (Timber Legality)", uploaded: false, filename: "" },
  ]);

  const [isSaved, setIsSaved] = useState(false);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate updating context
    myCompany.name = name;
    myCompany.establishedYear = Number(establishedYear);
    myCompany.location = location;
    myCompany.nib = nib;
    myCompany.npwp = npwp;
    myCompany.description = description;

    // Persist to localStorage
    const storedCompanies = localStorage.getItem("jebar_companies");
    if (storedCompanies) {
      const parsed = JSON.parse(storedCompanies);
      const updated = parsed.map((c: any) =>
        c.id === myCompany.id
          ? {
              ...c,
              name,
              establishedYear: Number(establishedYear),
              location,
              nib,
              npwp,
              description,
            }
          : c
      );
      localStorage.setItem("jebar_companies", JSON.stringify(updated));
    }

    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  const handleUploadSimulate = (index: number) => {
    const updated = [...certs];
    updated[index].uploaded = true;
    updated[index].filename = `doc_proof_${updated[index].name.toLowerCase().replace(/\s+/g, "_")}.pdf`;
    setCerts(updated);
    
    // For demo, if SME uploads legal document, we can reset verification to false so Admin can verify it
    if (myCompany.isVerified) {
      updateCompanyVerification(myCompany.id, false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-forest-950 dark:text-white">Profile &amp; Capacity</h1>
        <p className="text-xs text-forest-700 mt-1">Manage company details, verification NIB/NPWP, and uploads.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Form Details (2 cols) */}
        <div className="lg:col-span-2 space-y-6">
          <form onSubmit={handleSaveProfile} className="p-6 bg-white dark:bg-forest-900/10 rounded-2xl border border-forest-100/20 dark:border-forest-900/20 shadow-sm space-y-6">
            <h3 className="text-sm font-bold text-forest-950 dark:text-white uppercase tracking-wider flex items-center gap-2">
              <Building className="w-5 h-5 text-forest-600 dark:text-forest-700" />
              <span>Company Legal Identity</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-forest-700 uppercase tracking-wider">Company Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full text-xs p-3 bg-forest-50/50 dark:bg-forest-900 border border-forest-100 dark:border-forest-900 rounded-xl outline-none focus:border-forest-500"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-forest-700 uppercase tracking-wider">Established Year</label>
                <input
                  type="number"
                  required
                  value={establishedYear}
                  onChange={(e) => setEstablishedYear(e.target.value)}
                  className="w-full text-xs p-3 bg-forest-50/50 dark:bg-forest-900 border border-forest-100 dark:border-forest-900 rounded-xl outline-none focus:border-forest-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-forest-700 uppercase tracking-wider">NIB (Nomor Induk Berusaha)</label>
                <input
                  type="text"
                  required
                  value={nib}
                  onChange={(e) => setNib(e.target.value)}
                  className="w-full text-xs p-3 bg-forest-50/50 dark:bg-forest-900 border border-forest-100 dark:border-forest-900 rounded-xl outline-none focus:border-forest-500 font-mono"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-forest-700 uppercase tracking-wider">NPWP Perusahaan</label>
                <input
                  type="text"
                  required
                  value={npwp}
                  onChange={(e) => setNpwp(e.target.value)}
                  className="w-full text-xs p-3 bg-forest-50/50 dark:bg-forest-900 border border-forest-100 dark:border-forest-900 rounded-xl outline-none focus:border-forest-500 font-mono"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-forest-700 uppercase tracking-wider">Operational Location</label>
              <input
                type="text"
                required
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full text-xs p-3 bg-forest-50/50 dark:bg-forest-900 border border-forest-100 dark:border-forest-900 rounded-xl outline-none focus:border-forest-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-forest-700 uppercase tracking-wider">Company Description</label>
              <textarea
                rows={4}
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full text-xs p-3 bg-forest-50/50 dark:bg-forest-900 border border-forest-100 dark:border-forest-900 rounded-xl outline-none focus:border-forest-500"
              ></textarea>
            </div>

            <div className="flex justify-between items-center pt-4 border-t border-forest-100/10 dark:border-forest-900/20">
              <span className="text-[10px] text-forest-700">
                Pembaruan profil segera diterapkan pada tayangan publik produk Anda.
              </span>
              <button
                type="submit"
                className="flex items-center gap-1.5 px-5 py-3 rounded-xl bg-forest-600 hover:bg-forest-700 text-white text-xs font-bold transition-all shadow-md"
              >
                {isSaved ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Saved Successfully</span>
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    <span>Save Company Profile</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Right Column: Verification Status & Certifications uploads (1 col) */}
        <div className="space-y-6">
          {/* Trust Panel */}
          <div className="p-6 bg-white dark:bg-forest-900/10 rounded-2xl border border-forest-100/20 dark:border-forest-900/20 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-forest-950 dark:text-white uppercase tracking-wider">
              Verification Badge
            </h3>

            {myCompany.isVerified ? (
              <div className="p-4 rounded-xl bg-gold-400/10 border border-gold-400/30 space-y-3">
                <div className="flex items-center gap-2 text-gold-600">
                  <ShieldCheck className="w-5 h-5 fill-current" />
                  <span className="text-xs font-extrabold uppercase tracking-wide">VERIFIED EXPORTER</span>
                </div>
                <p className="text-[10px] text-gold-900 dark:text-gold-300 leading-relaxed">
                  Profil legalitas NIB dan NPWP koperasi Anda telah diaudit dan disetujui secara resmi oleh Disperindag Provinsi Jawa Barat. Badge hijau-emas tersemat pada listing publik Anda.
                </p>
              </div>
            ) : (
              <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 space-y-3">
                <div className="flex items-center gap-2 text-amber-600">
                  <FileText className="w-5 h-5" />
                  <span className="text-xs font-extrabold uppercase tracking-wide">UNDER AUDIT</span>
                </div>
                <p className="text-[10px] text-amber-900 dark:text-amber-400/90 leading-relaxed">
                  Dokumen legalitas Anda sedang mengantre verifikasi. Anda dapat meninjau/menyetujui pengajuan ini secara manual dengan beralih peran ke **Super Admin** di dashboard ini.
                </p>
              </div>
            )}
          </div>

          {/* Certifications uploads */}
          <div className="p-6 bg-white dark:bg-forest-900/10 rounded-2xl border border-forest-100/20 dark:border-forest-900/20 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-forest-950 dark:text-white uppercase tracking-wider">
              Verify Certifications
            </h3>
            
            <div className="space-y-3.5">
              {certs.map((c, i) => (
                <div
                  key={c.name}
                  className="p-3.5 rounded-xl border border-forest-100/10 dark:border-forest-900/20 space-y-2 text-xs"
                >
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-forest-900 dark:text-white">{c.name}</span>
                    {c.uploaded ? (
                      <span className="px-2 py-0.5 rounded bg-forest-600/10 text-forest-600 text-[9px] font-semibold flex items-center gap-1">
                        <Check className="w-3 h-3" />
                        <span>Uploaded</span>
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded bg-red-500/10 text-red-500 text-[9px] font-semibold">
                        Missing
                      </span>
                    )}
                  </div>

                  {c.uploaded ? (
                    <p className="text-[10px] font-mono text-forest-700 truncate max-w-full">
                      {c.filename}
                    </p>
                  ) : (
                    <button
                      onClick={() => handleUploadSimulate(i)}
                      className="w-full flex items-center justify-center gap-1.5 py-1.5 rounded bg-forest-50 hover:bg-forest-100 text-forest-600 text-[10px] font-bold border border-dashed border-forest-200/50"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      <span>Simulate Upload Proof (PDF)</span>
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
