import BasicVenueCard from "@/components/home/basic-venue-card"
import MetaPagination from "@/components/home/pagination"

type props = {
  searchParams: Promise<string | string[] | any>
}

export default async function Home({ searchParams }: props) {
  const { q, page = 1 } = await searchParams
  const query = q ? `/search?q=${q}&page=${page}` : `?page=${page}`
  const res = await fetch(`https://v2.api.noroff.dev/holidaze/venues${query}`, {
    method: "GET",
  })
  const venues = await res.json()

  return (
    <main className="container grow px-4">
      <h1>Home</h1>
      <div className="max-md:hidden">search bar</div>
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
    </main>
  )
}
