"use server"

import { API_BOOKINGS } from "@/lib/constants"
import { CacheTags, Method, TYPE_GET_BOOKING } from "@/lib/definitions"
import { verifySession } from "@/lib/session"
import { failedToVerify } from "@/lib/utils"
import { revalidatePath, revalidateTag } from "next/cache"
import superFetch from "../fetch"

export default async function cancelBooking(id: string) {
  const session = await verifySession()
  if (!session.accessToken) return failedToVerify()
  const res = await superFetch<TYPE_GET_BOOKING>({
    method: Method.DELETE,
    url: API_BOOKINGS + `/${id}`,
    token: session.accessToken,
  })

  if (!res.success) {
    console.error("⚡ getUser ~ Error fetching user:", res)
    return { ...res }
  }

  revalidateTag(CacheTags.VENUE + id)
  revalidatePath(`/user/${session.user}`)

  return { ...res }
}
