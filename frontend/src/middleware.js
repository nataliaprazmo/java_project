import { NextResponse } from 'next/server';

export function middleware(request) {
    let isLoggedIn =
		request.cookies.has("token") && request.cookies.get("token").value;
	let isAdmin =
		request.cookies.has("role") &&
		request.cookies.get("role").value === "admin";
	let isUser =
		request.cookies.has("role") &&
		request.cookies.get("role").value === "user";
	let adminPage = request.nextUrl.pathname.startsWith("/admin");
	let userPage = request.nextUrl.pathname.startsWith("/user");

	if (!isLoggedIn) {
		request.cookies.delete("token");
		request.cookies.delete("role");
		return NextResponse.redirect(new URL("/login", request.url));
	}
	if (adminPage && isUser) {
		return NextResponse.redirect(new URL("/user", request.url));
	}
	if (userPage && isAdmin) {
		return NextResponse.redirect(new URL("/admin", request.url));
	}

    return NextResponse.next();
}

export const config = {
    matcher: ['/user/:path*', '/admin/:path*'], 
}