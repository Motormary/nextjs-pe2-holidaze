import BasicVenueCard from "@/components/venue/basic-venue-card"

export default function Home() {
  return (
    <main className="container grow px-4">
      <h1>Home</h1>
      <div>bar</div>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(270px,1fr))] gap-5">
        <BasicVenueCard />
        <BasicVenueCard />
        <BasicVenueCard />
        <BasicVenueCard />
        <BasicVenueCard />
      </div>
    </main>
  )
}
