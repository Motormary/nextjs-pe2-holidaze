"use client"

import { loginUser } from "@/app/actions/user/login"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
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
import { TYPE_USER_LOGIN } from "@/lib/definitions"
import { handleErrors } from "@/lib/handle-errors"
import { cn } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { RefreshCw } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useUser } from "../user-provider"

type props = {
  className?: string
  closeModal?: (state: boolean) => void
}

export const LoginUserSchema = z.object({
  email: z.string().endsWith("@stud.noroff.no", {
    message: "Email must be a valid Noroff email",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
})

export default function LoginCard({ className, closeModal }: props) {
  const [isPending, setIsPending] = useState(false)
  const { setUser } = useUser()
  const router = useRouter()
  const form = useForm<TYPE_USER_LOGIN>({
    resolver: zodResolver(LoginUserSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  async function onSubmit(formData: TYPE_USER_LOGIN) {
    setIsPending(true)
    const { success, source, error } = await loginUser(formData)
    setIsPending(false)

    if (!success) {
      handleErrors<TYPE_USER_LOGIN>(error, source, form)
    }
    if (success) {
      if (closeModal) {
        closeModal(false)
      } else {
        const userData = await fetch("/api/user")
          .then((res) => res.json())
          .catch(() => null)

        setUser(userData)

        router.push("/")
      }
    }
  }

  return (
    <Card
      className={cn(
        className ??
          "mx-auto flex flex-col justify-center border-0 shadow-none sm:w-1/2 lg:w-1/3",
      )}
    >
      <CardHeader>
        <CardTitle className="flex items-center justify-center gap-4">
          <h1>Log in</h1>
        </CardTitle>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
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
          </CardContent>
          <CardFooter className="mt-6 flex flex-col gap-4">
            <Button className="flex w-full" type="submit">
              {isPending ? (
                <RefreshCw className="size-5 animate-spin" />
              ) : (
                "Submit"
              )}
            </Button>
            <div className="text-muted-foreground text-sm">
              Not registered yet?{" "}
              <Link
                className="hover:text-primary font-semibold"
                href="/register"
              >
                Sign up!
              </Link>
            </div>
          </CardFooter>
        </form>
      </Form>
    </Card>
  )
}
