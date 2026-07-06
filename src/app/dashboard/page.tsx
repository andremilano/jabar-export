"use client";

import React from "react";
import Link from "next/link";
import { useDemo } from "@/context/DemoContext";
import {
  ShoppingBag,
  Mail,
  ShieldCheck,
  Plus,
  ArrowRight,
  Building,
  FileText,
} from "lucide-react";

export default function DashboardOverview() {
  const { role, products, inquiries, companies } = useDemo();

  // Find company of current logged-in SME (Priangan Coffee Cooperative - comp-1)
  const myCompany = companies.find((c) => c.id === "comp-1") || companies[0];
  
  // SME Metrics
  const myProductsCount = products.filter((p) => p.companyId === myCompany.id).length;
  const myInquiries = inquiries.filter((inq) => inq.companyId === myCompany.id);
  const myInquiriesCount = myInquiries.length;

  // Admin Metrics
  const totalSmesCount = companies.length;
  const pendingCurationCount = companies.filter((c) => !c.isVerified).length;
  const totalInquiriesCount = inquiries.length;

  if (role === "admin") {
    // ADMIN DASHBOARD VIEW
    return (
      <div className="space-y-8 animate-in fade-in duration-300 font-sans">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#1C1917] font-serif">Admin Overview</h1>
          <p className="text-xs text-[#57534E] mt-1">Status and analytics for the Jabar Export Hub platform.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="p-6 bg-white rounded-[12px] border border-[#E7E5E4] border-b-2 border-b-[#D6D3D1] flex items-center justify-between">
            <div>
              <p className="text-[10px] font-bold text-[#A8A29E] uppercase tracking-widest">Total Registered SMEs</p>
              <h3 className="text-2xl font-bold text-[#1C1917] mt-1">{totalSmesCount}</h3>
            </div>
            <div className="p-3.5 rounded-[8px] bg-[#F5F5EB] text-[#166534]">
              <Building className="w-6 h-6" />
            </div>
          </div>

          {/* Card 2 */}
          <div className="p-6 bg-white rounded-[12px] border border-[#E7E5E4] border-b-2 border-b-[#D6D3D1] flex items-center justify-between">
            <div>
              <p className="text-[10px] font-bold text-[#A8A29E] uppercase tracking-widest">Pending Approvals</p>
              <h3 className="text-2xl font-bold text-[#1C1917] mt-1">{pendingCurationCount}</h3>
            </div>
            <div className="p-3.5 rounded-[8px] bg-[#FEF9C3] text-warning">
              <FileText className="w-6 h-6" />
            </div>
          </div>

          {/* Card 3 */}
          <div className="p-6 bg-white rounded-[12px] border border-[#E7E5E4] border-b-2 border-b-[#D6D3D1] flex items-center justify-between">
            <div>
              <p className="text-[10px] font-bold text-[#A8A29E] uppercase tracking-widest">Routed RFQs</p>
              <h3 className="text-2xl font-bold text-[#1C1917] mt-1">{totalInquiriesCount}</h3>
            </div>
            <div className="p-3.5 rounded-[8px] bg-[#F0FDF4] text-cyan-700">
              <Mail className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Pending Curation Table */}
        <div className="p-6 bg-white rounded-[12px] border border-[#E7E5E4] border-b-2 border-b-[#D6D3D1]">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-sm font-bold text-[#1C1917] uppercase tracking-wider font-serif">
              Pending SME Registrations
            </h3>
            <Link
              href="/dashboard/curation"
              className="text-xs font-semibold text-[#A47148] hover:text-[#166534] flex items-center gap-1"
            >
              <span>Go to Curator Center</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#166534]" />
            </Link>
          </div>

          {pendingCurationCount > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead>
                  <tr className="border-b border-[#E7E5E4] text-[#57534E] font-bold uppercase tracking-wider">
                    <th className="py-3 px-4">Company Name</th>
                    <th className="py-3 px-4">Established</th>
                    <th className="py-3 px-4">Location</th>
                    <th className="py-3 px-4">NIB</th>
                    <th className="py-3 px-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {companies
                    .filter((c) => !c.isVerified)
                    .map((comp) => (
                      <tr key={comp.id} className="border-b border-[#E7E5E4] hover:bg-[#F5F5EB] transition-colors">
                        <td className="py-3.5 px-4 font-bold text-[#1C1917]">{comp.name}</td>
                        <td className="py-3.5 px-4 text-[#57534E]">{comp.establishedYear}</td>
                        <td className="py-3.5 px-4 text-[#57534E]">{comp.location}</td>
                        <td className="py-3.5 px-4 font-mono text-[11px] text-[#57534E]">{comp.nib}</td>
                        <td className="py-3.5 px-4 text-right">
                          <Link
                            href="/dashboard/curation"
                            className="btn-primary btn-sm text-[10px]"
                          >
                            Review Legal Docs
                          </Link>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="py-8 text-center text-[#57534E]">
              <ShieldCheck className="w-10 h-10 text-[#166534] mx-auto mb-2" />
              <p className="font-medium text-sm">All registered SMEs are curated and verified.</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  // SME PARTNER DASHBOARD VIEW
  return (
    <div className="space-y-8 animate-in fade-in duration-300 font-sans">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#1C1917] font-serif">
            Welcome back, {myCompany.name}!
          </h1>
          <p className="text-xs text-[#57534E] mt-1">Manage your catalog, certifications, and buyer RFQs.</p>
        </div>
        <Link
          href="/dashboard/products"
          className="btn-primary flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4 text-white" />
          <span>Add New Commodity</span>
        </Link>
      </div>

      {/* Verification Warning banner */}
      {!myCompany.isVerified && (
        <div className="p-4 rounded-[8px] bg-[#FEF9C3] border border-warning flex items-start gap-3">
          <FileText className="w-5 h-5 text-warning shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-bold text-warning">Verification Pending Approval</p>
            <p className="text-[11px] text-[#A47148] mt-1 leading-normal">
              Profil legalitas perusahaan Anda masih dalam proses peninjauan kurasi Admin. Untuk demo ini, Anda dapat beralih peran menjadi Admin dan menyetujui dokumen legalitas Anda sendiri di menu **&quot;Curation &amp; Approvals&quot;**!
            </p>
          </div>
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1 */}
        <div className="p-6 bg-white rounded-[12px] border border-[#E7E5E4] border-b-2 border-b-[#D6D3D1] flex items-center justify-between">
          <div>
            <p className="text-[10px] font-bold text-[#A8A29E] uppercase tracking-widest">Active Commodities</p>
            <h3 className="text-2xl font-bold text-[#1C1917] mt-1">{myProductsCount}</h3>
          </div>
          <div className="p-3.5 rounded-[8px] bg-[#F5F5EB] text-[#166534]">
            <ShoppingBag className="w-6 h-6" />
          </div>
        </div>

        {/* Card 2 */}
        <div className="p-6 bg-white rounded-[12px] border border-[#E7E5E4] border-b-2 border-b-[#D6D3D1] flex items-center justify-between">
          <div>
            <p className="text-[10px] font-bold text-[#A8A29E] uppercase tracking-widest">Total Inquiries Received</p>
            <h3 className="text-2xl font-bold text-[#1C1917] mt-1">{myInquiriesCount}</h3>
          </div>
          <div className="p-3.5 rounded-[8px] bg-[#F0FDF4] text-cyan-700">
            <Mail className="w-6 h-6" />
          </div>
        </div>

        {/* Card 3 */}
        <div className="p-6 bg-white rounded-[12px] border border-[#E7E5E4] border-b-2 border-b-[#D6D3D1] flex items-center justify-between">
          <div>
            <p className="text-[10px] font-bold text-[#A8A29E] uppercase tracking-widest">Export Trust Level</p>
            <div className="flex items-center gap-1.5 mt-1.5">
              {myCompany.isVerified ? (
                <>
                  <span className="text-xs font-bold text-[#166534] uppercase tracking-wider">VERIFIED EXPORTER</span>
                  <ShieldCheck className="w-5 h-5 text-[#166534]" />
                </>
              ) : (
                <span className="text-xs font-bold text-[#A47148] uppercase tracking-wider">UNDER REVIEW</span>
              )}
            </div>
          </div>
          <div className="p-3.5 rounded-[8px] bg-[#F5F5EB] text-[#166534]">
            <ShieldCheck className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Recent Inquiries List */}
      <div className="p-6 bg-white rounded-[12px] border border-[#E7E5E4] border-b-2 border-b-[#D6D3D1]">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-sm font-bold text-[#1C1917] uppercase tracking-wider font-serif">
            Recent Inquiries from International Buyers
          </h3>
          <Link
            href="/dashboard/inquiries"
            className="text-xs font-semibold text-[#A47148] hover:text-[#166534] flex items-center gap-1"
          >
            <span>Go to Inbox</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#166534]" />
          </Link>
        </div>

        {myInquiriesCount > 0 ? (
          <div className="space-y-4">
            {myInquiries.slice(0, 3).map((inq) => (
              <div
                key={inq.id}
                className="p-4 rounded-[8px] border border-[#E7E5E4] hover:bg-[#F5F5EB] transition-colors flex flex-col sm:flex-row justify-between sm:items-center gap-4 text-xs"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[#1C1917]">{inq.buyerName}</span>
                    <span className="text-[10px] text-[#A8A29E]">&bull;</span>
                    <span className="text-[#57534E] font-medium">{inq.country}</span>
                  </div>
                  <p className="text-[#57534E] mt-1 line-clamp-1">
                    Inquire: <span className="font-semibold text-[#1C1917]">{inq.productName}</span> ({inq.quantity} units)
                  </p>
                </div>
                <div className="flex items-center justify-between sm:justify-end gap-3 text-right">
                  <span className="text-[10px] text-[#57534E] font-medium">
                    {new Date(inq.createdAt).toLocaleDateString()}
                  </span>
                  <Link
                    href="/dashboard/inquiries"
                    className="btn-secondary btn-sm text-[10px]"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-8 text-center text-[#57534E]">
            <Mail className="w-10 h-10 text-[#A8A29E] mx-auto mb-2" />
            <p className="font-medium text-sm">No inquiries received yet.</p>
            <p className="text-[10px] text-[#A8A29E] mt-1">
              Cobalah untuk membuka detail produk di halaman direktori publik dan mengirimkan Request Quote!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
