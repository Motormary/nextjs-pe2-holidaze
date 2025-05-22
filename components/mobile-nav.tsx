"use client"

import { useUser } from "@/components/user-provider"
import { cn } from "@/lib/utils"
import { format } from "date-fns/format"
import { CalendarIcon, Compass, Loader2, UserCircle } from "lucide-react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { ChangeEvent, memo, useState, useTransition } from "react"
import { DateRange } from "react-day-picker"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Button } from "./ui/button"
import { Calendar } from "./ui/calendar"
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "./ui/drawer"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import SearchIcon from "./ui/search-icon"

function MobileNav() {
  const [open, setOpen] = useState(false)
  const [date, setDate] = useState<DateRange | undefined>(undefined)
  const [adults, setAdults] = useState(0)
  const [childrens, setChildren] = useState(0)
  const searchParams = useSearchParams()
  const defaultQueryValue = searchParams.get("q")

  const [isPending, startTransition] = useTransition()
  const [query, setQuery] = useState<string | undefined>(
    defaultQueryValue ? defaultQueryValue : "",
  )
  const router = useRouter()
  const { user } = useUser()

  function toggleDrawer() {
    setOpen(!open)
  }

  function handleGuests(event: ChangeEvent<HTMLInputElement>) {
    const value = event.target.value
    const isNum = /^\d+$/.test(value)

    if (event.currentTarget.id === "adults") {
      if (!value) setAdults(0)
      else if (isNum) setAdults(Number(value))
    } else {
      if (!value) setChildren(0)
      if (isNum) setChildren(Number(value))
    }
  }

  function handleInput(event: ChangeEvent<HTMLInputElement>) {
    setQuery(event.currentTarget.value)
  }

  function handleQuery() {
    startTransition(() => {
      setOpen(false)
      router.push(`/?q=${query}`)
    })
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

  return (
    <div
      data-search={isPending ? "" : undefined}
      className="bg-background sticky bottom-0 z-[9999] w-full drop-shadow-[0px_5px_8px_gray] md:hidden"
    >
      <nav className="h-[59px]">
        <div className="container mx-auto grid h-full grid-cols-3 items-center gap-6 px-4">
          <Link href="/" className="flex flex-col items-center text-xs">
            <Compass className="stroke-primary size-8" />
            <p className="text-muted-foreground">Explore</p>
          </Link>
          <button
            onClick={toggleDrawer}
            className="flex flex-col items-center text-xs"
          >
            <SearchIcon />
            <p className="text-muted-foreground">Search</p>
          </button>
          {user ? (
            <Link
              href={`/user/${user.name}`}
              className="flex flex-col items-center text-xs"
            >
              <Avatar className="h-[32px] w-[32px]">
                <AvatarImage src={user.avatar.url} alt={user.avatar.alt} />
                <AvatarFallback>
                  <UserCircle className="stroke-primary size-8" />
                </AvatarFallback>
              </Avatar>
              <p className="text-muted-foreground">My Page</p>
            </Link>
          ) : (
            <Link href="/login" className="flex flex-col items-center text-xs">
              <UserCircle className="stroke-primary size-8" />
              <p className="text-muted-foreground">Login</p>
            </Link>
          )}
        </div>
      </nav>
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Find your next destination</DrawerTitle>
            <DrawerDescription className="sr-only">
              Fill out the search field and press search
            </DrawerDescription>
          </DrawerHeader>
          <div className="flex flex-col gap-6 overflow-y-auto p-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="q">Venue</Label>
              <Input
                value={query}
                onChange={handleInput}
                placeholder="Polar Circle 3B"
                name="q"
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="calendar">Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "pl-3 text-left font-normal",
                      !date && "text-muted-foreground",
                    )}
                  >
                    {date?.from ? (
                      date.to ? (
                        <>
                          {format(date.from, "LLL dd, y")} -{" "}
                          {format(date.to, "LLL dd, y")}
                        </>
                      ) : (
                        <>{format(date.from, "LLL dd, y")} - Check out</>
                      )
                    ) : (
                      "Check in / Check out"
                    )}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="range"
                    selected={date}
                    onSelect={setDate}
                    disabled={(date) =>
                      date < new Date(new Date().setHours(0, 0, 0, 0))
                    }
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="flex flex-col items-center justify-center gap-4 py-2">
              <div className="flex w-full justify-between">
                <p>
                  Adults
                  <span className="text-muted-foreground block text-xs">
                    Ages 18+
                  </span>
                </p>
                <div className="flex gap-1">
                  <Button
                    onClick={() => setAdults(adults ? adults - 1 : 0)}
                    size="icon"
                    className="rounded-full transition-colors"
                  >
                    -
                  </Button>
                  <Input
                    id="adults"
                    placeholder="0"
                    onChange={handleGuests}
                    value={adults}
                    className="w-10 overflow-clip border-transparent p-0 text-center outline-transparent"
                  />
                  <Button
                    onClick={() => setAdults(adults + 1)}
                    size="icon"
                    className="rounded-full transition-colors"
                  >
                    +
                  </Button>
                </div>
              </div>
              <div className="flex w-full justify-between">
                <p>
                  Children
                  <span className="text-muted-foreground block text-xs">
                    Ages 0-17
                  </span>
                </p>
                <div className="flex gap-1">
                  <Button
                    disabled={!adults}
                    onClick={() => setChildren(childrens ? childrens - 1 : 0)}
                    size="icon"
                    className="rounded-full transition-colors"
                  >
                    -
                  </Button>
                  <Input
                    disabled={!adults}
                    value={childrens}
                    onChange={handleGuests}
                    placeholder="0"
                    className="w-10 overflow-clip border-transparent p-0 text-center outline-transparent"
                  />
                  <Button
                    disabled={!adults}
                    onClick={() => setChildren(childrens + 1)}
                    size="icon"
                    className="rounded-full transition-colors"
                  >
                    +
                  </Button>
                </div>
              </div>
            </div>
            <Button disabled={isPending} onClick={handleQuery}>
              {isPending ? (
                <Loader2 className="size-5 animate-spin" />
              ) : (
                "Search"
              )}
            </Button>
            <Button
              disabled={!query && !date && !adults && !childrens}
              onClick={handleClear}
            >
              Clear filters
            </Button>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  )
}

export default memo(MobileNav)
