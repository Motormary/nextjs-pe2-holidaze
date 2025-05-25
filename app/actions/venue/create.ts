"use server"

import { API_VENUES } from "@/lib/constants"
import { CacheTags, Method, TYPE_GET_VENUE } from "@/lib/definitions"
import { verifySession } from "@/lib/session"
import { failedToVerify } from "@/lib/utils"
import { revalidateTag } from "next/cache"
import superFetch from "../fetch"
import { z } from "zod"
import { VenueSchema } from "@/components/venue/new-venue-form"

export default async function createVenue(
  data: z.infer<typeof VenueSchema>,
): Promise<TYPE_GET_VENUE> {
  const session = await verifySession()
  if (!session.accessToken) return failedToVerify()
  const res = await superFetch<TYPE_GET_VENUE>({
    method: Method.POST,
    url: API_VENUES,
    body: data,
    token: session.accessToken,
  })

  if (!res.success) {
    console.error("⚡ createListing ~ Error creating listing:", res)
    return { ...res }
  }

  revalidateTag(CacheTags.ALL_VENUES)
  revalidateTag(CacheTags.USER_VENUES + session.user)

  return { ...res }
}
