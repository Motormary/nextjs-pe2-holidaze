"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { ChangeEvent, useState, useTransition } from "react"
import { DateRange } from "react-day-picker"

export default function useQuery() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const defaultQueryValue = searchParams.get("q")

  const [isPending, startTransition] = useTransition()
  const [query, setQuery] = useState<string | undefined>(
    defaultQueryValue ? defaultQueryValue : "",
  )
  const [date, setDate] = useState<DateRange | undefined>(undefined)
  const [adults, setAdults] = useState(0)
  const [childrens, setChildren] = useState(0)
  const [open, setOpen] = useState(false)

  function handleInput(event: ChangeEvent<HTMLInputElement>) {
    setQuery(event.currentTarget.value)
  }

  function handleClear() {
    setQuery("")
    setDate(undefined)
    setAdults(0)
    setChildren(0)

    if (defaultQueryValue) {
      startTransition(() => {
        setOpen(false)
        router.push("/")
      })
    }
  }

  function handleQuery() {
    startTransition(() => {
      router.push(`/?q=${query}`)
    })
  }

  function handleGuests(event: ChangeEvent<HTMLInputElement>) {
    const value = event.target.value
    const isNum = /^\d+$/.test(value)

    if (isNum && Number(value) >= 100) return

    if (event.currentTarget.id === "adults") {
      if (!value) setAdults(0)
      else if (isNum) setAdults(Number(value))
    } else {
      if (!value) setChildren(0)
      if (isNum) setChildren(Number(value))
    }
  }

  return {
    query,
    isPending,
    date,
    adults,
    childrens,
    open,
    handleInput,
    handleClear,
    handleQuery,
    handleGuests,
    setOpen,
    setAdults,
    setChildren,
    setDate,
  }
}
