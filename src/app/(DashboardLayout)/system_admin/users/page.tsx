"use client";

import React, { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import UserTable from "@/components/system_admin_components/Users/UserTable";
import UserDetailsModal from "@/components/system_admin_components/Users/UserDetailsModal";
import Loader from "@/components/Shared/Loader";

// Types
interface Stat {
  value: number;
  change: number;
  trend: "up" | "down";
}

interface User {
  id: string;
  name: string;
  phoneNumber: string;
  email: string;
  startDate: string;
  endDate: string;
  plan: string;
  stats: {
    leads: Stat;
    calls: Stat;
    conversion: Stat;
    appointments: Stat;
  };
}

export default function UsersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: allUsers = [], isLoading, isError } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await axios.get<User[]>("/users.json");
      return response.data;
    },
  });

  // Search logic
  const filteredUsers = useMemo(() => {
    return allUsers.filter(user => 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [allUsers, searchTerm]);

  // Pagination logic
  const totalItems = filteredUsers.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
  const validCurrentPage = Math.min(currentPage, totalPages);

  const currentUsers = useMemo(() => {
    const startIndex = (validCurrentPage - 1) * itemsPerPage;
    return filteredUsers.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredUsers, validCurrentPage]);

  const handleViewUser = (user: User) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1); // Reset to first page on search
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (isLoading) {
    return <Loader message="Loading users..." />;
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center p-8">
        <p className="text-red-500 font-semibold mb-4">Failed to load user data.</p>
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
      <UserTable 
        users={currentUsers} 
        onView={handleViewUser}
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
        currentPage={validCurrentPage}
        onPageChange={handlePageChange}
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
      />
      
      <UserDetailsModal 
        user={selectedUser} 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
}
