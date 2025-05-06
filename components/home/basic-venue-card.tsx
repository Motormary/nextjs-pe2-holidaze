import { cn, numToDollarString } from "@/lib/utils"
import { Star } from "lucide-react"
import altImg from "public/alt.svg"

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
  const imageUrl = data?.media?.[0].url ?? altImg.url

  return (
    <div className="flex h-[334px] flex-col gap-2.5 overflow-hidden [&_p]:mr-1 [&_p]:line-clamp-1">
      <picture className="bg-muted overflow-hidden rounded-t-lg">
        <img
          className={cn(
            imageUrl && "object-cover object-center",
            "h-[236px] w-full font-light underline",
          )}
          src={imageUrl}
          alt={data?.media?.[0].alt}
        />
      </picture>
      <div className="flex justify-between">
        <p
          title={`${data?.location.address}, ${data?.location.city}`}
          className="font-semibold"
        >
          {data?.location.address}, {data?.location.city}
        </p>
        <span className="flex items-center gap-0.5 text-sm">
          <Star className="size-4 fill-amber-300 stroke-amber-500" />
          {data?.rating.toFixed(1)}
        </span>
      </div>
      <p title={data?.name}>{data?.name}</p>
      <p className="text-muted-foreground text-sm">
        {data?.price ? numToDollarString(data.price) : "-"} / night
      </p>
    </div>
  )
}
