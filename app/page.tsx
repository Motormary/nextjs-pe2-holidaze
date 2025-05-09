import Venues from "@/components/home/venues"
import VenuesLoading from "@/components/home/venues-loading"
import { Suspense } from "react"

type props = {
  searchParams: Promise<string | string[] | any>
}

export default async function Home({ searchParams }: props) {
  const queries = await searchParams

  return (
    <main className="container grow px-4">
      <h1>Home</h1>
      <div className="max-md:hidden">search bar</div>
      <Suspense fallback={<VenuesLoading />}>
        <Venues searchParams={queries} />
      </Suspense>
    </main>
  )
}
