import * as React from "react"
import {
  ChevronFirstIcon,
  ChevronLastIcon,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"
import { VariantProps } from "class-variance-authority"
import { useRouter } from "next/navigation"

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Pagination = ({ className, ...props }: React.ComponentProps<"nav">) => (
  <nav
    role="navigation"
    aria-label="pagination"
    className={cn("mx-auto flex w-full justify-center", className)}
    {...props}
  />
)
Pagination.displayName = "Pagination"

const PaginationContent = React.forwardRef<
  HTMLUListElement,
  React.ComponentProps<"ul">
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    className={cn("flex flex-row items-center gap-1", className)}
    {...props}
  />
))
PaginationContent.displayName = "PaginationContent"

const PaginationItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentProps<"li">
>(({ className, ...props }, ref) => (
  <li ref={ref} className={cn("", className)} {...props} />
))
PaginationItem.displayName = "PaginationItem"

type PaginationLinkProps = {
  isActive?: boolean
  href: string
} & Pick<ButtonProps, "size"> &
  React.ComponentProps<typeof Button>

const PaginationLink = ({
  className,
  isActive,
  size = "icon",
  href,
  ...props
}: PaginationLinkProps) => {
  const router = useRouter()
  const [isPending, startTransition] = React.useTransition()
  function handleClick() {
    startTransition(() => {
      router.push(href)
    })
  }
  return (
    <Button
      data-pending={isPending ? "" : undefined}
      onClick={handleClick}
      aria-current={isActive ? "page" : undefined}
      variant={isActive ? "default" : "ghost"}
      size={size}
      className={cn("hover:cursor-pointer", className)}
      {...props}
    />
  )
}
PaginationLink.displayName = "PaginationLink"

const PaginationPrevious = ({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label="Go to previous page"
    className={cn("gap-1 pl-2.5", className)}
    {...props}
  >
    <ChevronLeft className="h-4 w-4" />
    <span className="max-xs:hidden">Prev</span>
  </PaginationLink>
)
PaginationPrevious.displayName = "PaginationPrevious"

const PaginationNext = ({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label="Go to next page"
    className={cn("gap-1 pr-2.5", className)}
    {...props}
  >
    <span className="max-xs:hidden">Next</span>
    <ChevronRight className="h-4 w-4" />
  </PaginationLink>
)
PaginationNext.displayName = "PaginationNext"

const PaginationLast = ({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label="Go to last page"
    className={cn("gap-1 pr-2.5", className)}
    {...props}
  >
    <span className="max-xs:hidden">Last</span>
    <ChevronLastIcon className="h-4 w-4" />
  </PaginationLink>
)
PaginationLast.displayName = "PaginationLast"
const PaginationFirst = ({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label="Go to first page"
    className={cn("gap-1 pr-2.5", className)}
    {...props}
  >
    <ChevronFirstIcon className="h-4 w-4" />
    <span className="max-xs:hidden">First</span>
  </PaginationLink>
)
PaginationFirst.displayName = "PaginationFirst"

const PaginationEllipsis = ({
  className,
  ...props
}: React.ComponentProps<"span">) => (
  <span
    aria-hidden
    className={cn("flex h-9 w-9 items-center justify-center", className)}
    {...props}
  >
    <MoreHorizontal className="h-4 w-4" />
    <span className="sr-only">More pages</span>
  </span>
)
PaginationEllipsis.displayName = "PaginationEllipsis"

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationFirst,
  PaginationLast,
}
