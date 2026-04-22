"use client";

import React, { useState } from "react";
import ProfileInfo from "@/components/Profile/ProfileInfo";
import EditProfileModal from "@/components/Profile/EditProfileModal";
import ChangePasswordModal from "@/components/Profile/ChangePasswordModal";

export default function ProfilePage() {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

  return (
    <div className="space-y-6">
      {/* Profile Info Card Container */}
      <div className="pt-2">
        <ProfileInfo 
          onEdit={() => setIsEditModalOpen(true)}
          onChangePassword={() => setIsPasswordModalOpen(true)}
        />
      </div>

      {/* Modals */}
      <EditProfileModal 
        isOpen={isEditModalOpen} 
        onClose={() => setIsEditModalOpen(false)} 
      />
      <ChangePasswordModal 
        isOpen={isPasswordModalOpen} 
        onClose={() => setIsPasswordModalOpen(false)} 
      />
    </div>
  );
}
