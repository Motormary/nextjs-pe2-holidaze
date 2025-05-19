import getVenue from "@/app/actions/venue/get"
import { checkAndThrowError } from "@/lib/handle-errors"

type props = {
  params: Promise<{ id: string }>
}

export default async function VenuePage({ params }: props) {
  const { id } = await params
  const { data, success, error, source } = await getVenue(id)

  if (!success) checkAndThrowError(error, source)

  console.log("🚀 ~ VenuePage ~ data:", data)

  return (
    <main className="container min-h-[calc(100vh-59px)] grow px-4">
      <h1>Venue</h1>
      <h2>{id}</h2>
      VenuePage
    </main>
  )
}
