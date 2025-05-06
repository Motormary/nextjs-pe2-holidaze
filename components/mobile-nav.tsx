"use client"

import { useUser } from "@/hooks/use-user"

export default function MobileNav() {
  const user = useUser()

  return (
    <nav className="bg-background sticky bottom-0 z-50 w-full outline-black">
      <div className="container mx-auto px-4">{user ? user.name : ""}</div>
    </nav>
  )
}
