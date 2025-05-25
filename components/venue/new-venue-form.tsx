import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import createVenue from "@/app/actions/venue/create"
import updateVenue from "@/app/actions/venue/update"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { TYPE_MEDIA, TYPE_VENUE } from "@/lib/definitions"
import { handleErrors } from "@/lib/handle-errors"
import { cn } from "@/lib/utils"
import { useAutoAnimate } from "@formkit/auto-animate/react"
import { Plus, X } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useState, useTransition } from "react"
import { toast } from "sonner"
import { Button } from "../ui/button"
import Stepper from "./stepper"
import { Switch } from "../ui/switch"

type props = {
  closeModal: (state: boolean) => void
  initialData?: TYPE_VENUE
}

export const VenueSchema = z.object({
  name: z.string().nonempty({ message: "Name required" }),
  description: z.string().nonempty({ message: "Description required" }),
  media: z
    .array(
      z.object({
        url: z.string().url(),
        alt: z.string(),
      }),
    )
    .optional(),
  price: z.coerce
    .number({ required_error: "Price required" })
    .min(1, { message: "Price required" }),
  rating: z.coerce
    .number({ message: "Number between 0 and 5" })
    .min(0)
    .max(5)
    .optional(),
  maxGuests: z.coerce
    .number({ required_error: "Maxium guests required" })
    .min(1, { message: "Maxium guests required" }),
  meta: z.object({
    wifi: z.boolean(),
    parking: z.boolean(),
    breakfast: z.boolean(),
    pets: z.boolean(),
  }),
  location: z
    .object({
      address: z.string(),
      city: z.string(),
    })
    .optional(),
})

export const mediaSchema = z.object({
  url: z.string().url({ message: "Valid URL required" }),
  alt: z.string(),
})

export default function VenueForm({ closeModal, initialData }: props) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [mediaRef] = useAutoAnimate()
  const [gallery, setGallery] = useState<TYPE_MEDIA[] | undefined>(
    initialData ? initialData.media : [],
  )
  const form = useForm<z.infer<typeof VenueSchema>>({
    resolver: zodResolver(VenueSchema),
    defaultValues: initialData
      ? initialData
      : {
          name: "",
          description: "",
          price: 0,
          rating: 0,
          maxGuests: 1,
          meta: {
            wifi: false,
            breakfast: false,
            parking: false,
            pets: false,
          },
          location: {
            address: "",
            city: "",
          },
          media: undefined,
        },
  })

  function onSubmit(formData: z.infer<typeof VenueSchema>) {
    startTransition(async () => {
      // Selects server action based on if initialData is provided
      const { data, success, error, source } = await (!initialData
        ? createVenue(formData)
        : updateVenue(formData, initialData.id))
      if (!success) {
        handleErrors<z.infer<typeof VenueSchema>>(error, source, form)
      }
      if (success) {
        router.refresh()
        closeModal(false)
        toast.success(
          initialData ? "Venue updated successfully" : "New venue posted 🎉",
          {
            action: {
              label: "Go to",
              onClick: () => router.push(`/venue/${data.data.id}`),
            },
          },
        )
      }
    })
  }

  function handleAddMedia(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault()
    const input = document.querySelector(
      "input.media-input",
    ) as HTMLInputElement
    if (input && input.tagName === "INPUT") {
      try {
        const newMedia = { url: input.value, alt: "thumbnail" }
        const newGallery = gallery?.length ? [...gallery, newMedia] : [newMedia]
        mediaSchema.parse(newMedia)

        setGallery(newGallery)
        form.setValue("media", newGallery)
        input.value = ""
        form.clearErrors("media")
      } catch (e: any) {
        form.setError("media", { message: JSON.parse(e)[0].message })
      }
    }
  }

  function handleDeleteMedia(mediaIndex: number) {
    const newGallery = gallery?.filter((_, i) => i !== mediaIndex)
    setGallery(newGallery)
    form.setValue("media", newGallery)
  }

  function handleSetMainImage(
    mediaObject: z.infer<typeof mediaSchema>,
    mediaIndex: number,
  ) {
    const newGallery = gallery?.filter((_, i) => i !== mediaIndex)
    const reorderedGallery = newGallery
      ? [{ ...mediaObject }, ...newGallery]
      : [mediaObject]
    setGallery(reorderedGallery)
    form.setValue("media", reorderedGallery)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Stepper isPending={isPending} form={form}>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem autoFocus className="hidden group-data-[state=1]:block">
                <FormLabel>Venue name</FormLabel>
                <FormControl>
                  <Input autoComplete="off" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="hidden group-data-[state=1]:block">
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea className="textarea" {...field} />
                </FormControl>
                {field.value?.length ? (
                  <FormDescription>
                    {field.value?.length ?? 0} / 280 characters
                  </FormDescription>
                ) : null}
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex gap-2">
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem className="hidden w-full group-data-[state=1]:block">
                  <FormLabel>Price / night</FormLabel>
                  <FormControl>
                    <Input placeholder="$" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="rating"
              render={({ field }) => (
                <FormItem className="hidden w-full group-data-[state=1]:block">
                  <FormLabel>Rating</FormLabel>
                  <FormControl>
                    <Input step={0.1} placeholder="0.0 - 5.0" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="maxGuests"
              render={({ field }) => (
                <FormItem className="hidden w-full group-data-[state=1]:block">
                  <FormLabel>Max Guests</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex gap-2">
            <FormField
              control={form.control}
              name="location.address"
              render={({ field }) => (
                <FormItem className="hidden w-full group-data-[state=1]:block">
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="location.city"
              render={({ field }) => (
                <FormItem className="hidden w-full group-data-[state=1]:block">
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="hidden space-y-6 group-data-[state=3]:block">
            <p className="text-sm font-semibold">Resources</p>
            <div className="grid rounded-lg border sm:grid-cols-2">
              <FormField
                control={form.control}
                name="meta.wifi"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start p-4">
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="mt-0.5">
                      <FormLabel>Wifi</FormLabel>
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="meta.breakfast"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start p-4">
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="mt-0.5">
                      <FormLabel>Breakfast</FormLabel>
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="meta.parking"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start p-4">
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="mt-0.5">
                      <FormLabel>Parking</FormLabel>
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="meta.pets"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start p-4">
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="mt-0.5">
                      <FormLabel>Pets</FormLabel>
                    </div>
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="hidden space-y-6 group-data-[state=2]:block">
            <FormField
              control={form.control}
              name="media"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Media</FormLabel>
                  <div className="flex gap-2">
                    <Input className="media-input" />
                    <Button onClick={handleAddMedia} variant="outline">
                      <Plus />
                    </Button>
                  </div>
                  <FormMessage />
                  <FormDescription>
                    {gallery?.length ? "Click on image to select as main" : ""}
                  </FormDescription>
                </FormItem>
              )}
            />
            <div ref={mediaRef} className="flex flex-wrap items-start gap-2">
              {gallery
                ? gallery.map((image, index) => (
                    <div
                      onClick={() => handleSetMainImage(image, index)}
                      className="relative"
                      key={image.url + index}
                    >
                      <Button
                        onClick={(e) => {
                          e.preventDefault()
                          e.stopPropagation()
                          handleDeleteMedia(index)
                        }}
                        variant="destructive"
                        className="absolute -top-2 -right-2 size-3"
                      >
                        <X />
                      </Button>
                      <div
                        className={cn(
                          index === 0 ? "outline-primary outline" : "",
                          "bg-muted flex aspect-video max-w-20 overflow-hidden rounded-md",
                        )}
                      >
                        <Image
                          loading="eager"
                          height={80}
                          width={80}
                          className="object-cover"
                          src={image.url}
                          alt="thumbnail"
                        />
                      </div>
                    </div>
                  ))
                : null}
            </div>
          </div>
        </Stepper>
      </form>
    </Form>
  )
}
