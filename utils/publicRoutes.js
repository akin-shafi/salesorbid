// utils/publicRoutes.js
export const publicRoutes = [
	"/",
	"/404",
	"/login",
	"/login-twoFactor",
	"/signup",
	"/forget-password",
	"/reset-password",
	// Add other public routes here
];

export const adminRoutes = [
	"/admin",
	"/admin/dashboard", // Example of admin-specific routes
	"/admin/users",
	"/admin/settings",
	// Add more admin routes here
];

export const excludedRoutes = [
	"/login",
	"/login-twoFactor",
	"/signup",
	"/forget-password",
	"/reset-password",
];
