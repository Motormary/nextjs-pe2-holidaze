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
      {queries.q ? (
        <h3 className="pb-2 text-sm">
          Showing results for &apos;{queries.q}&apos;
        </h3>
      ) : null}
      <Suspense fallback={<VenuesLoading />}>
        <Venues searchParams={queries} />
      </Suspense>
    </main>
  )
}
