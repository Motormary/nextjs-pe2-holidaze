"use server"

import { API_VENUES } from "@/lib/constants"
import { CacheTags, Method, TYPE_GET_VENUE } from "@/lib/definitions"
import { cache } from "react"
import superFetch from "../fetch"

const getVenue = cache(async (id: string): Promise<TYPE_GET_VENUE> => {
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
