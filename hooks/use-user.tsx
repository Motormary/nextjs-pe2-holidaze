"use client"

import { createContext, useContext, useEffect, useState } from "react"

type UserProps = {
  name: string
  email: string
}

const UserContext = createContext<UserProps | null>(null)

export function useUser() {
  return useContext(UserContext)
}

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [value, setValue] = useState<UserProps | null>(null)

  useEffect(() => {
    setValue({
      name: "Myname",
      email: "e@mail.com",
    })
  }, [])

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}
