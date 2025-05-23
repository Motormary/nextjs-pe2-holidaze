"use client"

import BookVenue from "@/app/actions/venue/book"
import { useMediaQuery } from "@/hooks/use-media-query"
import { TYPE_NEW_BOOKING, TYPE_VENUE } from "@/lib/definitions"
import { handleErrors } from "@/lib/handle-errors"
import { cn, numToDollarString } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { format } from "date-fns"
import { CalendarIcon, RefreshCw } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ChangeEvent, memo, useEffect, useState, useTransition } from "react"
import { DateRange } from "react-day-picker"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"
import { Button, buttonVariants } from "../ui/button"
import { Calendar } from "../ui/calendar"
import { Form, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { useUser } from "../user-provider"

type props = {
  data: TYPE_VENUE
}

const BookingSchema = z.object({
  dateRange: z.object(
    {
      from: z.date(),
      to: z.date(),
    },
    { required_error: "Please select check in / out date" },
  ),
  guests: z.coerce
    .number()
    .min(1, { message: "Please select number of guests" }),
  venueId: z.string(),
})

const apiSchema = BookingSchema.transform((data) => {
  return {
    dateFrom: data.dateRange.from,
    dateTo: data.dateRange.to,
    guests: data.guests,
    venueId: data.venueId,
  }
})

function BookingForm({ data }: props) {
  const isMobile = useMediaQuery("(max-width:768px)")
  const [isPending, startTransition] = useTransition()
  const [date, setDate] = useState<DateRange | undefined>(undefined)
  const router = useRouter()
  const { user } = useUser()
  const form = useForm<TYPE_NEW_BOOKING>({
    resolver: zodResolver(BookingSchema),
    defaultValues: {
      venueId: data.id,
      guests: 0,
    },
  })

  // Scrolls mobile users to form fields if there are any parsing errors
  useEffect(() => {
    if (Array.from(Object.entries(form.formState.errors)).length && isMobile)
      window.document.querySelector("form")?.scrollIntoView()
  }, [form.formState.errors, isMobile])

  function onSubmit(formData: z.infer<typeof BookingSchema>) {
    if (!user) return router.push("/login")
    startTransition(async () => {
      const formattedData = apiSchema.parse(formData)
      const { success, error, source } = await BookVenue(formattedData)

      if (success) {
        toast.success("Happy Holidaze! 🎉", {
          description: (
            <p>
              You have booked{" "}
              <span className="font-semibold underline">{data.name}</span> from{" "}
              <span className="font-semibold underline">
                {formattedData.dateFrom.toDateString()}
              </span>{" "}
              to{" "}
              <span className="font-semibold underline">
                {formattedData.dateTo.toDateString()}
              </span>
            </p>
          ),
          duration: 8000,
          action: {
            label: "Ok",
            onClick: () => null,
          },
        })
        router.push(`/user/${user.name}?tab=bookings`)
      } else handleErrors(error, source)
    })
  }

  function handleGuests(event: ChangeEvent<HTMLInputElement>) {
    const value = event.target.value
    const isNum = /^\d+$/.test(value)
    if (!value) form.resetField("guests")
    if (isNum && Number(value) <= data.maxGuests)
      form.setValue("guests", Number(value))
  }

  return (
    <Form {...form}>
      <form
        id="booking"
        onSubmit={form.handleSubmit(onSubmit)}
        className="mx-auto pb-24 md:container"
      >
        <div className="flex flex-col gap-5 px-4">
          <div>
            <h2>Reservation</h2>
            <p className="text-muted-foreground hidden text-sm md:block">
              {numToDollarString(data.price)} a night
            </p>
          </div>
          <FormField
            control={form.control}
            name="dateRange"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col gap-2">
                <FormLabel>Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground",
                      )}
                    >
                      {field.value?.from ? (
                        field.value.to ? (
                          <>
                            {format(field.value.from, "LLL dd, y")} -{" "}
                            {format(field.value.to, "LLL dd, y")}
                          </>
                        ) : (
                          <>
                            {format(field.value.from, "LLL dd, y")} - Check out
                          </>
                        )
                      ) : (
                        "Check in / Check out"
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="z-[9999] w-auto p-0" align="start">
                    <Calendar
                      {...field}
                      mode="range"
                      selected={field.value}
                      onSelect={(range, selectedDay, e) => {
                        field.onChange(range, selectedDay, e)
                        setDate(range)
                      }}
                      disabled={(date) =>
                        date < new Date(new Date().setHours(0, 0, 0, 0)) ||
                        data.bookings.some(
                          (booking) =>
                            date.toISOString() >= booking.dateFrom &&
                            date.toISOString() <= booking.dateTo,
                        )
                      }
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="guests"
            render={({ field }) => (
              <>
                <FormItem className="flex w-full items-center justify-between">
                  <FormLabel>Guests</FormLabel>
                  <div className="flex gap-4">
                    <Button
                      disabled={field.value === 0}
                      onClick={(e) => {
                        e.preventDefault()
                        form.setValue(
                          "guests",
                          field.value ? field.value - 1 : 0,
                        )
                      }}
                      size="icon"
                      className="cursor-pointer rounded-full"
                    >
                      -
                    </Button>
                    <Input
                      {...field}
                      id="adults"
                      placeholder="0"
                      onChange={handleGuests}
                      value={field.value}
                      className="w-10 overflow-clip border-transparent p-0 text-center outline-transparent"
                    />
                    <Button
                      disabled={field.value >= data.maxGuests}
                      onClick={(e) => {
                        e.preventDefault()
                        form.setValue("guests", field.value + 1)
                      }}
                      size="icon"
                      className="cursor-pointer rounded-full"
                    >
                      +
                    </Button>
                  </div>
                </FormItem>
                <FormMessage />
              </>
            )}
          />
          <Button
            disabled={isPending}
            className="hidden w-full cursor-pointer md:flex"
          >
            {isPending ? <RefreshCw className="animate-spin" /> : "Book Now"}
          </Button>
        </div>
        <div className="bg-background fixed bottom-0 z-[9999] flex h-[59px] w-full items-center justify-between gap-4 px-2 drop-shadow-[0px_5px_8px_gray] md:hidden">
          <div className="space-y-2 px-2 text-sm whitespace-nowrap">
            <p className="font-semibold">
              {numToDollarString(data.price)} / night
            </p>
            <p className="min-w-36">
              {" "}
              {date?.from ? (
                date.to ? (
                  <>
                    {format(date?.from, "LLL dd")} - {format(date.to, "LLL dd")}
                  </>
                ) : (
                  <>{format(date.from, "LLL dd")} - Check out</>
                )
              ) : (
                "Check in / Check out"
              )}
            </p>
          </div>
          <div className="flex w-full items-center justify-center">
            {user ? (
              <Button className="w-full">Book Now</Button>
            ) : (
              <Link
                className={cn(buttonVariants({ variant: "default" }), "w-full")}
                href="/login"
              >
                <Button className="w-full">Book Now</Button>
              </Link>
            )}
          </div>
        </div>
      </form>
    </Form>
  )
}

export default memo(BookingForm)
