"use server"

import { API_VENUES } from "@/lib/constants"
import { CacheTags, Method, TYPE_GET_VENUE } from "@/lib/definitions"
import { verifySession } from "@/lib/session"
import { failedToVerify } from "@/lib/utils"
import { cache } from "react"
import superFetch from "../fetch"

const getVenue = cache(async (id: string): Promise<TYPE_GET_VENUE> => {
  const session = await verifySession()
  if (!session.accessToken) return failedToVerify()
  const res = await superFetch<TYPE_GET_VENUE>({
    method: Method.GET,
    url: API_VENUES + `/${id}?_owner=true&_bookings=true`,
    revalidate: 300,
    tags: [CacheTags.VENUE + id],
  })

  if (!res.success) {
    console.error("⚡ getVenue ~ Error fetching venue:", res)
    return { ...res }
  }

  return { ...res }
})

export default getVenue
