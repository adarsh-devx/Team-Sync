import React from "react";
import { User } from "lucide-react";
import UploadPhoto from "./UploadPhoto";
import FormInput from "./FormInput";
import FormTextarea from "./FormTextarea";

const PersonalInfoForm = ({ formData, onInputChange, onAvatarChange }) => {
  return (
    <div className="p-6 rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-color)] shadow-sm space-y-6">
      {/* Section Header */}
      <div className="flex items-center gap-2 pb-4 border-b border-[var(--border-color)]">
        <User size={18} className="text-purple-400" />
        <h2 className="text-lg font-bold text-[var(--text-primary)]">
          Personal Information
        </h2>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Left Photo Upload Column */}
        <UploadPhoto avatar={formData.avatar} onChange={onAvatarChange} />

        {/* Right Input Fields Column */}
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormInput
            label="Full Name"
            name="name"
            required
            value={formData.name}
            onChange={onInputChange}
            placeholder="e.g. Sarah Jenkins"
          />

          <FormInput
            label="Email Address"
            name="email"
            type="email"
            required
            value={formData.email}
            onChange={onInputChange}
            placeholder="sarah.j@synthetix.ai"
          />

          <div className="sm:col-span-2">
            <FormTextarea
              label="Bio / About"
              name="bio"
              value={formData.bio}
              onChange={onInputChange}
              placeholder="Tell us about the new team member..."
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoForm;
