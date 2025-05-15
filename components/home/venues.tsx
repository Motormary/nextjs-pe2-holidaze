import BasicVenueCard from "./basic-venue-card"
import MetaPagination from "./pagination"

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
  const res = await fetch(`https://v2.api.noroff.dev/holidaze/venues${query}`, {
    method: "GET",
    next: {
      revalidate: 10,
    },
  })

  const venues = await res.json()

  return (
    <>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(270px,1fr))] gap-5">
        {venues.data?.length ? (
          venues.data.map((venue: any) => (
            <BasicVenueCard key={venue.id} data={venue} />
          ))
        ) : (
          <div className="text-muted-foreground h-full py-20 text-center">
            No results
          </div>
        )}
      </div>
      <div className="flex justify-center py-4">
        <MetaPagination meta={venues.meta} />
      </div>
    </>
  )
}
