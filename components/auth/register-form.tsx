"use client"
import createUser from "@/app/actions/user/create"
import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import { handleErrors } from "@/lib/handle-errors"
import { cn } from "@/lib/utils"
import { z } from "zod"
import { useState } from "react"
import { RefreshCw } from "lucide-react"
import { useUser } from "../user-provider"
import { Checkbox } from "../ui/checkbox"

type props = {
  className?: string
  closeModal?: (state: boolean) => void
}

export const RegisterUserSchema = z
  .object({
    name: z
      .string()
      .min(2, {
        message: "Name must be at least 2 characters.",
      })
      .max(20, {
        message: "Name cannot contain more than 20 characters.",
      })
      .regex(/^[a-zA-Z0-9_]+$/, {
        message:
          "Name can only contain letters (a-Z), numbers (0-9), and underscores (_).",
      }),
    bio: z.string().optional(),
    avatar: z.object({
      url: z.string(),
      alt: z.string().optional(),
    }),
    email: z.string().endsWith("@stud.noroff.no", {
      message: "Email must be a valid Noroff email",
    }),
    password: z.string().min(8, {
      message: "Password must be at least 8 characters.",
    }),
    confirm: z.string().min(8, {
      message: "Password must be at least 8 characters.",
    }),
    venueManager: z.boolean(),
  })
  .refine((data) => data.password === data.confirm, {
    message: "Passwords must match.",
    path: ["confirm"],
  })

export default function RegisterCard({ className, closeModal }: props) {
  const [isPending, setIsPending] = useState(false)
  const { user, setUser } = useUser()
  const router = useRouter()
  const form = useForm<z.infer<typeof RegisterUserSchema>>({
    resolver: zodResolver(RegisterUserSchema),
    defaultValues: {
      name: "",
      avatar: {
        url: "",
        alt: "",
      },
      email: "",
      password: "",
      confirm: "",
      venueManager: false,
    },
  })

  async function onSubmit(formData: z.infer<typeof RegisterUserSchema>) {
    setIsPending(true)
    const { error, source, success } = await createUser(formData)
    setIsPending(false)

    if (!success)
      handleErrors<z.infer<typeof RegisterUserSchema>>(error, source, form)
    if (success) {
      const userData = await fetch("/api/user")
        .then((res) => res.json())
        .catch(() => null)

      setUser(userData)

      if (closeModal) {
        closeModal(false)
      } else router.push("/")
    }
  }

  return (
    <Card
      className={cn(
        className ??
          "bg-card/70 mx-auto flex flex-col justify-center border-0 shadow-none backdrop-blur-sm sm:w-1/2 lg:w-1/3",
      )}
    >
      <CardHeader>
        <CardTitle className="flex items-center justify-center gap-4">
          <h1>Register</h1>
        </CardTitle>
      </CardHeader>
      <Form {...form}>
        <form className="w-full" onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Kari Traa" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="avatar.url"
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
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="karitraa@stud.noroff.no" {...field} />
                  </FormControl>
                  <FormDescription className="text-xs">
                    Email is case sensitive
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirm"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="venueManager"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-y-0 space-x-3 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Venue Manager</FormLabel>
                    <FormDescription>
                      Create and manage your venues as a manager.
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="mt-6 flex flex-col gap-4">
            <Button disabled={isPending} className="flex w-full" type="submit">
              {isPending ? (
                <RefreshCw className="size-5 animate-spin" />
              ) : (
                "Submit"
              )}
            </Button>
            <CardDescription>
              Already have an account?{" "}
              <Link className="hover:text-primary font-semibold" href="/login">
                Sign in!
              </Link>
            </CardDescription>
          </CardFooter>
        </form>
      </Form>
    </Card>
  )
}
