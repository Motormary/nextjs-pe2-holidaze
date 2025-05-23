import { getUser } from "@/app/actions/user/get"
import Avatar from "@/components/next-avatar"
import EditProfileDialog from "@/components/user/edit-profile-dialog"
import { checkAndThrowError } from "@/lib/handle-errors"

type props = {
  params: Promise<{ user: string }>
}

export default async function UserPage({ params }: props) {
  const { user } = await params
  const { data, success, error, source } = await getUser(user, true)
  console.log("🚀 ~ UserPage ~ data:", data.data.bookings)

  if (!success) checkAndThrowError(error, source)

  return (
    <main className="container mx-auto w-full grow space-y-6 p-4">
      <div>
        <Avatar
          size={220}
          src={data.data.avatar.url}
          alt={data.data.avatar.alt}
        />
      </div>
      <h1 className="text-center">{user}</h1>
      <EditProfileDialog data={data.data} />
      <div className="space-y-4">
        <h2>
          Bookings{" "}
          <span className="text-sm font-normal">
            {data.data._count.bookings}
          </span>
        </h2>
        <div>
          {data.data.bookings.map((booking) => {
            return <div key={booking.id}>{booking.venue.name}</div>
          })}
        </div>
      </div>
    </main>
  )
}
