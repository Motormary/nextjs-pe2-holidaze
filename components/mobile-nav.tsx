"use client"

import { useUser } from "@/components/user-provider"
import { Compass, UserCircle } from "lucide-react"
import Form from "next/form"
import Link from "next/link"
import { memo, useState } from "react"
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

function MobileNav() {
  const [open, setOpen] = useState(false)
  const user = useUser()
  const userLink = user ? `/user/${user.id}` : "/login"

  function toggleDrawer() {
    setOpen(!open)
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
        <DrawerContent className="max-h-min">
          <DrawerHeader>
            <DrawerTitle>Find your next destination</DrawerTitle>
            <DrawerDescription className="sr-only">
              Fill out the search field and press search
            </DrawerDescription>
          </DrawerHeader>
          <Form action="/" className="flex flex-col gap-6 p-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="q" className="">
                Venue
              </Label>
              <Input name="q" />
            </div>
            <Button>Search</Button>
          </Form>
        </DrawerContent>
      </Drawer>
    </div>
  )
}

export default memo(MobileNav)
