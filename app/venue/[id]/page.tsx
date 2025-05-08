type props = {
  params: Promise<{ id: string }>
}

export default async function VenuePage({ params }: props) {
  const { id } = await params
  return (
    <main className="container min-h-[calc(100vh-59px)] grow px-4">
      <h1>Venue</h1>
      <h2>{id}</h2>
      VenuePage
    </main>
  )
}
