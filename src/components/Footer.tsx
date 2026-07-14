import React from "react";
import Link from "next/link";
import { Mail, Phone, MapPin, Leaf } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function Footer() {
  const { language } = useLanguage();

  return (
    <footer className="bg-[#1C1917] text-[#FAFAF5] border-t border-[#2A2725] mt-auto transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand/About */}
          <div className="space-y-4 col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-2xl font-extrabold tracking-tight text-[#86A873] font-serif">
                JABAR
              </span>
              <span className="text-xs uppercase tracking-widest font-semibold px-2 py-0.5 rounded-[4px] bg-[#A47148] text-white">
                Export Hub
              </span>
            </Link>
            <p className="text-xs text-[#A8A29E] leading-relaxed">
              {language === "id"
                ? "Direktori ekspor B2B resmi Jawa Barat, mempromosikan komoditas lokal unggulan (Kopi, Teh, Kriya, Tekstil) agar mudah ditemukan dan dibeli oleh importir di seluruh dunia."
                : "Official West Java B2B export directory, promoting featured local commodities (Coffee, Tea, Craft, Textile) to be easily discovered and sourced by global importers."}
            </p>
            <div className="flex items-center gap-2 pt-2 text-[10px] text-[#86A873] font-semibold tracking-wider uppercase">
              <Leaf className="w-4 h-4 text-[#86A873]" />
              <span>Verified Premium Network</span>
            </div>
          </div>

          {/* Directory Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold tracking-wider text-white uppercase font-serif">
              {language === "id" ? "Telusuri Kategori" : "Browse Categories"}
            </h3>
            <ul className="space-y-2 text-xs text-[#A8A29E]">
              <li>
                <Link href="/directory?category=Kopi" className="hover:text-[#86A873] transition-colors">
                  {language === "id" ? "Kopi Arabika & Robusta" : "Arabica & Robusta Coffee"}
                </Link>
              </li>
              <li>
                <Link href="/directory?category=Teh" className="hover:text-[#86A873] transition-colors">
                  {language === "id" ? "Teh Premium Highland" : "Premium Highland Tea"}
                </Link>
              </li>
              <li>
                <Link href="/directory?category=Kriya" className="hover:text-[#86A873] transition-colors">
                  {language === "id" ? "Kriya Kayu & Anyaman Rotan" : "Woodcraft & Rattan Weaving"}
                </Link>
              </li>
              <li>
                <Link href="/directory?category=Tekstil" className="hover:text-[#86A873] transition-colors">
                  {language === "id" ? "Kain & Busana Tenun Sutra" : "Silk Handwoven Fabric & Apparel"}
                </Link>
              </li>
            </ul>
          </div>

          {/* SME & Buyer Portals */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold tracking-wider text-white uppercase font-serif">
              {language === "id" ? "Portal & Layanan" : "Portals & Services"}
            </h3>
            <ul className="space-y-2 text-xs text-[#A8A29E]">
              <li>
                <Link href="/directory" className="hover:text-[#86A873] transition-colors">
                  {language === "id" ? "Cari Direktori Pemasok" : "Find Supplier Directory"}
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-[#86A873] transition-colors">
                  {language === "id" ? "Dashboard Mitra UMKM" : "SME Partner Dashboard"}
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-[#86A873] transition-colors">
                  {language === "id" ? "Konsol Kurator Admin" : "Admin Curator Console"}
                </Link>
              </li>
              <li>
                <span className="cursor-not-allowed opacity-50">
                  {language === "id" ? "Pusat Konsultasi Ekspor" : "Export Consultation Center"}
                </span>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold tracking-wider text-white uppercase font-serif">
              {language === "id" ? "Meja Kontak" : "Contact Desk"}
            </h3>
            <ul className="space-y-3 text-xs text-[#A8A29E]">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#86A873] shrink-0 mt-0.5" />
                <span>Jabar Export Hub HQ, Jl. Braga No. 10, Bandung, Indonesia</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#86A873] shrink-0" />
                <span>support@jabarexporthub.com</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#86A873] shrink-0" />
                <span>+62-22-423-4567</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[#2A2725] mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-[#57534E]">
          <p>© {new Date().getFullYear()} Jabar Export Hub. {language === "id" ? "Hak cipta dilindungi undang-undang." : "All rights reserved."}</p>
          <div className="flex gap-6">
            <span className="hover:text-[#86A873] cursor-pointer">{language === "id" ? "Kebijakan Privasi" : "Privacy Policy"}</span>
            <span className="hover:text-[#86A873] cursor-pointer">{language === "id" ? "Syarat Layanan" : "Terms of Service"}</span>
            <span className="hover:text-[#86A873] cursor-pointer">{language === "id" ? "Mitra" : "Partners"}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
