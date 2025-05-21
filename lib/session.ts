import "server-only"
import { SignJWT, jwtVerify } from "jose"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { cache } from "react"

//todo: set secure cookie

export const holiCookie = {
  name: "_holidaze_session",
  duration: 24 * 60 * 60 * 1000,
}

const secretKey = process.env.API_KEY
const encodedKey = new TextEncoder().encode(secretKey)
const noSession = {
  isAuth: false,
  accessToken: null,
  user: null,
}

export async function encrypt(payload: {
  username: string
  accessToken: string
  expires: Date
}) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedKey)
}

export async function decrypt(session: string | undefined = "") {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ["HS256"],
    })
    return payload
  } catch (error) {
    console.error("Failed to verify session")
  }
}

export async function createSession(data: {
  accessToken: string
  username: string
}) {
  if (!data.accessToken || !data.username)
    throw new Error("⚡ createSession ~ data missing or incomplete")
  const expires = new Date(Date.now() + holiCookie.duration)
  const session = await encrypt({
    accessToken: data.accessToken,
    username: data.username,
    expires,
  })
  const cookieStore = await cookies()

  cookieStore.set(holiCookie.name, session, {
    httpOnly: false,
    secure: false,
    sameSite: "lax",
    path: "/",
    expires,
  })
}

export const verifySession = cache(async () => {
  const hasSessionCookie = (await cookies()).has(holiCookie.name)
  if (!hasSessionCookie) return noSession

  const encryptedSession = (await cookies()).get(holiCookie.name)?.value
  const session = await decrypt(encryptedSession)

  if (!session?.accessToken) {
    return noSession
  } else {
    return {
      isAuth: true,
      accessToken: session.accessToken as string,
      user: session.username as string,
    }
  }
})

export async function updateSession() {
  const session = (await cookies()).get(holiCookie.name)?.value
  const payload = await decrypt(session)
  const cookieStore = await cookies()

  if (!session || !payload) {
    return null
  }

  const expires = new Date(Date.now() + holiCookie.duration)
  cookieStore.set(holiCookie.name, session, {
    httpOnly: false,
    secure: false,
    expires: expires,
    sameSite: "lax",
    path: "/",
  })
}

export async function deleteSession() {
  ;(await cookies()).delete(holiCookie.name)
  redirect("/")
}
