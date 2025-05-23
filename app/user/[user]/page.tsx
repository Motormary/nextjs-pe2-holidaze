type props = {
  params: Promise<{ user: string }>
}

export default async function UserPage({ params }: props) {
  const { user } = await params
  console.log("🚀 ~ UserPage ~ user:", user)
  return <main className="grow">UserPage</main>
}
