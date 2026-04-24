"use client";

import React, { useState } from "react";
import { Check } from "lucide-react";
import EditTierModal from "@/(components)/system_admin_components/ManageTiers/EditTierModal";

interface Tier {
  name: string;
  price: string;
  features: string[];
}

const initialTiers: Tier[] = [
  {
    name: "QUALIFY",
    price: "74.99",
    features: [
      "Up to 100 AI qualification calls/mo",
      "Every Call Transcribed Automatically",
      "Basic CRM integration",
      "Email support",
    ],
  },
  {
    name: "CLOSE",
    price: "85.99",
    features: [
      "Unlimited AI qualification calls",
      "Real-time coaching + battle cards",
      "Full CRM integration suite",
      "AI-powered scheduling",
      "Advanced analytics",
      "Priority support",
    ],
  },
  {
    name: "THE CLINCHER",
    price: "99.99",
    features: [
      "Everything in Close",
      "Custom compliance modules",
      "Dedicated success manager",
      "SLA-backed 99.9% uptime",
      "Custom voice persona",
      "24/7 phone support",
    ],
  },
];

export default function ManageTiersPage() {
  const [tiers, setTiers] = useState<Tier[]>(initialTiers);
  const [editingTier, setEditingTier] = useState<Tier | null>(null);

  const handleUpdateTier = (updatedTier: Tier) => {
    setTiers(prev => prev.map(t => t.name === editingTier?.name ? updatedTier : t));
    setEditingTier(null);
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[30px] pb-10 ">
        {tiers.map((tier) => (
          <div
            key={tier.name}
            className="bg-white flex flex-col p-[40px] rounded-[16px] border-[1.5px] border-[#EDEFF2] shadow-sm min-h-[600px] hover:border-[#4F8AFF]/40 transition-all duration-300"
          >
            {/* Title */}
            <h3 className="text-[28px] font-semibold text-[#0C1824] mb-4 tracking-tight uppercase font-sans">
              {tier.name}
            </h3>

            {/* Price Row */}
            <div className="flex items-baseline mb-10">
              <span className="text-[44px] font-bold text-[#3A3A3A] leading-none tracking-tight">$</span>
              <span className="text-[44px] font-semibold text-[#3A3A3A] leading-none tracking-tight">{tier.price}</span>
              <span className="text-[14px] text-[#3A3A3A] ml-2 font-medium">/ per month</span>
            </div>

            {/* Feature List */}
            <ul className="flex-grow flex flex-col gap-5">
              {tier.features.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-4 text-[14.5px] text-[#374151] leading-relaxed">
                  <div className="flex-shrink-0 mt-[3px] w-[18px] h-[18px] rounded-full bg-[#4F8AFF] flex items-center justify-center">
                    <Check size={10} className="text-white stroke-[4px]" />
                  </div>
                  <span className="font-medium">{feature}</span>
                </li>
              ))}
            </ul>

            {/* Edit Plan Button */}
            <button
              onClick={() => setEditingTier(tier)}
              className="w-full mt-10 h-[52px] bg-[#5B8CFF] text-white text-[15px] font-bold rounded-full hover:bg-[#4A7AE6] transition-all shadow-sm active:scale-[0.98]"
            >
              Edit Plan
            </button>
          </div>
        ))}
      </div>

      {/* ── Edit Modal ── */}
      {editingTier && (
        <EditTierModal
          tier={editingTier}
          onClose={() => setEditingTier(null)}
          onSave={handleUpdateTier}
        />
      )}
    </div>
  );
}
