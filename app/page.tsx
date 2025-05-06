import BasicVenueCard from "@/components/home/basic-venue-card"
import MetaPagination from "@/components/home/pagination"

export default async function Home() {
  const res = await fetch("https://v2.api.noroff.dev/holidaze/venues?limit=5", {
    method: "GET",
  })
  const venues = await res.json()
  return (
    <main className="container grow px-4">
      <h1>Home</h1>
      <div>bar</div>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(270px,1fr))] gap-5">
        {venues.data.map((venue: any, index: number) => (
          <BasicVenueCard key={index} data={venue} />
        ))}
      </div>
      <div className="flex justify-center py-4">
        <MetaPagination meta={venues.meta} />
      </div>
    </main>
  )
}
