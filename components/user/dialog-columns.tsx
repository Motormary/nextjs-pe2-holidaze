"use client"

import cancelBooking from "@/app/actions/venue/cancel"
import { TYPE_BOOKING } from "@/lib/definitions"
import { ColumnDef } from "@tanstack/react-table"
import { format } from "date-fns"
import { ArrowUpDown, X } from "lucide-react"
import { Button } from "../ui/button"
import Link from "next/link"

export const dialogColumns: ColumnDef<TYPE_BOOKING>[] = [
  {
    accessorKey: "customer",
    header: ({ column }) => (
      <div className="flex w-full justify-start">
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Customer
          <ArrowUpDown className="text-muted-foreground ml-2 h-4 w-4" />
        </Button>
      </div>
    ),
    cell: ({ row }) => (
      <div className="ml-2 max-w-24 truncate">
        <Link
          title={row.original.customer.name}
          href={`/user/${row.original.customer.name}`}
        >
          {row.original.customer.name}
        </Link>
      </div>
    ),
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
        <div className="flex items-center justify-center overflow-hidden">
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
