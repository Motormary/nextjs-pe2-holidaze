"use server"

import { API_USERS } from "@/lib/constants"
import {
  CacheTags,
  Method,
  TYPE_GET_USER,
  TYPE_USER_EDIT,
} from "@/lib/definitions"
import { verifySession } from "@/lib/session"
import { failedToVerify } from "@/lib/utils"
import { revalidateTag } from "next/cache"
import superFetch from "../fetch"

export default async function updateUser(
  data: TYPE_USER_EDIT,
): Promise<TYPE_GET_USER> {
  const session = await verifySession()
  if (!session.accessToken) return failedToVerify()
  const res = await superFetch<TYPE_GET_USER>({
    method: Method.PUT,
    url: API_USERS + `/${session.user}`,
    body: data,
    token: session.accessToken,
  })

  if (!res.success) {
    console.error(res.data)
    return res
  }

  revalidateTag(CacheTags.USER + session.user)

  return res
}
