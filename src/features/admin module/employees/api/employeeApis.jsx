import { axiosInstance } from "../../../../config/axiosInstance";
import { USE_MOCK_API } from "../../../../mock/mockConfig";
import {
  mockCreateEmployee,
  mockGetAllEmployees,
  mockUpdateEmployee,
} from "../../../../mock/mockApi";

export let getAllEmployees = async () => {
  // 🧪 Mock mode
  if (USE_MOCK_API) {
    return mockGetAllEmployees();
  }

  try {
    let res = await axiosInstance.get("/employee");
    return res.data.data;
  } catch (error) {
    console.log(error);
  }
};


export let createEmployee = async (data) => {
  // 🧪 Mock mode
  if (USE_MOCK_API) {
    return mockCreateEmployee(data);
  }

  try {
    let res = await axiosInstance.post("/employee/create", data);
    console.log(res);
    
    return res.data.data;
  } catch (error) {
    console.log('error in create employee api',error);
  }
}




export let updateEmploye = async (empId , data ) => {
  // 🧪 Mock mode: axios response jaisa hi shape return hota hai
  if (USE_MOCK_API) {
    return mockUpdateEmployee(empId, data);
  }

  try {
    let res = await axiosInstance.put(`/employee/update/${empId}` , data);
    console.log(res);
    return res
  } catch (error) {
    console.log('error in update employee api' , error);
  }
}

getAllEmployees();
