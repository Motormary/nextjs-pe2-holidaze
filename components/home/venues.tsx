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
    cache: "force-cache",
    next: {
      revalidate: 3,
      tags: ["venues"],
    },
  })
  const venues = await res.json()
  return (
    <>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(270px,1fr))] gap-5">
        {venues.data?.length ? (
          venues.data.map((venue: any, index: number) => (
            <BasicVenueCard key={index} data={venue} />
          ))
        ) : (
          <p>No results</p>
        )}
      </div>
      <div className="flex justify-center py-4">
        <MetaPagination meta={venues.meta} />
      </div>
    </>
  )
}
