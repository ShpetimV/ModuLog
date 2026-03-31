import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

const authRoutes = ["/login", "/signup"]

export async function middleware(request: NextRequest) {
    const token = request.cookies.get("token")?.value
    const isAuthRoute = authRoutes.includes(request.nextUrl.pathname)

    if (!token) {
        // no token — block dashboard, allow auth pages
        if (!isAuthRoute) {
            return NextResponse.redirect(new URL("/login", request.url))
        }
        return NextResponse.next()
    }

    // has token — validate it
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/validate`, {
            headers: { Cookie: `token=${token}` },
        })

        if (res.ok && isAuthRoute) {
            // valid token + trying to visit login/signup → redirect to dashboard
            return NextResponse.redirect(new URL("/dashboard", request.url))
        }

        if (!res.ok && !isAuthRoute) {
            // invalid token + trying to visit protected route → redirect to login
            return NextResponse.redirect(new URL("/login", request.url))
        }
    } catch {
        if (!isAuthRoute) {
            return NextResponse.redirect(new URL("/login", request.url))
        }
    }

    return NextResponse.next()
}

export const config = {
    matcher: ["/dashboard/:path*", "/login", "/signup"],
}