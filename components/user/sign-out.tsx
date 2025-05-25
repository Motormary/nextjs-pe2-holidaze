"use client"

import { logoutUser } from "@/app/actions/user/login"
import { Button } from "../ui/button"
import { useUser } from "../user-provider"

export default function SignOut() {
  const { setUser } = useUser()

  async function signout() {
    setUser(null)
    await logoutUser()
  }

  return (
    <Button variant="secondary" onClick={signout}>
      Sign Out
    </Button>
  )
}
