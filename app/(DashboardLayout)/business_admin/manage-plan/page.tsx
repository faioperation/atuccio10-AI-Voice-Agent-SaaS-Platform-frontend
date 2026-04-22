"use client";

import React, { useState } from "react";
import CurrentPlan from "@/components/ManagePlan/CurrentPlan";
import SubscriptionHistory from "@/components/ManagePlan/SubscriptionHistory";
import PricingSelection from "@/components/ManagePlan/PricingSelection";

export default function ManagePlanPage() {
  const [view, setView] = useState<"manage" | "upgrade">("manage");

  return (
    <div className="space-y-6">
      {view === "manage" ? (
        <>
          <CurrentPlan onUpgrade={() => setView("upgrade")} />
          <SubscriptionHistory />
        </>
      ) : (
        <PricingSelection onBack={() => setView("manage")} />
      )}
    </div>
  );
}
