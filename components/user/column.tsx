import { TYPE_BOOKING } from "@/lib/definitions"
import { ColumnDef } from "@tanstack/react-table"
import { format } from "date-fns"
import { X } from "lucide-react"
import altImg from "public/alt.svg"
import { Button } from "../ui/button"
import Link from "next/link"
import Image from "next/image"
import cancelBooking from "@/app/actions/venue/cancel"

export const columns: ColumnDef<TYPE_BOOKING>[] = [
  {
    accessorKey: "image",
    header: () => <p className="text-left">Venue</p>,
    cell: ({ row }) => {
      return (
        <div className="group relative flex items-center gap-4">
          <Link
            draggable={false}
            className="absolute inset-0 z-10 focus:outline-none"
            href={`/venue/${row.original.venue.id}`}
          />
          <div className="ring-ring ring-offset-background relative flex size-16 items-center overflow-hidden rounded-lg ring-offset-2 group-focus-within:ring">
            <Image
              width={200}
              height={200}
              className="h-full w-full rounded-lg object-cover"
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
    header: () => <p>Check in / Check out</p>,
    cell: ({ row }) => {
      return (
        <div className="flex items-center justify-center overflow-hidden select-none max-md:min-w-36">
          {format(row.original.dateFrom, "PPP")} -{" "}
          {format(row.original.dateTo, "PPP")}
        </div>
      )
    },
  },
  {
    accessorKey: "created",
    header: () => <p>Booking Created</p>,
    cell: ({ row }) => (
      <p aria-label="quantity x price" className="min-w-40 text-center">
        {format(row.original.created, "PPP")}
      </p>
    ),
  },
  {
    header: "Cancel Booking",
    cell: ({ row }) => {
      function handleCancel() {
        cancelBooking(row.original.id)
      }
      return (
        <div className="flex items-center">
          <Button
            title="Delete Booking"
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
