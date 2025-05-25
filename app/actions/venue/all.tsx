"use server"

import { CacheTags, Method, TYPE_GET_ALL_VENUES } from "@/lib/definitions"
import { cache } from "react"
import superFetch from "../fetch"

const getAllVenues = cache(
  async (
    params?: URLSearchParams | string[][] | string | any,
  ): Promise<TYPE_GET_ALL_VENUES> => {
    const res = await superFetch<TYPE_GET_ALL_VENUES>({
      method: Method.GET,
      url: `https://v2.api.noroff.dev/holidaze/venues${params}&sort=created`,
      revalidate: 300,
      tags: [CacheTags.ALL_VENUES],
    })

    if (!res.success) {
      console.error("⚡ getAllListings ~ Error fetching listings:", res)
      return { ...res }
    }

    return { ...res }
  },
)

export default getAllVenues
