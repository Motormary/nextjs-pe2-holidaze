"use client"

import getVenue from "@/app/actions/venue/get"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer"
import { useMediaQuery } from "@/hooks/use-media-query"
import { TYPE_VENUE } from "@/lib/definitions"
import React, { useEffect, useState, useTransition } from "react"
import { Skeleton } from "../ui/skeleton"
import { Button } from "../ui/button"
import DialogTable from "./dialog-table"
import { dialogColumns } from "./dialog-columns"

type props = {
  venueId: string
  open: boolean
  setOpen: (state: boolean) => void
}

function ViewBookingsDialog({ venueId, open, setOpen }: props) {
  const isDesktop = useMediaQuery("(min-width: 768px)")
  const [venueData, setVenueData] = useState<TYPE_VENUE | null>(null)
  const [isPending, startTransition] = useTransition()

  useEffect(() => {
    if (open) {
      startTransition(async () => {
        const { data, success } = await getVenue(venueId)
        if (success) setVenueData(data.data)
      })
    }
  }, [venueId, open])

  function handleOpen(state: boolean) {
    setOpen(state)
  }

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={handleOpen}>
        <DialogContent className="w-full sm:max-w-3xl">
          <DialogHeader>
            <DialogTitle>Bookings</DialogTitle>
            <DialogDescription className="sr-only">
              Table overview
            </DialogDescription>
          </DialogHeader>
          {isPending ? (
            <div className="grid w-full place-items-center">
              <Skeleton className="h-44 w-full" />
            </div>
          ) : venueData?.bookings ? (
            <DialogTable columns={dialogColumns} data={venueData.bookings} />
          ) : null}
          <DialogFooter>
            <DialogTrigger asChild>
              <Button>Close</Button>
            </DialogTrigger>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer open={open} onOpenChange={handleOpen}>
      <DrawerContent className="z-[9999]">
        <DrawerHeader className="text-left">
          <DrawerTitle>Bookings</DrawerTitle>
          <DrawerDescription className="sr-only">
            Table overview
          </DrawerDescription>
        </DrawerHeader>
        {isPending ? (
          <div className="grid w-full place-items-center">
            <Skeleton className="h-44 w-full" />
          </div>
        ) : venueData?.bookings ? (
          <DialogTable columns={dialogColumns} data={venueData.bookings} />
        ) : null}
      </DrawerContent>
    </Drawer>
  )
}

export default React.memo(ViewBookingsDialog)
