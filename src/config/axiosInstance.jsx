import axios from "axios";

// Backend URL env se aata hai. Default purana deployed API hai, taaki env na hone pe
// kuch bhi break na ho.
const baseURL = import.meta.env.VITE_API_URL || "https://api.team-sync.space/api";

export let axiosInstance = axios.create({
  baseURL,
  withCredentials: true,
});

// Refresh call ka apna client — ispe koi interceptor nahi hai.
// Warna 401 -> refresh -> 401 -> refresh ... ka infinite loop ban jaata hai.
const refreshClient = axios.create({
  baseURL,
  withCredentials: true,
});

// In endpoints ka 401 matlab hai "email/password galat ya session hi nahi hai" —
// token expire nahi hua. Inpe refresh try karna bekaar hai (aur redirect loop banata hai).
const AUTH_ENDPOINTS = ["/auth/login", "/auth/register", "/auth/logout", "/auth/get-accessToken"];

// Public pages: yahan already ho to redirect mat karo, warna page reload hoke
// wahi cycle dobara chalu ho jaati hai.
const PUBLIC_PATHS = ["/", "/register"];

// Ek time pe sirf ek refresh call — agar 3-4 requests ek saath 401 dein to
// teeno wahi ek refresh ka wait karein (spam se bachne ke liye).
let refreshPromise = null;

function refreshAccessToken() {
  if (!refreshPromise) {
    refreshPromise = refreshClient.get("/auth/get-accessToken").finally(() => {
      refreshPromise = null;
    });
  }

  return refreshPromise;
}

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    let originalReq = error.config;
    let url = originalReq?.url || "";
    let isAuthEndpoint = AUTH_ENDPOINTS.some((endpoint) => url.includes(endpoint));

    let shouldRefresh =
      error.response?.status === 401 && originalReq && !originalReq._retry && !isAuthEndpoint;

    if (!shouldRefresh) {
      return Promise.reject(error);
    }

    originalReq._retry = true;

    try {
      await refreshAccessToken();
      return axiosInstance(originalReq);
    } catch (refreshError) {
      // Session khatam ho gaya (refresh cookie bhi invalid/expire).
      if (!PUBLIC_PATHS.includes(window.location.pathname)) {
        window.location.href = "/";
      }

      return Promise.reject(refreshError);
    }
  }
);