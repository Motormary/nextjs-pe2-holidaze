async function getCurrentUser() {
  return {
    id: "123",
    name: "John Doe",
    email: "John@doe.com",
    avatar: { url: "https://github.com/shadcn.png", alt: "aa" },
  }
}

export async function GET() {
  const user = await getCurrentUser()
  return Response.json(user)
}
