import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../../../config/axiosInstance";
import { USE_MOCK_API } from "../../../../mock/mockConfig";
import { getMockUser, mockLogin } from "../../../../mock/mockApi";

export let loginEmployee = createAsyncThunk(
  "auth/login",
  async (credentials, thunkApi) => {
    // 🧪 Mock mode: backend down hai, isliye network call skip karke fake employee return karte hain
    if (USE_MOCK_API) {
      return mockLogin(credentials);
    }

    try {
      let res = await axiosInstance.post("/auth/login", credentials);

      return res.data.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);

export let currentLoggedEmployee = createAsyncThunk(
  "auth/me",
  async (_, thunkApi) => {
    // 🧪 Mock mode: localStorage me saved user se session restore karte hain
    if (USE_MOCK_API) {
      let savedEmployee = getMockUser();

      if (savedEmployee) {
        return savedEmployee;
      }

      return thunkApi.rejectWithValue("No authenticated user found");
    }

    try {
      let res = await axiosInstance.get("/auth/me");

      return res.data.user;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);
