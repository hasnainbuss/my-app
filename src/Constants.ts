export const Roles = {
  ALL_ROLES: ["SuperAdmin", "Admin", "User", "Developer"],

  ALL_ROLES_EXCEPT_SUPERADMIN: ["Admin", "User"],

  ONLY_SUPER_ADMIN: ["SuperAdmin"],

  ADMIN_AND_ABOVE: ["SuperAdmin", "Admin"],

  DEVELOPER_AND_ABOVE: ["SuperAdmin", "Admin", "Developer"],

  SUPER_ADMIN: "SuperAdmin",
  ADMIN: "Admin",
  DEVELOPER: "Developer",

  USER: "User",
};

export const CUSTOMER_NAME = "AllStar BPO";

export const PORTAL_NAME = "Web Template Portal";

export const DEFAULT_DELAY_INTERVAL_MS = 1000;

export const DEFAULT_DEBOUNCE_DELAY_INTERVAL_MS = 300;

export const DEFAULT_UTC_OFFSET = -4;
