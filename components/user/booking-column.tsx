"use client"

import { TYPE_BOOKING } from "@/lib/definitions"
import { ColumnDef } from "@tanstack/react-table"
import { format } from "date-fns"
import { ArrowUpDown, X } from "lucide-react"
import altImg from "public/alt.svg"
import { Button } from "../ui/button"
import Link from "next/link"
import Image from "next/image"
import cancelBooking from "@/app/actions/venue/cancel"

export const bookingColumns: ColumnDef<TYPE_BOOKING>[] = [
  {
    accessorFn: (row) => row.venue.name,
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
            href={`/venue/${row.original.venue.id}`}
          />
          <div className="ring-ring ring-offset-background relative flex size-16 items-center justify-center overflow-hidden rounded-lg ring-offset-2 group-focus-within:ring">
            <Image
              width={200}
              height={200}
              className="h-full w-full min-w-16 rounded-lg object-cover"
              src={row.original.venue.media[0]?.url ?? altImg.src}
              alt={row.original.venue.media[0]?.alt ?? "Alt text"}
            />
          </div>
          <div className="min-h-16 max-w-96">
            <p className="max-w-96 truncate text-lg whitespace-nowrap">
              {row.original.venue.name}
            </p>
            <p className="text-muted-foreground line-clamp-2 whitespace-pre-line">
              {row.original.venue.location.address}
              {row.original.venue.location.city
                ? `, ${row.original.venue.location.city}`
                : ""}
            </p>
          </div>
        </div>
      )
    },
  },
  {
    accessorKey: "dateFrom",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Check in / Check out
        <ArrowUpDown className="text-muted-foreground ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center justify-center overflow-hidden max-md:min-w-36">
          {format(row.original.dateFrom, "PPP")} -{" "}
          {format(row.original.dateTo, "PPP")}
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
        Booking Created
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
    header: "Cancel Booking",
    id: "action",
    cell: ({ row }) => {
      function handleCancel() {
        cancelBooking(row.original.id)
      }
      return (
        <div className="flex items-center">
          <Button
            title="Cancel Booking"
            size="icon"
            variant="ghost"
            onClick={handleCancel}
            className="mx-auto"
          >
            <p className="sr-only">Delete booking</p>
            <X />
          </Button>
        </div>
      )
    },
  },
]
