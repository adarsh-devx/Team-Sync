import React, { useRef } from "react";
import { Camera, Pencil } from "lucide-react";

const UploadPhoto = ({ avatar, onChange }) => {
  const fileInputRef = useRef(null);

  const handleBoxClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 800 * 1024) {
        alert("File size must not exceed 800KB!");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        onChange(reader.result); // Updates state with Base64 preview
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col items-center sm:items-start gap-2">
      {/* Upload area box */}
      <div
        onClick={handleBoxClick}
        className="relative w-32 h-32 rounded-2xl border-2 border-dashed border-[var(--border-color)] bg-[var(--bg-main)]/30 hover:bg-[var(--bg-main)]/50 hover:border-purple-500/50 flex flex-col items-center justify-center cursor-pointer transition-all group overflow-hidden"
      >
        {avatar ? (
          <img src={avatar} alt="Avatar Preview" className="w-full h-full object-cover" />
        ) : (
          <div className="flex flex-col items-center text-[var(--text-muted)] group-hover:text-purple-400 transition-colors">
            <Camera size={28} className="mb-2 stroke-[1.5]" />
            <span className="text-xs font-semibold">Upload Photo</span>
          </div>
        )}

        {/* Floating Edit Icon */}
        <div className="absolute bottom-2 right-2 p-1.5 rounded-lg bg-purple-600 text-white shadow-md border border-purple-500 group-hover:scale-105 transition-transform">
          <Pencil size={11} />
        </div>
      </div>

      <p className="text-[10px] text-[var(--text-muted)] font-medium mt-1">
        JPG or PNG. Max size of 800K.
      </p>

      {/* Hidden input field */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/png, image/jpeg, image/jpg"
        className="hidden"
      />
    </div>
  );
};

export default UploadPhoto;
