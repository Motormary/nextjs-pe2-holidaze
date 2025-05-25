"use server"

import { VenueSchema } from "@/components/venue/new-venue-form"
import { API_VENUES } from "@/lib/constants"
import { CacheTags, Method, TYPE_GET_VENUE } from "@/lib/definitions"
import { verifySession } from "@/lib/session"
import { failedToVerify } from "@/lib/utils"
import { revalidateTag } from "next/cache"
import { z } from "zod"
import superFetch from "../fetch"

export default async function updateVenue(
  data: z.infer<typeof VenueSchema>,
  id: string,
): Promise<TYPE_GET_VENUE> {
  const session = await verifySession()
  if (!session.accessToken) return failedToVerify()
  const res = await superFetch<TYPE_GET_VENUE>({
    method: Method.PUT,
    url: API_VENUES + `/${id}`,
    body: data,
    token: session.accessToken,
  })

  if (!res.success) {
    console.error("⚡ updateListing ~ Error updating listing:", res)
    return { ...res }
  }

  revalidateTag(CacheTags.ALL_VENUES)
  revalidateTag(CacheTags.VENUE + id)
  revalidateTag(CacheTags.USER_VENUES + session.user)
  revalidateTag(CacheTags.USER + session.user)

  return { ...res }
}
