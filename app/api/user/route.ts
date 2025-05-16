import { getCurrentUser } from "@/app/actions/user/get"

export async function GET() {
  const { data } = await getCurrentUser()

  return Response.json(data?.data ?? null)
}
