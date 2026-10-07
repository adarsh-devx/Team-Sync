// 🧪 MOCK API CONFIG
// Real backend (https://api.team-sync.space/api) down tha, isliye app local mock data pe chalti thi.
// Ab backend env se control hota hai: team-sync/.env.local me VITE_USE_MOCK_API=false kar do to
// real API use hogi, env na hone pe mock ON rehta hai (purana behaviour).
export const USE_MOCK_API = import.meta.env.VITE_USE_MOCK_API !== "false";

// localStorage keys (mock data yahin store hota hai)
export const MOCK_USER_KEY = "team-sync:mock-user";
export const MOCK_EMPLOYEES_KEY = "team-sync:mock-employees";