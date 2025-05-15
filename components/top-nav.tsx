"use client"

import { Button, buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { useScrolledFromTop } from "@/hooks/use-scroll"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { Loader2, Search, UserCircle, X } from "lucide-react"
import { AnimatePresence, motion } from "motion/react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { ChangeEvent, memo, useRef, useState, useTransition } from "react"
import { DateRange } from "react-day-picker"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Calendar } from "./ui/calendar"
import { useUser } from "./user-provider"

/* Backend does not support guests and check in filtering, so they are merely placeholders */

function TopNav() {
  const router = useRouter()
  const user = useUser()
  const inputRef = useRef<null | HTMLInputElement>(null)
  const userLink = user ? `/user/${user.id}` : "/login"
  const scrolled = useScrolledFromTop(61)
  const searchParams = useSearchParams()
  const defaultQueryValue = searchParams.get("q")

  const [isPending, startTransition] = useTransition()
  const [query, setQuery] = useState<string | undefined>(
    defaultQueryValue ? defaultQueryValue : "",
  )
  const [open, setOpen] = useState(query ? true : false)
  const [date, setDate] = useState<DateRange | undefined>(undefined)
  const [adults, setAdults] = useState(0)
  const [childrens, setChildren] = useState(0)

  function handleInput(event: ChangeEvent<HTMLInputElement>) {
    setQuery(event.currentTarget.value)
  }
  function handleBlur() {
    if (query) return
    else setOpen(false)
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

  return (
    <nav
      data-search={isPending ? "" : undefined}
      className={"peer bg-background h-[142px] w-full py-1.5 max-md:hidden"}
    >
      <motion.div
        animate={scrolled ? { height: "60px" } : { height: "142px" }}
        transition={{ bounceDamping: 8, duration: 0.5 }}
        className="bg-background fixed top-0 z-50 flex w-full flex-col gap-2"
      >
        <div
          className={cn(
            "bg-background z-50 container mx-auto flex justify-between px-4 py-2",
          )}
        >
          <Link href="/" className="content-center">
            <picture className="size-8">
              <img className="h-6" src="holi-logo.png" alt="logo" />
            </picture>
          </Link>
          <ul className="flex items-center gap-4">
            <li className="flex gap-4">
              <Button className="text-sm" variant="ghost">
                Add Venue
              </Button>
              <Link href={userLink} className="content-center">
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
              </Link>
            </li>
          </ul>
        </div>
        <div
          className={cn(
            scrolled ? "outline-transparent" : "outline-muted",
            "w-full outline transition-colors",
          )}
        />
        <motion.div
          style={{
            zIndex: 50,
          }}
          animate={scrolled ? { translateY: "-65px" } : { translateY: "0px" }}
          transition={{ bounceDamping: 8, duration: 0.5 }}
          className="flex justify-center"
        >
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="h-11">
                  <div className={cn("flex flex-col lg:min-w-[130px]")}>
                    Fellowship
                    <span
                      className={cn(
                        scrolled && "max-lg:hidden",
                        "text-muted-foreground text-xs",
                      )}
                    >
                      {adults
                        ? childrens
                          ? `Adults: ${adults} - Children: ${childrens}`
                          : `Adults: ${adults}`
                        : "Add guests"}
                    </span>
                  </div>
                </NavigationMenuTrigger>
                <NavigationMenuContent className="bg-transparent">
                  <div className="w-[300px] space-y-2 p-2">
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
                          className="rounded-full"
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
                          className="rounded-full"
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
                          onClick={() =>
                            setChildren(childrens ? childrens - 1 : 0)
                          }
                          size="icon"
                          className="rounded-full"
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
                          className="rounded-full"
                        >
                          +
                        </Button>
                      </div>
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem className="pl-1">
                <NavigationMenuTrigger className="h-11">
                  <div className="flex flex-col">
                    Date
                    <span
                      className={cn(
                        scrolled && "max-lg:hidden",
                        "text-muted-foreground text-xs md:min-w-[165px]",
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
                    </span>
                  </div>
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div>
                    <Calendar
                      mode="range"
                      defaultMonth={date?.from}
                      selected={date}
                      onSelect={setDate}
                      numberOfMonths={2}
                    />
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem
                onClick={(e) => e.preventDefault()}
                className="h-13 content-center overflow-hidden px-1 lg:w-52"
              >
                <AnimatePresence initial={false} mode="popLayout">
                  {!open ? (
                    <motion.button
                      key="button"
                      onClick={() => setOpen(true)}
                      className={cn(
                        buttonVariants({ variant: "ghost" }),
                        "focus-visible:bg-muted bg-background flex h-11 w-full flex-col gap-0 transition-[color,box-shadow]",
                      )}
                      exit={{ translateY: "-120%" }}
                      animate={{ translateY: "0%" }}
                    >
                      Destination
                      <span
                        className={cn(
                          scrolled && "max-lg:hidden",
                          "text-muted-foreground text-xs",
                        )}
                      >
                        Search
                      </span>
                    </motion.button>
                  ) : (
                    <motion.div
                      key="input"
                      initial={{ translateY: "100%" }}
                      animate={{ translateY: "0%" }}
                      onAnimationComplete={() => {
                        if (inputRef.current && open) inputRef.current.focus()
                      }}
                      className="flex flex-col gap-1"
                    >
                      <Label htmlFor="q" className="sr-only">
                        Venue
                      </Label>
                      <div className="bg-background relative content-center rounded-lg">
                        <Input
                          value={query}
                          onChange={handleInput}
                          ref={inputRef}
                          onBlur={handleBlur}
                          onKeyDown={({ key }) => {
                            console.log(key)
                            if (key === "Enter") handleQuery()
                          }}
                          name="q"
                          placeholder="Search destination"
                          className="w-full pr-[25px] focus-visible:ring-transparent max-lg:w-[107.5px]"
                        />
                        <Button
                          variant="ghost"
                          className={cn(
                            query ? "text-muted-foreground" : "hidden",
                            "absolute top-1/2 right-0.5 h-8 w-5 -translate-y-1/2",
                          )}
                          onClick={handleClear}
                        >
                          <X />
                        </Button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </NavigationMenuItem>

              <NavigationMenuItem asChild>
                <Button
                  disabled={isPending}
                  onClick={handleQuery}
                  type="submit"
                  title="Search"
                  size="icon"
                  className={"cursor-pointer rounded-full lg:ml-1"}
                >
                  <AnimatePresence mode="popLayout">
                    {!isPending ? (
                      <motion.div key="search" exit={{ opacity: 0 }}>
                        <Search className="stroke-3" />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="loader"
                        initial={{
                          opacity: 0,
                        }}
                        animate={{
                          opacity: 1,
                        }}
                      >
                        <Loader2 className="animate-spin stroke-3" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Button>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </motion.div>
      </motion.div>
    </nav>
  )
}

export default memo(TopNav)
