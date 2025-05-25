"use server"

import { API_VENUES } from "@/lib/constants"
import { CacheTags, Method, TYPE_RESPONSE } from "@/lib/definitions"
import { verifySession } from "@/lib/session"
import { failedToVerify } from "@/lib/utils"
import { revalidateTag } from "next/cache"
import superFetch from "../fetch"
import getVenue from "./get"

type props = {
  id: string
  owner: string
}

async function revalidateBookings(venueId: string) {
  const { data, success } = await getVenue(venueId)
  if (success) {
    data.data.bookings.forEach((booking) =>
      revalidateTag(CacheTags.USER_BOOKINGS + booking.customer.name),
    )
  }
}

export default async function deleteVenue({ id, owner }: props) {
  const session = await verifySession()
  if (!session.accessToken) return failedToVerify()
  if (owner !== session.user) {
    throw new Error(
      `Unauthorized request: ${session.user} tried to delete the venue '${id}' of ${owner}`,
    )
  }

  const res = await superFetch<TYPE_RESPONSE<null>>({
    method: Method.DELETE,
    url: API_VENUES + `/${id}`,
    token: session.accessToken,
  })

  if (!res.success) {
    console.error("⚡ deleteVenue ~ Error deleting venue:", res)
    return res
  }
  revalidateTag(CacheTags.USER + session.user)
  revalidateTag(CacheTags.ALL_VENUES)
  revalidateTag(CacheTags.USER_VENUES + session.user)
  revalidateTag(CacheTags.VENUE + id)
  revalidateBookings(id)
}
