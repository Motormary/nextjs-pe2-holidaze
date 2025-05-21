import { Star } from "lucide-react"

type props = {
  rating: number | undefined
}

export default function Rating({ rating }: props) {
  if (!rating) return null
  return (
    <span className="flex items-center gap-0.5 text-sm select-none">
      <Star className="size-4 fill-amber-300 stroke-amber-500" />
      {rating.toFixed(1)}
    </span>
  )
}
