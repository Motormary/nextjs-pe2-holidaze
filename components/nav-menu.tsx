"use client"

import { logoutUser } from "@/app/actions/user/login"
import { Button, buttonVariants } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { DropdownMenuGroup } from "@radix-ui/react-dropdown-menu"
import { List, RefreshCw, User } from "lucide-react"
import Link from "next/link"
import { useTransition } from "react"
import Avatar from "./next-avatar"
import { useUser } from "./user-provider"

export default function NavMenu() {
  const { user, setUser } = useUser()
  const [isPending, startTransition] = useTransition()

  function handleLogout() {
    startTransition(async () => {
      setUser(null)
      await logoutUser()
    })
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
            <DropdownMenuItem asChild>
              <Link
                className="flex justify-between"
                href={`/user/${user.name}`}
              >
                Bookings <List />
              </Link>
            </DropdownMenuItem>
            {user.venueManager ? (
              <DropdownMenuItem asChild>
                <Link
                  className="flex justify-between"
                  href={`/user/${user.name}/venues`}
                >
                  My venues{" "}
                  <span className="p-0.5 text-xs">{user._count.venues}</span>
                </Link>
              </DropdownMenuItem>
            ) : null}
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <form action={handleLogout}>
            <DropdownMenuItem className="group" asChild>
              <div>
                <button
                  className="group-active:text-muted-foreground w-full text-left hover:cursor-default"
                  type="submit"
                >
                  Log out
                </button>
                <DropdownMenuShortcut>
                  {isPending ? (
                    <RefreshCw className="ml-auto inline size-5 animate-spin" />
                  ) : null}
                </DropdownMenuShortcut>
              </div>
            </DropdownMenuItem>
          </form>
        </DropdownMenuContent>
      </DropdownMenu>
    )
}
