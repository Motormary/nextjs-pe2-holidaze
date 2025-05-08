"use client"

import { createContext, useContext, useEffect, useState } from "react"

type UserProps = {
  id: string
  name: string
  email: string
  avatar: {
    url: string
    alt: string
  }
}

const UserContext = createContext<UserProps | null>(null)

export function useUser() {
  return useContext(UserContext)
}

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [value, setValue] = useState<UserProps | null>(null)

  useEffect(() => {
    async function getUser() {
      const user = await fetch("/api/user")
        .then((res) => res.json())
        .catch(() => null)

      setValue(user)
    }
    getUser()
  }, [])

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}
