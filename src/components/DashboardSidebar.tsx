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
  User,
  ShieldAlert,
} from "lucide-react";

export default function DashboardSidebar() {
  const { role, setRole } = useDemo();
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
    <aside className="w-64 glass border-r border-forest-100/20 dark:border-forest-900/20 flex flex-col min-h-screen">
      {/* Brand Header */}
      <div className="p-6 border-b border-forest-100/10 dark:border-forest-900/20">
        <Link href="/" className="flex items-center gap-2 group">
          <span className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-forest-700 via-forest-500 to-gold-500 bg-clip-text text-transparent">
            JABAR
          </span>
          <span className="text-[10px] uppercase tracking-widest font-semibold px-2 py-0.5 rounded bg-gold-400 text-gold-950">
            Portal
          </span>
        </Link>
        <p className="mt-2 text-[10px] uppercase font-bold tracking-widest text-forest-700 dark:text-forest-300">
          Role: {role === "admin" ? "Super Admin" : "UMKM Partner"}
        </p>
      </div>

      {/* Role Toggle Shortcut inside Sidebar */}
      <div className="px-4 py-3 border-b border-forest-100/10 dark:border-forest-900/20 bg-forest-50/20 dark:bg-forest-950/20">
        <button
          onClick={toggleRole}
          className="w-full flex items-center justify-between gap-2 px-3 py-2 rounded-lg text-xs font-semibold bg-white dark:bg-forest-900/40 border border-forest-100/50 hover:bg-forest-100/10 transition-all duration-200"
        >
          <div className="flex items-center gap-1.5 text-forest-800 dark:text-forest-200">
            {role === "admin" ? (
              <ShieldAlert className="w-3.5 h-3.5 text-amber-500" />
            ) : (
              <Briefcase className="w-3.5 h-3.5 text-forest-500" />
            )}
            <span>Switch to {role === "admin" ? "SME Portal" : "Admin Portal"}</span>
          </div>
        </button>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-4 py-6 space-y-1.5">
        {links.map((link) => {
          const isActive = pathname === link.href;
          const Icon = link.icon;
          return (
            <Link
              key={link.name}
              href={link.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                isActive
                  ? "bg-forest-700 text-white shadow-md shadow-forest-950/10 font-semibold"
                  : "text-forest-900 dark:text-forest-100 hover:bg-forest-200/60 dark:hover:bg-forest-800/40 hover:text-forest-950 dark:hover:text-white"
              }`}
            >
              <Icon className="w-4.5 h-4.5" />
              <span>{link.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer / Actions */}
      <div className="p-4 border-t border-forest-100/10 dark:border-forest-900/20">
        <Link
          href="/"
          className="w-full flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl border border-forest-400/50 hover:border-forest-600 hover:bg-forest-200/40 dark:hover:bg-forest-900/20 text-xs font-bold text-forest-800 dark:text-forest-300 transition-all duration-200"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Exit to Public Directory</span>
        </Link>
      </div>
    </aside>
  );
}
