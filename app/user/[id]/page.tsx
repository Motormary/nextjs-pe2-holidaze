type props = {
  params: Promise<{ id: string }>
}

export default async function UserPage({ params }: props) {
  console.log("🚀 ~ UserPage ~ params:", (await params).id)
  return <main className="grow">UserPage</main>
}
