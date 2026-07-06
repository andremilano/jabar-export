"use client";

import React, { useState } from "react";
import { useDemo } from "@/context/DemoContext";
import { Building, ShieldCheck, FileText, Check, Upload, Save } from "lucide-react";

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
    myCompany.name = name;
    myCompany.establishedYear = Number(establishedYear);
    myCompany.location = location;
    myCompany.nib = nib;
    myCompany.npwp = npwp;
    myCompany.description = description;

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
    
    if (myCompany.isVerified) {
      updateCompanyVerification(myCompany.id, false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300 font-sans">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-[#1C1917] font-serif">Profile &amp; Capacity</h1>
        <p className="text-xs text-[#57534E] mt-1">Manage company details, verification NIB/NPWP, and uploads.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Form Details (2 cols) */}
        <div className="lg:col-span-2 space-y-6">
          <form onSubmit={handleSaveProfile} className="p-6 bg-white rounded-[12px] border border-[#E7E5E4] border-b-2 border-b-[#D6D3D1] space-y-6">
            <h3 className="text-sm font-bold text-[#1C1917] uppercase tracking-wider flex items-center gap-2 font-serif">
              <Building className="w-5 h-5 text-[#166534]" />
              <span>Company Legal Identity</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="input-label">Company Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="input-text"
                />
              </div>
              <div className="space-y-1">
                <label className="input-label">Established Year</label>
                <input
                  type="number"
                  required
                  value={establishedYear}
                  onChange={(e) => setEstablishedYear(e.target.value)}
                  className="input-text"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="input-label">NIB (Nomor Induk Berusaha)</label>
                <input
                  type="text"
                  required
                  value={nib}
                  onChange={(e) => setNib(e.target.value)}
                  className="input-text font-mono"
                />
              </div>
              <div className="space-y-1">
                <label className="input-label">NPWP Perusahaan</label>
                <input
                  type="text"
                  required
                  value={npwp}
                  onChange={(e) => setNpwp(e.target.value)}
                  className="input-text font-mono"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="input-label">Operational Location</label>
              <input
                type="text"
                required
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="input-text"
              />
            </div>

            <div className="space-y-1">
              <label className="input-label">Company Description</label>
              <textarea
                rows={4}
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="input-text h-auto py-3"
              ></textarea>
            </div>

            <div className="flex justify-between items-center pt-4 border-t border-[#E7E5E4]">
              <span className="text-[10px] text-[#A8A29E]">
                Pembaruan profil segera diterapkan pada tayangan publik produk Anda.
              </span>
              <button
                type="submit"
                className="btn-primary flex items-center gap-1.5 px-5 py-3 cursor-pointer"
              >
                {isSaved ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Saved Successfully</span>
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-1 text-white" />
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
          <div className="p-6 bg-white rounded-[12px] border border-[#E7E5E4] border-b-[3px] border-b-[#A8A29E] space-y-4">
            <h3 className="text-sm font-bold text-[#1C1917] uppercase tracking-wider font-serif">
              Verification Badge
            </h3>

            {myCompany.isVerified ? (
              <div className="p-4 rounded-[8px] bg-[#DCFCE7] border border-[#86EFAC] space-y-3 text-[#166534]">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 fill-current text-[#166534]" />
                  <span className="text-xs font-extrabold uppercase tracking-wide">VERIFIED EXPORTER</span>
                </div>
                <p className="text-[10px] leading-relaxed text-[#166534]">
                  Profil legalitas NIB dan NPWP koperasi Anda telah diaudit dan disetujui secara resmi oleh Disperindag Provinsi Jawa Barat. Badge hijau-emas tersemat pada listing publik Anda.
                </p>
              </div>
            ) : (
              <div className="p-4 rounded-[8px] bg-[#FEF9C3] border border-warning space-y-3 text-warning">
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-warning" />
                  <span className="text-xs font-extrabold uppercase tracking-wide">UNDER AUDIT</span>
                </div>
                <p className="text-[10px] leading-relaxed text-warning">
                  Dokumen legalitas Anda sedang mengantre verifikasi. Anda dapat meninjau/menyetujui pengajuan ini secara manual dengan beralih peran ke **Super Admin** di dashboard ini.
                </p>
              </div>
            )}
          </div>

          {/* Certifications uploads */}
          <div className="p-6 bg-white rounded-[12px] border border-[#E7E5E4] border-b-[3px] border-b-[#A8A29E] space-y-4">
            <h3 className="text-sm font-bold text-[#1C1917] uppercase tracking-wider font-serif">
              Verify Certifications
            </h3>
            
            <div className="space-y-3.5">
              {certs.map((c, i) => (
                <div
                  key={c.name}
                  className="p-3.5 rounded-[8px] border border-[#E7E5E4] space-y-2 text-xs font-sans"
                >
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-[#1C1917]">{c.name}</span>
                    {c.uploaded ? (
                      <span className="px-2 py-0.5 rounded-[4px] bg-[#DCFCE7] text-[#166534] border border-[#86EFAC] text-[9px] font-semibold flex items-center gap-1">
                        <Check className="w-3 h-3 text-[#166534]" />
                        <span>Uploaded</span>
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-[4px] bg-[#FEE2E2] text-error border border-[#FCA5A5] text-[9px] font-semibold">
                        Missing
                      </span>
                    )}
                  </div>

                  {c.uploaded ? (
                    <p className="text-[10px] font-mono text-[#57534E] truncate max-w-full">
                      {c.filename}
                    </p>
                  ) : (
                    <button
                      onClick={() => handleUploadSimulate(i)}
                      className="w-full flex items-center justify-center gap-1.5 py-1.5 rounded-[8px] bg-[#F5F5EB] hover:bg-[#E7E5E4] text-[#166534] text-[10px] font-bold border border-dashed border-[#D6D3D1] cursor-pointer"
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
