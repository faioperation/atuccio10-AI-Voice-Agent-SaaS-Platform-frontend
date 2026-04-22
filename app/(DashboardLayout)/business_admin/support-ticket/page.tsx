"use client";

import React from "react";
import SupportForm from "@/components/Support/SupportForm";

export default function SupportTicketPage() {
  return (
    <div className="space-y-6">
      {/* Support Card Container */}
      <div className="pt-2">
        <SupportForm />
      </div>
    </div>
  );
}
