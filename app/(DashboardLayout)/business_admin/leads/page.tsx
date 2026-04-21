"use client";

import React, { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Search, Eye, Trash2 } from "lucide-react";
import Loader from "@/components/Shared/Loader";
import ViewLeadModal from "@/components/Leads/ViewLeadModal";

interface Lead {
  id: string;
  name: string;
  phone: string;
  email: string;
  date: string;
  status: string;
}

export default function LeadsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  // For mock deletion
  const [deletedIds, setDeletedIds] = useState<Set<string>>(new Set());

  // Fetch data
  const { data: fetchedLeads = [], isLoading, isError, refetch } = useQuery<Lead[]>({
    queryKey: ["leads"],
    queryFn: async () => {
      const response = await axios.get("/leads.json");
      return response.data;
    },
  });

  const openModal = (lead: Lead, e: React.MouseEvent) => {
    e.preventDefault();
    setSelectedLead(lead);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    if (window.confirm("Are you sure you want to delete this lead?")) {
      setDeletedIds(prev => {
        const newSet = new Set(prev);
        newSet.add(id);
        return newSet;
      });
    }
  };

  // Filter functionality
  const activeLeads = useMemo(() => {
    return fetchedLeads.filter(lead => !deletedIds.has(lead.id));
  }, [fetchedLeads, deletedIds]);

  const filteredLeads = useMemo(() => {
    return activeLeads.filter((lead) => {
      const lowerSearch = searchTerm.toLowerCase();
      return (
        lead.name.toLowerCase().includes(lowerSearch) ||
        lead.phone.toLowerCase().includes(lowerSearch) ||
        lead.email.toLowerCase().includes(lowerSearch)
      );
    });
  }, [activeLeads, searchTerm]);

  // Pagination logic
  const totalItems = filteredLeads.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
  const validCurrentPage = Math.min(currentPage, Math.max(1, totalPages));
  
  const currentLeads = useMemo(() => {
    const startIndex = (validCurrentPage - 1) * itemsPerPage;
    return filteredLeads.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredLeads, validCurrentPage, itemsPerPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (isLoading) {
    return <Loader message="Loading leads..." />;
  }

  if (isError) {
    return (
      <div className="p-8 text-center text-red-500">
        Error loading data. <button onClick={() => refetch()} className="underline ml-2">Try again</button>
      </div>
    );
  }

  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, validCurrentPage - Math.floor(maxVisiblePages / 2));
    let endPage = startPage + maxVisiblePages - 1;

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div className="w-full">
      <div className="bg-white rounded-2xl shadow-sm border border-[#EDEFF2] min-h-[800px] flex flex-col">
        {/* Top: Search Bar */}
        <div className="p-6 pb-4">
          <div className="relative w-full max-w-[400px]">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94A3B8]" size={18} />
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-[#EDEFF2] text-[14px] text-[#0C1824] placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#1A6BDC]/20 focus:border-[#1A6BDC] bg-white transition-colors"
            />
          </div>
        </div>

        {/* Table Content */}
        <div className="flex-1 overflow-x-auto px-6">
          <table className="w-full text-left border-collapse min-w-[950px]">
            <thead>
              <tr className="border-b border-[#F1F4F9]">
                <th className="py-4 pr-4 pl-2 text-[12px] font-semibold text-[#64748B] w-[50px]">#</th>
                <th className="py-4 px-4 text-[12px] font-semibold text-[#64748B]">Name</th>
                <th className="py-4 px-4 text-[12px] font-semibold text-[#64748B]">Phone Number</th>
                <th className="py-4 px-4 text-[12px] font-semibold text-[#64748B]">Email</th>
                <th className="py-4 px-4 text-[12px] font-semibold text-[#64748B]">Date</th>
                <th className="py-4 pl-4 text-[12px] font-semibold text-[#64748B] w-[100px]">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentLeads.map((lead) => (
                <tr key={lead.id} className="border-b border-[#F1F4F9] last:border-0 hover:bg-[#F8FAFC] transition-colors">
                  <td className="py-[16px] pr-4 pl-2 text-[13px] font-medium text-[#64748B]">{lead.id}</td>
                  <td className="py-[16px] px-4 text-[13px] font-bold text-[#0C1824]">{lead.name}</td>
                  <td className="py-[16px] px-4 text-[13px] font-medium text-[#64748B]">{lead.phone}</td>
                  <td className="py-[16px] px-4 text-[13px] font-medium text-[#64748B]">{lead.email}</td>
                  <td className="py-[16px] px-4 text-[13px] font-medium text-[#64748B]">{lead.date}</td>
                  <td className="py-[16px] pl-4">
                    <div className="flex items-center gap-3">
                      <button 
                        onClick={(e) => openModal(lead, e)}
                        className="text-[#64748B] hover:text-[#1A6BDC] transition-colors"
                        title="View Details"
                      >
                        <Eye size={18} />
                      </button>
                      <button 
                        onClick={(e) => handleDelete(lead.id, e)}
                        className="text-[#EF4444] hover:text-[#DC2626] transition-colors"
                        title="Delete Lead"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {currentLeads.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center py-10 text-[#64748B]">No leads found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer: Pagination */}
        <div className="p-6 pt-4 flex items-center justify-between border-t border-[#F1F4F9] mt-auto flex-wrap gap-4">
          <div className="text-[13.5px] font-medium text-[#64748B]">
            Showing {(validCurrentPage - 1) * itemsPerPage + (currentLeads.length > 0 ? 1 : 0)} to {Math.min(validCurrentPage * itemsPerPage, totalItems)} of {totalItems} entries
          </div>
          
          <div className="flex items-center gap-1.5 md:gap-2">
            <button
              onClick={() => handlePageChange(Math.max(1, validCurrentPage - 1))}
              disabled={validCurrentPage === 1}
              className="px-4 py-2 border border-[#EDEFF2] rounded-lg text-[13.5px] font-semibold text-[#0C1824] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#F8FAFC] transition-colors bg-white mr-1"
            >
              Previous
            </button>
            <div className="flex items-center gap-1">
              {getPageNumbers().map(pageNum => (
                <button
                  key={pageNum}
                  onClick={() => handlePageChange(pageNum)}
                  className={`w-[36px] h-[36px] flex items-center justify-center rounded-lg text-[13.5px] font-semibold transition-colors ${
                    validCurrentPage === pageNum
                      ? "bg-[#5D87FF] text-white shadow-sm"
                      : "bg-white text-[#64748B] hover:bg-[#F5F7FA]"
                  }`}
                >
                  {pageNum}
                </button>
              ))}
            </div>
            <button
              onClick={() => handlePageChange(Math.min(totalPages, validCurrentPage + 1))}
              disabled={validCurrentPage === totalPages}
              className="px-[22px] py-2 rounded-lg text-[13.5px] font-semibold text-white bg-[#5D87FF] hover:bg-[#4a72e8] disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm ml-1"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      <ViewLeadModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        lead={selectedLead} 
      />
    </div>
  );
}
