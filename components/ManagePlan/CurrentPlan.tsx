"use client";

import React from "react";
import { Check } from "lucide-react";

const features = [
  "Up to 100 AI qualification calls/mo",
  "Live call transcription",
  "Basic CRM integration",
  "Email support",
];

const CurrentPlan = ({ onUpgrade }: { onUpgrade: () => void }) => {
  return (
    <div className="space-y-4">
      {/* Section heading */}
      <h2 className="text-lg md:text-2xl font-bold text-[#0C1824]">Your Plan</h2>

      {/*
        Card:
        - Figma: constrained width (~700px), NOT full-width
        - White bg, very light blue border
        - Rounded corners
        - Active Plan badge is a solid blue rounded-lg at the TOP-RIGHT corner inside the card
      */}
      <div
        className="relative bg-white border border-[#5691FF] shadow-xs rounded-2xl overflow-hidden"
        style={{
          maxWidth: "900px",
          boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
        }}
      >
        {/* Active Plan badge — blue filled, top-right corner, rounded-bl only */}
        <div
          className="absolute top-0 right-0 bg-[#4F8AFF] text-white text-[10px] font-bold px-4 py-2 tracking-wide"
          style={{ borderBottomLeftRadius: "12px" }}
        >
          Active Plan
        </div>

        {/* Card body — two columns */}
        <div className="grid grid-cols-2 gap-0 p-8 pt-10">

          {/* LEFT: plan name + description */}
          <div className="pr-6 border-r border-[#EFF6FF] space-y-3">
            <h3 className="text-[22px] font-bold text-[#0C1824] leading-snug">
              1-Month Plan
            </h3>
            <p className="text-[13px] text-[#64748B] leading-[1.65] max-w-[300px]">
              A great entry-level option for exploring new markets without commitments.
              Cost-effective and adaptable for experimentation.
            </p>
          </div>

          {/* RIGHT: price + subtitle + features stacked tightly */}
          <div className="pl-6 space-y-4">
            {/* Price */}
            <div>
              <p className="text-[20px] font-bold text-[#0C1824] leading-tight">USD $20.00</p>
              <p className="text-[12px] text-[#94A3B8] mt-0.5">Total for 3 months: USD $20.00</p>
            </div>

            {/* Feature list */}
            <ul className="space-y-2.5">
              {features.map((f, i) => (
                <li key={i} className="flex items-center gap-2.5 text-[13px] text-[#374151] font-medium">
                  <span className="flex-shrink-0 w-[17px] h-[17px] rounded-full bg-[#4F8AFF] flex items-center justify-center">
                    <Check className="w-[8px] h-[8px] text-white stroke-[5]" />
                  </span>
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/*
        Buttons — same max-width as card, side-by-side, pill shape
        Figma: Upgrade Plan (solid blue), Cancel Plan (white + red border)
      */}
      <div
        className="grid grid-cols-2 gap-3"
        style={{ maxWidth: "900px" }}
      >
        <button
          onClick={onUpgrade}
          className="w-full py-4 rounded-full bg-[#4F8AFF] hover:bg-[#3B7AFF] text-white text-[15px] font-bold transition-all"
          style={{ boxShadow: "0 4px 14px rgba(79,138,255,0.3)" }}
        >
          Upgrade Plan
        </button>
        <button className="w-full py-4 rounded-full border border-[#FF5A5A] bg-white hover:bg-[#FFF5F5] text-[#FF5A5A] text-[15px] font-bold transition-all">
          Cancel Plan
        </button>
      </div>
    </div>
  );
};

export default CurrentPlan;
