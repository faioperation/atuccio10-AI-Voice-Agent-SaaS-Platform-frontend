"use client";

import React from "react";

const historyData = [
  { id: "01", plan: "QUALIFY",        start: "February 11, 2014",  end: "April 28, 2015",    status: "Active" },
  { id: "02", plan: "CLOSE",          start: "October 31, 2017",   end: "May 28, 2018",      status: "End" },
  { id: "03", plan: "QUALIFY",        start: "March 23, 2013",     end: "November 28, 2015", status: "End" },
  { id: "04", plan: "THE CLINCHER",   start: "August 2, 2013",     end: "October 24, 2016",  status: "End" },
  { id: "05", plan: "THE CLINCHER",   start: "May 31, 2015",       end: "May 12, 2018",      status: "End" },
  { id: "06", plan: "Kathryn Murphy", start: "July 14, 2015",      end: "August 7, 2017",    status: "End" },
  { id: "07", plan: "THE CLINCHER",   start: "October 30, 2017",   end: "February 9, 2018",  status: "End" },
  { id: "08", plan: "QUALIFY",        start: "February 28, 2010",  end: "May 8, 2012",       status: "End" },
];

const SubscriptionHistory = () => {
  return (
    <div
      className="w-full bg-white border border-[#EBF3FF] rounded-xl overflow-hidden"
      style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}
    >
      <table className="w-full text-left">
        <thead>
          <tr className="border-b border-[#F0F4FF]">
            <th className="px-5 py-3.5 text-[11px] font-semibold text-[#94A3B8] uppercase tracking-wider w-12">#</th>
            <th className="px-5 py-3.5 text-[11px] font-semibold text-[#94A3B8] uppercase tracking-wider">Subscription Plan</th>
            <th className="px-5 py-3.5 text-[11px] font-semibold text-[#94A3B8] uppercase tracking-wider">Start Date</th>
            <th className="px-5 py-3.5 text-[11px] font-semibold text-[#94A3B8] uppercase tracking-wider">End Date</th>
            <th className="px-5 py-3.5 text-[11px] font-semibold text-[#94A3B8] uppercase tracking-wider text-right">End Date</th>
          </tr>
        </thead>
        <tbody>
          {historyData.map((row, idx) => (
            <tr
              key={row.id}
              className={`hover:bg-[#FAFBFF] transition-colors ${
                idx < historyData.length - 1 ? "border-b border-[#F5F7FF]" : ""
              }`}
            >
              <td className="px-5 py-3.5 text-[12px] text-[#94A3B8] font-medium">{row.id}</td>
              <td className="px-5 py-3.5 text-[12px] text-[#0C1824] font-bold tracking-wide">{row.plan}</td>
              <td className="px-5 py-3.5 text-[12px] text-[#64748B]">{row.start}</td>
              <td className="px-5 py-3.5 text-[12px] text-[#64748B]">{row.end}</td>
              <td className="px-5 py-3.5 text-right">
                <span
                  className={`inline-block px-3.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    row.status === "Active"
                      ? "bg-[#EBF3FF] text-[#4F8AFF]"
                      : "bg-[#FFF0F0] text-[#FF5A5A]"
                  }`}
                >
                  {row.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SubscriptionHistory;
