"use client";

import React, { useState } from "react";
import { useDemo } from "@/context/DemoContext";
import { Check, ShieldCheck, Zap, Star } from "lucide-react";
import { useRouter } from "next/navigation";

export default function BillingPage() {
  const { currentUser, companies, upgradeToPremium } = useDemo();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const myCompany = companies.find((c) => c.id === currentUser?.companyId);

  const handleUpgrade = () => {
    if (!myCompany) return;
    setLoading(true);

    // Mock API call for Stripe Checkout payment
    setTimeout(() => {
      upgradeToPremium(myCompany.id);
      setLoading(false);
      setSuccess(true);

      setTimeout(() => {
        setSuccess(false);
        router.refresh();
      }, 3000);
    }, 1500);
  };

  if (!currentUser || currentUser.role !== "sme") {
    return (
      <div className="text-center p-8 text-[#57534E]">
        Only SME partners can access this page.
      </div>
    );
  }

  if (myCompany?.isPremium) {
    return (
      <div className="space-y-6 max-w-4xl font-sans">
        <div>
          <h1 className="text-2xl font-bold text-[#1C1917] font-serif">Billing & Subscription</h1>
          <p className="text-xs text-[#57534E] mt-1">Manage your platform visibility and plans.</p>
        </div>

        <div className="p-8 bg-gradient-to-br from-[#166534] to-[#14532D] rounded-[12px] text-white space-y-4 shadow-none">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-white/20">
              <Star className="w-6 h-6 text-yellow-300" />
            </div>
            <div>
              <h2 className="text-xl font-bold font-serif">Premium Supplier Plan Active</h2>
              <p className="text-xs text-[#E7E5E4]">Your products are currently prioritized in search results.</p>
            </div>
          </div>
          <div className="pt-4 border-t border-white/10 flex items-center justify-between">
            <span className="text-xs">Next billing date: <strong>Next Month</strong></span>
            <button className="px-4 py-2 rounded-[8px] bg-white text-[#166534] text-xs font-bold hover:bg-[#F5F5EB] transition-colors cursor-pointer border-none">
              Manage Subscription
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-5xl font-sans">
      <div>
        <h1 className="text-2xl font-bold text-[#1C1917] font-serif">Upgrade to Premium Supplier</h1>
        <p className="text-xs text-[#57534E] mt-1">Get more inquiries by boosting your visibility to international buyers.</p>
      </div>

      {success && (
        <div className="p-4 bg-green-50 border border-green-200 text-green-800 rounded-[8px] flex items-center gap-3 animate-in fade-in slide-in-from-top-2">
          <ShieldCheck className="w-5 h-5" />
          <span className="text-sm font-semibold">Payment successful! You are now a Premium Supplier.</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Free Plan */}
        <div className="p-8 bg-white border border-[#D6D3D1] rounded-[12px] space-y-6 opacity-70">
          <div>
            <h3 className="text-lg font-bold text-[#1C1917] font-serif">Basic Profile</h3>
            <div className="mt-4 flex items-baseline gap-1">
              <span className="text-3xl font-extrabold text-[#1C1917]">Free</span>
            </div>
            <p className="text-xs text-[#57534E] mt-2">Perfect for getting started.</p>
          </div>
          <ul className="space-y-3 text-xs text-[#57534E]">
            <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-[#A8A29E]" />
              <span>Standard directory listing</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-[#A8A29E]" />
              <span>Up to 5 products</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-[#A8A29E]" />
              <span>Basic inquiry notifications</span>
            </li>
          </ul>
          <div className="pt-4">
            <button className="w-full py-2.5 rounded-[8px] bg-[#F5F5EB] text-[#57534E] font-bold text-xs cursor-not-allowed border-none">
              Current Plan
            </button>
          </div>
        </div>

        {/* Premium Plan */}
        <div className="p-8 bg-white border border-[#166534] border-b-[4px] rounded-[12px] shadow-sm relative space-y-6">
          <div className="absolute top-0 right-8 -translate-y-1/2">
            <span className="px-3 py-1 rounded-full bg-[#A47148] text-white text-[10px] font-extrabold uppercase tracking-widest shadow-sm">
              Recommended
            </span>
          </div>
          <div>
            <h3 className="text-lg font-bold text-[#166534] font-serif flex items-center gap-2">
              <Zap className="w-5 h-5" />
              <span>Premium Supplier</span>
            </h3>
            <div className="mt-4 flex items-baseline gap-1">
              <span className="text-3xl font-extrabold text-[#1C1917]">$29</span>
              <span className="text-xs font-semibold text-[#57534E]">/ month</span>
            </div>
            <p className="text-xs text-[#57534E] mt-2">Maximize your export potential globally.</p>
          </div>
          <ul className="space-y-3 text-xs text-[#1C1917] font-medium">
            <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-[#166534]" />
              <span>Top-tier priority in search results</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-[#166534]" />
              <span>Unlimited product listings</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-[#166534]" />
              <span>"Premium Verified" trust badge</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-[#166534]" />
              <span>Direct WhatsApp routing for inquiries</span>
            </li>
          </ul>
          <div className="pt-4">
            <button
              onClick={handleUpgrade}
              disabled={loading || success}
              className="w-full py-3 rounded-[8px] bg-[#166534] hover:bg-[#14532D] text-white font-bold text-xs transition-colors flex items-center justify-center gap-2 disabled:bg-[#166534]/50 cursor-pointer border-none"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Processing...</span>
                </>
              ) : (
                <span>Upgrade Now (Simulate Payment)</span>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
