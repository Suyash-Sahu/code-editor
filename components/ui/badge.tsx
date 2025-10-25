import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-all duration-300 ease-in-out overflow-hidden",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-gradient-to-r from-[#256DA4] to-[#83B7DE] text-white [a&]:hover:from-[#256DA4]/90 [a&]:hover:to-[#83B7DE]/90",
        secondary:
          "border-transparent bg-gradient-to-r from-[#F2FF58] to-[#ABB900] text-black [a&]:hover:from-[#F2FF58]/90 [a&]:hover:to-[#ABB900]/90",
        destructive:
          "border-transparent bg-gradient-to-r from-destructive to-destructive/90 text-white [a&]:hover:from-destructive/90 [a&]:hover:to-destructive/80 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "text-foreground [a&]:hover:bg-gradient-to-r [a&]:hover:from-[#74FF9E] [a&]:hover:to-[#DAE039] [a&]:hover:text-black",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span"

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
