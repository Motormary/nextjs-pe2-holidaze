"use client"

import { useUser } from "@/components/user-provider"
import { Compass, UserCircle } from "lucide-react"
import Form from "next/form"
import Link from "next/link"
import { ChangeEvent, memo, useState } from "react"
import { Button } from "./ui/button"
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "./ui/drawer"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import SearchIcon from "./ui/search-icon"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { DateRange } from "react-day-picker"
import { Calendar } from "./ui/calendar"

function MobileNav() {
  const [open, setOpen] = useState(false)
  const [date, setDate] = useState<DateRange | undefined>(undefined)
  const [adults, setAdults] = useState(0)
  const [childrens, setChildren] = useState(0)

  const user = useUser()
  const userLink = user ? `/user/${user.id}` : "/login"

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

  return (
    <div className="bg-background sticky bottom-0 z-50 w-full drop-shadow-[0px_5px_8px_gray] md:hidden">
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
          <Link href={userLink} className="flex flex-col items-center text-xs">
            {user ? (
              <Avatar className="h-[32px] w-[32px]">
                <AvatarImage src={user.avatar.url} alt={user.avatar.alt} />
                <AvatarFallback>
                  <UserCircle className="stroke-primary size-8" />
                </AvatarFallback>
              </Avatar>
            ) : (
              <UserCircle className="stroke-primary size-8" />
            )}
            <p className="text-muted-foreground">
              {user ? "My Page" : "Login"}
            </p>
          </Link>
        </div>
      </nav>
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerContent className="overflow-y-scroll">
          <DrawerHeader>
            <DrawerTitle>Find your next destination</DrawerTitle>
            <DrawerDescription className="sr-only">
              Fill out the search field and press search
            </DrawerDescription>
          </DrawerHeader>
          <Form action="/" className="flex flex-col gap-6 p-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="q">Venue</Label>
              <Input name="q" />
            </div>
            <div className="flex flex-col items-center justify-center gap-2">
              <Label htmlFor="calendar">Check in / Check out</Label>
              <Calendar
                id="calendar"
                mode="range"
                defaultMonth={date?.from}
                selected={date}
                onSelect={setDate}
                numberOfMonths={1}
              />
            </div>
            <div className="flex flex-col items-center justify-center gap-4 p-2">
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
            <Button>Search</Button>
          </Form>
        </DrawerContent>
      </Drawer>
    </div>
  )
}

export default memo(MobileNav)
