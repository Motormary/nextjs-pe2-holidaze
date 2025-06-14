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
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { Loader2, Search, X } from "lucide-react"
import { AnimatePresence, motion } from "motion/react"
import Link from "next/link"
import { memo, useRef, useState, useEffect } from "react"
import NavMenu from "./nav-menu"
import { Calendar } from "./ui/calendar"
import { useMediaQuery } from "@/hooks/use-media-query"
import { useScroll } from "@/hooks/use-scroll"
import useQuery from "@/hooks/use-query"

function TopNav() {
  const inputRef = useRef<null | HTMLInputElement>(null)

  const { scrolled, isClient } = useScroll(0)
  const isDesktop = useMediaQuery("(min-width:1024px)")
  const animateWidth = scrolled && !isDesktop

  const {
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
  } = useQuery()

  // Prevent layout shift during hydration
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])

  function handleBlur() {
    if (query) return
    else setOpen(false)
  }

  if (!mounted || !isClient) {
    return (
      <nav className="peer bg-background h-[142px] w-full py-1.5 max-md:hidden">
        <div className="bg-background fixed top-0 z-50 flex h-[142px] w-full flex-col">
          <div className="bg-background container mx-auto flex min-h-[70px] justify-between px-4 py-2">
            <Link href="/" className="content-center">
              <picture className="size-8">
                <img className="h-6" src="/holi-logo.png" alt="logo" />
              </picture>
            </Link>
            <div className="flex items-center gap-4">
              <NavMenu />
            </div>
          </div>
          <div className="outline-muted mb-5 w-full outline transition-colors" />
          <div className="mx-auto flex min-h-[54px] w-[668px] justify-center rounded-full border shadow-sm"></div>
        </div>
      </nav>
    )
  }

  return (
    <nav
      data-search={isPending ? "" : undefined}
      className="peer bg-background h-[142px] w-full py-1.5 max-md:hidden"
    >
      <motion.div
        initial={false}
        animate={scrolled ? { height: "70px" } : { height: "142px" }}
        className={cn(
          scrolled && "shadow-md",
          "bg-background fixed top-0 z-50 flex w-full flex-col",
        )}
      >
        <div
          className={cn(
            "bg-background container mx-auto flex min-h-[70px] justify-between px-4 py-2",
          )}
        >
          <Link href="/" className="content-center">
            <picture className="size-8">
              <img className="h-6" src="/holi-logo.png" alt="logo" />
            </picture>
          </Link>
          <div className="flex items-center gap-4">
            <NavMenu />
          </div>
        </div>
        <div
          className={cn(
            scrolled ? "outline-transparent" : "outline-muted",
            "mb-5 w-full outline transition-colors",
          )}
        />
        <motion.div
          style={{
            zIndex: 50,
            margin: "0 auto",
            minHeight: "54px",
          }}
          initial={false}
          animate={{
            translateY: scrolled ? "-82px" : "0px",
            width: animateWidth ? "380px" : "668px",
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30,
            mass: 0.8,
          }}
          className="mx-auto flex justify-center rounded-full border shadow-sm"
        >
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="h-11 rounded-full">
                  <motion.div className={cn("flex flex-col lg:min-w-[130px]")}>
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
                  </motion.div>
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
                <NavigationMenuTrigger className="h-11 rounded-full">
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
                      disabled={(date) =>
                        date < new Date(new Date().setHours(0, 0, 0, 0))
                      }
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
                        "focus-visible:bg-muted bg-background flex h-11 w-full flex-col gap-0 rounded-full transition-[color,box-shadow]",
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
