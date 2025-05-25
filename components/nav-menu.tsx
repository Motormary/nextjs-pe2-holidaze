"use client"

import { logoutUser } from "@/app/actions/user/login"
import { Button, buttonVariants } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { DropdownMenuGroup } from "@radix-ui/react-dropdown-menu"
import { List, Plus, User } from "lucide-react"
import Link from "next/link"
import Avatar from "./next-avatar"
import { useUser } from "./user-provider"
import VenueDialog from "./venue/new-venue-dialog"
import { DialogTrigger } from "./ui/dialog"

export default function NavMenu() {
  const { user, setUser } = useUser()

  async function handleLogout() {
    setUser(null)
    await logoutUser()
  }

  if (!user)
    return (
      <Link className={cn(buttonVariants({ variant: "ghost" }))} href="/login">
        Login
      </Link>
    )
  else
    return (
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="group hidden px-0 hover:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:flex"
          >
            <span className="mb-[2px] max-w-36 truncate">{user.name}</span>
            <Avatar
              src={user.avatar.url}
              alt="avatar"
              size={32}
              className="max-w-8"
            />
          </Button>
        </DropdownMenuTrigger>
        <VenueDialog>
          <DropdownMenuContent
            align="end"
            sideOffset={12}
            className="w-56 max-md:hidden"
          >
            <DropdownMenuGroup>
              <DropdownMenuLabel className="truncate overflow-hidden">
                {user.email}
              </DropdownMenuLabel>
              <DropdownMenuItem asChild>
                <Link
                  className="flex justify-between"
                  href={`/user/${user.name}`}
                >
                  Profile <User />
                </Link>
              </DropdownMenuItem>
              {user.venueManager ? (
                <>
                  <DropdownMenuItem asChild>
                    <DialogTrigger className="flex w-full justify-between">
                      New venue
                      <Plus />
                    </DialogTrigger>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link
                      className="flex justify-between"
                      href={`/user/${user.name}#venues`}
                    >
                      My venues{" "}
                      <span className="p-0.5 text-xs">
                        {user?._count?.venues}
                      </span>
                    </Link>
                  </DropdownMenuItem>
                </>
              ) : (
                <DropdownMenuItem asChild>
                  <Link
                    className="flex justify-between"
                    href={`/user/${user.name}#bookings`}
                  >
                    My Bookings <List />
                  </Link>
                </DropdownMenuItem>
              )}
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </VenueDialog>
      </DropdownMenu>
    )
}
