"use client";

import React, { useState, useRef } from "react";
import { ChevronDown, Upload } from "lucide-react";

// ─── Shared sub-components ──────────────────────────────────────────────────

function SectionCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-2xl border border-[#EDEFF2] shadow-sm p-6 flex flex-col gap-5">
      <h2 className="text-[17px] font-semibold text-[#0C1824]">{title}</h2>
      {children}
    </div>
  );
}

function Field({ label, placeholder }: { label: string; placeholder?: string }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[13px] font-medium text-[#0C1824]">{label}</label>
      <input
        type="text"
        placeholder={placeholder ?? "type..."}
        className="w-full border border-[#E2E8F0] rounded-lg px-4 py-2.5 text-[14px] text-[#0C1824] placeholder:text-[#CBD5E1] focus:outline-none focus:ring-2 focus:ring-[#1A6BDC]/20 focus:border-[#1A6BDC] bg-white transition-colors"
      />
    </div>
  );
}

function SaveButton() {
  return (
    <div className="flex justify-end">
      <button className="bg-[#5D87FF] hover:bg-[#4a72e8] text-white text-[13.5px] font-semibold px-6 py-2.5 rounded-lg transition-colors shadow-sm">
        Save
      </button>
    </div>
  );
}

// ─── Page ───────────────────────────────────────────────────────────────────

const CRM_OPTIONS = ["JSL", "Salesforce", "HubSpot", "Zoho", "Pipedrive"];

export default function ConfigurationPage() {
  const [selectedCRM, setSelectedCRM] = useState("JSL");
  const [crmOpen, setCrmOpen] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFileName(e.target.files[0].name);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

      {/* ── Set Key ── */}
      <SectionCard title="Set Key">
        <Field label="Open AI Key" />
        <SaveButton />
        <Field label="Deepgram" />
        <SaveButton />
      </SectionCard>

      {/* ── CRM Manage ── */}
      <SectionCard title="CRM Manage">
        {/* CRM dropdown */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[13px] font-medium text-[#0C1824]">CRM</label>
          <div className="relative">
            <button
              type="button"
              onClick={() => setCrmOpen(p => !p)}
              className="w-full flex items-center justify-between border border-[#E2E8F0] rounded-lg px-4 py-2.5 text-[14px] text-[#0C1824] bg-white focus:outline-none focus:ring-2 focus:ring-[#1A6BDC]/20 focus:border-[#1A6BDC] transition-colors"
            >
              {selectedCRM}
              <ChevronDown size={16} className={`text-[#94A3B8] transition-transform ${crmOpen ? "rotate-180" : ""}`} />
            </button>
            {crmOpen && (
              <ul className="absolute z-50 left-0 right-0 mt-1 bg-white border border-[#E2E8F0] rounded-lg shadow-lg overflow-hidden">
                {CRM_OPTIONS.map(opt => (
                  <li key={opt}>
                    <button
                      type="button"
                      onClick={() => { setSelectedCRM(opt); setCrmOpen(false); }}
                      className={`w-full text-left px-4 py-2.5 text-[14px] hover:bg-[#F0F5FF] transition-colors ${selectedCRM === opt ? "text-[#1A6BDC] font-semibold bg-[#F0F5FF]" : "text-[#0C1824]"}`}
                    >
                      {opt}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <Field label="Token" />
        <Field label="Location ID" />
        <SaveButton />
      </SectionCard>

      {/* ── Twilio ── */}
      <SectionCard title="Twilo">
        <Field label="SID" />
        <Field label="Token" />
        <Field label="Towilo Number" />
        <SaveButton />
      </SectionCard>

      {/* ── Knowledge ── */}
      <SectionCard title="Knowledge">
        <div
          onClick={() => fileRef.current?.click()}
          className="flex flex-col items-center justify-center gap-3 border-2 border-dashed border-[#93C5FD] rounded-xl p-10 cursor-pointer hover:bg-[#F0F5FF] transition-colors min-h-[180px]"
        >
          <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-[#EBF3FF]">
            <Upload size={22} className="text-[#1A6BDC]" />
          </div>
          {fileName ? (
            <p className="text-[14px] text-[#0C1824] font-medium text-center">{fileName}</p>
          ) : (
            <p className="text-[13px] text-[#94A3B8] text-center leading-relaxed">
              Knowledge Base PDF or{" "}
              <span className="text-[#1A6BDC] underline underline-offset-2 cursor-pointer">Browser</span>
            </p>
          )}
          <input ref={fileRef} type="file" accept=".pdf,.doc,.docx,.txt" className="hidden" onChange={handleFile} />
        </div>
        <SaveButton />
      </SectionCard>

    </div>
  );
}
