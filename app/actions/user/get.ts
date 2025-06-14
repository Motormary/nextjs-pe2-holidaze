"use server"

import { API_USERS } from "@/lib/constants"
import { TYPE_GET_USER, Method, CacheTags } from "@/lib/definitions"
import { verifySession } from "@/lib/session"
import { failedToVerify } from "@/lib/utils"
import { cache } from "react"
import superFetch from "../fetch"

export const getUser = cache(
  async (user: string, params?: boolean): Promise<TYPE_GET_USER> => {
    const session = await verifySession()
    if (!session.accessToken) return failedToVerify()
    const res = await superFetch<TYPE_GET_USER>({
      method: Method.GET,
      url:
        API_USERS + `/${user}${params ? "?_bookings=true&_venues=true" : ""}`,
      token: session.accessToken,
      tags: [CacheTags.USER + user],
      revalidate: 60,
    })

    if (!res.success) {
      console.error("⚡ getUser ~ Error fetching user:", res)
      return { ...res }
    }

    return { ...res }
  },
)

export const getCurrentUser = cache(async (): Promise<TYPE_GET_USER> => {
  const session = await verifySession()
  if (!session.accessToken) return failedToVerify()
  const res = await getUser(session.user)

  return {
    ...res,
  }
})
