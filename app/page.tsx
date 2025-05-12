import Venues from "@/components/home/venues"
import VenuesLoading from "@/components/home/venues-loading"

import { Suspense } from "react"

type props = {
  searchParams: Promise<string | string[] | any>
}

export default async function Home({ searchParams }: props) {
  const queries = await searchParams

  return (
    <main className="container grow p-4 peer-[[data-search]]:animate-pulse has-[[data-pending]]:animate-pulse">
      <Suspense fallback={<VenuesLoading />}>
        <Venues searchParams={queries} />
      </Suspense>
    </main>
  )
}
