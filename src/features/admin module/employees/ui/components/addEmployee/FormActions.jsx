import React from "react";
import { useNavigate } from "react-router";
import { UserPlus } from "lucide-react";

const FormActions = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-end gap-3 pt-4">
      {/* Cancel button */}
      <button
        type="button"
        onClick={() => navigate("/home/employee")}
        className="px-5 py-2.5 text-sm font-semibold rounded-xl border border-[var(--border-color)] bg-transparent text-[var(--text-primary)] hover:bg-[var(--bg-main)] transition-colors cursor-pointer"
      >
        Cancel
      </button>

      {/* Submit CTA button */}
      <button
        type="submit"
        className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-xl bg-purple-600 hover:bg-purple-700 text-white shadow-md shadow-purple-600/10 hover:shadow-purple-700/20 hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer"
      >
        <UserPlus size={16} />
        <span>Create Employee</span>
      </button>
    </div>
  );
};

export default FormActions;
