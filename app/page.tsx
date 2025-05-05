import BasicVenueCard from "@/components/venue/basic-venue-card"

export default function Home() {
  return (
    <main className="container grow px-4">
      <h1>Home</h1>
      <div>bar</div>
      <div>
        <BasicVenueCard />
        <BasicVenueCard />
      </div>
    </main>
  )
}
