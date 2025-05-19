import { NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import { decrypt, holiCookie, updateSession } from "./lib/session"

// Nextjs docs

const publicRoutes = ["/login", "/register", "/"]
const redirectWhenAuth = ["/login", "/register"]

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname
  const isPublicRoute = publicRoutes.includes(path)
  const isRedirectRoute = redirectWhenAuth.includes(path)
  const hasSession = (await cookies()).has(holiCookie.name)

  if (hasSession && isRedirectRoute)
    return NextResponse.redirect(new URL("/", req.nextUrl))

  if (!isPublicRoute) {
    if (!hasSession) {
      return NextResponse.redirect(new URL("/login", req.nextUrl))
    }
    const cookie = (await cookies()).get(holiCookie.name)?.value
    const session = await decrypt(cookie)
    if (!session?.accessToken)
      return NextResponse.redirect(new URL("/login", req.nextUrl))
  }

  await updateSession()
  return NextResponse.next()
}

// Routes Middleware should not run on
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
}
