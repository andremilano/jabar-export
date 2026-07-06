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
  Users,
  Compass,
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
      <div className="space-y-8 animate-in fade-in duration-300">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-forest-950 dark:text-white">Admin Overview</h1>
          <p className="text-xs text-forest-700 mt-1">Status and analytics for the Jabar Export Hub platform.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="p-6 bg-white dark:bg-forest-900/10 rounded-2xl border border-forest-100/20 dark:border-forest-900/20 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-[10px] font-bold text-forest-700 uppercase tracking-widest">Total Registered SMEs</p>
              <h3 className="text-2xl font-bold text-forest-950 dark:text-white mt-1">{totalSmesCount}</h3>
            </div>
            <div className="p-3.5 rounded-xl bg-forest-500/10 text-forest-600 dark:text-forest-700">
              <Building className="w-6 h-6" />
            </div>
          </div>

          {/* Card 2 */}
          <div className="p-6 bg-white dark:bg-forest-900/10 rounded-2xl border border-forest-100/20 dark:border-forest-900/20 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-[10px] font-bold text-forest-700 uppercase tracking-widest">Pending Approvals</p>
              <h3 className="text-2xl font-bold text-forest-950 dark:text-white mt-1">{pendingCurationCount}</h3>
            </div>
            <div className="p-3.5 rounded-xl bg-amber-500/10 text-amber-500">
              <FileText className="w-6 h-6" />
            </div>
          </div>

          {/* Card 3 */}
          <div className="p-6 bg-white dark:bg-forest-900/10 rounded-2xl border border-forest-100/20 dark:border-forest-900/20 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-[10px] font-bold text-forest-700 uppercase tracking-widest">Routed RFQs</p>
              <h3 className="text-2xl font-bold text-forest-950 dark:text-white mt-1">{totalInquiriesCount}</h3>
            </div>
            <div className="p-3.5 rounded-xl bg-blue-500/10 text-blue-500">
              <Mail className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Pending Curation Table */}
        <div className="p-6 bg-white dark:bg-forest-900/10 rounded-2xl border border-forest-100/20 dark:border-forest-900/20 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-sm font-bold text-forest-950 dark:text-white uppercase tracking-wider">
              Pending SME Registrations
            </h3>
            <Link
              href="/dashboard/curation"
              className="text-xs font-semibold text-gold-600 hover:text-gold-500 flex items-center gap-1"
            >
              <span>Go to Curator Center</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {pendingCurationCount > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead>
                  <tr className="border-b border-forest-100/10 dark:border-forest-900/20 text-forest-700 font-bold uppercase tracking-wider">
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
                      <tr key={comp.id} className="border-b border-forest-50/10 dark:border-forest-900/10 hover:bg-forest-50/20 dark:hover:bg-forest-900/20 transition-colors">
                        <td className="py-3.5 px-4 font-bold text-forest-900 dark:text-white">{comp.name}</td>
                        <td className="py-3.5 px-4">{comp.establishedYear}</td>
                        <td className="py-3.5 px-4">{comp.location}</td>
                        <td className="py-3.5 px-4 font-mono text-[11px]">{comp.nib}</td>
                        <td className="py-3.5 px-4 text-right">
                          <Link
                            href="/dashboard/curation"
                            className="px-3 py-1.5 rounded-lg bg-forest-600 hover:bg-forest-700 text-white font-bold text-[10px]"
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
            <div className="py-8 text-center text-forest-700">
              <ShieldCheck className="w-10 h-10 text-forest-800 mx-auto mb-2" />
              <p className="font-medium">All registered SMEs are curated and verified.</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  // SME PARTNER DASHBOARD VIEW
  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-forest-950 dark:text-white">
            Welcome back, {myCompany.name}!
          </h1>
          <p className="text-xs text-forest-700 mt-1">Manage your catalog, certifications, and buyer RFQs.</p>
        </div>
        <Link
          href="/dashboard/products"
          className="flex items-center gap-1 px-4 py-2.5 rounded-xl bg-forest-600 hover:bg-forest-700 text-white text-xs font-bold transition-all shadow-md"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Commodity</span>
        </Link>
      </div>

      {/* Verification Warning banner */}
      {!myCompany.isVerified && (
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-3">
          <FileText className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-bold text-amber-600">Verification Pending Approval</p>
            <p className="text-[11px] text-amber-700 dark:text-amber-400/90 mt-1 leading-normal">
              Profil legalitas perusahaan Anda masih dalam proses peninjauan kurasi Admin. Untuk demo ini, Anda dapat beralih peran menjadi Admin dan menyetujui dokumen legalitas Anda sendiri di menu **&quot;Curation &amp; Approvals&quot;**!
            </p>
          </div>
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1 */}
        <div className="p-6 bg-white dark:bg-forest-900/10 rounded-2xl border border-forest-100/20 dark:border-forest-900/20 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-[10px] font-bold text-forest-700 uppercase tracking-widest">Active Commodities</p>
            <h3 className="text-2xl font-bold text-forest-950 dark:text-white mt-1">{myProductsCount}</h3>
          </div>
          <div className="p-3.5 rounded-xl bg-forest-500/10 text-forest-600 dark:text-forest-700">
            <ShoppingBag className="w-6 h-6" />
          </div>
        </div>

        {/* Card 2 */}
        <div className="p-6 bg-white dark:bg-forest-900/10 rounded-2xl border border-forest-100/20 dark:border-forest-900/20 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-[10px] font-bold text-forest-700 uppercase tracking-widest">Total Inquiries Received</p>
            <h3 className="text-2xl font-bold text-forest-950 dark:text-white mt-1">{myInquiriesCount}</h3>
          </div>
          <div className="p-3.5 rounded-xl bg-blue-500/10 text-blue-500">
            <Mail className="w-6 h-6" />
          </div>
        </div>

        {/* Card 3 */}
        <div className="p-6 bg-white dark:bg-forest-900/10 rounded-2xl border border-forest-100/20 dark:border-forest-900/20 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-[10px] font-bold text-forest-700 uppercase tracking-widest">Export Trust Level</p>
            <div className="flex items-center gap-1.5 mt-1.5">
              {myCompany.isVerified ? (
                <>
                  <span className="text-xs font-bold text-gold-500 uppercase tracking-wider">VERIFIED EXPORTER</span>
                  <ShieldCheck className="w-5 h-5 text-gold-500 fill-gold-500/10" />
                </>
              ) : (
                <span className="text-xs font-bold text-forest-700 uppercase tracking-wider">UNDER REVIEW</span>
              )}
            </div>
          </div>
          <div className="p-3.5 rounded-xl bg-gold-500/10 text-gold-500">
            <ShieldCheck className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Recent Inquiries List */}
      <div className="p-6 bg-white dark:bg-forest-900/10 rounded-2xl border border-forest-100/20 dark:border-forest-900/20 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-sm font-bold text-forest-950 dark:text-white uppercase tracking-wider">
            Recent Inquiries from International Buyers
          </h3>
          <Link
            href="/dashboard/inquiries"
            className="text-xs font-semibold text-forest-600 dark:text-forest-700 hover:text-gold-500 flex items-center gap-1"
          >
            <span>Go to Inbox</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {myInquiriesCount > 0 ? (
          <div className="space-y-4">
            {myInquiries.slice(0, 3).map((inq) => (
              <div
                key={inq.id}
                className="p-4 rounded-xl border border-forest-100/10 dark:border-forest-900/20 hover:bg-forest-50/20 dark:hover:bg-forest-900/10 transition-colors flex flex-col sm:flex-row justify-between sm:items-center gap-4 text-xs"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-forest-950 dark:text-white">{inq.buyerName}</span>
                    <span className="text-[10px] text-forest-700">&bull;</span>
                    <span className="text-forest-800 font-medium">{inq.country}</span>
                  </div>
                  <p className="text-forest-600 dark:text-forest-800 mt-1 line-clamp-1">
                    Inquire: <span className="font-semibold text-forest-800 dark:text-white">{inq.productName}</span> ({inq.quantity} units)
                  </p>
                </div>
                <div className="flex items-center justify-between sm:justify-end gap-3 text-right">
                  <span className="text-[10px] text-forest-700 font-medium">
                    {new Date(inq.createdAt).toLocaleDateString()}
                  </span>
                  <Link
                    href="/dashboard/inquiries"
                    className="px-3 py-1.5 rounded-lg bg-forest-50 hover:bg-forest-600 dark:bg-forest-900/50 hover:text-white text-forest-600 dark:text-forest-700 text-[10px] font-bold"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-8 text-center text-forest-700">
            <Mail className="w-10 h-10 text-forest-800 mx-auto mb-2" />
            <p className="font-medium">No inquiries received yet.</p>
            <p className="text-[10px] text-forest-700 mt-1">
              Cobalah untuk membuka detail produk di halaman direktori publik dan mengirimkan Request Quote!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
