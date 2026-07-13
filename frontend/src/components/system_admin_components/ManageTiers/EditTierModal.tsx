"use client";

import React, { useState } from "react";
import { Check, X, Plus, Pencil, Trash2 } from "lucide-react";

interface Tier {
  name: string;
  price: string;
  features: string[];
}

interface EditTierModalProps {
  tier: Tier;
  onClose: () => void;
  onSave: (updatedTier: Tier) => void;
}

const EditTierModal = ({ tier, onClose, onSave }: EditTierModalProps) => {
  const [editedTier, setEditedTier] = useState<Tier>({ ...tier });
  const [newFeature, setNewFeature] = useState("");

  const handleFeatureDelete = (index: number) => {
    const updatedFeatures = editedTier.features.filter((_, i) => i !== index);
    setEditedTier({ ...editedTier, features: updatedFeatures });
  };

  const handleAddFeature = () => {
    if (newFeature.trim()) {
      setEditedTier({
        ...editedTier,
        features: [...editedTier.features, newFeature.trim()],
      });
      setNewFeature("");
    }
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-2 sm:p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white w-full max-w-[600px] rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200 max-h-[calc(100vh-2rem)] flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#F1F4F9] flex items-center justify-between bg-[#FAFBFC]">
          <h3 className="text-[18px] font-bold text-[#0C1824]">Edit Tiers</h3>
          <button onClick={onClose} className="p-1.5 hover:bg-gray-100 rounded-full transition-colors">
            <X size={20} className="text-[#64748B]" />
          </button>
        </div>

        {/* Content - Scrollable */}
        <div className="p-4 sm:p-10 sm:pt-8 overflow-y-auto flex-1">
          <div className="border-[2px] border-[#5B8CFF] rounded-2xl p-5 sm:p-8 bg-white shadow-[0_4px_20px_rgba(91,140,255,0.06)]">
            <div className="space-y-8">
              <div className="space-y-3 sm:space-y-4">
                <input
                  type="text"
                  value={editedTier.name}
                  onChange={(e) => setEditedTier({ ...editedTier, name: e.target.value })}
                  className="text-[22px] sm:text-[28px] font-bold text-[#0C1824] bg-transparent border-none focus:ring-0 w-full p-0 tracking-tight"
                />
                <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                  <div className="flex items-baseline gap-1">
                    <span className="text-[28px] sm:text-[36px] font-bold text-[#0C1824] tracking-tight">$</span>
                    <input
                      type="text"
                      value={editedTier.price}
                      onChange={(e) => setEditedTier({ ...editedTier, price: e.target.value })}
                      className="text-[28px] sm:text-[36px] font-bold text-[#0C1824] bg-transparent border-none focus:ring-0 w-24 sm:w-36 p-0 tracking-tight"
                    />
                  </div>
                  <span className="text-[13px] sm:text-[14px] text-[#64748B] font-medium whitespace-nowrap">/ per year</span>
                </div>
              </div>

              {/* Features List */}
              <div className="space-y-4 bg-[#FAFBFC] p-4 sm:p-6 rounded-xl border border-[#EDEFF2]">
                {editedTier.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center justify-between group">
                    <div className="flex items-start gap-3 sm:gap-4 flex-1 mr-2">
                      <div className="w-[18px] h-[18px] rounded-full bg-[#5B8CFF] flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check size={10} className="text-white stroke-[4px]" />
                      </div>
                      <span className="text-[14px] sm:text-[14.5px] font-medium text-[#374151] leading-tight">{feature}</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <button className="p-1.5 text-[#5B8CFF] hover:bg-[#F0F5FF] rounded-lg transition-colors">
                        <Pencil size={15} />
                      </button>
                      <button 
                        onClick={() => handleFeatureDelete(idx)}
                        className="p-1.5 text-[#EF4444] hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>
                ))}

                {/* Add Feature Button - Centered */}
                <div className="flex justify-center mt-6">
                  <button
                    onClick={handleAddFeature}
                    className="h-10 px-6 border border-[#5B8CFF] text-[#5B8CFF] text-[13.5px] font-bold rounded-full hover:bg-[#5B8CFF] hover:text-white transition-all flex items-center gap-2 bg-white"
                  >
                    <Plus size={16} strokeWidth={3} />
                    Add Feature
                  </button>
                </div>
              </div>

              {/* Update Button */}
              <button
                onClick={() => onSave(editedTier)}
                className="w-full h-[52px] bg-[#5B8CFF] text-white text-[15px] font-bold rounded-xl hover:bg-[#4A7AE6] transition-all shadow-md mt-4 active:scale-[0.98]"
              >
                Update Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditTierModal;
