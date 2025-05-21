import { cn, numToDollarString } from "@/lib/utils"
import Link from "next/link"
import altImg from "public/alt.svg"
import Rating from "../venue/rating"

type props = {
  id: string
  name: string
  description: string
  media: [
    {
      url: string
      alt: string
    },
  ]
  price: number
  maxGuests: number
  rating: number
  location: {
    address: string
    city: string
    continent: string
    country: string
  }
}

export default async function BasicVenueCard({ data }: { data?: props }) {
  const imageUrl = data?.media?.[0]?.url ?? altImg.url

  return (
    <div className="flex h-[334px] flex-col gap-2.5 overflow-hidden [&_p]:mr-1 [&_p]:line-clamp-1">
      <picture className="bg-muted relative overflow-hidden rounded-t-lg border">
        <Link href={`/venue/${data?.id}`} className="absolute inset-0 z-10" />
        <source srcSet={imageUrl} />
        <img
          loading="lazy"
          className={cn(
            imageUrl && "object-cover object-center",
            `h-[236px] w-full font-light underline`,
          )}
          src="/alt.svg"
          alt={data?.media?.[0]?.alt}
        />
        <source className="object-contain object-center" srcSet="/alt.svg" />
      </picture>
      <div className="flex justify-between">
        <p
          title={`${data?.location.address}, ${data?.location.city}`}
          className="font-semibold"
        >
          {data?.location.address}, {data?.location.city}
        </p>
        <Rating rating={data?.rating} />
      </div>
      <p title={data?.name}>{data?.name}</p>
      <p className="text-muted-foreground text-sm">
        {data?.price ? numToDollarString(data.price) : "-"} / night
      </p>
    </div>
  )
}
