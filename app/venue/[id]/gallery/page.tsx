import getVenue from "@/app/actions/venue/get"
import { buttonVariants } from "@/components/ui/button"
import { checkAndThrowError } from "@/lib/handle-errors"
import { cn } from "@/lib/utils"
import { ChevronUp } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

type props = {
  params: Promise<{ id: string }>
}

export default async function Page({ params }: props) {
  const { id } = await params
  const { data, success, error, source } = await getVenue(id)

  if (!success) checkAndThrowError(error, source)

  return (
    <>
      <main className="container flex w-full grow flex-col gap-2 pb-20 md:pt-8">
        {data.data.media.map((media, index) => {
          return (
            <Image
              id={media.url}
              key={media.alt + index}
              loading="lazy"
              src={media?.url ?? "/placeholder.svg"}
              alt={media?.alt ?? "Alt image"}
              width={1024}
              height={1024}
              draggable={false}
              className="aspect-square max-h-[700px] w-full rounded-lg object-contain object-center"
            />
          )
        })}
      </main>
      <Link
        href="#"
        className={cn(
          buttonVariants({ variant: "outline" }),
          "sticky right-0 bottom-10",
        )}
      >
        Back to Top
        <ChevronUp />
      </Link>
    </>
  )
}
