"use client"

import { TYPE_VENUE } from "@/lib/definitions"
import { useUser } from "../user-provider"
import BookingForm from "./booking-form"
import DialogTable from "../user/dialog-table"
import { dialogColumns } from "../user/dialog-columns"

type props = {
  data: TYPE_VENUE
}

export default function BookingOrTable({ data }: props) {
  const { user } = useUser()
  if (user?.name !== data.owner.name)
    return (
      <div className="py-4 lg:col-span-2">
        <BookingForm data={data} />
      </div>
    )

  return (
    <div className="py-4 lg:col-span-2">
      <DialogTable columns={dialogColumns} data={data.bookings} />
    </div>
  )
}
