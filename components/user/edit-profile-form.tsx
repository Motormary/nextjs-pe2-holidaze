"use client"

import { TYPE_USER_EDIT } from "@/lib/definitions"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form"
import { Input } from "../ui/input"
import { memo, useTransition } from "react"
import { DialogFooter, DialogTrigger } from "../ui/dialog"
import { Button } from "../ui/button"
import updateUser from "@/app/actions/user/patch"
import { useUser } from "../user-provider"
import { handleErrors } from "@/lib/handle-errors"
import { RefreshCw } from "lucide-react"

type props = {
  data: TYPE_USER_EDIT
  setOpen: (state: boolean) => void
}

const EditProfileSchema = z.object({
  avatar: z.object({
    url: z.string(),
    alt: z.string(),
  }),
})

function EditProfileForm({ data, setOpen }: props) {
  const [isPending, startTransition] = useTransition()
  const { setUser } = useUser()
  const form = useForm<z.infer<typeof EditProfileSchema>>({
    resolver: zodResolver(EditProfileSchema),
    defaultValues: data,
  })

  function onSubmit(formData: z.infer<typeof EditProfileSchema>) {
    startTransition(async () => {
      const { data: res, success, error, source } = await updateUser(formData)

      if (success) {
        setUser(res.data)
        setOpen(false)
      } else handleErrors(error, source)
    })
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 py-8 max-md:px-4"
      >
        <FormField
          name="avatar.url"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Avatar URL</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="avatar.alt"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Avatar alt</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <DialogFooter className="mt-6">
          <DialogTrigger asChild>
            <Button variant="outline">Cancel</Button>
          </DialogTrigger>
          <Button disabled={isPending}>
            {isPending ? <RefreshCw className="animate-spin" /> : "Save"}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  )
}

export default memo(EditProfileForm)
