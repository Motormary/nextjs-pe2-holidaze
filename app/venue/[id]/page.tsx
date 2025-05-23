import getVenue from "@/app/actions/venue/get"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Skeleton } from "@/components/ui/skeleton"
import BackButton from "@/components/venue/back-button"
import BookingForm from "@/components/venue/booking-form"
import Description from "@/components/venue/description"
import Map from "@/components/venue/dynamic-map"
import MediaGallery from "@/components/venue/media-gallery"
import Rating from "@/components/venue/rating"
import { checkAndThrowError } from "@/lib/handle-errors"
import { cn } from "@/lib/utils"
import { Car, Coffee, PawPrint, UserCircle, Users, Wifi, X } from "lucide-react"
import Link from "next/link"
import { Suspense } from "react"

type props = {
  params: Promise<{ id: string }>
}

export default async function VenuePage({ params }: props) {
  const { id } = await params
  const { data, success, error, source } = await getVenue(id)

  if (!success) checkAndThrowError(error, source)

  return (
    <main className="mx-auto min-h-[calc(100vh-142px)] w-full grow overflow-hidden md:container md:py-8">
      <BackButton />
      <Suspense fallback={<Loading />}>
        <MediaGallery media={data.data.media} />
      </Suspense>
      <div className="md:grid md:grid-cols-2 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="container mx-auto space-y-4 p-4">
            <div className="space-y-1">
              <h1>{data.data.name}</h1>
              <p className="text-muted-foreground text-sm">
                {data.data.location.address}, {data.data.location.city}
              </p>
            </div>
            <Rating rating={data.data.rating} />
            <Description description={data.data.description} />
            <Link
              href={`/user/${data.data.owner.name}`}
              className="flex items-center gap-4 border-y py-4"
            >
              <Avatar className="h-[32px] w-[32px]">
                <AvatarImage
                  src={data.data.owner.avatar.url}
                  alt={data.data.owner.avatar.alt}
                />
                <AvatarFallback>
                  <UserCircle className="stroke-primary size-8" />
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-muted-foreground text-xs">Hosted by</p>
                <p className="text-sm">{data.data.owner.name}</p>
              </div>
            </Link>

            <div className="space-y-5 [&_svg]:size-5 [&>div]:flex [&>div]:items-center [&>div]:gap-2 [&>div]:text-sm">
              <h2>Resources</h2>
              <div>
                <Users className="stroke-blue-500" />
                {data.data.maxGuests} Guests
              </div>
              <div>
                {data.data.meta.wifi ? (
                  <Wifi className="stroke-blue-500" />
                ) : (
                  <X className="stroke-red-500" />
                )}
                <span className={cn(!data.data.meta.wifi && "line-through")}>
                  Wifi
                </span>
              </div>
              <div>
                {data.data.meta.parking ? (
                  <Car className="stroke-blue-500" />
                ) : (
                  <X className="stroke-red-500" />
                )}
                <span className={cn(!data.data.meta.parking && "line-through")}>
                  Parking
                </span>
              </div>
              <div>
                {data.data.meta.breakfast ? (
                  <Coffee className="stroke-blue-500" />
                ) : (
                  <X className="stroke-red-500" />
                )}
                <span
                  className={cn(!data.data.meta.breakfast && "line-through")}
                >
                  Breakfast
                </span>
              </div>
              <div>
                {data.data.meta.pets ? (
                  <PawPrint className="stroke-blue-500" />
                ) : (
                  <X className="stroke-red-500" />
                )}
                <span className={cn(!data.data.meta.pets && "line-through")}>
                  Pets
                </span>
              </div>
            </div>
            {!data.data.location?.lat || !data.data.location?.lng ? (
              <div className="mt-6 space-y-4">
                <h2>Location</h2>
                <div className="overflow-hidden rounded-lg">
                  <Suspense
                    fallback={
                      <div className="flex h-[300px] w-full items-center justify-center bg-gray-100">
                        Loading map...
                      </div>
                    }
                  >
                    <Map
                      location={[
                        data.data.location?.lat && data.data.location?.lat > 0
                          ? data.data.location?.lat
                          : 52.47933,
                        data.data.location?.lng && data.data.location?.lng > 0
                          ? data.data.location?.lng
                          : 62.18566,
                      ]}
                      address={`${data.data.location.address}${data.data.location.city ? `, ${data.data.location.city}` : ""}`}
                    />
                  </Suspense>
                </div>
              </div>
            ) : null}
          </div>
        </div>
        <div className="py-4">
          <BookingForm data={data.data} />
        </div>
      </div>
    </main>
  )
}

function Loading() {
  return (
    <div className="mx-auto max-h-[584px] min-h-[433px] grid-cols-4 grid-rows-2 justify-center gap-2 max-md:max-h-[375px] sm:grid md:container md:min-h-[584px] [&>*]:rounded-lg [&>*]:nth-1:col-span-2 [&>*]:nth-1:row-span-2">
      <Skeleton />
      <Skeleton className="max-md:hidden" />
      <Skeleton className="max-md:hidden" />
      <Skeleton className="max-md:hidden" />
      <Skeleton className="max-md:hidden" />
    </div>
  )
}
