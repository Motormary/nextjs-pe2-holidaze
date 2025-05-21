import getVenue from "@/app/actions/venue/get"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import Map from "@/components/venue/dynamic-map"
import MediaGallery from "@/components/venue/media-gallery"
import Rating from "@/components/venue/rating"
import { checkAndThrowError } from "@/lib/handle-errors"
import { cn } from "@/lib/utils"
import { Car, Coffee, PawPrint, UserCircle, Users, Wifi } from "lucide-react"
import Link from "next/link"
import { Suspense } from "react"

type props = {
  params: Promise<{ id: string }>
}

export default async function VenuePage({ params }: props) {
  const { id } = await params
  if (id.endsWith(".png")) return
  const { data, success, error, source } = await getVenue(id)

  if (!success) checkAndThrowError(error, source)

  return (
    <main className="min-h-[calc(100vh-142px)] w-full grow overflow-hidden md:py-8">
      <Suspense fallback={<Loading />}>
        <MediaGallery media={data.data.media} />
      </Suspense>
      <div className="container mx-auto space-y-4 px-4 py-4">
        <h1>{data.data.name}</h1>
        <p className="text-muted-foreground text-sm">
          {data.data.location.address}, {data.data.location.city}
        </p>
        <Rating rating={data.data.rating} />
        <p className="text-secondary-foreground text-sm">
          {data.data.description}
        </p>
        <Separator />
        <Link
          href={`/user/${data.data.owner.name}`}
          className="flex items-center gap-4"
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
        <Separator />
        <div className="space-y-5 [&_svg]:size-5 [&>div]:flex [&>div]:items-center [&>div]:gap-2 [&>div]:text-sm">
          <div>
            <Users />
            {data.data.maxGuests} Guests
          </div>
          <div>
            <Wifi
              className={cn(
                data.data.meta.wifi ? "stroke-blue-500" : "stroke-red-500",
              )}
            />
            <span className={cn(!data.data.meta.wifi && "line-through")}>
              Wifi
            </span>
          </div>
          <div>
            <Car
              className={cn(
                data.data.meta.parking ? "stroke-blue-500" : "stroke-red-500",
              )}
            />
            <span className={cn(!data.data.meta.parking && "line-through")}>
              Parking
            </span>
          </div>
          <div>
            <Coffee
              className={cn(
                data.data.meta.breakfast ? "stroke-blue-500" : "stroke-red-500",
              )}
            />
            <span className={cn(!data.data.meta.breakfast && "line-through")}>
              Breakfast
            </span>
          </div>
          <div>
            <PawPrint
              className={cn(
                data.data.meta.pets ? "stroke-blue-500" : "stroke-red-500",
              )}
            />
            <span className={cn(!data.data.meta.pets && "line-through")}>
              Pets
            </span>
          </div>
        </div>
        {!data.data.location?.lat || !data.data.location?.lng ? (
          <div className="mt-6">
            <h2 className="text-3xl">Location</h2>
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
