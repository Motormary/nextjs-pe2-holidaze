"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
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
import React, { useEffect, useState } from "react"
import VenueForm from "./new-venue-form"

type props = {
  children?: React.ReactNode
  initialData?: TYPE_VENUE
  isOpen?: boolean
  setIsOpen?: (state: boolean) => void
}

export default function VenueDialog({
  children,
  initialData,
  isOpen,
  setIsOpen,
}: props) {
  const [open, setOpen] = useState(isOpen)
  const isDesktop = useMediaQuery("(min-width: 768px)")

  useEffect(() => {
    setOpen(isOpen)
  }, [isOpen])

  function handleOpen(state: boolean) {
    setOpen(state)
    if (setIsOpen) setIsOpen(state)
  }

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={handleOpen}>
        {children}
        <DialogContent>
          <DialogHeader>
            <DialogTitle>New venue</DialogTitle>
            <DialogDescription className="sr-only">
              Enter the venue details and submit
            </DialogDescription>
          </DialogHeader>
          <VenueForm initialData={initialData} closeModal={handleOpen} />
        </DialogContent>
      </Dialog>
    )
  }
  return (
    <Drawer open={open} onOpenChange={handleOpen}>
      {children}
      <DrawerContent className="z-[9999] h-full">
        <DrawerHeader className="text-left">
          <DrawerTitle>New venue</DrawerTitle>
          <DrawerDescription>
            Enter the venue details and submit
          </DrawerDescription>
        </DrawerHeader>
        <div className="overflow-y-auto px-4">
          <VenueForm initialData={initialData} closeModal={handleOpen} />
        </div>
      </DrawerContent>
    </Drawer>
  )
}
