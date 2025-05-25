import getAllVenues from "@/app/actions/venue/all"
import BasicVenueCard from "./basic-venue-card"
import MetaPagination from "./pagination"
import { checkAndThrowError } from "@/lib/handle-errors"

type props = {
  searchParams: {
    q: string
    page: string
  }
}

export default async function Venues({
  searchParams: { q, page = "1" },
}: props) {
  const query = q ? `/search?q=${q}&page=${page}` : `?page=${page}`
  const { data, success, error, source } = await getAllVenues(query)

  if (!success) checkAndThrowError(error, source)

  const venues = data.data

  if (venues.length)
    return (
      <>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(270px,1fr))] gap-5">
          {venues.map((venue: any) => (
            <BasicVenueCard key={venue.id} data={venue} />
          ))}
        </div>
        <div className="flex justify-center py-4">
          <MetaPagination meta={data.meta} />
        </div>
      </>
    )

  return (
    <div className="text-muted-foreground h-full py-20 text-center">
      No results
    </div>
  )
}
