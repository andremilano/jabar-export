"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useDemo, Role } from "@/context/DemoContext";
import {
  LayoutDashboard,
  ShoppingBag,
  Building,
  Mail,
  ShieldCheck,
  ArrowLeft,
  Briefcase,
  ShieldAlert,
  User,
} from "lucide-react";

export default function DashboardSidebar() {
  const { role, setRole, currentUser, logout } = useDemo();
  const pathname = usePathname();
  const router = useRouter();

  const getSmeLinks = () => [
    { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
    { name: "My Products", href: "/dashboard/products", icon: ShoppingBag },
    { name: "Profile & Capacity", href: "/dashboard/profile", icon: Building },
    { name: "Inbox Inquiries", href: "/dashboard/inquiries", icon: Mail },
  ];

  const getAdminLinks = () => [
    { name: "Admin Overview", href: "/dashboard", icon: LayoutDashboard },
    { name: "Curation & Approvals", href: "/dashboard/curation", icon: ShieldCheck },
  ];

  const links = role === "admin" ? getAdminLinks() : getSmeLinks();

  const toggleRole = () => {
    const nextRole = role === "sme" ? "admin" : "sme";
    setRole(nextRole);
    router.push("/dashboard");
  };

  return (
    <aside className="w-64 glass border-r border-[#D6D3D1] flex flex-col min-h-screen bg-white">
      {/* Brand Header */}
      <div className="p-6 border-b border-[#E7E5E4]">
        <Link href="/" className="flex items-center gap-2 group">
          <span className="text-2xl font-extrabold tracking-tight text-[#166534] font-serif">
            JABAR
          </span>
          <span className="text-[10px] uppercase tracking-widest font-semibold px-2 py-0.5 rounded-[4px] bg-[#A47148] text-white">
            Portal
          </span>
        </Link>
        <p className="mt-2 text-[10px] uppercase font-bold tracking-widest text-[#57534E]">
          Role: {role === "admin" ? "Super Admin" : "UMKM Partner"}
        </p>
      </div>

      {/* Role Toggle Shortcut inside Sidebar - ONLY FOR ADMIN */}
      {currentUser && currentUser.role === "admin" && (
        <div className="px-4 py-3 border-b border-[#E7E5E4] bg-[#F5F5EB]">
          <button
            onClick={toggleRole}
            className="w-full flex items-center justify-between gap-2 px-3 py-2 rounded-[8px] bg-white border border-[#D6D3D1] hover:bg-[#F5F5EB] cursor-pointer transition-all duration-200"
          >
            <div className="flex items-center gap-1.5 text-[#1C1917]">
              {role === "admin" ? (
                <ShieldAlert className="w-3.5 h-3.5 text-amber-600" />
              ) : (
                <Briefcase className="w-3.5 h-3.5 text-[#166534]" />
              )}
              <span className="text-xs font-semibold">Switch to {role === "admin" ? "SME Portal" : "Admin Portal"}</span>
            </div>
          </button>
        </div>
      )}

      {/* Navigation Links */}
      <nav className="flex-1 px-4 py-6 space-y-1.5">
        {links.map((link) => {
          const isActive = pathname === link.href;
          const Icon = link.icon;
          return (
            <Link
              key={link.name}
              href={link.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-[12px] text-sm font-medium transition-all duration-200 ${
                isActive
                  ? "bg-[#166534] text-white font-semibold"
                  : "text-[#57534E] hover:bg-[#F5F5EB] hover:text-[#1C1917]"
              }`}
            >
              <Icon className="w-4.5 h-4.5" />
              <span>{link.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Profile & Logout Action inside Sidebar */}
      {currentUser && (
        <div className="p-4 border-t border-[#E7E5E4] bg-[#FAFAF5]">
          <div className="flex items-center gap-2.5 mb-3">
            <div className="p-1.5 rounded-full bg-[#166534]/10 text-[#166534]">
              <User className="w-4 h-4 animate-in fade-in" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold text-[#1C1917] truncate">{currentUser.name}</p>
              <p className="text-[9px] text-[#57534E] truncate mt-0.5">{currentUser.email}</p>
            </div>
          </div>
          <button
            onClick={() => {
              logout();
              router.push("/");
            }}
            className="w-full flex items-center justify-center gap-1.5 px-3 py-2 rounded-[8px] border border-red-200 hover:bg-red-50 text-[11px] font-bold text-[#B91C1C] cursor-pointer transition-all duration-200 bg-white"
          >
            <ShieldAlert className="w-3.5 h-3.5 text-[#B91C1C]" />
            <span>Keluar (Log Out)</span>
          </button>
        </div>
      )}

      {/* Footer / Actions */}
      <div className="p-4 border-t border-[#E7E5E4]">
        <Link
          href="/"
          className="w-full flex items-center justify-center gap-2 px-4 py-3.5 rounded-[12px] border border-[#A8A29E] hover:border-[#166534] hover:bg-[#F5F5EB] text-xs font-bold text-[#1C1917] cursor-pointer transition-all duration-200"
        >
          <ArrowLeft className="w-4 h-4 text-[#166534]" />
          <span>Exit to Public Directory</span>
        </Link>
      </div>
    </aside>
  );
}
