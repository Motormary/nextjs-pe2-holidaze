/* eslint-disable react-hooks/rules-of-hooks */
"use client"

import { TYPE_VENUE } from "@/lib/definitions"
import { ColumnDef } from "@tanstack/react-table"
import { format } from "date-fns"
import { ArrowUpDown, Book, Edit, List, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import altImg from "public/alt.svg"
import { Button } from "../ui/button"
import { numToDollarString } from "@/lib/utils"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import ViewBookingDialog from "./view-booking-dialog"
import deleteVenue from "@/app/actions/venue/delete"
import { useUser } from "../user-provider"
import { useState } from "react"
import VenueDialog from "../venue/new-venue-dialog"

export const venueColumns: ColumnDef<TYPE_VENUE>[] = [
  {
    accessorFn: (row) => row.name,
    filterFn: "includesString",
    accessorKey: "venue",
    header: ({ column }) => (
      <div className="flex w-full justify-start">
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Venue
          <ArrowUpDown className="text-muted-foreground ml-2 h-4 w-4" />
        </Button>
      </div>
    ),
    cell: ({ row }) => {
      return (
        <div className="group relative flex items-center gap-4 p-1">
          <Link
            draggable={false}
            className="absolute inset-0 z-10 focus:outline-none"
            href={`/venue/${row.original.id}`}
          />
          <div className="ring-ring ring-offset-background relative flex size-16 items-center justify-center overflow-hidden rounded-lg ring-offset-2 group-focus-within:ring">
            <Image
              width={200}
              height={200}
              className="h-full w-full min-w-16 rounded-lg object-cover"
              src={row.original.media[0]?.url ?? altImg.src}
              alt={row.original.media[0]?.alt ?? "Alt text"}
            />
          </div>
          <div className="min-h-16 max-w-96">
            <p className="max-w-96 truncate text-lg whitespace-nowrap">
              {row.original.name}
            </p>
            <p className="text-muted-foreground line-clamp-2 whitespace-pre-line">
              {row.original.location.address}
              {row.original.location.city
                ? `, ${row.original.location.city}`
                : ""}
            </p>
          </div>
        </div>
      )
    },
  },
  {
    accessorKey: "price",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Price
        <ArrowUpDown className="text-muted-foreground ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center justify-center overflow-hidden max-md:min-w-36">
          {numToDollarString(row.original.price)}
        </div>
      )
    },
  },
  {
    accessorKey: "created",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Venue Created
        <ArrowUpDown className="text-muted-foreground ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <p aria-label="quantity x price" className="mr-3 min-w-40 text-center">
        {format(row.original.created, "PPP")}
      </p>
    ),
  },
  {
    enableHiding: true,
    header: () => <p className="pr-4 text-right">Actions</p>,
    id: "action",
    cell: ({ row }) => {
      const { user } = useUser()
      async function handleDelete() {
        if (!user) return
        deleteVenue({ id: row.original.id, owner: user.name })
      }
      const [openBooking, setOpenBooking] = useState(false)
      const [openEdit, setOpenEdit] = useState(false)

      return (
        <div className="flex items-center justify-end pr-6">
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="">
                <List className="text-secondary-foreground bg-background size-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-44">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem onClick={() => setOpenBooking(true)}>
                  <Book />
                  View bookings
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setOpenEdit(true)}>
                  <Edit />
                  Edit venue
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleDelete}>
                  <X />
                  Delete venue
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          <VenueDialog
            initialData={row.original}
            isOpen={openEdit}
            setIsOpen={setOpenEdit}
          />
          <ViewBookingDialog
            open={openBooking}
            setOpen={setOpenBooking}
            venueId={row.original.id}
          />
        </div>
      )
    },
  },
]
