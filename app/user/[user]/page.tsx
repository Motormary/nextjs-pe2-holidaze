import { getCurrentUser, getUser } from "@/app/actions/user/get"
import Avatar from "@/components/next-avatar"
import DataTable from "@/components/user/data-table"
import { bookingColumns } from "@/components/user/booking-column"
import EditProfileDialog from "@/components/user/edit-profile-dialog"
import { checkAndThrowError } from "@/lib/handle-errors"
import { venueColumns } from "@/components/user/venue-column"
import VenueDialog from "@/components/venue/new-venue-dialog"
import { DialogTrigger } from "@/components/ui/dialog"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import SignOut from "@/components/user/sign-out"

type props = {
  params: Promise<{ user: string }>
}

export default async function UserPage({ params }: props) {
  const { user } = await params
  const { data: currentUser } = await getCurrentUser()
  const { data, success, error, source } = await getUser(user, true)

  if (!success) checkAndThrowError(error, source)

  return (
    <main className="container mx-auto w-full grow space-y-6 p-4">
      <div className="space-y-6">
        <div
          style={{
            backgroundImage: `url(${data.data.banner.url})`,
          }}
          className={`flex flex-col items-center gap-4 rounded-lg bg-center bg-no-repeat py-4`}
        >
          <div className="rounded-full border-4 shadow-lg md:size-52">
            <Avatar
              size={220}
              src={data.data.avatar.url}
              alt={data.data.avatar.alt}
            />
          </div>
          <div className="flex w-fit flex-col items-center gap-2 md:items-start">
            <h1 className="rounded-full bg-black/50 px-4 text-white text-shadow-lg">
              {user}
            </h1>
            <div className="mx-auto">
              <EditProfileDialog data={data.data} />
            </div>
          </div>
        </div>
        <div className="overflow-hidden">
          <p className="line-clamp-3">{data.data.bio}</p>
        </div>
        {currentUser.data.name !== user || currentUser.data.venueManager ? (
          <div id="venues" className="space-y-4">
            <div className="flex justify-between">
              <h2>
                Venues{" "}
                <span className="text-sm font-normal">
                  {data.data._count.venues}
                </span>
              </h2>
              <div className="flex flex-col gap-2 sm:flex-row md:hidden">
                <VenueDialog>
                  <DialogTrigger
                    className={cn(buttonVariants({ variant: "default" }))}
                  >
                    Add new venue
                  </DialogTrigger>
                </VenueDialog>
                <SignOut />
              </div>
            </div>
            <DataTable
              currentUser={currentUser.data.name === user}
              columns={venueColumns}
              data={data.data.venues}
            />
          </div>
        ) : (
          <div id="bookings" className="space-y-4">
            <h2>
              Bookings{" "}
              <span className="text-sm font-normal">
                {data.data._count.bookings}
              </span>
            </h2>
            <div>
              <DataTable
                currentUser={currentUser.data.name === user}
                columns={bookingColumns}
                data={data.data.bookings}
              />
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
