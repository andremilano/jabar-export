"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useDemo, Role } from "@/context/DemoContext";
import { Menu, X, Globe, User, ShieldAlert, Briefcase, ChevronDown, LayoutDashboard } from "lucide-react";

export default function Navbar() {
  const { role, setRole, currentUser, logout } = useDemo();
  const [isOpen, setIsOpen] = useState(false);
  const [showRoleDropdown, setShowRoleDropdown] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const handleRoleChange = (newRole: Role) => {
    setRole(newRole);
    setShowRoleDropdown(false);
    
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
        return "bg-amber-50 text-amber-700 border border-amber-300";
      case "sme":
        return "bg-forest-100 text-forest-700 border border-forest-300";
      default:
        return "bg-cyan-50 text-cyan-700 border border-cyan-300";
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
    <nav className="sticky top-0 z-50 w-full glass border-b border-[#D6D3D1] transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="shrink-0 flex items-center">
            <Link href="/" className="flex items-center gap-2 group">
              <span className="text-3xl font-extrabold tracking-tight text-[#166534] font-serif group-hover:opacity-95 transition-opacity">
                JABAR
              </span>
              <span className="text-[10px] uppercase tracking-widest font-bold px-2 py-0.5 rounded-[4px] bg-[#A47148] text-white font-sans">
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
                  className={`text-sm font-medium tracking-wide transition-colors duration-200 hover:text-[#166534] ${
                    isActive
                      ? "text-[#166534] font-semibold border-b-2 border-[#166534] pb-1"
                      : "text-[#57534E]"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* User Control & CTA Buttons (Desktop) */}
          <div className="hidden md:flex items-center space-x-4">
            {currentUser ? (
              <>
                {/* Demo Role Switcher - ONLY FOR ADMIN */}
                {currentUser.role === "admin" && (
                  <div className="relative">
                    <button
                      onClick={() => setShowRoleDropdown(!showRoleDropdown)}
                      className="flex items-center gap-2 px-3 py-1.5 rounded-[8px] text-xs font-semibold bg-white border border-[#D6D3D1] hover:bg-[#F5F5EB] transition-all duration-200 cursor-pointer text-[#1C1917]"
                      title="Ganti persona simulasi (Khusus Admin)"
                    >
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#A47148] opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-[#A47148]"></span>
                      </span>
                      <span>Role Active: </span>
                      <span className={`px-2 py-0.5 rounded-[4px] text-[10px] uppercase font-bold tracking-wider ${getRoleBadgeColor(role)}`}>
                        {getRoleLabel(role)}
                      </span>
                      <ChevronDown className="w-3 h-3 text-[#57534E]" />
                    </button>

                    {showRoleDropdown && (
                      <div className="absolute right-0 mt-2 w-56 rounded-[12px] bg-white border border-[#D6D3D1] border-b-[3px] border-b-[#A8A29E] py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                        <div className="px-3 py-2 border-b border-[#E7E5E4]">
                          <p className="text-[10px] font-bold text-[#A8A29E] uppercase tracking-widest">
                            Ganti Role (Admin Only)
                          </p>
                        </div>
                        <button
                          onClick={() => handleRoleChange("buyer")}
                          className={`w-full text-left px-4 py-2.5 text-xs font-medium flex items-center gap-2 hover:bg-[#F5F5EB] cursor-pointer transition-colors ${
                            role === "buyer" ? "text-[#166534] font-semibold bg-[#F0FDF4] border-l-[3px] border-l-[#166534]" : "text-[#57534E]"
                          }`}
                        >
                          <Globe className="w-4 h-4 text-cyan-600" />
                          <span>International Buyer (Public)</span>
                        </button>
                        <button
                          onClick={() => handleRoleChange("sme")}
                          className={`w-full text-left px-4 py-2.5 text-xs font-medium flex items-center gap-2 hover:bg-[#F5F5EB] cursor-pointer transition-colors ${
                            role === "sme" ? "text-[#166534] font-semibold bg-[#F0FDF4] border-l-[3px] border-l-[#166534]" : "text-[#57534E]"
                          }`}
                        >
                          <Briefcase className="w-4 h-4 text-[#166534]" />
                          <span>UMKM Partner (Dashboard)</span>
                        </button>
                        <button
                          onClick={() => handleRoleChange("admin")}
                          className={`w-full text-left px-4 py-2.5 text-xs font-medium flex items-center gap-2 hover:bg-[#F5F5EB] cursor-pointer transition-colors ${
                            role === "admin" ? "text-[#166534] font-semibold bg-[#F0FDF4] border-l-[3px] border-l-[#166534]" : "text-[#57534E]"
                          }`}
                        >
                          <ShieldAlert className="w-4 h-4 text-amber-600" />
                          <span>Super Admin (Dashboard)</span>
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {/* User Dropdown Menu */}
                <div className="relative">
                  <button
                    onClick={() => setShowUserDropdown(!showUserDropdown)}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-[8px] text-xs font-semibold bg-[#F5F5EB] border border-[#D6D3D1] hover:bg-[#E7E5E4] text-[#1C1917] transition-all duration-200 cursor-pointer"
                  >
                    <User className="w-4 h-4 text-[#166534]" />
                    <span>{currentUser.name}</span>
                    {currentUser.role !== "admin" && (
                      <span className={`px-1.5 py-0.5 rounded-[3px] text-[8px] uppercase font-extrabold tracking-wider ${getRoleBadgeColor(currentUser.role)}`}>
                        {currentUser.role === "sme" ? "SME" : "Buyer"}
                      </span>
                    )}
                    <ChevronDown className="w-3.5 h-3.5 text-[#57534E]" />
                  </button>

                  {showUserDropdown && (
                    <div className="absolute right-0 mt-2 w-60 rounded-[12px] bg-white border border-[#D6D3D1] border-b-[3px] border-b-[#A8A29E] py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                      <div className="px-4 py-2.5 border-b border-[#E7E5E4]">
                        <p className="text-xs font-bold text-[#1C1917] truncate">{currentUser.name}</p>
                        <p className="text-[10px] text-[#57534E] truncate mt-0.5">{currentUser.email}</p>
                      </div>
                      
                      {currentUser.role !== "buyer" && (
                        <Link
                          href="/dashboard"
                          onClick={() => setShowUserDropdown(false)}
                          className="w-full text-left px-4 py-2 text-xs font-medium text-[#1C1917] hover:bg-[#F5F5EB] flex items-center gap-2 cursor-pointer transition-colors"
                        >
                          <LayoutDashboard className="w-4 h-4 text-[#166534]" />
                          <span>Ke Dashboard</span>
                        </Link>
                      )}

                      <button
                        onClick={() => {
                          logout();
                          setShowUserDropdown(false);
                          router.push("/");
                        }}
                        className="w-full text-left px-4 py-2 text-xs font-medium text-[#B91C1C] hover:bg-red-50 flex items-center gap-2 cursor-pointer transition-colors border-none"
                      >
                        <ShieldAlert className="w-4 h-4 text-[#B91C1C]" />
                        <span>Keluar (Log Out)</span>
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              /* If not logged in, show Sign In button */
              <Link
                href="/login"
                className="btn-primary flex items-center gap-2 text-xs"
              >
                <User className="w-4 h-4" />
                <span>Masuk Partner</span>
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-3">
            {/* Short role status badge for mobile */}
            <span className={`px-2 py-0.5 rounded-[4px] text-[9px] uppercase font-bold tracking-wider ${getRoleBadgeColor(role)}`}>
              {role === "admin" ? "Admin" : role === "sme" ? "SME" : "Buyer"}
            </span>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-[8px] text-[#166534] hover:bg-[#F5F5EB] focus:outline-none cursor-pointer"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden glass border-t border-[#D6D3D1] animate-in slide-in-from-top duration-300">
          <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`block px-3 py-2.5 rounded-[8px] text-base font-medium ${
                    isActive
                      ? "bg-[#166534] text-white font-semibold"
                      : "text-[#57534E] hover:bg-[#F5F5EB]"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
            
            {/* Mobile Role Switching - ONLY FOR ADMIN */}
            {currentUser && currentUser.role === "admin" && (
              <div className="pt-4 pb-2 border-t border-[#E7E5E4]">
                <p className="px-3 text-xs font-bold text-[#A8A29E] uppercase tracking-widest mb-2">
                  Ganti Active Role (Admin Only)
                </p>
                <div className="grid grid-cols-3 gap-2 px-3">
                  <button
                    onClick={() => {
                      handleRoleChange("buyer");
                      setIsOpen(false);
                    }}
                    className={`py-2 px-1 rounded-[8px] text-[10px] font-bold text-center border cursor-pointer transition-all ${
                      role === "buyer"
                        ? "bg-cyan-50 border-cyan-400 text-cyan-700"
                        : "border-[#E7E5E4] text-[#57534E]"
                    }`}
                  >
                    Buyer
                  </button>
                  <button
                    onClick={() => {
                      handleRoleChange("sme");
                      setIsOpen(false);
                    }}
                    className={`py-2 px-1 rounded-[8px] text-[10px] font-bold text-center border cursor-pointer transition-all ${
                      role === "sme"
                        ? "bg-forest-50 border-forest-400 text-[#166534]"
                        : "border-[#E7E5E4] text-[#57534E]"
                    }`}
                  >
                    SME Partner
                  </button>
                  <button
                    onClick={() => {
                      handleRoleChange("admin");
                      setIsOpen(false);
                    }}
                    className={`py-2 px-1 rounded-[8px] text-[10px] font-bold text-center border cursor-pointer transition-all ${
                      role === "admin"
                        ? "bg-[#FEF9C3] border-amber-400 text-amber-700"
                        : "border-[#E7E5E4] text-[#57534E]"
                    }`}
                  >
                    Admin
                  </button>
                </div>
              </div>
            )}

            {/* Mobile User Info & CTA */}
            <div className="pt-4 px-3 border-t border-[#E7E5E4] mt-2">
              {currentUser ? (
                <div className="space-y-3">
                  <div className="px-3 py-1">
                    <p className="text-xs font-bold text-[#1C1917]">{currentUser.name}</p>
                    <p className="text-[10px] text-[#57534E] mt-0.5">{currentUser.email}</p>
                    <span className={`inline-block mt-2 px-2 py-0.5 rounded-[4px] text-[9px] uppercase font-extrabold tracking-wider ${getRoleBadgeColor(role)}`}>
                      Active: {getRoleLabel(role)}
                    </span>
                  </div>
                  
                  {currentUser.role !== "buyer" && (
                    <Link
                      href="/dashboard"
                      onClick={() => setIsOpen(false)}
                      className="w-full btn-primary flex items-center justify-center gap-2"
                    >
                      <Briefcase className="w-4 h-4" />
                      <span>Go to Dashboard</span>
                    </Link>
                  )}
                  
                  <button
                    onClick={() => {
                      logout();
                      setIsOpen(false);
                      router.push("/");
                    }}
                    className="w-full py-2.5 px-4 rounded-[8px] border border-[#B91C1C] hover:bg-red-50 text-[#B91C1C] text-xs font-bold transition-all text-center flex items-center justify-center gap-2 cursor-pointer bg-transparent"
                  >
                    <span>Log Out (Keluar)</span>
                  </button>
                </div>
              ) : (
                <Link
                  href="/login"
                  onClick={() => setIsOpen(false)}
                  className="w-full btn-primary flex items-center justify-center gap-2"
                >
                  <User className="w-4 h-4" />
                  <span>Masuk Partner</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
