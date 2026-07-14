import { axiosInstance } from "../../../../config/axiosInstance";

export let getAllEmployees = async () => {
  try {
    let res = await axiosInstance.get("/employee");
    return res.data.data;
  } catch (error) {
    console.log(error);
  }
};


export let createEmployee = async (data) => {
  try {
    let res = await axiosInstance.post("/employee/create", data);
    console.log(res);
    
    return res.data.data;
  } catch (error) {
    console.log('error in create employee api',error);
  }
}




export let updateEmploye = async (empId , data ) => {
  try {
    let res = await axiosInstance.put(`/employee/update/${empId}` , data);
    console.log(res);
    return res
  } catch (error) {
    console.log('error in update employee api' , error);
  }
}

getAllEmployees();
