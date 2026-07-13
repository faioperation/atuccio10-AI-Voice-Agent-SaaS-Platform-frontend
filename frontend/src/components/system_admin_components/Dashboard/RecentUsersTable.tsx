"use client";

import React from "react";

const recentUsers = [
  { id: "01", name: "Jane Cooper", phone: "(+33)7 00 55 57 60", email: "tim.jennings@example.com", startDate: "August 24, 2013", endDate: "May 9, 2014", plan: "QUALIFY", planColor: "bg-[#E9FBF1] text-[#16A34A]" },
  { id: "02", name: "Jacob Jones", phone: "(+33)7 35 55 21 02", email: "tanya.hill@example.com", startDate: "February 29, 2012", endDate: "May 6, 2012", plan: "CLOSE", planColor: "bg-[#EBF3FF] text-[#1A6BDC]" },
  { id: "03", name: "Dianne Russell", phone: "(+33)7 35 55 43 43", email: "michael.mitc@example.com", startDate: "February 11, 2014", endDate: "September 9, 2013", plan: "QUALIFY", planColor: "bg-[#E9FBF1] text-[#16A34A]" },
  { id: "04", name: "Theresa Webb", phone: "(+33)7 35 55 50 46", email: "dolores.chambers@example.com", startDate: "November 28, 2015", endDate: "April 28, 2016", plan: "THE CLINCHER", planColor: "bg-[#FFF4ED] text-[#EA580C]" },
  { id: "05", name: "Courtney Henry", phone: "(+33)6 55 59 32 88", email: "nevaeh.simmons@example.com", startDate: "October 30, 2017", endDate: "August 2, 2013", plan: "QUALIFY", planColor: "bg-[#E9FBF1] text-[#16A34A]" },
];

const RecentUsersTable = () => {
  return (
    <div className="bg-white rounded-2xl border border-[#EDEFF2] shadow-sm overflow-hidden">
      <div className="px-6 py-5 border-b border-[#F1F4F9] flex items-center justify-between">
        <h3 className="text-[16px] font-bold text-[#0C1824]">Recent Users</h3>
        <button className="text-[#64748B] hover:text-[#0C1824] transition-colors">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/></svg>
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#FAFBFC] border-b border-[#F1F4F9]">
              <th className="px-6 py-4 text-[12px] font-bold text-[#64748B] uppercase tracking-wider">#</th>
              <th className="px-6 py-4 text-[12px] font-bold text-[#64748B] uppercase tracking-wider">Name</th>
              <th className="px-6 py-4 text-[12px] font-bold text-[#64748B] uppercase tracking-wider">Phone Number</th>
              <th className="px-6 py-4 text-[12px] font-bold text-[#64748B] uppercase tracking-wider">Email</th>
              <th className="px-6 py-4 text-[12px] font-bold text-[#64748B] uppercase tracking-wider">Start Date</th>
              <th className="px-6 py-4 text-[12px] font-bold text-[#64748B] uppercase tracking-wider">End Date</th>
              <th className="px-6 py-4 text-[12px] font-bold text-[#64748B] uppercase tracking-wider">Plan</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F1F4F9]">
            {recentUsers.map((user) => (
              <tr key={user.id} className="hover:bg-[#F8FAFC] transition-colors">
                <td className="px-6 py-4 text-[13px] font-medium text-[#64748B]">{user.id}</td>
                <td className="px-6 py-4 text-[13.5px] font-semibold text-[#0C1824] whitespace-nowrap">{user.name}</td>
                <td className="px-6 py-4 text-[13px] text-[#64748B] whitespace-nowrap">{user.phone}</td>
                <td className="px-6 py-4 text-[13px] text-[#64748B] whitespace-nowrap">{user.email}</td>
                <td className="px-6 py-4 text-[13px] text-[#64748B] whitespace-nowrap">{user.startDate}</td>
                <td className="px-6 py-4 text-[13px] text-[#64748B] whitespace-nowrap">{user.endDate}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-3 py-1.5 rounded-lg text-[11px] font-bold uppercase tracking-tight ${user.planColor}`}>
                    {user.plan}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentUsersTable;
