// Runnable self-check for the employee list derivation logic (sorting + "Showing X of Y").
// No test framework needed.   Run:   node scripts/check-employee-list.mjs
//
// Ye tab fail hoga jab utils/employeeList.js ki sorting ya label logic tootegi —
// Employee grid ka order aur pagination footer isi par depend karte hain.
import assert from "node:assert/strict";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const target = path.join(
  here,
  "..",
  "src",
  "features",
  "admin module",
  "employees",
  "utils",
  "employeeList.js"
);

const { sortEmployees, getShowingLabel, getInitials, formatJoinedDate } = await import(
  pathToFileURL(target).href
);

let pass = 0;
const check = (label, fn) => {
  fn();
  pass += 1;
  console.log("  ok  " + label);
};

// Seed data ke shape par (createdAt missing wala case bhi include)
const employees = [
  { name: "Kabir Nair", createdAt: "2026-09-17T00:00:00.000Z" },
  { name: "Neha Iyer", createdAt: "2026-09-10T00:00:00.000Z" },
  { name: "Imran Qureshi", createdAt: "2026-09-20T00:00:00.000Z" },
  { name: "Sneha Kapoor" }, // createdAt missing -> epoch treat hota hai
  { name: "aarav sharma", createdAt: "2026-09-01T00:00:00.000Z" },
];

check("name-asc sorts alphabetically (case-insensitive collation)", () => {
  const got = sortEmployees(employees, "name-asc").map((e) => e.name);
  assert.deepEqual(got, [...got].sort((a, b) => a.localeCompare(b)));
});

check("name-desc is the exact reverse of name-asc", () => {
  const asc = sortEmployees(employees, "name-asc").map((e) => e.name);
  const desc = sortEmployees(employees, "name-desc").map((e) => e.name);
  assert.deepEqual(desc, [...asc].reverse());
});

check("newest puts the latest createdAt first", () => {
  assert.equal(sortEmployees(employees, "newest")[0].name, "Imran Qureshi");
});

check("oldest puts missing createdAt (epoch) first", () => {
  assert.equal(sortEmployees(employees, "oldest")[0].name, "Sneha Kapoor");
});

check("missing createdAt does not crash and keeps every row", () => {
  assert.equal(sortEmployees(employees, "newest").length, employees.length);
});

check("original array is never mutated", () => {
  const before = employees.map((e) => e.name);
  sortEmployees(employees, "name-desc");
  assert.deepEqual(employees.map((e) => e.name), before);
});

check("unknown sortBy falls back to name-asc", () => {
  assert.deepEqual(
    sortEmployees(employees, "bogus").map((e) => e.name),
    sortEmployees(employees, "name-asc").map((e) => e.name)
  );
});

check("empty / undefined input returns an empty list", () => {
  assert.deepEqual(sortEmployees([], "name-asc"), []);
  assert.deepEqual(sortEmployees(undefined, "name-asc"), []);
});

check("label: single page matches the brief wording exactly", () => {
  assert.equal(
    getShowingLabel({ currentPage: 1, totalPages: 1, totalItems: 8, pageSize: 8 }),
    "Showing 8 of 8 employees"
  );
});

check("label: completely empty organization", () => {
  assert.equal(
    getShowingLabel({ currentPage: 1, totalPages: 1, totalItems: 0, pageSize: 8 }),
    "Showing 0 of 0 employees"
  );
});

check("label: middle page shows a range", () => {
  assert.equal(
    getShowingLabel({ currentPage: 2, totalPages: 3, totalItems: 20, pageSize: 8 }),
    "Showing 9-16 of 20 employees"
  );
});

check("label: last partial page ends at totalItems", () => {
  assert.equal(
    getShowingLabel({ currentPage: 3, totalPages: 3, totalItems: 20, pageSize: 8 }),
    "Showing 17-20 of 20 employees"
  );
});

check("label: totalPages=0 is treated as a single page", () => {
  assert.equal(
    getShowingLabel({ currentPage: 1, totalPages: 0, totalItems: 0, pageSize: 8 }),
    "Showing 0 of 0 employees"
  );
});

check("getInitials: multi-word name uses first + LAST initial", () => {
  assert.equal(getInitials("Kabir Nair"), "KN");
  assert.equal(getInitials("Team Sync Admin"), "TA");
});

check("getInitials: single word uses first two letters", () => {
  assert.equal(getInitials("Admin"), "AD");
});

check("getInitials: empty / missing name returns placeholder", () => {
  assert.equal(getInitials(""), "?");
  assert.equal(getInitials(undefined), "?");
});

check("formatJoinedDate: formats a date, N/A when missing", () => {
  // Midday UTC — timezone offset se date shift na ho
  assert.equal(formatJoinedDate("2026-09-17T12:00:00.000Z"), "Sep 17, 2026");
  assert.equal(formatJoinedDate(undefined), "N/A");
});

console.log(`\n${pass}/${pass} checks passed`);