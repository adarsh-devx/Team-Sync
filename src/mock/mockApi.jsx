// 🧪 MOCK API LAYER
// Ye file real backend ke 3 endpoints ki nakal karti hai:
//   POST /auth/login, GET /auth/me, GET /employee, POST /employee/create, PUT /employee/update/:id
// Data localStorage me save hota hai, isliye add/update status refresh ke baad bhi bana rehta hai.
import { MOCK_EMPLOYEES_KEY, MOCK_USER_KEY } from "./mockConfig";
import { seedEmployees } from "./mockEmployees";

// ---------------------- localStorage safe helpers ----------------------
const readStorage = (key, fallback) => {
  try {
    let raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (error) {
    console.log("mock storage read error", error);
    return fallback;
  }
};

const writeStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.log("mock storage write error", error);
  }
};

export const makeMockId = () =>
  `mock-emp-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

// ---------------------- employee mock APIs ----------------------
export const loadMockEmployees = () => {
  let employees = readStorage(MOCK_EMPLOYEES_KEY, null);

  // Pehli baar kholne pe seed data daal dete hain
  if (!Array.isArray(employees) || employees.length === 0) {
    employees = seedEmployees;
    writeStorage(MOCK_EMPLOYEES_KEY, employees);
  }

  return employees;
};

export const saveMockEmployees = (employees) =>
  writeStorage(MOCK_EMPLOYEES_KEY, employees);

// GET /employee
export const mockGetAllEmployees = () => loadMockEmployees();

// POST /employee/create
export const mockCreateEmployee = (data) => {
  let now = new Date().toISOString();

  let employee = {
    _id: makeMockId(),
    name: data?.name || "Unnamed Employee",
    email: data?.email || "",
    bio: data?.bio || "",
    department: data?.department || "common",
    role: data?.role || "employee",
    joiningDate: data?.joiningDate || now,
    status: data?.status || "active",
    avatar: data?.avatar || "",
    createdAt: now,
    updatedAt: now,
  };

  saveMockEmployees([employee, ...loadMockEmployees()]);

  return employee;
};

// PUT /employee/update/:empId
// Axios response jaisa hi shape return karte hain ({ data: { data } }) taaki caller code same rahe.
export const mockUpdateEmployee = (empId, data) => {
  let updatedEmployee = null;

  let employees = loadMockEmployees().map((employee) => {
    if (employee._id !== empId) return employee;

    updatedEmployee = {
      ...employee,
      ...data,
      updatedAt: new Date().toISOString(),
    };
    return updatedEmployee;
  });

  saveMockEmployees(employees);

  return {
    status: 200,
    data: { data: updatedEmployee, message: "Employee updated (mock)" },
  };
};

// Sab kuch wapas seed state pe le aata hai (browser console se call kar sakte ho)
export const resetMockData = () => {
  writeStorage(MOCK_EMPLOYEES_KEY, seedEmployees);
  return loadMockEmployees();
};

// ---------------------- auth mock APIs ----------------------
const toTitleCase = (text) =>
  text
    .split(" ")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

// Login ka asli trick: email me "admin" ho to admin role, warna employee role.
export const mockBuildEmployee = (email) => {
  let safeEmail = (email || "guest@team-sync.space").trim().toLowerCase();
  let isAdmin = safeEmail.includes("admin");
  let name = toTitleCase(
    safeEmail.split("@")[0].replace(/[._-]+/g, " ") || "Guest User",
  );

  return {
    _id: isAdmin ? "mock-admin-001" : "mock-employee-001",
    name: name || "Guest User",
    email: safeEmail,
    bio: "Mock mode se login kiya gaya user.",
    department: isAdmin ? "common" : "engineering",
    role: isAdmin ? "admin" : "employee",
    joiningDate: new Date().toISOString().slice(0, 10),
    status: "active",
    avatar: "",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
};

// POST /auth/login
export const mockLogin = (credentials) => {
  let employee = mockBuildEmployee(credentials?.email);
  saveMockUser(employee);
  return employee;
};

// GET /auth/me
export const getMockUser = () => readStorage(MOCK_USER_KEY, null);

export const saveMockUser = (employee) => writeStorage(MOCK_USER_KEY, employee);

export const clearMockUser = () => {
  try {
    localStorage.removeItem(MOCK_USER_KEY);
  } catch (error) {
    console.log("mock user clear error", error);
  }
};