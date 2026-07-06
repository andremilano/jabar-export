"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useDemo, Role } from "@/context/DemoContext";
import { Menu, X, Globe, User, ShieldAlert, Briefcase, ChevronDown } from "lucide-react";

export default function Navbar() {
  const { role, setRole } = useDemo();
  const [isOpen, setIsOpen] = useState(false);
  const [showRoleDropdown, setShowRoleDropdown] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const handleRoleChange = (newRole: Role) => {
    setRole(newRole);
    setShowRoleDropdown(false);
    
    // Redirect to dashboard if switching to SME or Admin and currently on dashboard
    if (pathname.startsWith("/dashboard")) {
      if (newRole === "buyer") {
        router.push("/");
      } else {
        router.push("/dashboard");
      }
    }
  };

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Directory", href: "/directory" },
  ];

  const getRoleBadgeColor = (r: Role) => {
    switch (r) {
      case "admin":
        return "bg-amber-500/10 text-amber-500 border border-amber-500/30";
      case "sme":
        return "bg-forest-500/10 text-forest-800 border border-forest-500/30";
      default:
        return "bg-blue-500/10 text-blue-500 border border-blue-500/30";
    }
  };

  const getRoleLabel = (r: Role) => {
    switch (r) {
      case "admin": return "Super Admin";
      case "sme": return "UMKM Partner";
      default: return "International Buyer";
    }
  };

  return (
    <nav className="sticky top-0 z-50 w-full glass border-b border-forest-100/20 dark:border-forest-900/20 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center gap-2 group">
              <span className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-forest-700 via-forest-500 to-gold-500 bg-clip-text text-transparent group-hover:opacity-95 transition-opacity">
                JABAR
              </span>
              <span className="text-xs uppercase tracking-widest font-semibold px-2 py-0.5 rounded bg-gold-400 text-gold-950 font-sans shadow-sm">
                Export Hub
              </span>
            </Link>
          </div>

          {/* Navigation Links (Desktop) */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-sm font-medium tracking-wide transition-colors duration-200 hover:text-gold-500 ${
                    isActive
                      ? "text-forest-700 dark:text-forest-800 font-semibold border-b-2 border-forest-600 dark:border-forest-400 pb-1"
                      : "text-forest-800 dark:text-forest-700"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* Demo Control & CTA Buttons (Desktop) */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Demo Role Switcher */}
            <div className="relative">
              <button
                onClick={() => setShowRoleDropdown(!showRoleDropdown)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold glass border border-forest-100/50 hover:bg-forest-100/10 transition-all duration-200"
                title="Switch user role for testing"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-gold-500"></span>
                </span>
                <span>Role: </span>
                <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider ${getRoleBadgeColor(role)}`}>
                  {getRoleLabel(role)}
                </span>
                <ChevronDown className="w-3 h-3 text-forest-600 dark:text-forest-700" />
              </button>

              {showRoleDropdown && (
                <div className="absolute right-0 mt-2 w-56 rounded-xl shadow-xl bg-white dark:bg-forest-950 border border-forest-100/20 dark:border-forest-900/30 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="px-3 py-2 border-b border-forest-100/10 dark:border-forest-900/20">
                    <p className="text-[10px] font-bold text-forest-700 uppercase tracking-widest">
                      Switch Demo Persona
                    </p>
                  </div>
                  <button
                    onClick={() => handleRoleChange("buyer")}
                    className={`w-full text-left px-4 py-2.5 text-xs font-medium flex items-center gap-2 hover:bg-forest-50 dark:hover:bg-forest-900/40 transition-colors ${
                      role === "buyer" ? "text-forest-700 font-semibold bg-forest-50/50 dark:bg-forest-900/20" : "text-forest-600 dark:text-forest-800"
                    }`}
                  >
                    <Globe className="w-4 h-4 text-blue-500" />
                    <span>International Buyer (Public)</span>
                  </button>
                  <button
                    onClick={() => handleRoleChange("sme")}
                    className={`w-full text-left px-4 py-2.5 text-xs font-medium flex items-center gap-2 hover:bg-forest-50 dark:hover:bg-forest-900/40 transition-colors ${
                      role === "sme" ? "text-forest-700 font-semibold bg-forest-50/50 dark:bg-forest-900/20" : "text-forest-600 dark:text-forest-800"
                    }`}
                  >
                    <Briefcase className="w-4 h-4 text-forest-800" />
                    <span>UMKM Partner (Dashboard)</span>
                  </button>
                  <button
                    onClick={() => handleRoleChange("admin")}
                    className={`w-full text-left px-4 py-2.5 text-xs font-medium flex items-center gap-2 hover:bg-forest-50 dark:hover:bg-forest-900/40 transition-colors ${
                      role === "admin" ? "text-forest-700 font-semibold bg-forest-50/50 dark:bg-forest-900/20" : "text-forest-600 dark:text-forest-800"
                    }`}
                  >
                    <ShieldAlert className="w-4 h-4 text-amber-500" />
                    <span>Super Admin (Dashboard)</span>
                  </button>
                </div>
              )}
            </div>

            {/* Dashboard Access / Login Button */}
            {role === "buyer" ? (
              <button
                onClick={() => handleRoleChange("sme")}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-forest-600 hover:bg-forest-700 text-white text-xs font-bold transition-all shadow-md shadow-forest-900/10 hover:shadow-forest-950/20"
              >
                <User className="w-4 h-4" />
                <span>Partner Portal</span>
              </button>
            ) : (
              <Link
                href="/dashboard"
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-forest-600 to-forest-700 hover:from-forest-700 hover:to-forest-800 text-white text-xs font-bold transition-all shadow-md shadow-forest-900/10"
              >
                <Briefcase className="w-4 h-4" />
                <span>Go to Dashboard</span>
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-3">
            {/* Short role status badge for mobile */}
            <span className={`px-2 py-0.5 rounded text-[9px] uppercase font-bold tracking-wider ${getRoleBadgeColor(role)}`}>
              {role === "admin" ? "Admin" : role === "sme" ? "SME" : "Buyer"}
            </span>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-lg text-forest-600 dark:text-forest-800 hover:bg-forest-100/10 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden glass border-t border-forest-100/20 dark:border-forest-900/20 animate-in slide-in-from-top duration-300">
          <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`block px-3 py-2.5 rounded-lg text-base font-medium ${
                    isActive
                      ? "bg-forest-600 text-white font-semibold"
                      : "text-forest-700 dark:text-forest-800 hover:bg-forest-100/10"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
            
            {/* Mobile Role Switching */}
            <div className="pt-4 pb-2 border-t border-forest-100/10 dark:border-forest-900/20">
              <p className="px-3 text-xs font-bold text-forest-700 uppercase tracking-widest mb-2">
                Demo Personas
              </p>
              <div className="grid grid-cols-3 gap-2 px-3">
                <button
                  onClick={() => {
                    handleRoleChange("buyer");
                    setIsOpen(false);
                  }}
                  className={`py-2 px-1 rounded-lg text-[10px] font-bold text-center border transition-all ${
                    role === "buyer"
                      ? "bg-blue-500/10 border-blue-500/40 text-blue-600"
                      : "border-forest-100/30 text-forest-600 dark:text-forest-800"
                  }`}
                >
                  Buyer
                </button>
                <button
                  onClick={() => {
                    handleRoleChange("sme");
                    setIsOpen(false);
                  }}
                  className={`py-2 px-1 rounded-lg text-[10px] font-bold text-center border transition-all ${
                    role === "sme"
                      ? "bg-forest-500/10 border-forest-500/40 text-forest-600"
                      : "border-forest-100/30 text-forest-600 dark:text-forest-800"
                  }`}
                >
                  SME Partner
                </button>
                <button
                  onClick={() => {
                    handleRoleChange("admin");
                    setIsOpen(false);
                  }}
                  className={`py-2 px-1 rounded-lg text-[10px] font-bold text-center border transition-all ${
                    role === "admin"
                      ? "bg-amber-500/10 border-amber-500/40 text-amber-600"
                      : "border-forest-100/30 text-forest-600 dark:text-forest-800"
                  }`}
                >
                  Admin
                </button>
              </div>
            </div>

            {/* Mobile CTA */}
            <div className="pt-2 px-3">
              {role === "buyer" ? (
                <button
                  onClick={() => {
                    handleRoleChange("sme");
                    setIsOpen(false);
                  }}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-forest-600 text-white text-sm font-bold shadow-md"
                >
                  <User className="w-4 h-4" />
                  <span>UMKM Partner Portal</span>
                </button>
              ) : (
                <Link
                  href="/dashboard"
                  onClick={() => setIsOpen(false)}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-gradient-to-r from-forest-600 to-forest-700 text-white text-sm font-bold shadow-md"
                >
                  <Briefcase className="w-4 h-4" />
                  <span>Go to Dashboard</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
