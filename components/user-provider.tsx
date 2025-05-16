"use client"

import { TYPE_USER } from "@/lib/definitions"
import { createContext, useContext, useEffect, useState } from "react"

// Update the context type to include a setter function
type UserContextType = {
  user: TYPE_USER | null
  setUser: (user: TYPE_USER | null) => void
}

// Create context with a default value
const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
})

export function useUser() {
  return useContext(UserContext)
}

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<TYPE_USER | null>(null)

  useEffect(() => {
    async function getUser() {
      const userData = await fetch("/api/user")
        .then((res) => res.json())
        .catch(() => null)

      setUser(userData)
    }
    getUser()
  }, [])

  // Provide both the user value and the setter function
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  )
}
