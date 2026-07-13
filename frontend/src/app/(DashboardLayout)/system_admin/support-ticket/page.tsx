"use client";

import React, { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import SupportTicketTable from "@/components/system_admin_components/SupportTicket/SupportTicketTable";
import TicketDetailsModal from "@/components/system_admin_components/SupportTicket/TicketDetailsModal";
import Loader from "@/components/Shared/Loader";

interface Ticket {
  id: string;
  businessName: string;
  ticketId: string;
  date: string;
  issues: string;
  message: string;
  status: string;
  phoneNumber: string;
  fullMessage: string;
}

export default function SupportTicketPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: allTickets = [], isLoading, isError } = useQuery({
    queryKey: ["tickets"],
    queryFn: async () => {
      const response = await axios.get<Ticket[]>("/tickets.json");
      return response.data;
    },
  });

  // Search logic
  const filteredTickets = useMemo(() => {
    return allTickets.filter(ticket => 
      ticket.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.ticketId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.issues.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [allTickets, searchTerm]);

  // Pagination logic
  const totalItems = filteredTickets.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
  const validCurrentPage = Math.min(currentPage, totalPages);

  const currentTickets = useMemo(() => {
    const startIndex = (validCurrentPage - 1) * itemsPerPage;
    return filteredTickets.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredTickets, validCurrentPage]);

  const handleViewTicket = (ticket: Ticket) => {
    setSelectedTicket(ticket);
    setIsModalOpen(true);
  };

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (isLoading) {
    return <Loader message="Loading tickets..." />;
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center p-8">
        <p className="text-red-500 font-semibold mb-4">Failed to load support tickets.</p>
        <button 
          onClick={() => window.location.reload()}
          className="px-6 py-2.5 bg-[#1A6BDC] text-white rounded-lg font-bold shadow-md hover:bg-[#1558be] transition-all"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <SupportTicketTable 
        tickets={currentTickets} 
        onView={handleViewTicket}
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
        currentPage={validCurrentPage}
        onPageChange={handlePageChange}
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
      />
      
      <TicketDetailsModal 
        ticket={selectedTicket} 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
}
