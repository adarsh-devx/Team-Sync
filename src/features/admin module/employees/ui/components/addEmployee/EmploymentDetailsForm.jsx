import React from "react";
import { Briefcase } from "lucide-react";
import FormSelect from "./FormSelect";
import FormInput from "./FormInput";
import RadioStatus from "./RadioStatus";

const EmploymentDetailsForm = ({ formData, onInputChange }) => {
  // Department options mapping
  const departmentOptions = [
    { value: "common", label: "Common" },
    { value: "engineering", label: "Engineering" },
    { value: "design", label: "Design" },
    { value: "marketing", label: "Marketing" },
  ];

  // Role options mapping
  const roleOptions = [
    { value: "employee", label: "Employee" },
    { value: "admin", label: "Admin" },
  ];

  return (
    <div className="p-6 rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-color)] shadow-sm space-y-6">
      {/* Section Header */}
      <div className="flex items-center gap-2 pb-4 border-b border-[var(--border-color)]">
        <Briefcase size={18} className="text-purple-400" />
        <h2 className="text-lg font-bold text-[var(--text-primary)]">
          Employment Details
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <FormSelect
          label="Department"
          name="department"
          required
          value={formData.department}
          onChange={onInputChange}
          placeholder="Select Department"
          options={departmentOptions}
        />

        <FormSelect
          label="Role"
          name="role"
          required
          value={formData.role}
          onChange={onInputChange}
          placeholder="Select Role"
          options={roleOptions}
        />

        <FormInput
          label="Joining Date"
          name="joiningDate"
          type="date"
          required
          value={formData.joiningDate}
          onChange={onInputChange}
        />

        <RadioStatus
          label="Employment Status"
          name="status"
          value={formData.status}
          onChange={onInputChange}
        />
      </div>
    </div>
  );
};

export default EmploymentDetailsForm;
