"use client"

import { buttonVariants } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
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
  DrawerTrigger,
} from "@/components/ui/drawer"
import { useMediaQuery } from "@/hooks/use-media-query"
import { TYPE_USER } from "@/lib/definitions"
import React from "react"
import { useUser } from "../user-provider"
import EditProfileForm from "./edit-profile-form"
import { cn } from "@/lib/utils"

type props = {
  data: TYPE_USER
}

function EditProfileDialog({ data }: props) {
  const { user } = useUser()
  const [open, setOpen] = React.useState(false)
  const isDesktop = useMediaQuery("(min-width: 768px)")

  if (user?.name !== data.name) return null

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger
          className={cn(buttonVariants({ variant: "secondary" }), "w-full")}
        >
          Edit Profile
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
          <EditProfileForm setOpen={setOpen} data={data} />
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger
        className={cn(buttonVariants({ variant: "secondary" }), "w-full")}
      >
        Edit Profile
      </DrawerTrigger>
      <DrawerContent className="z-[9999]">
        <DrawerHeader className="text-left">
          <DrawerTitle>Edit profile</DrawerTitle>
          <DrawerDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </DrawerDescription>
        </DrawerHeader>
        <EditProfileForm setOpen={setOpen} data={data} />
      </DrawerContent>
    </Drawer>
  )
}

export default React.memo(EditProfileDialog)
