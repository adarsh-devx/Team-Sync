import React, { useState } from "react";
import AddEmployeeHeader from "../components/addEmployee/AddEmployeeHeader";
import PersonalInfoForm from "../components/addEmployee/PersonalInfoForm";
import EmploymentDetailsForm from "../components/addEmployee/EmploymentDetailsForm";
import FormActions from "../components/addEmployee/FormActions";

const AddEmployee = () => {
  // Form values state matching backend model requirements
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    bio: "",
    department: "",
    role: "",
    joiningDate: "",
    status: "active",
    avatar: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAvatarChange = (base64Img) => {
    setFormData((prev) => ({ ...prev, avatar: base64Img }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting Profile Configuration:", formData);
    alert("New employee configurations logged in console successfully!");
    // You can connect your useMutation hooks here
  };

  return (
    <div className="flex-1 flex flex-col gap-6 select-none animate-in fade-in duration-300 pb-10">
      {/* Page Title & Breadcrumbs header */}
      <AddEmployeeHeader />

      {/* Main submission form wrapper */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Card Section 1: Personal Information */}
        <PersonalInfoForm
          formData={formData}
          onInputChange={handleInputChange}
          onAvatarChange={handleAvatarChange}
        />

        {/* Card Section 2: Employment Details */}
        <EmploymentDetailsForm
          formData={formData}
          onInputChange={handleInputChange}
        />

        {/* Card Section 3: Actions Cancel / Submit triggers */}
        <FormActions />
      </form>
    </div>
  );
};

export default AddEmployee;
