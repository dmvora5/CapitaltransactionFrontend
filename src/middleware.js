import { NextResponse } from "next/server";
import {
	PATH,
	authRoutes,
	protectedRoutes,
	redirect_after_login,
} from "./path";

export function middleware(request) {
	const currentUser = request.cookies.get("currentUser")?.value;
	if (
		protectedRoutes.includes(request.nextUrl.pathname) &&
		(!currentUser || Date.now() > JSON.parse(currentUser).expireAt)
	) {
		request.cookies.delete("currentUser");
		const response = NextResponse.redirect(
			new URL(PATH.login, request.url)
		);
		response.cookies.delete("currentUser");

		return response;
	}

	if (authRoutes.includes(request.nextUrl.pathname) && currentUser) {
		const response = NextResponse.redirect(
			new URL(redirect_after_login, request.url)
		);
		return response;
	}
}
