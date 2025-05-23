"use client"

import { TYPE_USER } from "@/lib/definitions"
import { Button } from "../ui/button"
import { memo } from "react"
import { useUser } from "../user-provider"

type props = {
  data: TYPE_USER
}

function EditProfile({ data }: props) {
  const { user } = useUser()
  if (user?.name !== data.name) return null
  return (
    <>
      <Button variant="secondary">Edit Profile</Button>
    </>
  )
}

export default memo(EditProfile)
