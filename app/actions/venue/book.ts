"use server"

import { API_BOOKINGS } from "@/lib/constants"
import { CacheTags, Method, TYPE_GET_BOOKING } from "@/lib/definitions"
import { verifySession } from "@/lib/session"
import { failedToVerify } from "@/lib/utils"
import superFetch from "../fetch"
import { revalidateTag } from "next/cache"

type Booking = {
  dateFrom: Date
  dateTo: Date
  venueId: string
  guests: number
}

export default async function bookVenue(data: Booking) {
  const session = await verifySession()
  if (!session.accessToken) return failedToVerify()
  const res = await superFetch<TYPE_GET_BOOKING>({
    method: Method.POST,
    url: API_BOOKINGS,
    token: session.accessToken,
    body: data,
  })

  if (!res.success) {
    console.error("⚡ BookVenue ~ Error fetching user:", res)
    return { ...res }
  }

  revalidateTag(CacheTags.VENUE + data.venueId)

  return { ...res }
}
