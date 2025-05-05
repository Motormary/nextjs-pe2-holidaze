import { cn } from "@/lib/utils"
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
}

export default async function BasicVenueCard({ data }: { data?: props }) {
  const imageUrl =
    "https://photographylife.com/wp-content/uploads/2014/06/Nikon-D810-Image-Sample-6.jpg"

  return (
    <div className="flex h-[334px] flex-col gap-2.5 overflow-hidden [&_p]:mr-1 [&_p]:line-clamp-1">
      <picture className="bg-muted overflow-hidden rounded-t-lg">
        <img
          className={cn(
            imageUrl && "object-cover object-center",
            "h-[236px] w-full font-light underline",
          )}
          src={imageUrl ?? altImg.url}
          alt="image"
        />
      </picture>
      <div className="flex justify-between">
        <p title="Venue Location" className="font-semibold">
          Venue Location
        </p>
        <span className="flex items-center gap-0.5 text-sm">
          <Star className="size-4 fill-amber-300 stroke-amber-500" />
          4.0
        </span>
      </div>
      <p title="Venue Title">Venue title</p>
      <p className="text-muted-foreground text-sm">200$ / night</p>
    </div>
  )
}
