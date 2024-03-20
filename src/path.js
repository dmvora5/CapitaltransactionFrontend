export const PATH = {
	verifyemail: "/verifyemail",
	login: "/login",
	forgetpassword: "/forget-password",
	resetPassword: "/reset-password",
	register: "/register",
	marketItemDetails: "/marketplace/equipment",
};

export const protectedRoutes = [
	"/dashboard/managment",
	"/dashboard/create-id",
	"/dashboard/licence",
	"/dashboard/passport",
	"/dashboard/realestate",
	"/dashboard/equipment",
	"/dashboard/uploadlist",
	"/dashboard/profile",
	"/",
];

export const authRoutes = ["/login"];

export const withoutLayoutRoutes = ["/"];

export const authFlowRoutes = [
	"/login",
	"/forget-password",
	"/verify",
	"/register",
	"/verifyemail",
	"/reset-password",
];

export const redirect_after_login = "/dashboard/managment";
